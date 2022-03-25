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
import { isEmpty, isFunction, get } from 'lodash'

import { Button, Menu, Icon, Dropdown } from '@kube-design/components'

function withTableActions(WrappedComponent) {
  class TableWrapper extends React.Component {
    static defaultProps = {
      itemActions: [],
      enabledActions: [],
      tableActions: {},
    }

    get enabledItemActions() {
      const { itemActions, enabledActions } = this.props
      return itemActions.filter(
        item => !item.action || enabledActions.includes(item.action)
      )
    }

    getEnabledTableActions() {
      const { tableActions, enabledActions, ...rest } = this.props

      Object.assign(tableActions, rest)

      if (!enabledActions.includes('delete')) {
        tableActions.onDelete = null
      }

      if (!enabledActions.includes('create')) {
        tableActions.onCreate = null
      }

      if (tableActions.actions) {
        tableActions.actions = tableActions.actions.filter(
          item =>
            !item.action ||
            (typeof item.filter === 'function' &&
              item.filter.call(this, item)) ||
            enabledActions.includes(item.action)
        )
      }

      if (tableActions.selectActions) {
        tableActions.selectActions = tableActions.selectActions.filter(
          item => !item.action || enabledActions.includes(item.action)
        )
      }

      if (isEmpty(tableActions.selectActions)) {
        tableActions.onSelectRowKeys = null
      }

      return tableActions
    }

    getColumns = () => {
      const { columns } = this.props
      return [
        ...columns,
        {
          key: 'more',
          width: 20,
          render: this.renderMore,
        },
      ]
    }

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

        const icon = isFunction(action.icon) ? action.icon(record) : action.icon
        const text = isFunction(action.text) ? action.text(record) : action.text

        const disabled = get(action, 'disabled', undefined)

        if (!show) return null

        return (
          <Menu.MenuItem
            key={action.key}
            disabled={isFunction(disabled) ? disabled(record) : false}
          >
            <Icon name={icon} />{' '}
            <span data-test={`table-item-${action.key}`}>{text}</span>
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
          {...this.getEnabledTableActions()}
          columns={this.getColumns()}
        />
      )
    }
  }

  return observer(TableWrapper)
}

export default withTableActions
