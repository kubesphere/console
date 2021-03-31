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

import { isEmpty, isArray, get, set } from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { Button, Menu, Dropdown, Icon } from '@kube-design/components'

import { PIPELINE_PARAMS_TYPES } from 'utils/constants'
import Item from './Item'

import styles from './index.scss'

export default class ParamsInput extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    value: PropTypes.array,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    name: '',
    value: [],
    onChange() {},
  }

  get value() {
    return get(this.props.formTemplate, this.props.name, [])
  }

  handleDelete = index => {
    const { formTemplate, name } = this.props
    set(
      formTemplate,
      name,
      this.value.filter((_, _index) => _index !== index)
    )
    this.forceUpdate()
  }

  handleMoreMenuClick = (e, key) => {
    const { formTemplate, name } = this.props
    set(formTemplate, name, [
      ...(isArray(this.value) ? this.value : []),
      { type: key },
    ])
    this.forceUpdate()
  }

  renderMoreMenu() {
    return (
      <Menu onClick={this.handleMoreMenuClick}>
        {Object.keys(PIPELINE_PARAMS_TYPES).map(key => (
          <Menu.MenuItem key={key}>
            <Icon name="ticket" /> {t(PIPELINE_PARAMS_TYPES[key])}
          </Menu.MenuItem>
        ))}
      </Menu>
    )
  }

  render() {
    const { name } = this.props
    return (
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <Dropdown
            theme="dark"
            content={this.renderMoreMenu()}
            trigger="click"
            placement="bottomRight"
          >
            <Button type="control">{t('Add Parameter')}</Button>
          </Dropdown>
        </div>
        <div className={styles.content}>
          {isEmpty(this.value) && (
            <p className="text-center padding-12">{t('No parameters')}</p>
          )}
          {isArray(this.value) &&
            this.value.map((item, index) => (
              <Item
                key={index}
                value={item}
                prefix={`${name}[${index}]`}
                onDelete={this.handleDelete.bind(this, index)}
              />
            ))}
        </div>
      </div>
    )
  }
}
