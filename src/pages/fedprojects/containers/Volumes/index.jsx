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
import ClusterWrapper from 'components/Clusters/ClusterWrapper'
import { ListPage, withProjectList } from 'components/HOCs/withList'
import Table from 'components/Tables/List'
import { get, isEmpty } from 'lodash'
import StatusReason from 'projects/components/StatusReason'
import React from 'react'

import FederatedStore from 'stores/federated'
import VolumeStore from 'stores/volume'
import { getDisplayName, getLocalTime, map_accessModes } from 'utils'

import { getVolumeStatus } from 'utils/status'

import styles from './index.scss'

@withProjectList({
  store: new FederatedStore(new VolumeStore()),
  module: 'persistentvolumeclaims',
  authKey: 'volumes',
  name: 'PERSISTENT_VOLUME_CLAIM',
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
        text: t('EDIT_INFORMATION'),
        action: 'edit',
        onClick: item =>
          trigger('resource.baseinfo.edit', {
            detail: item,
          }),
      },
      {
        key: 'editYaml',
        icon: 'pen',
        text: t('EDIT_YAML'),
        action: 'edit',
        onClick: item =>
          trigger('resource.yaml.edit', {
            detail: item,
          }),
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
          }),
      },
    ]
  }

  getColumns() {
    return [
      {
        title: t('NAME'),
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
        title: t('STATUS'),
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
        title: t('MOUNT_STATUS'),
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
                ? t('MOUNTED')
                : t('NOT_MOUNTED')
            }
          </ClusterWrapper>
        ),
      },
      {
        title: this.renderAccessTitle(),
        dataIndex: 'accessModes',
        isHideable: false,
        render: accessModes => this.mapperAccessMode(accessModes),
      },
      {
        title: t('CREATION_TIME_TCAP'),
        dataIndex: 'createTime',
        isHideable: true,
        width: 150,
        render: time => getLocalTime(time).format('YYYY-MM-DD HH:mm'),
      },
    ]
  }

  renderAccessTitle = () => {
    const renderModeTip = (
      <div>
        <div>{t('RWO_DESC')}</div>
        <div>{t('ROX_DESC')}</div>
        <div>{t('RWX_DESC')}</div>
      </div>
    )
    return (
      <div className={styles.mode_title}>
        {t('ACCESS_MODE_TCAP')}
        <Tooltip content={renderModeTip}>
          <Icon name="question" size={16} className={styles.question}></Icon>
        </Tooltip>
      </div>
    )
  }

  mapperAccessMode = accessModes => {
    const modes = map_accessModes(accessModes)
    return <span>{modes.join(',')}</span>
  }

  renderStatus = ({ cluster, record }) => {
    const data = get(record, `resources[${cluster.name}]`)

    if (!data) {
      return t('WAITING')
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
          className={'table-2-5'}
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
