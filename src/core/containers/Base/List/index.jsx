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
import { parse } from 'qs'
import classnames from 'classnames'
import { toJS } from 'mobx'
import { isEmpty, isFunction } from 'lodash'
import { Menu, Icon, Dropdown } from '@pitrix/lego-ui'
import { cacheFunc } from 'utils'
import { MODULE_KIND_MAP } from 'utils/constants'
import formPersist from 'utils/form.persist'
import { Button, Notify } from 'components/Base'
import EmptyTable from 'components/Cards/EmptyTable'
import Banner from 'components/Cards/Banner'
import BaseTable from 'components/Tables/Base'
import DeleteModal from 'components/Modals/Delete'

import styles from './index.scss'

export default class BaseList extends React.Component {
  constructor(props, options = {}) {
    super(props)

    this.options = options

    this.state = {}

    this.init()
  }

  init() {
    this.store = {}
  }

  componentDidMount() {
    this.unsubscribe = this.routing.history.subscribe(location => {
      if (location.pathname === this.props.match.url) {
        const params = parse(location.search.slice(1))
        this.getData(params)
      }
    })
  }

  componentWillUnmount() {
    this.unMountActions && this.unMountActions()
  }

  get enabledActions() {
    return globals.app.getActions({
      module: this.authKey,
      workspace: this.props.match.params.workspace,
      project: this.props.match.params.namespace,
      devops: this.props.match.params.devops,
    })
  }

  get module() {
    return ''
  }

  get authKey() {
    return this.module
  }

  get name() {
    return ''
  }

  get title() {
    return `${this.name}s`
  }

  get className() {
    return ''
  }

  get prefix() {
    return this.props.match.url
  }

  get routing() {
    return this.props.rootStore.routing
  }

  get list() {
    return this.store.list || {}
  }

  get tips() {
    return []
  }

  get rowKey() {
    return 'name'
  }

  get itemActions() {
    return [
      {
        key: 'edit',
        icon: 'pen',
        text: t('Edit'),
        action: 'edit',
        onClick: this.showModal('editModal'),
      },
      {
        key: 'delete',
        icon: 'trash',
        text: t('Delete'),
        action: 'delete',
        onClick: this.showModal('deleteModal'),
      },
    ]
  }

