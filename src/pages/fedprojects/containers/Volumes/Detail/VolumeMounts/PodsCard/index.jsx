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

import React, { Component } from 'react'
import { Panel } from 'components/Base'
import PodsCard from 'components/Cards/Pods'
import ClusterTitle from 'components/Clusters/ClusterTitle'

import styles from './index.scss'

export default class PodsCardWrapper extends Component {
  get prefix() {
    return `/${this.props.match.params.workspace}`
  }

  render() {
    const { cluster } = this.props
    const { namespace, workspace, name } = this.props.match.params
    const detail = {
      kind: 'PVC',
      cluster: cluster.name,
      namespace,
      workspace,
      name,
    }

    return (
      <Panel>
        <div className={styles.cluster}>
          <ClusterTitle
            cluster={cluster}
            theme="light"
            tagClass="float-right"
          />
        </div>
        <div className={styles.content}>
          <PodsCard
            detail={detail}
            prefix={this.prefix}
            hideHeader
            hideFooter
            noWrapper
          />
        </div>
      </Panel>
    )
  }
}
