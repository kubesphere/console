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
import classnames from 'classnames'
import { Button } from 'components/Base'

import styles from './index.scss'

export default class Tip extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    closable: PropTypes.bool,
    operation: PropTypes.node,
    onClose: PropTypes.func,
  }

  static defaultProps = {
    closable: true,
    onClose() {},
  }

  handleClose = () => {
    const { onClose, title } = this.props

    onClose(title)
  }

  handleToggle = () => {
    const { onToggle, title } = this.props

    onToggle(title)
  }

  stopPropagation = e => {
    e.stopPropagation()
  }

  render() {
    const {
      className,
      title,
      description,
      operation,
      more,
      closable,
      open,
    } = this.props

    return (
      <div
        className={classnames(styles.tip, { [styles.open]: open }, className)}
        onClick={this.handleToggle}
      >
        <div className={styles.tipIcon}>
          <Icon name={open ? 'chevron-down' : 'chevron-right'} size={20} />
        </div>
        <div className={styles.tipContent}>
          <div>{title}</div>
          {open && <p className="text-second">{description}</p>}
        </div>
        <div className={styles.operations} onClick={this.stopPropagation}>
          {operation}
          {more && (
            <a href={more} target="_blank">
              <Button>{t('Learn more')}</Button>
            </a>
          )}
          {closable && (
            <Icon name="close" size={20} clickable onClick={this.handleClose} />
          )}
        </div>
      </div>
    )
  }
}
