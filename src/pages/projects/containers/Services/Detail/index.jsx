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

import { get, isEmpty } from 'lodash'
import React from 'react'
import { toJS } from 'mobx'
import { observer, inject } from 'mobx-react'

import { Loading } from '@pitrix/lego-ui'
import { joinSelector } from 'utils'
import { SERVICE_TYPES } from 'utils/constants'
import ServiceStore from 'stores/service'

import Base from 'core/containers/Base/Detail'
import EditBasicInfoModal from 'components/Modals/EditBasicInfo'
import EditYamlModal from 'components/Modals/EditYaml'
import EditGatewayModal from 'projects/components/Modals/ServiceGatewaySetting'
import EditServiceModal from 'projects/components/Modals/ServiceSetting'
import ServiceDeleteModal from 'projects/components/Modals/ServiceDelete'

class ServiceDetail extends Base {
  get name() {
    return 'Service'
  }

  get isLoading() {
    return this.store.isLoading
  }

  init() {
    this.store = new ServiceStore()
  }

  fetchData = () => {
    this.store
      .fetchDetail(this.props.match.params)
      .then(() => {
        const { namespace, selector } = this.store.detail
        const labelSelector = joinSelector(selector)
        if (!isEmpty(labelSelector)) {
          this.store.fetchWorkloads({ namespace, labelSelector })
          this.store.fetchPods({ namespace, labelSelector })
        }
      })
      .catch(this.catch)
    this.store.fetchEndpoints(this.props.match.params)
  }

  getOperations = () => {
    const actions = [
      {
        key: 'edit',
        type: 'control',
        text: t('EDIT'),
        action: 'edit',
        onClick: this.showModal('editBaseInfo'),
      },
      {
        key: 'editService',
        icon: 'network-router',
        text: t('Edit Service'),
        action: 'edit',
        onClick: this.showModal('editService'),
      },
    ]

    const detail = toJS(this.store.detail)
    if (detail.type === SERVICE_TYPES.VirtualIP) {
      actions.push({
        key: 'editGateway',
        icon: 'ip',
        text: t('Edit Internet Access'),
        action: 'edit',
        onClick: this.showModal('editGateway'),
      })
    }

    return [
      ...actions,
      {
        key: 'editYaml',
        icon: 'pen',
        text: t('Edit YAML'),
        action: 'edit',
        onClick: this.showModal('editYaml'),
      },
      {
        key: 'delete',
        icon: 'trash',
        type: 'danger',
        text: t('Delete'),
        action: 'delete',
        onClick: this.showModal('deleteModule'),
      },
    ]
  }

  getAttrs = () => {
    const detail = toJS(this.store.detail)

    let externalIP
    if (detail.type === 'ExternalName') {
      externalIP = detail.externalName
    } else if (detail.specType === 'LoadBalancer') {
      externalIP = detail.loadBalancerIngress
    } else if (detail.externalIPs) {
      externalIP = detail.externalIPs.join(', ')
    }

    const serviceType = get(detail, 'annotations["kubesphere.io/serviceType"]')

    return [
      {
        name: t('Project'),
        value: detail.namespace,
      },
      {
        name: t('Type'),
        value: (
          <span>
            {`${
              serviceType
                ? t(`SERVICE_TYPE_${serviceType.toUpperCase()}`)
                : t('Custom Creation')
            }`}
            <span className="text-desc"> ({detail.type})</span>
          </span>
        ),
      },
      {
        name: t('Application'),
        value: this.application,
      },
      {
        name: t('Virtual IP'),
        value: detail.clusterIP,
      },
      {
        name: t('External IP'),
        value: externalIP,
      },
      {
        name: t('Session Affinity'),
        value: detail.sessionAffinity,
      },
      {
        name: t('Selector'),
        value: joinSelector(detail.selector),
      },
      {
        name: t('DNS'),
        value: this.getDNS(),
      },
      {
        name: t('Endpoints'),
        value: this.renderEndpoints(),
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
  }

  getDNS() {
    const { detail: service, workloads, pods } = this.store

    if (
      workloads.isLoading ||
      workloads.type !== 'statefulsets' ||
      pods.isLoading ||
      pods.data.length === 0
    ) {
      return `${service.name}.${service.namespace}`
    }

    return pods.data.map(pod => (
      <p key={pod.uid}>
        {pod.name}.{service.name}.{service.namespace}
      </p>
    ))
  }

  renderEndpoints() {
    const { type } = this.store.detail
    if (type === 'Headless(ExternalName)') {
      return null
    }

    const { isLoading, data } = this.store.endpoints

    if (isLoading) {
      return <Loading size={12} />
    }
    if (data.length === 0) {
      return '-'
    }

    const endpoints = []
    data.forEach(subset => {
      subset.addresses.forEach(addr => {
        subset.ports.forEach(port => {
          if (addr.ip && port.port) {
            endpoints.push(`${addr.ip}:${port.port}`)
          }
        })
      })
    })
    return endpoints.map((end, index) => <p key={index}>{end}</p>)
  }

  renderModals() {
    const { detail, isSubmitting } = this.store
    const {
      deleteModule,
      editBaseInfo,
      editYaml,
      editService,
      editGateway,
    } = this.state

    const originData = toJS(detail._originData)

    return (
      <div>
        <ServiceDeleteModal
          type={t(this.name)}
          resource={detail}
          visible={deleteModule}
          onOk={this.handleDelete}
          onCancel={this.hideModal('deleteModule')}
          isSubmitting={isSubmitting}
        />
        <EditBasicInfoModal
          visible={editBaseInfo}
          detail={originData}
          onOk={this.handleEdit('editBaseInfo')}
          onCancel={this.hideModal('editBaseInfo')}
          isSubmitting={isSubmitting}
        />
        <EditYamlModal
          visible={editYaml}
          detail={originData}
          onOk={this.handleEdit('editYaml', 'update')}
          onCancel={this.hideModal('editYaml')}
          isSubmitting={isSubmitting}
        />
        <EditGatewayModal
          visible={editGateway}
          detail={originData}
          onOk={this.handleEdit('editGateway', 'update')}
          onCancel={this.hideModal('editGateway')}
          isSubmitting={isSubmitting}
        />
        <EditServiceModal
          visible={editService}
          detail={originData}
          type={detail.type}
          onOk={this.handleEdit('editService', 'update')}
          onCancel={this.hideModal('editService')}
          isSubmitting={isSubmitting}
        />
      </div>
    )
  }
}

export default inject('rootStore')(observer(ServiceDetail))
export const Component = ServiceDetail
