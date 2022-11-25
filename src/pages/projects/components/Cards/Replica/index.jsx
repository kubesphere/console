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
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { get } from 'lodash'

import { Panel } from 'components/Base'
import ReplicaStatus from './Status'

import styles from './index.scss'

export default class HPACard extends React.Component {
  static propTypes = {
    module: PropTypes.string,
    detail: PropTypes.object,
    enableScale: PropTypes.bool,
    onScale: PropTypes.func,
  }

  static defaultProps = {
    module: 'deployments',
    enableScale: true,
    onScale() {},
  }

  get replicaStatus() {
    const { module, detail, enableScale } = this.props
    let status = {}

    switch (module) {
      default:
      case 'deployments': {
        status = {
          current: detail.availablePodNums || 0,
          desire: detail.podNums || 0,
        }
        break
      }
      case 'statefulsets': {
        status = {
          current: get(detail, 'status.currentReplicas', detail.readyPodNums),
          desire: detail.podNums || 0,
        }
        break
      }
      case 'daemonsets': {
        status = {
          current: get(detail, 'status.numberReady', 0),
          desire: get(detail, 'status.desiredNumberScheduled', 0),
        }
        break
      }
      case 'gateways': {
        status = {
          current: Array.isArray(detail.pods) ? detail.pods.length : 1,
          desire: get(detail, 'replicas', 0),
        }
      }
    }

    status.onScale = enableScale ? this.handleReplicaChange : null

    return status
  }

  handleReplicaChange = newReplicas => {
    if (newReplicas >= 0) {
      this.props.onScale(newReplicas)
    }
  }

  render() {
    const { className } = this.props

    return (
      <Panel className={classnames(styles.replica, className)}>
        <div className={styles.replicaCount}>
          <ReplicaStatus {...this.replicaStatus} />
        </div>
      </Panel>
    )
  }
}
