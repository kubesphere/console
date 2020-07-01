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
import classnames from 'classnames'

import { Icon } from '@pitrix/lego-ui'
import Link from 'components/Link'

import styles from './index.scss'

export default class NodeItem extends React.Component {
  static propTypes = {
    data: PropTypes.object,
  }

  static defaultProps = {
    data: {},
  }

  get canViewNode() {
    return globals.app.hasPermission({
      module: 'nodes',
      action: 'view',
      cluster: this.props.cluster,
    })
  }

  get isUnschedulable() {
    const { taints } = this.props.data

    return taints.some(
      taint => taint.key === 'node.kubernetes.io/unschedulable'
    )
  }

  get status() {
    const { conditions = [] } = this.props.data
    const ready = conditions.find(item => item.type === 'Ready')
    return this.isUnschedulable
      ? 'Unschedulable'
      : ready.status === 'True'
      ? 'Running'
      : 'Stopped'
  }

  render() {
    const { cluster } = this.props
    const { name, ip, role } = this.props.data
    const roles = role.join(',')

    return (
      <div className={styles.item}>
        <div className={styles.icon}>
          <Icon name="nodes" size={40} />
          <span
            className={classnames(styles.status, {
              [styles.active]: this.status === 'Running',
            })}
          />
        </div>
        <div className={styles.basic}>
          <strong>
            <Link
              to={`/clusters/${cluster}/nodes/${name}`}
              auth={this.canViewNode}
            >
              {name}
            </Link>
          </strong>
          <p>{`${t('Node IP')}: ${ip}`}</p>
        </div>
        <div className={styles.desc}>
          <div>
            <strong>{roles}</strong>
            <p>{t('Node Role')}</p>
          </div>
        </div>
      </div>
    )
  }
}
