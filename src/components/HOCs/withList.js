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
import { reaction, toJS } from 'mobx'
import { observer, inject } from 'mobx-react'
import { throttle, isEmpty, isFunction } from 'lodash'
import { parse } from 'qs'
import isEqual from 'react-fast-compare'
import { Menu, Icon, Dropdown } from '@pitrix/lego-ui'
import { Button } from 'components/Base'
import { MODULE_KIND_MAP } from 'utils/constants'
import { trigger } from 'utils/action'

function withList(options) {
  return WrappedComponent => {
    class ListWrapper extends React.Component {
      constructor(props) {
        super(props)
        this.store = options.store || {}
        this.list = this.store.list || {}
        this.module = options.module || ''
        this.authKey = options.authKey || options.module
        this.name = options.name || ''
        this.title = `${options.name}s`
        this.rowKey = options.rowKey || 'name'
        this.query = {}

        this.itemActions = this.defaultItemActions
        this.tableActions = this.defaultTableActions
      }

      componentDidMount() {
        !this.store.noWatch && this.initWebsocket()
        this.unsubscribe = this.routing.history.subscribe(location => {
          if (location.pathname === this.props.match.url) {
            const params = parse(location.search.slice(1))
            this.query = params || {}
            this.getData(params)
          }
        })
      }

      componentDidUpdate(prevProps) {
        if (!isEqual(prevProps.match.params, this.props.match.params)) {
          this.getData()
        }
      }

      componentWillUnmount() {
        this.unsubscribe && this.unsubscribe()
        this.disposer && this.disposer()
      }

      get routing() {
        return this.props.rootStore.routing
      }

      get websocket() {
        return this.props.rootStore.websocket
      }

      get prefix() {
        return this.props.match.url
      }

      initWebsocket() {
        if ('getWatchListUrl' in this.store) {
          const url = this.store.getWatchListUrl(this.props.match.params)

          this.websocket.watch(url)

          this.getData = throttle(this.getData, 1000)

          this.disposer = reaction(
            () => this.websocket.message,
            message => {
              const kind = MODULE_KIND_MAP[this.module]
              if (
                message.object.kind === kind &&
                ['MODIFIED', 'DELETED'].includes(message.type)
              ) {
                const params = parse(location.search.slice(1))
                this.getData({ ...params, silent: true })
              }
            }
          )
        }
      }

      getData = async ({ silent, ...params } = {}) => {
        silent && (this.list.silent = true)
        await this.store.fetchList({
          ...this.props.match.params,
          ...params,
        })
        this.list.silent = false
      }

      get defaultItemActions() {
        return [
          {
            key: 'edit',
            icon: 'pen',
            text: t('Edit'),
            action: 'edit',
            onClick: item =>
              this.trigger('resource.baseinfo.edit', { detail: item }),
          },
          {
            key: 'delete',
            icon: 'trash',
            text: t('Delete'),
            action: 'delete',
            onClick: item =>
              this.trigger('resource.delete', {
                type: t(this.name),
                resource: item[this.rowKey],
                detail: item,
                success: this.getData,
              }),
          },
        ]
      }

      get enabledActions() {
        return globals.app.getActions({
          module: this.authKey,
          ...this.props.match.params,
          project:
            this.props.match.params.namespace ||
            this.props.match.params.project_id,
        })
      }

      get enabledItemActions() {
        return this.itemActions.filter(
          item => !item.action || this.enabledActions.includes(item.action)
        )
      }

      get defaultTableActions() {
        return {
          onFetch: this.routing.query,
          onSelectRowKeys: this.list.setSelectRowKeys,
          selectActions: [
            {
              key: 'delete',
              type: 'danger',
              text: t('Delete'),
              action: 'delete',
              onClick: () =>
                this.trigger('resource.delete.batch', {
                  type: t(this.name),
                  success: this.routing.query,
                }),
            },
          ],
        }
      }

      bindActions = itemActions => {
        this.itemActions = itemActions
      }

      getEnabledTableActions() {
        const tableActions = { ...this.tableActions }

        if (!this.enabledActions.includes('delete')) {
          tableActions.onDelete = null
        }

        if (!this.enabledActions.includes('create')) {
          tableActions.onCreate = null
        }

        if (tableActions.actions) {
          tableActions.actions = tableActions.actions.filter(
            item =>
              !item.action ||
              (typeof item.filter === 'function' &&
                item.filter.call(this, item)) ||
              this.enabledActions.includes(item.action)
          )
        }

        if (tableActions.selectActions) {
          tableActions.selectActions = tableActions.selectActions.filter(
            item => !item.action || this.enabledActions.includes(item.action)
          )
        }

        if (isEmpty(tableActions.selectActions)) {
          tableActions.onSelectRowKeys = null
        }

        return tableActions
      }

      getTableProps() {
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

        const pagination = { total, page, limit }

        const isEmptyList =
          isLoading === false &&
          total === 0 &&
          Object.keys(filters).length <= 0 &&
          isEmpty(keyword)

        return {
          data,
          filters,
          keyword,
          pagination,
          isLoading,
          selectedRowKeys: toJS(selectedRowKeys),
          silentLoading: silent,
          isEmptyList,
          rowKey: this.rowKey,
          module: this.module,
          ...this.getEnabledTableActions(),
        }
      }

      getBannerProps() {
        return {
          className: 'margin-b12',
          title: t(this.title),
          description: t(
            `${this.name.replace(/\s+/g, '_').toUpperCase()}_DESC`
          ),
          module: this.module,
        }
      }

      getSortOrder = dataIndex =>
        this.list.order === dataIndex &&
        (this.list.reverse ? 'descend' : 'ascend')

      getFilteredValue = dataIndex => this.list.filters[dataIndex]

      handleMoreMenuClick = item => (e, key) => {
        const action = this.enabledItemActions.find(
          _action => _action.key === key
        )
        if (action && action.onClick) {
          action.onClick(item)
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

      render() {
        return (
          <WrappedComponent
            module={this.module}
            store={this.store}
            prefix={this.prefix}
            routing={this.routing}
            query={this.query}
            bannerProps={this.getBannerProps()}
            tableProps={this.getTableProps()}
            renderMore={this.renderMore}
            getSortOrder={this.getSortOrder}
            getFilteredValue={this.getFilteredValue}
            trigger={this.trigger.bind(this)}
            bindActions={this.bindActions}
            getData={this.getData}
            {...this.props}
          />
        )
      }
    }

    return inject('rootStore')(observer(trigger(ListWrapper)))
  }
}

export default withList
