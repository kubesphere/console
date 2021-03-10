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
import classNames from 'classnames'
import { observer } from 'mobx-react'
import { get, isEmpty } from 'lodash'
import {
  Level,
  LevelLeft,
  LevelRight,
  Loading,
  Pagination,
  InputSearch,
  Button,
} from '@kube-design/components'

import { Panel } from 'components/Base'
import ClusterSelect from 'workspaces/components/ResourceTable/ClusterSelect'
import ApplicationStore from 'stores/openpitrix/application'
import InstanceItem from './Item'

import styles from './index.scss'

@observer
export default class InstanceList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      uploadModal: false,
      cluster: get(props, 'clusters[0].name', ''),
    }

    this.store = new ApplicationStore()
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = (params = {}) => {
    const { appId, versionId, workspace } = this.props
    const { cluster } = this.state

    this.store.fetchList({
      app_id: appId,
      version_id: versionId,
      workspace,
      cluster,
      ...params,
    })
  }

  getPagination = () => {
    const { page, limit, total } = this.store.list
    const pagination = { page, limit, total }
    return pagination
  }

  handleSearch = keyword => {
    this.searchValue = keyword
    this.fetchData({ keyword })
  }

  handleRefresh = () => {
    const params = this.searchValue ? { keyword: this.searchValue } : {}
    this.fetchData(params)
  }

  handlePage = page => {
    this.fetchData({ page })
  }

  handleClusterChange = cluster => {
    this.setState({ cluster }, () => {
      this.fetchData()
    })
  }

  renderClusters() {
    const { clusters } = this.props

    if (isEmpty(clusters)) {
      return null
    }

    const options = clusters.map(item => ({
      label: item.name,
      value: item.name,
      disabled: !item.isReady,
      cluster: item,
    }))

    return (
      <ClusterSelect
        clusters={options}
        cluster={this.state.cluster}
        onChange={this.handleClusterChange}
      />
    )
  }

  renderHeader = () => (
    <div className={styles.header}>
      {this.renderClusters()}
      <InputSearch
        className={styles.search}
        name="search"
        placeholder={t('Filter by keyword')}
        onSearch={this.handleSearch}
      />
      <div className={styles.actions}>
        <Button type="flat" icon="refresh" onClick={this.handleRefresh} />
      </div>
    </div>
  )

  renderContent() {
    const { versionId } = this.props
    const { data, isLoading } = this.store.list

    if (isLoading) {
      return <Loading className={styles.loading} />
    }

    return (
      <div className={styles.body}>
        {isEmpty(data) ? (
          <div className={styles.empty}>{t('RESOURCE_NOT_FOUND')}</div>
        ) : (
          data.map(item => (
            <InstanceItem
              key={item.name}
              detail={item}
              showVersion={!versionId}
            />
          ))
        )}
      </div>
    )
  }

  renderFooter = () => {
    const { total, page, limit } = this.getPagination()

    return (
      <Level className={styles.footer}>
        <LevelLeft>{t('TOTAL_ITEMS', { num: total })}</LevelLeft>
        <LevelRight>
          <Pagination
            page={page}
            total={total}
            limit={limit}
            onChange={this.handlePage}
          />
        </LevelRight>
      </Level>
    )
  }

  render() {
    const { className, title, hideHeader, hideFooter } = this.props

    return (
      <Panel
        className={classNames(styles.main, className)}
        title={title || t('App Instances')}
      >
        <div className={styles.inner}>
          {!hideHeader && this.renderHeader()}
          {this.renderContent()}
          {!hideFooter && this.renderFooter()}
        </div>
      </Panel>
    )
  }
}
