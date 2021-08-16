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

import { Button } from '@kube-design/components'

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
    onChange() {},
    configMaps: [],
    secrets: [],
  }

  handleAddRef = () => {
    const { value, onChange } = this.props
    if (isEmpty(value)) {
      return onChange([{ name: '', valueFrom: {} }])
    }

    if (value.length === 1 && value[0].name === '' && value[0].value === '') {
      return onChange([{ name: '', valueFrom: {} }])
    }

    if (value.every(this.checkItemValid)) {
      return onChange([...value, { name: '', valueFrom: {} }])
    }
  }

  checkItemValid = item =>
    !isEmpty(item) &&
    !isEmpty(item.name) &&
    (!isEmpty(item.value) || !isEmpty(item.valueFrom))

  render() {
    const { configMaps, secrets, ...rest } = this.props

    return (
      <ArrayInput
        itemType="object"
        checkItemValid={this.checkItemValid}
        addText={t('ADD_ENVIRONMENT_VARIABLE')}
        extraAdd={
          <Button onClick={this.handleAddRef} data-test="add-env-configmap">
            {t('USE_CONFIGMAP_OR_SECRET')}
          </Button>
        }
        {...rest}
      >
        <Item configMaps={configMaps} secrets={secrets} />
      </ArrayInput>
    )
  }
}
