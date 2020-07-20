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
import classNames from 'classnames'
import { Checkbox } from '@pitrix/lego-ui'
import { get, unset, isEmpty, isUndefined } from 'lodash'

import styles from './index.scss'

export default class Group extends React.Component {
  static propTypes = {
    keepDataWhenUnCheck: PropTypes.bool,
  }

  static defaultProps = {
    keepDataWhenUnCheck: false,
  }

  static contextTypes = {
    formData: PropTypes.object,
    validateResults: PropTypes.array,
  }

  static childContextTypes = {
    registerGroup: PropTypes.func,
    unRegisterGroup: PropTypes.func,
  }

  getChildContext() {
    return {
      registerGroup: this.registerGroup,
      unRegisterGroup: this.unRegisterGroup,
    }
  }

  state = {
    isCheck: false,
  }

  items = new Set()

  componentDidMount() {
    const { checkable, keepDataWhenUnCheck } = this.props
    const { formData } = this.context
    if (
      checkable &&
      !keepDataWhenUnCheck &&
      formData &&
      this.items.size > 0 &&
      Array.from(this.items).some(item => !isUndefined(get(formData, item)))
    ) {
      this.setState({ isCheck: true })
    }
  }

  componentDidUpdate() {
    const { validateResults } = this.context
    if (
      !isEmpty(validateResults) &&
      validateResults.some(vr => this.items.has(vr.field)) &&
      !this.state.isCheck
    ) {
      this.setState({ isCheck: true })
    }
  }

  registerGroup = name => {
    this.items.add(name)
  }

  unRegisterGroup = name => {
    this.items.delete(name)
  }

  showGroup = () => {
    this.setState({ isCheck: true })
  }

  handleCheck = (e, check) => {
    const { keepDataWhenUnCheck, onChange } = this.props
    this.setState({ isCheck: check }, () => {
      if (!keepDataWhenUnCheck && !check) {
        const { formData } = this.context
        if (formData && this.items.size > 0) {
          this.items.forEach(item => unset(formData, item))
        }
      }

      onChange && onChange(check)
    })
  }

  render() {
    const {
      children,
      checkable,
      label,
      desc,
      noWrapper,
      className,
    } = this.props
    const { isCheck } = this.state

    if (!children) {
      return null
    }

    const hideChildren = checkable && !isCheck

    return (
      <div
        className={classNames(
          styles.group,
          { [styles.checkable]: checkable },
          className
        )}
      >
        <div className="form-group-header">
          <div className={styles.groupTitle}>
            {checkable ? (
              <Checkbox checked={isCheck} onChange={this.handleCheck}>
                {label}
              </Checkbox>
            ) : (
              label
            )}
          </div>
          {desc && <div className={styles.groupDesc}>{desc}</div>}
        </div>
        <div
          className={classNames({
            [styles.groupContent]: !noWrapper,
            [styles.hideGroup]: hideChildren,
          })}
        >
          {children}
        </div>
      </div>
    )
  }
}
