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

import { Button } from '@kube-design/components'
import { Avatar, Panel, Text } from 'components/Base'
import Banner from 'components/Cards/Banner'
import Table from 'components/Tables/Base'
import { get } from 'lodash'
import { toJS } from 'mobx'
import { inject, observer } from 'mobx-react'
import React from 'react'

import WorkspaceStore from 'stores/workspace'
import { getLocalTime, showNameAndAlias } from 'utils'
import { trigger } from 'utils/action'

import styles from './index.scss'

@inject('rootStore', 'clusterStore')
@observer
@trigger
export default class Overview extends React.Component {
  workspaceStore = new WorkspaceStore()

  componentDidMount() {
    this.getData()
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
    ]
  }

  get clusterRules() {
    return get(globals, 'user.globalRules.clusters', [])
  }

  get columnSearch() {
    return [
      {
        dataIndex: 'name',
        title: t('NAME'),
        search: true,
      },
      {
        dataIndex: 'alias',
        title: t('ALIAS'),
        search: true,
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

    this.getData()
  }

  getColumns() {
    return [
      {
        title: t('WORKSPACE'),
        dataIndex: 'name',
        render: (name, record) => {
          return (
            <Avatar
              icon="enterprise"
              iconSize={40}
              title={showNameAndAlias(record)}
              desc={record.description || '-'}
              noLink
            />
          )
        },
      },
      {
        title: t('ADMINISTRATOR'),
        dataIndex: 'manager',
      },
      {
        title: t('AUTHORIZATION_TIME_TCAP'),
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
      desc: t('CLUSTER_VISIBILITY_DESC'),
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
          emptyProps={emptyProps}
          columns={this.getColumns()}
          columnSearch={this.columnSearch}
        />
      </div>
    )
  }

  render() {
    return (
      <>
        <Banner
          icon="cluster"
          title={t('CLUSTER_VISIBILITY')}
          description={t('CLUSTER_VISIBILITY_DESC')}
          tips={this.tips}
        />
        <Panel>
          <div className={styles.header}>
            <Text
              icon={this.isClusterPublicVisible ? 'eye' : 'eye-closed'}
              title={
                this.isClusterPublicVisible
                  ? t('VISIBILITY_PUBLIC')
                  : t('VISIBILITY_PARTIAL')
              }
              description={t('CLUSTER_VISIBILITY_SCAP')}
            />
            {globals.app.isMultiCluster &&
              this.enabledActions.includes('manage') && (
                <Button onClick={this.editVisibility}>
                  {t('EDIT_VISIBILITY')}
                </Button>
              )}
          </div>
          {this.renderVisibility()}
        </Panel>
      </>
    )
  }
}
