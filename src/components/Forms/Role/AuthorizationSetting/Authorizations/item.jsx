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

export default class Authorization extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    authorization: PropTypes.object,
    value: PropTypes.array,
    onChange: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      checkedList: props.value || [],
      indeterminate: props.value
        ? props.value.length > 0 &&
          props.value.length < props.authorization.actions.length
        : false,
      checkAll: props.value
        ? props.value.length === props.authorization.actions.length
        : false,
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.value !== state.checkedList) {
      return {
        checkedList: props.value || [],
        indeterminate:
          props.value &&
          props.value.length > 0 &&
          props.value.length < props.authorization.actions.length,
        checkAll:
          props.value &&
          props.value.length === props.authorization.actions.length,
      }
    }

    return null
  }

  handleChange = (value, name) => {
    const { authorization } = this.props

    this.setState({
      checkedList: value,
      indeterminate:
        value.length > 0 && value.length < authorization.actions.length,
      checkAll: value.length === authorization.actions.length,
    })

    this.props.onChange(value, name)
  }

  handleCheckAllChange = e => {
    const { authorization } = this.props
    const { checked } = e.target

    const checkedList = checked ? authorization.actions.map(n => n.name) : []
    this.setState({
      checkedList,
      indeterminate: false,
      checkAll: checked,
    })

    this.props.onChange(checkedList, authorization.name)
  }

  render() {
    const { authorization, className } = this.props
    const { checkedList, checkAll, indeterminate } = this.state

    const options = authorization.actions.map(action => ({
      label: t(`RULE_${action.name}`.toUpperCase()),
      value: action.name,
    }))

    return (
      <div className={classnames(styles.authorization, className)}>
        <div className={styles.name}>
          <Checkbox
            indeterminate={indeterminate}
            onChange={this.handleCheckAllChange}
            checked={checkAll}
          >
            {t(`RULE_${authorization.name}`.toUpperCase())}
          </Checkbox>
        </div>
        <div className={styles.rules}>
          <CheckboxGroup
            name={authorization.name}
            options={options}
            value={checkedList}
            onChange={this.handleChange}
          />
        </div>
      </div>
    )
  }
}
