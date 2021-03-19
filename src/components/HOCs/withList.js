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
import { isEmpty, debounce } from 'lodash'
import { parse } from 'qs'
import isEqual from 'react-fast-compare'
import { MODULE_KIND_MAP } from 'utils/constants'
import { trigger } from 'utils/action'
import ObjectMapper from 'utils/object.mapper'

export default function withList(options) {
  return WrappedComponent => {
    const ObserverComponent = observer(WrappedComponent)
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
      }

      get routing() {
        return this.props.rootStore.routing
      }

      get prefix() {
        return this.props.match.url
      }

      get defaultItemActions() {
        return [
          {
            key: 'edit',
            icon: 'pen',
            text: t('Edit'),
            action: 'edit',
            onClick: item =>
              this.trigger('resource.baseinfo.edit', {
                detail: item,
                success: this.routing.query,
              }),
          },
          {
            key: 'delete',
            icon: 'trash',
            text: t('Delete'),
            action: 'delete',
            onClick: item =>
              this.trigger('resource.delete', {
                type: t(this.name),
                resource: item.name,
                detail: item,
                success: this.routing.query,
              }),
          },
        ]
      }

      get enabledActions() {
        return globals.app.getActions({
          module: this.authKey,
          ...this.props.match.params,
          project: this.props.match.params.namespace,
          devops: this.props.match.params.devops,
        })
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
                this.trigger('resource.batch.delete', {
                  type: t(this.name),
                  rowKey: this.rowKey,
                  success: this.routing.query,
                }),
            },
          ],
        }
      }

      getData = async ({ silent, ...params } = {}) => {
        this.query = params

        const namespaceParams = {}
        if (this.props.clusterStore) {
          namespaceParams.namespace = this.props.clusterStore.project
        }

        silent && (this.list.silent = true)
        await this.store.fetchList({
          ...namespaceParams,
          ...this.props.match.params,
          ...params,
        })
        this.list.silent = false
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
          name: this.name,
          enabledActions: this.enabledActions,
          itemActions: this.defaultItemActions,
          tableActions: this.defaultTableActions,
          tableId: this.props.match.path,
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

      render() {
        return (
          <ObserverComponent
            name={this.name}
            module={this.module}
            store={this.store}
            prefix={this.prefix}
            routing={this.routing}
            query={this.query}
            bannerProps={this.getBannerProps()}
            tableProps={this.getTableProps()}
            getSortOrder={this.getSortOrder}
            getFilteredValue={this.getFilteredValue}
            enabledActions={this.enabledActions}
            trigger={this.trigger.bind(this)}
            getData={this.getData}
            {...this.props}
          />
        )
      }
    }

    const injectStores = options.injectStores || ['rootStore']

    return inject(...injectStores)(observer(trigger(ListWrapper)))
  }
}

export function withProjectList(options) {
  return withList({ injectStores: ['rootStore', 'projectStore'], ...options })
}

export function withClusterList(options) {
  return withList({ injectStores: ['rootStore', 'clusterStore'], ...options })
}

export function withDevOpsList(options) {
  return withList({ injectStores: ['rootStore', 'devopsStore'], ...options })
}

export class ListPage extends React.Component {
  get store() {
    return this.props.store
  }

  get websocket() {
    return this.props.rootStore.websocket
  }

  get routing() {
    return this.props.rootStore.routing
  }

  componentDidMount() {
    if (!this.props.noWatch) {
      this.initWebsocket()
    }

    this.unsubscribe = this.routing.history.subscribe(location => {
      if (location.pathname === this.props.match.url) {
        const params = parse(location.search.slice(1))
        this.query = params || {}
        this.props.getData(params)
      }
    })
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.match.params, this.props.match.params)) {
      this.props.getData()
      if (!this.props.noWatch) {
        this.initWebsocket()
      }
    }
  }

  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe()
    this.disposer && this.disposer()
  }

  initWebsocket() {
    const { isFederated } = this.props
    if ('getWatchListUrl' in this.store) {
      const url = this.store.getWatchListUrl(this.props.match.params)

      this.websocket.watch(url)

      const _getData = debounce(query => {
        if (this.store.list.isLoading) {
          return
        }
        const params = parse(location.search.slice(1))
        return this.props.getData({ ...params, ...query, silent: true })
      }, 1000)

      let kind = MODULE_KIND_MAP[this.props.module]

      if (isFederated) {
        kind = `Federated${kind}`
      }

      const mapper = isFederated
        ? ObjectMapper.federated(this.store.mapper)
        : this.store.mapper

      const onMessage = message => {
        if (message.object.kind === kind) {
          if (message.type === 'MODIFIED') {
            const data = {
              ...this.props.match.params,
              ...mapper(toJS(message.object)),
            }
            this.store.list.updateItem(data)
          } else if (message.type === 'DELETED' || message.type === 'ADDED') {
            _getData()
          }
        }
      }

      this.disposer = reaction(
        () => this.websocket.message,
        this.props.onMessage || onMessage
      )
    }
  }

  render() {
    return this.props.children
  }
}
