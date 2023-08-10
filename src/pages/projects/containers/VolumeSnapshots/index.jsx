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

import { Icon, Tooltip } from '@kube-design/components'
import { Avatar, Status } from 'components/Base'

import Banner from 'components/Cards/Banner'

import { ListPage, withProjectList } from 'components/HOCs/withList'
import Table from 'components/Tables/List'
import { isEmpty } from 'lodash'
import React from 'react'
import SnapshotStore from 'stores/volumeSnapshot'
import { getLocalTime, showNameAndAlias } from 'utils'
import { VOLUME_SNAPSHOT_STATUS } from 'utils/constants'

import styles from './index.scss'

@withProjectList({
  store: new SnapshotStore(),
  module: 'volume-snapshots',
  name: 'VOLUME_SNAPSHOT',
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

  getColumns() {
    const { getSortOrder } = this.props

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
            to={`${this.props.match.url}/${name}`}
            title={name}
            desc={record.snapshotClassName}
          />
        ),
      },
      {
        title: t('STATUS'),
        dataIndex: 'status',
        isHideable: true,
        filters: this.getStatus(),
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
        title: t('PROJECT'),
        dataIndex: 'namespace',
        isHideable: true,
        render: namespace => (
          <div>{showNameAndAlias(namespace, 'project')}</div>
        ),
      },
      {
        title: t('CAPACITY'),
        dataIndex: 'restoreSize',
        isHideable: true,
        width: '20%',
        render: restoreSize => restoreSize || '-',
      },
      {
        title: t('CREATION_TIME_TCAP'),
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
    const { bannerProps, tableProps } = this.props

    return (
      <ListPage {...this.props} noWatch>
        <Banner {...bannerProps} tabs={this.tabs} />
        <Table
          {...tableProps}
          itemActions={this.itemActions}
          columns={this.getColumns()}
          onCreate={this.showCreate}
        />
      </ListPage>
    )
  }
}
