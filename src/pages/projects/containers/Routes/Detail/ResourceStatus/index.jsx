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
import { Panel } from 'components/Base'
import Placement from 'projects/components/Cards/Placement'
import GatewayStore from 'stores/gateway'
import EmptyCard from 'devops/components/Cards/EmptyCard'
import Rule from './Rule'

import styles from './index.scss'

@inject('detailStore')
@observer
class ResourceStatus extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      gateway: {},
    }
    this.store = props.detailStore
    this.gatewayStore = new GatewayStore()
    this.module = this.store.module
  }

  componentDidMount() {
    const detail = toJS(this.store.detail)
    this.getInitGateway(detail)
  }

  getProjectGateway = detail => {
    return this.gatewayStore.getGatewayByProject({
      namespace: detail.namespace,
      cluster: detail.cluster,
    })
  }

  getInitGateway = async detail => {
    const dataList = await this.getProjectGateway(detail)
    const gateway = dataList[1] || dataList[0]
    this.setState({ gateway })
  }

  renderPlacement() {
    const { name, namespace } = this.props.match.params
    const { detail } = this.store
    if (detail.isFedManaged) {
      return (
        <Placement module={this.module} name={name} namespace={namespace} />
      )
    }
    return null
  }

  renderRules() {
    const detail = toJS(this.store.detail)

    const tls = detail.tls || []

    if (isEmpty(detail.rules)) {
      return <EmptyCard desc={t('NO_DATA')} />
    }

    const { workspace, cluster, namespace } = this.props.match.params

    return (
      <Panel title={t('RULES')}>
        {detail.rules.map((rule, i) => (
          <Rule
            key={`${rule.host}-${i}`}
            tls={tls}
            rule={rule}
            gateway={this.state.gateway}
            prefix={`${
              workspace ? `/${workspace}` : ''
            }/clusters/${cluster}/projects/${namespace}`}
          />
        ))}
      </Panel>
    )
  }

  renderContent() {
    return (
      <div>
        {this.renderPlacement()}
        {this.renderRules()}
      </div>
    )
  }

  render() {
    return <div className={styles.main}>{this.renderContent()}</div>
  }
}

export default ResourceStatus
