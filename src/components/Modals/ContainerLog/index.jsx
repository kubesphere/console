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

import { get } from 'lodash'
import { Modal, Card, Empty } from 'components/Base'

import LogStore from 'stores/logging/query'
import LogCard from 'components/Cards/LogQuery'
import ContainerLog from 'components/Cards/ContainerLog'

import styles from './index.scss'

export default class ContainerLogModal extends React.Component {
  constructor(props) {
    super(props)

    if (this.isLogEnabled) {
      const { namespace: namespaces, name: containers } = props.container
      const { podName: pods } = props

      this.logStore = new LogStore({
        pods,
        pathParams: {
          namespaces,
        },
        containers,
        size: 50,
        end_time: Date.now(),
      })
    }
  }

  get isLogEnabled() {
    return globals.app.hasKSModule('logging')
  }

  renderContent() {
    const { namespace, name } = this.props.container
    const { podName } = this.props

    if (!get(this.props, 'container.containerID')) {
      return (
        <Card>
          <Empty desc={'CONTAINER_REAL_TIME_LOGS_UNSUPPORTED_TIPS'} />
        </Card>
      )
    }

    if (!this.isLogEnabled) {
      return (
        <ContainerLog
          className={styles.containerLog}
          contentClassName={styles.containerLogContent}
          namespace={namespace}
          podName={podName}
          containerName={name}
        />
      )
    }

    return <LogCard className={styles.logCard} store={this.logStore} realTime />
  }

  render() {
    const { visible, onCancel } = this.props

    return (
      <Modal
        bodyClassName={styles.body}
        title={t('Container Logs')}
        visible={visible}
        onCancel={onCancel}
        fullScreen
        hideFooter
      >
        {this.renderContent()}
      </Modal>
    )
  }
}
