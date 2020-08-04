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
import { observer, inject } from 'mobx-react'
import { get } from 'lodash'

import { getLocalTime } from 'utils'
import { ICON_TYPES } from 'utils/constants'
import CredentialStore from 'stores/devops/credential'
import DevopsStore from 'stores/devops'
import Base from 'core/containers/Base/Detail'
import BaseInfo from 'core/containers/Base/Detail/BaseInfo'
import CreateModal from '../credentialModal'

class CredentialDetail extends Base {
  state = {
    showEdit: false,
    showYamlEdit: false,
    deleteModule: false,
    isLoading: true,
  }

  get name() {
    return 'Credential'
  }

  get authKey() {
    return 'credentials'
  }

  get updateTime() {
    const { detail } = this.store
    const updateTime = get(detail, 'createTime', '')
    if (!updateTime) {
      return '-'
    }
    return getLocalTime(updateTime).format('YYYY-MM-DD HH:mm:ss')
  }

  get listUrl() {
    const { workspace, devops, cluster } = this.props.match.params
    return `/${workspace}/clusters/${cluster}/devops/${devops}/credentials`
  }

  init() {
    this.store = new CredentialStore(this.module)
    this.devopsStore = new DevopsStore()
  }

  fetchData = () => {
    const { params } = this.props.match
    this.store.setParams(params)
    this.store.fetchDetail(params).catch(this.catch)
    this.getRole()
  }

  getRole = async () => {
    const { params } = this.props.match
    await Promise.all([
      this.devopsStore.fetchDetail(params),
      this.props.rootStore.getRules({
        workspace: params.workspace,
      }),
    ])

    await this.props.rootStore.getRules({
      cluster: params.cluster,
      workspace: params.workspace,
      devops: params.devops,
    })
    this.setState({ isLoading: false })
  }

  getOperations = () => [
    {
      key: 'edit',
      type: 'control',
      text: t('EDIT'),
      action: 'edit',
      onClick: this.showEditModal,
    },
    {
      key: 'delete',
      type: 'danger',
      text: t('Delete'),
      action: 'delete',
      onClick: this.showModal('deleteModule'),
    },
  ]

  getAttrs = () => {
    const { detail, usage } = this.store

    return [
      {
        name: t('Type'),
        value: t(detail.type),
      },
      {
        name: t('description'),
        value: detail.description,
      },
      {
        name: t('domain'),
        value: usage.domain,
      },
    ]
  }

  showEditModal = async () => {
    const { detail } = this.store

    this.setState({
      showEdit: true,
      formTemplate: detail,
    })
  }

  hideEditModal = () => {
    this.setState({ showEdit: false })
  }

  handleEdit = () => {
    this.setState({ showEdit: false })
    this.store.fetchDetail()
  }

  handleDelete = () => {
    const { devops, workspace, cluster } = this.props.match.params
    const { detail } = this.store

    this.store.delete(detail.id).then(() => {
      this.routing.push(
        `/${workspace}/clusters/${cluster}/devops/${devops}/${this.module}`
      )
    })
  }

  get enabledActions() {
    const { cluster, devops } = this.props.match.params

    return globals.app.getActions({
      module: 'credentials',
      cluster,
      devops,
    })
  }

  renderSider() {
    const { detail } = this.store
    const { isLoading } = this.state
    const operations = this.getOperations().filter(item =>
      this.enabledActions.includes(item.action)
    )

    return (
      <BaseInfo
        icon={ICON_TYPES[this.module]}
        name={detail.id || ''}
        desc={get(detail, 'description')}
        operations={operations}
        labels={detail.labels}
        isLoading={isLoading}
        attrs={this.getAttrs()}
      />
    )
  }

  renderExtraModals() {
    const { showEdit } = this.state
    const { devops, cluster } = this.props.match.params

    return (
      <div>
        <CreateModal
          title={t('Edit Credential')}
          formTemplate={this.state.formTemplate}
          visible={showEdit}
          cluster={cluster}
          onOk={this.handleEdit}
          onCancel={this.hideEditModal}
          devops={devops}
          isEditMode
        />
      </div>
    )
  }
}

export default inject('rootStore')(observer(CredentialDetail))
export const Component = CredentialDetail
