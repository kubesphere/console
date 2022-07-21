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
import { get } from 'lodash'
import { ObjectInput, ArrayInput } from 'components/Inputs'
import { Input } from '@kube-design/components'

export default class ImagesInput extends React.Component {
  onChange = (values = []) => {
    const images = values.map(({ key = '', value = '' }) => `${key}:${value}`)
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
          <Input placeholder={t('KEY')} name="key" />
          <Input placeholder={t('VALUE')} name="value" />
        </ObjectInput>
      </ArrayInput>
    )
  }
}
