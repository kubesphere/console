import React from 'react'
import { action, toJS } from 'mobx'
import { observer } from 'mobx-react'
import moment from 'moment-mini'
import classnames from 'classnames'
import { Icon, Loading } from '@pitrix/lego-ui'

import SearchInput from 'components/Modals/LogSearch/Logging/SearchInput'
import TimeBar from 'components/Charts/Bar/TimeBar'
import EventSearchStore from 'stores/eventSearch'

import { dropDownItems } from '../utils'

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
  eventSearchStore = new EventSearchStore()

  supportQueryParams = [
    {
      icon: 'magnifier',
      title: t('Search Events by', { field: t('Key Word') }),
      tips: t('KeyWord Event Query Tip'),
      key: 'workspace_filter',
    },
    {
      icon: 'project',
      title: t('Search Events by', { field: t('Project') }),
      tips: t('Project Event Query Tip'),
      key: 'involved_object_namespace_filter',
    },
    {
      icon: 'log',
      title: t('Search Events by', { field: t('name') }),
      tips: t('Name Event Query Tip'),
      key: 'involved_object_name_filter',
    },
    {
      icon: 'pod',
      title: t('Search Events by', { field: t('Pods') }),
      tips: t('Pod Event Query Tip'),
      key: 'involved_object_kind_filter',
    },
    {
      icon: 'resource',
      title: t('Search Events by', { field: t('reason') }),
      tips: t('Reason Event Query Tip'),
      key: 'reason_filter',
    },
    {
      icon: 'listview',
      title: t('Search Events by', { field: t('message') }),
      tips: t('Message Event Query Tip'),
      key: 'message_search',
    },
    {
      icon: 'table-chart',
      title: t('Search Events by', { field: t('category') }),
      tips: t('Category Event Query Tip'),
      key: 'type_filter',
    },
  ]

  componentDidMount() {
    this.eventSearchStore.fetchHistogram()
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
    return (
      <div className={styles.banner}>
        <div className={styles.illustration}>
          <img src="/assets/log-statistics.svg" alt="log-statistics" />
        </div>
        <Loading spinning={this.eventSearchStore.isLoading}>
          <div className={styles.statistics}>
            <h3>
              {t.html('TOTAL_EVENTS_TODAY', {
                events: this.eventSearchStore.histogramData.total,
                className: styles.count,
              })}
            </h3>
            <p>
              <Icon name="clock" />
              {t('Current Statistics Start Time')}:
              {moment(new Date()).format(`${t('LOG_DATE')}`)}
            </p>
          </div>
        </Loading>
      </div>
    )
  }

  renderSearchBar() {
    const { searchInputState } = this.props
    return (
      <SearchInput
        className={styles.searchBar}
        onChange={this.onSearchParamsChange}
        params={searchInputState}
        dropDownItems={dropDownItems}
      />
    )
  }

  renderRecentLogs() {
    const { isLoading, histogramData = {}, interval } = this.eventSearchStore
    return (
      <Loading spinning={isLoading}>
        <div className={classnames(styles.card, styles.recent)}>
          <div className={styles.recentSummary}>
            <h2 className={styles.count}>{histogramData.total}</h2>
            <p>
              {t('Trends in the total number of events in the last 12 hours')}
            </p>
          </div>
          <div className={styles.chart}>
            <TimeBar
              xKey={'time'}
              data={toJS(histogramData.buckets || [])}
              legend={[['count', t('Event statistics')]]}
              interval={interval}
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
