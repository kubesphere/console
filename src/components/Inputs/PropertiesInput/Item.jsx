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
import { Input, TextArea } from '@pitrix/lego-ui'
import { Button } from 'components/Base'
import ObjectInput from '../ObjectInput'
import styles from './index.scss'

export default class PropertyItem extends React.Component {
  handleChange = value => {
    const { index, onChange } = this.props
    onChange(index, value)
  }
  handleDelete = () => {
    const { index, onDelete } = this.props
    onDelete(index)
  }
  render() {
    const { readOnly, valueType, onDelete, onChange, ...rest } = this.props

    const ValueInput = valueType === 'textarea' ? TextArea : Input
    return (
      <div className={styles.item}>
        <ObjectInput {...rest} onChange={this.handleChange}>
          <Input name="key" placeholder={t('key')} readOnly={readOnly} />
          <ValueInput
            name="value"
            rows="1"
            placeholder={t('value')}
            readOnly={readOnly}
          />
        </ObjectInput>
        {!readOnly && (
          <Button
            type="flat"
            icon="trash"
            className={styles.delete}
            onClick={this.handleDelete}
          />
        )}
      </div>
    )
  }
}
