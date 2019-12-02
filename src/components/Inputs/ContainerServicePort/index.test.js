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

import ServicePort from './index'

jest.mock('lodash/debounce', () => jest.fn(fn => fn))

it('renders correctly', () => {
  const onchangeCb = jest.fn()
  const wrapper = mount(<ServicePort onChange={onchangeCb} />)

  const select = wrapper.find('Select')
  const input = wrapper.find('NumberInput input')
  expect(select).toExist()
  expect(input).toExist()
})

it('submit correctly', () => {
  const onchangeCb = jest.fn()
  const wrapper = mount(<ServicePort onChange={onchangeCb} />)
  const select = wrapper.find('Select')
  const inputs = wrapper.find('NumberInput input')
  expect(select).toExist()
  expect(inputs.length).toBe(2)

  inputs.first().simulate('change', { target: { value: 80 } })
  inputs.last().simulate('change', { target: { value: 81 } })

  expect(onchangeCb).toHaveBeenCalledWith({
    containerPort: 80,
    name: 'http-',
    protocol: 'TCP',
    servicePort: 81,
  })
})
