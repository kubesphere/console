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
 *
 * along with KubeSphere Console.  If not, see <https://www.gnu.org/licenses/>.
 */

import React from 'react'
import { isEmpty } from 'lodash'
import { VOLUME_SNAPSHOT_STATUS } from 'utils/constants'

import { withClusterList, ListPage } from 'components/HOCs/withList'
import ResourceTable from 'clusters/components/ResourceTable'
import SnapshotStore from 'stores/volumeSnapshot'
import { getLocalTime } from 'utils'
import { Avatar, Status } from 'components/Base'

import Banner from 'components/Cards/Banner'
import { Icon, Tooltip } from '@kube-design/components'

import styles from './index.scss'

@withClusterList({
  store: new SnapshotStore(),
  module: 'volume-snapshots',
  name: 'VolumeSnapshot',
  authKey: 'volumes',
})
export default class VolumeSnapshot extends React.Component {
  getStatus() {
    return VOLUME_SNAPSHOT_STATUS.map(status => ({
      text: t(status.text),
      value: status.value,
    }))
  }

  get itemActions() {
    const { trigger, routing, name } = this.props

    return [
      {
        key: 'delete',
        icon: 'trash',
        text: t('Delete'),
        action: 'delete',
        onClick: item =>
          trigger('resource.delete', {
            type: t(name),
            detail: item,
            success: routing.query,
          }),
      },
    ]
  }

  getColumns() {
    const { getSortOrder, getFilteredValue, module } = this.props
    const { cluster } = this.props.match.params

    return [
      {
        title: t('Name'),
        dataIndex: 'name',
        sortOrder: getSortOrder('name'),
        search: true,
        sorter: true,
        render: (name, record) => (
          <Avatar
            icon={'snapshot'}
            iconSize={40}
            to={`/clusters/${cluster}/projects/${record.namespace}/${module}/${name}`}
            title={name}
            desc={record.snapshotClassName}
          />
        ),
      },
      {
        title: t('Status'),
        dataIndex: 'status',
        isHideable: true,
        filters: this.getStatus(),
        filteredValue: getFilteredValue('status'),
        search: true,
        render: (_, record) => {
          const { errorMessage, backupStatus } = record

          return (
            <div className={styles.status}>
              <Status
                type={backupStatus}
                name={t(`CREATE_STATUS_${backupStatus.toUpperCase()}`)}
              />{' '}
              {!isEmpty(errorMessage) && (
                <Tooltip content={errorMessage}>
                  <Icon name={'question'} />
                </Tooltip>
              )}
            </div>
          )
        },
      },
      {
        title: t('Project'),
        dataIndex: 'namespace',
        isHideable: true,
        render: namespace => <div>{namespace}</div>,
      },
      {
        title: t('Capacity'),
        dataIndex: 'restoreSize',
        isHideable: true,
        width: '20%',
        render: restoreSize => restoreSize || '-',
      },
      {
        title: t('Created Time'),
        dataIndex: 'createTime',
        isHideable: true,
        sorter: true,
        sortOrder: getSortOrder('createTime'),
        width: '20%',
        render: time =>
          time ? getLocalTime(time).format('YYYY-MM-DD HH:mm:ss') : '-',
      },
    ]
  }

  render() {
    const { match, bannerProps, tableProps } = this.props

    return (
      <ListPage {...this.props} noWatch>
        <Banner {...bannerProps} tabs={this.tabs} />
        <ResourceTable
          {...tableProps}
          itemActions={this.itemActions}
          columns={this.getColumns()}
          onCreate={this.showCreate}
          cluster={match.params.cluster}
        />
      </ListPage>
    )
  }
}
