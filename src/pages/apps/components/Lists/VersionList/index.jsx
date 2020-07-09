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
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { isEmpty, get } from 'lodash'
import {
  Level,
  LevelLeft,
  LevelRight,
  Pagination,
  Loading,
} from '@pitrix/lego-ui'

import { Card, Search, Button, Notify } from 'components/Base'
import HelmUploadModal from 'apps/components/Modals/HelmUpload'

import { STORE_QUERY_STATUS } from 'configs/openpitrix/app'
import VersionItem from './Item'

import styles from './index.scss'

@observer
export default class VersionList extends React.Component {
  static propTypes = {
    versionStore: PropTypes.object,
    appStore: PropTypes.object,
    title: PropTypes.string,
    appId: PropTypes.string,
    appDetail: PropTypes.object,
    params: PropTypes.object,
    isAdmin: PropTypes.bool,
    hideHeader: PropTypes.bool,
    hideFooter: PropTypes.bool,
    onSearch: PropTypes.func,
    onRefresh: PropTypes.func,
    onPage: PropTypes.func,
  }

  static defaultProps = {
    versionStore: {},
    appStore: {},
    title: 'Versions',
    appId: '',
    appDetail: {},
    params: {},
    isAdmin: false,
    hideHeader: false,
    hideFooter: false,
    onSearch() {},
    onRefresh() {},
    onPage() {},
  }

  constructor(props) {
    super(props)

    this.state = {
      uploadModal: false,
    }

    this.store = this.props.versionStore
  }

  componentDidMount() {
    this.fetchData()
  }

  get isTable() {
    const { hideHeader, hideFooter } = this.props
    return !hideHeader || !hideFooter
  }

  get enabledActions() {
    if (!this.props.params.workspace) {
      return ['manage']
    }

    return globals.app.getActions({
      workspace: this.props.params.workspace,
      module: 'app-templates',
    })
  }

  fetchData = (params = {}) => {
    const { appId, workspace, isAdmin } = this.props
    const status = isAdmin ? STORE_QUERY_STATUS : this.store.defaultStatus

    this.store.fetchList({
      app_id: appId,
      workspace,
      status,
      ...params,
    })
  }

  getPagination = () => {
    const { page, limit, total } = this.store.list
    const pagination = { page, limit, total }
    return pagination
  }

  handleExpandExtra = versionId => {
    const versions = get(this.store, 'list.data', [])

    this.store.list.data = versions.map(item => ({
      ...item,
      isExpand: item.version_id === versionId ? !item.isExpand : false,
    }))
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

  addVersion = () => this.setState({ uploadModal: true })

  hideModal = () => this.setState({ uploadModal: false })

  handleCreate = params => {
    this.store.create(params).then(() => {
      this.setState({ uploadModal: false })
      Notify.success({ content: `${t('Created Successfully')}!` })
      this.fetchData()
    })
  }

  renderHeader = () => {
    const { isAdmin } = this.props

    return (
      <div className={styles.header}>
        <Search
          className={styles.search}
          name="search"
          placeholder={t('Please input a keyword to filter')}
          onSearch={this.handleSearch}
        />
        <div className={styles.actions}>
          <Button type="flat" icon="refresh" onClick={this.handleRefresh} />
          {!isAdmin && this.enabledActions.includes('manage') && (
            <Button onClick={this.addVersion}>{t('New Version')} </Button>
          )}
        </div>
      </div>
    )
  }

  renderContent() {
    const { data, isLoading } = this.store.list
    const { appDetail, isAdmin, params, appStore } = this.props

    const content = (
      <div className={styles.body}>
        {isEmpty(data) ? (
          <div className={styles.empty}>{t('RESOURCE_NOT_FOUND')}</div>
        ) : (
          data.map(item => (
            <VersionItem
              key={item.version_id}
              isAdmin={isAdmin}
              appDetail={appDetail}
              detail={item}
              params={params}
              store={this.store}
              appStore={appStore}
              enabledActions={this.enabledActions}
              handleExpandExtra={this.handleExpandExtra}
            />
          ))
        )}
      </div>
    )

    return this.isTable ? (
      <Loading spinning={isLoading}>{content}</Loading>
    ) : (
      content
    )
  }

  renderFooter = () => {
    const { total, page, limit } = this.getPagination()

    return (
      <Level className={styles.footer}>
        <LevelLeft>{t('TOTAL_ITEMS', { num: total })}</LevelLeft>
        <LevelRight>
          <Pagination
            current={page}
            total={total}
            pageSize={limit}
            onChange={this.handlePage}
          />
        </LevelRight>
      </Level>
    )
  }

  renderModals() {
    const { appId, workspace } = this.props
    const { isSubmitting } = this.store

    return (
      <div>
        <HelmUploadModal
          title={t('UPLOAD_HELM_TITLE')}
          description={t('New Version')}
          icon={'templet'}
          visible={this.state.uploadModal}
          appId={appId}
          workspace={workspace}
          isSubmitting={isSubmitting}
          type={'ADD_VERSION'}
          onOk={this.handleCreate}
          onCancel={this.hideModal}
        />
      </div>
    )
  }

  render() {
    const { className, title, hideHeader, hideFooter } = this.props
    const { data, isLoading } = this.store.list
    const isTable = this.isTable

    return (
      <div className={styles.wrapper}>
        <div className={styles.title}>{t(title)}</div>
        <Card
          className={classnames(styles.main, className, {
            [styles.table]: isTable,
          })}
          empty={t('NOT_AVAILABLE', { resource: t('Version') })}
          isEmpty={!isTable && isEmpty(data)}
          loading={!isTable && isLoading}
        >
          <div className={styles.inner}>
            {!hideHeader && this.renderHeader()}
            {this.renderContent()}
            {!hideFooter && this.renderFooter()}
            {this.renderModals()}
          </div>
        </Card>
      </div>
    )
  }
}
