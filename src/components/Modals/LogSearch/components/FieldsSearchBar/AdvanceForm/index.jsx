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
import { Select, Input } from '@pitrix/lego-ui'
import { ArrayInput, ObjectInput } from 'components/Inputs'
import { Button } from 'components/Base'

const QUERY_TYPES = {
  EQUALS: 1,
  CONTAINS: 2,
  NOT_CONTAINS: 3,
}

const QUERY_VALUE_FORMAT = {
  [QUERY_TYPES.EQUALS](value) {
    return `"${value}"`
  },
  [QUERY_TYPES.CONTAINS](value) {
    return value
  },
  [QUERY_TYPES.NOT_CONTAINS](value) {
    return `!${value}`
  },
}

/**
 * Render AdvanceFields template and export new fields
 */
class AdvanceFieldsForm extends Component {
  queryFieldTypesOptions = [
    { label: t('CONTAINS'), value: QUERY_TYPES.CONTAINS },
    { label: t('NOT_CONTAINS'), value: QUERY_TYPES.NOT_CONTAINS },
    { label: t('EQUALS'), value: QUERY_TYPES.EQUALS },
  ]

  static getDerivedStateFromProps(props) {
    return {
      keySelectOptions: props.supportFields.map(field => ({
        label: `${field.key}(${field.des})`,
        value: field.key,
      })),
    }
  }

  defaultValue = {
    key: this.props.supportFields[0].key,
    type: QUERY_TYPES.CONTAINS,
    value: '',
  }

  state = {
    value: [this.defaultValue],
  }

  onChange = value => {
    this.setState({ value })
  }

  submit = () => {
    this.props.onConfirm(
      this.state.value
        .filter(({ key, value, type }) => key && value && type)
        .map(field => ({
          key: field.key,
          value: QUERY_VALUE_FORMAT[field.type](field.value),
        }))
    )
  }

  render() {
    return (
      <ArrayInput
        itemType="object"
        value={this.state.value}
        onChange={this.onChange}
        addText={t('Add conditions')}
        extraAdd={this.renderConfirmButton()}
      >
        <ObjectInput>
          <Select name="key" options={this.state.keySelectOptions} />
          <Select name="type" options={this.queryFieldTypesOptions} />
          <Input name="value" />
        </ObjectInput>
      </ArrayInput>
    )
  }

  renderConfirmButton() {
    return (
      <Button type={'control'} onClick={this.submit}>
        {t('LOG_FILTER_BUTTON_LABEL')}
      </Button>
    )
  }
}

export default AdvanceFieldsForm
