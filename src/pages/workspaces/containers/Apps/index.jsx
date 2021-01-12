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
import { capitalize } from 'lodash'

import { Button } from '@kube-design/components'

import { Status } from 'components/Base'
import Avatar from 'apps/components/Avatar'
import Banner from 'components/Cards/Banner'
import Table from 'components/Tables/List'
import withList, { ListPage } from 'components/HOCs/withList'
import { getLocalTime, getDisplayName } from 'utils'
import { transferAppStatus } from 'utils/app'

import AppStore from 'stores/openpitrix/app'

@withList({
  store: new AppStore(),
  module: 'apps',
  authKey: 'app-templates',
  name: 'App Template',
  rowKey: 'app_id',
})
export default class Apps extends React.Component {
  get tips() {
    const { enabledActions } = this.props
    return [
      {
        title: t('DEVELOP_APP_TITLE'),
        description: t('DEVELOP_APP_DESC'),
        operation: enabledActions.includes('create') ? (
          <Button type="flat" onClick={this.showUpload}>
            {t('Upload Template')}
          </Button>
        ) : null,
        closable: false,
      },
      {
        title: t('HOW_PUBLISH_APP_TITLE'),
        description: t('HOW_PUBLISH_APP_DESC'),
      },
    ]
  }

  get workspace() {
    return this.props.match.params.workspace
  }

  getData = params => {
    this.props.store.fetchList({
      workspace: this.workspace,
      statistics: true,
      ...params,
    })
  }

  get itemActions() {
    return []
  }

  get tableActions() {
    const { tableProps } = this.props
    return {
      ...tableProps.tableActions,
      onCreate: this.showCreate,
      selectActions: [],
    }
  }

  showCreate = () => {
    this.props.trigger('openpitrix.template.create', {
      success: this.showUpload,
    })
  }

  showUpload = () => {
    this.props.trigger('openpitrix.template.upload', {
      workspace: this.workspace,
      success: this.props.routing.query,
    })
  }

  getColumns = () => [
    {
      title: t('Name'),
      dataIndex: 'app_id',
      render: (app_id, app) => {
        const avatar = this.getAvatar(app.icon)
        return (
          <Avatar
            isApp
            to={`/workspaces/${this.workspace}/apps/${app_id}`}
            avatarType={'appIcon'}
            avatar={avatar}
            iconLetter={app.name}
            iconSize={40}
            title={getDisplayName(app)}
            desc={app.description}
          />
        )
      },
    },
    {
      title: t('Status'),
      dataIndex: 'status',
      isHideable: true,
      width: '20%',
      render: status => (
        <Status type={status} name={t(capitalize(transferAppStatus(status)))} />
      ),
    },
    {
      title: t('Latest Version'),
      dataIndex: 'latest_app_version.name',
      isHideable: true,
      width: '20%',
    },
    {
      title: t('Updated Time'),
      dataIndex: 'update_time',
      isHideable: true,
      width: '120',
      render: (time, item) => getLocalTime(time || item.status_time).fromNow(),
    },
  ]

  getAvatar = icon => {
    const baseUrl = this.props.store.baseUrl

    return String(icon).startsWith('att-')
      ? `/${baseUrl}/attachments/${icon}?filename=raw`
      : icon
  }

  render() {
    const { bannerProps, tableProps } = this.props
    return (
      <ListPage {...this.props} getData={this.getData} noWatch>
        <Banner {...bannerProps} tips={this.tips} title={t('App Templates')} />
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
