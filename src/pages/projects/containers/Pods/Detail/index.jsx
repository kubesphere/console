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
import { toJS, reaction } from 'mobx'
import { inject, observer } from 'mobx-react'
import pathToRegexp from 'path-to-regexp'
import { get, isEmpty, throttle } from 'lodash'

import PodStore from 'stores/pod'

import Base from 'core/containers/Base/Detail'
import EditYamlModal from 'components/Modals/EditYaml'

@inject('rootStore')
@observer
class PodsDetail extends Base {
  get name() {
    return 'Pod'
  }

  get authKey() {
    return 'pods'
  }

  get detailDesc() {
    return t('Pod')
  }

  get listUrl() {
    const { parentUrl, match } = this.props
    return pathToRegexp.compile(parentUrl)(match.params)
  }

  init() {
    this.store = new PodStore()

    this.websocket = this.props.rootStore.websocket

    this.initWebsocket()
  }

  initWebsocket() {
    const { namespace, podName } = this.props.match.params

    if (namespace && podName && 'getWatchUrl' in this.store) {
      const url = this.store.getWatchUrl({ namespace, name: podName })

      this.websocket.watch(url)

      this.fetchData = throttle(this.fetchData, 1000)

      this.disposer = reaction(
        () => this.websocket.message,
        message => {
          if (message.object.kind === 'Pod') {
            if (message.type === 'MODIFIED') {
              this.fetchData({ silent: true })
            } else if (message.type === 'DELETED') {
              this.deleteCallback()
            }
          }
        }
      )
    }
  }

  componentWillUnmount() {
    this.disposer && this.disposer()
  }

  fetchData = params => {
    const { namespace, podName } = this.props.match.params

    this.store
      .fetchDetail({
        namespace,
        name: podName,
        ...params,
      })
      .catch(this.catch)
  }

  getOperations = () => [
    {
      key: 'viewYaml',
      type: 'default',
      text: t('View YAML'),
      onClick: this.showModal('viewYaml'),
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
    const { detail = {} } = this.store

    if (isEmpty(detail)) return null

    const { status, restarts } = detail.podStatus

    return [
      {
        name: t('Project'),
        value: this.namespace,
      },
      {
        name: t('Application'),
        value: this.application,
      },
      {
        name: t('Status'),
        value: t(status),
      },
      {
        name: t('Pod IP'),
        value: detail.podIp,
      },
      {
        name: t('Node Name'),
        value: detail.node,
      },
      {
        name: t('Node IP'),
        value: detail.nodeIp,
      },
      {
        name: `${t('Restart Count')}(${t('Total')})`,
        value: restarts,
      },
      {
        name: t('QoS Class'),
        value: get(detail, 'status.qosClass'),
      },
      {
        name: t('Created Time'),
        value: this.createTime,
      },
    ]
  }

  renderExtraModals() {
    const { detail } = this.store
    const { viewYaml } = this.state

    return (
      <div>
        <EditYamlModal
          visible={viewYaml}
          detail={toJS(detail._originData)}
          onCancel={this.hideModal('viewYaml')}
          readOnly
        />
      </div>
    )
  }
}

export default PodsDetail
