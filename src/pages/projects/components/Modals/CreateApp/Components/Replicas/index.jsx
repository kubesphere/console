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
import { Icon } from '@pitrix/lego-ui'

import styles from './index.scss'

export default class Replicas extends React.Component {
  static propTypes = {
    value: PropTypes.number,
    defaultValue: PropTypes.number,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    onChange() {},
  }

  handlePlus = () => {
    const { value, defaultValue, onChange } = this.props
    onChange((value || defaultValue) + 1)
  }

  handleMinus = () => {
    const { value, defaultValue, onChange } = this.props
    onChange(Math.max(1, (value || defaultValue) - 1))
  }

  render() {
    const { value, defaultValue } = this.props
    return (
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.number}>{value || defaultValue}</div>
          <div className={styles.text}>
            <p>
              <strong>{t('Replicas')}</strong>
            </p>
            <p>{t('Specify Replicas Number')}</p>
          </div>
          <div className={styles.control}>
            <Icon
              name="chevron-up"
              onClick={this.handlePlus}
              size={24}
              clickable
            />
            <Icon
              name="chevron-down"
              onClick={this.handleMinus}
              size={24}
              clickable
            />
          </div>
        </div>
      </div>
    )
  }
}
