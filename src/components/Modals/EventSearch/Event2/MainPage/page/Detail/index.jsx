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

import React, { Component, Fragment } from 'react'
import { Select } from '@kube-design/components'
import { observable, action, toJS } from 'mobx'
import { observer } from 'mobx-react'
import { TopAxis } from 'components/Charts'
import { min } from 'lodash'
import moment from 'moment'
import classnames from 'classnames'
import EventSearchStore from 'stores/eventSearch'

import Table from 'components/Tables/Visible2'
import styles from './index.scss'
import SearchInput from '../components/SearchInput'
import DrawerTab from '../components/drawerTab'
import Metadata from '../components/Metadata'
import DrawerPanel from '../components/drawerTab/tabPanel'
import {
  queryKeyMapping,
  queryModeOptions,
  dropDownItems,
  toArray,
} from '../../utils'

@observer
export default class Detail extends Component {
  @observable drawerShow = false

  @observable selectedRow = []

  @observable sortLog = false

  @observable logs = []

  @observable
  tableCols = [
    {
      thead: () => (
        <div className={styles.timeTitle}>
          {t('Time')}
          <img
            className={this.sortLog ? styles.sortAgain : ''}
            src="/assets/log-search-sort.svg"
            alt="log-search-sort"
            onClick={() => this.rotateImg()}
          ></img>
        </div>
      ),
      key: 'time',
      content: ({ lastTimestamp }) =>
        `[${moment(lastTimestamp).format('YYYY-MM-DD HH:mm:ss')}]`,
      hidden: false,
      className: styles.title,
    },
    {
      thead: () => <div className={styles.typeTitle}>{t('Category')}</div>,
      key: 'type',
      hidden: false,
      content: ({ type }) => (
        <div
          className={classnames(
            styles.category,
            styles[type.toLocaleLowerCase()]
          )}
        >
          {type}
        </div>
      ),
      className: styles.type,
    },
    {
      thead: () => <div className={styles.sourceTitle}>{t('Resource')}</div>,
      key: 'kind',
      hidden: false,
      content: ({ involvedObject = {} }) => (
        <Fragment>
          <div className={styles.sourceType}>{involvedObject.kind}</div>
          <div className={styles.name}>{involvedObject.name}</div>
        </Fragment>
      ),
      className: styles.source,
    },
    {
      thead: () => <div className={styles.reasonTitle}>{t('Reason')}</div>,
      key: 'reason',
      hidden: false,
      content: ({ reason }) => reason,
      className: styles.reason,
    },
    {
      thead: () => <div className={styles.messageTitle}>{t('Message')}</div>,
      key: 'message',
      hidden: false,
      content: this.renderHightLightMatchTd,
      mustShow: true,
      className: styles.message,
    },
  ]

  store = new EventSearchStore({
    size: 50,
  })

  queryModeOptions = [1, 0].map(mode => ({
    value: mode,
    label: mode ? t('Exact Query') : t('Fuzzy Query'),
  }))

  get defaultDuration() {
    return {
      start_time: 0,
      end_time: Math.ceil(Date.now() / 1000),
      interval: '1d',
    }
  }

  get duration() {
    const { searchInputState } = this.props || {}
    const now = Math.ceil(Date.now() / 1000)
    const { start, end, step } = searchInputState

    if (start) {
      return {
        start_time: min([Math.ceil(start), now]),
        end_time: min([Math.ceil(end), now]),
        interval: step,
      }
    }
    return this.defaultDuration
  }

  componentDidMount() {
    this.refreshQuery()
    this.fetchHistogram()
  }

  getQueryParams() {
    const {
      query: inputQuery,
      queryMode,
      cluster,
    } = this.props.searchInputState
    return inputQuery
      .filter(({ key }) => key)
      .reduce(
        (searchQuery, query) => {
          const queryKey = query.key
          const newQueryValue = query.value
          const key = queryMode ? queryKey : queryKeyMapping[queryKey]
          const preQueryValue = searchQuery[key]
          searchQuery[key] = preQueryValue
            ? `${preQueryValue},${newQueryValue}`
            : newQueryValue
          return searchQuery
        },
        { cluster }
      )
  }

