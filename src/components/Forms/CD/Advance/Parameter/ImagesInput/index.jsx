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
import { get, head } from 'lodash'
import { ObjectInput, ArrayInput } from 'components/Inputs'
import { Input, Select } from '@kube-design/components'
import { observer } from 'mobx-react'

@observer
export default class ImagesInput extends React.Component {
  get images() {
    const images = get(
      this.props.formData,
      ['metadata', 'annotations', 'gitops.kubesphere.io/images'],
      ''
    )
    return images
      ? images.split(',').map(image => ({
          label: head(image.split(':')),
          value: head(image.split(':')),
        }))
      : []
  }

  onChange = (values = []) => {
    const images = values
      .filter(({ key = '' }) => key)
      .map(({ key, value = '' }) => `${key}:${value}`)
    this.props.onChange(images)
  }

  render() {
    const images = get(this.props, 'value', []).map(image => {
      const [, key = '', value = ''] = image.match(/(.*):(.*)$/) || []
      return {
        key,
        value,
      }
    })

    return (
      <ArrayInput
        addText={t('ADD')}
        itemType="object"
        value={images.length ? images : undefined}
        onChange={this.onChange}
      >
        <ObjectInput>
          <Select
            name="key"
            placeholder={t('KEY')}
            searchable
            clearable
            options={this.images}
          />
          <Input placeholder={t('VALUE')} name="value" />
        </ObjectInput>
      </ArrayInput>
    )
  }
}
