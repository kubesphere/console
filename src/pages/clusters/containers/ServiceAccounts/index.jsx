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
import { Link } from 'react-router-dom'
import { Avatar } from 'components/Base'
import { withClusterList, ListPage } from 'components/HOCs/withList'
import Banner from 'components/Cards/Banner'
import ResourceTable from 'clusters/components/ResourceTable'

import { getDisplayName, getLocalTime } from 'utils'
import { ICON_TYPES } from 'utils/constants'

import ServiceAccountStore from 'stores/serviceAccount'

@withClusterList({
  store: new ServiceAccountStore(),
  module: 'serviceaccounts',
  name: 'ServiceAccount',
})
export default class ServiceAccounts extends React.Component {
  get itemActions() {
    const { trigger, name } = this.props
    return [
      {
        key: 'edit',
        icon: 'pen',
        text: t('Edit'),
        action: 'edit',
        onClick: item =>
          trigger('serviceaccount.edit', {
            detail: item,
            ...this.props.match.params,
          }),
      },
      {
        key: 'editYaml',
        icon: 'pen',
        text: t('Edit YAML'),
        action: 'edit',
        onClick: item =>
          trigger('resource.yaml.edit', {
            detail: item,
          }),
      },
      {
        key: 'modify',
        icon: 'pen',
        text: t('Modify Service Account Role'),
        action: 'edit',
        onClick: item =>
          trigger('serviceaccount.role.edit', {
            detail: item,
            ...this.props.match.params,
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

  getCheckboxProps = record => ({
    disabled: record.isFedManaged,
    name: record.name,
  })

  getColumns = () => {
    const { getSortOrder, module } = this.props
    const { cluster } = this.props.match.params

    return [
      {
        title: t('Name'),
        dataIndex: 'name',
        sorter: true,
        sortOrder: getSortOrder('name'),
        render: (name, record) => (
          <Avatar
            icon={ICON_TYPES[module]}
            iconSize={40}
            title={getDisplayName(record)}
            desc={record.description || '-'}
            to={`/clusters/${cluster}/projects/${record.namespace}/${module}/${name}`}
            isMultiCluster={record.isFedManaged}
          />
        ),
      },
      {
        title: t('Project'),
        dataIndex: 'namespace',
        isHideable: true,
        width: '16%',
        render: namespace => (
          <Link to={`/clusters/${cluster}/projects/${namespace}`}>
            {namespace}
          </Link>
        ),
      },
      {
        title: t('Role'),
        dataIndex: 'role',
        isHideable: true,
      },
      {
        title: t('Secret'),
        dataIndex: 'secrets',
        isHideable: true,
        render: (secrets, record) =>
          secrets.map(item => (
            <div key={item.name}>
              <Link
                to={`/clusters/${cluster}/projects/${record.namespace}/secrets/${item.name}`}
              >
                {item.name}
              </Link>
            </div>
          )),
      },
      {
        title: t('Created Time'),
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
    const { match, module } = this.props
    return this.props.trigger('serviceaccount.create', {
      module,
      namespace: match.params.namespace,
      cluster: match.params.cluster,
    })
  }

  render() {
    const { match, bannerProps, tableProps } = this.props
    return (
      <ListPage {...this.props}>
        <Banner {...bannerProps} />
        <ResourceTable
          {...tableProps}
          columns={this.getColumns()}
          itemActions={this.itemActions}
          cluster={match.params.cluster}
          getCheckboxProps={this.getCheckboxProps}
          onCreate={this.showCreate}
          searchType="name"
        />
      </ListPage>
    )
  }
}
