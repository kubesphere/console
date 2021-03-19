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
import { get, isEmpty } from 'lodash'
import { getLocalTime, getDisplayName } from 'utils'
import { Avatar, Status } from 'components/Base'
import { withProjectList, ListPage } from 'components/HOCs/withList'
import Banner from 'components/Cards/Banner'
import Table from 'components/Tables/List'
import StatusReason from 'projects/components/StatusReason'
import ClusterWrapper from 'components/Clusters/ClusterWrapper'

import FederatedStore from 'stores/federated'
import VolumeStore from 'stores/volume'

import { getVolumeStatus } from 'utils/status'

import styles from './index.scss'

@withProjectList({
  store: new FederatedStore(new VolumeStore()),
  module: 'persistentvolumeclaims',
  authKey: 'volumes',
  name: 'Volume',
  rowKey: 'uid',
})
export default class Volumes extends React.Component {
  get tips() {
    return [
      {
        title: t('WHAT_IS_STORAGE_CLASS_Q'),
        description: t('WHAT_IS_STORAGE_CLASS_A'),
      },
      {
        title: t('WHAT_IS_LOCAL_VOLUME_Q'),
        description: t('WHAT_IS_LOCAL_VOLUME_A'),
      },
    ]
  }

  get itemActions() {
    const { trigger, name } = this.props

    return [
      {
        key: 'edit',
        icon: 'pen',
        text: t('Edit'),
        action: 'edit',
        onClick: item =>
          trigger('resource.baseinfo.edit', {
            detail: item,
          }),
      },
      {
        key: 'editYaml',
        icon: 'pen',
        text: t('Edit YAML'),
        action: 'edit',
        onClick: item =>
          trigger('resource.yaml.edit', {
            detail: item,
          }),
      },
      {
        key: 'delete',
        icon: 'trash',
        text: t('Delete'),
        action: 'delete',
        onClick: item =>
          trigger('resource.delete', {
            type: t(name),
            detail: item,
          }),
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
            icon="storage"
            iconSize={40}
            title={getDisplayName(record)}
            desc={record.storageClassName || '-'}
            to={record.deletionTime ? null : `${this.props.match.url}/${name}`}
            isMultiCluster={true}
          />
        ),
      },
      {
        title: t('Status'),
        dataIndex: 'status',
        isHideable: true,
        render: (status, record) =>
          status === 'Deleting' ? (
            <Status type={status} name={t(status)} flicker />
          ) : (
            <ClusterWrapper
              clusters={record.clusters}
              clustersDetail={this.props.projectStore.detail.clusters}
            >
              {cluster => this.renderStatus({ cluster, record })}
            </ClusterWrapper>
          ),
      },
      {
        title: t('Mount'),
        dataIndex: 'inUse',
        isHideable: true,
        width: '14%',
        render: (_, record) => (
          <ClusterWrapper
            clusters={record.clusters}
            clustersDetail={this.props.projectStore.detail.clusters}
          >
            {cluster =>
              get(record, `resources[${cluster.name}].inUse`)
                ? t('Mounted')
                : t('Not Mounted')
            }
          </ClusterWrapper>
        ),
      },
      {
        title: t('Access Mode'),
        dataIndex: 'capacity',
        isHideable: true,
        render: (_, record) => (
          <div className={styles.capacity}>
            <p>
              {get(record, '_originData.spec.template.spec.accessModes[0]')}
            </p>
          </div>
        ),
      },
      {
        title: t('Created Time'),
        dataIndex: 'createTime',
        isHideable: true,
        width: 150,
        render: time => getLocalTime(time).format('YYYY-MM-DD HH:mm'),
      },
    ]
  }

  renderStatus = ({ cluster, record }) => {
    const data = get(record, `resources[${cluster.name}]`)

    if (!data) {
      return t('waiting')
    }

    const status = getVolumeStatus(data)
    const { phase = '' } = data.status || {}

    return !isEmpty(status) ? (
      <StatusReason reason={status} data={data} type={'volume'} />
    ) : (
      <Status
        type={phase}
        className={styles.status}
        name={t(`VOLUME_STATUS_${phase.toUpperCase()}`)}
      />
    )
  }

  showCreate = () => {
    const { match, module, projectStore } = this.props
    return this.props.trigger('volume.create', {
      module,
      isFederated: true,
      projectDetail: projectStore.detail,
      namespace: match.params.namespace,
    })
  }

  render() {
    const { query, match, bannerProps, tableProps } = this.props
    return (
      <ListPage {...this.props} isFederated>
        <Banner {...bannerProps} tips={this.tips} />
        <Table
          {...tableProps}
          itemActions={this.itemActions}
          namespace={query.namespace}
          columns={this.getColumns()}
          onCreate={this.showCreate}
          cluster={match.params.cluster}
          searchType="name"
        />
      </ListPage>
    )
  }
}
