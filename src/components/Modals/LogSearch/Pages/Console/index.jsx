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

import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { toJS } from 'mobx'
import PropTypes from 'prop-types'
import { debounce, get } from 'lodash'
import moment from 'moment-mini'

import { Loading, Icon } from '@pitrix/lego-ui'
import HistogramStore from 'stores/logging/v3/histogram'
import DetailStore from 'stores/logging/v3/detail'

import { getLocalStorageItem, setLocalStorageItem } from 'utils/localStorage'

import FieldsInput from '../../components/FieldsSearchBar'
import TimeRangeSelector from '../../components/TimeRangeSelector'
import TimeArea from '../../components/TimeArea'
import Preference from '../../components/Preference'
import LogDetailPanel from '../../components/LogDetailPanel'
import LogList from '../../components/LogList'

import styles from './index.scss'

/**
 * Only render view and export events;
 * 纯渲染组件，只负责渲染与暴露事件
 */
class LogSearchPage extends Component {
  static propTypes = {
    fields: PropTypes.array,
    onQueryFieldChange: PropTypes.func,
    supportQueryFields: PropTypes.array,
    onLogScrollTop: PropTypes.func,
  }

  static defaultProps = {
    fields: [],
    onQueryFieldChange() {},
    supportQueryFields: [],
    onLogScrollTop() {},
  }

  logContainer = React.createRef()

  handleScroll = e => {
    this.handlerScrollTop(e.target.scrollTop)
  }

  handlerScrollTop = debounce(top => {
    top === 0 && this.props.onLogScrollTop()
  }, 300)

  handleLogClick = e => {
    const index = get(e, 'currentTarget.dataset.index')
    this.props.onLogSelect(index)
  }

  handleScrollBottomClick = () => {
    this.logContainer.current && this.logContainer.current.scrollToBottom()
  }

  render() {
    return (
      <div className={styles.wrapper}>
        {this.renderFilterBar()}
        {this.renderChart()}
        {this.renderContent()}
        {this.renderFooter()}
      </div>
    )
  }

  renderFilterBar() {
    const {
      supportQueryFields,
      onQueryFieldChange,
      fields,
      recent,
      timeRange,
      interval,
      recentOpts,
      intervalOpts,
      onRecentSelect,
      onCustomSubmit,
    } = this.props

    return (
      <div className={styles.filterBar}>
        <div className={styles.searchBar}>
          <FieldsInput
            fields={fields}
            onChange={onQueryFieldChange}
            supportFields={supportQueryFields}
          />
        </div>
        <div className={styles.timeRangeSelector}>
          <TimeRangeSelector
            recent={recent}
            timeRange={timeRange}
            interval={interval}
            recentOpts={recentOpts}
            intervalOpts={intervalOpts}
            onRecentSelect={onRecentSelect}
            onCustomSubmit={onCustomSubmit}
          />
        </div>
      </div>
    )
  }

  renderChart() {
    const { isHistogramLoading, intervalMillisecond } = this.props

    return (
      <Loading
        spinning={isHistogramLoading}
        wrapperClassName={styles.histogramChartLoading}
      >
        <TimeArea
          className={styles.chart}
          perDataTimeInterval={intervalMillisecond}
          data={toJS(this.props.histograms)}
          xAxisDataKey="time"
          areaDataConfigs={[['count', t('Log statistics')]]}
        />
      </Loading>
    )
  }

  renderContent() {
    const { selectLog } = this.props

    return (
      <div className={styles.content}>
        {this.renderLogContainer()}
        {selectLog && this.renderLogDetail()}
      </div>
    )
  }

  renderLogDetail() {
    const {
      selectLog,
      onLogDetailHideButtonClick,
      onReplaceClick,
      onAddClick,
      onNewTagClick,
    } = this.props

    return (
      <LogDetailPanel
        log={selectLog}
        onLogDetailHideButtonClick={onLogDetailHideButtonClick}
        onReplaceClick={onReplaceClick}
        onAddClick={onAddClick}
        onNewTagClick={onNewTagClick}
      />
    )
  }

  renderLogContainer() {
    const {
      records,
      isDetailLoading,
      preference,
      onLogScrollTop,
      onLogSelect,
      loadingMore,
    } = this.props

    return (
      <div className={styles.logsContainer}>
        {isDetailLoading && (
          <>
            <Loading tip={t('LOADING_LOG')} spinning={isDetailLoading}>
              <div className={styles.logLoading} />
            </Loading>
            <LogList
              ref={this.logContainer}
              loadingMore={loadingMore}
              logs={records}
              rowStyle={preference}
              onRowClick={this.handleLogClick}
              onScrollTop={onLogScrollTop}
              onLogSelect={onLogSelect}
            />
          </>
        )}
        {!isDetailLoading && records.length === 0 ? (
          this.renderEmpty()
        ) : (
          <LogList
            ref={this.logContainer}
            loadingMore={loadingMore}
            logs={records}
            rowStyle={preference}
            onRowClick={this.handleLogClick}
            onScrollTop={onLogScrollTop}
            onLogSelect={onLogSelect}
          />
        )}
      </div>
    )
  }

