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
import { observer } from 'mobx-react'
import { isEmpty } from 'lodash'

import ContainerStore from 'stores/container'
import { createCenterWindowOpt } from 'utils/dom'

import Base from 'core/containers/Base/Detail'
import BaseInfo from 'core/containers/Base/Detail/BaseInfo'

@observer
class ContainersDetail extends Base {
  get name() {
    return 'Containers'
  }

  get authKey() {
    return 'pods'
  }

  get detailDesc() {
    return t('Container')
  }

  get ports() {
    const { ports = [] } = this.store.detail

    return isEmpty(ports)
      ? '-'
      : ports
          .map(
            port =>
              `${port.name ? `${port.name}:` : ''}${port.containerPort ||
                'None'}/${port.protocol}`
          )
          .join(' ')
  }

  get command() {
    const { command = [] } = this.store.detail
    return isEmpty(command) ? '-' : command.join(' ')
  }

  init() {
    this.store = new ContainerStore()
  }

  getResourceInfo = type => {
    const { resources = {} } = this.store.detail
    const resourceType = resources[type]

    return (
      resourceType &&
      Object.keys(resourceType)
        .map(key => `${t(key)}: ${resourceType[key]}`)
        .join(' / ')
    )
  }

  getOperations = () => [
    {
      key: 'terminal',
      type: 'control',
      text: t('Terminal'),
      action: 'terminal',
      onClick: this.handleOpenTerminal,
    },
  ]

  getAttrs = () => {
    const { detail = {} } = this.store

    if (isEmpty(detail)) return null

    const status = detail.state ? Object.keys(detail.state)[0] : ''

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
        name: t('Image'),
        value: detail.image,
      },
      {
        name: t('Image ID'),
        value: detail.imageID,
      },
      {
        name: t('Port'),
        value: this.ports,
      },
      {
        name: t('Command'),
        value: this.command,
      },
      {
        name: t('Resource Requests'),
        value: this.getResourceInfo('requests'),
      },
      {
        name: t('Resource Limits'),
        value: this.getResourceInfo('limits'),
      },
      {
        name: t('Image Pull Policy'),
        value: detail.imagePullPolicy,
      },
      {
        name: `${t('Restart Count')}(${t('Total')})`,
        value: detail.restartCount,
      },
    ]
  }

  handleOpenTerminal = () => {
    const { namespace, podName, containerName } = this.props.match.params

    const terminalUrl = `/terminal/${namespace}/pods/${podName}/containers/${containerName}`
    window.open(
      terminalUrl,
      `Connecting ${containerName}`,
      createCenterWindowOpt({
        width: 1200,
        height: 800,
        scrollbars: 1,
        resizable: 1,
      })
    )
  }

  renderSider() {
    return (
      <BaseInfo
        icon="docker"
        name={this.detailName}
        desc={this.detailDesc}
        operations={this.getEnabledOperations()}
        labels={this.labels}
        attrs={this.getAttrs()}
      />
    )
  }
}

export default ContainersDetail
