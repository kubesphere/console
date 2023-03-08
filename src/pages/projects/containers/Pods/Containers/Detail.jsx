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
import { isEmpty } from 'lodash'
import { observer } from 'mobx-react'
import { Loading } from '@kube-design/components'

import { getDisplayName, showNameAndAlias } from 'utils'
import { trigger } from 'utils/action'
import { createCenterWindowOpt } from 'utils/dom'
import ContainerStore from 'stores/container'

import DetailPage from 'projects/containers/Base/Detail'
import getRoutes from './routes'

@observer
@trigger
export default class ContainerDetail extends React.Component {
  store = new ContainerStore()

  componentDidMount() {
    this.fetchData()
  }

  get name() {
    return 'CONTAINER'
  }

  get authKey() {
    return 'pods'
  }

  get listUrl() {
    const { workspace, cluster, namespace, podName } = this.props.match.params
    return `${
      workspace ? `/${workspace}` : ''
    }/clusters/${cluster}/projects/${namespace}/pods/${podName}`
  }

  fetchData = () => {
    this.store.fetchDetail(this.props.match.params)
  }

  getOperations = () => [
    {
      key: 'terminal',
      type: 'control',
      text: t('TERMINAL'),
      action: 'edit',
      onClick: this.handleOpenTerminal,
    },
  ]

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

  getResourceInfo = type => {
    const { resources = {} } = this.store.detail
    const resourceType = resources[type]

    return (
      resourceType &&
      Object.keys(resourceType)
        .map(key => {
          const isCpu = key === 'cpu'
          const value =
            isCpu && resourceType[key].endsWith('m')
              ? parseInt(resourceType[key], 10) / 1000
              : resourceType[key]

          return t(`${key.toUpperCase().replace(/[^A-Z]/g, '_')}_VALUE`, {
            value,
          })
        })
        .join('/')
    )
  }

  getAttrs = () => {
    const { cluster, namespace } = this.props.match.params

    const { detail = {} } = this.store

    if (isEmpty(detail)) return null

    const status = detail.state ? Object.keys(detail.state)[0] : ''

    let imagePullPolicy

    if (detail.imagePullPolicy === 'Always') {
      imagePullPolicy = t('IMAGE_PULL_POLICY_ALWAYS')
    } else if (detail.imagePullPolicy === 'IfNotPresent') {
      imagePullPolicy = t('IMAGE_PULL_POLICY_IFNOTPRESENT')
    } else if (detail.imagePullPolicy === 'Never') {
      imagePullPolicy = t('IMAGE_PULL_POLICY_NEVER')
    } else {
      imagePullPolicy = detail.imagePullPolicy
    }

    return [
      {
        name: t('CLUSTER'),
        value: showNameAndAlias(cluster, 'cluster'),
      },
      {
        name: t('PROJECT'),
        value: showNameAndAlias(namespace, 'project'),
      },
      {
        name: t('APP'),
        value: detail.app,
      },
      {
        name: t('STATUS'),
        value: t(status),
      },
      {
        name: t('IMAGE'),
        value: detail.image,
      },
      {
        name: t('IMAGE_ID'),
        value: detail.imageID,
      },
      {
        name: t('PORT'),
        value: this.ports,
      },
      {
        name: t('COMMAND'),
        value: this.command,
      },
      {
        name: t('RESOURCE_REQUESTS'),
        value: this.getResourceInfo('requests'),
      },
      {
        name: t('RESOURCE_LIMITS'),
        value: this.getResourceInfo('limits'),
      },
      {
        name: t('IMAGE_PULL_POLICY'),
        value: imagePullPolicy,
      },
      {
        name: t('RESTART_PL'),
        value: detail.restartCount,
      },
    ]
  }

  handleOpenTerminal = () => {
    const {
      cluster,
      namespace,
      podName,
      containerName,
    } = this.props.match.params

    const terminalUrl = `/terminal/cluster/${cluster}/projects/${namespace}/pods/${podName}/containers/${containerName}`
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

  render() {
    const stores = { detailStore: this.store }

    if (this.store.isLoading && !this.store.detail.name) {
      return <Loading className="ks-page-loading" />
    }

    const sideProps = {
      module: this.module,
      authKey: this.authKey,
      name: getDisplayName(this.store.detail),
      desc: t('CONTAINER_DETAILS_PAGE_SCAP'),
      operations: this.getOperations(),
      attrs: this.getAttrs(),
      breadcrumbs: [
        {
          label: t('CONTAINER_PL'),
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
