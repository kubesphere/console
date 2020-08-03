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
import { Table } from '@pitrix/lego-ui'
import { get, toPairs, isEmpty } from 'lodash'
import { Panel } from 'components/Base'
import styles from './index.scss'

@inject('detailStore')
@observer
export default class Viewer extends React.Component {
  constructor(props) {
    super(props)
    this.store = props.detailStore
  }

  get direction() {
    const directionMatch = this.props.match.path.match(/:name\/([a-z]*)/)
    return directionMatch ? directionMatch[1] : 'egress'
  }

  get columns() {
    return [
      {
        title: 'Target',
        children: [
          {
            title: t('Project'),
            dataIndex: 'namespace',
          },
          {
            title: 'label',
            dataIndex: 'specPodSelector',
            render: item => this.renderLabels(item),
          },
        ],
      },
      {
        title: 'Destination',
        children: [
          {
            title: t('Project'),
            dataIndex: 'namespaceSelector',
            render: (item, record) => {
              if (isEmpty(get(record, 'ipBlock'))) {
                if (get(item, 'matchLabels')) {
                  return this.renderLabels(item)
                }
                return get(record, 'namespace')
              }
            },
          },
          {
            title: 'label',
            dataIndex: 'podSelector',
            render: (item, record) => {
              if (isEmpty(get(record, 'ipBlock'))) {
                if (get(item, 'matchLabels')) {
                  return this.renderLabels(item)
                }
                return 'Any'
              }
            },
          },
          {
            title: 'CIDR',
            dataIndex: 'ipBlock',
            className: styles.cidr,
            render: item => this.renderIpBlock(item),
          },
          {
            title: t('Port'),
            dataIndex: 'ports',
            render: item =>
              isEmpty(item)
                ? 'Any'
                : item.map(port => (
                    <div>
                      {port.protocol}: {port.port}
                    </div>
                  )),
          },
          {
            title: '',
            className: styles.expand,
          },
        ],
      },
    ]
  }

  get tableData() {
    const { detail } = this.store
    const originData = toJS(get(detail, '_originData'))
    const namespace = get(originData, 'metadata.namespace')
    const specPodSelector = get(originData, 'spec.podSelector')
    const directions = get(originData, `spec.${this.direction}`, [])
    const fromto = this.direction === 'ingress' ? 'from' : 'to'
    const data = []
    directions.forEach(direction => {
      const ports = get(direction, 'ports', [])
      const rules = get(direction, `${fromto}`, [])
      rules.forEach(rule => {
        data.push({
          namespace,
          specPodSelector,
          ports,
          direction: this.direction,
          ...rule,
        })
      })
    })
    return data
  }

  renderLabels = item => {
    if (item) {
      return toPairs(get(item, 'matchLabels', [])).map(kv => (
        <div>
          <label className={styles.label}>
            <span>{kv[0]}</span>
            {kv[1]}
          </label>
        </div>
      ))
    }
    return ''
  }

  renderDetailLabels = (record, selectorName) => {
    const selector = get(record, selectorName)
    return toPairs(get(selector, 'matchLabels', []))
      .map(kv => (
        <label className={styles.label}>
          <span>{kv[0]}</span>
          {kv[1]}
        </label>
      ))
      .reduce(
        (acc, x) =>
          acc === null ? (
            x
          ) : (
            <>
              {acc} and {x}
            </>
          ),
        null
      )
  }

  renderIpBlock = item => {
    if (item) {
      return (
        <label>
          {toPairs(item)
            .map(kv => (kv[0] === 'cidr' ? `${kv[1]}` : kv.join(': ')))
            .reduce(
              (acc, x) =>
                acc === null ? (
                  x
                ) : (
                  <>
                    {acc} {x}
                  </>
                ),
              null
            )}
        </label>
      )
    }
    return ''
  }

  renderPolicyDetail = record => {
    const namespace = get(record, 'namespace', '')
    const ipBlock = get(record, 'ipBlock')
    const ipExpect = get(ipBlock, 'except')
    const { direction } = record

    const ipBlockLabel = this.renderIpBlock(ipBlock)

    const podsLabels = this.renderDetailLabels(record, 'specPodSelector')
    const namespaceLabels = this.renderDetailLabels(record, 'namespaceSelector')
    const destPodLabels = this.renderDetailLabels(record, 'podSelector')

    const ports = get(record, 'ports', [])
      .map(port => `${port.protocol}: ${port.port}`)
      .reduce(
        (acc, x) =>
          acc === null ? (
            x
          ) : (
            <>
              {acc} and {x}
            </>
          ),
        null
      )

    return (
      <div>
        <span>This rule allows pods in the namespace '{namespace}' </span>
        {!isEmpty(podsLabels) && <span> with the label {podsLabels} </span>}
        <span>
          {direction === 'egress'
            ? 'to connect to '
            : 'to receive traffic from '}
        </span>
        {!isEmpty(ipBlock) ? (
          <label>
            {ipExpect && 'all IPs in '} subnet '{ipBlockLabel}'{' '}
          </label>
        ) : isEmpty(destPodLabels) && isEmpty(namespaceLabels) ? (
          'all pods in the same namespace '
        ) : (
          <label>
            {!isEmpty(destPodLabels) && (
              <span>
                {isEmpty(namespaceLabels)
                  ? 'pods in the same namespace '
                  : 'pods '}{' '}
                with labels {destPodLabels}{' '}
              </span>
            )}
            {!isEmpty(namespaceLabels) && (
              <span>
                {isEmpty(destPodLabels)
                  ? 'all pods in the namespace '
                  : 'in namespaces '}
                with the labels {namespaceLabels}{' '}
              </span>
            )}
          </label>
        )}
        {!isEmpty(ports) ? (
          <span>
            on port{ports.length > 1 ? 's' : ''} {ports}
          </span>
        ) : (
          'on all ports'
        )}
      </div>
    )
  }

  render() {
    const dataSource = this.tableData

    return (
      <Panel
        title={
          this.direction === 'egress'
            ? t('Traffic Egress')
            : t('Traffic Ingress')
        }
      >
        <Table
          dataSource={dataSource}
          className={styles.table}
          columns={this.columns}
          expandIconColumnIndex={6}
          expandIconAsCell={false}
          expandedRowRender={record => (
            <div className={styles.detail}>
              {this.renderPolicyDetail(record)}
            </div>
          )}
        />
      </Panel>
    )
  }
}
