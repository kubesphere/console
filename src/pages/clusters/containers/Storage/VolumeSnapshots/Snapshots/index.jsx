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

import { Icon, Notify, Tooltip } from '@kube-design/components'
import ResourceTable from 'clusters/components/ResourceTable'
import { Avatar, Status } from 'components/Base'

import { ListPage, withClusterList } from 'components/HOCs/withList'
import { get, isEmpty } from 'lodash'
import React from 'react'
import VolumeStore from 'stores/volume'
import SnapshotStore from 'stores/volumeSnapshot'
import SnapshotClassStore from 'stores/volumeSnapshotClasses'
import { getLocalTime, showNameAndAlias } from 'utils'
import { VOLUME_SNAPSHOT_STATUS } from 'utils/constants'

import styles from './index.scss'

@withClusterList({
  store: new SnapshotStore(),
  module: 'volume-snapshots',
  name: 'VOLUME_SNAPSHOT',
  authKey: 'volumes',
})
export default class Snapshots extends React.Component {
  volumeStore = new VolumeStore()

  snapshotClass = new SnapshotClassStore()

  showApply = params => {
    const { cluster, namespace } = params
    return globals.app.hasPermission({
      module: 'volumes',
      action: 'create',
      project: namespace,
      cluster,
    })
  }

  showCreate = async () => {
    const { trigger, store, match } = this.props
    const { cluster, namespace } = match.params

    trigger('create.snapshot', {
      store,
      module: store.module,
      cluster,
      namespace,
      success: this.props.getData,
    })
  }

  checkSnapshotClassExist = async name => {
    const { cluster, namespace } = this.props.match.params
    await this.snapshotClass.fetchDetail({ name, cluster, namespace })
    return !isEmpty(this.snapshotClass.detail)
  }

  get itemActions() {
    const { trigger, routing, name } = this.props

    return [
      {
        key: 'apply',
        icon: 'copy',
        text: t('CREATE_VOLUME'),
        show: item => {
          return (
            this.showApply(item) &&
            item.backupStatus === 'success' &&
            isEmpty(item.error)
          )
        },
        onClick: async item => {
          const { cluster, namespace, snapshotClassName } = item
          const exist = await this.checkSnapshotClassExist(snapshotClassName)
          if (!exist) {
            Notify.error({
              title: t('SNAPSHOT_CLASS_NOT_EXIST_TITLE'),
              content: t('SNAPSHOT_CLASS_NOT_EXIST'),
            })
            return
          }
          const storageClassName = get(
            item,
            '_originData.spec.source.persistentVolumeClaimName'
          )
          await this.volumeStore.fetchDetail({
            cluster,
            name: storageClassName,
            namespace,
          })
          trigger('volume.create', {
            fromSnapshot: true,
            module: 'persistentvolumeclaims',
            cluster,
            namespace,
            store: new VolumeStore(),
            noCodeEdit: true,
            extendformTemplate: {
              spec: {
                resources: {
                  requests: {
                    storage: get(item, 'restoreSize'),
                  },
                },
                storageClassName: get(
                  this.volumeStore,
                  'detail.storageClassName'
                ),
                dataSource: {
                  name: get(item, 'name'),
                  kind: 'VolumeSnapshot',
                  apiGroup: 'snapshot.storage.k8s.io',
                },
              },
            },
          })
        },
      },
      {
        key: 'delete',
        icon: 'trash',
        text: t('DELETE'),
        action: 'delete',
        show: item => {
          return !(item.backupStatus === 'deleting')
        },
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
    return VOLUME_SNAPSHOT_STATUS.map(status => ({
      text: t(status.text),
      value: status.value,
    }))
  }

  getColumns() {
    const { getSortOrder, getFilteredValue, module } = this.props
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
            to={`/clusters/${cluster}/projects/${record.namespace}/${module}/${name}`}
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
    const { match, tableProps } = this.props

    return (
      <ListPage {...this.props} noWatch>
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
