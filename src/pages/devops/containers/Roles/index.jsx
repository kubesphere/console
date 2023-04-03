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

import { Avatar } from 'components/Base'
import Banner from 'components/Cards/Banner'
import withList, { ListPage } from 'components/HOCs/withList'
import Table from 'components/Tables/List'
import { toJS } from 'mobx'
import React from 'react'

import RoleStore from 'stores/role'

import { getLocalTime } from 'utils'
import { ICON_TYPES } from 'utils/constants'

@withList({
  store: new RoleStore(),
  module: 'roles',
  name: 'DEVOPS_PROJECT_ROLE',
  injectStores: ['rootStore', 'devopsStore'],
})
export default class Secrets extends React.Component {
  componentDidMount() {
    this.props.store.fetchRoleTemplates({
      devops: this.devops,
      cluster: this.cluster,
    })
  }

  showAction = record => !globals.config.presetDevOpsRoles.includes(record.name)

  get devops() {
    return this.props.devopsStore.devops
  }

  get cluster() {
    return this.props.match.params.cluster
  }

  get enabledActions() {
    return globals.app.getActions({
      module: 'roles',
      devops: this.devops,
      cluster: this.cluster,
    })
  }

  get itemActions() {
    const {
      routing,
      trigger,
      store,
      name,
      isHostCluster,
      isNeedCodeRepo,
    } = this.props

    return [
      {
        key: 'edit',
        icon: 'pen',
        text: t('EDIT_INFORMATION'),
        action: 'edit',
        show: this.showAction,
        onClick: item =>
          trigger('resource.baseinfo.edit', {
            detail: item,
            success: routing.query,
          }),
      },
      {
        key: 'editRole',
        icon: 'pen',
        text: t('EDIT_PERMISSIONS'),
        action: 'edit',
        show: this.showAction,
        onClick: item =>
          trigger('role.edit', {
            module: isHostCluster
              ? 'devopsroles'
              : isNeedCodeRepo
              ? 'devopsRoleWithCodeRepo'
              : 'devopsrolesNotHostCluster',
            detail: item,
            roleTemplates: toJS(store.roleTemplates.data),
            success: routing.query,
          }),
      },
      {
        key: 'delete',
        icon: 'trash',
        text: t('DELETE'),
        action: 'delete',
        show: this.showAction,
        onClick: item =>
          trigger('role.delete', {
            detail: item,
            type: name,
            namespace: this.devops,
            cluster: this.cluster,
            success: routing.query,
          }),
      },
    ]
  }

  get tableActions() {
    const { tableProps } = this.props
    return {
      ...tableProps.tableActions,
      onCreate: this.showCreate,
      selectActions: [],
    }
  }

  getData = ({ ...params }) => {
    this.props.store.fetchList({
      devops: this.devops,
      cluster: this.cluster,
      ...params,
    })
  }

  getColumns = () => {
    const { getSortOrder, module } = this.props
    return [
      {
        title: t('NAME'),
        dataIndex: 'name',
        sorter: true,
        sortOrder: getSortOrder('name'),
        render: name => (
          <Avatar
            icon={ICON_TYPES[module]}
            title={name}
            to={`${this.props.match.url}/${name}`}
          />
        ),
      },
      {
        title: t('DESCRIPTION'),
        key: 'description',
        dataIndex: 'description',
        isHideable: true,
        width: '40%',
      },
      {
        title: t('CREATION_TIME_TCAP'),
        dataIndex: 'createTime',
        sorter: true,
        sortOrder: getSortOrder('createTime'),
        isHideable: true,
        width: 150,
        render: time => getLocalTime(time).format('YYYY-MM-DD HH:mm:ss'),
      },
    ]
  }

  showCreate = () => {
    const { isHostCluster, isNeedCodeRepo } = this.props
    this.props.trigger('role.create', {
      module: isHostCluster
        ? 'devopsroles'
        : isNeedCodeRepo
        ? 'devopsRoleWithCodeRepo'
        : 'devopsrolesNotHostCluster',
      devops: this.devops,
      namespace: this.devops,
      cluster: this.cluster,
      roleTemplates: toJS(this.props.store.roleTemplates.data).filter(i => i),
      success: this.getData,
    })
  }

  get emptyProps() {
    return { desc: t('DEVOPS_PROJECT_ROLE_EMPTY_DESC') }
  }

  render() {
    const { bannerProps, tableProps } = this.props
    return (
      <ListPage {...this.props} getData={this.getData} noWatch>
        <Banner
          {...bannerProps}
          tabs={this.tabs}
          description={t('DEVOPS_PROJECT_ROLES_DESC')}
        />
        <Table
          {...tableProps}
          enabledActions={this.enabledActions}
          emptyProps={this.emptyProps}
          tableActions={this.tableActions}
          itemActions={this.itemActions}
          columns={this.getColumns()}
          searchType="name"
        />
      </ListPage>
    )
  }
}
