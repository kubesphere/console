/*
 * This file is part of KubeSphere Console.
 * Copyright (C) 2019 The KubeSphere Console Authors.
 *
 * KubeSphere Console is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * KubeSphere Console is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with KubeSphere Console.  If not, see <https://www.gnu.org/licenses/>.
 */

import React from 'react'
import { action, toJS } from 'mobx'
import { observer } from 'mobx-react'
import moment from 'moment-mini'
import classnames from 'classnames'
import { Icon, Loading, Select } from '@kube-design/components'

import TimeBar from 'components/Charts/Bar/TimeBar'
import LogStatisticsStore from 'stores/logging/statistics'
import HistogramStore from 'stores/logging/histogram'

import SearchInput from '../SearchInput'

import styles from './index.scss'

const getSecond = step => {
  const [, count = 0, unit = 's'] = step.match(/(\d+)(\w+)/)
  const unitMap = {
    s: 1,
    m: 60,
    h: 60 * 60,
    d: 60 * 60 * 24,
  }
  return count * unitMap[unit]
}

@observer
export default class HomeModal extends React.Component {
  logStatisticsStore = new LogStatisticsStore()

  histogramStore = new HistogramStore({
    startTime: Date.now() - 1000 * 60 * 60 * 12,
    endTime: Date.now(),
    interval: '30m',
  })

  supportQueryParams = [
    {
      icon: 'magnifier',
      title: t('SEARCH_BY_KEYWORD'),
      tips: t('CONTAINER_LOG_KEYWORD_TIP'),
      key: 'log_query',
    },
    {
      icon: 'project',
      title: t('SEARCH_BY_PROJECT'),
      tips: t('CONTAINER_LOG_PROJECT_TIP'),
      key: 'namespace_query',
    },
    {
      icon: 'backup',
      title: t('SEARCH_BY_WORKLOAD'),
      tips: t('CONTAINER_LOG_WORKLOAD_TIP'),
      key: 'workload_query',
    },
    {
      icon: 'pod',
      title: t('SEARCH_BY_POD'),
      tips: t('CONTAINER_LOG_POD_TIP'),
      key: 'pod_query',
    },
    {
      icon: 'docker',
      title: t('SEARCH_BY_CONTAINER'),
      tips: t('CONTAINER_LOG_CONTAINER_TIP'),
      key: 'container_query',
    },
  ]

  componentDidMount() {
    this.updateStatistics()
  }

  updateStatistics() {
    const { searchInputState } = this.props
    const { cluster } = searchInputState
    this.logStatisticsStore.fetch({
      cluster,
    })
    this.histogramStore.fetch({ cluster })
  }

  @action
  selectedDurationParameter = ({ time: startTime = 0 }) => {
    const { interval } = this.histogramStore
    const { searchInputState } = this.props
    searchInputState.end = Math.ceil(startTime / 1000) + getSecond(interval)
    searchInputState.start = Math.ceil(startTime / 1000)
    searchInputState.step = '1m'
    this.props.formStepState.next()
  }

  selectedParameter = e => {
    this.props.searchInputState.nextParamsKey = e.currentTarget.dataset.query
  }

  onSearchParamsChange = () => {
    this.props.formStepState.next()
  }

  onClusterChange = cluster => {
    this.props.searchInputState.setCluster(cluster)
    this.updateStatistics()
  }

  render() {
    return (
      <div>
        <div className={styles.pane}>{this.renderBanner()}</div>
        <div className={styles.tips}>
          <div className={styles.pane}>
            {this.renderSearchBar()}
            <h3 className={styles.rule}>{t('QUERYING_RULES')}</h3>
            {this.renderRecentLogs()}
            {this.renderQueryItems()}
          </div>
        </div>
      </div>
    )
  }

  renderBanner() {
    return (
      <div className={styles.banner}>
        <div className={styles.illustration}>
          <img src="/assets/log-statistics.svg" alt="log-statistics" />
        </div>
        <Loading spinning={this.logStatisticsStore.isLoading}>
          <div className={styles.statistics}>
            <h3>
              {t.html('TOTAL_LOGS_TODAY', {
                containers: this.logStatisticsStore.containersCount,
                logs: this.logStatisticsStore.logsCount,
                className: styles.count,
              })}
            </h3>
            <p>
              <Icon name="clock" />
              {t('START_TIME_VALUE', {
                value: moment(this.logStatisticsStore.startTime).format(
                  'YYYY-MM-DD HH:mm:ss'
                ),
              })}
            </p>
          </div>
        </Loading>
      </div>
    )
  }

  clusterRenderer = option => t('CLUSTER_VALUE', { value: option.label })

  renderSearchBar() {
    const { searchInputState, clustersOpts } = this.props
    return (
      <div className={styles.searchBarContainer}>
        {globals.app.isMultiCluster && (
          <Select
            className={styles.clusterSelector}
            value={searchInputState.cluster}
            options={clustersOpts}
            valueRenderer={this.clusterRenderer}
            onChange={this.onClusterChange}
          />
        )}
        <SearchInput
          className={styles.searchBar}
          onChange={this.onSearchParamsChange}
          params={searchInputState}
          dropDownItems={{
            log_query: {
              icon: 'magnifier',
              text: t('KEYWORD'),
            },
            namespace_query: {
              icon: 'project',
              text: t('PROJECT'),
            },
            workload_query: {
              icon: 'backup',
              text: t('WORKLOAD'),
            },
            pod_query: {
              icon: 'pod',
              text: t('POD'),
            },
            container_query: {
              icon: 'docker',
              text: t('CONTAINER'),
            },
          }}
        />
      </div>
    )
  }

  renderRecentLogs() {
    return (
      <Loading spinning={this.histogramStore.isLoading}>
        <div className={classnames(styles.card, styles.recent)}>
          <div className={styles.recentSummary}>
            <h2 className={styles.count}>{this.histogramStore.logsCount}</h2>
            <p>{t('CONTAINER_LOGS_12H')}</p>
          </div>
          <div className={styles.chart}>
            <TimeBar
              xKey={'time'}
              data={toJS(this.histogramStore.histograms)}
              legend={[['count', t('CONTAINER_LOG_COUNT')]]}
              interval={this.histogramStore.interval}
              onBarClick={this.selectedDurationParameter}
            />
          </div>
        </div>
      </Loading>
    )
  }

  renderQueryItems() {
    return this.supportQueryParams.map(category => (
      <div
        className={classnames(styles.card, styles.category)}
        key={category.key}
        data-query={category.key}
        onClick={this.selectedParameter}
      >
        <div className={styles.icon}>
          {category.iconUrl ? (
            <div>
              <img src={category.iconUrl} />
            </div>
          ) : (
            <Icon name={category.icon} size={40} />
          )}
        </div>
        <div className={styles.desc}>
          <h4>{category.title}</h4>
          <p>{category.tips}</p>
        </div>
      </div>
    ))
  }
}
