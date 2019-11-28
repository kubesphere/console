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
import { Input, AutoComplete } from '@pitrix/lego-ui'
import { ArrayInput, ObjectInput, PropertiesInput } from 'components/Inputs'
import { INGRESS_ANNOTATIONS } from 'utils/constants'

import styles from './index.scss'

class AutoCompleteWrapper extends React.Component {
  handleSelect = option => {
    const { onChange } = this.props
    onChange(option)
  }

  render() {
    const { onSelected, ...rest } = this.props
    return <AutoComplete onSelected={this.handleSelect} {...rest} />
  }
}

export default class AnnotationsInput extends PropertiesInput {
  render() {
    const { value, onChange, valueType, ...rest } = this.props
    const { arrayValue } = this.state

    return (
      <ArrayInput
        value={arrayValue}
        itemType="object"
        onChange={this.handleChange}
        checkItemValid={this.checkItemValid}
        {...rest}
      >
        <ObjectInput>
          <AutoCompleteWrapper
            className={styles.dropdown}
            name="key"
            placeholder={t('key')}
            options={INGRESS_ANNOTATIONS}
          />
          <Input name="value" rows="1" placeholder={t('value')} />
        </ObjectInput>
      </ArrayInput>
    )
  }
}
