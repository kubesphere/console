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
import { get, isEmpty } from 'lodash'
import { observer, inject } from 'mobx-react'
import { Icon, Dropdown, Menu } from '@pitrix/lego-ui'
import { Card, Button } from 'components/Base'
import Info from 'components/Cards/Info'
import Banner from 'components/Cards/Banner'
import { trigger } from 'utils/action'
import RoleStore from 'stores/role'

import styles from './index.scss'

@inject('rootStore', 'workspaceStore')
@observer
@trigger
class BaseInfo extends React.Component {
  constructor(props) {
    super(props)
    this.roleStore = new RoleStore('workspaceroles')
    this.roleStore.fetchList(this.props.match.params)
  }

  get store() {
    return this.props.workspaceStore
  }

  get module() {
    return 'BaseInfo'
  }

  get routing() {
    return this.props.rootStore.routing
  }

  get workspace() {
    return this.props.match.params.workspace
  }

  get enabledActions() {
    return globals.app.getActions({
      module: 'workspaces',
      workspace: this.workspace,
    })
  }

  get itemActions() {
    const { detail } = this.store
    return [
      {
        key: 'edit',
        icon: 'pen',
        action: 'edit',
        text: t('Edit Info'),
        onClick: () =>
          this.trigger('resource.baseinfo.edit', {
            detail,
            success: this.fetchDetail,
          }),
      },
      {
        key: 'delete',
        icon: 'trash',
        action: 'delete',
        text: t('Delete Workspace'),
        onClick: () =>
          this.trigger('resource.delete', {
            detail,
            type: t('Workspace'),
            resource: detail.name,
            desc: t.html('DELETE_WORKSPACE_TIP', {
              resource: detail.name,
            }),
            success: () => this.routing.push('/'),
          }),
      },
    ]
  }

  get enabledItemActions() {
    return this.itemActions.filter(
      item => !item.action || this.enabledActions.includes(item.action)
    )
  }

  canViewModule = (module, action = 'view') =>
    globals.app.hasPermission({ module, action, workspace: this.workspace })

  fetchDetail = () => {
    this.store.fetchDetail({ workspace: this.workspace })
  }

  handleMoreMenuClick = (e, key) => {
    const action = this.enabledItemActions.find(_action => _action.key === key)
    if (action && action.onClick) {
      action.onClick()
    }
  }

  renderMoreMenu() {
    return (
      <Menu onClick={this.handleMoreMenuClick}>
        {this.enabledItemActions.map(action => (
          <Menu.MenuItem key={action.key}>
            <Icon name={action.icon} /> {action.text}
          </Menu.MenuItem>
        ))}
      </Menu>
    )
  }

  renderOperations() {
    if (isEmpty(this.enabledItemActions)) {
      return null
    }

    return (
      <Dropdown
        content={this.renderMoreMenu()}
        trigger="click"
        placement="bottomRight"
      >
        <Button icon="more" type="flat" />
      </Dropdown>
    )
  }

  renderBaseInfo() {
    const { detail } = this.store
    const { total } = this.roleStore.list
    return (
      <div className="margin-t12">
        <Card title={t('Basic Info')} operations={this.renderOperations()}>
          <div className={styles.baseInfo}>
            <Info
              className={styles.info}
              image="/assets/default-workspace.svg"
              title={detail.name}
              desc={t(get(detail, 'description') || 'Workspace')}
            />
            <Info
              icon="group"
              className={styles.info}
              title={get(
                detail,
                'annotations["kubesphere.io/member-count"]',
                0
              )}
              desc={t('Workspace Members')}
            />
            <Info
              icon="role"
              title={total}
              className={styles.info}
              desc={t('Workspace Roles')}
            />
          </div>
        </Card>
      </div>
    )
  }

  render() {
    return (
      <div>
        <Banner
          title={t('Basic Info')}
          icon="cdn"
          description={t('WORKSPACE_CREATE_DESC')}
          className={styles.header}
          module={this.module}
        />
        {this.renderBaseInfo()}
      </div>
    )
  }
}

export default BaseInfo
