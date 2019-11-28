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

import styles from './index.scss'

@inject('rootStore')
@observer
class BaseInfo extends React.Component {
  state = {
    showEdit: false,
    showDelete: false,
  }

  componentDidMount() {
    this.store.fetchRoles(this.props.match.params)
    this.store.fetchMembers(this.props.match.params)
  }

  get store() {
    return this.props.rootStore.devops
  }

  get routing() {
    return this.props.rootStore.routing
  }

  get workspace() {
    return this.store.data.workspace
  }

  get project_id() {
    return this.props.match.params.project_id
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

  handleEdit = ({ project_id, ...data }) => {
    this.store.update(project_id, data).then(() => {
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
    const { project_id } = this.props.match.params
    this.store
      .delete({ project_id }, { workspace: this.workspace })
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
              title={this.store.members.total}
              desc={t('Members')}
              url={`/devops/${this.project_id}/members`}
            />
            <Info
              className={styles.info}
              icon="role"
              title={this.store.roles.total}
              desc={t('Project Roles')}
              url={`/devops/${this.project_id}/roles`}
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
          members={toJS(this.store.members.data)}
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
