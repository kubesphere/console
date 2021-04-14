import React, { Component } from 'react'
import { Select } from '@kube-design/components'
import { observable, action, toJS } from 'mobx'
import { observer } from 'mobx-react'
import { TopAxis } from 'components/Charts'
import { min } from 'lodash'
import moment from 'moment'
import EventSearchStore from 'stores/eventSearch'

import styles from './index.scss'
import SearchInput from '../SearchInput'
import Table from './Table'
import DrawerTab from '../components/drawerTab'
import Metadata from '../components/Metadata'
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

  store = new EventSearchStore({
    size: 50,
  })

  // 匹配模式（精确匹配，模糊匹配）
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

  // 获取输入框的参数
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

  // 获取表格日志
  @action
  async fetchQuery(pars) {
    const { cluster } = this.props.searchInputState
    const params = { ...pars, cluster }
    await this.store.fetchQuery(params)
    return this.store.data
  }

  // 获取直方图统计数据
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

  @action
  drawerClick = rowData => {
    this.selectedRow = rowData
    this.drawerShow = !this.drawerShow
  }

  @action rotateImg = () => {
    this.sortLog = !this.sortLog
    this.logs = this.logs.reverse()
  }

  renderSearch = () => {
    const { searchInputState } = this.props
    return (
      <div className={styles.searchBox}>
        <SearchInput
          className={styles.inputBox}
          placeholder={t('search condition')}
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
      unit: t('个'),
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

  renderTable = () => {
    return (
      <div className={styles.table}>
        <div className={styles.tableHead}>
          <div className={styles.timeTitle}>
            <span>时间</span>
            <img
              onClick={() => this.rotateImg()}
              className={this.sortLog ? styles.sortAgain : ''}
              src="/assets/log-search-sort.svg"
              alt="log-search-sort"
            ></img>
          </div>
          <div className={styles.typeTitle}>类别</div>
          <div className={styles.sourceTitle}>资源</div>
          <div className={styles.reasonTitle}>原因</div>
          <div className={styles.messageTitle}>消息</div>
        </div>
        <Table data={this.logs} drawerClick={this.drawerClick}></Table>
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
    const query = toJS(this.props.searchInputState)
    return (
      <DrawerTab>
        <div>
          <div className={styles.drawerPanel}>
            <p className={styles.title}>事件元数据</p>
            {this.renderEventMetadata()}
          </div>
        </div>
        <div>
          <div className={styles.drawerPanel}>
            <p className={styles.title}>操作详情</p>
            <div className={styles.desLine}>
              <div className={styles.left}>集群:</div>
              <div className={styles.right}>{query.cluster}</div>
            </div>
            <div className={styles.desLine}>
              <div className={styles.left}>项目:</div>
              <div className={styles.right}>
                {this.selectedRow.involvedObject.name}
              </div>
            </div>
            <div className={styles.desLine}>
              <div className={styles.left}>资源:</div>
              <div className={styles.right}>
                {this.selectedRow.source.component}
              </div>
            </div>
            <div className={styles.desLine}>
              <div className={styles.left}>关联资源:</div>
              <div className={styles.right}></div>
            </div>
            <div className={styles.desLine}>
              <div className={styles.left}>类别:</div>
              <div className={styles.right}>
                {this.selectedRow.involvedObject.kind}
              </div>
            </div>
            <div className={styles.desLine}>
              <div className={styles.left}>Count:</div>
              <div className={styles.right}>{this.selectedRow.count}</div>
            </div>
            <div className={styles.desLine}>
              <div className={styles.left}>Source:</div>
              <div className={styles.right}>
                {this.selectedRow.source.component}
              </div>
            </div>
            <div className={styles.desLine}>
              <div className={styles.left}>开始时间:</div>
              <div className={styles.right}>
                {moment(this.selectedRow.firstTimestamp).format(
                  'YYYY-MM-DD HH:mm:ss'
                )}
              </div>
            </div>
            <div className={styles.desLine}>
              <div className={styles.left}>结束时间:</div>
              <div className={styles.right}>
                {moment(this.selectedRow.lastTimestamp).format(
                  'YYYY-MM-DD HH:mm:ss'
                )}
              </div>
            </div>
            <div className={styles.reasonBox}>
              <div className={styles.title}>原因:{this.selectedRow.reason}</div>
              <div className={styles.text}>消息:{this.selectedRow.message}</div>
            </div>
          </div>
        </div>
      </DrawerTab>
    )
  }

  renderEventMetadata = () => {
    const data = toArray(this.selectedRow)
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
}
