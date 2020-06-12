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
import { isEmpty } from 'lodash'

import { Icon, Dropdown, Menu } from '@pitrix/lego-ui'
import { Button } from 'components/Base'

export default class BtnGroup extends Component {
  static propTypes = {
    className: PropTypes.string,
    options: PropTypes.array,
  }

  static defaultProps = {
    options: [],
  }

  handleMoreClick = (e, key) => {
    const { onClick } = this.props.options.find(item => item.key === key)
    onClick && onClick()
  }

  renderMoreOptions() {
    const { options } = this.props

    const items = options.map(({ icon, text, show = true, ...rest }) => {
      if (!show) return null
      return (
        <Menu.MenuItem {...rest}>
          {icon && <Icon name={icon} type="light" />}{' '}
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
    const { options, className } = this.props

    if (isEmpty(options)) return null

    const content = this.renderMoreOptions()

    return content ? (
      <Dropdown className="dropdown-default" content={content}>
        <Button className={className} type="flat" icon="more" />
      </Dropdown>
    ) : null
  }
}
