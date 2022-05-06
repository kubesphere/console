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

import { withClusterList, ListPage } from 'components/HOCs/withList'
import { VOLUME_SNAPSHOT_CLASS_STATUS } from 'utils/constants'
import Table from 'components/Tables/List'
import { Avatar, Status } from 'components/Base'
import SnapshotContentStore from 'stores/volumeSnapshotContent'
import { isEmpty } from 'lodash'
import { getLocalTime, memoryFormat } from 'utils'

@withClusterList({
  store: new SnapshotContentStore(),
  module: 'volume-snapshot-content',
  name: 'VOLUME_SNAPSHOT_CONTENT',
  authKey: 'volumes',
})
export default class VolumeSnapshotContent extends React.Component {
  get itemActions() {
    const { trigger, routing, name, store, match } = this.props
    const { cluster } = match.params
    return [
      {
        key: 'edit',
        icon: 'pen',
        text: t('EDIT_INFORMATION'),
        onClick: item => {
          trigger('volume.snapshotContent.baseInfo.edit', {
            store,
            cluster,
            detail: item,
            success: routing.query,
          })
        },
      },
      {
        key: 'view',
        icon: 'eye',
        text: t('VIEW_YAML'),
        onClick: async item => {
          const data = await store.fetchDetail({ name: item.name, cluster })
          trigger('resource.yaml.edit', {
            readOnly: true,
            detail: item,
            yaml: data._originData,
          })
        },
      },
      {
        key: 'delete',
        icon: 'trash',
        text: t('DELETE'),
        action: 'delete',
        onClick: item =>
          trigger('resource.delete', {
            type: name,
            detail: item,
            success: routing.query,
          }),
      },
    ]
  }

  getStatus() {
    return VOLUME_SNAPSHOT_CLASS_STATUS.map(status => ({
      text: t(status.text),
      value: status.value,
    }))
  }

  getColumns() {
    const { getSortOrder, getFilteredValue } = this.props
    const { cluster } = this.props.match.params

    return [
      {
        title: t('NAME'),
        dataIndex: 'name',
        sortOrder: getSortOrder('name'),
        search: true,
        sorter: true,
        render: (name, record) => (
          <Avatar
            icon={'snapshot'}
            iconSize={40}
            to={`/clusters/${cluster}/volume-snapshot-content/${name}`}
            title={name}
            desc={record.snapshotClassName}
          />
        ),
      },
      {
        title: t('STATUS'),
        dataIndex: 'readyToUse',
        isHideable: true,
        filters: this.getStatus(),
        filteredValue: getFilteredValue('readyToUse'),
        search: true,
        render: (_, record) => {
          const { errorMessage, status } = record
          return (
            <div>
              <Status type={status} name={t(status.toUpperCase())} />{' '}
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
        title: t('CAPACITY'),
        dataIndex: 'restoreSize',
        isHideable: true,
        width: '7%',
        render: restoreSize => `${memoryFormat(restoreSize, 'Gi')}Gi`,
      },
      {
        title: t('VOLUME_SNAPSHOT_CLASS'),
        dataIndex: 'snapshotClassName',
        isHideable: true,
        width: '14%',
        render: snapshotClassName => snapshotClassName || '-',
      },
      {
        title: t('DELETION_POLICY'),
        dataIndex: 'deletionPolicy',
        isHideable: true,
        width: '9.86%',
        render: deletionPolicy => deletionPolicy || '-',
      },
      {
        title: t('CREATION_TIME_TCAP'),
        dataIndex: 'createTime',
        isHideable: true,
        sorter: true,
        sortOrder: getSortOrder('createTime'),
        width: '12.33%',
        render: time =>
          time ? getLocalTime(time).format('YYYY-MM-DD HH:mm:ss') : '-',
      },
    ]
  }

  render() {
    const { match, tableProps } = this.props
    return (
      <ListPage {...this.props} noWatch>
        <Table
          {...tableProps}
          itemActions={this.itemActions}
          columns={this.getColumns()}
          cluster={match.params.cluster}
        ></Table>
      </ListPage>
    )
  }
}
