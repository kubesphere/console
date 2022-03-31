/*
 * This file is part of KubeSphere Console.
 * Copyright (C) 2022 The KubeSphere Console Authors.
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

import { toJS } from 'mobx'
import { getLocalTime, getDisplayName } from 'utils'
import { Avatar, Status } from 'components/Base'

import Banner from 'components/Cards/Banner'
import CDStore from 'stores/codeRepo'
import Table from 'components/Tables/List'

import withList, { ListPage } from 'components/HOCs/withList'
import { omit } from 'lodash'

@withList({
  store: new CDStore(),
  module: 'codeRepos',
  name: 'CODE_REPO',
  rowKey: 'name',
  authKey: 'pipelines',
})
export default class CRList extends React.Component {
  get enabledActions() {
    return globals.app.getActions({
      module: 'pipelines',
      cluster: this.props.match.params.cluster,
      devops: this.devops,
    })
  }

  get devops() {
    return this.props.match.params.devops
  }

  get cluster() {
    return this.props.match.params.cluster
  }

  get workspace() {
    return this.props.match.params.workspace
  }

  get prefix() {
    if (this.props.match.url.endsWith('/')) {
      return this.props.match.url
    }
    return this.props.match.url
  }

  get routing() {
    return this.props.rootStore.routing
  }

  get itemActions() {
    // const { trigger, routing } = this.props

    return [
      {
        key: 'edit',
        icon: 'pen',
        text: t('EDIT'),
        action: 'edit',
        onClick: () => {},
      },
      {
        key: 'delete',
        icon: 'trash',
        text: t('DELETE'),
        action: 'delete',
        onClick: () => {},
      },
    ]
  }

  getData = async params => {
    await this.props.store.fetchList({
      devops: this.devops,
      ...this.props.match.params,
      ...params,
    })
  }

  handleFetch = (params, refresh) => {
    this.routing.query(params, refresh)
  }

  handleCreate = () => {
    const { trigger } = this.props

    trigger('codeRepo.create', {
      title: t('IMPORT_CODE_REPO'),
      devops: this.devops,
      cluster: this.cluster,
      module: 'codeRepos',
      noCodeEdit: true,
      success: () => {
        this.getData()
      },
    })
  }

  getColumns = () => {
    const { getSortOrder } = this.props
    return [
      {
        title: t('NAME'),
        dataIndex: 'name',
        width: '20%',
        sorter: true,
        sortOrder: getSortOrder('name'),
        search: true,
        render: (name, record) => {
          return (
            <Avatar
              to={`${this.prefix}/${name}`}
              desc={record.description}
              title={getDisplayName(record)}
            />
          )
        },
      },
      {
        title: t('STATUS'),
        dataIndex: 'status',
        isHideable: true,
        width: '20%',
        render: status => (
          <Status type={status} name={t(`USER_${status.toUpperCase()}`)} />
        ),
      },
      {
        title: t('Source'),
        dataIndex: 'source',
        isHideable: true,
        width: '20%',
      },
      {
        title: t('CREATION_TIME'),
        dataIndex: 'creationTime',
        sorter: true,
        sortOrder: getSortOrder('creationTime'),
        isHideable: true,
        width: '20%',
        render: creationTime => {
          return getLocalTime(creationTime).format('YYYY-MM-DD HH:mm:ss')
        },
      },
    ]
  }

  renderContent() {
    const { tableProps } = this.props
    const { filters, selectedRowKeys, isLoading, total } = toJS(
      this.props.store.list
    )
    const omitFilters = omit(filters, ['limit', 'page'])

    const defaultTableProps = {
      onSelectRowKeys: this.props.store.setSelectRowKeys,
      selectedRowKeys,
      selectActions: [
        {
          key: 'delete',
          type: 'danger',
          text: t('DELETE'),
          action: 'delete',
          onClick: () =>
            this.props.trigger('pipeline.batch.delete', {
              type: 'CD',
              rowKey: 'name',
              devops: this.devops,
              cluster: this.cluster,
              success: () => {
                setTimeout(() => {
                  this.handleFetch()
                }, 1000)
              },
            }),
        },
      ],
    }

    const showCreate = this.enabledActions.includes('create')
      ? this.handleCreate
      : null

    const showEmpty =
      isLoading === false && total === 0 && Object.keys(omitFilters).length <= 0

    return (
      <Table
        rowKey="name"
        {...tableProps}
        columns={this.getColumns()}
        onCreate={showCreate}
        onFetch={this.handleFetch}
        tableActions={defaultTableProps}
        itemActions={this.itemActions}
        isLoading={isLoading}
        showEmpty={showEmpty}
        enabledActions={this.enabledActions}
      />
    )
  }

  render() {
    const { bannerProps } = this.props

    return (
      <ListPage getData={this.getData} {...this.props}>
        <Banner {...bannerProps} />
        {this.renderContent()}
      </ListPage>
    )
  }
}
