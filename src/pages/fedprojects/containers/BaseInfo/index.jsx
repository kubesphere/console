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

import FederatedStore from 'stores/federated'
import LimitRangeStore from 'stores/limitrange'

import { trigger } from 'utils/action'
import Banner from 'components/Cards/Banner'
import ProjectInfo from './ProjectInfo'
import DefaultResource from './DefaultResource'

@inject('rootStore', 'projectStore')
@observer
@trigger
class BaseInfo extends React.Component {
  limitRangeStore = new FederatedStore(new LimitRangeStore())

  componentDidMount() {
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

  get tips() {
    return [
      {
        title: t('WHAT_IS_LIMIT_RANGE_Q'),
        description: t('WHAT_IS_LIMIT_RANGE_A'),
      },
    ]
  }

  get enabledActions() {
    return globals.app.getActions({
      module: 'project-settings',
      project: this.params.namespace,
      cluster: this.params.cluster,
    })
  }

  getData = () => {
    this.store.fetchDetail(this.params)
  }

  getWorkspaceUrl() {
    const workspace = this.params.workspace

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
    const { routing } = this.props
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
            detail: limitRanges[0],
            success: () => this.store.fetchLimitRanges(this.props.match.params),
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
            success: () => routing.push('/'),
          }),
      },
    ]

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

    const limitRange = get(this.limitRangeStore, 'list.data[0].resource')

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
          workspace={this.params.workspace}
          actions={this.enabledItemActions}
          onMenuClick={this.handleMoreMenuClick}
        />
        <DefaultResource detail={limitRange} />
      </div>
    )
  }
}

export default BaseInfo
