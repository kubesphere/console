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

import CustomSelect from './index'

it('renders correctly', () => {
  const onchangeCb = jest.fn()
  const wrapper = mount(
    <CustomSelect
      value={'1'}
      options={[{ label: '1', value: '1' }]}
      onChange={onchangeCb}
    />
  )

  wrapper.find('Select').prop('onChange')('1')
  expect(onchangeCb).toHaveBeenCalledWith('1')
})

it('change correctly', () => {
  const onchangeCb = jest.fn()
  const wrapper = mount(
    <CustomSelect
      value={'1'}
      options={[{ label: '1', value: '1' }]}
      onChange={onchangeCb}
    />
  )

  wrapper.find('Select').prop('onChange')('')

  return Promise.resolve(wrapper)
    .then(() => wrapper.update())
    .then(() => {
      expect(wrapper.find('Input')).toExist()
      wrapper.find('Icon[name="changing-over"]').simulate('click')
      return wrapper.update()
    })
    .then(() => {
      expect(wrapper.find('Select')).toExist()
    })
})
