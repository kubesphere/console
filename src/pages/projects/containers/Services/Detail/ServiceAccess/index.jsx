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
import { Panel, Text } from 'components/Base'

import RouterStore from 'stores/router'

import ServicePort from './ServicePort'

import styles from './index.scss'

@inject('detailStore', 'fedDetailStore')
@observer
export default class ResourceStatus extends React.Component {
  constructor(props) {
    super(props)

    this.store = props.detailStore
    this.module = props.detailStore.module
    this.fedStore = props.fedDetailStore
    this.routerStore = new RouterStore()
  }

  componentDidMount() {
    const { namespace } = this.props.match.params
    this.routerStore.getGateway({ namespace })
  }

  renderExternal() {
    const detail = toJS(this.store.detail)

    return (
      <Panel title={t('External Service')}>
        <Text title={detail.externalName} description={t('ExternalName')} />
      </Panel>
    )
  }

  renderServiceAccess() {
    const { name, namespace } = this.store.detail
    const { clusters } = this.fedStore.detail
    const gateway = this.routerStore.gateway.data
    return (
      <div>
        <div className={styles.title}>{t('Service Access')}</div>
        {clusters.map(cluster => (
          <ServicePort
            key={cluster.name}
            name={name}
            namespace={namespace}
            cluster={cluster.name}
            gateway={gateway}
          />
        ))}
      </div>
    )
  }

  renderContent() {
    const detail = toJS(this.store.detail)

    if (detail.specType === 'ExternalName') {
      return this.renderExternal()
    }

    if (detail.isFedManaged) {
      return this.renderServiceAccess()
    }

    return this.renderPorts()
  }

  render() {
    return <div className={styles.main}>{this.renderContent()}</div>
  }
}
