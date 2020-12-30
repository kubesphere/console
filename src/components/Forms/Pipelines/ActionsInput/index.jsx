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

import { has, omit, isEmpty } from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { Button, Menu, Dropdown, Icon } from '@kube-design/components'

import { PIPELINE_ACTION_TYPES } from 'utils/constants'
import Item from './Item'

import styles from './index.scss'

export default class ActionsInput extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    value: PropTypes.object,
    onChange: PropTypes.func,
    sourceType: PropTypes.string,
  }

  static defaultProps = {
    name: '',
    value: {},
    sourceType: '',
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

    switch (key) {
      case 'discover_branches':
        onChange({ ...value, discover_branches: 1 })
        break
      case 'discover_pr_from_origin':
        onChange({ ...value, discover_pr_from_origin: 1 })
        break
      case 'discover_pr_from_forks':
        onChange({
          ...value,
          discover_pr_from_forks: {
            strategy: 1,
            trust: 0,
          },
        })
        break
      case 'discover_tags':
        onChange({
          ...value,
          discover_tags: true,
        })
        break
      default:
        break
    }
  }

  get menuData() {
    const { sourceType } = this.props
    const MenuData = ['gitlab', 'github', 'bitbucket_server'].includes(
      sourceType
    )
      ? PIPELINE_ACTION_TYPES
      : {}

    return MenuData
  }

  renderMoreMenu() {
    const { value } = this.props
    const valueKey = Object.keys(value)
    return (
      <Menu onClick={this.handleMoreMenuClick}>
        {!isEmpty(this.menuData) &&
          Object.keys(this.menuData).map(key => (
            <Menu.MenuItem key={key} disabled={valueKey.includes(key)}>
              <Icon name="ticket" /> {t(this.menuData[key])}
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
            theme="dark"
            content={this.renderMoreMenu()}
            trigger="click"
            placement="bottomRight"
          >
            <Button type="control">{t('Add Action')}</Button>
          </Dropdown>
        </div>
        <div className={styles.content}>
          {Object.keys(this.menuData)
            .filter(has.bind(this, value))
            .map((key, index) => (
              <Item
                key={index}
                value={{ [key]: value[key] }}
                prefix={`${name}[${index}]`}
                onDelete={this.handleDelete.bind(this, key)}
                onChange={this.handleChange}
                menuData={this.menuData}
              />
            ))}
        </div>
      </div>
    )
  }
}
