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
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { toJS } from 'mobx'
import { observer, inject } from 'mobx-react'
import { Icon, Button, Notify, Dropdown, Menu } from '@kube-design/components'
import { Panel } from 'components/Base'
import DeleteModal from 'components/Modals/Delete'
import Banner from 'components/Cards/Banner'
import EditModal from 'devops/components/Modals/DevOpsEdit'

import { getDisplayName, getLocalTime } from 'utils'

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
    if (this.canViewMembers && this.canViewRoles) {
      this.memberStore.fetchList({
        devops: this.devops,
        cluster: this.cluster,
      })

      this.roleStore.fetchList({
        devops: this.devops,
        cluster: this.cluster,
      })
    }
  }

  get routing() {
    return this.props.rootStore.routing
  }

  get store() {
    return this.props.devopsStore
  }

  get devops() {
    return this.props.match.params.devops
  }

  get devopsName() {
    return this.store.devopsName
  }

  get workspace() {
    return this.props.match.params.workspace
  }

  get cluster() {
    return this.props.match.params.cluster
  }

  get enabledActions() {
    return globals.app.getActions({
      module: 'devops-settings',
      cluster: this.cluster,
      devops: this.devops,
    })
  }

  get canViewRoles() {
    return globals.app.hasPermission({
      module: 'roles',
      action: 'view',
      cluster: this.cluster,
      devops: this.devops,
    })
  }

  get canViewMembers() {
    return globals.app.hasPermission({
      module: 'members',
      action: 'view',
      cluster: this.cluster,
      devops: this.devops,
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

  handleEdit = ({ devops, ...data }) => {
    this.store
      .update(
        { devops, cluster: this.cluster, workspace: this.workspace },
        data,
        true
      )
      .then(() => {
        this.hideEdit()
        Notify.success({ content: `${t('Updated Successfully')}` })
        this.store.fetchDetail({
          workspace: this.workspace,
          ...this.props.match.params,
        })
      })
  }

  hideDelete = () => {
    this.setState({
      showDelete: false,
    })
  }

  handleDelete = () => {
    this.store
      .delete({
        devops: this.devops,
        cluster: this.cluster,
        workspace: this.workspace,
      })
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

  renderBaseInfo() {
    const detail = this.store.data
    const roleCount = this.roleStore.list.total
    const memberCount = this.memberStore.list.total

    return (
      <Panel className={styles.wrapper} title={t('Basic Info')}>
        <div className={styles.header}>
          <Icon name="strategy-group" size={40} />
          <div className={styles.item}>
            <div>{getDisplayName(detail)}</div>
            <p>{t('DevOps Project')}</p>
          </div>
          <div className={styles.item}>
            <div>
              <Link to={`/workspaces/${this.workspace}`}>{this.workspace}</Link>
            </div>
            <p>{t('Workspace')}</p>
          </div>
          <div className={styles.item}>
            <div>{detail.creator || '-'}</div>
            <p>{t('Creator')}</p>
          </div>
          <div className={styles.item}>
            <div>
              {getLocalTime(detail.createTime).format(`YYYY-MM-DD HH:mm:ss`)}
            </div>
            <p>{t('Created Time')}</p>
          </div>
          {!isEmpty(this.enabledItemActions) && (
            <div className={classNames(styles.item, 'text-right')}>
              <Dropdown
                theme="dark"
                content={this.renderMoreMenu()}
                trigger="click"
                placement="bottomRight"
              >
                <Button>{t('DEVOPS_PROJECT_MANAGEMENT')}</Button>
              </Dropdown>
            </div>
          )}
        </div>
        {this.canViewRoles && this.canViewMembers && (
          <div className={styles.content}>
            <div className={styles.contentItem}>
              <Icon name="role" size={40} />
              <div className={styles.item}>
                <div>{roleCount}</div>
                <p>{t('DEVOPS_PROJECT_ROLES')}</p>
              </div>
            </div>
            <div className={styles.contentItem}>
              <Icon name="group" size={40} />
              <div className={styles.item}>
                <div>{memberCount}</div>
                <p>{t('DEVOPS_PROJECT_MEMBERS')}</p>
              </div>
            </div>
          </div>
        )}
      </Panel>
    )
  }

  render() {
    const { data } = toJS(this.store)

    return (
      <div>
        <Banner
          title={t('DevOps Basic Info')}
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
          resource={data.name}
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
