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

import { Dropdown, Menu, Icon } from '@pitrix/lego-ui'
import { Panel, Button, Text } from 'components/Base'
import GatewaySettingModal from 'projects/components/Modals/GatewaySetting'
import DeleteModal from 'components/Modals/Delete'
import ClusterTitle from 'components/Clusters/ClusterTitle'
import RouterStore from 'stores/router'

import styles from './index.scss'

@inject('rootStore')
@observer
class InternetAccess extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showGatewaySetting: false,
      showDelete: false,
    }

    this.store = new RouterStore()
  }

  componentDidMount() {
    const { namespace, cluster } = this.props
    this.store.getGateway({ namespace, cluster: cluster.name })
  }

  get canEdit() {
    return this.props.actions.includes('manage')
  }

  get itemActions() {
    return [
      {
        key: 'edit',
        icon: 'pen',
        text: t('Edit Gateway'),
      },
      {
        key: 'delete',
        icon: 'trash',
        text: t('Delete'),
      },
    ]
  }

  showGatewaySetting = () => {
    this.setState({ showGatewaySetting: true })
  }

  hideGatewaySetting = () => {
    this.setState({ showGatewaySetting: false })
  }

  handleGatewaySetting = data => {
    this.hideGatewaySetting()
    const { cluster, namespace } = this.props
    const gateway = toJS(this.store.gateway.data)

    const func = isEmpty(gateway)
      ? this.store.addGateway.bind(this.store)
      : this.store.updateGateway.bind(this.store)

    func({ cluster: cluster.name, namespace }, data).then(() => {
      this.store.getGateway({ cluster: cluster.name, namespace })
    })
  }

  hideDelete = () => {
    this.setState({ showDelete: false })
  }

  handleDelete = () => {
    const { cluster, namespace } = this.props
    this.store.deleteGateway({ cluster: cluster.name, namespace }).then(() => {
      this.hideDelete()
      this.store.getGateway({ cluster: cluster.name, namespace })
    })
  }

  handleMoreMenuClick = (e, key) => {
    switch (key) {
      case 'edit':
        this.setState({ showGatewaySetting: true })
        break
      case 'delete':
        this.setState({ showDelete: true })
        break
      default:
        break
    }
  }

  getNodePorts(gateway) {
    if (!gateway.ports) {
      return '-'
    }

    return gateway.ports.map(port => `${port.name}:${port.nodePort}`).join(', ')
  }

  getExternalIP(gateway) {
    let ip = '-'

    if (isEmpty(gateway.externalIPs)) {
      ip = gateway.loadBalancerIngress
    } else {
      ip = gateway.externalIPs.join(', ')
    }

    return ip || '-'
  }

  renderEmpty() {
    const { cluster } = this.props
    return (
      <Panel>
        <div className={styles.empty}>
          <div className={styles.cluster}>
            <ClusterTitle cluster={cluster} theme="light" />
          </div>
          <Text
            title={t('Gateway Not Set')}
            description={t('PROJECT_INTERNET_ACCESS_DESC')}
          />
          {this.canEdit && (
            <Button type="control" onClick={this.showGatewaySetting}>
              {t('Set Gateway')}
            </Button>
          )}
        </div>
      </Panel>
    )
  }

  renderMoreMenu() {
    return (
      <Menu onClick={this.handleMoreMenuClick}>
        {this.itemActions.map(action => (
          <Menu.MenuItem key={action.key}>
            <Icon name={action.icon} /> {action.text}
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

  renderInternetAccess(gateway) {
    const { cluster } = this.props
    return (
      <Panel>
        <div className={styles.cluster}>
          <ClusterTitle cluster={cluster} theme="light" />
        </div>
        <div className={styles.content}>
          <div className={styles.detail}>
            <Text
              icon="eip-group"
              title={gateway.type}
              description={t('Access Method')}
            />
            {gateway.type === 'NodePort' ? (
              <>
                <Text
                  title={gateway.loadBalancerIngress || '-'}
                  description={t('Gateway Address')}
                />
                <Text
                  title={this.getNodePorts(gateway)}
                  description={t('Node Port')}
                />
              </>
            ) : (
              <Text
                title={this.getExternalIP(gateway)}
                description={t('External IP')}
              />
            )}
            {globals.app.hasKSModule('servicemesh') && (
              <Text
                title={
                  gateway.serviceMeshEnable
                    ? t('GATEWAY_SERVICE_MESH_STATUS_ON')
                    : t('GATEWAY_SERVICE_MESH_STATUS_OFF')
                }
                description={t('Application Governance')}
              />
            )}
          </div>
          {gateway.type === 'LoadBalancer' && (
            <div className={styles.annotations}>
              <p>{t('Annotations')}</p>
              <ul>
                {Object.entries(gateway.annotations).map(([key, value]) => (
                  <li key={key}>
                    <span className={styles.key}>{key}</span>
                    <span>{value}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {this.canEdit && (
          <div className={styles.actions}>
            <Dropdown
              className="dropdown-default"
              content={this.renderMoreMenu()}
              trigger="click"
              placement="bottomRight"
            >
              <Button>{t('Edit')}</Button>
            </Dropdown>
          </div>
        )}
      </Panel>
    )
  }

  renderContent() {
    const { data, isLoading } = toJS(this.store.gateway)

    if (isLoading) {
      return null
    }

    if (isEmpty(data)) {
      return this.renderEmpty()
    }

    return this.renderInternetAccess(data)
  }

  renderModals() {
    return (
      <div>
        <GatewaySettingModal
          detail={toJS(this.store.gateway.data)}
          visible={this.state.showGatewaySetting}
          onOk={this.handleGatewaySetting}
          onCancel={this.hideGatewaySetting}
          isSubmitting={this.store.isSubmitting}
        />
        <DeleteModal
          title={t('DELETE_INTERNET_ACCESS_TITLE')}
          desc={t('DELETE_INTERNET_ACCESS_DESC')}
          visible={this.state.showDelete}
          onOk={this.handleDelete}
          onCancel={this.hideDelete}
          isSubmitting={this.store.isSubmitting}
        />
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.renderContent()}
        {this.canEdit && this.renderModals()}
      </div>
    )
  }
}

export default InternetAccess