  renderEmpty() {
    const { onRefreshClick, timeRange } = this.props
    const { startTime, endTime } = timeRange
    const timeFormat = 'YYYY/MM/DD HH:mm:ss'

    return (
      <div className={styles.logEmpty}>
        <Icon name={'log'} size={40} />
        <h3>
          <span>
            {t('SINCE_TO', {
              since: moment(startTime).format(timeFormat),
              to: moment(endTime).format(timeFormat),
            })}
          </span>
          <span>{t('NO_FOUND_ANY_LOG')}</span>
        </h3>
        <p>
          <span>{t('YOU_CAN_TRY')}</span>
          <span className={styles.btn} onClick={onRefreshClick}>
            {t('Refresh')}
          </span>
          <span>{t('or')}</span>
          <span>{t('CHANGE_FILTERS')}</span>
        </p>
      </div>
    )
  }

  renderFooter() {
    const {
      isMonitoring,
      preference,
      onPreferenceChange,
      shouldPreferenceShow,
      onPreferenceButtonClick,
    } = this.props

    return (
      <div className={styles.footer}>
        <div>
          {isMonitoring ? (
            <>
              <Loading size={10} /> <span>{t('LOG_MONITORING')}</span>
            </>
          ) : (
            <span
              className={styles.scrollBottomBtn}
              onClick={this.handleScrollBottomClick}
            >
              <Icon name="chevron-down" />
              <span>{t('SCROLL_TO_RECENT')}</span>
            </span>
          )}
        </div>
        <div className={styles.preference}>
          <span onClick={onPreferenceButtonClick}>
            <Icon name="cogwheel" />
            <span>{t('SETTING_PREFERENCE')}</span>
          </span>
        </div>
        {shouldPreferenceShow && (
          <div className={styles.settingPanel}>
            <Preference settings={preference} onChange={onPreferenceChange} />
          </div>
        )}
      </div>
    )
  }
}

const TIME_ALIAS_MAP = {
  s: 'Seconds',
  m: 'Minutes',
  h: 'Hours',
}

const LOG_TOOL_PREFERENCE_LG_KEY = 'LOG_TOOL_PREFERENCE_LG_KEY'

const DEFAULT_PREFERENCE = {
  fontFamily: 'inherit',
  fontSize: '12px',
  fontWeight: 'normal',
  lineHeight: '20px',
  whiteSpace: 'nowrap',
  borderBottom: 'none',
}

const PREFERENCES_SETTING_EXPIRED = 1000 * 60 * 60 * 24 * 7

@observer
export default class LogStatisticPageContainer extends Component {
  DEFAULT_TIME_RANGE = {
    recent: {
      count: 1,
      unit: 'Hours',
    },
  }

  RECENT_OPTS = [
    [5, 'Minutes', '5s'],
    [10, 'Minutes', '10s'],
    [15, 'Minutes', '15s'],
    [1, 'Hours', '1m'],
    [3, 'Hours', '3m'],
    [12, 'Hours', '12m'],
    [1, 'Days', '24m'],
    [2, 'Days', '48m'],
  ].map(([count, unit, interval]) => ({
    label: `${t('Last')} ${count} ${t(unit)}`,
    value: {
      count,
      unit,
      interval,
    },
  }))

  INTERVAL_OPTS = [
    [5, 's'],
    [10, 's'],
    [15, 's'],
    [1, 'm'],
    [3, 'm'],
    [5, 'm'],
    [10, 'm'],
    [12, 'm'],
    [15, 'm'],
    [24, 'm'],
    [30, 'm'],
    [48, 'm'],
    [1, 'h'],
    [2, 'h'],
    [5, 'h'],
  ].map(([count, unit]) => ({
    label: `${count} ${t(TIME_ALIAS_MAP[unit])}`,
    value: count + unit,
  }))

  histogramStore = new HistogramStore({
    interval: '1m',
    ...this.DEFAULT_TIME_RANGE,
  })

  logDetailStore = new DetailStore({
    ...this.DEFAULT_TIME_RANGE,
    sort: 'desc',
    size: 35,
  })

  state = {
    preference:
      getLocalStorageItem('LOG_TOOL_PREFERENCE_LG_KEY') || DEFAULT_PREFERENCE,
    shouldPreferenceShow: false,
    selectLog: null,
  }

  componentDidMount() {
    this.refreshLogs()
  }

  onQueryFieldChange = fields => {
    this.props.tab.updateFields(fields)
    this.refreshLogs()
  }

  async refreshLogs() {
    this.refreshLogList()
    this.refreshHistograms()
  }

  handleRefreshClick = () => {
    this.refreshLogs()
  }

