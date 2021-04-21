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
import { parse } from 'qs'
import { debounce } from 'lodash'

import { Notify } from '@kube-design/components'
import { Avatar, Status } from 'components/Base'
import Banner from 'components/Cards/Banner'
import Table from 'components/Tables/List'
import withList, { ListPage } from 'components/HOCs/withList'

import AppRepoStore from 'stores/openpitrix/repo'

@withList({
  store: new AppRepoStore(),
  module: 'repos',
  authKey: 'app-repos',
  name: 'App Repository',
  rowKey: 'repo_id',
})
export default class AppRepos extends React.Component {
  get tips() {
    return [
      {
        title: t('HOW_TO_USE_APP_REPO_Q'),
        description: t('HOW_TO_USE_APP_REPO_A'),
      },
    ]
  }

  get workspace() {
    return this.props.match.params.workspace
  }

  get itemActions() {
    const { trigger, name, routing } = this.props
    return [
      {
        key: 'edit',
        icon: 'pen',
        text: t('Edit'),
        action: 'edit',
        onClick: item =>
          trigger('openpitrix.repo.edit', {
            detail: item,
            workspace: this.workspace,
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
            detail: item,
            type: t(name),
            success: routing.query,
          }),
      },
    ]
  }

  get tableActions() {
    const { trigger, routing, tableProps } = this.props
    return {
      ...tableProps.tableActions,
      searchType: 'keyword',
      actions: [
        {
          key: 'create',
          type: 'control',
          text: t('Add Repository'),
          action: 'manage',
          onClick: () =>
            trigger('openpitrix.repo.add', {
              workspace: this.workspace,
              success: routing.query,
            }),
        },
      ],
      selectActions: [
        {
          key: 'index',
          type: 'primary',
          text: t('Index Repo'),
          action: 'manage',
          onClick: this.handleIndex,
        },
      ],
    }
  }

  handleIndex = async () => {
    await Promise.all(
      this.props.store.list.selectedRowKeys.map(async repo => {
        const resp = await this.props.store.index({
          repo_id: repo,
          workspace: this.workspace,
        })
        const { message } = resp

        if (message === 'success') {
          Notify.success(t('Index Successfully'))
        }
      })
    )
    this.props.store.setSelectRowKeys([])
  }

  getColumns = () => [
    {
      title: t('Name'),
      dataIndex: 'name',
      width: '25%',
      render: (name, record) => (
        <Avatar
          icon="catalog"
          iconSize={40}
          title={name}
          desc={record.description || '-'}
          to={`${this.props.match.url}/${record.repo_id}`}
        />
      ),
    },
    {
      title: t('Status'),
      dataIndex: 'status',
      isHideable: true,
      width: '15%',
      render: status => <Status type={status} name={t(status)} flicker />,
    },
    {
      title: t('URL'),
      dataIndex: 'url',
    },
  ]

  handleFetch = debounce(query => {
    const { store, getData } = this.props
    if (store.list.isLoading) {
      return
    }
    const params = parse(location.search.slice(1))
    return getData({ ...params, ...query, silent: true })
  }, 1000)

  handleWatch = message => {
    if (message.object.kind === 'HelmRepo') {
      if (['MODIFIED', 'DELETED', 'ADDED'].includes(message.type)) {
        this.handleFetch()
      }
    }
  }

  render() {
    const { bannerProps, tableProps } = this.props
    return (
      <ListPage {...this.props} onMessage={this.handleWatch}>
        <Banner
          {...bannerProps}
          tips={this.tips}
          title={t('App Repositories')}
          description={t('APP_REPO_DESC')}
        />
        <Table
          {...tableProps}
          tableActions={this.tableActions}
          itemActions={this.itemActions}
          columns={this.getColumns()}
          searchType="keyword"
        />
      </ListPage>
    )
  }
}
