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
import { observer, inject } from 'mobx-react'
import Banner from 'components/Cards/Banner'
import { Alert, Avatar, Button, Panel, Text } from 'components/Base'
import Table from 'components/Tables/Base'
import { getLocalTime, getDisplayName } from 'utils'
import { trigger } from 'utils/action'

import styles from './index.scss'

@inject('clusterStore')
@observer
@trigger
export default class Overview extends React.Component {
  get cluster() {
    return this.props.clusterStore
  }

  get tips() {
    return [
      {
        title: t('如何将集群授权给指定的企业空间使用？'),
        description: '',
      },
      {
        title: t('什么是公开集群?'),
        description: '',
      },
    ]
  }

  getColumns() {
    return [
      {
        title: t('Name'),
        dataIndex: 'name',
        render: (name, record) => (
          <Avatar
            icon="enterprise"
            iconSize={40}
            title={getDisplayName(record)}
            desc={record.description || '-'}
            to={`/workspaces/${name}`}
          />
        ),
      },
      {
        title: t('Created Time'),
        dataIndex: 'createTime',
        width: 150,
        render: time => getLocalTime(time).format('YYYY-MM-DD HH:mm:ss'),
      },
    ]
  }

  editVisibility = this.trigger('cluster.visibility.edit', {})

  renderVisibility() {
    if (this.cluster.visibility === 'public') {
      return (
        <Alert
          className="margin-t12"
          title={'当前集群处于公开状态'}
          message={
            '公开状态的集群意味着平台内的用户都可以使用该集群，并在集群中创建和调度资源'
          }
        />
      )
    }

    return (
      <div className={styles.tableWrapper}>
        <Table
          data={[]}
          pagination={{
            total: 0,
            page: 1,
            limit: 10,
          }}
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
          description="集群授权可以将集群通过授权的形式指定给企业空间使用该集群"
          tips={this.tips}
        />
        <Panel>
          <div className={styles.header}>
            <Text
              icon={this.cluster.visibility === 'public' ? 'eye' : 'eye-closed'}
              title={
                this.cluster.visibility === 'public'
                  ? t('VISIBILITY_PUBLIC')
                  : t('VISIBILITY_PART')
              }
              description={t('Cluster Visibility')}
            />
            <Button onClick={this.editVisibility}>
              {t('Edit Visibility')}
            </Button>
          </div>
          {this.renderVisibility()}
        </Panel>
      </>
    )
  }
}