  async refreshHistograms() {
    const { fields = [] } = this.props.tab
    await this.histogramStore.search({}, fields)
    this.histogramStore.stopWatchNewLogs()

    if (this.logDetailStore.recent) {
      this.histogramStore.watchNewLogs({
        pollingInterval: 5000,
        startCollectTime: this.histogramStore.endTime,
      })
    }
  }

  async refreshLogList() {
    const { fields = [] } = this.props.tab
    this.logDetailStore.clearPreParams()
    await this.logDetailStore.search({}, fields)
    this.logDetailStore.stopWatchNewLogs()

    if (this.logDetailStore.recent) {
      this.logDetailStore.watchNewLogs({
        startCollectTime: this.logDetailStore.endTime,
        pollingInterval: 5000,
        maxLogFetchCount: 50,
      })
    }
  }

  handleRecentSelect = ({ interval, ...recent }) => {
    this.histogramStore.updateInterval(interval)
    this.histogramStore.setTimeRangeWithRecent(recent)

    this.logDetailStore.setTimeRangeWithRecent(recent)

    this.refreshLogs()
  }

  handleCustomSubmit = ({ startTime, endTime, interval }) => {
    const timeRange = {
      startTime: +startTime,
      endTime: +endTime,
    }

    this.histogramStore.setTimeRangeDirect(timeRange)
    this.histogramStore.updateInterval(interval)
    this.logDetailStore.setTimeRangeDirect(timeRange)

    this.refreshLogs()
  }

  handleLogScrollTop = () => {
    this.logDetailStore.fetchMore()
  }

  handlePreferenceChange = preference => {
    this.setState({ preference })
    setLocalStorageItem(
      LOG_TOOL_PREFERENCE_LG_KEY,
      preference,
      PREFERENCES_SETTING_EXPIRED
    )
  }

  handlePreferenceButtonClick = () => {
    this.setState(({ shouldPreferenceShow }) => ({
      shouldPreferenceShow: !shouldPreferenceShow,
    }))
  }

  handleLogSelect = index => {
    this.setState({
      selectLog: this.logDetailStore.records.reverse()[index],
    })
  }

  handleLogDetailHideButtonClick = () => {
    this.setState({
      selectLog: null,
    })
  }

  onReplaceFilterClick = (fields, value) => {
    const preFields = this.props.tab.fields || []
    const filterFields = preFields.filter(({ key }) => key !== fields)
    this.props.tab.updateFields([...filterFields, { key: fields, value }])
    this.refreshLogs()
  }

  onAddFilterClick = (fields, value) => {
    const preFields = this.props.tab.fields
    this.props.tab.updateFields([...preFields, { key: fields, value }])
    this.refreshLogs()
  }

  onNewTagFilterClick = (fields, value) => {
    this.props.onNewTagOpen({ key: fields, value })
  }

  render() {
    const histogramStore = this.histogramStore
    const {
      isLoading,
      recent,
      supportQueryFields,
      interval,
      histograms,
      intervalMillisecond,
    } = histogramStore

    const {
      records,
      timeRange,
      isLoading: isDetailLoading,
      loadingMore,
    } = this.logDetailStore

    const { tab } = this.props
    const fields = toJS(tab.fields)

    const reverseRecords = records.reverse()

    /**
     * when time range is recent time, should poll log status
     * */
    const isMonitoring = recent

    /**
     * 建议参考自定义监控的方式，将页面切割成若干个 Container 组件的树
     */
    return (
      <LogSearchPage
        recent={recent}
        fields={fields}
        isHistogramLoading={isLoading}
        isDetailLoading={isDetailLoading}
        interval={interval}
        supportQueryFields={supportQueryFields}
        timeRange={timeRange}
        onQueryFieldChange={this.onQueryFieldChange}
        recentOpts={this.RECENT_OPTS}
        intervalOpts={this.INTERVAL_OPTS}
        histograms={histograms}
        records={reverseRecords}
        onRecentSelect={this.handleRecentSelect}
        onCustomSubmit={this.handleCustomSubmit}
        isMonitoring={isMonitoring}
        onLogScrollTop={this.handleLogScrollTop}
        preference={this.state.preference}
        onPreferenceChange={this.handlePreferenceChange}
        shouldPreferenceShow={this.state.shouldPreferenceShow}
        onPreferenceButtonClick={this.handlePreferenceButtonClick}
        onLogSelect={this.handleLogSelect}
        selectLog={this.state.selectLog}
        onLogDetailHideButtonClick={this.handleLogDetailHideButtonClick}
        onReplaceClick={this.onReplaceFilterClick}
        onAddClick={this.onAddFilterClick}
        onNewTagClick={this.onNewTagFilterClick}
        loadingMore={loadingMore}
        intervalMillisecond={intervalMillisecond}
        onRefreshClick={this.handleRefreshClick}
      />
    )
  }
}
