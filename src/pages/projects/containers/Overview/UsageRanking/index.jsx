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
import { Icon } from '@pitrix/lego-ui'
import { Panel } from 'components/Base'
import { getValueByUnit, getSuitableUnit } from 'utils/monitoring'
import Store from 'stores/rank/workload'

import Select from 'clusters/components/Cards/Monitoring/UsageRank/select'

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
      namespaces: get(this.props.match, 'params.namespace'),
    })
  }

  componentDidMount() {
    this.store.fetchAll()
  }

  getWorkloadLink(node) {
    const { owner_kind } = node

    if (owner_kind === 'Pod') {
      return
    }

    const { resource_name = '' } = node
    const workloadName = resource_name.replace(/\w+:/, '')
    const { namespace } = this.props.match.params

    const LINK_MAP = {
      Deployment: `/projects/${namespace}/deployments/${workloadName}`,
      StatefulSet: `/projects/${namespace}/statefulsets/${workloadName}`,
      DaemonSet: `/projects/${namespace}/daemonsets/${workloadName}`,
    }

    return LINK_MAP[owner_kind]
  }

  renderHeader() {
    return (
      <div className={styles.header}>
        <div className={styles.title}>{t('Resource Name')}</div>
        <Select className={styles.select} store={this.store} />
      </div>
    )
  }

  renderEmpty() {
    return (
      <div className={styles.empty}>
        <Icon name="backup" size={32} />
        <div>{t('No relevant data')}</div>
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
          const workloadName = app.resource_name.replace(/\w+:/, '')

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
      <Panel
        className={styles.wrapper}
        title={`${t('Resources Usage Ranking')}(Top5)`}
      >
        {this.renderHeader()}
        {this.renderContent()}
      </Panel>
    )
  }
}

export default UsageRanking
