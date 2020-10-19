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
import { PropTypes } from 'prop-types'
import classNames from 'classnames'
import { Icon } from '@kube-design/components'

import styles from './index.scss'

export default class ToggleView extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    show: PropTypes.bool,
    hasClose: PropTypes.bool,
  }

  static defaultProps = {
    title: '',
    description: '',
    show: false,
    hasClose: false,
  }

  state = {
    show: this.props.show,
    close: false,
  }

  toggle = () => {
    this.setState(({ show }) => ({
      show: !show,
    }))
  }

  close = () => {
    this.setState({ close: true })
  }

  render() {
    const { className, title, hasClose, description, children } = this.props
    const { show, close } = this.state

    return (
      <div
        className={classNames(
          styles.item,
          {
            [styles.hideBg]: !show,
            [styles.close]: close,
          },
          className
        )}
      >
        <div className={styles.name} onClick={this.toggle}>
          <Icon name={show ? 'chevron-down' : 'chevron-right'} size={20} />
          {title}
          {hasClose && !show && (
            <Icon
              onClick={this.close}
              name={'close'}
              size={20}
              className={styles.closeIcon}
            />
          )}
        </div>
        <div
          className={classNames(styles.detail, {
            [styles.more]: !show,
          })}
        >
          {description || children}
        </div>
      </div>
    )
  }
}
