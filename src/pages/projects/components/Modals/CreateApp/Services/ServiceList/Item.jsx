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

import { get, findKey } from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { Buttons, Icon } from '@pitrix/lego-ui'
import { Button, Tag } from 'components/Base'
import { MODULE_KIND_MAP, ICON_TYPES } from 'utils/constants'

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
    const { data } = this.props
    const workloadKind = get(data, 'workload.kind')
    const type =
      findKey(MODULE_KIND_MAP, o => o === workloadKind) || 'deployments'

    const clusters = get(data, 'workload.spec.placement.clusters')
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
        {clusters && (
          <div className={styles.clusters}>
            <div className={styles.text}>
              <div className={styles.title}>
                {clusters.map(cluster => (
                  <Tag key={cluster.name}>
                    <Icon name="kubernetes" type="light" size={20} />
                    <span>
                      {cluster.replicas} {t('Replicas')}
                    </span>
                  </Tag>
                ))}
              </div>
              <div className={styles.description}>{t('Deploy Placement')}</div>
            </div>
          </div>
        )}
        {overrides && (
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
