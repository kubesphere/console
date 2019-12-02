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
import { mount } from 'enzyme'

import { Input } from '@pitrix/lego-ui'
import ArrayInput from './index'
import ObjectInput from '../ObjectInput'

it('renders correctly', () => {
  const defaultData = [
    {
      a: 'a',
    },
    { b: 'b' },
  ]
  const onchangeCb = jest.fn()
  const wrapper = mount(
    <ArrayInput
      itemType="object"
      value={defaultData}
      onChange={onchangeCb}
      addText={t('Add Selector')}
    >
      <ObjectInput>
        <Input name="key" placeholder={t('key')} />
        <Input name="value" rows="1" placeholder={t('value')} />
      </ObjectInput>
    </ArrayInput>
  )

  const items = wrapper.find('Item')
  expect(items).toHaveLength(2)
})

it('add correctly', () => {
  const defaultData = [
    {
      a: 'a',
    },
    { b: 'b' },
  ]
  const onchangeCb = jest.fn()
  const wrapper = mount(
    <ArrayInput
      itemType="object"
      value={defaultData}
      onChange={onchangeCb}
      addText={t('Add Selector')}
    >
      <ObjectInput>
        <Input name="key" placeholder={t('key')} />
        <Input name="value" rows="1" placeholder={t('value')} />
      </ObjectInput>
    </ArrayInput>
  )

  const addButton = wrapper.find('.text-right button').first()
  expect(addButton).toExist()
  addButton.simulate('click')
  expect(onchangeCb).toHaveBeenCalledWith([
    { a: 'a', key: '', value: '' },
    { b: 'b', key: '', value: '' },
    {},
  ])
})
