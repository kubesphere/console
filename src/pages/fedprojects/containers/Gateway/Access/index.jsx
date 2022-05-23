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

import { isEmpty, get } from 'lodash'
import React from 'react'
import { observable, toJS } from 'mobx'
import { observer, inject } from 'mobx-react'
import { Tooltip, Icon, Button } from '@kube-design/components'

import { Panel, Text } from 'components/Base'
import GatewayCard from 'clusters/containers/Gateway/Components/GatewayCard'

import ClusterTitle from 'components/Clusters/ClusterTitle'
import GatewayStore from 'stores/gateway'
import { trigger } from 'utils/action'

import { compareVersion } from 'utils'
import styles from './index.scss'

@inject('rootStore')
@observer
@trigger
class InternetAccess extends React.Component {
  constructor(props) {
    super(props)

    this.store = new GatewayStore()
  }

  get canEdit() {
    return this.props.actions.includes('manage')
  }

  get cluster() {
    return this.props.cluster.name
  }

  get prefix() {
    return this.props.match.url
  }

  @observable
  gatewayList = []

  getProjectGateway = () => {
    const params = { ...this.props.match.params }
    return this.store.getGatewayByProject({ ...params, cluster: this.cluster })
  }

  getInitGateway = async () => {
    const dataList = await this.getProjectGateway()
    this.gatewayList = dataList
  }

  componentDidMount() {
    this.getInitGateway()
  }

  showGatewaySetting = () => {
    const { namespace } = this.props.match.params

    this.trigger('gateways.create', {
      name: '',
      namespace,
      cluster: this.cluster,
      store: this.store,
      success: this.getInitGateway,
    })
  }

  renderClusterGatewayTitle = () => (
    <div className={styles.title}>
      <span> {t('CLUSTER_GATEWAY')}</span>
      <Tooltip content={t('CLUSTER_GATEWAY_GUIDE_DESC')} placement="top">
        <Icon name="question" size={20} />
      </Tooltip>
    </div>
  )

  renderProjectTitle = () => {
    return <div className={styles.title}>{t('PROJECT_GATEWAY')}</div>
  }

  renderEmpty() {
    const { cluster } = this.props

    const clusterVersion = globals.app.isMultiCluster
      ? get(globals, `clusterConfig.${cluster.name}.ksVersion`)
      : get(globals, 'ksConfig.ksVersion')

    const isDisable = compareVersion(clusterVersion, 'v3.2.0') < 0

    return (
      <Panel>
        <div className={styles.empty}>
          <div className={styles.cluster}>
            <ClusterTitle cluster={cluster} theme="light" />
          </div>
          <Text
            className={styles.desc}
            title={
              <p className={styles.descTitle}>
                <span>{t('GATEWAY_NOT_ENABLED')}</span>
                {isDisable ? (
                  <Tooltip
                    content={t('CLUSTER_UPGRADE_REQUIRED', { version: '3.2' })}
                    placement="top"
                  >
                    <Icon
                      name="update"
                      size={20}
                      color={{
                        primary: '#f5a623 ',
                        secondary: '#ffe1be',
                      }}
                    />
                  </Tooltip>
                ) : null}
              </p>
            }
            description={t('ENABLE_GATEWAY_TIP')}
          />
          {this.canEdit && (
            <Button
              type="control"
              onClick={this.showGatewaySetting}
              disabled={isDisable}
            >
              {t('ENABLE_GATEWAY')}
            </Button>
          )}
        </div>
      </Panel>
    )
  }

  renderOperations = ({ url, disabled }) => {
    return (
      <Button
        disabled={disabled}
        onClick={() => {
          this.props.rootStore.routing.push(url)
        }}
      >
        {t('VIEW_DETAILS')}
      </Button>
    )
  }

  renderInternetAccess(data) {
    const { cluster } = this.props

    return (
      <div className={styles.container}>
        <div className={styles.cluster}>
          <ClusterTitle cluster={cluster} theme="light" />
        </div>

        {data.map((item, index, arr) => {
          const isCluster = index === 0
          return (
            <GatewayCard
              type={isCluster ? 'cluster' : 'project'}
              {...this.props}
              bodyClassName={styles.bodyClass}
              itemClassName={styles.itemClass}
              isFederated={true}
              getData={this.getInitGateway}
              detail={item}
              key={index}
              store={this.store}
              title={
                isCluster
                  ? this.renderClusterGatewayTitle()
                  : this.renderProjectTitle()
              }
              prefix={isCluster ? null : this.prefix}
              renderOperations={isCluster ? this.renderOperations : null}
              gatewayList={toJS(arr)}
            />
          )
        })}
      </div>
    )
  }

  renderContent() {
    const isEmptyGateway = this.gatewayList.every(item => isEmpty(toJS(item)))
    if (isEmptyGateway) {
      return this.renderEmpty()
    }

    return this.renderInternetAccess(this.gatewayList)
  }

  render() {
    return <div>{this.renderContent()}</div>
  }
}

export default InternetAccess
