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

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Icon } from '@kube-design/components'

import { transferVersionStatus } from 'utils/app'
import { STATUS_TO_ICON } from 'configs/openpitrix/version'
import styles from './index.scss'

export default class VersionStatus extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    noIcon: PropTypes.bool,
    noName: PropTypes.bool,
  }

  static defaultProps = {
    type: '',
    name: '',
    noIcon: false,
    noName: false,
  }

  renderIcon() {
    const { type } = this.props
    const iconType = STATUS_TO_ICON[type] || type

    if (iconType === 'draft') {
      return <label className={styles.draft} />
    }

    if (iconType === 'review') {
      return <label className={styles.review} />
    }

    if (iconType === 'passed') {
      return <Icon size={16} name="success" className={styles.passed} />
    }

    if (iconType === 'suspended') {
      return (
        <label className={styles.suspended}>
          <Icon size={13} name="substract" className={styles.substract} />
        </label>
      )
    }

    if (iconType === 'deleted') {
      return <Icon size={16} name="error" className={styles.deleted} />
    }

    return <label className={styles.review} />
  }

  render() {
    const { className, name, type, noIcon, noName } = this.props
    const status = transferVersionStatus(name || type)

    return (
      <span className={classNames(styles.status, className)}>
        {!noIcon && <label className={styles.icon}>{this.renderIcon()}</label>}
        {!noName && <label className={styles.name}>{status}</label>}
      </span>
    )
  }
}
