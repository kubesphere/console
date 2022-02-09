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

import { getDisplayName, getLocalTime } from 'utils'
import { getNodeRoles, getNodeStatus } from 'utils/node'
import { trigger } from 'utils/action'
import NodeStore from 'stores/node'

import DetailPage from 'clusters/containers/Base/Detail'
import { Status } from 'components/Base'

import routes from './routes'

@inject('rootStore')
@observer
@trigger
export default class NodeDetail extends React.Component {
  store = new NodeStore()

  componentDidMount() {
    this.fetchData()
  }

  get module() {
    return 'edgenodes'
  }

  get name() {
    return 'EDGE_NODE'
  }

  get listUrl() {
    const { cluster } = this.props.match.params
    return `/clusters/${cluster}/edgenodes`
  }

  fetchData = () => {
    const { cluster, node } = this.props.match.params
    this.store.fetchDetail({ name: node, cluster })
  }

  getOperations = () => {
    const { unschedulable } = this.store.detail
    return [
      {
        key: 'cordon',
        type: unschedulable ? 'control' : 'danger',
        text: unschedulable ? t('UNCORDON') : t('CORDON'),
        action: 'edit',
        onClick: this.handleCordon,
      },
      {
        key: 'eidtLabel',
        icon: 'pen',
        text: t('EDIT_LABELS'),
        action: 'edit',
        onClick: () =>
          this.trigger('node.labels', {
            title: t('LABEL_PL'),
            detail: this.store.detail,
            success: this.fetchData,
          }),
      },
      {
        key: 'taintManagement',
        icon: 'wrench',
        text: t('EDIT_TAINTS'),
        action: 'edit',
        onClick: () =>
          this.trigger('node.taint', {
            detail: this.store.detail,
            success: this.fetchData,
          }),
      },
    ]
  }

  getAttrs = () => {
    const detail = toJS(this.store.detail)

    if (isEmpty(detail)) {
      return
    }

    const statusStr = getNodeStatus(detail)
    const status = (
      <Status
        type={statusStr}
        name={t(`NODE_STATUS_${statusStr.toUpperCase()}`)}
      />
    )
    const address = get(detail, 'status.addresses[0].address', '-')
    const nodeInfo = detail.nodeInfo || {}

    return [
      {
        name: t('STATUS'),
        value: status,
      },
      {
        name: t('IP_ADDRESS'),
        value: address,
      },
      {
        name: t('SCHEDULABLE'),
        value: detail.unschedulable ? t('NO') : t('YES'),
      },
      {
        name: t('ROLE'),
        value:
          getNodeRoles(detail.labels)
            .map(role => t(role.replace(/[- ]/g, '_').toUpperCase()))
            .join('/') || '-',
      },
      {
        name: t('OS_VERSION'),
        value: nodeInfo.osImage,
      },
      {
        name: t('OS_TYPE'),
        value: t(nodeInfo.operatingSystem.toUpperCase()),
      },
      {
        name: t('KERNEL_VERSION'),
        value: nodeInfo.kernelVersion,
      },
      {
        name: t('CONTAINER_RUNTIME'),
        value: nodeInfo.containerRuntimeVersion,
      },
      {
        name: t('KUBELET_VERSION'),
        value: nodeInfo.kubeletVersion,
      },
      {
        name: t('KUBE_PROXY_VERSION'),
        value: nodeInfo.kubeProxyVersion,
      },
      {
        name: t('ARCHITECTURE'),
        value: nodeInfo.architecture.toUpperCase(),
      },
      {
        name: t('CREATION_TIME_TCAP'),
        value: getLocalTime(detail.createTime).format('YYYY-MM-DD HH:mm:ss'),
      },
    ]
  }

  handleCordon = () => {
    const detail = toJS(this.store.detail)

    if (detail.unschedulable) {
      this.store.uncordon(detail).then(this.fetchData)
    } else {
      this.store.cordon(detail).then(this.fetchData)
    }
  }

  render() {
    const stores = { detailStore: this.store }

    if (this.store.isLoading && !this.store.detail.name) {
      return <Loading className="ks-page-loading" />
    }

    const sideProps = {
      module: this.module,
      name: getDisplayName(this.store.detail),
      desc: this.store.detail.description,
      operations: this.getOperations(),
      attrs: this.getAttrs(),
      breadcrumbs: [
        {
          label: t('EDGE_NODE_PL'),
          url: this.listUrl,
        },
      ],
    }

    return <DetailPage stores={stores} routes={routes} {...sideProps} />
  }
}
