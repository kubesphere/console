import React, { Fragment } from 'react'
import { Select } from '@pitrix/lego-ui'
import { observer } from 'mobx-react'
import { action, observable } from 'mobx'
import { min } from 'lodash'

import SearchInput from 'components/Modals/LogSearch/Logging/SearchInput'
import Table from 'components/Tables/Visible'
import AuditingStore from 'stores/auditing'

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

    this.store = new AuditingStore({ size: 50 })
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
      key: 'Time',
      content: ({ RequestReceivedTimestamp }) => RequestReceivedTimestamp,
      hidden: false,
      className: styles.timecol,
    },
    {
      thead: t('verb'),
      key: 'verb',
      hidden: false,
      content: ({ Verb }) => Verb,
      className: styles.Verbcol,
    },
    {
      thead: t('Status Code'),
      key: 'Status Code',
      hidden: false,
      content: ({ ResponseStatus: { code } = {} }) => code,
      className: styles.statuscol,
    },
    {
      thead: t('reason'),
      key: 'reason',
      hidden: true,
      content: ({ ResponseStatus: { reason } = {} }) => reason,
      className: styles.reasoncol,
    },
    {
      thead: t('resources'),
      key: 'resources',
      hidden: false,
      content: ({ ObjectRef: { Name } = {} }) => Name,
      className: styles.namecol,
    },
    {
      thead: t('Resource Type'),
      key: 'Resource Type',
      hidden: false,
      content: ({ ObjectRef: { Resource } = {} }) => Resource,
      className: styles.typecol,
    },
    {
      thead: t('Subresource'),
      key: 'Subresource',
      hidden: true,
      content: ({ ObjectRef: { Subresource } = {} }) => Subresource,
      className: styles.subresourcecol,
    },
    {
      thead: t('Project'),
      key: 'Project',
      hidden: false,
      content: ({ ObjectRef: { Namespace } = {} }) => Namespace,
      className: styles.namespacecol,
    },
    {
      thead: t('Workspace'),
      key: 'Workspace',
      hidden: false,
      content: ({ Workspace }) => Workspace,
      className: styles.workspacecol,
    },
    {
      thead: t('Operation Account'),
      key: 'Operation Account',
      hidden: false,
      content: ({ User: { Username } = {} }) => Username,
      className: styles.usernamecol,
    },
    {
      thead: t('sourceIP'),
      key: 'sourceIP',
      hidden: false,
      content: ({ SourceIPs }) => SourceIPs,
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
      <Fragment>
        <div className={styles.mask} onClick={this.onCancel} />
        <div className={styles.detail}>
          <MetadataModal detail={detail} eventMetadata={eventMetadata} />
        </div>
      </Fragment>
    )
  }
}
