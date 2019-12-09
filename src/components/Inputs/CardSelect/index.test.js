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

import CardSelect from './index'

it('renders correctly', () => {
  const options = [
    { value: 'a', icon: 'cdn', label: 'label-a' },
    { value: 'b', icon: 'cdn', label: 'label-b' },
  ]
  const onchangeCb = jest.fn()
  const wrapper = mount(<CardSelect onChange={onchangeCb} options={options} />)

  const lists = wrapper.find('li')
  expect(lists).toHaveLength(2)
})

it('change correctly', () => {
  const options = [
    { value: 'a', icon: 'cdn', label: 'label-a' },
    { value: 'b', icon: 'cdn', label: 'label-b' },
  ]
  const onchangeCb = jest.fn()
  const wrapper = mount(<CardSelect onChange={onchangeCb} options={options} />)

  const lists = wrapper.find('li')
  expect(lists).toHaveLength(2)
  lists.first().simulate('click')
  expect(onchangeCb).toHaveBeenCalledWith('a')
})
