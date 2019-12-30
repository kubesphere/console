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
import Schema from 'async-validator'
import { set, get, debounce, isFunction } from 'lodash'

import styles from './index.scss'

export default class Form extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    defaultData: PropTypes.object,
    data: PropTypes.object,
    type: PropTypes.string,
  }

  static defaultProps = {
    defaultData: {},
    className: '',
    type: '',
  }

  static childContextTypes = {
    formData: PropTypes.object,
    onFormChange: PropTypes.func,
    registerValidate: PropTypes.func,
    resetValidate: PropTypes.func,
    validateResults: PropTypes.array,
    resetValidateResults: PropTypes.func,
  }

  getChildContext() {
    return {
      formData: this.state.formData,
      onFormChange: this.triggerFormChange,
      registerValidate: this.registerValidate,
      resetValidate: this.resetValidate,
      validateResults: this.state.errors,
      resetValidateResults: this.resetValidateResults,
    }
  }

  constructor(props) {
    super(props)
    this.descriptor = {}

    this.state = { errors: [], formData: props.data || {} }
    this.triggerFormChange = props.onChange
      ? debounce(props.onChange, 500)
      : null

    this.customValidator = null
  }

  static getDerivedStateFromProps(props, state) {
    if (props.data !== state.formData) {
      return { formData: props.data || {} }
    }
    return null
  }

  handleSubmit = e => {
    const { onSubmit } = this.props

    e.preventDefault()

    this.validate(() => {
      onSubmit && onSubmit(this.state.formData)
    })
  }

  validate = callback => {
    if (isFunction(this.customValidator)) {
      this.customValidator(() => {
        this.validator(callback)
      })
    } else {
      this.validator(callback)
    }
  }

  validator = callback => {
    const schema = new Schema(this.descriptor)
    const data = Object.keys(this.descriptor).reduce(
      (prev, cur) => ({
        ...prev,
        [cur]: get(this.state.formData, cur),
      }),
      {}
    )

    schema.validate(data, { firstFields: true }, errors => {
      if (errors) {
        return this.setState({ errors })
      }
      callback && callback()
    })
  }

  registerValidate = (name, rules) => {
    this.descriptor[name] = rules
  }

  resetValidate = name => {
    delete this.descriptor[name]
  }

  resetValidateResults = name => {
    this.setState(({ errors }) => ({
      errors: errors.filter(error => error.field !== name),
    }))
  }

  getData() {
    return this.state.formData
  }

  setData(name, value) {
    set(this.state.formData, name, value)
  }

  resetData() {
    this.setState({ formData: this.props.defaultData })
  }

  setCustomValidator(validator) {
    this.customValidator = validator
  }

  render() {
    const { className, children, type } = this.props
    const classNames = classnames(styles.form, className)

    if (type === 'inner') {
      return <div className={classNames}>{children}</div>
    }

    return (
      <form
        className={classNames}
        onSubmit={this.handleSubmit}
        autoComplete="off"
      >
        {children}
      </form>
    )
  }
}
