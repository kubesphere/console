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

import ServiceStore from 'stores/service'

import { Notify } from 'components/Base'
import { Component as DeploymentDetail } from 'projects/containers/Deployments/Detail'
import EditBasicInfoModal from 'components/Modals/EditBasicInfo'
import EditYamlModal from 'components/Modals/EditYaml'
import RollBackModal from 'projects/components/Modals/RollBack'
import EditTemplateModal from 'projects/components/Modals/ConfigTemplate'
import EditServiceModal from 'projects/components/Modals/ServiceSetting/StatefulSet'
import RedeployModal from 'projects/components/Modals/Redeploy'

import { MODULE_KIND_MAP } from 'utils/constants'

@inject('rootStore')
@observer
class StatefulSetsDetail extends DeploymentDetail {
  constructor(props) {
    super(props)

    this.state = {
      ...this.state,
      editService: false,
    }

    this.serviceStore = new ServiceStore()
  }

  get name() {
    return 'StatefulSet'
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
      key: 'rollBack',
      icon: 'timed-task',
      text: t('Revision Rollback'),
      action: 'edit',
      onClick: this.showModal('rollBack'),
    },
    {
      key: 'editService',
      show: this.resourceStore.isExistService,
      icon: 'network-router',
      text: t('Edit Service'),
      action: 'edit',
      onClick: this.showModal('editService'),
    },
    {
      key: 'editConfigTemplate',
      icon: 'storage',
      text: t('Edit Config Template'),
      action: 'edit',
      onClick: this.showModal('editConfigTemplate'),
    },
    {
      key: 'editYaml',
      icon: 'pen',
      text: t('Edit YAML'),
      action: 'edit',
      onClick: this.showModal('editYaml'),
    },
    {
      key: 'redeploy',
      icon: 'restart',
      text: t('Redeploy'),
      action: 'edit',
      onClick: this.showModal('redeploy'),
    },
    {
      key: 'delete',
      icon: 'trash',
      text: t('Delete'),
      action: 'delete',
      onClick: this.showModal('deleteModal'),
    },
  ]

  fetchData = async params => {
    if (this.store.fetchDetail) {
      await this.store.fetchDetail(this.params, params).catch(this.catch)
    }
  }

  handleEditService = newObject => {
    this.serviceStore.update(this.serviceDetail, newObject).then(() => {
      this.hideModal('editService')()
      Notify.success({ content: `${t('Updated Successfully')}!` })
      this.fetchData()
    })
  }

  renderExtraModals() {
    const { detail = {}, isSubmitting } = this.store
    const {
      editBaseInfo,
      rollBack,
      redeploy,
      editConfigTemplate,
      editService,
      editYaml,
    } = this.state
    const originData = toJS(detail._originData)

    this.serviceDetail = {
      type: 'Headless(Selector)',
      name: get(originData, 'spec.serviceName', ''),
      namespace: detail.namespace,
    }

    return (
      <div>
        <EditBasicInfoModal
          visible={editBaseInfo}
          detail={originData}
          onOk={this.handleEdit('editBaseInfo')}
          onCancel={this.hideModal('editBaseInfo')}
          isSubmitting={isSubmitting}
        />
        <RollBackModal
          visible={rollBack}
          module={this.module}
          detail={detail}
          onOk={this.handleRollBack}
          onCancel={this.hideModal('rollBack')}
          isSubmitting={this.revisionStore.isSubmitting}
        />
        <EditTemplateModal
          visible={editConfigTemplate}
          store={this.store}
          module={this.module}
          detail={originData}
          onOk={this.handleEdit('editConfigTemplate', 'update')}
          onCancel={this.hideModal('editConfigTemplate')}
          isSubmitting={isSubmitting}
        />
        <EditYamlModal
          visible={editYaml}
          detail={originData}
          onOk={this.handleEdit('editYaml', 'update')}
          onCancel={this.hideModal('editYaml')}
          isSubmitting={isSubmitting}
        />
        <RedeployModal
          visible={redeploy}
          detail={detail}
          type={MODULE_KIND_MAP[this.module]}
          onOk={this.handleRedeploy}
          onCancel={this.hideModal('redeploy')}
          isSubmitting={isSubmitting}
        />
        <EditServiceModal
          visible={editService}
          store={this.serviceStore}
          detail={this.serviceDetail}
          onOk={this.handleEditService}
          onCancel={this.hideModal('editService')}
          isSubmitting={this.serviceStore.isSubmitting}
        />
      </div>
    )
  }
}

export default StatefulSetsDetail
