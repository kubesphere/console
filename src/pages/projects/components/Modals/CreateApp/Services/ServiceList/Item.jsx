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

import { get, keyBy, isEmpty, findKey } from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { Buttons, Icon } from '@pitrix/lego-ui'
import { Button, Tag } from 'components/Base'
import {
  CLUSTER_PROVIDER_ICON,
  CLUSTER_GROUP_TAG_TYPE,
  MODULE_KIND_MAP,
  ICON_TYPES,
} from 'utils/constants'

import ClusterDiffs from './ClusterDiffs'

import styles from './index.scss'

export default class Item extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      workload: PropTypes.object,
      service: PropTypes.object,
    }),
    propsKey: PropTypes.string,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
  }

  static defaultProps = {
    data: { workload: {}, service: {} },
    propsKey: '',
    onEdit() {},
    onDelete() {},
  }

  handleEdit = () => {
    this.props.onEdit(this.props.propsKey)
  }

  handleDelete = () => {
    this.props.onDelete(this.props.propsKey)
  }

  render() {
    const { data, clusters } = this.props
    const workloadKind = get(data, 'workload.kind').replace('Federated', '')
    const type =
      findKey(MODULE_KIND_MAP, o => o === workloadKind) || 'deployments'

    const clusterMap = keyBy(clusters, 'name')
    const workloadClusters = get(data, 'workload.spec.placement.clusters').map(
      item => clusterMap[item.name]
    )
    const overrides = get(data, 'workload.spec.overrides')

    return (
      <div className={styles.item}>
        <div className={styles.icon}>
          <Icon name={ICON_TYPES[type]} size={40} />
        </div>
        <div className={styles.texts}>
          <div className={styles.text}>
            <div className={styles.title}>
              {get(data, 'service.metadata.name', '-')}
            </div>
            <div className={styles.description}>
              {type === 'deployments'
                ? t('Stateless Service')
                : t('Stateful Service')}
            </div>
          </div>
        </div>
        {workloadClusters && (
          <div className={styles.clusters}>
            <div className={styles.text}>
              <div className={styles.title}>
                {clusters.map(cluster => {
                  let replicas = get(
                    data,
                    'workload.spec.template.spec.replicas'
                  )
                  const cods = get(overrides, `${cluster}.clusterOverrides`, [])
                  const od =
                    cods.find(item => item.path === '/spec/repliacs') || {}
                  replicas = od.value || replicas
                  return (
                    <Tag
                      key={cluster.name}
                      type={CLUSTER_GROUP_TAG_TYPE[cluster.group]}
                    >
                      <Icon
                        name={
                          CLUSTER_PROVIDER_ICON[cluster.provider] ||
                          'kubernetes'
                        }
                        size={16}
                        type="light"
                      />
                      <span>
                        {replicas} {t('Replicas')}
                      </span>
                    </Tag>
                  )
                })}
              </div>
              <div className={styles.description}>{t('Deploy Placement')}</div>
            </div>
          </div>
        )}
        {!isEmpty(overrides) && (
          <div className={styles.overrides}>
            <ClusterDiffs
              overrides={overrides}
              clusters={clusters}
              workload={get(data, 'workload')}
            />
          </div>
        )}
        <Buttons>
          <Button type="flat" icon="trash" onClick={this.handleDelete} />
          <Button type="flat" icon="pen" onClick={this.handleEdit} />
        </Buttons>
      </div>
    )
  }
}
