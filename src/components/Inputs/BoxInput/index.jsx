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
import { isEmpty, trim } from 'lodash'
import { Input, Button, Select } from '@kube-design/components'

import styles from './index.scss'

export default class BoxInput extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    defaultSelectValue: PropTypes.string,
    options: PropTypes.array,
    onSelectChange: PropTypes.func,
    onAdd: PropTypes.func,
    onDelete: PropTypes.func,
    validate: PropTypes.func,
  }

  static defaultProps = {
    title: '',
    defaultSelectValue: '',
    options: [],
    onAdd() {},
    onDelete() {},
    onSelectChange() {},
    validate() {},
  }

  state = {
    inputValue: '',
  }

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value })
  }

  handleAdd = () => {
    const { validate, onAdd } = this.props
    const { inputValue } = this.state

    if (validate(inputValue)) {
      this.setState({ inputValue: '' }, () => {
        onAdd(trim(inputValue))
      })
    }
  }

  handleDelete = (value, index) => {
    this.props.onDelete(value, index)
  }

  handleKeyUp = e => {
    if (e.keyCode === 13) {
      this.handleAdd()
    }
  }

  renderInput() {
    const {
      className,
      defaultSelectValue,
      options,
      onSelectChange,
      ...rest
    } = this.props
    const { inputValue } = this.state

    if (!isEmpty(options)) {
      return (
        <div className={classnames(styles.selectWrapper, className)}>
          <Input
            className={styles.selectInput}
            onChange={this.handleInputChange}
            value={inputValue}
            onKeyUp={this.handleKeyUp}
          />
          <Select
            className={styles.select}
            defaultValue={defaultSelectValue}
            options={options}
            onChange={onSelectChange}
          />
        </div>
      )
    }
    return (
      <Input
        value={inputValue}
        onKeyUp={this.handleKeyUp}
        onChange={this.handleInputChange}
        {...rest}
      />
    )
  }

  render() {
    const { className, title } = this.props
    return (
      <div className={className}>
        {title && <p className={styles.title}>{title}</p>}
        <div className={styles.inputWrapper}>
          {this.renderInput()}
          <Button className="margin-l12" onClick={this.handleAdd}>
            {t('Add')}
          </Button>
        </div>
      </div>
    )
  }
}
