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
import { isEmpty } from 'lodash'

import { Button, Icon } from '@kube-design/components'
import { Avatar, Text, Panel } from 'components/Base'
import Banner from 'components/Cards/Banner'
import Table from 'components/Tables/List'
import { withProjectList, ListPage } from 'components/HOCs/withList'

import { getLocalTime, getDisplayName, getDocsUrl } from 'utils'
import { ICON_TYPES } from 'utils/constants'

import IngressStore from 'stores/ingress'
import GatewayStore from 'stores/gateway'

import styles from './index.scss'

@withProjectList({
  store: new IngressStore(),
  module: 'ingresses',
  name: 'ROUTE',
})
export default class Routers extends React.Component {
  gatewayStore = new GatewayStore()

  state = {
    clusterGateway: '',
    projectGateway: '',
  }

  componentDidMount() {
    this.getGateway()
  }

  getGateway = async () => {
    const { cluster, namespace } = this.props.match.params
    const [
      clusterGateway,
      projectGateway,
    ] = await this.gatewayStore.getGatewayByProject({ cluster, namespace })
    this.setState({ clusterGateway, projectGateway })
  }

  get canSetGateway() {
    return globals.app.hasPermission({
      module: 'project-settings',
      action: 'manage',
      cluster: this.props.match.params.cluster,
      project: this.props.match.params.namespace,
    })
  }

  get tips() {
    return [
      {
        title: t('PREREQUESTS_FOR_USE_ROUTE_Q'),
        description: t('PREREQUESTS_FOR_USE_ROUTE_A'),
        more: getDocsUrl('internet'),
      },
      {
        title: t('ACCESS_TYPES_OF_ROUTE_Q'),
        description: t('ACCESS_TYPES_OF_ROUTE_A'),
      },
    ]
  }

  get itemActions() {
    const { trigger, name } = this.props
    const { namespace } = this.props.match.params

    return [
      {
        key: 'edit',
        icon: 'pen',
        text: t('EDIT_INFORMATION'),
        action: 'edit',
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
        onClick: item =>
          trigger('router.rules.edit', {
            detail: item,
            namespace,
          }),
      },
      {
        key: 'editAnnotations',
        icon: 'firewall',
        text: t('EDIT_ANNOTATIONS'),
        action: 'edit',
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
        onClick: item =>
          trigger('resource.delete', {
            type: name,
            detail: item,
          }),
      },
    ]
  }

  getColumns = () => {
    const { getSortOrder, module } = this.props
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
            to={`${this.props.match.url}/${name}`}
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
        title: t('APP'),
        dataIndex: 'app',
        isHideable: true,
        search: true,
        width: '22%',
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
    const { match, module, projectStore } = this.props
    return this.props.trigger('router.create', {
      module,
      projectDetail: projectStore.detail,
      namespace: match.params.namespace,
      cluster: match.params.cluster,
    })
  }

  showAddGateway = () => {
    const { trigger, match } = this.props
    trigger('gateways.create', {
      name: '',
      namespace: match.params.namespace,
      cluster: match.params.cluster,
      store: this.gatewayStore,
      success: this.getGateway,
    })
  }

  renderCreateGateway() {
    return (
      <Panel className="margin-t12 margin-b12">
        <div className="flexbox">
          <Icon className="margin-r12" name="loadbalancer" size={40} />
          <Text
            className={styles.text}
            title={t('GATEWAY_NOT_ENABLED')}
            description={t('ENABLE_GATEWAY_TIP')}
          />
          {this.canSetGateway && (
            <Button
              className={styles.button}
              type="control"
              onClick={this.showAddGateway}
            >
              {t('ENABLE_GATEWAY')}
            </Button>
          )}
        </div>
      </Panel>
    )
  }

  render() {
    const { bannerProps, tableProps } = this.props
    const { clusterGateway, projectGateway } = this.state
    return (
      <ListPage {...this.props}>
        <Banner {...bannerProps} tips={this.tips} />
        {isEmpty(clusterGateway) &&
          isEmpty(projectGateway) &&
          this.renderCreateGateway()}
        <Table
          {...tableProps}
          itemActions={this.itemActions}
          columns={this.getColumns()}
          onCreate={this.showCreate}
        />
      </ListPage>
    )
  }
}
