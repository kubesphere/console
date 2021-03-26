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

import SearchInput from 'components/Modals/LogSearch/Logging/SearchInput'
import TimeBar from 'components/Charts/Bar/TimeBar'
import AuditingStore from 'stores/auditing'

import { dropDownItems, getSecond, supportQueryParams } from '../utils'

import styles from './index.scss'

@observer
export default class Home extends React.Component {
  auditingStore = new AuditingStore()

  componentDidMount() {
    this.updateStatistics()
  }

  updateStatistics() {
    const { searchInputState } = this.props
    const { cluster } = searchInputState

    this.auditingStore.fetchTodayHistogram({ cluster })
    this.auditingStore.fetchHistogram({ cluster })
    this.auditingStore.fetchQuery({
      start_time: Math.ceil(Date.now() / 1000) - 60 * 60 * 12,
      endTime: Math.ceil(Date.now() / 1000),
      interval: '24m',
      cluster,
    })
  }

  @action
  selectedDurationParameter = ({ time: startTime = 0 }) => {
    const { interval } = this.auditingStore
    const { searchInputState } = this.props
    searchInputState.end = Math.ceil(startTime / 1000) + getSecond(interval)
    searchInputState.start = Math.ceil(startTime / 1000)
    searchInputState.step = '1m'
    this.onSearchParamsChange()
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
            <h3 className={styles.rule}>{t('Search Rule')}:</h3>
            {this.renderRecentLogs()}
            {this.renderQueryItems()}
          </div>
        </div>
      </div>
    )
  }

  renderBanner() {
    const {
      histogramTodayData: { events } = {},
      isLoading,
    } = this.auditingStore

    return (
      <div className={styles.banner}>
        <div className={styles.illustration}>
          <img src="/assets/log-statistics.svg" alt="log-statistics" />
        </div>
        <Loading spinning={isLoading}>
          <div className={styles.statistics}>
            <h3>
              {events
                ? t.html('TOTAL_AUDITING_TODAY', {
                    auditing: events,
                    className: styles.count,
                  })
                : t('NO_AUDITING_TODAY')}
            </h3>
            {events ? (
              <p>
                <Icon name="clock" />
                {t('Current Statistics Start Time')}:
                {moment(new Date()).format(`${t('EVENT_DATE')}`)}
              </p>
            ) : null}
          </div>
        </Loading>
      </div>
    )
  }

  clusterRenderer = option => `${t('Cluster')}: ${option.label}`

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
          dropDownItems={dropDownItems}
        />
      </div>
    )
  }

  renderRecentLogs() {
    const {
      isLoading,
      histogramData = {},
      total,
      interval,
    } = this.auditingStore
    return (
      <Loading spinning={isLoading}>
        <div className={classnames(styles.card, styles.recent)}>
          <div className={styles.recentSummary}>
            <h2 className={styles.count}>{total || 0}</h2>
            <p>{t('Auditing log trends in the last 12 hours')}</p>
          </div>
          <div className={styles.chart}>
            <TimeBar
              xKey={'time'}
              data={toJS(histogramData.buckets || [])}
              legend={[['count', t('Auditing statistics')]]}
              interval={interval || '30m'}
              onBarClick={this.selectedDurationParameter}
            />
          </div>
        </div>
      </Loading>
    )
  }

  renderQueryItems() {
    return supportQueryParams.map(category => (
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
