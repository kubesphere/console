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
import { toJS, computed, get } from 'mobx'
import { inject, observer } from 'mobx-react'

import { getLocalTime, getDisplayName } from 'utils'
import Table from 'workspaces/components/ResourceTable'

import { Avatar, Card } from 'components/Base'
import DevOpsStore from 'stores/devops'

import styles from './index.scss'

@inject('detailStore', 'workspaceStore')
@observer
export default class MemberDevOpsProjects extends React.Component {
  devopsStore = new DevOpsStore()

  componentDidMount() {
    this.workspaceStore
      .fetchClusters({
        workspace: this.workspace,
        limit: -1,
      })
      .then(() => {
        this.devopsStore.fetchList({
          cluster: this.cluster,
          workspace: this.workspace,
        })
      })
  }

  get workspaceStore() {
    return this.props.workspaceStore
  }

  get workspace() {
    return this.props.match.params.workspace
  }

  get clusters() {
    return this.workspaceStore.clusters.data.map(item => ({
      label: item.name,
      value: item.name,
    }))
  }

  @computed
  get cluster() {
    return this.hostCluster
  }

  @computed
  get hostCluster() {
    if (this.clusters.length < 1) {
      return ''
    }

    return get(
      this.workspaceStore.clusters.data.find(cluster => cluster.isHost) ||
        this.workspaceStore.clusters.data[0],
      'name'
    )
  }

  getColumns = () => [
    {
      title: t('Name'),
      dataIndex: 'name',
      width: '33%',
      render: (name, record) => (
        <Avatar
          to={`/${this.workspace}/clusters/${record.cluster}/devops/${
            record.namespace
          }`}
          icon="project"
          title={getDisplayName(record)}
        />
      ),
    },
    {
      title: t('Created Time'),
      dataIndex: 'createTime',
      width: '33%',
      render: createTime => (
        <p>{getLocalTime(createTime).format('YYYY-MM-DD HH:mm:ss')}</p>
      ),
    },
  ]

  render() {
    const { data, isLoading } = toJS(this.devopsStore.list)
    return (
      <Card title={t('DevOps Projects')}>
        <Table
          hideSearch
          hideCustom
          className={styles.table}
          data={data}
          columns={this.getColumns()}
          loading={isLoading}
          cluster={this.cluster}
          clusters={this.clusters}
          name="devops"
        />
      </Card>
    )
  }
}
