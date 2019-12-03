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

import WorkloadStore from 'stores/workload'
import ResourceStore from 'stores/workload/resource'
import RevisionStore from 'stores/workload/revision'
import HpaStore from 'stores/workload/hpa'
import ConfigMapStore from 'stores/configmap'
import SecretStore from 'stores/secret'
import Builder from 'stores/s2i/builder'

import { Notify } from 'components/Base'

import Base from 'core/containers/Base/Detail'
import EditBasicInfoModal from 'components/Modals/EditBasicInfo'
import EditConfigTemplateModal from 'projects/components/Modals/ConfigTemplate'
import EditYamlModal from 'components/Modals/EditYaml'
import RollBackModal from 'projects/components/Modals/RollBack'
import HPAModal from 'projects/components/Modals/HPA'
import RebuildS2i from 'projects/components/Modals/RebuildS2i'
import RedeployModal from 'projects/components/Modals/Redeploy'
import WorkloadDeleteModal from 'projects/components/Modals/WorkloadDelete'

import { MODULE_KIND_MAP } from 'utils/constants'

class DeploymentDetail extends Base {
  state = {
    editBaseInfo: false,
    rollBack: false,
    editHpa: false,
    editConfigTemplate: false,
    editYaml: false,
    deleteModule: false,
  }

  get name() {
    return 'Deployment'
  }

  get builderNames() {
    return get(this.store.detail, 'builderNames', [])
  }

  init() {
    this.store = new WorkloadStore(this.module)
    this.store.configMapStore = new ConfigMapStore()
    this.store.secretStore = new SecretStore()
    this.store.projectStore = this.props.rootStore.project
    this.resourceStore = new ResourceStore(this.module)
    this.revisionStore = new RevisionStore(this.module)
    this.builderStore = new Builder()
    this.hpaStore = new HpaStore()
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
      show: this.module === 'deployments',
      key: 'editHpa',
      icon: 'firewall',
      text: t('Horizontal Pod Autoscaling'),
      action: 'edit',
      onClick: this.showModal('editHpa'),
    },
    ...(this.builderNames.length
      ? [
          {
            key: 'rebuild',
            icon: 'refresh',
            text: t('Rebuild Image'),
            action: 'edit',
            onClick: this.showModal('rebuild'),
          },
        ]
      : []),
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

  getAttrs = () => [
    {
      name: t('Project'),
      value: this.namespace,
    },
    {
      name: t('Application'),
      value: this.application,
    },
    {
      name: t('Created Time'),
      value: this.createTime,
    },
    {
      name: t('Updated Time'),
      value: this.updateTime,
    },
    {
      name: t('Creator'),
      value: this.creator,
    },
  ]

  handleRollBack = params => {
    this.revisionStore.rollBack(params).then(() => {
      this.hideModal('rollBack')()
      this.fetchData()
    })
  }

  handleUpdateHpa = (newData, isEdit) => {
    if (isEdit) {
      this.hpaStore.patch(this.store.detail, newData).then(() => {
        this.hideModal('editHpa')()
        this.fetchData()
      })
    } else {
      this.hpaStore.create(newData).then(async () => {
        this.hideModal('editHpa')()

        const { detail } = this.store
        await this.store.patch(detail, {
          metadata: {
            annotations: {
              'kubesphere.io/relatedHPA': get(
                newData,
                'metadata.name',
                detail.name
              ),
            },
          },
        })
        await this.fetchData()
      })
    }
  }

  handleRebuild = async ({ isUpdateWorkload, builderName, ...rest }) => {
    await this.builderStore.rerun({
      ...rest,
      name: builderName,
      namespace: this.namespace,
      isUpdateWorkload,
    })
    Notify.success({
      content: t('Rebuild successful, the image status will be refreshed soon'),
    })
    setTimeout(this.fetchData, 1000)
    this.hideModal('rebuild')()
  }

  handleRedeploy = () => {
    const { detail } = this.store
    this.store
      .patch(detail, {
        spec: {
          template: {
            metadata: {
              annotations: {
                'kubesphere.io/restartedAt': new Date(),
              },
            },
          },
        },
      })
      .then(() => {
        this.hideModal('redeploy')()
        Notify.success({ content: `${t('Redeploy Successfully')}!` })
      })
  }

  renderModals() {
    const { detail = {}, isSubmitting } = this.store
    const { deleteModal } = this.state

    return (
      <div>
        <WorkloadDeleteModal
          resource={detail}
          visible={deleteModal}
          onOk={this.handleDelete}
          onCancel={this.hideModal('deleteModal')}
          isSubmitting={isSubmitting}
        />
        {this.renderExtraModals()}
      </div>
    )
  }

  renderExtraModals() {
    const { detail = {}, isSubmitting } = this.store
    const {
      editBaseInfo,
      rollBack,
      redeploy,
      editHpa,
      editConfigTemplate,
      editYaml,
      rebuild,
    } = this.state
    const originData = toJS(detail._originData)

    return (
      <div>
        <EditBasicInfoModal
          visible={editBaseInfo}
          detail={originData}
          onOk={this.handleEdit('editBaseInfo')}
          onCancel={this.hideModal('editBaseInfo')}
          isSubmitting={isSubmitting}
        />
        <EditConfigTemplateModal
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
        <RollBackModal
          visible={rollBack}
          module={this.module}
          detail={detail}
          onOk={this.handleRollBack}
          onCancel={this.hideModal('rollBack')}
          isSubmitting={this.revisionStore.isSubmitting}
        />
        <HPAModal
          visible={editHpa}
          store={this.hpaStore}
          detail={detail}
          onOk={this.handleUpdateHpa}
          onCancel={this.hideModal('editHpa')}
          isSubmitting={this.hpaStore.isSubmitting}
        />
        <RebuildS2i
          visible={rebuild}
          namespace={this.namespace}
          builderNames={this.builderNames}
          onOk={this.handleRebuild}
          onCancel={this.hideModal('rebuild')}
        />
      </div>
    )
  }
}

export default inject('rootStore')(observer(DeploymentDetail))
export const Component = DeploymentDetail
