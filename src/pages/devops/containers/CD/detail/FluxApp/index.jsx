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

import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx'

import PropTypes from 'prop-types'
import Table from 'components/Tables/List'
import { get } from 'lodash'
import styles from './index.scss'

@inject('detailStore')
@observer
class FluxApp extends React.Component {
  static propTypes = {
    data: PropTypes.array,
    loading: PropTypes.bool,
  }

  refreshTimer = setInterval(() => this.getDetail(), 4000)

  getDetail = () => {
    const { params } = this.props.match
    this.props.detailStore.fetchDetail({
      name: params.cd,
      devops: params.devops,
      cluster: params.cluster,
    })
  }

  componentWillUnmount() {
    if (this.refreshTimer) {
      clearInterval(this.refreshTimer)
      this.refreshTimer = null
    }
  }

  get detail() {
    return toJS(this.props.detailStore.detail)
  }

  get cluster() {
    return this.props.match.params.cluster
  }

  get workspace() {
    return this.props.match.params.workspace
  }

  getHRData = () => {
    const hrs = get(
      this.detail,
      '_originData.spec.fluxApp.spec.config.helmRelease'
    )
    if (hrs === undefined) {
      return
    }
    const hrStatus = get(this.detail, 'fluxHelmReleaseStatus')
    let newData = []
    for (const d of hrs.deploy) {
      const data = {}
      const cluster = d.destination.kubeConfig
        ? d.destination.kubeConfig
        : 'default'
      data.destination = `${cluster}/${d.destination.targetNamespace}`
      data.name = this.getAppName(
        d.destination.kubeConfig,
        d.destination.targetNamespace
      )
      data.status =
        hrStatus[data.name].conditions[0].status === 'True'
          ? hrStatus[data.name].conditions[0].type
          : `${hrStatus[data.name].conditions[0].type}/False`
      data.message = hrStatus[data.name].conditions[0].message
      data.interval = d.interval
      newData = [...newData, data]
    }
    return newData
  }

  getKusData = () => {
    const kus = get(
      this.detail,
      '_originData.spec.fluxApp.spec.config.kustomization'
    )
    if (kus === undefined) {
      return
    }
    const kusStatus = get(this.detail, 'fluxKustomizationStatus')
    let newData = []
    for (const k of kus) {
      const data = {}
      const cluster = k.destination.kubeConfig
        ? k.destination.kubeConfig
        : 'default'
      data.destination = `${cluster}/${k.destination.targetNamespace}`
      data.name = this.getAppName(
        k.destination.kubeConfig,
        k.destination.targetNamespace
      )
      data.status =
        kusStatus[data.name].conditions[0].status === 'True'
          ? kusStatus[data.name].conditions[0].type
          : `${kusStatus[data.name].conditions[0].type}/False`
      data.message = kusStatus[data.name].conditions[0].message
      data.interval = k.interval
      newData = [...newData, data]
    }
    return newData
  }

  getAppName = (cluster, namespace) => {
    return cluster ? cluster + namespace : namespace
  }

  getColumns = () => {
    return [
      {
        title: t('NAME'),
        dataIndex: 'name',
        width: '20%',
      },
      {
        title: t('部署位置'),
        dataIndex: 'destination',
        width: '20%',
      },
      {
        title: t('时间间隔'),
        dataIndex: 'interval',
        width: '20%',
      },
      {
        title: t('状态'),
        dataIndex: 'status',
        width: '20%',
      },
      {
        title: t('消息'),
        dataIndex: 'message',
        width: '20%',
      },
    ]
  }

  renderTable = () => {
    const hrs = this.getHRData()
    const kus = this.getKusData()

    return hrs ? (
      <Table
        hideHeader
        hideFooter
        rowKey="name"
        data={hrs}
        showEmpty={hrs === undefined}
        columns={this.getColumns()}
        name="HelmRelease"
      />
    ) : (
      <Table
        hideHeader
        hideFooter
        rowKey="name"
        data={kus}
        showEmpty={kus === undefined}
        columns={this.getColumns()}
        name="Kustomization"
      />
    )
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.sync_result}>
          <h3>{t('应用')}</h3>
          {this.renderTable()}
        </div>
      </div>
    )
  }
}

export default FluxApp
