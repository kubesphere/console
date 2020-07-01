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
import { Loading } from '@pitrix/lego-ui'

import PodStore from 'stores/pod'
import TerminalStore from 'stores/terminal'
import { TypeSelect } from 'components/Base'
import ContainerTerminal from 'components/Terminal'
import fullscreen from 'components/Modals/FullscreenModal'

import styles from './index.scss'

@fullscreen
@observer
export default class ContainerTerminalModal extends React.Component {
  podStore = new PodStore()

  constructor(props) {
    super(props)

    const {
      containerName,
      podName,
      cluster,
      namespace,
    } = this.props.match.params

    this.state = {
      container: {
        name: containerName,
      },
    }

    this.store = new TerminalStore({
      cluster,
      namespace,
      pod: podName,
      container: containerName,
      shell: 'sh',
    })
  }

  componentDidMount() {
    const params = this.props.match.params
    const { cluster, namespace, podName, containerName } = params

    this.podStore
      .fetchDetail({
        cluster,
        namespace,
        name: podName,
      })
      .then(() => {
        const container = this.podStore.detail.containers.find(
          item => item.name === containerName
        )
        if (container) {
          this.setState({ container })
        }
      })
  }

  handleContainerChange = container => {
    this.setState({ container })
    this.store.kubectl.container = container.name
  }

  getResourceInfo = type => {
    const { resources = {} } = this.state.container || {}
    const resourceType = resources[type]

    return (
      resourceType &&
      Object.keys(resourceType)
        .map(key => `${key}: ${resourceType[key]}`)
        .join(' / ')
    )
  }

  render() {
    return (
      <div className={styles.kubectl}>
        <div className={styles.terminalWrapper}>
          <div className={classnames(styles.pane, styles.terminal)}>
            <ContainerTerminal url={this.store.kubeWebsocketUrl} />
          </div>
        </div>
        <div className={styles.tipWrapper}>{this.renderContainerMsg()}</div>
      </div>
    )
  }

  renderContainerMsg() {
    const { container: selectContainer } = this.state
    const defaultContainers = [
      {
        name: selectContainer.name,
        image: `${t('Loading')}`,
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
      description: `${t('Image')}: ${container.image}`,
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
          <h6>{t('Basic Information')}</h6>
          <dl>
            <dt>{t('Status')}</dt>
            <dd>{selectContainer.ready ? t('Running') : t('Updating')}</dd>
            <dt>{t('Image')}</dt>
            <dd>{selectContainer.image}</dd>
            <dt>{t('Command')}</dt>
            <dd>{isEmpty(command) ? '-' : command.join(' ')}</dd>
            <dt>{t('Resource Requests')}</dt>
            <dd>{this.getResourceInfo('requests')}</dd>
            <dt>{t('Resource Limits')}</dt>
            <dd>{this.getResourceInfo('limits')}</dd>
            <dt>{t('Restart Count')}</dt>
            <dd>{selectContainer.restartCount}</dd>
          </dl>
        </div>
      </Loading>
    )
  }
}
