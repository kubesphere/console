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
import PropTypes from 'prop-types'
import { get, keyBy, groupBy } from 'lodash'
import classNames from 'classnames'

import Card from '../Card'

import styles from './index.scss'

export default class App extends React.Component {
  static propTypes = {
    data: PropTypes.object,
  }

  static contextTypes = {
    selectedData: PropTypes.object,
    selectedType: PropTypes.string,
    onSelectApp: PropTypes.func,
  }

  handleClick = () => {
    const { data } = this.props
    const { onSelectApp } = this.context

    onSelectApp(data, 'app')
  }

  render() {
    const { data, store } = this.props
    const { selectedData, selectedType } = this.context

    if (!data.nodes) {
      return null
    }

    const groupedNodes = groupBy(data.nodes, item => {
      return item.data.nodeType === 'unknown' ? 'app' : item.data.nodeType
    })

    const isGroup = get(groupedNodes, 'service.length') > 0
    const workloadStatuses = get(data, 'health.workloadStatuses', [])
    const podNums = workloadStatuses.reduce(
      (prev, cur) => prev + (cur.replicas || cur.availableReplicas || 0),
      0
    )
    const workloadsHealth = get(data, 'health.workloads', {})

    const innerEdges = keyBy(get(data, 'edges.inner', []), 'data.target')

    return (
      <div
        className="ks-app-component"
        onClick={isGroup ? this.handleClick : null}
        data-component={data.name}
        style={{
          position: 'absolute',
          top: data.position.y,
          left: data.position.x,
          zIndex: 2,
        }}
      >
        {isGroup && <p className={styles.title}>{data.name}</p>}
        <div
          className={classNames({
            [styles.group]: isGroup,
            [styles.selected]:
              selectedType === 'app' && selectedData.name === data.name,
            [styles.error]:
              get(data, 'health.requests.errorRatio') > 0 ||
              get(data, 'health.service.requests.errorRatio') > 0,
          })}
        >
          {isGroup && (
            <p className={styles.pods}>
              <img src="/assets/health.svg" alt="" />
              {t('Pods')}: {podNums}
            </p>
          )}
          {groupedNodes.service &&
            groupedNodes.service.map(item => (
              <div
                key={item.data.id}
                data-service={item.data.service}
                data-service-id={item.data.id}
              />
            ))}
          {groupedNodes.app &&
            groupedNodes.app.map(item => (
              <Card
                className={styles.app}
                key={item.data.id}
                data={item.data}
                edge={innerEdges[item.data.id]}
                health={workloadsHealth[item.data.workload]}
                inGroup={isGroup}
                store={store}
              />
            ))}
        </div>
      </div>
    )
  }
}
