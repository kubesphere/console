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

import { get } from 'lodash'
import React from 'react'
import { observer, inject } from 'mobx-react'
import { getLocalTime } from 'utils'
import { ICON_TYPES } from 'utils/constants'

import { Avatar } from 'components/Base'
import Banner from 'components/Cards/Banner'
import Base from 'core/containers/Base/List'

import RoleStore from 'stores/role'

@inject('rootStore')
@observer
class Roles extends Base {
  init() {
    this.store = new RoleStore('workspaceroles')
  }

  get module() {
    return 'workspaceroles'
  }

  get name() {
    return 'Workspace Role'
  }

  getData(params) {
    this.store.fetchList({ ...this.props.match.params, ...params })
  }

  getTableProps() {
    return {
      onFetch: this.handleFetch,
      hideSearch: true,
    }
  }

  getColumns = () => [
    {
      title: t('Name'),
      key: 'name',
      dataIndex: 'name',
      width: '30%',
      render: name => (
        <Avatar
          title={name}
          icon={ICON_TYPES[this.module]}
          to={`${this.prefix}/${name}`}
        />
      ),
    },
    {
      title: t('Description'),
      key: 'description',
      dataIndex: 'description',
      isHideable: true,
      width: '40%',
      render: (description, record) => {
        const name = get(record, 'name')
        if (description && globals.config.presetWorkspaceRoles.includes(name)) {
          return t(description)
        }
        return description
      },
    },
    {
      title: t('Created Time'),
      dataIndex: 'createTime',
      isHideable: true,
      width: '30%',
      render: time => getLocalTime(time).format('YYYY-MM-DD HH:mm:ss'),
    },
  ]

  renderHeader() {
    return (
      <Banner
        title={t('Workspace Roles')}
        icon="role"
        description={t('WORKSPACE_ROLE_DESC')}
        module={this.module}
      />
    )
  }
}

export default Roles
