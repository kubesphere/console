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
import { get, isEmpty, forEach } from 'lodash'

import { getLocalTime } from 'utils'
import { getNodeRoles, getNodeStatus } from 'utils/node'
import NodeStore from 'stores/node'

import Base from 'core/containers/Base/Detail'
import { Status } from 'components/Base'
import ObjectEditModal from 'components/Modals/ObjectEdit'
import TaintManageModal from 'components/Modals/Node/TaintManagement'

class NodeDetail extends Base {
  state = {
    editLabel: false,
    taintManagement: false,
    deleteModule: false,
  }

  get name() {
    return 'Node'
  }

  get listUrl() {
    return '/infrastructure/nodes'
  }

  init() {
    this.store = new NodeStore(this.module)
  }

  getOperations = () => {
    const { unschedulable } = this.store.detail

    return [
      {
        key: 'cordon',
        type: unschedulable ? 'control' : 'danger',
        text: unschedulable ? t('Uncordon') : t('Cordon'),
        action: 'edit',
        onClick: this.handleCordon,
      },
      {
        key: 'eidtLabel',
        icon: 'pen',
        text: t('Edit Labels'),
        action: 'edit',
        onClick: this.showModal('editLabel'),
      },
      {
        key: 'taintManagement',
        icon: 'wrench',
        text: t('Taint Management'),
        action: 'edit',
        onClick: this.showModal('taintManagement'),
      },
      {
        key: 'delete',
        icon: 'trash',
        text: t('Delete'),
        action: 'delete',
        onClick: this.showModal('deleteModule'),
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
        name: t('Status'),
        value: status,
      },
      {
        name: t('IP'),
        value: address,
      },
      {
        name: t('Unschedulable'),
        value: detail.unschedulable ? 'true' : 'false',
      },
      {
        name: t('Role'),
        value: getNodeRoles(detail.labels).join(', ') || '-',
      },
      {
        name: t('OsImage'),
        value: nodeInfo.osImage,
      },
      {
        name: t('OperatingSystem'),
        value: nodeInfo.operatingSystem,
      },
      {
        name: t('KernelVersion'),
        value: nodeInfo.kernelVersion,
      },
      {
        name: t('ContainerRuntimeVersion'),
        value: nodeInfo.containerRuntimeVersion,
      },
      {
        name: t('Kubelet Version'),
        value: nodeInfo.kubeletVersion,
      },
      {
        name: t('Kube-Proxy Version'),
        value: nodeInfo.kubeProxyVersion,
      },
      {
        name: t('Created Time'),
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

  handleLabelEdit = newLabels => {
    const node = this.store.detail
    const originLabels = node.labels || {}

    forEach(originLabels, (value, key) => {
      if (isEmpty(newLabels[key])) {
        originLabels[key] = null
      }
    })

    const labels = {
      ...originLabels,
      ...newLabels,
    }
    this.store.patch(node, { metadata: { labels } }).then(() => {
      setTimeout(() => {
        this.hideModal('editLabel')()
        this.fetchData()
      }, 0)
    })
  }

  handleTaintManagement = data => {
    this.store.patch(this.store.detail, data).then(() => {
      this.hideModal('taintManagement')()
      this.fetchData()
    })
  }

  renderExtraModals() {
    const { detail = {}, isSubmitting } = this.store
    const { labels = {}, taints } = toJS(detail)
    const { editLabel, taintManagement } = this.state

    return (
      <div>
        <ObjectEditModal
          title="Labels"
          visible={editLabel}
          value={labels}
          onOk={this.handleLabelEdit}
          onCancel={this.hideModal('editLabel')}
          isSubmitting={isSubmitting}
        />
        <TaintManageModal
          visible={taintManagement}
          value={taints}
          onOk={this.handleTaintManagement}
          onCancel={this.hideModal('taintManagement')}
          isSubmitting={isSubmitting}
        />
      </div>
    )
  }
}

export default inject('rootStore')(observer(NodeDetail))
export const Component = NodeDetail
