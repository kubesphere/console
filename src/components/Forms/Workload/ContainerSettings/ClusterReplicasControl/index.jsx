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
import { get, set } from 'lodash'
import PropTypes from 'prop-types'

import Placement from './Placement'

import styles from './index.scss'

export default class ReplicasContorl extends React.Component {
  static propTypes = {
    template: PropTypes.object,
    value: PropTypes.array,
  }

  static defaultProps = {
    value: [],
  }

  handleChange = (name, newReplicas) => {
    const overrides = get(this.props.template, 'spec.overrides', [])
    let od = overrides.find(item => item.clusterName === name)
    if (!od) {
      od = { clusterName: name, clusterOverrides: [] }
      overrides.push(od)
    }

    od.clusterOverrides = od.clusterOverrides || []
    const cod = od.clusterOverrides.find(item => item.path === '/spec/replicas')
    if (cod) {
      cod.value = newReplicas
    } else {
      od.clusterOverrides.push({ path: '/spec/replicas', value: newReplicas })
    }

    set(this.props.template, 'spec.overrides', overrides)
  }

  getValue = name => {
    const overrides = get(this.props.template, 'spec.overrides', [])
    const replicas = get(this.props.template, 'spec.template.spec.replicas', 0)

    let cod
    overrides.forEach(od => {
      if (od.clusterName === name) {
        if (od.clusterOverrides) {
          cod = od.clusterOverrides.find(item => item.path === '/spec/replicas')
        }
      }
    })

    return cod ? cod.value : replicas
  }

  render() {
    const { clusters } = this.props
    return (
      <div className={styles.wrapper}>
        {clusters.map(cluster => (
          <Placement
            key={cluster.name}
            cluster={cluster.name}
            replicas={this.getValue(cluster.name)}
            onChange={this.handleChange}
          />
        ))}
      </div>
    )
  }
}