  get enabledItemActions() {
    return this.itemActions.filter(
      item => !item.action || this.enabledActions.includes(item.action)
    )
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
        this.setState({ [type]: false, selectItem: {} })
      },
      this
    )

  async getData({ silent, ...params } = {}) {
    silent && (this.list.silent = true)
    await this.store.fetchList({ ...this.props.match.params, ...params })
    this.list.silent = false
  }

  getTableProps() {
    return {
      onFetch: this.handleFetch,
      onSelectRowKeys: this.handleSelectRowKeys,
      onDelete: this.showModal('batchDeleteModal'),
      onCreate: this.showModal('createModal'),
      selectActions: [
        {
          key: 'delete',
          type: 'danger',
          text: t('Delete'),
          action: 'delete',
          onClick: this.showModal('batchDeleteModal'),
        },
      ],
    }
  }

  getEnabledTableProps() {
    const props = this.getTableProps()

    if (!this.enabledActions.includes('delete')) {
      props.onDelete = null
    }

    if (!this.enabledActions.includes('create')) {
      props.onCreate = null
    }

    if (props.actions) {
      props.actions = props.actions.filter(
        item =>
          !item.action ||
          (typeof item.filter === 'function' && item.filter.call(this, item)) ||
          this.enabledActions.includes(item.action)
      )
    }

    if (props.selectActions) {
      props.selectActions = props.selectActions.filter(
        item => !item.action || this.enabledActions.includes(item.action)
      )
    }

    if (isEmpty(props.selectActions)) {
      props.onSelectRowKeys = null
    }

    return props
  }

  getEmptyProps() {
    return {}
  }

  getSortOrder = dataIndex =>
    this.list.order === dataIndex && (this.list.reverse ? 'descend' : 'ascend')

  getFilteredValue = dataIndex => this.list.filters[dataIndex]

  getColumns = () => []

  handleCreate = newObject => {
    let data = newObject

    if (!data) {
      return
    }

    const kind = MODULE_KIND_MAP[this.module]
    if (kind) {
      if (Object.keys(newObject).length === 1 && newObject[kind]) {
        data = newObject[kind]
      }
    }

    this.store.create(data, this.props.match.params).then(() => {
      this.hideModal('createModal')()
      Notify.success({ content: `${t('Created Successfully')}!` })
      this.getData({ silent: true })
      formPersist.delete(`${this.module}_create_form`)
    })
  }

  handleEdit = newObject => {
    const { selectItem } = this.state

    this.store.patch(selectItem, newObject).then(() => {
      this.hideModal('editModal')()
      Notify.success({ content: `${t('Updated Successfully')}!` })
      this.routing.query()
    })
  }

  handleDelete = () => {
    const { selectItem } = this.state

    this.store.delete(selectItem, this.props.match.params).then(() => {
      this.hideModal('deleteModal')()
      Notify.success({ content: `${t('Deleted Successfully')}!` })
      this.routing.query()
    })
  }

  handleMoreMenuClick = item => (e, key) => {
    const action = this.enabledItemActions.find(_action => _action.key === key)
    if (action && action.onClick) {
      action.onClick(item)
    }

    this.setState({ selectItem: item })
  }

  handleFetch = (params, refresh) => {
    this.routing.query(params, refresh)
  }

  handleSelectRowKeys = params => {
    this.store.setSelectRowKeys(params)
  }

  handleBatchDelete = () => {
    const { selectedRowKeys } = this.list

    if (selectedRowKeys.length > 0) {
      this.store
        .batchDelete(selectedRowKeys, this.props.match.params)
        .then(() => {
          this.hideModal('batchDeleteModal')()
          Notify.success({ content: `${t('Deleted Successfully')}!` })
          this.store.setSelectRowKeys([])
          this.routing.query()
        })
    }
  }

  renderMore = (field, record) => {
    if (isEmpty(this.enabledItemActions)) {
      return null
    }

    const content = this.renderMoreMenu(record)

    if (content === null) {
      return null
    }

    return (
      <Dropdown content={content} trigger="click" placement="bottomRight">
        <Button icon="more" type="flat" />
      </Dropdown>
    )
  }

  renderMoreMenu = record => {
    const items = this.enabledItemActions.map(action => {
      const show = isFunction(action.show)
        ? action.show(record)
        : action.show || true
      if (!show) return null

      return (
        <Menu.MenuItem key={action.key}>
          <Icon name={action.icon} />{' '}
          <span data-test={`table-item-${action.key}`}>{action.text}</span>
        </Menu.MenuItem>
      )
    })

    if (items.every(item => item === null)) {
      return null
    }

    return <Menu onClick={this.handleMoreMenuClick(record)}>{items}</Menu>
  }

  renderHeader() {
    return (
      <Banner
        className="margin-b12"
        title={t(this.title)}
        description={t(`${this.name.toUpperCase()}_DESC`)}
        module={this.module}
        tips={this.tips}
      />
    )
  }

  renderEmpty() {
    const onCreate = this.enabledActions.includes('create')
      ? this.showModal('createModal')
      : null

    return (
      <EmptyTable
        name={this.name}
        onCreate={onCreate}
        {...this.getEmptyProps()}
      />
    )
  }

  renderTable() {
    const {
      data,
      filters = {},
      keyword,
      selectedRowKeys,
      isLoading,
      total,
      page,
      limit,
      silent,
    } = this.list

    const isEmptyList = isLoading === false && total === 0

    if (isEmptyList && Object.keys(filters).length <= 0 && isEmpty(keyword)) {
      return this.renderEmpty()
    }

    const pagination = { total, page, limit }

    return (
      <BaseTable
        data={data}
        columns={this.getColumns()}
        filters={filters}
        keyword={keyword}
        pagination={pagination}
        isLoading={isLoading}
        silentLoading={silent}
        rowKey={this.rowKey}
        selectedRowKeys={toJS(selectedRowKeys)}
        {...this.getEnabledTableProps()}
      />
    )
  }

  renderModals() {
    const { deleteModal, batchDeleteModal, selectItem = {} } = this.state
    const { isSubmitting } = this.store
    return (
      <div>
        <DeleteModal
          type={t(this.name)}
          resource={selectItem[this.rowKey]}
          visible={deleteModal}
          onOk={this.handleDelete}
          onCancel={this.hideModal('deleteModal')}
          isSubmitting={isSubmitting}
        />
        {this.list.selectedRowKeys && (
          <DeleteModal
            type={t(this.name)}
            resource={this.list.selectedRowKeys.join(', ')}
            visible={batchDeleteModal}
            onOk={this.handleBatchDelete}
            onCancel={this.hideModal('batchDeleteModal')}
            isSubmitting={isSubmitting}
          />
        )}
        {this.renderExtraModals()}
      </div>
    )
  }

  renderExtraModals() {
    return null
  }

  render() {
    return (
      <div className={classnames(styles.wrapper, this.className)}>
        {this.renderHeader()}
        {this.renderTable()}
        {this.renderModals()}
      </div>
    )
  }
}
