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
import { when } from 'mobx'
import { observer, inject } from 'mobx-react'
import { get } from 'lodash'
import { Icon, Tooltip } from '@kube-design/components'

import { getLocalTime, memoryFormat, cpuFormat } from 'utils'
import { Panel, Text } from 'components/Base'

import NodeStore from 'stores/node'

import Chart from './Chart'

import styles from './index.scss'

const CONDITION_ICONS = {
  PodScheduled: 'stretch',
  Initialized: 'container',
  ContainersReady: 'docker',
  Ready: 'success',
}

const Status = ({ status, tip }) => {
  const icon = (
    <Icon
      className={styles.status}
      name={status === 'success' ? 'success' : 'error'}
      color={{
        primary: '#fff',
        secondary: status === 'success' ? '#55bc8a' : '#ca2621',
      }}
    />
  )

  if (tip) {
    return <Tooltip content={tip}>{icon}</Tooltip>
  }

  return icon
}

@inject('detailStore')
@observer
class ScheduleInfo extends React.Component {
  nodeStore = new NodeStore()

  constructor(props) {
    super(props)

    this.disposer = when(() => this.store.detail.node, this.fetchNodeDetail)
  }

  get module() {
    return this.props.detailStore.module
  }

  get store() {
    return this.props.detailStore
  }

  fetchNodeDetail = () => {
    const { detail } = this.props.detailStore

    detail.requests = detail.containers.reduce(
      (prev, container) => {
        let { cpu, memory } = get(container, 'resources.requests', {
          cpu: '0',
          memory: '0',
        })
        cpu = Number(cpuFormat(cpu))
        memory = Number(memoryFormat(memory))

        return {
          cpu: prev.cpu + cpu,
          memory: prev.memory + memory,
        }
      },
      {
        cpu: 0,
        memory: 0,
      }
    )
  }

  renderNodeScheduleTip() {
    return (
      <div>
        <div className="tooltip-title">
          {t('How pods are assinged to nodes?')}
        </div>
        <p className="tooltip-desc">{t('POD_ASSIGNED_DESC')}</p>
      </div>
    )
  }

  getSeriesData = type => {
    const nodeDetail = this.nodeStore.detail
    const podRequests = this.store.detail.requests[type]

    const formatter = type === 'cpu' ? cpuFormat : memoryFormat
    const allocatable = Number(
      formatter(get(nodeDetail, `status.allocatable[${type}]`))
    )
    const capacity = Number(
      formatter(get(nodeDetail, `status.capacity[${type}]`))
    )

    return [
      {
        name: 'podRequests',
        itemStyle: {
          fill: '#f5a623',
        },
        value: podRequests,
      },
      {
        name: 'used',
        itemStyle: {
          fill: '#404e68',
        },
        value: Number((capacity - allocatable - podRequests).toFixed(3)),
      },
      {
        name: 'allocatable',
        itemStyle: {
          fill: '#eff4f9',
        },
        value: allocatable,
      },
    ]
  }

  renderNode() {
    return (
      <div className={styles.nodes}>
        <Chart metrics={this.getSeriesData('cpu')} icon="cpu" unit="Core" />
        <Chart metrics={this.getSeriesData('memory')} icon="memory" unit="Mi" />
      </div>
    )
  }

  renderNodeSchedule() {
    const { detail } = this.store

    const schedule =
      get(detail, 'status.conditions', []).find(
        item => item.type === 'PodScheduled'
      ) || {}

    return (
      <Panel title={t('Node Scheduling Info')}>
        <div className={styles.wrapper}>
          <div>
            <Text
              className={styles.info}
              icon="nodes"
              title={
                <div>
                  {t('Scheduled to node')} {detail.node}
                  <Tooltip content={this.renderNodeScheduleTip()}>
                    <Icon className="margin-l8" name="question" size={20} />
                  </Tooltip>
                </div>
              }
              description={getLocalTime(schedule.lastTransitionTime).format(
                'YYYY-MM-DD HH:mm:ss'
              )}
              extra={
                <Status
                  status={schedule.status === 'True' ? 'success' : 'warning'}
                />
              }
            />
            {/* <div className={styles.requests}>
              <div className={styles.text}>
                <div>{get(detail, 'requests.cpu')} Core</div>
                <p>{t('Pod CPU Request')}</p>
              </div>
              <div className={styles.text}>
                <div>{get(detail, 'requests.memory')} Mi</div>
                <p>{t('Pod Memory Request')}</p>
              </div>
            </div> */}
          </div>
          {/* <div>{this.renderNode()}</div> */}
        </div>
      </Panel>
    )
  }

  renderConditionTip(condition) {
    return (
      <div>
        <div className="tooltip-title">
          {t(`POD_CONDITION_${condition.type.toUpperCase()}`)}
        </div>
        <div className="tooltip-desc">
          <p>
            {t('Status')}: {condition.status}
          </p>
          {condition.reason && (
            <p>
              {t('Reason')}: {t(condition.reason)}
            </p>
          )}
          {condition.message && (
            <p>
              {t('Message')}: {condition.message}
            </p>
          )}
          <p>
            {t('Last Updated Time')}:{' '}
            {getLocalTime(condition.lastTransitionTime).format(
              'YYYY-MM-DD HH:mm:ss'
            )}
          </p>
        </div>
      </div>
    )
  }

  renderPodStatus() {
    const { detail } = this.store
    const conditions = get(detail, 'status.conditions', [])
    const phase = get(detail, 'status.phase', '')
    return (
      <Panel title={t('Pod Status Analysis')}>
        <div className={styles.header}>
          <Text
            className={styles.info}
            icon="pod"
            title={t(phase)}
            description={t('Current Stage(phase)')}
            extra={
              <Status status={phase === 'Running' ? 'success' : 'warning'} />
            }
          />
        </div>
        <div className={styles.content}>
          {Object.keys(CONDITION_ICONS).map(key => {
            const condition = conditions.find(item => item.type === key)

            if (!condition) {
              return null
            }

            return (
              <Text
                key={condition.type}
                className={styles.condition}
                icon={CONDITION_ICONS[condition.type]}
                title={t(`POD_CONDITION_${condition.type.toUpperCase()}`)}
                description={t(
                  `POD_CONDITION_${condition.type.toUpperCase()}_DESC`
                )}
                extra={
                  <Status
                    status={condition.status === 'True' ? 'success' : 'warning'}
                    tip={this.renderConditionTip(condition)}
                  />
                }
              />
            )
          })}
        </div>
      </Panel>
    )
  }

  render() {
    return (
      <div>
        {this.renderNodeSchedule()}
        {this.renderPodStatus()}
      </div>
    )
  }
}

export default ScheduleInfo
