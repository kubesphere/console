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

import Table from 'components/Tables/List'
import withList, { ListPage } from 'components/HOCs/withList'
import { Status } from 'components/Base'
import Banner from 'components/Cards/Banner'
import Avatar from 'apps/components/Avatar'
import { getLocalTime, showNameAndAlias } from 'utils'

import { getAppCategoryNames, transferAppStatus } from 'utils/app'
import AppStore from 'stores/openpitrix/store'

@withList({
  store: new AppStore(),
  module: 'apps',
  name: 'APP',
  rowKey: 'app_id',
})
export default class Store extends React.Component {
  get itemActions() {
    return []
  }

  get tableActions() {
    const { tableProps } = this.props
    return {
      ...tableProps.tableActions,
      onCreate: null,
      selectActions: [],
    }
  }

  getColumns = () => [
    {
      title: t('NAME'),
      dataIndex: 'name',
      width: '30%',
      render: (name, app) => (
        <Avatar
          to={`/apps-manage/store/${app.app_id}`}
          avatar={app.icon}
          iconLetter={name}
          iconSize={40}
          title={name}
          desc={app.description}
        />
      ),
    },
    {
      title: t('STATUS'),
      dataIndex: 'status',
      isHideable: true,
      width: '10%',
      render: status => (
        <Status type={status} name={transferAppStatus(status)} />
      ),
    },
    {
      title: t('WORKSPACE'),
      dataIndex: 'isv',
      isHideable: true,
      width: '10%',
      render: record => showNameAndAlias(record, 'workspace'),
    },
    {
      title: t('LATEST_VERSION'),
      dataIndex: 'latest_app_version.name',
      isHideable: true,
      width: '16%',
    },
    {
      title: t('CATEGORY'),
      dataIndex: 'category_set',
      isHideable: true,
      width: '17%',
      render: categories => getAppCategoryNames(categories),
    },
    {
      title: t('UPDATE_TIME_TCAP'),
      dataIndex: 'status_time',
      isHideable: true,
      width: '17%',
      render: time => getLocalTime(time).fromNow(),
    },
  ]

  render() {
    const { bannerProps, tableProps } = this.props
    return (
      <ListPage {...this.props} noWatch>
        <Banner
          {...bannerProps}
          title={t('APPS')}
          description={t('APP_STORE_DESC')}
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
