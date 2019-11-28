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
import { get, isEmpty, omitBy } from 'lodash'

import FORM_TEMPLATES from 'utils/form.templates'
import RoleStore from 'stores/role'
import { Notify } from 'components/Base'
import ProjectEditModal from 'components/Modals/ProjectEdit'
import QuotaEditModal from 'components/Modals/QuotaEdit'
import ProjectDeleteModal from 'components/Modals/Delete'
import DefaultResourceEditModal from 'projects/components/Modals/DefaultResourceEdit'
import Banner from 'components/Cards/Banner'
import ProjectInfo from './ProjectInfo'
import ResourceQuota from './ResourceQuota'
import DefaultResource from './DefaultResource'

@inject('rootStore')
@observer
class BaseInfo extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showEdit: false,
      showDelete: false,
      showEditQuota: false,
      showEditDefaultResource: false,
    }

    this.roleStore = new RoleStore()
  }

  componentDidMount() {
    this.store.fetchMembers(this.params)
    this.roleStore.fetchList(this.params)
    this.store.fetchLimitRanges(this.params)
    this.quotaStore.fetch(this.params)
  }

  get store() {
    return this.props.rootStore.project
  }

  get quotaStore() {
    return this.props.rootStore.quota
  }

  get routing() {
    return this.props.rootStore.routing
  }

  get params() {
    return get(this.props.match, 'params', {})
  }

  get workspace() {
    return this.store.data.workspace
  }

  get namespace() {
    return this.params.namespace
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
      module: 'projects',
      project: this.namespace,
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
    const actions = [
      {
        key: 'edit',
        icon: 'pen',
        action: 'edit',
        text: t('Edit Info'),
      },
      {
        key: 'edit-default-resource',
        icon: 'pen',
        action: 'edit',
        text: t('Edit Resource Default Request'),
      },
      {
        key: 'delete',
        icon: 'trash',
        action: 'delete',
        text: t('Delete Project'),
      },
    ]

    if (
      globals.app.hasPermission({
        workspace: this.workspace,
        module: 'workspaces',
        action: 'edit',
      })
    ) {
      actions.splice(1, 0, {
        key: 'edit-quota',
        icon: 'pen',
        action: 'edit',
        text: t('Edit Quota'),
      })
    }

    return actions
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

  handleEdit = data => {
    this.store.patch({ name: this.namespace }, data).then(() => {
      this.hideEdit()
      this.store.fetchDetail(this.params)
    })
  }

  hideDelete = () => {
    this.setState({
      showDelete: false,
    })
  }

  handleDelete = () => {
    this.store
      .delete({ name: this.namespace }, { workspace: this.workspace })
      .then(() => {
        this.routing.push('/')
      })
  }

  showEditDefaultResource = () => {
    this.setState({ showEditDefaultResource: true })
  }

  hideEditDefaultResource = () => {
    this.setState({ showEditDefaultResource: false })
  }

  handleEditDefaultResource = data => {
    this.hideEditDefaultResource()

    const limitRanges = toJS(this.store.limitRanges.data)

    if (isEmpty(limitRanges[0])) {
      this.store
        .createLimitRange(
          { namespace: this.props.match.params.namespace },
          {
            ...FORM_TEMPLATES.limitRange(),
            spec: {
              limits: [
                {
                  ...data,
                  type: 'Container',
                },
              ],
            },
          }
        )
        .then(() => {
          this.store.fetchLimitRanges(this.props.match.params)
        })
    } else {
      this.store
        .updateLimitRange(limitRanges[0], {
          ...limitRanges[0]._originData,
          spec: {
            limits: [
              {
                ...limitRanges[0].limit,
                ...data,
              },
            ],
          },
        })
        .then(() => {
          this.store.fetchLimitRanges(this.props.match.params)
        })
    }
  }

  showEditQuota = () => {
    this.setState({ showEditQuota: true })
  }

  hideEditQuota = () => {
    this.setState({ showEditQuota: false })
  }

  handleEditQuota = data => {
    const params = {
      name: data.name,
      namespace: this.namespace,
    }

    const spec = get(data, 'spec.hard', {})
    data.spec = { hard: omitBy(spec, isEmpty) }

    this.quotaStore.checkName(params).then(resp => {
      if (resp.exist) {
        this.quotaStore
          .update(params, {
            apiVersion: 'v1',
            kind: 'ResourceQuota',
            metadata: { ...params, name: this.namespace },
            spec: data.spec,
          })
          .then(this.postEditQuota)
      } else {
        this.quotaStore
          .create({
            apiVersion: 'v1',
            kind: 'ResourceQuota',
            metadata: { ...params, name: this.namespace },
            spec: data.spec,
          })
          .then(this.postEditQuota)
      }
    })
  }

  postEditQuota = () => {
    this.hideEditQuota()
    this.quotaStore.fetch(this.params)
    Notify.success({ content: `${t('Updated Successfully')}!` })
  }

  handleMoreMenuClick = (e, key) => {
    switch (key) {
      case 'edit':
        this.setState({ showEdit: true })
        break
      case 'edit-default-resource':
        this.setState({ showEditDefaultResource: true })
        break
      case 'edit-quota':
        this.setState({ showEditQuota: true })
        break
      case 'delete':
        this.setState({ showDelete: true })
        break
      default:
        break
    }
  }

  render() {
    const data = toJS(this.store.data)

    const roleCount = this.roleStore.list.total
    const memberCount = this.store.members.total
    const serviceCount = get(this.quotaStore, 'data.used["count/services"]', 0)
    const limitRanges = toJS(this.store.limitRanges.data)
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
          detail={data}
          roleCount={roleCount}
          memberCount={memberCount}
          serviceCount={serviceCount}
          workspace={this.workspace}
          actions={this.enabledItemActions}
          onMenuClick={this.handleMoreMenuClick}
        />
        <DefaultResource detail={limitRanges[0]} />
        <ResourceQuota detail={quota} />
        <DefaultResourceEditModal
          detail={limitRanges[0]}
          namespace={this.namespace}
          visible={this.state.showEditDefaultResource}
          onOk={this.handleEditDefaultResource}
          onCancel={this.hideEditDefaultResource}
          isSubmitting={this.store.isSubmitting}
        />
        <ProjectEditModal
          detail={data}
          visible={this.state.showEdit}
          onOk={this.handleEdit}
          onCancel={this.hideEdit}
          isSubmitting={this.store.isSubmitting}
        />
        <ProjectDeleteModal
          detail={data}
          desc={t.html('DELETE_PROJECT_TIP', { resource: data.name })}
          visible={this.state.showDelete}
          onOk={this.handleDelete}
          onCancel={this.hideDelete}
          isSubmitting={this.store.isSubmitting}
        />
        <QuotaEditModal
          detail={data}
          visible={this.state.showEditQuota}
          onOk={this.handleEditQuota}
          onCancel={this.hideEditQuota}
          isSubmitting={this.quotaStore.isSubmitting}
        />
      </div>
    )
  }
}

export default BaseInfo
