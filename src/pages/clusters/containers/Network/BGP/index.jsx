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
import { Button } from '@kube-design/components'

import { Panel, Text, Avatar } from 'components/Base'
import Banner from 'components/Cards/Banner'
import Table from 'components/Tables/List'
import withList, { ListPage } from 'components/HOCs/withList'

import { getLocalTime, getDisplayName } from 'utils'
import { ICON_TYPES } from 'utils/constants'

import BGPStore from 'stores/network/bgp'

import styles from './index.scss'

@withList({
  store: new BGPStore(),
  module: 'bgppeers',
  name: 'BGP',
})
export default class BGP extends React.Component {
  constructor(props) {
    super(props)
    this.store = this.props.store
    this.fetchBGPConf()
  }

  get enabledActions() {
    return globals.app.getActions({
      module: 'bgppeers',
      cluster: this.props.match.params.cluster,
    })
  }

  get itemActions() {
    const { trigger, routing } = this.props
    return [
      {
        key: 'edit',
        icon: 'pen',
        text: t('Edit'),
        action: 'edit',
        onClick: item =>
          trigger('resource.baseinfo.edit', {
            detail: item,
            success: routing.query,
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
            success: routing.query,
          }),
      },
      {
        key: 'delete',
        icon: 'trash',
        text: t('Delete'),
        action: 'delete',
        onClick: item =>
          trigger('resource.delete', {
            type: t(this.name),
            detail: item,
          }),
      },
    ]
  }

  getColumns = () => {
    const { getSortOrder } = this.props
    return [
      {
        title: t('Name'),
        dataIndex: 'name',
        sorter: true,
        sortOrder: getSortOrder('name'),
        render: (name, record) => (
          <Avatar
            icon={ICON_TYPES[module]}
            iconSize={40}
            title={getDisplayName(record)}
            desc={record.desc}
          />
        ),
      },
      {
        title: t('ASN'),
        dataIndex: 'peerAs',
        sorter: true,
        sortOrder: getSortOrder('peerAs'),
      },
      {
        title: t('IP Address'),
        dataIndex: 'neighborAddress',
      },
      {
        title: t('Created Time'),
        dataIndex: 'createTime',
        sorter: true,
        sortOrder: getSortOrder('createTime'),
        isHideable: true,
        width: 150,
        render: time => getLocalTime(time).format('YYYY-MM-DD HH:mm:ss'),
      },
    ]
  }

  fetchBGPConf = () => {
    this.store.fetchBGPConf({ ...this.props.match.params })
  }

  showEdit = () => {
    const { trigger, module } = this.props
    trigger('network.bgp.conf.edit', {
      title: t('Edit BGP Config'),
      module,
      detail: this.store.bgpConf,
      success: this.fetchBGPConf,
    })
  }

  showCreate = () => {
    const { trigger, module } = this.props
    return trigger('network.bgp.peer.add', {
      title: t('Add BGP Peer'),
      module,
      ...this.props.match.params,
    })
  }

  render() {
    const { bannerProps, tableProps } = this.props
    const { as, routerId, listenPort } = this.store.bgpConf
    const actions = this.enabledActions

    return (
      <ListPage {...this.props}>
        <Banner {...bannerProps} tips={this.tips} />
        <Panel title={t('BGP Config')}>
          <div className={styles.configWrapper}>
            <Text icon="network-router" title={as} description={t('As')} />
            <Text title={routerId} description={t('Router Id')} />
            <Text title={listenPort} description={t('Listen Port')} />
            {actions.includes('edit') && (
              <Button className={styles.action} onClick={this.showEdit}>
                {t('Edit Config')}
              </Button>
            )}
          </div>
        </Panel>
        <Table
          {...tableProps}
          onCreate={this.showCreate}
          columns={this.getColumns()}
          itemActions={this.itemActions}
        />
      </ListPage>
    )
  }
}
