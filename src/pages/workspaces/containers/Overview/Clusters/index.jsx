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
import { isEmpty } from 'lodash'
import { toJS } from 'mobx'
import { observer, inject } from 'mobx-react'
import EmptyList from 'components/Cards/EmptyList'

import ClusterMonitorStore from 'stores/monitoring/cluster'

import Card from './Card'

@inject('rootStore', 'workspaceStore')
@observer
class BaseInfo extends React.Component {
  monitorStore = new ClusterMonitorStore()

  state = {
    confirm: false,
    workspaces: {},
  }

  get store() {
    return this.props.workspaceStore
  }

  get module() {
    return 'BaseInfo'
  }

  get routing() {
    return this.props.rootStore.routing
  }

  get workspace() {
    return this.props.match.params.workspace
  }

  render() {
    if (!globals.app.isMultiCluster) {
      return null
    }

    const { data, isLoading } = toJS(this.store.clusters)
    if (isEmpty(data) && !isLoading) {
      return (
        <EmptyList
          icon="cluster"
          title={t('NO_CLUSTER_AVAILABLE')}
          desc={t('WORKSPACE_NO_CLUSTER_TIP')}
        />
      )
    }

    return data.map(cluster => <Card key={cluster.name} cluster={cluster} />)
  }
}

export default BaseInfo
