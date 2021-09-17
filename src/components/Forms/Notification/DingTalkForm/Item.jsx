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
import classnames from 'classnames'
import { isEmpty } from 'lodash'
import { List } from 'components/Base'
import { BoxInput } from 'components/Inputs'

import styles from './index.scss'

export default class Item extends React.Component {
  static propTypes = {
    value: PropTypes.array,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    value: [],
    onChange() {},
  }

  handleAdd = email => {
    const { value, onChange } = this.props
    onChange([...value, email])
  }

  handleDelete = email => {
    const { value, onChange } = this.props
    const newData = value.filter(item => item !== email)
    onChange(newData)
  }

  render() {
    const { value, placeholder, validate, className } = this.props

    return (
      <div className={classnames(styles.wrapper, className)}>
        <BoxInput
          className={styles.wrapper}
          placeholder={placeholder}
          validate={validate}
          onAdd={this.handleAdd}
        />
        {!isEmpty(value) && (
          <div className={styles.listWrapper}>
            <List>
              {value.map(item => (
                <List.Item
                  key={item}
                  className={styles.listItem}
                  title={item}
                  onDelete={() => this.handleDelete(item)}
                />
              ))}
            </List>
          </div>
        )}
      </div>
    )
  }
}
