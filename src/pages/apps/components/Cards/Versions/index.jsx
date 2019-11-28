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
import { isEmpty } from 'lodash'
import {
  Level,
  LevelLeft,
  LevelRight,
  Pagination,
  Loading,
} from '@pitrix/lego-ui'

import { Card, Search, Button, Notify } from 'components/Base'
import UploadModal from 'apps/components/Modals/HelmUpload'

import { cacheFunc } from 'utils'
import VersionStore from 'stores/openpitrix/version'
import FileStore from 'stores/openpitrix/file'
import VersionItem from './Item'

import styles from './index.scss'

@observer
export default class VersionsCard extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    appId: PropTypes.string,
    appName: PropTypes.string,
    hideHeader: PropTypes.bool,
    hideFooter: PropTypes.bool,
    onSearch: PropTypes.func,
    onRefresh: PropTypes.func,
    onPage: PropTypes.func,
    limit: PropTypes.number,
  }

  static defaultProps = {
    title: 'Versions',
    appId: '',
    appName: '',
    hideHeader: false,
    hideFooter: false,
    onSearch() {},
    onRefresh() {},
    onPage() {},
  }

  constructor(props) {
    super(props)

    this.state = {}

    this.store = new VersionStore()
    this.fileStore = new FileStore()
  }

  componentDidMount() {
    this.fetchData()
  }

  get isTable() {
    const { hideHeader, hideFooter } = this.props
    return !hideHeader || !hideFooter
  }

  fetchData = async (params = {}) => {
    const { appId } = this.props
    this.store.fetchList({
      app_id: appId,
      limit: 100,
      ...params,
    })
  }

  getPagination = () => {
    const { page, limit, total } = this.store.list
    const pagination = { page, limit, total }
    return pagination
  }

  handleSearch = value => {
    this.searchValue = value
    this.fetchData({
      name: value,
    }).then(() => {
      this.props.onSearch(value)
    })
  }

  handleRefresh = () => {
    const params = this.searchValue ? { name: this.searchValue } : {}

    this.fetchData(params).then(() => {
      const { onSearch, onRefresh } = this.props
      isEmpty(params) ? onRefresh() : onSearch(this.searchValue)
    })
  }

  handlePage = page => {
    this.fetchData({ page }).then(() => {
      this.props.onPage(page)
    })
  }

  showModal = type =>
    cacheFunc(
      `_showModal_${type}`,
      () => {
        this.setState({ [type]: true })
      },
      this
    )

  hideModal = type =>
    cacheFunc(
      `_hideModal_${type}`,
      () => {
        this.setState({ [type]: false })
        this.store.packageBase64Str = ''
      },
      this
    )

  addVersion = () => {
    this.showModal('uploadModal')
    this.setState({ uploadModal: true })
  }

  handleCreate = params => {
    this.store.create(params).then(() => {
      this.setState({ uploadModal: false })
      Notify.success({ content: `${t('Created Successfully')}!` })
      this.fetchData()
    })
  }

  renderHeader = () => (
    <div className={styles.header}>
      <Search
        className={styles.search}
        name="search"
        placeholder={t('Please input a keyword to filter')}
        onSearch={this.handleSearch}
      />
      <div className={styles.actions}>
        <Button type="flat" icon="refresh" onClick={this.handleRefresh} />
        <Button onClick={this.addVersion}>{t('添加版本')} </Button>
      </div>
    </div>
  )

  renderContent() {
    const { data, isLoading } = this.store.list

    const content = (
      <div className={styles.body}>
        {isEmpty(data) ? (
          <div className={styles.empty}>{t('RESOURCE_NOT_FOUND')}</div>
        ) : (
          data.map(item => (
            <VersionItem
              key={item.version_id}
              appName={this.props.appName}
              detail={item}
              store={this.store}
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
    const { appId } = this.props
    const { isSubmitting } = this.store
    const { validatePackage, uploadPackage, packageBase64Str } = this.fileStore
    const { uploadModal } = this.state

    return (
      <div>
        <UploadModal
          title={'上传 Helm 配置文件'}
          description={'添加版本'}
          icon={'templet'}
          visible={uploadModal}
          appId={appId}
          isSubmitting={isSubmitting}
          type={'ADD_VERSION'}
          packageBase64Str={packageBase64Str}
          validatePackage={validatePackage}
          uploadPackage={uploadPackage}
          onOk={this.handleCreate}
          onCancel={this.hideModal('uploadModal')}
        />
      </div>
    )
  }

  render() {
    const { className, title, hideHeader, hideFooter } = this.props
    const { data, isLoading } = this.store.list
    const isTable = this.isTable

    return (
      <Card
        className={classnames(styles.main, className, {
          [styles.table]: isTable,
        })}
        title={t(title)}
        empty={t('NOT_AVAILABLE', { resource: t('Version') })}
        isEmpty={!isTable && isEmpty(data)}
        loading={!isTable && isLoading}
      >
        {!hideHeader && this.renderHeader()}
        {this.renderContent()}
        {!hideFooter && this.renderFooter()}
        {this.renderModals()}
      </Card>
    )
  }
}
