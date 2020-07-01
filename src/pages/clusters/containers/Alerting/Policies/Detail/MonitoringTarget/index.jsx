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
import { toJS } from 'mobx'
import { observer, inject } from 'mobx-react'
import { isEmpty } from 'lodash'

import ResourceStore from 'stores/alerting/resource'

import { Card } from 'components/Base'
import NodeItem from './NodeItem'
import WorkloadItem from './WorkloadItem'

import styles from './index.scss'

@inject('detailStore')
@observer
export default class MonitoringTarget extends React.Component {
  constructor(props) {
    super(props)

    this.store = props.detailStore
    this.resourceStore = props.resourceStore || new ResourceStore()
  }

  get module() {
    return this.props.module
  }

  get params() {
    return this.props.match.params
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = () => {
    const { resourceType, resourceFilter } = this.store.detail
    const data = {
      resourceType,
      resourceFilter,
      ...this.params,
    }
    this.resourceStore.fetchResources(data)
  }

  renderItem(type, item) {
    const { workspace, cluster, namespace } = this.params

    if (type === 'node') {
      return <NodeItem key={item.name} data={item} cluster={cluster} />
    }

    if (type === 'workload') {
      const { workloadKind } = this.store.detail
      const workloadType = `${workloadKind}s`

      return (
        <WorkloadItem
          key={item.name}
          prefix={`${
            workspace ? `/${workspace}` : ''
          }/clusters/${cluster}/projects/${namespace}/${workloadType}`}
          type={workloadType}
          data={item}
        />
      )
    }

    return null
  }

  render() {
    const { resourceType, data, isLoading } = this.resourceStore.resources
    const resources = toJS(data)

    return (
      <Card
        title={t('Monitoring Target')}
        loading={isLoading}
        isEmpty={isEmpty(resources)}
        empty={t('NOT_AVAILABLE', { resource: t('monitoring target') })}
      >
        <div className={styles.main}>
          {resources.map(item => this.renderItem(resourceType, item))}
        </div>
      </Card>
    )
  }
}
