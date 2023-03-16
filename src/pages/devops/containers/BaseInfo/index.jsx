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

import { Button, Dropdown, Icon, Menu, Notify } from '@kube-design/components'
import classNames from 'classnames'
import { Avatar, Panel, Switch } from 'components/Base'
import Banner from 'components/Cards/Banner'
import DeleteModal from 'components/Modals/Delete'
import Empty from 'components/Tables/Base/Empty'
import EditModal from 'devops/components/Modals/DevOpsEdit'
import { cloneDeep, get, isEmpty, isObject, set } from 'lodash'
import { toJS } from 'mobx'
import { inject, observer } from 'mobx-react'
import React from 'react'
import { Link } from 'react-router-dom'
import RoleStore from 'stores/role'

import UserStore from 'stores/user'
import {
  compareVersion,
  getDisplayName,
  getLocalTime,
  inCluster2Default,
  showNameAndAlias,
} from 'utils'

import { trigger } from 'utils/action'
import { eventKeys, initEvents } from 'utils/events'
import styles from './index.scss'

@inject('rootStore', 'devopsStore')
@observer
@trigger
class BaseInfo extends React.Component {
  state = {
    showEdit: false,
    showDelete: false,
    opened: false,
  }

  roleStore = new RoleStore()

  memberStore = new UserStore()

  handleHostClusterChange = () => {
    this.forceUpdate()
  }

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

    this.setState({
      opened: !(
        isEmpty(this.detail.sourceRepos) && isEmpty(this.detail.destinations)
      ),
    })

