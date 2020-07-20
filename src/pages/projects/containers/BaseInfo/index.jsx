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
import { toJS } from 'mobx'
import { observer, inject } from 'mobx-react'
import { get } from 'lodash'

import RoleStore from 'stores/role'
import UserStore from 'stores/user'
import QuotaStore from 'stores/quota'
import LimitRangeStore from 'stores/limitrange'

import { trigger } from 'utils/action'
import Banner from 'components/Cards/Banner'
import ProjectInfo from './ProjectInfo'
import ResourceQuota from './ResourceQuota'
import DefaultResource from './DefaultResource'

@inject('rootStore', 'projectStore')
@observer
@trigger
class BaseInfo extends React.Component {
  roleStore = new RoleStore()

  memberStore = new UserStore()

  quotaStore = new QuotaStore()

  limitRangeStore = new LimitRangeStore()

  state = {
    showEdit: false,
    showDelete: false,
    showEditQuota: false,
    showEditDefaultResource: false,
  }

  componentDidMount() {
    this.memberStore.fetchList(this.params)
    this.roleStore.fetchList(this.params)
    this.quotaStore.fetch(this.params)
    this.limitRangeStore.fetchListByK8s(this.params)
  }

  get store() {
    return this.props.projectStore
  }

  get routing() {
    return this.props.rootStore.routing
  }

  get params() {
    return get(this.props.match, 'params', {})
  }

  get workspace() {
    return this.params.workspace
  }

  get tips() {
    return [
      {
        title: t('HOW_TO_USE_QUOTA_Q'),
        description: t('HOW_TO_USE_QUOTA_A'),
      },
      {
        title: t('WHAT_IS_LIMIT_RANGE_Q'),
        description: t('WHAT_IS_LIMIT_RANGE_A'),
      },
    ]
  }

  get enabledActions() {
    return globals.app.getActions({
      module: 'project-settings',
      ...this.params,
      project: this.params.namespace,
    })
  }

  getData = () => {
    this.store.fetchDetail(this.params)
  }

  get itemActions() {
    const { routing } = this.props.rootStore
    const { detail } = this.store
    const limitRanges = this.limitRangeStore.list.data
    const actions = [
      {
        key: 'edit',
        icon: 'pen',
        action: 'edit',
        text: t('Edit Info'),
        onClick: () =>
          this.trigger('resource.baseinfo.edit', {
            detail,
            success: this.getData,
          }),
      },
      {
        key: 'edit-default-resource',
        icon: 'pen',
        action: 'edit',
        text: t('Edit Resource Default Request'),
        onClick: () =>
          this.trigger('project.default.resource', {
            ...this.props.match.params,
            store: this.limitRangeStore,
            detail: limitRanges[0],
            success: () => this.limitRangeStore.fetchListByK8s(this.params),
          }),
      },
      {
        key: 'delete',
        icon: 'trash',
        action: 'delete',
        text: t('Delete Project'),
        onClick: () =>
          this.trigger('resource.delete', {
            detail,
            desc: t.html('DELETE_PROJECT_TIP', { resource: detail.name }),
            success: () =>
              routing.push(`/workspaces/${this.params.workspace}/projects`),
          }),
      },
    ]

    if (
      globals.app.hasPermission({
        workspace: this.workspace,
        module: 'projects',
        action: 'manage',
      })
    ) {
      actions.splice(1, 0, {
        key: 'edit-quota',
        icon: 'pen',
        action: 'edit',
        text: t('Edit Quota'),
        onClick: () =>
          this.trigger('project.quota.edit', {
            detail,
            success: () => this.quotaStore.fetch(this.params),
          }),
      })
    }

    return actions
  }

  get enabledItemActions() {
    return this.itemActions.filter(
      item => !item.action || this.enabledActions.includes(item.action)
    )
  }

  handleMoreMenuClick = (e, key) => {
    const action = this.enabledItemActions.find(_action => _action.key === key)
    if (action && action.onClick) {
      action.onClick()
    }
  }

  render() {
    const detail = toJS(this.store.detail)

    const roleCount = this.roleStore.list.total
    const memberCount = this.memberStore.list.total
    const serviceCount = get(this.quotaStore, 'data.used["count/services"]', 0)
    const limitRange = get(this.limitRangeStore, 'list.data[0]')
    const quota = toJS(this.quotaStore.data)

    return (
      <div>
        <Banner
          icon="cdn"
          title={t('Basic Info')}
          description={t('PROJECT_BASIC_INFO_DESC')}
          module="project_base_info"
          tips={this.tips}
        />
        <ProjectInfo
          detail={detail}
          roleCount={roleCount}
          memberCount={memberCount}
          serviceCount={serviceCount}
          workspace={this.workspace}
          actions={this.enabledItemActions}
          onMenuClick={this.handleMoreMenuClick}
        />
        <DefaultResource detail={limitRange} />
        <ResourceQuota detail={quota} />
      </div>
    )
  }
}

export default BaseInfo
