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
import { toJS } from 'mobx'
import { observer, inject } from 'mobx-react'
import { ICON_TYPES } from 'utils/constants'
import { Avatar } from 'components/Base'
import Banner from 'components/Cards/Banner'
import BaseTable from 'components/Tables/Base'

@inject('rootStore')
@observer
class Roles extends React.Component {
  componentDidMount() {
    this.getData()
  }

  get prefix() {
    return this.props.match.url
  }

  get module() {
    return 'roles'
  }

  get name() {
    return 'Project Roles'
  }

  get routing() {
    return this.props.rootStore.routing
  }

  get store() {
    return this.props.rootStore.devops
  }

  getData() {
    this.store.fetchRoles(this.props.match.params)
  }

  getColumns = () => [
    {
      title: t('Name'),
      dataIndex: 'name',
      width: '33%',
      render: name => (
        <Avatar icon={ICON_TYPES[this.module]} title={name} noLink />
      ),
    },
    {
      title: t('Description'),
      dataIndex: 'description',
      isHideable: true,
      width: '66%',
      render: desc => t(desc),
    },
  ]

  renderTable() {
    const { data, filters, isLoading, total, page, limit } = toJS(
      this.store.roles
    )

    const pagination = { total, page, limit }

    return (
      <div className="margin-t12">
        <BaseTable
          data={data}
          columns={this.getColumns()}
          filters={filters}
          pagination={pagination}
          isLoading={isLoading}
          hideSearch
        />
      </div>
    )
  }

  render() {
    return (
      <div>
        <Banner
          title={t('DevOps Roles')}
          icon="role"
          description={t('DEVOPS_PROJECT_ROLES_DESC')}
          module={this.module}
        />
        {this.renderTable()}
      </div>
    )
  }
}

export default Roles
