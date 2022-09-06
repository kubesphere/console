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
import classnames from 'classnames'
import { isEmpty, get } from 'lodash'
import { Loading } from '@kube-design/components'

import PodStore from 'stores/pod'
import TerminalStore from 'stores/terminal'
import { TypeSelect } from 'components/Base'
import ContainerTerminal from 'components/Terminal'
import fullscreen from 'components/Modals/FullscreenModal'

import { observable } from 'mobx'
import styles from './index.scss'

@fullscreen
@observer
export default class ContainerTerminalModal extends React.Component {
  podStore = new PodStore()

  @observable
  container = { name: this.props.match.params.containerName }

  @observable
  url = null

  constructor(props) {
    super(props)
    const {
      containerName,
      podName,
      cluster,
      namespace,
    } = this.props.match.params

    this.store = new TerminalStore({
      cluster,
      namespace,
      pod: podName,
      container: containerName,
      shell: 'sh',
    })
  }

  async componentDidMount() {
    const params = this.props.match.params
    const { cluster, namespace, podName, containerName } = params

    await this.podStore.fetchDetail({
      cluster,
      namespace,
      name: podName,
    })

    this.getContainerInfo(containerName)
  }

  getContainerInfo = async containerName => {
    const container = this.podStore.detail.containers.find(
      item => item.name === containerName
    )

    if (container) {
      this.container = container
    }

    this.url = await this.store.kubeWebsocketUrl()
  }

  handleContainerChange = container => {
    this.store.kubectl.container = container.name
    this.getContainerInfo(container.name)
  }

  getResourceInfo = type => {
    const { resources = {} } = this.container || {}
    const resourceType = resources[type]

    return (
      resourceType &&
      Object.keys(resourceType)
        .map(key => `${key}: ${resourceType[key]}`)
        .join(' / ')
    )
  }

  renderContainerMsg() {
    const selectContainer = this.container
    const defaultContainers = [
      {
        name: selectContainer.name,
        image: t('LOADING'),
      },
    ]

    const containers = get(
      this.podStore,
      'detail.containers',
      defaultContainers
    )

    const containerOpts = containers.map(container => ({
      label: container.name,
      value: container,
      uid: container.name,
      icon: 'docker',
      description: t('IMAGE_VALUE', { value: container.image }),
    }))

    const command = selectContainer.command

    return (
      <Loading spinning={this.podStore.isLoading}>
        <div className={styles.summary}>
          <TypeSelect
            value={selectContainer}
            options={containerOpts}
            onChange={this.handleContainerChange}
          />
          <h6>{t('BASIC_INFORMATION')}</h6>
          <dl>
            <dt>{t('STATUS')}</dt>
            <dd>{selectContainer.ready ? t('RUNNING') : t('UPDATING')}</dd>
            <dt>{t('IMAGE')}</dt>
            <dd>{selectContainer.image}</dd>
            <dt>{t('COMMAND')}</dt>
            <dd>{isEmpty(command) ? '-' : command.join(' ')}</dd>
            <dt>{t('RESOURCE_REQUESTS')}</dt>
            <dd>{this.getResourceInfo('requests')}</dd>
            <dt>{t('RESOURCE_LIMITS')}</dt>
            <dd>{this.getResourceInfo('limits')}</dd>
            <dt>{t('RESTART_PL')}</dt>
            <dd>{selectContainer.restartCount}</dd>
          </dl>
        </div>
      </Loading>
    )
  }

  render() {
    return (
      <div className={styles.kubectl}>
        <div className={styles.terminalWrapper}>
          <div className={classnames(styles.pane, styles.terminal)}>
            <ContainerTerminal url={this.url} />
          </div>
        </div>
        <div className={styles.tipWrapper}>{this.renderContainerMsg()}</div>
      </div>
    )
  }
}
