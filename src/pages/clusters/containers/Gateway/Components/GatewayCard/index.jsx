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
import { ReactComponent as AppGoverIcon } from 'assets/app_gover.svg'
import { Button, Dropdown, Menu, Icon, Tooltip } from '@kube-design/components'
import { Panel } from 'components/Base'
import { getLocalTime } from 'utils'
import classNames from 'classnames'
import { isEmpty, isArray } from 'lodash'

import { trigger } from 'utils/action'
import { CLUSTER_PROVIDERS } from 'utils/constants'
import GatewayEmpty from '../GatewayEmpty'

import styles from './index.scss'

@inject('rootStore')
@observer
@trigger
class GatewayCard extends React.Component {
  static defaultProps = {
    type: 'cluster',
  }

  get gateway() {
    return this.props.detail
  }

  get store() {
    return this.props.store
  }

  get isEmptyData() {
    return isEmpty(toJS(this.gateway))
  }

  get canEdit() {
    return this.props.actions && !this.props.actions.includes('manage')
  }

  get cluster() {
    const { cluster } = this.props.match.params
    const { isFederated } = this.props
    return isFederated ? this.props.cluster.name : cluster
  }

  get itemActions() {
    const updateDisable = this.canEdit || this.gateway.createTime != null
    const baseOpt = [
      {
        key: 'view',
        icon: 'eye',
        text: t('VIEW_DETAILS'),
        disabled: this.canEdit || this.gateway.createTime == null,
      },
      {
        key: 'edit',
        icon: 'pen',
        text: t('EDIT'),
        disabled: this.canEdit || this.gateway.createTime == null,
      },
      {
        key: 'delete',
        icon: 'trash',
        text: t('DISABLE'),
        disabled: this.canEdit,
      },
    ]

    const updateOpt = {
      key: 'update',
      icon: 'update',
      text: t('UPDATE'),
      disabled: updateDisable,
    }

    !updateDisable && baseOpt.splice(2, 0, updateOpt)

    return baseOpt
  }

  get linkUrl() {
    const { prefix } = this.props

    return prefix
      ? `${prefix}/${this.gateway.name}`
      : `/clusters/${this.cluster}/gateways/cluster/${this.gateway.name}`
  }

  handleMoreMenuClick = (e, key) => {
    const { namespace } = this.props.match.params
    const { type, isFederated } = this.props

    if (isFederated) {
      localStorage.setItem('federated-cluster', this.cluster)
    }

    switch (key) {
      case 'view':
        this.props.rootStore.routing.push(this.linkUrl)
        break
      case 'edit':
        this.trigger('gateways.edit', {
          cluster: this.cluster,
          namespace: type === 'cluster' ? '' : namespace,
          detail: toJS(this.gateway._originData),
          store: this.store,
          success: this.props.getData,
        })
        break
      case 'update':
        this.trigger('gateways.update', {
          cluster: this.cluster,
          namespace,
          detail: toJS(this.gateway._originData),
          store: this.store,
          success: this.props.getData,
        })
        break
      case 'delete':
        this.trigger('gateways.delete', {
          cluster: this.cluster,
          type:
            this.props.type === 'cluster'
              ? 'CLUSTER_GATEWAY'
              : 'PROJECT_GATEWAY',
          namespace,
          detail: toJS(this.gateway),
          store: this.store,
          success: this.props.getData,
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

    return ip
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

  title = () => {
    const { createTime } = this.gateway

    return (
      <>
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
                primary: '#f5a623 ',
                secondary: '#ffe1be',
              }}
            />
          </Tooltip>
        ) : null}
      </>
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
      lb,
    } = this.gateway

    const { renderOperations } = this.props
    const gatewayPort = isEmpty(ports)
      ? '-'
      : ports
          .map(
            item =>
              `${item.name.toUpperCase()}: ${
                type === 'NodePort' ? item.nodePort : item.port
              }`
          )
          .join('/')

    const gateway_ip = isEmpty(loadBalancerIngress)
      ? '-'
      : loadBalancerIngress.join(';')

    const lbs = [
      ...CLUSTER_PROVIDERS,
      {
        label: 'OpenELB',
        value: 'OpenELB',
        icon: 'kubernetes',
      },
    ]

    const lbIcon = lb && lbs.find(item => item.value === lb).icon

    const isClusterPermission =
      globals.app.hasPermission({
        module: 'clusters',
        action: 'view',
      }) && this.props.type === 'cluster'

    return [
      [
        {
          key: 'clusterType',
          icon: 'loadbalancer',
          title: this.title(),

          desc: t('TYPE'),
        },
        { key: 'author', title: creator || '-', desc: t('CREATOR') },
        {
          key: 'createTime',
          title: createTime
            ? getLocalTime(createTime).format('YYYY-MM-DD HH:mm:ss')
            : '-',
          desc: t('CREATION_TIME'),
        },
        {
          key: 'edit',
          component: renderOperations ? (
            renderOperations({
              url: this.linkUrl,
              disabled: !isClusterPermission || isEmpty(createTime),
            })
          ) : (
            <Dropdown
              theme="dark"
              content={this.renderMoreMenu()}
              trigger="click"
              placement="bottomRight"
            >
              <Button>{t('MANAGE')}</Button>
            </Dropdown>
          ),
        },
      ],
      [
        {
          key: 'method',
          icon: 'eip-group',
          title: type,
          desc: t('ACCESS_MODE_SCAP'),
        },
        lb
          ? {
              key: 'lb',
              icon: lbIcon,
              title: lb,
              desc: t('LOAD_BALANCER_PROVIDER_SCAP'),
            }
          : {
              key: 'ip',
              icon: 'ip',
              title: gateway_ip,
              desc: t('GATEWAY_ADDRESS_SCAP'),
            },
        {
          key: 'earth',
          icon: 'earth',
          title: gatewayPort,
          desc: t('NODE_PORTS_SCAP'),
        },
        {
          key: 'pod',
          icon: 'pod',
          title: replicas,
          desc: replicas === 1 ? t('REPLICA') : t('REPLICA_PL'),
        },
        {
          key: 'appGover',
          icon: <AppGoverIcon />,
          title: serviceMeshEnable ? t('ON') : t('OFF'),
          desc: t('TRACING'),
        },
      ],
    ]
  }

