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
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import isEqual from 'react-fast-compare'
import { get, isEmpty, isFunction } from 'lodash'
import { toJS } from 'mobx'
import { Button, Menu, Icon, Dropdown, Tooltip } from '@kube-design/components'

import PodMonitoringStore from 'stores/monitoring/pod'

import Item from './Item'

import styles from './index.scss'

const MetricTypes = {
  cpu: 'pod_cpu_usage',
  memory: 'pod_memory_usage_wo_cache',
}

export default class Component extends React.Component {
  static propTypes = {
    namespace: PropTypes.string,
    data: PropTypes.object,
    isGovernor: PropTypes.bool,
    showEditModal: PropTypes.func,
    onTakeover: PropTypes.func,
  }

  static defaultProps = {
    namespace: '',
    data: {},
    isGovernor: true,
    maxLength: 0,
    jobDetail: {},
    showEditModal() {},
  }

  constructor(props) {
    super(props)

    this.state = {
      pods: props.pods || [],
    }

    this.monitorStore = new PodMonitoringStore()

    this.getData(props.pods)
  }

  get prefix() {
    const { workspace, cluster, namespace } = this.props
    return `/${workspace}/clusters/${cluster}/projects/${namespace}`
  }

  componentDidUpdate(prevProps) {
    const { pods } = this.props
    if (!isEqual(pods, prevProps.pods)) {
      this.getData(pods)
    }
  }

  getData(_pods) {
    if (!isEmpty(_pods)) {
      this.monitorStore
        .fetchMetrics({
          cluster: this.props.cluster,
          namespace: this.props.namespace,
          resources: _pods.map(pod => pod.name),
          metrics: Object.values(MetricTypes),
          last: true,
        })
        .then(() => {
          const monitorData = toJS(this.monitorStore.data)

          this.setState({
            pods: _pods.map(pod => {
              const metrics = {}
              Object.entries(MetricTypes).forEach(([key, value]) => {
                const records = get(monitorData, `${value}.data.result`) || []
                metrics[key] = records.find(
                  item => get(item, 'metric.pod') === pod.name
                )
              })
              return { ...pod, metrics }
            }),
          })
        })
    }
  }

  handleMoreMenuClick = (e, key) => {
    switch (key) {
      case 'edit':
        this.props.showEditModal()
        break
      case 'offline':
        this.props.onOffline(this.props.type)
        break
      case 'takeover':
        this.props.onTakeover(this.props.type)
        break
      default:
        break
    }
  }

  renderMoreMenu() {
    const { type, isGovernor, onTakeover } = this.props

    return (
      <Menu onClick={this.handleMoreMenuClick}>
        {type === 'new' && (
          <Menu.MenuItem key="edit">
            <Icon name="update" type="light" /> {t('EDIT')}
          </Menu.MenuItem>
        )}
        {!isGovernor && isFunction(onTakeover) && (
          <Menu.MenuItem key="takeover">
            <Icon name="linechart" type="light" /> {t('TAKE_OVER')}
          </Menu.MenuItem>
        )}
      </Menu>
    )
  }

  render() {
    const {
      data,
      type,
      isGovernor,
      onTakeover,
      jobDetail,
      maxLength,
      workloadType,
    } = this.props
    const { pods } = this.state

    const hideDropDown =
      type !== 'new' && (isGovernor || !isFunction(onTakeover))

    const listStyle = { minHeight: maxLength * 40 + (maxLength - 1) * 4 }

    const isOffline =
      ['Bluegreen', 'Mirror'].includes(jobDetail.type) && !isGovernor

    return (
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <Icon name="appcenter" size={40} />
          <div className={styles.title}>
            <div className="h6">
              <Link
                to={`${this.prefix}/${workloadType}/${data.name}-${data.version}`}
              >
                {data.name}
              </Link>
              &nbsp;&nbsp;
              <span
                className={classNames('ks-tag', {
                  'ks-tag-disable': isOffline,
                })}
              >
                {data.version}
              </span>
              {isOffline && (
                <Tooltip
                  content={
                    jobDetail.type === 'Mirror'
                      ? t('MIRRORED_TRAFFIC_TIP')
                      : t('OFFLINE_TIP')
                  }
                >
                  <span className="ks-tag ks-tag-disable">
                    {jobDetail.type === 'Mirror'
                      ? t('MIRRORED_TRAFFIC')
                      : t('OFFLINE')}
                  </span>
                </Tooltip>
              )}
            </div>
            <p>
              {t('REPLICA_COUNT')}: <strong>{data.available}</strong>/
              {data.desire}
            </p>
          </div>
          {!hideDropDown && (
            <div className={styles.right}>
              <Dropdown
                theme="dark"
                content={this.renderMoreMenu()}
                trigger="click"
                placement="bottomRight"
              >
                <Button icon="more" type="flat" />
              </Dropdown>
            </div>
          )}
        </div>
        <ul className={styles.pods} style={listStyle}>
          {pods.map(item => (
            <Item data={item} key={item.uid} prefix={this.prefix} />
          ))}
        </ul>
      </div>
    )
  }
}
