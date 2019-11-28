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
import PropTypes from 'prop-types'

import { Button } from 'components/Base'
import Item from './Item'
import ArrayInput from '../ArrayInput'

export default class EnvironmentInput extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    value: PropTypes.array,
    onChange: PropTypes.func,
    configMaps: PropTypes.array,
    secrets: PropTypes.array,
  }

  static defaultProps = {
    name: '',
    value: [],
    onChange() {},
    configMaps: [],
    secrets: [],
  }

  constructor(props) {
    super(props)

    this.state = {
      value: isEmpty(props.value) ? [{ name: '', value: '' }] : props.value,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.value &&
      JSON.stringify(nextProps.value) !== JSON.stringify(this.state.value)
    ) {
      this.setState({
        value: isEmpty(nextProps.value) ? [] : nextProps.value,
      })
    }
  }

  handleAddRef = () => {
    if (
      this.state.value.length === 1 &&
      isEmpty(this.state.value[0].name) &&
      isEmpty(this.state.value[0].value)
    ) {
      this.setState({
        value: [{ name: '', valueFrom: {} }],
      })

      return
    }

    this.setState({
      value: [...this.state.value, { name: '', valueFrom: {} }],
    })
  }

  isAddEnable() {
    if (
      this.state.value.length === 1 &&
      isEmpty(this.state.value[0].name) &&
      isEmpty(this.state.value[0].value)
    ) {
      return true
    }

    return this.state.value.every(this.checkItemValid)
  }

  checkItemValid = item =>
    !isEmpty(item) &&
    !isEmpty(item.name) &&
    (!isEmpty(item.value) || !isEmpty(item.valueFrom))

  render() {
    const { value: _value, configMaps, secrets, ...rest } = this.props
    const { value } = this.state

    return (
      <ArrayInput
        value={value}
        itemType="object"
        checkItemValid={this.checkItemValid}
        addText={t('Add Environment Variable')}
        extraAdd={
          <Button onClick={this.handleAddRef} disabled={!this.isAddEnable()}>
            {t('Use ConfigMap or Secret')}
          </Button>
        }
        {...rest}
      >
        <Item configMaps={configMaps} secrets={secrets} />
      </ArrayInput>
    )
  }
}