  handleCreateGateway = () => {
    const { namespace } = this.props.match.params
    const { type, getData } = this.props

    this.trigger('gateways.create', {
      name: type === 'cluster' ? 'kubesphere-router-kubesphere-system' : '',
      namespace: type === 'cluster' ? 'kubesphere-controls-system' : namespace,
      cluster: this.cluster,
      store: this.store,
      success: getData,
    })
  }

  renderInternetAccess = () => {
    const { isFederated, title } = this.props

    return (
      <>
        {title}
        <Panel
          className={classNames('margin-t12', {
            [styles.federatedContainer]: isFederated,
          })}
        >
          {this.gatewayConfig.map((item, index) => {
            return (
              <div className={styles.container} key={index}>
                {item.map(detail => {
                  return detail.icon ? (
                    <div className={styles.header} key={detail.key}>
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

          {this.gateway.type !== 'NodePort' && (
            <div
              className={classNames(styles.annotations, {
                [styles.bgWhite]: isFederated,
              })}
            >
              <p>{t('ANNOTATION_PL')}</p>
              <ul>
                {isEmpty(this.gateway.annotations) ? (
                  <li>{t('NO_DATA')}</li>
                ) : (
                  Object.entries(this.gateway.annotations).map(
                    ([key, value]) => (
                      <li key={key}>
                        <span className={styles.key}>{key}</span>
                        <span>{value}</span>
                      </li>
                    )
                  )
                )}
              </ul>
            </div>
          )}
        </Panel>
      </>
    )
  }

  render() {
    const { component, namespace } = this.props.match.params
    const { type, title, gatewayList } = this.props
    const hasClusterGateway =
      isArray(gatewayList) && gatewayList[0] && !gatewayList[1]
    return (
      <div>
        {this.isEmptyData ? (
          (namespace && type === 'cluster') ||
          (hasClusterGateway && namespace && type === 'project') ? null : (
            <>
              {title}
              <GatewayEmpty
                component={component}
                type={type}
                handleCreateGateway={this.handleCreateGateway}
                cluster={this.cluster}
                canEdit={this.canEdit}
              />
            </>
          )
        ) : (
          this.renderInternetAccess()
        )}
      </div>
    )
  }
}

export default GatewayCard
