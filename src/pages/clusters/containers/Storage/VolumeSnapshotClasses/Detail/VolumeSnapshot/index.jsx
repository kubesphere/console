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

import { getLocalTime, getDisplayName } from 'utils'
import VolumeSnapshotStore from 'stores/volumeSnapshot'

import { Avatar, Panel, Status } from 'components/Base'
import BaseTable from 'components/Tables/Base'

import styles from './index.scss'

@inject('detailStore')
@observer
export default class VolumeSnapshot extends React.Component {
  constructor(props) {
    super(props)

    this.volumeSnapshotStore =
      props.volumeSnapshotStore || new VolumeSnapshotStore()
  }

  get store() {
    return this.props.detailStore
  }

  get storageClassName() {
    return this.store.detail.name
  }

  componentDidMount() {
    this.handleFetch()
  }

  handleFetch = (params = {}) => {
    const { cluster, name } = this.store.detail
    if (params.keyword) {
      params.name = params.keyword
      delete params.keyword
    }

    this.volumeSnapshotStore.fetchList({
      volumeSnapshotClassName: name,
      cluster,
      ...params,
    })
  }

  getColumns = () => {
    return [
      {
        title: t('NAME'),
        dataIndex: 'name',
        render: (name, record) => (
          <Avatar
            icon="snapshot"
            iconSize={40}
            title={getDisplayName(record)}
            to={`/clusters/${record.cluster}/projects/${record.namespace}/volume-snapshots/${name}`}
            desc={record.snapshotClassName}
            noLink
          />
        ),
      },
      {
        title: t('STATUS'),
        dataIndex: 'backupStatus',
        width: '20.5%',
        render: (backupStatus, _) => (
          <Status
            type={_.readyToUse ? 'ready' : 'failed'}
            name={_.readyToUse ? t('READY') : t('UNREADY')}
          />
        ),
      },
      {
        title: t('CAPACITY'),
        dataIndex: 'restoreSize',
        width: '20.5%',
        render: restoreSize => restoreSize,
      },
      {
        title: t('CREATION_TIME_TCAP'),
        dataIndex: 'createTime',
        width: '20.5%',
        render: time => getLocalTime(time).format('YYYY-MM-DD HH:mm:ss'),
      },
    ]
  }

  render() {
    const {
      data,
      filters,
      isLoading,
      total,
      page,
      limit,
    } = this.volumeSnapshotStore.list
    const pagination = { total, page, limit }

    return (
      <Panel
        title={t('VOLUME_SNAPSHOT_PL')}
        loading={isLoading}
        empty={t('NO_AVAILABLE_RESOURCE_VALUE', {
          resource: t('VOLUME_SNAPSHOT'),
        })}
        className={styles.noPadding}
      >
        <BaseTable
          className={styles.table}
          data={data}
          columns={this.getColumns()}
          searchType="name"
          keyword={filters.name}
          filters={filters}
          placeholder={t('SEARCH_BY_NAME')}
          pagination={pagination}
          isLoading={isLoading}
          onFetch={this.handleFetch}
        />
      </Panel>
    )
  }
}
