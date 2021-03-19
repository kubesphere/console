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
import { Link } from 'react-router-dom'
import { Icon } from '@kube-design/components'

import { Indicator } from 'components/Base'
import Banner from 'components/Cards/Banner'
import Table from 'components/Tables/List'
import { withProjectList, ListPage } from 'components/HOCs/withList'
import StatusReason from 'projects/components/StatusReason'

import { getLocalTime } from 'utils'
import { POD_STATUS, ICON_TYPES } from 'utils/constants'

import PodStore from 'stores/pod'

import styles from './index.scss'

@withProjectList({
  store: new PodStore(),
  module: 'pods',
  name: 'Pod',
})
export default class Pods extends React.Component {
  componentDidMount() {
    localStorage.setItem('pod-detail-referrer', location.pathname)
  }

  get itemActions() {
    const { getData, trigger, name } = this.props
    return [
      {
        key: 'viewYaml',
        icon: 'eye',
        text: t('View YAML'),
        action: 'view',
        onClick: item =>
          trigger('resource.yaml.edit', {
            detail: item,
            readOnly: true,
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
            success: getData,
          }),
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

  getColumns = () => {
    const { getSortOrder } = this.props
    return [
      {
        title: t('Name'),
        dataIndex: 'name',
        sorter: true,
        sortOrder: getSortOrder('name'),
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
        sortOrder: getSortOrder('startTime'),
        isHideable: true,
        width: 150,
        render: time => getLocalTime(time).format('YYYY-MM-DD HH:mm:ss'),
      },
    ]
  }

  renderAvatar = (name, record) => {
    const { module } = this.props
    const { workspace, cluster, namespace } = this.props.match.params
    const { podStatus } = record
    return (
      <div className={styles.avatar}>
        <div className={styles.icon}>
          <Icon name={ICON_TYPES[module]} size={40} />
          <Indicator
            className={styles.indicator}
            type={podStatus.type}
            flicker
          />
        </div>
        <div>
          <Link
            className={styles.title}
            to={`/${workspace}/clusters/${cluster}/projects/${namespace}/${module}/${name}`}
          >
            {name}
          </Link>
          <div className={styles.desc}>{this.getItemDesc(record)}</div>
        </div>
      </div>
    )
  }

  renderNode = (_, record) => {
    const { cluster } = this.props.match.params
    const { node, nodeIp } = record

    if (!node) return '-'

    const text = `${node}(${nodeIp})`

    return <Link to={`/clusters/${cluster}/nodes/${node}`}>{text}</Link>
  }

  renderStatus = podStatus => (
    <Status type={podStatus.type} name={t(podStatus.type)} flicker />
  )

  render() {
    const { bannerProps, tableProps } = this.props
    return (
      <ListPage {...this.props}>
        <Banner {...bannerProps} />
        <Table
          {...tableProps}
          itemActions={this.itemActions}
          columns={this.getColumns()}
          onCreate={null}
        />
      </ListPage>
    )
  }
}
