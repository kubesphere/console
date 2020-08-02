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
import Banner from 'components/Cards/Banner'
import { Alert, Avatar, Button, Panel, Text } from 'components/Base'
import Table from 'components/Tables/Base'
import { getLocalTime, getDisplayName } from 'utils'
import { trigger } from 'utils/action'

import WorkspaceStore from 'stores/workspace'

import styles from './index.scss'

@inject('rootStore', 'clusterStore')
@observer
@trigger
export default class Overview extends React.Component {
  workspaceStore = new WorkspaceStore()

  componentDidMount() {
    if (!this.isClusterPublicVisible) {
      this.getData()
    }
  }

  get cluster() {
    return this.props.clusterStore
  }

  get isClusterPublicVisible() {
    return this.cluster.detail.visibility === 'public'
  }

  get enabledActions() {
    return globals.app.getActions({
      module: 'cluster-settings',
      cluster: this.props.match.params.cluster,
    })
  }

  get tips() {
    return [
      {
        title: t('CLUSTER_VISIBILITY_Q1'),
        description: t('CLUSTER_VISIBILITY_A1'),
      },
      {
        title: t('CLUSTER_VISIBILITY_Q2'),
        description: t('CLUSTER_VISIBILITY_A2'),
      },
    ]
  }

  getData = params => {
    this.workspaceStore.fetchList({
      ...this.props.match.params,
      ...params,
      labelSelector: 'kubefed.io/managed=true',
    })
  }

  afterEdit = async () => {
    const { cluster } = this.props.match.params
    await this.cluster.fetchDetail({ name: cluster })
    if (!this.isClusterPublicVisible) {
      this.getData()
    }
  }

  getColumns() {
    return [
      {
        title: t('Workspace'),
        dataIndex: 'name',
        render: (name, record) => (
          <Avatar
            icon="enterprise"
            iconSize={40}
            title={getDisplayName(record)}
            desc={record.description || '-'}
            noLink
          />
        ),
      },
      {
        title: t('Manager'),
        dataIndex: 'manager',
      },
      {
        title: t('Created Time'),
        dataIndex: 'createTime',
        width: '20%',
        render: time => getLocalTime(time).format('YYYY-MM-DD HH:mm:ss'),
      },
    ]
  }

  editVisibility = () =>
    this.trigger('cluster.visibility.edit', {
      store: this.cluster,
      cluster: this.cluster.detail,
      success: this.afterEdit,
    })

  renderVisibility() {
    if (this.isClusterPublicVisible) {
      return (
        <Alert
          className="margin-t12"
          title={t('The current cluster is public')}
          message={t('PUBLIC_CLUSTER_DESC')}
        />
      )
    }

    const {
      data,
      total,
      page,
      limit,
      filters,
      keyword,
      isLoading,
    } = this.workspaceStore.list

    const pagination = { total, page, limit }

    const emptyProps = {
      name: 'Workspace',
      module: 'workspaces',
      desc: t('CLUSTER_AUTHORIZATION_DESC'),
    }

    return (
      <div className={styles.tableWrapper}>
        <Table
          data={toJS(data)}
          filters={filters}
          keyword={keyword}
          pagination={pagination}
          isLoading={isLoading}
          onFetch={this.getData}
          searchType="name"
          emptyProps={emptyProps}
          columns={this.getColumns()}
        />
      </div>
    )
  }

  render() {
    return (
      <>
        <Banner
          icon="cluster"
          title={t('Cluster Visibility')}
          description={t('CLUSTER_AUTHORIZATION_DESC')}
          tips={this.tips}
        />
        <Panel>
          <div className={styles.header}>
            <Text
              icon={this.isClusterPublicVisible ? 'eye' : 'eye-closed'}
              title={
                this.isClusterPublicVisible
                  ? t('VISIBILITY_PUBLIC')
                  : t('VISIBILITY_PART')
              }
              description={t('Cluster Visibility')}
            />
            {globals.app.isMultiCluster &&
              this.enabledActions.includes('edit') && (
                <Button onClick={this.editVisibility}>
                  {t('Edit Visibility')}
                </Button>
              )}
          </div>
          {this.renderVisibility()}
        </Panel>
      </>
    )
  }
}
