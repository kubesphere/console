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

import { isEmpty } from 'lodash'
import React from 'react'
import { PropTypes } from 'prop-types'
import { Icon, Dropdown } from '@pitrix/lego-ui'
import isEqual from 'react-fast-compare'

import Item from './Item'

import styles from './index.scss'

export default class ServiceSelect extends React.Component {
  static propTypes = {
    defaultValue: PropTypes.object,
    options: PropTypes.array,
    onChange: PropTypes.func,
    isLoading: PropTypes.bool,
  }

  static defaultProps = {
    options: [],
    onChange() {},
    isLoading: true,
  }

  state = {
    value: this.props.defaultValue || this.props.options[0] || {},
  }

  componentDidUpdate(prevProps) {
    const { options, defaultValue } = this.props
    if (!isEqual(options, prevProps.options)) {
      this.setState({ value: defaultValue || options[0] })
    }
  }

  handleChange = value => {
    this.setState({ value }, () => {
      this.props.onChange(value)
    })
  }

  renderOptions() {
    const { options } = this.props
    return (
      <ul className={styles.options}>
        {options.map(item => (
          <li key={item.uid}>
            <Item data={item} onClick={this.handleChange} />
          </li>
        ))}
      </ul>
    )
  }

  render() {
    const { isLoading, options } = this.props
    return (
      <div className={styles.select}>
        {!isLoading && isEmpty(options) ? (
          <div className={styles.empty}>
            {t('NOT_AVAILABLE', { resource: t('Service') })}
          </div>
        ) : (
          <Dropdown
            trigger="click"
            placement="bottom"
            content={this.renderOptions()}
          >
            <div className={styles.control}>
              <Item className={styles.selected} data={this.state.value} />
              <Icon
                className={styles.rightIcon}
                name="chevron-down"
                size={24}
              />
            </div>
          </Dropdown>
        )}
      </div>
    )
  }
}
