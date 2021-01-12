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
import PodsCard from 'components/Cards/Pods'
import WorkloadsCard from 'projects/components/Cards/Workloads'
import Placement from 'projects/components/Cards/Placement'

import Ports from '../Ports'

import styles from './index.scss'

@inject('detailStore')
@observer
export default class ResourceStatus extends React.Component {
  store = this.props.detailStore

  componentWillUnmount() {
    this.disposer && this.disposer()
  }

  get prefix() {
    const { workspace, cluster } = this.props.match.params

    return `${workspace ? `/${workspace}` : ''}/clusters/${cluster}`
  }

  renderPods() {
    return <PodsCard prefix={this.prefix} detail={this.store.detail} />
  }

  renderExternal() {
    const detail = toJS(this.store.detail)

    return (
      <Panel title={t('External Service')}>
        <Text title={detail.externalName} description={t('ExternalName')} />
      </Panel>
    )
  }

  renderPlacement() {
    const { name, namespace } = this.props.match.params
    const { detail } = this.store
    if (detail.isFedManaged) {
      return (
        <Placement
          module={this.store.module}
          name={name}
          namespace={namespace}
        />
      )
    }
    return null
  }

  renderPorts() {
    const detail = toJS(this.store.detail)

    return (
      <Panel title={t('Service Ports')}>
        <Ports detail={detail} />
      </Panel>
    )
  }

  renderWorkloads() {
    const detail = toJS(this.store.detail)
    const { cluster, namespace } = detail

    return (
      <WorkloadsCard
        selector={detail.selector}
        cluster={cluster}
        namespace={namespace}
        prefix={this.prefix}
        module={`${detail.workloadType.toLowerCase()}s`}
      />
    )
  }

  renderContent() {
    const { detail } = this.store

    if (detail.specType === 'ExternalName') {
      return this.renderExternal()
    }

    return (
      <div>
        {this.renderPlacement()}
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
