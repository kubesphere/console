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
import { Input, Icon } from '@pitrix/lego-ui'
import classnames from 'classnames'

import styles from './index.scss'

export default class SearchBar extends Component {
  static propTypes = {
    fields: PropTypes.array,
    text: PropTypes.string,
    onFieldRemove: PropTypes.func,
    onClear: PropTypes.func,
  }

  static defaultProps = {
    fields: [],
  }

  handleFieldRemoveBtnClick = e => {
    const { index } = e.currentTarget.dataset
    const fields = [...this.props.fields]
    fields.splice(index, 1)
    this.props.onFieldRemove(fields, index)
  }

  render() {
    const {
      text,
      fields,
      className,
      onClear,
      onFieldRemove,
      ...inputProps
    } = this.props

    return (
      <div className={classnames(styles.wrapper, className)}>
        <div className={styles.icon}>
          <Icon name={'magnifier'} />
        </div>
        <div className={styles.content}>
          {this.renderFields()}
          <Input value={text} className={styles.input} {...inputProps} />
        </div>
        {!isEmpty(fields) && (
          <div className={styles.clear}>
            <Icon name={'close'} onClick={onClear} />
          </div>
        )}
      </div>
    )
  }

  renderFields() {
    const { fields } = this.props

    return fields.map((field, index) => (
      <span className={styles.field} key={index}>
        {field.label}{' '}
        <span data-index={index} onClick={this.handleFieldRemoveBtnClick}>
          <Icon type="light" name={'close'} />
        </span>
      </span>
    ))
  }
}
