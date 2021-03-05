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
import { observer } from 'mobx-react'
import { isEmpty } from 'lodash'
import { Panel } from 'components/Base'

import ServiceMonitorStore from 'stores/monitoring/service.monitor'

import { joinSelector } from 'utils'

import Item from './Item'

import styles from './index.scss'

@observer
export default class ServiceMonitors extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    selector: PropTypes.object,
  }

  constructor(props) {
    super(props)

    if (props.store) {
      this.store = props.store
    } else {
      this.store = new ServiceMonitorStore()
    }
  }

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    const { selector, cluster, namespace } = this.props
    if (!isEmpty(selector)) {
      this.store.fetchListByK8s({
        cluster,
        namespace,
        labelSelector: joinSelector(selector),
      })
    }
  }

  renderContent() {
    const { data } = this.store.list

    if (isEmpty(data)) return null

    const endpoints = data.reduce((prev, cur) => {
      return [
        ...prev,
        ...cur.endpoints.map(ep => ({
          ...ep,
          name: cur.name,
        })),
      ]
    }, [])

    return (
      <div className={styles.content}>
        {endpoints.map(item => (
          <Item key={item.name} detail={item} />
        ))}
      </div>
    )
  }

  render() {
    const { className } = this.props

    const content = this.renderContent()

    if (!content) {
      return null
    }

    return (
      <Panel
        className={className}
        title={`${t('Service Monitoring Exporter')} (${t(
          'Exporter Service Ports'
        )})`}
      >
        {content}
      </Panel>
    )
  }
}
