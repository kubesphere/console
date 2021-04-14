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
import { observer } from 'mobx-react'
import classnames from 'classnames'
import { get } from 'lodash'

import { TypeSelect } from 'components/Base'
import ContainerTerminal from 'components/Terminal'
import UserTip from 'components/Cards/Tips'
import fullScreen from 'components/Modals/FullscreenModal'
import TerminalStore from 'stores/terminal'
import ClusterStore from 'stores/cluster'
import { CLUSTER_PROVIDER_ICON } from 'utils/constants'

import styles from './index.scss'

@fullScreen
@observer
export default class KubeCtlModal extends React.Component {
  state = {
    cluster: this.props.cluster || '',
  }

  store = new TerminalStore()

  clusterStore = new ClusterStore()

  terminalRef = React.createRef()

  componentDidMount() {
    this.fetchData()
  }

  get clusters() {
    return this.clusterStore.list.data
      .filter(item => item.isReady)
      .map(item => ({
        label: item.name,
        value: item.name,
        icon: CLUSTER_PROVIDER_ICON[item.provider] || 'kubernetes',
        version: get(item, 'configz.ksVersion'),
        description: item.provider,
      }))
  }

  async fetchData() {
    if (!globals.app.isMultiCluster) {
      return this.store.fetchKubeCtl({
        clusterVersion: get(globals, 'ksConfig.ksVersion'),
      })
    }

    if (!this.props.cluster) {
      await this.clusterStore.fetchListByK8s()
      const cluster = get(this.clusters, '[0].value')
      const clusterVersion = get(this.clusters, '[0].version')
      this.setState({ cluster, clusterVersion }, () => {
        this.store.fetchKubeCtl({ cluster, clusterVersion })
      })
    } else {
      const { cluster, clusterVersion } = this.props
      let version = clusterVersion
      if (!version) {
        const clusterDetail = await this.clusterStore.fetchDetail({
          name: cluster,
        })
        version = get(clusterDetail, 'configz.ksVersion')
      }
      this.store.fetchKubeCtl({ cluster, clusterVersion: version })
    }
  }

  handleClusterChange = cluster => {
    const clusterObj = this.clusters.find(item => item.value === cluster)

    if (clusterObj) {
      this.setState({ cluster }, () => {
        this.store.fetchKubeCtl({ cluster, clusterVersion: clusterObj.version })
      })
    }
  }

  onTipsToggle = () => {
    const { current } = this.terminalRef
    current && current.resizeTerminal()
  }

  render() {
    return (
      <UserTip
        wrapperClassName={styles.kubectl}
        onToggleTip={this.onTipsToggle}
        localStorageKey="kubectl-doc"
        article={this.renderTerminal()}
        tips={this.renderTips()}
        onToggle={this.onTipsToggle}
      />
    )
  }

  renderTips() {
    return (
      <div>
        {!this.props.cluster && globals.app.isMultiCluster && (
          <TypeSelect
            options={this.clusters}
            value={this.state.cluster}
            onChange={this.handleClusterChange}
          />
        )}
        <div className={classnames('markdown-body', styles.doc)}>
          {t.html('KUBECTL_TIP')}
        </div>
      </div>
    )
  }

  renderTerminal() {
    return (
      <div className={classnames(styles.pane, styles.terminal)}>
        <ContainerTerminal
          isLoading={this.store.kubectl.isLoading}
          url={this.store.kubeWebsocketUrl}
          ref={this.terminalRef}
        />
      </div>
    )
  }
}
