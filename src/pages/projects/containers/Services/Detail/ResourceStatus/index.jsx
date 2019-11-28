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
import { observer } from 'mobx-react'
import { isEmpty } from 'lodash'
import { Tooltip, Icon } from '@pitrix/lego-ui'
import { Button, Panel, Text } from 'components/Base'
import PodsCard from 'components/Cards/Pods'
import Workloads from 'projects/components/Cards/Workloads'

import RouterStore from 'stores/router'

import styles from './index.scss'

@observer
class ResourceStatus extends React.Component {
  constructor(props) {
    super(props)

    this.module = props.module
    this.store = props.detailStore
    this.routerStore = new RouterStore()
  }

  componentDidMount() {
    const { namespace } = this.props.match.params
    this.routerStore.getGateway({ namespace })
  }

  get prefix() {
    const { namespace } = this.props.match.params
    return `/projects/${namespace}`
  }

  renderPorts() {
    const detail = toJS(this.store.detail)
    const gateway = toJS(this.routerStore.gateway.data)

    if (isEmpty(detail.ports)) {
      return null
    }

    return (
      <Panel title={t('Ports')}>
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
      </Panel>
    )
  }

  renderWorkloads() {
    const { data, isLoading } = toJS(this.store.workloads)
    return <Workloads data={data} prefix={this.prefix} isLoading={isLoading} />
  }

  renderPods() {
    const { namespace, name } = this.props.match.params

    return (
      <PodsCard
        detail={this.store.detail}
        prefix={`/projects/${namespace}/${this.module}/${name}`}
      />
    )
  }

  renderExternal() {
    const detail = toJS(this.store.detail)

    return (
      <Panel title={t('External Service')}>
        <Text title={detail.externalName} description={t('ExternalName')} />
      </Panel>
    )
  }

  renderContent() {
    const detail = toJS(this.store.detail)

    if (detail.specType === 'ExternalName') {
      return this.renderExternal()
    }

    return (
      <div>
        {this.renderPorts()}
        {this.renderWorkloads()}
        {this.renderPods()}
      </div>
    )
  }

  render() {
    return <div className={styles.main}>{this.renderContent()}</div>
  }
}

export default ResourceStatus
