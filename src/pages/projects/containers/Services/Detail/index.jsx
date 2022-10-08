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
import { get, isEmpty } from 'lodash'
import { Loading } from '@kube-design/components'

import { getDisplayName, joinSelector, getLocalTime } from 'utils'
import { trigger } from 'utils/action'
import { SERVICE_TYPES } from 'utils/constants'
import ServiceStore from 'stores/service'
import ServiceMonitorStore from 'stores/monitoring/service.monitor'

import DetailPage from 'projects/containers/Base/Detail'

import getRoutes from './routes'

@inject('rootStore')
@observer
@trigger
export default class ServiceDetail extends React.Component {
  store = new ServiceStore()

  serviceMonitorStore = new ServiceMonitorStore()

  componentDidMount() {
    this.fetchData()
  }

  get module() {
    return 'services'
  }

  get name() {
    return 'SERVICE'
  }

  get routing() {
    return this.props.rootStore.routing
  }

  get listUrl() {
    const { workspace, cluster, namespace } = this.props.match.params
    if (workspace) {
      return `/${workspace}/clusters/${cluster}/projects/${namespace}/${this.module}`
    }
    return `/clusters/${cluster}/${this.module}`
  }

  get isFedManaged() {
    return this.store.detail.isFedManaged
  }

  fetchData = () => {
    const { params } = this.props.match
    this.store.fetchDetail(params)
    this.store.fetchEndpoints(params)
  }

  fetchServiceMonitors = () => {
    const { cluster, namespace, labels } = this.store.detail

    if (!isEmpty(labels)) {
      this.serviceMonitorStore.fetchListByK8s({
        cluster,
        namespace,
        labelSelector: joinSelector(labels),
      })
    }
  }

  getOperations = () => [
    {
      key: 'edit',
      icon: 'pen',
      text: t('EDIT_INFORMATION'),
      action: 'edit',
      onClick: () =>
        this.trigger('resource.baseinfo.edit', {
          type: this.name,
          detail: this.store.detail,
          success: this.fetchData,
        }),
    },
    {
      key: 'editService',
      icon: 'network-router',
      text: t('EDIT_SERVICE'),
      action: 'edit',
      onClick: () =>
        this.trigger('service.edit', {
          detail: this.store.detail,
          success: this.fetchData,
        }),
    },
    {
      key: 'editGateway',
      icon: 'ip',
      text: t('EDIT_EXTERNAL_ACCESS'),
      action: 'edit',
      show: this.store.detail.type === SERVICE_TYPES.VirtualIP,
      onClick: () =>
        this.trigger('service.gateway.edit', {
          detail: this.store.detail,
          success: this.fetchData,
        }),
    },
    {
      key: 'serviceMonitor',
      icon: 'linechart',
      text: t('EDIT_MONITORING_EXPORTER'),
      action: 'edit',
      onClick: () =>
        this.trigger('service.monitor.edit', {
          ...this.props.match.params,
          detail: this.store.detail,
          success: this.fetchServiceMonitors,
        }),
    },
    {
      key: 'editYaml',
      icon: 'pen',
      text: t('EDIT_YAML'),
      action: 'edit',
      onClick: () =>
        this.trigger('resource.yaml.edit', {
          detail: this.store.detail,
          success: this.fetchData,
        }),
    },
    {
      key: 'delete',
      icon: 'trash',
      text: t('DELETE'),
      action: 'delete',
      onClick: () =>
        this.trigger('service.delete', {
          type: this.name,
          detail: this.store.detail,
          success: () => this.routing.push(this.listUrl),
        }),
    },
  ]

  getAttrs = () => {
    const detail = toJS(this.store.detail)
    const { cluster, namespace } = this.props.match.params

    if (isEmpty(detail)) {
      return
    }

    let externalIP
    if (detail.type === 'ExternalName') {
      externalIP = detail.externalName
    } else if (detail.specType === 'LoadBalancer') {
      externalIP = detail.loadBalancerIngress.join('\r\n')
    } else if (detail.externalIPs) {
      externalIP = detail.externalIPs.join('\r\n')
    }

    const serviceType = get(
      detail,
      'annotations["kubesphere.io/serviceType"]',
      ''
    )

    return [
      {
        name: t('CLUSTER'),
        value: cluster,
      },
      {
        name: t('PROJECT'),
        value: namespace,
      },
      {
        name: t('TYPE'),
        value: (
          <span>
            {serviceType
              ? t(`SERVICE_TYPE_${serviceType.toUpperCase()}`)
              : t('CUSTOM_SERVICE')}
            <span className="text-desc"> ({t(detail.type)})</span>
          </span>
        ),
      },
      {
        name: t('APP'),
        value: detail.app,
      },
      {
        name: t('VIRTUAL_IP_ADDRESS'),
        value: detail.clusterIP,
      },
      {
        name: t('EXTERNAL_IP_ADDRESS'),
        value: externalIP,
      },
      {
        name: t('SESSION_AFFINITY'),
        value: detail.sessionAffinity === 'None' ? t('DISABLED') : t('ENABLED'),
      },
      {
        name: t('SELECTOR'),
        value: joinSelector(detail.selector),
      },
      {
        name: t('DNS'),
        value: this.renderDNS(),
      },
      {
        name: t('ENDPOINT'),
        value: this.renderEndpoints(),
      },
      {
        name: t('CREATION_TIME_TCAP'),
        value: getLocalTime(detail.createTime).format('YYYY-MM-DD HH:mm:ss'),
      },
      /* {
        name: t('UPDATE_TIME_TCAP'),
        value: getLocalTime(detail.updateTime).format('YYYY-MM-DD HH:mm:ss'),
      }, */
      {
        name: t('CREATOR'),
        value: detail.creator,
      },
    ]
  }

  renderDNS() {
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

  render() {
    const stores = {
      detailStore: this.store,
      serviceMonitorStore: this.serviceMonitorStore,
    }

    if (this.store.isLoading && !this.store.detail.name) {
      return <Loading className="ks-page-loading" />
    }

    const sideProps = {
      module: this.module,
      name: getDisplayName(this.store.detail),
      desc: this.store.detail.description,
      operations: this.isFedManaged ? [] : this.getOperations(),
      attrs: this.getAttrs(),
      breadcrumbs: [
        {
          label: t(`${this.name}_PL`),
          url: this.listUrl,
        },
      ],
    }

    return (
      <DetailPage
        stores={stores}
        {...sideProps}
        routes={getRoutes(this.props.match.path)}
      />
    )
  }
}