  @action
  async refreshQuery() {
    this.store.from = 0
    const query = this.getQueryParams()
    const result = await this.fetchQuery({ ...query, ...this.duration })
    this.logs = result.reverse()
  }

  @action
  async fetchQuery(pars) {
    const { cluster } = this.props.searchInputState
    const params = { ...pars, cluster }
    await this.store.fetchQuery(params)
    return this.store.data
  }

  @action
  async fetchHistogram() {
    const query = this.getQueryParams()
    this.store.interval = this.duration.interval
    await this.store.fetchHistogram({ ...query, ...this.duration })
  }

  render() {
    return (
      <div className={styles.detailContainer}>
        {this.renderSearch()}
        {this.renderTableBox()}
      </div>
    )
  }

  onSearchParamsChange = () => {
    this.fetchHistogram()
    this.refreshQuery()
  }

  changeQueryMode = mode => {
    this.props.searchInputState.queryMode = mode
    this.onSearchParamsChange()
  }

  renderHightLightMatchTd = ({ message }) => {
    const item = this.props.searchInputState.query.find(
      state => state.key === 'message_search'
    )
    if (!item) {
      return message
    }
    const reg = new RegExp(item.value, 'gi')
    const messages = message.split(reg)
    if (messages.length === 1) {
      return message
    }
    const match = message.match(reg)
    return (
      <Fragment>
        {messages.map((mes, i) => (
          <Fragment key={mes + i}>
            {mes}
            <span className={styles.hightLightMatch}>{match[i]}</span>
          </Fragment>
        ))}
      </Fragment>
    )
  }

  @action
  drawerClick = rowData => {
    this.selectedRow = rowData
    this.drawerShow = !this.drawerShow
  }

  @action
  rotateImg = () => {
    this.sortLog = !this.sortLog
    this.logs = this.logs.reverse()
  }

  renderSearch = () => {
    const { searchInputState } = this.props
    return (
      <div className={styles.searchBox}>
        <SearchInput
          className={styles.inputBox}
          placeholder={t('Search Condition')}
          onChange={this.onSearchParamsChange}
          params={searchInputState}
          dropDownItems={dropDownItems}
        ></SearchInput>
        <Select
          className={styles.searchRecent}
          value={searchInputState.queryMode}
          onChange={this.changeQueryMode}
          options={queryModeOptions}
        ></Select>
      </div>
    )
  }

  renderTableBox = () => {
    return (
      <>
        {this.renderTimeLine()}
        {this.renderTable()}
      </>
    )
  }

  renderTimeLine = () => {
    const { histogramData, interval } = this.store
    let { buckets = [] } = toJS(histogramData) || {}
    if (buckets === null) {
      buckets = []
    }
    const config = {
      xKey: 'time',
      title: ``,
      unit: t('Pieces'),
      data: buckets,
      bgColor: '#242e42',
      areaColors: '#36435c',
      darkMode: false,
    }
    return (
      <div className={styles.timeLine}>
        <TopAxis
          width="100%"
          interval={interval}
          height="56px"
          {...config}
        ></TopAxis>
      </div>
    )
  }

  @action
  async loadMoreLogs() {
    const from = this.store.from + this.store.size

    const newLogs = await this.fetchQuery({
      ...this.store.preParams,
      ...{ from },
    })
    this.logs.push(...newLogs)
  }

  @action
  onTableScrollEnd = ({ clientHeight, scrollHeight, scrollTop }) => {
    if (Math.ceil(clientHeight + scrollTop) >= scrollHeight) {
      const { from, size, total } = this.store
      if (total > from + size) {
        this.loadMoreLogs()
      }
    }
  }