    this.subscribe = initEvents([
      eventKeys.HOST_CLUSTER_CHANGE,
      this.handleHostClusterChange,
    ])
  }

  componentWillUnmount() {
    this.subscribe && this.subscribe()
  }

  get isMultiCluster() {
    return globals.ksConfig.multicluster
  }

  get clusterVersion() {
    return this.isMultiCluster
      ? get(globals, `clusterConfig.${this.cluster}.ksVersion`)
      : get(globals, 'ksConfig.ksVersion')
  }

  get isNeedHide() {
    return (
      compareVersion(this.clusterVersion, '3.3.0') < 0 || !this.isHostCluster
    )
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

  get isHostCluster() {
    return (
      !globals.app.isMultiCluster ||
      this.cluster === this.props.devopsStore.hostName
    )
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
        text: t('EDIT'),
      },
      {
        key: 'delete',
        icon: 'trash',
        action: 'delete',
        text: t('DELETE'),
      },
    ]
  }

  get enabledItemActions() {
    return this.itemActions.filter(
      item => !item.action || this.enabledActions.includes(item.action)
    )
  }

  get detail() {
    return this.store.data
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
        Notify.success({ content: t('UPDATE_SUCCESSFUL') })
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

  handleEditAllowlist = () => {
    this.trigger('devops.edit.allowlist', {
      devops: this.devops,
      store: this.store,
      cluster: this.cluster,
      workspace: this.workspace,
      detail: this.detail,
      success: async () => {
        await this.store.fetchDetail({
          workspace: this.workspace,
          ...this.props.match.params,
        })

        this.setState({
          opened: !(
            isEmpty(this.detail.sourceRepos) &&
            isEmpty(this.detail.destinations)
          ),
        })
      },
    })
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
    const roleCount = this.roleStore.list.total
    const memberCount = this.memberStore.list.total

    return (
      <Panel className={styles.wrapper} title={t('BASIC_INFORMATION')}>
        <div className={styles.header}>
          <Icon name="strategy-group" size={40} />
          <div className={styles.item}>
            <div>{getDisplayName(this.detail)}</div>
            <p>{t('DEVOPS_PROJECT_SCAP')}</p>
          </div>
          <div className={styles.item}>
            <div>
              <Link to={`/workspaces/${this.workspace}`}>
                {showNameAndAlias(this.workspace, 'workspace')}
              </Link>
            </div>
            <p>{t('WORKSPACE')}</p>
          </div>
          <div className={styles.item}>
            <div>{this.detail.creator || '-'}</div>
            <p>{t('CREATOR')}</p>
          </div>
          <div className={styles.item}>
            <div>
              {getLocalTime(this.detail.createTime).format(
                `YYYY-MM-DD HH:mm:ss`
              )}
            </div>
            <p>{t('CREATION_TIME')}</p>
          </div>
          {!isEmpty(this.enabledItemActions) && (
            <div className={classNames(styles.item, 'text-right')}>
              <Dropdown
                theme="dark"
                content={this.renderMoreMenu()}
                trigger="click"
                placement="bottomRight"
              >
                <Button>{t('MANAGE')}</Button>
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
                <p>
                  {roleCount === 1
                    ? t('DEVOPS_PROJECT_ROLE_SCAP')
                    : t('DEVOPS_PROJECT_ROLE_PL_SCAP')}
                </p>
              </div>
            </div>
            <div className={styles.contentItem}>
              <Icon name="group" size={40} />
              <div className={styles.item}>
                <div>{memberCount}</div>
                <p>
                  {memberCount === 1
                    ? t('DEVOPS_PROJECT_MEMBER_SCAP')
                    : t('DEVOPS_PROJECT_MEMBER_PL_SCAP')}
                </p>
              </div>
            </div>
          </div>
        )}
      </Panel>
    )
  }

  renderEmptyCD() {
    return (
      <div className={styles.empty}>
        <Empty
          name="ALLOWLIST"
          module="allowlists"
          title={t('EMPTY_ALLOWLIST_TITLE')}
          action={
            !isEmpty(this.enabledItemActions) && (
              <Button onClick={this.handleEditAllowlist} type="control">
                {t('ENABLE_ALLOWLIST')}
              </Button>
            )
          }
        />
      </div>
    )
  }

  renderItem(type) {
    const data = this.detail[type]

    if (isEmpty(data)) {
      return (
        <div className={styles.item_tag}>
          {type === 'sourceRepos'
            ? t('CODE_REPOSITORY_NOT_SELECTED')
            : t('RESOURCE_DEPLOYMENT_LOCATION_NOT_SELECTED')}
        </div>
      )
    }

    const isAll =
      data.length === 1 &&
      data.every(item => {
        if (isObject(item)) {
          return Object.keys(item).every(key => item[key] === '*')
        }
        return item === '*'
      })

    if (isAll) {
      return (
        <div className={styles.item_tag}>
          {type === 'sourceRepos'
            ? t('ALL_CODE_REPOSITORIES')
            : t('ALL_RESOURCE_DEPLOYMENT_LOCATIONS')}
        </div>
      )
    }

    return type === 'sourceRepos' ? (
      <div className={styles.items}>
        {this.detail.sourceRepos.map(repo => (
          <div key={repo} className={styles.item}>
            {repo === '*' ? t('ALL') : repo}
          </div>
        ))}
      </div>
    ) : (
      <div className={styles.items}>
        {this.detail.destinations.map(destination => {
          return (
            <div
              key={`${destination.name}-${destination.namespace}+'-'+${globals.hostClusterName}}`}
              className={`${styles.item} ${styles.item_flex}`}
            >
              <div>
                <Icon name="cluster" size={20} />
                <b>
                  {destination.name === '*'
                    ? t('ALL')
                    : showNameAndAlias(
                        inCluster2Default(destination.name),
                        'cluster'
                      )}
                </b>
                {destination?.name !== '*' && (
                  <span>({destination?.server})</span>
                )}
              </div>
              <div>
                <Icon name="enterprise" size={20} />
                <b>
                  {destination?.namespace === '*'
                    ? t('ALL')
                    : showNameAndAlias(destination?.namespace, 'project', {
                        cluster: inCluster2Default(destination.name),
                      })}
                </b>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  toggle = async () => {
    const { opened } = this.state

    if (opened) {
      const newData = get(cloneDeep(toJS(this.detail)), '_originData.spec', {})

      set(newData, 'argo.destinations', [])
      set(newData, 'argo.sourceRepos', [])

      await this.store.editAllowlist(this.store.data, { spec: newData })

      await this.store.fetchDetail({
        workspace: this.workspace,
        ...this.props.match.params,
      })
    }

    this.setState({
      opened: !opened,
    })
  }

  renderCD() {
    const { opened } = this.state

    return (
      <Panel className={styles.wrapper} title={t('CD_ALLOWLIST')}>
        {isEmpty(this.detail.sourceRepos) &&
        isEmpty(this.detail.destinations) ? (
          this.renderEmptyCD()
        ) : (
          <>
            <div className={styles.cd_header}>
              <Avatar
                icon="allowlist"
                iconSize={40}
                title={opened ? t('ENABLED') : t('DISABLED')}
                desc={t('CD_ALLOWLIST_SCAP')}
              />

              {!isEmpty(this.enabledItemActions) && (
                <div className={classNames(styles.item, 'text-right')}>
                  <Switch
                    className={styles.switch}
                    text={opened ? t('ENABLED') : t('DISABLED')}
                    onChange={this.toggle}
                    checked={opened}
                  />
                  <Button onClick={this.handleEditAllowlist}>
                    {t('EDIT_ALLOWLIST')}
                  </Button>
                </div>
              )}
            </div>
            <div className={styles.content_CD}>
              <div className={styles.content_item}>
                <div className={styles.content_item_title}>
                  {t('CODE_REPO_PL')}
                </div>
                {this.renderItem('sourceRepos')}
              </div>
              <div className={styles.content_item}>
                <div className={styles.content_item_title}>
                  {t('DEPLOYMENT_LOCATION_PL')}
                </div>
                {this.renderItem('destinations')}
              </div>
            </div>
          </>
        )}
      </Panel>
    )
  }

  render() {
    const { data } = toJS(this.store)

    return (
      <div>
        <Banner
          title={t('BASIC_INFORMATION')}
          icon="cdn"
          description={t('DEVOPS_DESCRIPTION')}
          module={this.module}
        />
        {this.renderBaseInfo()}
        {this.isNeedHide ? null : this.renderCD()}
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
          title={t('DELETE_DEVOPS_PROJECT')}
          desc={t.html('DELETE_DEVOPS_PROJECT_TIP', {
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
