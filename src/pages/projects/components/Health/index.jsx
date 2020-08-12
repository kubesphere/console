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
import classNames from 'classnames'

import styles from './index.scss'

export default class Health extends React.Component {
  render() {
    const { score, className } = this.props

    if (score === undefined) {
      return (
        <span>
          <span
            className={classNames(styles.icon, styles['nostatus'], className)}
          />
          {t('no status')}
        </span>
      )
    }

    if (score <= 30) {
      return (
        <span>
          <span className={classNames(styles.icon, styles.error, className)} />
          {t('Warning')}
        </span>
      )
    }
    if (score > 30 && score <= 80) {
      return (
        <span>
          <span
            className={classNames(styles.icon, styles.subhealth, className)}
          />
          {t('Sub-healthy')}
        </span>
      )
    }
    return (
      <span>
        <span className={classNames(styles.icon, styles.health, className)} />
        {t('Healthy')}
      </span>
    )
  }
}
