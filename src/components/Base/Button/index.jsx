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

import { Icon, Loading } from '@pitrix/lego-ui'

import styles from './index.scss'

export default class Button extends PureComponent {
  static propTypes = {
    type: PropTypes.string,
    htmlType: PropTypes.oneOf(['submit', 'button', 'reset']),
    className: PropTypes.string,
    style: PropTypes.object,
    size: PropTypes.oneOf(['small', 'normal', 'large']),
    icon: PropTypes.string,
    iconType: PropTypes.string,
    loading: PropTypes.bool,
    disabled: PropTypes.bool,
    noShadow: PropTypes.bool,
  }

  static defaultProps = {
    type: 'default',
    htmlType: 'button',
    size: 'normal',
    icon: '',
    iconType: 'dark',
    noShadow: false,
    onClick() {},
  }

  render() {
    const {
      children,
      type,
      htmlType,
      className,
      size,
      icon,
      iconType,
      loading,
      noShadow,
      ghost,
      ...rest
    } = this.props

    return (
      <button
        className={classNames(
          styles.button,
          styles[type],
          styles[size],
          {
            [styles.hasIcon]: icon,
            [styles.loading]: loading,
            [styles.noShadow]: noShadow,
            [styles.ghost]: ghost,
          },
          className
        )}
        type={htmlType}
        data-test="button"
        {...rest}
      >
        {icon && <Icon name={icon} type={iconType} />}
        {children && <div className={styles.content}>{children}</div>}
        {loading && <Loading size={12} />}
      </button>
    )
  }
}
