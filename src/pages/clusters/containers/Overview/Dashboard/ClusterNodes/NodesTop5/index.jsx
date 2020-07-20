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

import { get } from 'lodash'
import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import { Icon, Select } from '@pitrix/lego-ui'
import { Button, Text } from 'components/Base'

import NodeStore from 'stores/rank/node'

import styles from './index.scss'

const storeParams = {
  limit: 5,
  page: 1,
  sort_type: 'desc',
}

@observer
export default class NodesTop5 extends Component {
  store = new NodeStore({ ...storeParams, cluster: this.cluster })

  componentDidMount() {
    this.store.fetchAll()
  }

  get cluster() {
    return this.props.cluster
  }

  get options() {
    return this.store.sort_metric_options.map(option => ({
      value: option,
      label: t(`Sort By ${option}`),
    }))
  }

  render() {
    const { data } = this.store
    return (
      <div>
        <div className={styles.header}>
          <div>{t('Node Usage Top5')}</div>
          <Select
            className={styles.select}
            value={this.store.sort_metric}
            onChange={this.store.changeSortMetric}
            options={this.options}
          />
        </div>
        <div className={styles.list}>
          {data.map(node => (
            <div key={node.node}>
              <Icon name="nodes" size={40} className="margin-r12" />
              <Text
                title={
                  <Link to={`/clusters/${this.cluster}/nodes/${node.node}`}>
                    {node.node}
                    {node.role === 'master' && (
                      <span className={styles.label}>Master</span>
                    )}
                  </Link>
                }
                description={get(node, 'host_ip', '-')}
              />
              <Text
                className={styles.cpu}
                title={`${Math.round(
                  (Number(get(node, this.store.sort_metric)) || 0) * 100
                )}%`}
                description={t(this.store.sort_metric)}
              />
            </div>
          ))}
        </div>
        <div className={styles.footer}>
          <Link to={`/clusters/${this.cluster}/monitor-cluster/ranking`}>
            <Button>{t('View More')}</Button>
          </Link>
        </div>
      </div>
    )
  }
}
