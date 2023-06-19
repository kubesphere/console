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
import { inject, observer } from 'mobx-react'
import { get, isEmpty } from 'lodash'
import { Link } from 'react-router-dom'
import { Icon, Select } from '@kube-design/components'
import { Panel } from 'components/Base'
import { getSuitableUnit, getValueByUnit } from 'utils/monitoring'
import Store from 'stores/rank/workload'
import styles from './index.scss'

const UNITS = {
  workload_cpu_usage: 'cpu',
  workload_memory_usage_wo_cache: 'memory',
  workload_net_bytes_transmitted: 'bandwidth',
  workload_net_bytes_received: 'bandwidth',
}

@inject('rootStore')
@observer
class UsageRanking extends React.Component {
  constructor(props) {
    super(props)

    this.store = new Store({
      cluster: get(props.match, 'params.cluster'),
      namespaces: get(props.match, 'params.namespace'),
    })
  }

  componentDidMount() {
    this.store.fetchAll()
  }

  get options() {
    return this.store.sort_metric_options.map(option => ({
      value: option,
      label: t(`SORT_BY_${option.toUpperCase()}`),
    }))
  }

  getWorkloadLink(node) {
    const { owner_kind } = node

    if (owner_kind === 'Pod') {
      return
    }

    const { workload = '' } = node
    const workloadName = workload.replace(/\w+:/, '')
    const { workspace, cluster, namespace } = this.props.match.params
    const prefix = `${
      workspace ? `/${workspace}` : ''
    }/clusters/${cluster}/projects/${namespace}`
    const LINK_MAP = {
      Deployment: `${prefix}/deployments/${workloadName}`,
      StatefulSet: `${prefix}/statefulsets/${workloadName}`,
      DaemonSet: `${prefix}/daemonsets/${workloadName}`,
    }

    return LINK_MAP[owner_kind]
  }

  renderHeader() {
    return (
      <div className={styles.header}>
        <div className={styles.title}>{t('RESOURCE_NAME')}</div>
        <Select
          className={styles.select}
          value={this.store.sort_metric}
          onChange={this.store.changeSortMetric}
          options={this.options}
        />
      </div>
    )
  }

  renderEmpty() {
    return (
      <div className={styles.empty}>
        <Icon name="backup" size={32} />
        <div>{t('NO_DATA')}</div>
      </div>
    )
  }

  renderContent() {
    const data = toJS(this.store.data)
    if (!this.store.isLoading && isEmpty(data)) {
      return this.renderEmpty()
    }

    return (
      <div className={styles.content}>
        {data.slice(0, 5).map(app => {
          const ICON_MAP = {
            Deployment: 'backup',
            StatefulSet: 'stateful-set',
            DaemonSet: 'deamon-set',
            Pod: 'pod',
            Default: 'backup',
          }

          const link = this.getWorkloadLink(app)
          const workloadName = app.workload.replace(/\w+:/, '')

          const percent =
            (app[this.store.sort_metric] * 100) /
            data[0][this.store.sort_metric]

          const unit = getSuitableUnit(
            app[this.store.sort_metric],
            UNITS[this.store.sort_metric]
          )

          return (
            <div className={styles.app} key={workloadName}>
              <div className={styles.appContent}>
                <Icon
                  name={ICON_MAP[app.owner_kind] || ICON_MAP.Default}
                  type="dark"
                  size={40}
                />
                <div className={styles.text}>
                  <div className="relative" data-tooltip={workloadName}>
                    <div>
                      {link ? (
                        <Link to={link}>{workloadName}</Link>
                      ) : (
                        workloadName
                      )}
                    </div>
                  </div>
                  <p>{t(app.owner_kind)}</p>
                </div>
                <div className={styles.value}>
                  {getValueByUnit(app[this.store.sort_metric], unit) || 0}
                  <span style={{ fontSize: 12 }}> {unit}</span>
                </div>
              </div>
              <div
                className={styles.background}
                style={{
                  width: `${percent.toFixed(2)}%`,
                }}
              />
            </div>
          )
        })}
      </div>
    )
  }

  render() {
    return (
      <Panel className={styles.wrapper} title={t('TOP_5_FOR_RESOURCE_USAGE')}>
        {this.renderHeader()}
        {this.renderContent()}
      </Panel>
    )
  }
}

export default UsageRanking
