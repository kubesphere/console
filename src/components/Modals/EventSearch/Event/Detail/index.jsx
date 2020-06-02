import React, { Fragment } from 'react'
import { Select } from '@pitrix/lego-ui'
import { observer } from 'mobx-react'
import { action, observable } from 'mobx'
import { min, includes, isString } from 'lodash'
import classnames from 'classnames'
import stripAnsi from 'strip-ansi'
import { markAll, mark, esMark } from 'utils/log'
import memoizee from 'memoizee'

import SearchInput from 'components/Modals/LogSearch/Logging/SearchInput'
import Table from 'components/Tables/Visible'
import EventSearchStore from 'stores/eventSearch'

import MetadataModal from './MetadataModal'
import {
  queryKeyMapping,
  toArray,
  queryModeOptions,
  dropDownItems,
} from '../utils'

import styles from './index.scss'

@observer
export default class Detail extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      detail: {},
      eventMetadata: [],
    }

    this.store = new EventSearchStore({ size: 50 })
    this.tableRef = React.createRef()
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
    return {}
  }

  componentDidMount() {
    this.refreshQuery()
  }

  @observable
  logs = []

  @observable
  tableCols = [
    {
      thead: t('Time'),
      key: 'time',
      content: ({ lastTimestamp }) => lastTimestamp,
      hidden: false,
      className: styles.timecol,
    },
    {
      thead: t('category'),
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
      className: styles.typecol,
    },
    {
      thead: t('Project'),
      key: 'name',
      hidden: false,
      content: ({ involvedObject = {} }) => involvedObject.namespace,
      className: styles.namecol,
    },
    {
      thead: t('resources'),
      key: 'kind',
      hidden: false,
      content: ({ involvedObject = {} }) => (
        <Fragment>
          <div className={classnames(styles.normalText, styles.kind)}>
            {involvedObject.kind}
          </div>
          <div className={styles.name}>{involvedObject.name}</div>
        </Fragment>
      ),
      className: styles.kindcol,
    },
    {
      thead: t('reason'),
      key: 'reason',
      hidden: false,
      content: ({ reason }) => reason,
      className: styles.reasoncol,
    },
    {
      thead: t('message'),
      key: 'message',
      hidden: false,
      // content: ({ message }) => message,
      content: this.renderHightLightMatchTd({
        resKey: 'message',
        searchKey: ['message_search'],
        handler: esMark,
      }),
      mustShow: true,
      className: styles.messagecol,
    },
  ]

  @action
  async refreshQuery() {
    this.store.from = 0
    const query = this.getQueryParams()
    this.logs = await this.fetchQuery({ ...query, ...this.duration })
  }

  @action
  onTableScrollEnd = () => {
    const { from, size, total } = this.store
    if (total > from + size) {
      this.loadMoreLogs()
    }
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
  async fetchQuery(params) {
    await this.store.fetchQuery(params)
    return this.store.data
  }

  getQueryParams() {
    const { query: inputQuery, queryMode } = this.props.searchInputState
    return inputQuery
      .filter(({ key }) => key)
      .reduce((searchQuery, query) => {
        const queryKey = query.key
        const newQueryValue = query.value
        const key = queryMode ? queryKey : queryKeyMapping[queryKey]
        const preQueryValue = searchQuery[key]
        searchQuery[key] = preQueryValue
          ? `${preQueryValue},${newQueryValue}`
          : newQueryValue
        return searchQuery
      }, {})
  }

  onSearchParamsChange = () => {
    this.refreshQuery()
  }

  changeQueryMode = mode => {
    this.props.searchInputState.queryMode = mode
    this.onSearchParamsChange()
  }

  onCancel = () => {
    this.setState({ visible: false })
  }

  openDetailsModal = record => {
    this.setState({
      detail: record,
      eventMetadata: toArray(record),
      visible: true,
    })
  }

  markMemoizee = memoizee(markAll, {
    normalizer: ([log, args = [], handler = () => {}]) =>
      `${log}+${args.toString()})+${handler.name}`,
    maxAge: 3000,
  })

  renderHightLightMatchTd({ resKey, searchKey, handler = mark }) {
    return data => {
      const queryResult = stripAnsi(data[resKey] || '')

      const querys = this.props.searchInputState.query
        .filter(({ key, value }) => value && includes(searchKey, key))
        .map(({ value }) => value)

      const markedResult = this.markMemoizee(queryResult, querys, handler)

      return (
        <span>
          {markedResult.map((log, index) =>
            isString(log) ? (
              log
            ) : (
              <span key={index} className={styles.hightLightMatch}>
                {log.hightLighted}
              </span>
            )
          )}
        </span>
      )
    }
  }

  renderSearchBar() {
    const { searchInputState } = this.props
    return (
      <div className={styles.searchBar}>
        <SearchInput
          className={styles.searchInput}
          placeholder={t('search condition')}
          onChange={this.onSearchParamsChange}
          params={searchInputState}
          dropDownItems={dropDownItems}
        />
        <span className={styles.queryModeSelect}>
          <Select
            value={searchInputState.queryMode}
            onChange={this.changeQueryMode}
            className={styles.queryModeOptions}
            options={queryModeOptions}
          />
        </span>
      </div>
    )
  }

  renderTable = () => {
    const trKeyGetter = (tr, index) => index

    return (
      <div className={styles.table}>
        <Table
          onScrollEnd={this.onTableScrollEnd}
          trCLassName={styles.tr}
          onTrClick={this.openDetailsModal}
          trKeyGetter={trKeyGetter}
          cols={this.tableCols}
          data={this.logs}
          tableRef={this.tableRef}
          body={styles.body}
        />
      </div>
    )
  }

  render() {
    return (
      <div className={styles.container}>
        {this.renderSearchBar()}
        <div className={styles.searchResult}>
          {this.renderTable()}
          {this.renderDetailModal()}
        </div>
      </div>
    )
  }

  renderDetailModal() {
    const { visible, detail, eventMetadata } = this.state

    if (!visible) {
      return null
    }

    return (
      <React.Fragment>
        <div className={styles.mask} onClick={this.onCancel} />
        <div className={styles.detail}>
          <MetadataModal detail={detail} eventMetadata={eventMetadata} />
        </div>
      </React.Fragment>
    )
  }
}
