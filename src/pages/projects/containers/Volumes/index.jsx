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
import { withProjectList, ListPage } from 'components/HOCs/withList'
import Table from 'components/Tables/List'
import VolumeStore from 'stores/volume'
import { getLocalTime, getDisplayName, map_accessModes } from 'utils'
import { getVolumeStatus } from 'utils/status'
import { VOLUME_STATUS } from 'utils/constants'
import { Icon, Tooltip } from '@kube-design/components'
import { Link } from 'react-router-dom'
import PvStore from 'stores/pv'

import StatusReason from 'projects/components/StatusReason'

import { Avatar, Status } from 'components/Base'

import Banner from 'components/Cards/Banner'

import styles from './index.scss'

@withProjectList({
  store: new VolumeStore(),
  module: 'persistentvolumeclaims',
  authKey: 'volumes',
  name: 'PERSISTENT_VOLUME_CLAIM',
  rowKey: 'uid',
})
export default class Volumes extends React.Component {
  pvStore = new PvStore()

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

  componentDidMount() {
    this.props.store.getKsVersion(this.props.match.params)
  }

  getItemDesc = record => {
    const status = getVolumeStatus(record)
    const desc = !isEmpty(status) ? (
      <StatusReason reason={status} data={record} type={'volume'} />
    ) : (
      record.storageClassName || '-'
    )

    return desc
  }

  getStatus() {
    return VOLUME_STATUS.map(status => ({
      text: t(status.text),
      value: status.value,
    }))
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

  pvYamlView = async item => {
    const pvName = item.spec.volumeName
    const { cluster } = this.props.match.params
    await this.pvStore.fetchDetail({ cluster, name: pvName })
    return this.props.trigger('resource.yaml.edit', {
      detail: this.pvStore.detail,
      yaml: this.pvStore.detail._originData,
      readOnly: true,
    })
  }

  getColumns() {
    const { getSortOrder, getFilteredValue } = this.props
    const { cluster } = this.props.match.params

    const pvColumn = {
      title: t('PERSISTENT_VOLUME'),
      dataIndex: '_originData',
      isHideable: true,
      search: false,
      width: '28.5%',
      render: _ => (
        <div id="pvColumn" className={styles.pv_content}>
          <Link to={`/clusters/${cluster}/pv/${_.spec.volumeName}`}>
            {_.spec.volumeName}
          </Link>
          {_.spec.volumeName && (
            <Tooltip content={t('VIEW_YAML')}>
              <Icon
                className={styles.yaml}
                name="log"
                size={20}
                onClick={() => this.pvYamlView(_)}
              />
            </Tooltip>
          )}
        </div>
      ),
    }

    const allColumns = [
      {
        title: t('NAME'),
        dataIndex: 'name',
        sortOrder: getSortOrder('name'),
        search: true,
        sorter: true,
        render: (name, record) => (
          <Avatar
            icon={'storage'}
            iconSize={40}
            to={`${this.props.match.url}/${name}`}
            desc={this.getItemDesc(record)}
            title={getDisplayName(record)}
          />
        ),
      },
      {
        title: t('STATUS'),
        dataIndex: 'status',
        isHideable: true,
        search: true,
        filters: this.getStatus(),
        filteredValue: getFilteredValue('status'),
        width: '10.6%',
        render: (_, { phase }) => (
          <Status
            type={phase}
            className={styles.status}
            name={t(`VOLUME_STATUS_${phase.toUpperCase()}`)}
            flicker
          />
        ),
      },
      {
        title: this.renderAccessTitle(),
        dataIndex: 'accessModes',
        isHideable: false,
        width: '12.3%',
        render: accessModes => this.mapperAccessMode(accessModes),
      },
      {
        title: t('MOUNT_STATUS'),
        dataIndex: 'inUse',
        isHideable: true,
        width: '7.7%',
        render: inUse => (inUse ? t('MOUNTED') : t('NOT_MOUNTED')),
      },
      {
        title: t('CREATION_TIME_TCAP'),
        dataIndex: 'createTime',
        sorter: true,
        sortOrder: getSortOrder('createTime'),
        isHideable: true,
        width: 140,
        render: time => getLocalTime(time).format('YYYY-MM-DD HH:mm'),
      },
    ]

    if (this.props.store.ksVersion >= 3.2) {
      allColumns.splice(2, 0, pvColumn)
    }

    return allColumns
  }

  showCreate = () => {
    const { match, module, projectStore } = this.props
    return this.props.trigger('volume.create', {
      module,
      projectDetail: projectStore.detail,
      namespace: match.params.namespace,
      cluster: match.params.cluster,
    })
  }

  render() {
    const { query, match, bannerProps, tableProps } = this.props
    return (
      <ListPage {...this.props}>
        <Banner {...bannerProps} tips={this.tips} />
        <Table
          {...tableProps}
          itemActions={this.itemActions}
          namespace={query.namespace}
          columns={this.getColumns()}
          onCreate={this.showCreate}
          cluster={match.params.cluster}
        />
      </ListPage>
    )
  }
}
