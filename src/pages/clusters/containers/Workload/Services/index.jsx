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

import { Tooltip } from '@kube-design/components'
import ResourceTable from 'clusters/components/ResourceTable'
import { Avatar, Text } from 'components/Base'
import Banner from 'components/Cards/Banner'
import { ListPage, withClusterList } from 'components/HOCs/withList'
import React from 'react'
import { Link } from 'react-router-dom'

import ServiceStore from 'stores/service'

import { getDisplayName, getLocalTime, showNameAndAlias } from 'utils'
import { ICON_TYPES, SERVICE_TYPES } from 'utils/constants'

@withClusterList({
  store: new ServiceStore(),
  module: 'services',
  name: 'SERVICE',
  rowKey: 'uid',
})
export default class Services extends React.Component {
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
        key: 'editService',
        icon: 'network-router',
        text: t('EDIT_SERVICE'),
        action: 'edit',
        show: this.showAction,
        onClick: item =>
          trigger('service.edit', {
            detail: item,
          }),
      },
      {
        key: 'editGateway',
        icon: 'ip',
        text: t('EDIT_EXTERNAL_ACCESS'),
        action: 'edit',
        show: record =>
          this.showAction(record) && record.type === SERVICE_TYPES.VirtualIP,
        onClick: item =>
          trigger('service.gateway.edit', {
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

  renderExternalService = data => {
    const text = {
      des: '-',
      title: '-',
    }

    if (data.specType === 'NodePort') {
      text.des = t('PORT_PL')
      text.title = data.ports
        .filter(port => port.nodePort)
        .map(port => `${port.nodePort}/${port.protocol}`)
        .join('; ')
    }

    if (data.specType === 'LoadBalancer') {
      text.des =
        data.loadBalancerIngress.length > 1
          ? t('LOAD_BALANCERS_SCAP')
          : t('LOAD_BALANCER_SCAP')
      text.title = data.loadBalancerIngress.join('; ')
    }

    if (data.externalName) {
      return (
        <Text
          description={text.des}
          title={() => (
            <Tooltip content={data.externalName}>
              <span>{text.title}</span>
            </Tooltip>
          )}
        />
      )
    }

    return <Text description={t(`${text.des}`)} title={text.title} />
  }

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
        width: '24%',
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
        title: t('INTERNAL_ACCESS'),
        dataIndex: 'annotations["kubesphere.io/serviceType"]',
        isHideable: true,
        width: '16%',
        render: (_, record) => {
          return (
            <Text
              title={record.clusterIP || ''}
              description={t(`${record.type}`)}
            />
          )
        },
      },
      {
        title: t('EXTERNAL_ACCESS'),
        dataIndex: 'specType',
        isHideable: true,
        width: '20%',
        render: (_, record) => this.renderExternalService(record),
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
    return this.props.trigger('service.simple.create', {
      module,
      namespace: query.namespace,
      cluster: match.params.cluster,
      success: getData,
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