  renderTable = () => {
    if (this.logs.length === 0) {
      return (
        <div className={styles.noResult}>
          <div className={styles.recentSummary}>
            <h2>0</h2>
            <p>{t('Search Result')}</p>
          </div>
        </div>
      )
    }
    return (
      <div className={styles.table}>
        <Table
          onScroll={this.onTableScrollEnd}
          onTrClick={this.drawerClick}
          cols={this.tableCols}
          data={this.logs}
          body={styles.tableContent}
          defaultRowHeight={24}
          sortIconClick={this.rotateImg}
        />
        <div className={this.drawerShow ? styles.drawer : styles.no_drawer}>
          {this.renderDrawerPanel()}
        </div>
      </div>
    )
  }

  renderDrawerPanel = () => {
    if (!this.drawerShow) {
      return
    }
    return (
      <DrawerTab>
        <DrawerPanel>
          <div className={styles.drawerPanel}>
            <p className={styles.title}>{t('Event Metadata')}</p>
            {this.renderEventMetadata()}
          </div>
        </DrawerPanel>
        <DrawerPanel>{this.renderOptDetail()}</DrawerPanel>
      </DrawerTab>
    )
  }

  renderEventMetadata = () => {
    const levelData = {
      '': Object.assign(this.selectedRow),
    }
    const data = toArray(levelData)
    return this.renderMetadata(data)
  }

  renderMetadata(data = []) {
    return data.map(item => {
      const key = Object.keys(item)[0]
      return (
        <Metadata key={key} data={item} renderMetadata={this.renderMetadata} />
      )
    })
  }

  renderOptDetail = () => {
    const query = toJS(this.props.searchInputState)
    return (
      <div className={styles.drawerPanel}>
        <p className={styles.title}>{t('Operation Details')}</p>
        <div className={styles.desLine}>
          <div className={styles.left}>{t('Cluster')}:</div>
          <div className={styles.right}>{query.cluster}</div>
        </div>
        <div className={styles.desLine}>
          <div className={styles.left}>{t('Project')}:</div>
          <div className={styles.right}>
            {this.selectedRow.involvedObject.name}
          </div>
        </div>
        <div className={styles.desLine}>
          <div className={styles.left}>{t('Resource')}:</div>
          <div className={styles.right}>
            {this.selectedRow.source.component}
          </div>
        </div>
        <div className={styles.desLine}>
          <div className={styles.left}>{t('Associated Resources')}:</div>
          <div className={styles.right}></div>
        </div>
        <div className={styles.desLine}>
          <div className={styles.left}>{t('Category')}:</div>
          <div className={styles.right}>
            {this.selectedRow.involvedObject.kind}
          </div>
        </div>
        <div className={styles.desLine}>
          <div className={styles.left}>{t('count')}:</div>
          <div className={styles.right}>{this.selectedRow.count}</div>
        </div>
        <div className={styles.desLine}>
          <div className={styles.left}>{t('Source')}:</div>
          <div className={styles.right}>
            {this.selectedRow.source.component}
          </div>
        </div>
        <div className={styles.desLine}>
          <div className={styles.left}>{t('Start Time')}:</div>
          <div className={styles.right}>
            {moment(this.selectedRow.firstTimestamp).format(
              'YYYY-MM-DD HH:mm:ss'
            )}
          </div>
        </div>
        <div className={styles.desLine}>
          <div className={styles.left}>{t('End Time')}:</div>
          <div className={styles.right}>
            {moment(this.selectedRow.lastTimestamp).format(
              'YYYY-MM-DD HH:mm:ss'
            )}
          </div>
        </div>
        <div className={styles.reasonBox}>
          <div className={styles.title}>
            {t('Reason')}:{this.selectedRow.reason}
          </div>
          <div className={styles.text}>
            {t('Message')}:{this.renderHightLightMatchTd(this.selectedRow)}
          </div>
        </div>
      </div>
    )
  }
}
