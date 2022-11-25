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
import withList, { ListPage } from 'components/HOCs/withList'

import { Avatar } from 'components/Base'
import Banner from 'components/Cards/Banner'
import CodeStore from 'stores/codeRepo'
import Table from 'components/Tables/List'

import { getLocalTime, capitalize, getDisplayName } from 'utils'
import { omit } from 'lodash'

import styles from './index.scss'

@withList({
  store: new CodeStore(),
  module: 'codeRepos',
  name: 'CODE_REPO',
  rowKey: 'name',
  authKey: 'gitrepositories',
})
export default class CRList extends React.Component {
  get enabledActions() {
    return globals.app.getActions({
      module: 'gitrepositories',
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
    const { trigger, routing } = this.props

    return [
      {
        key: 'edit',
        icon: 'pen',
        text: t('EDIT'),
        action: 'edit',
        onClick: record => {
          trigger('codeRepo.edit', {
            title: t('EDIT_CODE_REPO'),
            devops: this.devops,
            cluster: this.cluster,
            module: 'codeRepos',
            detail: record,
            noCodeEdit: true,
            success: this.getData,
          })
        },
      },
      {
        key: 'editYaml',
        icon: 'pen',
        text: t('EDIT_YAML'),
        action: 'edit',
        onClick: record => {
          trigger('resource.yaml.edit', {
            detail: { ...record, devops: this.devops, cluster: this.cluster },
            success: routing.query,
          })
        },
      },
      {
        key: 'delete',
        icon: 'trash',
        text: t('DELETE'),
        action: 'delete',
        onClick: record => {
          trigger('codeRepo.delete', {
            type: 'CODE_REPO',
            detail: record,
            devops: this.devops,
            cluster: this.cluster,
            success: routing.query,
          })
        },
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
      noSVN: true,
      success: this.getData,
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
              className={styles.avatar}
              to={''}
              icon={
                record.provider === 'bitbucket_server'
                  ? 'bitbucket'
                  : record.provider
              }
              iconSize={40}
              desc={record.description}
              title={getDisplayName(record)}
            />
          )
        },
      },
      {
        title: t('SOURCE'),
        dataIndex: 'provider',
        isHideable: true,
        width: '20%',
        render: provider => {
          return capitalize(
            provider === 'bitbucket_server' ? 'bitbucket' : provider
          )
        },
      },
      {
        title: t('CODE_REPOSITORY_ADDRESS'),
        dataIndex: 'repoURL',
        isHideable: true,
        width: '40%',
      },
      {
        title: t('CREATION_TIME_TCAP'),
        dataIndex: 'createTime',
        sorter: true,
        sortOrder: getSortOrder('createTime'),
        isHideable: true,
        width: '20%',
        render: createTime => {
          return getLocalTime(createTime).format('YYYY-MM-DD HH:mm:ss')
        },
      },
    ]
  }

  renderContent() {
    const { tableProps } = this.props
    const { filters, isLoading, total } = toJS(this.props.store.list)
    const omitFilters = omit(filters, ['limit', 'page'])

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
        tableActions={{}}
        itemActions={this.itemActions}
        isLoading={isLoading}
        showEmpty={showEmpty}
        enabledActions={this.enabledActions}
        createText={t('ADD')}
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
