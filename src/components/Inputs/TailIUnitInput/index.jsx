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
import { Input } from '@kube-design/components'

import styles from './index.scss'

export default class TailIUnitInput extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    unit: PropTypes.string,
  }

  render() {
    const { name, unit, onChange, ...rest } = this.props

    if (unit) {
      return (
        <>
          <div className={styles.wrapper}>
            <Input
              name={name}
              className={styles.input}
              onChange={onChange || null}
              {...rest}
            />
            {unit && <span className={styles.unit}>{unit}</span>}
          </div>
        </>
      )
    }

    return (
      <Input
        name={name}
        className={styles.input}
        onChange={onChange || null}
        {...rest}
      />
    )
  }
}
