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
import classnames from 'classnames'

import { COLORS_MAP } from 'utils/constants'

import { Icon } from '@kube-design/components'

import styles from './index.scss'

class NumberControl extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    value: PropTypes.number,
    onChange: PropTypes.func,
  }

  handlePlusOne = () => {
    const { value, onChange } = this.props
    onChange && onChange(value + 1)
  }

  handleMinusOne = () => {
    const { value, onChange } = this.props
    onChange && onChange(value - 1)
  }

  render() {
    const { className } = this.props
    const color = {
      primary: COLORS_MAP['white'],
      secondary: COLORS_MAP['white'],
    }

    return (
      <div className={classnames(styles.control, className)}>
        <Icon
          className={styles.add}
          name="add"
          size={24}
          color={color}
          onClick={this.handlePlusOne}
          clickable
        />
        <Icon
          className={styles.substract}
          name="substract"
          size={24}
          color={color}
          onClick={this.handleMinusOne}
          clickable
        />
      </div>
    )
  }
}

export default NumberControl
