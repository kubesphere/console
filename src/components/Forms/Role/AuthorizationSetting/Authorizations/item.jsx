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
    templates: PropTypes.array,
    value: PropTypes.array,
    onChange: PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.state = {
      checkedList: props.value || [],
      indeterminate: props.value
        ? props.value.length > 0 && props.value.length < props.templates.length
        : false,
      checkAll: props.value
        ? props.value.length === props.templates.length
        : false,
    }
  }

  handleChange = (value, name) => {
    const { templates } = this.props
    this.setState({
      checkedList: value,
      indeterminate: value.length > 0 && value.length < templates.length,
      checkAll: value.length === templates.length,
    })

    this.props.onChange(value, name)
  }

  handleCheckAllChange = e => {
    const { group, templates } = this.props
    const { checked } = e.target
    const checkedList = checked ? templates.map(n => n.name) : []

    this.setState({
      checkedList,
      indeterminate: false,
      checkAll: checked,
    })

    this.props.onChange(checkedList, group.name)
  }

  render() {
    const { templates, group, className } = this.props
    const { checkedList, checkAll, indeterminate } = this.state

    const options = templates.map(item => ({
      label: item.aliasName
        ? t(`RULE_${item.aliasName}`.toUpperCase())
        : item.name,
      value: item.name,
    }))

    return (
      <div className={classnames(styles.authorization, className)}>
        <div className={styles.name}>
          <Checkbox
            indeterminate={indeterminate}
            onChange={this.handleCheckAllChange}
            checked={checkAll}
          >
            {t(`RULE_${group}`.toUpperCase())}
          </Checkbox>
        </div>
        <div className={styles.rules}>
          <CheckboxGroup
            name={group}
            options={options}
            value={checkedList}
            onChange={this.handleChange}
          />
        </div>
      </div>
    )
  }
}
