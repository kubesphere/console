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

import { isEmpty } from 'lodash'
import React from 'react'
import { toJS } from 'mobx'
import { observer, inject } from 'mobx-react'
import classNames from 'classnames'
import {
  Button,
  Dropdown,
  Menu,
  Icon,
  Loading,
  Tooltip,
} from '@kube-design/components'
import { Panel } from 'components/Base'
import { getLocalTime } from 'utils'

import GatewayStore from 'stores/gateway'
import { ReactComponent as AppGoverIcon } from 'assets/app_gover.svg'
import { trigger } from 'utils/action'
import GatewayEmpty from '../GatewayEmpty'

import styles from './index.scss'

@inject('rootStore')
@observer
@trigger
class InternetAccess extends React.Component {
  store = new GatewayStore()

  componentDidMount() {
    this.getData()
  }

  static defaultProps = {
    type: 'cluster',
  }

  getData = () => {
    const params = { ...this.props.match.params }
    if (this.props.type === 'cluster') {
      delete params.namespace
    }
    this.store.getGateway(params)
  }

  get gateway() {
    return this.store.gateway.data
  }

  get isLoading() {
    return this.store.gateway.isLoading
  }

  get isEmptyData() {
    return isEmpty(toJS(this.gateway))
  }

  get canEdit() {
    return !this.props.actions.includes('manage')
  }

  get itemActions() {
    return [
      {
        key: 'view',
        icon: 'eye',
        text: t('View Gateway'),
      },
      {
        key: 'edit',
        icon: 'pen',
        text: t('Edit Gateway'),
        disabled: this.canEdit,
      },
      {
        key: 'update',
        icon: 'update',
        text: t('Update Gateway'),
        disabled: this.canEdit || this.gateway.createTime != null,
      },
      {
        key: 'delete',
        icon: 'trash',
        text: t('DELETE'),
        disabled: this.canEdit,
      },
    ]
  }

  handleMoreMenuClick = (e, key) => {
    const { cluster, namespace, workspace } = this.props.match.params
    const { type } = this.props

    const url =
      type === 'project'
        ? `/${workspace}/clusters/${cluster}/projects/${namespace}/gateways/${this.gateway.name}`
        : `/clusters/${cluster}/gateways/cluster/${this.gateway.name}`

    switch (key) {
      case 'view':
        this.props.rootStore.routing.push(url)
        break
      case 'edit':
        this.trigger('gateways.edit', {
          cluster,
          namespace,
          detail: toJS(this.gateway._originData),
          success: this.getData,
        })
        break
      case 'update':
        this.trigger('gateways.update', {
          cluster,
          namespace,
          detail: toJS(this.gateway._originData),
          success: this.getData,
        })
        break
      case 'delete':
        this.trigger('gateways.delete', {
          cluster,
          namespace,
          detail: toJS(this.gateway),
          success: this.getData,
        })
        break
      default:
        break
    }
  }

  getNodePorts(gateway) {
    if (!gateway.ports) {
      return '-'
    }

    return gateway.ports.map(port => `${port.name}:${port.nodePort}`).join('; ')
  }

  getExternalIP(gateway) {
    let ip = '-'

    if (!isEmpty(gateway.loadBalancerIngress)) {
      ip = gateway.loadBalancerIngress.join('; ')
    } else if (!isEmpty(gateway.externalIPs)) {
      ip = gateway.externalIPs.join('; ')
    }

    return ip || '-'
  }

  renderMoreMenu() {
    return (
      <Menu onClick={this.handleMoreMenuClick}>
        {this.itemActions.map(action => (
          <Menu.MenuItem key={action.key} disabled={action.disabled}>
            <Icon name={action.icon} type="light" /> {action.text}
          </Menu.MenuItem>
        ))}
      </Menu>
    )
  }

  renderOperations() {
    return (
      <Dropdown
        content={this.renderMoreMenu()}
        trigger="click"
        placement="bottomRight"
      >
        <Button icon="more" type="flat" />
      </Dropdown>
    )
  }

