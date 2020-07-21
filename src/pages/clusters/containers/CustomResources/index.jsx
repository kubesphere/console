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

import { Avatar } from 'components/Base'
import Banner from 'components/Cards/Banner'
import Table from 'components/Tables/List'
import withList, { ListPage } from 'components/HOCs/withList'

import { getLocalTime } from 'utils'

import CrdStore from 'stores/crd'

@withList({
  store: new CrdStore(),
  module: 'customresourcedefinitions',
  name: 'Custom Resource Definition',
})
export default class CustomResources extends React.Component {
  getColumns = () => {
    const { cluster } = this.props.match.params
    const { getSortOrder } = this.props
    return [
      {
        title: t('Kind'),
        dataIndex: 'kind',
        render: (kind, record) => (
          <Avatar
            to={`/clusters/${cluster}/customresources/${record.name}`}
            title={kind}
            desc={`${record.group}/${record.latestVersion}`}
          />
        ),
      },
      {
        title: t('Name'),
        key: 'name',
        dataIndex: 'name',
      },
      {
        title: t('Scope'),
        key: 'scope',
        dataIndex: 'scope',
      },
      {
        title: t('Created Time'),
        dataIndex: 'createTime',
        sorter: true,
        sortOrder: getSortOrder('createTime'),
        isHideable: true,
        width: '19%',
        render: time => getLocalTime(time).format('YYYY-MM-DD HH:mm:ss'),
      },
    ]
  }

  render() {
    const { bannerProps, tableProps } = this.props
    return (
      <ListPage {...this.props} noWatch>
        <Banner {...bannerProps} tabs={this.tabs} />
        <Table
          {...tableProps}
          itemActions={[]}
          columns={this.getColumns()}
          onCreate={null}
          searchType="name"
        />
      </ListPage>
    )
  }
}
