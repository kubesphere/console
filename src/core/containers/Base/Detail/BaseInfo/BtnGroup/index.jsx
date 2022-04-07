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

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { isEmpty, isFunction } from 'lodash'

import { Button, Icon, Dropdown, Menu } from '@kube-design/components'

import styles from './index.scss'

export default class BtnGroup extends Component {
  static propTypes = {
    className: PropTypes.string,
    options: PropTypes.array,
    limit: PropTypes.number,
  }

  static defaultProps = {
    options: [],
    limit: 2,
  }

  handleMoreClick = (e, key) => {
    const { onClick } = this.props.options.find(item => item.key === key)
    onClick && onClick()
  }

  renderBtn = ({ text, show = true, icon, ...rest }) => {
    if (!show) return null
    return (
      <Button
        className={styles.button}
        {...rest}
        data-test={`detail-${rest.key}`}
      >
        {text}
      </Button>
    )
  }

  renderBtns() {
    const { options, limit } = this.props

    if (isEmpty(options)) return null

    if (options.length <= limit) {
      return options.map(this.renderBtn)
    }

    const content = this.renderMoreOptions()

    return (
      <div>
        {this.renderBtn(options[0])}
        {content && (
          <Dropdown theme="dark" content={content}>
            <Button className={styles.more} data-test="detail-more">
              {t('MORE')} <Icon name="caret-down" />{' '}
            </Button>
          </Dropdown>
        )}
      </div>
    )
  }

  renderMoreOptions() {
    const { options, limit } = this.props
    const menus = options.slice(limit - 1)

    const items = menus.map(({ icon, text, show = true, ...rest }) => {
      if (!show) return null
      return (
        <Menu.MenuItem {...rest}>
          {icon &&
            (isFunction(icon) ? (
              icon()
            ) : (
              <Icon name={icon} type="light" />
            ))}{' '}
          <span data-test={`detail-${rest.key}`}>{text}</span>
        </Menu.MenuItem>
      )
    })

    if (items.every(item => item === null)) {
      return null
    }

    return <Menu onClick={this.handleMoreClick}>{items}</Menu>
  }

  render() {
    const { className, limit, options, ...rest } = this.props

    return (
      <div className={classnames(styles.group, className)} {...rest}>
        {this.renderBtns()}
      </div>
    )
  }
}
