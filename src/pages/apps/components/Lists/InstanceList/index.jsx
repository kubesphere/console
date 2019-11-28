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

import { Card, Search, Button } from 'components/Base'

import InstanceStore from 'stores/openpitrix/instance'
import InstanceItem from './Item'

import styles from './index.scss'

@observer
export default class InstanceList extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    appId: PropTypes.string,
    versionId: PropTypes.string,
    hideHeader: PropTypes.bool,
    hideFooter: PropTypes.bool,
    onSearch: PropTypes.func,
    onRefresh: PropTypes.func,
    onPage: PropTypes.func,
  }

  static defaultProps = {
    title: '',
    appId: '',
    versionId: '',
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

    this.store = new InstanceStore()
  }

  componentDidMount() {
    this.fetchData()
  }

  get isTable() {
    const { hideHeader, hideFooter } = this.props
    return !hideHeader || !hideFooter
  }

  fetchData = (params = {}) => {
    const { appId, versionId } = this.props

    this.store.fetchList({
      app_id: appId,
      version_id: versionId,
      noLimit: true,
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
            <InstanceItem
              key={item.cluster.cluster_id}
              detail={item}
              store={this.store}
              showVersion={!this.props.versionId}
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
            [styles.versionBg]: hideHeader,
          })}
          empty={t('NOT_AVAILABLE', { resource: t('Version') })}
          isEmpty={!isTable && !hideHeader && isEmpty(data)}
          loading={!isTable && isLoading}
        >
          <div className={styles.inner}>
            {!hideHeader && this.renderHeader()}
            {this.renderContent()}
            {!hideFooter && this.renderFooter()}
          </div>
        </Card>
      </div>
    )
  }
}
