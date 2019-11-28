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
import classNames from 'classnames'

import styles from './index.scss'

export default class AddonsInput extends React.Component {
  static propTypes = {
    prefix: PropTypes.any,
    suffix: PropTypes.any,
    name: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func,
  }

  render() {
    const { prefix, suffix, children, ...rest } = this.props

    const childNode = React.cloneElement(children, {
      ...children.props,
      className: classNames(
        {
          'ks-input-addons-prefix': !!prefix,
          'ks-input-addons-suffix': !!suffix,
        },
        children.props.className
      ),
      ...rest,
    })

    return (
      <div className={classNames(styles.wrapper, 'ks-input-addons')}>
        {prefix && <div className={styles.text}>{prefix}</div>}
        {childNode}
        {suffix && <div className={styles.text}>{suffix}</div>}
      </div>
    )
  }
}
