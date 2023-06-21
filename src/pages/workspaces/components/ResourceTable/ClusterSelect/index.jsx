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
import { Select } from '@kube-design/components'
import StatusReason from 'clusters/components/StatusReason'
import { showNameAndAlias } from 'utils'

import styles from './index.scss'

export default class ClusterSelect extends Component {
  valueRenderer = option =>
    t('CLUSTER_VALUE', { value: showNameAndAlias(option.cluster) })

  optionRenderer = option => (
    <div>
      <div>{showNameAndAlias(option.cluster)}</div>
      {!option.cluster.isReady && (
        <div>
          <StatusReason data={option.cluster} noTip />
        </div>
      )}
    </div>
  )

  render() {
    const { cluster, clusters, onChange } = this.props

    return (
      <Select
        className={styles.select}
        value={cluster}
        onChange={onChange}
        options={clusters}
        valueRenderer={this.valueRenderer}
        optionRenderer={this.optionRenderer}
      />
    )
  }
}
