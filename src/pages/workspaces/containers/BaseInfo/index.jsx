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
import { toJS } from 'mobx'
import { observer, inject } from 'mobx-react'
import { Icon, Dropdown, Menu } from '@pitrix/lego-ui'
import { Card, Button } from 'components/Base'
import DeleteModal from 'components/Modals/Delete'
import EditModal from 'components/Modals/WorkspaceEdit'
import Info from 'components/Cards/Info'
import Banner from 'components/Cards/Banner'

import RoleStore from 'stores/workspace/role'

import styles from './index.scss'

@inject('rootStore')
@observer
class BaseInfo extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showEdit: false,
      showDelete: false,
    }

    this.roleStore = new RoleStore()
    this.roleStore.fetchList(this.props.match.params)
  }

  get store() {
    return this.props.rootStore.workspace
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
    return [
      {
        key: 'edit',
        icon: 'pen',
        action: 'edit',
        text: t('Edit Info'),
      },
      {
        key: 'delete',
        icon: 'trash',
        action: 'delete',
        text: t('Delete Workspace'),
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

  hideEdit = () => {
    this.setState({
      showEdit: false,
    })
  }

  handleEdit = data => {
    const name = get(data, 'metadata.name')
    this.store.update(data).then(() => {
      this.hideEdit()
      this.store.fetchDetail({ workspace: name })
    })
  }

  hideDelete = () => {
    this.setState({
      showDelete: false,
    })
  }

  handleDelete = () => {
    this.store.delete(this.props.match.params).then(() => {
      this.routing.push('/')
    })
  }

  handleMoreMenuClick = (e, key) => {
    switch (key) {
      case 'edit':
        this.setState({ showEdit: true })
        break
      case 'delete':
        this.setState({ showDelete: true })
        break
      default:
        break
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
    const { detail } = toJS(this.props.rootStore.workspace)
    const { total } = toJS(this.roleStore.list)
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
    const { detail, isSubmitting } = this.props.rootStore.workspace

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
        <EditModal
          detail={detail._originData}
          visible={this.state.showEdit}
          onOk={this.handleEdit}
          onCancel={this.hideEdit}
          isSubmitting={isSubmitting}
        />
        <DeleteModal
          type={t('Workspace')}
          resource={detail.name}
          desc={t.html('DELETE_WORKSPACE_TIP', {
            resource: detail.name,
          })}
          visible={this.state.showDelete}
          isSubmitting={isSubmitting}
          onOk={this.handleDelete}
          onCancel={this.hideDelete}
        />
      </div>
    )
  }
}

export default BaseInfo
