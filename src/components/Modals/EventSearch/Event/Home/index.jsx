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
import { Icon, Loading, Select } from '@pitrix/lego-ui'

import SearchInput from 'components/Modals/LogSearch/Logging/SearchInput'
import TimeBar from 'components/Charts/Bar/TimeBar'
import EventSearchStore from 'stores/eventSearch'

import { dropDownItems, getSecond, supportQueryParams } from '../utils'

import styles from './index.scss'

@observer
export default class HomeModal extends React.Component {
  eventSearchStore = new EventSearchStore()

  componentDidMount() {
    this.updateStatistics()
  }

  updateStatistics() {
    const { searchInputState } = this.props
    const { cluster } = searchInputState

    this.eventSearchStore.fetchTodayHistogram({ cluster })
    this.eventSearchStore.fetchHistogram({ cluster })
    this.eventSearchStore.fetchQuery({
      start_time: Math.ceil(Date.now() / 1000) - 60 * 60 * 12,
      endTime: Math.ceil(Date.now() / 1000),
      interval: '24m',
      cluster,
    })
  }

  @action
  selectedDurationParameter = ({ time: startTime = 0 }) => {
    const { interval } = this.eventSearchStore
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
    const { histogramTodayData = {}, isLoading } = this.eventSearchStore

    return (
      <div className={styles.banner}>
        <div className={styles.illustration}>
          <img src="/assets/log-statistics.svg" alt="log-statistics" />
        </div>
        <Loading spinning={isLoading}>
          <div className={styles.statistics}>
            <h3>
              {histogramTodayData.events
                ? t.html('TOTAL_EVENTS_TODAY', {
                    events: histogramTodayData.events,
                    className: styles.count,
                  })
                : t('NO_EVENTS_TODAY')}
            </h3>
            {histogramTodayData.events ? (
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
        <Select
          className={styles.clusterSelector}
          value={searchInputState.cluster}
          options={clustersOpts}
          valueRenderer={this.clusterRenderer}
          onChange={this.onClusterChange}
        />
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
    } = this.eventSearchStore
    return (
      <Loading spinning={isLoading}>
        <div className={classnames(styles.card, styles.recent)}>
          <div className={styles.recentSummary}>
            <h2 className={styles.count}>{total || 0}</h2>
            <p>
              {t('Trends in the total number of events in the last 12 hours')}
            </p>
          </div>
          <div className={styles.chart}>
            <TimeBar
              xKey={'time'}
              data={toJS(histogramData.buckets || [])}
              legend={[['count', t('Event statistics')]]}
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
