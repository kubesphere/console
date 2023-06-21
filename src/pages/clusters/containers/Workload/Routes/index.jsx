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

import ResourceTable from 'clusters/components/ResourceTable'

import { Avatar } from 'components/Base'
import Banner from 'components/Cards/Banner'
import { ListPage, withClusterList } from 'components/HOCs/withList'
import React from 'react'
import { Link } from 'react-router-dom'

import IngressStore from 'stores/ingress'

import { getDisplayName, getLocalTime, showNameAndAlias } from 'utils'
import { ICON_TYPES } from 'utils/constants'

@withClusterList({
  store: new IngressStore(),
  module: 'ingresses',
  name: 'ROUTE',
  rowKey: 'uid',
})
export default class Routers extends React.Component {
  showAction = record => !record.isFedManaged

  get itemActions() {
    const { trigger, name } = this.props
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
          }),
      },
      {
        key: 'editYaml',
        icon: 'pen',
        text: t('EDIT_YAML'),
        action: 'edit',
        show: this.showAction,
        onClick: item =>
          trigger('resource.yaml.edit', {
            detail: item,
          }),
      },
      {
        key: 'editRules',
        icon: 'firewall',
        text: t('EDIT_ROUTING_RULES'),
        action: 'edit',
        show: this.showAction,
        onClick: item =>
          trigger('router.rules.edit', {
            detail: item,
            namespace: item.namespace,
          }),
      },
      {
        key: 'editAnnotations',
        icon: 'firewall',
        text: t('EDIT_ANNOTATIONS'),
        action: 'edit',
        show: this.showAction,
        onClick: item =>
          trigger('router.annotations.edit', {
            detail: item,
          }),
      },
      {
        key: 'delete',
        icon: 'trash',
        text: t('DELETE'),
        action: 'delete',
        show: this.showAction,
        onClick: item =>
          trigger('resource.delete', {
            type: name,
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
        title: t('NAME'),
        dataIndex: 'name',
        sorter: true,
        sortOrder: getSortOrder('name'),
        search: true,
        render: (name, record) => (
          <Avatar
            icon={ICON_TYPES[module]}
            iconSize={40}
            title={getDisplayName(record)}
            desc={record.description || '-'}
            isMultiCluster={record.isFedManaged}
            to={`/clusters/${cluster}/projects/${record.namespace}/${module}/${name}`}
          />
        ),
      },
      {
        title: t('GATEWAY_ADDRESS_TCAP'),
        dataIndex: 'loadBalancerIngress',
        isHideable: true,
        width: '22%',
        render: loadBalancerIngress => loadBalancerIngress.join('; '),
      },
      {
        title: t('PROJECT'),
        dataIndex: 'namespace',
        isHideable: true,
        width: '18%',
        render: namespace => (
          <Link to={`/clusters/${cluster}/projects/${namespace}`}>
            {showNameAndAlias(namespace, 'project')}
          </Link>
        ),
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
    const { query, match, module, getData } = this.props
    return this.props.trigger('router.create', {
      module,
      namespace: query.namespace,
      cluster: match.params.cluster,
      success: () => getData(),
    })
  }

  render() {
    const { match, bannerProps, tableProps } = this.props
    return (
      <ListPage {...this.props}>
        <Banner {...bannerProps} />
        <ResourceTable
          {...tableProps}
          itemActions={this.itemActions}
          columns={this.getColumns()}
          onCreate={this.showCreate}
          cluster={match.params.cluster}
          getCheckboxProps={this.getCheckboxProps}
        />
      </ListPage>
    )
  }
}
