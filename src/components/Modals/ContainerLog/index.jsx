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

import ContainerLog from 'components/Cards/ContainerLog'
import { Consumer } from 'clusters/containers/Gateway/Detail/ResourceStatus/context'

import styles from './index.scss'

export default class ContainerLogModal extends React.Component {
  renderContent() {
    const { namespace, name } = this.props.container
    const { cluster, podName } = this.props

    if (!get(this.props, 'container.containerID')) {
      return (
        <Card>
          <Empty desc={'CONTAINER_LOGS_NOT_SUPPORTED'} />
        </Card>
      )
    }

    return (
      <Consumer>
        {({ gatewayName, gatewayNs }) => (
          <ContainerLog
            className={styles.containerLog}
            contentClassName={styles.containerLogContent}
            namespace={namespace}
            podName={podName}
            cluster={cluster}
            containerName={name}
            gatewayName={gatewayName}
            gatewayNamespace={gatewayNs}
          />
        )}
      </Consumer>
    )
  }

  render() {
    const { visible, onCancel } = this.props

    return (
      <Modal
        bodyClassName={styles.body}
        title={t('CONTAINER_LOGS')}
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
