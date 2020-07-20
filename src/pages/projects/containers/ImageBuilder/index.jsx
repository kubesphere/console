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
import { reaction } from 'mobx'
import { Link } from 'react-router-dom'
import { get } from 'lodash'

import { Avatar, Status } from 'components/Base'
import Banner from 'components/Cards/Banner'
import { withProjectList, ListPage } from 'components/HOCs/withList'
import Table from 'components/Tables/List'

import { getLocalTime, getDisplayName } from 'utils'
import { ICON_TYPES } from 'utils/constants'

import S2IBuilderStore from 'stores/s2i/builder'

@withProjectList({
  store: new S2IBuilderStore('s2ibuilders'),
  module: 's2ibuilders',
  name: 'Image Builder',
})
export default class ImageBuilders extends React.Component {
  get store() {
    return this.props.store
  }

  componentDidMount() {
    this.freshDisposer = reaction(
      () => this.store.list.isLoading,
      () => {
        const isRunning = this.store.list.data.some(
          detail => get(detail, 'status.lastRunState', 'Running') === 'Running'
        )
        clearTimeout(this.freshTimer)
        if (isRunning) {
          this.freshTimer = setTimeout(this.handleFresh, 4000)
        }
      },
      { fireImmediately: true }
    )
  }

  componentWillUnmount() {
    this.freshDisposer && this.freshDisposer()
    clearTimeout(this.freshTimer)
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

  getColumns = () => {
    const { prefix, module } = this.props
    return [
      {
        title: t('Name'),
        dataIndex: 'name',
        render: (name, record) => (
          <Avatar
            icon={ICON_TYPES[module]}
            iconSize={40}
            title={getDisplayName(record)}
            desc={
              record.serviceName
                ? t('Build image for service x', {
                    service: record.serviceName,
                  })
                : '-'
            }
            to={`${prefix}/${name}`}
          />
        ),
      },
      {
        title: t('Status'),
        dataIndex: 'status',
        isHideable: true,
        width: '15%',
        render: status => {
          let _status = get(status, 'lastRunState', '')
          _status = _status === 'Running' ? 'Building' : _status
          return (
            <Status
              name={t(_status || 'Not running yet')}
              type={_status || 'Unknown'}
              flicker
            />
          )
        },
      },
      {
        title: t('type'),
        dataIndex: 'type',
        isHideable: true,
        width: '15%',
        render: type => t(type),
      },
      {
        title: t('Service'),
        dataIndex: 'serviceName',
        isHideable: true,
        width: '15%',
        render: name => {
          if (name) {
            return <Link to={`./services/${name}/`}>{name}</Link>
          }
          return '-'
        },
      },
      {
        title: t('Created Time'),
        dataIndex: 'createTime',
        isHideable: true,
        width: 150,
        render: time => getLocalTime(time).format('YYYY-MM-DD HH:mm:ss'),
      },
    ]
  }

  showCreate = () => {
    const { match, module, projectStore } = this.props
    return this.props.trigger('imagebuilder.create', {
      module,
      projectDetail: projectStore.detail,
      namespace: match.params.namespace,
      cluster: match.params.cluster,
    })
  }

  render() {
    const { bannerProps, tableProps } = this.props
    return (
      <ListPage {...this.props}>
        <Banner {...bannerProps} description={t(`IMAGE_BUILDER_DESC`)} />
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
