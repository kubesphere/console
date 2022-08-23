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

import BaseTable from 'components/Tables/Base'
import EmptyList from 'components/Cards/EmptyList'
import withTableActions from 'components/HOCs/withTableActions'

import ClusterSelect from './ClusterSelect'

class ResourceTable extends React.Component {
  renderCustomFilter() {
    const { showClusterSelect, clusters, cluster, onClusterChange } = this.props

    if (!showClusterSelect) {
      return null
    }

    return (
      <ClusterSelect
        clusters={clusters}
        cluster={cluster}
        onChange={onClusterChange}
      />
    )
  }

  render() {
    const { clusters } = this.props
    if (globals.app.isMultiCluster && isEmpty(clusters)) {
      return (
        <EmptyList
          icon="cluster"
          title={t('NO_CLUSTER_AVAILABLE')}
          desc={t('WORKSPACE_NO_CLUSTER_TIP')}
        />
      )
    }

    return (
      <BaseTable customFilter={this.renderCustomFilter()} {...this.props} />
    )
  }
}

export default withTableActions(ResourceTable)