  get gatewayConfig() {
    const {
      creator,
      createTime,
      replicas,
      type,
      ports,
      loadBalancerIngress,
      serviceMeshEnable,
    } = this.gateway

    const gatewayPort = isEmpty(ports)
      ? '-'
      : ports.map(item => `${item.name}:${item.nodePort}`).join(';')

    const gateway_ip = isEmpty(loadBalancerIngress)
      ? '-'
      : loadBalancerIngress.join(';')

    const title = () => (
      <span>
        <span>
          {this.props.type === 'project'
            ? t('PROJECT_GATEWAY')
            : t('CLUSTER_GATEWAY')}
        </span>
        {!createTime ? (
          <Tooltip content={t('UPDATE_GATEWAY_DESC')} placement="top">
            <Icon
              name="update"
              color={{
                primary: '#ffc781',
                secondary: '#f5a623',
              }}
            />
          </Tooltip>
        ) : null}
      </span>
    )

    return [
      [
        {
          key: 'clusterType',
          icon: 'loadbalancer',
          title: title(),

          desc: t('Gateway Type'),
        },
        { key: 'author', title: creator || '-', desc: t('Creator') },
        {
          key: 'createTime',
          title: getLocalTime(createTime).format('YYYY-MM-DD HH:mm:ss'),
          desc: t('Create Time'),
        },
        {
          key: 'edit',
          component: (
            <Dropdown
              theme="dark"
              content={this.renderMoreMenu()}
              trigger="click"
              placement="bottomRight"
            >
              <Button>{t('EDIT')}</Button>
            </Dropdown>
          ),
        },
      ],
      [
        {
          key: 'method',
          icon: 'eip-group',
          title: type,
          desc: t('ACCESS_MODE'),
        },
        {
          key: 'ip',
          icon: 'ip',
          title: gateway_ip,
          desc: t('GATEWAY_ADDRESS_TCAP'),
        },
        {
          key: 'earth',
          icon: 'earth',
          title: gatewayPort,
          desc: t('Host Port'),
        },
        { key: 'pod', icon: 'pod', title: replicas, desc: t('REPLICAS') },
        {
          key: 'appGover',
          icon: <AppGoverIcon />,
          title: serviceMeshEnable
            ? t('GATEWAY_SERVICE_MESH_STATUS_ON')
            : t('GATEWAY_SERVICE_MESH_STATUS_OFF'),
          desc: t('Application Governance'),
        },
      ],
    ]
  }

  handleCreateGateway = () => {
    const { namespace, cluster } = this.props.match.params
    const { type } = this.props

    this.trigger('gateways.create', {
      name: type === 'cluster' ? 'kubesphere-router-kubesphere-system' : '',
      namespace: type === 'cluster' ? 'kubesphere-controls-system' : namespace,
      cluster,
      store: this.store,
      success: this.getData,
    })
  }

  renderInternetAccess = () => {
    return (
      <Panel className="margin-t12">
        {this.gatewayConfig.map((item, index) => {
          return (
            <div className={styles.container} key={index}>
              {item.map(detail => {
                return detail.icon ? (
                  <div
                    className={classNames(styles.header, this.props.className)}
                    key={detail.key}
                  >
                    {typeof detail.icon === 'string' ? (
                      <Icon name={detail.icon} size={40} />
                    ) : (
                      <span className={styles.customIcon}>{detail.icon}</span>
                    )}
                    <div className={styles.item}>
                      <div>{detail.title}</div>
                      <p>{detail.desc}</p>
                    </div>
                  </div>
                ) : detail.component ? (
                  <div
                    className={classNames(styles.item, 'text-right')}
                    key={detail.key}
                  >
                    {detail.component}
                  </div>
                ) : (
                  <div className={styles.item} key={detail.key}>
                    <div>{detail.title}</div>
                    <p>{t(detail.desc)}</p>
                  </div>
                )
              })}
            </div>
          )
        })}

        <div className={styles.annotations}>
          <p>{t('ANNOTATION_PL')}</p>
          <ul>
            {Object.entries(this.gateway.annotations).map(([key, value]) => (
              <li key={key}>
                <span className={styles.key}>{key}</span>
                <span>{value}</span>
              </li>
            ))}
          </ul>
        </div>
      </Panel>
    )
  }

  render() {
    const { component } = this.props.match.params
    const { type } = this.props

    return (
      <div>
        <Loading spinning={this.isLoading}>
          {this.isEmptyData ? (
            <GatewayEmpty
              component={component}
              type={type}
              handleCreateGateway={this.handleCreateGateway}
            />
          ) : (
            this.renderInternetAccess()
          )}
        </Loading>
      </div>
    )
  }
}

export default InternetAccess
