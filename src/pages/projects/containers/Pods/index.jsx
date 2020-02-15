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

import { Icon } from '@pitrix/lego-ui'

import { getLocalTime } from 'utils'
import { ICON_TYPES, POD_STATUS } from 'utils/constants'

import { Status, Indicator } from 'components/Base'
import Link from 'components/Link'
import Base from 'core/containers/Base/List'
import EditYamlModal from 'components/Modals/EditYaml'
import StatusReason from 'projects/components/StatusReason'
import PodStore from 'stores/pod'

import styles from './index.scss'

@inject('rootStore')
@observer
export default class Pods extends Base {
  init() {
    this.store = new PodStore()
    this.initWebsocket()
  }

  get module() {
    return 'pods'
  }

  get name() {
    return 'Pod'
  }

  getTableProps() {
    return {
      ...super.getTableProps(),
      onCreate: null,
    }
  }

  get canViewNode() {
    return globals.app.hasPermission({
      module: 'nodes',
      action: 'view',
    })
  }

  get itemActions() {
    return [
      {
        key: 'viewYaml',
        icon: 'pen',
        text: t('View YAML'),
        action: 'view',
        onClick: this.showModal('viewYaml'),
      },
      {
        key: 'delete',
        icon: 'trash',
        text: t('Delete'),
        action: 'delete',
        onClick: this.showModal('deleteModal'),
      },
    ]
  }

  getStatus() {
    return POD_STATUS.map(status => ({
      text: t(status.text),
      value: status.value,
    }))
  }

  getItemDesc = record => {
    const { status, type } = record.podStatus
    const desc =
      type !== 'running' && type !== 'completed' ? (
        <StatusReason
          status={type}
          reason={t(status)}
          data={record}
          type="pod"
        />
      ) : (
        t(type)
      )

    return desc
  }

  getColumns = () => [
    {
      title: t('Name'),
      dataIndex: 'name',
      sorter: true,
      sortOrder: this.getSortOrder('name'),
      search: true,
      render: this.renderAvatar,
    },
    {
      title: t('Node'),
      dataIndex: 'node',
      isHideable: true,
      width: '18%',
      render: this.renderNode,
    },
    {
      title: t('Pod IP'),
      dataIndex: 'podIp',
      isHideable: true,
      width: '15%',
    },
    {
      title: t('Application'),
      dataIndex: 'app',
      isHideable: true,
      search: true,
      width: '15%',
    },
    {
      title: t('Updated Time'),
      dataIndex: 'startTime',
      sorter: true,
      sortOrder: this.getSortOrder('startTime'),
      isHideable: true,
      width: 150,
      render: time => getLocalTime(time).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      key: 'more',
      width: 20,
      render: this.renderMore,
    },
  ]

  renderAvatar = (name, record) => {
    const { podStatus } = record
    return (
      <div className={styles.avatar}>
        <div className={styles.icon}>
          <Icon name={ICON_TYPES[this.module]} size={40} />
          <Indicator
            className={styles.indicator}
            type={podStatus.type}
            flicker
          />
        </div>
        <div>
          <Link className={styles.title} to={`${this.prefix}/${name}`}>
            {name}
          </Link>
          <div className={styles.desc}>{this.getItemDesc(record)}</div>
        </div>
      </div>
    )
  }

  renderNode = (_, record) => {
    const { node, nodeIp } = record

    if (!node) return '-'

    const text = `${node}(${nodeIp})`

    return (
      <Link to={`/infrastructure/nodes/${node}`} auth={this.canViewNode}>
        {text}
      </Link>
    )
  }

  renderStatus = podStatus => (
    <Status type={podStatus.type} name={t(podStatus.type)} flicker />
  )

  renderExtraModals() {
    const { viewYaml, selectItem = {} } = this.state

    return (
      <div>
        <EditYamlModal
          visible={viewYaml}
          detail={selectItem._originData}
          onCancel={this.hideModal('viewYaml')}
          readOnly
        />
      </div>
    )
  }
}
