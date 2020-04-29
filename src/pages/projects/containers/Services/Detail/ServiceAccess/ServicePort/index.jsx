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

import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Tooltip, Icon } from '@pitrix/lego-ui'
import { isEmpty } from 'lodash'
import { Button, Panel, Indicator, Tag, Text } from 'components/Base'

import ClusterStore from 'stores/cluster'
import ServiceStore from 'stores/service'

import styles from './index.scss'

@observer
export default class ServicePort extends Component {
  serviceStore = new ServiceStore()

  clusterStore = new ClusterStore()

  componentDidMount() {
    const { cluster, name, namespace } = this.props
    this.serviceStore.fetchDetail({ cluster, name, namespace })
    this.clusterStore.fetchDetail({ name: cluster })
  }

  renderPorts() {
    const { gateway } = this.props
    const detail = this.serviceStore.detail

    if (isEmpty(detail.ports)) {
      return null
    }

    return (
      <div className={styles.portsWrapper}>
        {detail.ports.map((port, index) => (
          <div key={index} className={styles.ports}>
            <Icon name="pod" size={40} />
            <div className={styles.port}>
              <p>
                <strong>{port.targetPort}</strong>
              </p>
              <p>{t('Container Port')}</p>
            </div>
            <div className={styles.protocol}>→ {port.protocol} → </div>
            <Icon name="network-router" size={40} />
            <div className={styles.port}>
              <p>
                <strong>{port.port}</strong>
              </p>
              <p>{t('Service Port')}</p>
            </div>
            {port.nodePort && (
              <>
                <div className={styles.protocol}>→ {port.protocol} → </div>
                <Icon name="nodes" size={40} />
                <div className={styles.port}>
                  <p>
                    <strong>{port.nodePort}</strong>
                  </p>
                  <div>
                    {t('Node Port')}
                    <Tooltip
                      content={t('SERVICE_NODE_PORT_DESC')}
                      trigger="hover"
                    >
                      <Icon name="information" />
                    </Tooltip>
                  </div>
                </div>
                {gateway.loadBalancerIngress && (
                  <a
                    href={`http://${gateway.loadBalancerIngress}:${
                      port.nodePort
                    }`}
                    target="_blank"
                  >
                    <Button className={styles.access} noShadow>
                      {t('Click to visit')}
                    </Button>
                  </a>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    )
  }

  render() {
    const { cluster } = this.props
    const clusterDetail = this.clusterStore.detail
    const serviceDetail = this.serviceStore.detail

    return (
      <Panel>
        <div className={styles.header}>
          <div className={styles.cluster}>
            <Icon
              className={styles.icon}
              type="light"
              name="kubernetes"
              size={40}
            />
            <Indicator
              className={styles.indicator}
              type={clusterDetail.status}
            />
            <div className={styles.text}>
              <div>{cluster}</div>
              <p>{clusterDetail.description || '-'}</p>
            </div>
            {clusterDetail.group && (
              <Tag className={styles.group} type="warning">
                {clusterDetail.group}
              </Tag>
            )}
          </div>
          <Text
            icon="eip-pool"
            title={`${serviceDetail.name}.${serviceDetail.namespace}.svc`}
            description={t('集群内部访问方式(DNS)')}
          />
          <Text title={serviceDetail.clusterIP} description={t('Virtual IP')} />
          <Text
            title={serviceDetail.clusterIP}
            description={t('External IP')}
          />
        </div>
        <div className={styles.content}>{this.renderPorts()}</div>
      </Panel>
    )
  }
}
