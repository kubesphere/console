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

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { CheckboxGroup, Checkbox } from '@pitrix/lego-ui'

import styles from './index.scss'

export default class Authority extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    authority: PropTypes.object,
    value: PropTypes.array,
    onChange: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      checkedList: props.value || [],
      indeterminate: props.value
        ? props.value.length > 0 &&
          props.value.length < props.authority.actions.length
        : false,
      checkAll: props.value
        ? props.value.length === props.authority.actions.length
        : false,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.checkedList) {
      this.setState({
        checkedList: nextProps.value || [],
        indeterminate:
          nextProps.value &&
          nextProps.value.length > 0 &&
          nextProps.value.length < nextProps.authority.actions.length,
        checkAll:
          nextProps.value &&
          nextProps.value.length === nextProps.authority.actions.length,
      })
    }
  }

  handleChange = (value, name) => {
    const { authority } = this.props

    this.setState({
      checkedList: value,
      indeterminate:
        value.length > 0 && value.length < authority.actions.length,
      checkAll: value.length === authority.actions.length,
    })

    this.props.onChange(value, name)
  }

  handleCheckAllChange = e => {
    const { authority } = this.props
    const { checked } = e.target

    const checkedList = checked ? authority.actions.map(n => n.name) : []
    this.setState({
      checkedList,
      indeterminate: false,
      checkAll: checked,
    })

    this.props.onChange(checkedList, authority.name)
  }

  render() {
    const { authority, className } = this.props
    const { checkedList, checkAll, indeterminate } = this.state

    const options = authority.actions.map(action => ({
      label: t(`RULE_${action.name}`.toUpperCase()),
      value: action.name,
    }))

    return (
      <div className={classnames(styles.authority, className)}>
        <div className={styles.name}>
          <Checkbox
            indeterminate={indeterminate}
            onChange={this.handleCheckAllChange}
            checked={checkAll}
          >
            {t(`RULE_${authority.name}`.toUpperCase())}
          </Checkbox>
        </div>
        <div className={styles.rules}>
          <CheckboxGroup
            name={authority.name}
            options={options}
            value={checkedList}
            onChange={this.handleChange}
          />
        </div>
      </div>
    )
  }
}
