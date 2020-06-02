import React from 'react'
import { Select } from '@pitrix/lego-ui'
import { observer } from 'mobx-react'
import { action } from 'mobx'
import { min } from 'lodash'

import SearchInput from 'components/Modals/LogSearch/Logging/SearchInput'
import Table from 'components/Tables/Base'
import EventSearchStore from 'stores/eventSearch'

import MetadataModal from './MetadataModal'
import {
  queryKeyMapping,
  toArray,
  queryModeOptions,
  dropDownItems,
} from '../utils'
import { getColumns } from './schema'

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

    this.store = new EventSearchStore()
  }

  get list() {
    const { data, isLoading, total, page, limit } = this.store

    return (
      {
        data,
        isLoading,
        total,
        page,
        limit,
      } || {}
    )
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
    const query = this.getQueryParams()
    this.store.fetchQuery({ ...query, ...this.duration })
  }

  @action
  onFetch = params => {
    this.store.page = params.page
    this.onSearchParamsChange()
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
    const query = this.getQueryParams()
    this.store.fetchQuery({ ...query, ...this.duration })
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
    const { data, isLoading, total, page, limit } = this.list
    const pagination = { total, page, limit }

    return (
      <div className={styles.table}>
        <Table
          hideHeader
          columns={getColumns()}
          data={data}
          isLoading={isLoading}
          pagination={pagination}
          extraProps={{
            onRow: record => ({
              onClick: this.openDetailsModal.bind(this, record),
            }),
          }}
          onFetch={this.onFetch}
          name="event"
        />
      </div>
    )
  }

  render() {
    return (
      <div className={styles.container}>
        {this.renderSearchBar()}
        <div className={styles.searchResult}>
          <div className={styles.wrapper}>
            {this.renderTable()}
            {this.renderDetailModal()}
          </div>
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
