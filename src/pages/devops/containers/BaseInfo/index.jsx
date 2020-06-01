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

import { isEmpty } from 'lodash'
import React from 'react'
import { toJS } from 'mobx'
import { observer, inject } from 'mobx-react'
import { Icon, Dropdown, Menu } from '@pitrix/lego-ui'
import { Card, Button } from 'components/Base'
import DeleteModal from 'components/Modals/Delete'
import Info from 'components/Cards/Info'
import Banner from 'components/Cards/Banner'
import EditModal from 'devops/components/Modals/DevOpsEdit'

import UserStore from 'stores/user'
import RoleStore from 'stores/role'

import styles from './index.scss'

@inject('rootStore', 'devopsStore')
@observer
class BaseInfo extends React.Component {
  state = {
    showEdit: false,
    showDelete: false,
  }

  roleStore = new RoleStore()
  memberStore = new UserStore()

  componentDidMount() {
    this.memberStore.fetchList({
      devops: this.project_name,
      cluster: this.cluster,
    })
    this.roleStore.fetchList({
      devops: this.project_name,
      cluster: this.cluster,
    })
  }

  get routing() {
    return this.props.rootStore.routing
  }

  get store() {
    return this.props.devopsStore
  }

  get workspace() {
    return this.store.data.workspace
  }

  get project_id() {
    return this.props.match.params.project_id
  }

  get project_name() {
    return this.store.project_name
  }

  get cluster() {
    return this.props.match.params.cluster
  }

  get enabledActions() {
    return globals.app.getActions({
      module: 'devops',
      workspace: this.workspace,
      project:
        this.props.match.params.devops || this.props.match.params.project_id,
    })
  }

  getWorkspaceUrl() {
    const workspace = this.workspace

    if (
      globals.app.hasPermission({ module: 'workspaces', action: 'manage' }) ||
      globals.app.hasPermission({
        module: 'workspaces',
        action: 'view',
        workspace,
      })
    ) {
      return `/workspaces/${workspace}/overview`
    }

    return '/'
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
        text: t('Delete DevOps Project'),
      },
    ]
  }

  get enabledItemActions() {
    return this.itemActions.filter(
      item => !item.action || this.enabledActions.includes(item.action)
    )
  }

  hideEdit = () => {
    this.setState({
      showEdit: false,
    })
  }

  handleEdit = ({ name, ...data }) => {
    this.store.update({ name, cluster: this.cluster }, data, true).then(() => {
      this.hideEdit()
      this.store.fetchDetail(this.props.match.params)
    })
  }

  hideDelete = () => {
    this.setState({
      showDelete: false,
    })
  }

  handleDelete = () => {
    this.store
      .delete({ name: this.project_name, cluster: this.cluster })
      .then(() => {
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
    const roleCount = this.roleStore.list.total
    const memberCount = this.memberStore.list.total

    return (
      <div className="margin-t12">
        <Card title={t('Basic Info')} operations={this.renderOperations()}>
          <div className={styles.baseInfo}>
            <Info
              className={styles.info}
              image="/assets/default-workspace.svg"
              title={this.workspace}
              desc={t('Workspace')}
              url={this.getWorkspaceUrl()}
            />
            <Info
              className={styles.info}
              icon="group"
              title={memberCount}
              desc={t('Members')}
              url={`/cluster/${this.cluster}/devops/${this.project_id}/members`}
            />
            <Info
              className={styles.info}
              icon="role"
              title={roleCount}
              desc={t('Project Roles')}
              url={`/cluster/${this.cluster}/devops/${this.project_id}/roles`}
            />
          </div>
        </Card>
      </div>
    )
  }

  render() {
    const { data } = toJS(this.store)

    return (
      <div>
        <Banner
          title={t('DevOps BaseInfo')}
          icon="cdn"
          description={t('DEVOPS_DESCRIPTION')}
          module={this.module}
        />
        {this.renderBaseInfo()}
        <EditModal
          detail={data}
          workspace={this.workspace}
          visible={this.state.showEdit}
          onOk={this.handleEdit}
          onCancel={this.hideEdit}
          isSubmitting={this.store.isSubmitting}
        />
        <DeleteModal
          detail={data}
          desc={t.html('DELETE_DEVOPS_TIP', {
            resource: data.name,
          })}
          visible={this.state.showDelete}
          onOk={this.handleDelete}
          onCancel={this.hideDelete}
          isSubmitting={this.store.isSubmitting}
        />
      </div>
    )
  }
}

export default BaseInfo
