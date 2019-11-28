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

import { has, omit } from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Dropdown, Icon } from '@pitrix/lego-ui'
import { Button } from 'components/Base'
import { PIPELINE_ACTION_TYPES } from 'utils/constants'
import Item from './Item'

import styles from './index.scss'

export default class ActionsInput extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    value: PropTypes.object,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    name: '',
    value: {},
    onChange() {},
  }

  handleChange = itemValue => {
    const { value, onChange } = this.props

    onChange({ ...value, ...itemValue })
  }

  handleDelete = key => {
    const { value, onChange } = this.props
    onChange(omit(value, key))
  }

  handleMoreMenuClick = (e, key) => {
    const { value, onChange } = this.props

    if (has(value, key)) {
      return
    }

    if (key === 'discover_branches') {
      onChange({ ...value, discover_branches: 1 })
    } else if (key === 'discover_pr_from_origin') {
      onChange({ ...value, discover_pr_from_origin: 1 })
    } else if (key === 'discover_pr_from_forks') {
      onChange({
        ...value,
        discover_pr_from_forks: {
          strategy: 1,
          trust: 0,
        },
      })
    }
  }

  renderMoreMenu() {
    return (
      <Menu onClick={this.handleMoreMenuClick}>
        {Object.keys(PIPELINE_ACTION_TYPES).map(key => (
          <Menu.MenuItem key={key}>
            <Icon name="ticket" /> {t(PIPELINE_ACTION_TYPES[key])}
          </Menu.MenuItem>
        ))}
      </Menu>
    )
  }

  render() {
    const { name, value } = this.props

    return (
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <Dropdown
            className="dropdown-default"
            content={this.renderMoreMenu()}
            trigger="click"
            placement="bottomRight"
          >
            <Button type="control">{t('Add Action')}</Button>
          </Dropdown>
        </div>
        <div className={styles.content}>
          {Object.keys(PIPELINE_ACTION_TYPES)
            .filter(has.bind(this, value))
            .map((key, index) => (
              <Item
                key={index}
                value={{ [key]: value[key] }}
                prefix={`${name}[${index}]`}
                onDelete={this.handleDelete.bind(this, key)}
                onChange={this.handleChange}
              />
            ))}
        </div>
      </div>
    )
  }
}
