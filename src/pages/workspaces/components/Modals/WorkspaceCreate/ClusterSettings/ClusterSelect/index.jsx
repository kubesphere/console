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
import classNames from 'classnames'
import { observer } from 'mobx-react'
import { Checkbox } from '@pitrix/lego-ui'
import ClusterTitle from 'components/ClusterTitle'

import ClusterStore from 'stores/cluster'

import styles from './index.scss'

@observer
export default class ClusterSettings extends Component {
  clusterStore = new ClusterStore()

  componentDidMount() {
    this.clusterStore
      .fetchList({
        limit: -1,
        label: 'cluster.kubesphere.io/visibility=public',
      })
      .then(() => {
        this.props.onChange(this.clusterStore.list.data.map(item => item.name))
      })
  }

  handleClick = e => {
    const { value = [], onChange } = this.props
    let newValue

    const name = e.currentTarget.dataset.cluster

    if (value.includes(name)) {
      newValue = value.filter(item => item !== name)
    } else {
      newValue = [...value, name]
    }
    onChange(newValue)
  }

  render() {
    const { value = [] } = this.props
    return (
      <div className={styles.wrapper}>
        {this.clusterStore.list.data.map(cluster => (
          <div
            key={cluster.name}
            className={classNames(styles.item, {
              [styles.disabled]: !globals.app.isMultiCluster,
            })}
            data-cluster={cluster.name}
            onClick={globals.app.isMultiCluster ? this.handleClick : null}
          >
            <Checkbox
              checked={value.includes(cluster.name)}
              disabled={!globals.app.isMultiCluster}
            />
            <ClusterTitle
              className={styles.cluster}
              tagClass="float-right"
              cluster={cluster}
              noStatus
            />
          </div>
        ))}
      </div>
    )
  }
}
