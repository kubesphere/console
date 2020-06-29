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
import { isEmpty } from 'lodash'
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import { Checkbox } from '@pitrix/lego-ui'
import { Alert } from 'components/Base'
import ClusterTitle from 'components/Clusters/ClusterTitle'

import ClusterStore from 'stores/cluster'

import styles from './index.scss'

@observer
export default class ClusterSettings extends Component {
  clusterStore = new ClusterStore()

  componentDidMount() {
    this.fetchData()
  }

  async fetchData() {
    if (globals.app.hasPermission({ module: 'clusters', action: 'manage' })) {
      await this.clusterStore.fetchList({
        limit: -1,
      })
    } else {
      await this.clusterStore.fetchList({
        limit: -1,
        labelSelector: 'cluster.kubesphere.io/visibility=public',
      })
    }

    const { value, onChange } = this.props
    if (isEmpty(value)) {
      onChange(
        this.clusterStore.list.data
          .filter(item => item.visibility === 'public')
          .map(item => ({ name: item.name }))
      )
    }
  }

  handleClick = e => {
    const { value = [], onChange } = this.props
    let newValue

    const name = e.currentTarget.dataset.cluster

    if (value.some(item => item.name === name)) {
      newValue = value.filter(item => item.name !== name)
    } else {
      newValue = [...value, { name }]
    }
    onChange(newValue)
  }

  handleCheckboxClick = e => e.stopPropagation()

  render() {
    const { value = [] } = this.props
    const { data, isLoading } = toJS(this.clusterStore.list)

    if (isEmpty(data) && !isLoading) {
      return <Alert type="warning" message={t('NO_PUBLIC_CLUSTER_TIP')} />
    }

    return (
      <div className={styles.wrapper}>
        {data.map(cluster => (
          <div
            key={cluster.name}
            className={classNames(styles.item, {
              [styles.disabled]: !globals.app.isMultiCluster,
            })}
            data-cluster={cluster.name}
            onClick={globals.app.isMultiCluster ? this.handleClick : null}
          >
            <Checkbox
              checked={value.some(item => item.name === cluster.name)}
              disabled={!globals.app.isMultiCluster}
              onClick={this.handleCheckboxClick}
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
