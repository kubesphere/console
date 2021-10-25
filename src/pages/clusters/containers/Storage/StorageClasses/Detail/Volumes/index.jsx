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
import VolumeStore from 'stores/volume'

import { Avatar, Card, Status } from 'components/Base'
import BaseTable from 'components/Tables/Base'

import styles from './index.scss'

@inject('detailStore')
@observer
export default class Volumes extends React.Component {
  constructor(props) {
    super(props)

    this.volumeStore = props.volumeStore || new VolumeStore()
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

    this.volumeStore.fetchList({
      storageClassName: name,
      cluster,
      ...params,
    })
  }

  getColumns = () => [
    {
      title: t('NAME'),
      dataIndex: 'name',
      render: (name, record) => (
        <Avatar icon="storage" title={getDisplayName(record)} noLink />
      ),
    },
    {
      title: t('STATUS'),
      dataIndex: 'phase',
      width: '13%',
      render: phase => (
        <Status type={phase} name={t(`VOLUME_STATUS_${phase.toUpperCase()}`)} />
      ),
    },
    {
      title: t('CAPACITY'),
      dataIndex: 'capacity',
      width: '13%',
      render: capacity => capacity || '-',
    },
    {
      title: t('MOUNT_STATUS'),
      dataIndex: 'inUse',
      width: '13%',
      render: inUse => (inUse ? t('MOUNTED') : t('NOT_MOUNTED')),
    },
    {
      title: t('PROJECT'),
      dataIndex: 'namespace',
      key: 'namespace',
      width: '13%',
      customizable: true,
    },
    {
      title: t('CREATION_TIME_TCAP'),
      dataIndex: 'createTime',
      width: '21%',
      render: time => getLocalTime(time).format('YYYY-MM-DD HH:mm:ss'),
    },
  ]

  render() {
    const {
      data,
      filters,
      isLoading,
      total,
      page,
      limit,
    } = this.volumeStore.list
    const pagination = { total, page, limit }

    return (
      <Card
        title={t('VOLUME_PL')}
        loading={isLoading}
        empty={t('NO_AVAILABLE_RESOURCE_VALUE', { resource: t('VOLUME') })}
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
      </Card>
    )
  }
}
