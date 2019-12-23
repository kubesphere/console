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
import { computed } from 'mobx'
import { observer, inject } from 'mobx-react'
import { get } from 'lodash'

import AlertingPolicyStore from 'stores/alerting/policy'

import Base from 'core/containers/Base/Detail'
import { Notify } from 'components/Base'
import EditBasicInfoModal from 'components/Modals/EditBasicInfo'
import ChangeStatusModal from 'components/Modals/Alerting/PolicyStatus'

class PolicyDetail extends Base {
  init() {
    this.store = new AlertingPolicyStore(this.level)
  }

  fetchData = params => {
    if (this.store.fetchDetail) {
      this.store.fetchDetail({ ...this.params, ...params }).then(data => {
        if (!data.name) {
          this.setState({ notFound: true })
        }
      })
    }
  }

  get enabledActions() {
    return globals.app.getActions({ module: 'alerting' })
  }

  get level() {
    return this.namespace ? 'workload' : 'node'
  }

  get params() {
    return this.props.match.params
  }

  get namespace() {
    return this.params.namespace
  }

  get name() {
    return 'alerting policy'
  }

  get listUrl() {
    return this.namespace
      ? `/projects/${this.namespace}/alert-policy`
      : '/monitoring/alert-policy'
  }

  @computed
  get detailDesc() {
    return get(this.store.detail, 'desc')
  }

  @computed
  get detailName() {
    const item = this.store.detail

    return `${this.store.detail.name}${
      item.displayName ? `(${item.displayName})` : ''
    }`
  }

  @computed
  get status() {
    const { disabled } = this.store.detail
    return disabled ? t('disabled') : t('active')
  }

  @computed
  get creator() {
    return get(this.store.detail, 'creator', t('unknown'))
  }

  getOperations = () => [
    {
      key: 'edit',
      type: 'control',
      text: t('EDIT'),
      action: 'edit',
      onClick: this.showModal('editBaseInfo'),
    },
    {
      key: 'changeStatus',
      icon: 'pen',
      text: t('Change Status'),
      action: 'edit',
      onClick: this.showModal('changeStatus'),
    },
    {
      key: 'delete',
      icon: 'trash',
      text: t('Delete'),
      action: 'delete',
      onClick: this.showModal('deleteModule'),
    },
  ]

  getAttrs = () => [
    {
      name: t('Status'),
      value: this.status,
    },
    {
      name: t('Created Time'),
      value: this.createTime,
    },
    {
      name: t('Creator'),
      value: this.creator,
    },
  ]

  handleEdit = newObect => {
    const data = {
      policy_name: get(
        newObect,
        'metadata.annotations["kubesphere.io/alias-name"]',
        ''
      ),
      policy_description: get(
        newObect,
        'metadata.annotations["kubesphere.io/description"]',
        ''
      ),
    }

    this.store.patchBasicInfo(this.params, data).then(() => {
      this.hideModal('editBaseInfo')()
      Notify.success({ content: `${t('Updated Successfully')}!` })
      this.fetchData()
    })
  }

  handleChangeStatus = newObject => {
    const data = {
      alert_name: get(newObject, 'name'),
      disabled: get(newObject, 'disabled'),
    }

    this.store.patch(this.params, data).then(() => {
      this.hideModal('changeStatus')()
      Notify.success({ content: `${t('Updated Successfully')}!` })
      this.fetchData()
    })
  }

  handleDelete = () => {
    this.store
      .delete({ ...this.store.detail, namespace: this.namespace })
      .then(() => {
        this.hideModal('deleteModule')()
        Notify.success({ content: `${t('Deleted Successfully')}!` })
        this.deleteCallback()
      })
  }

  renderExtraModals() {
    const { detail = {}, isSubmitting } = this.store
    const { editBaseInfo, changeStatus } = this.state

    return (
      <div>
        <EditBasicInfoModal
          visible={editBaseInfo}
          detail={this.store.ksFormatDetail}
          onOk={this.handleEdit}
          onCancel={this.hideModal('editBaseInfo')}
          isSubmitting={isSubmitting}
        />
        <ChangeStatusModal
          visible={changeStatus}
          detail={detail}
          onOk={this.handleChangeStatus}
          onCancel={this.hideModal('changeStatus')}
          isSubmitting={isSubmitting}
        />
      </div>
    )
  }
}

export default inject('rootStore')(observer(PolicyDetail))
export const Component = PolicyDetail
