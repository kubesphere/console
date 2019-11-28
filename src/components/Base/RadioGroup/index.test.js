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

import RadioGroup from './index'

it('renders correctly', () => {
  const options = [
    {
      value: 'value1',
      label: 'Label1',
      count: 10,
    },
    {
      value: 'value2',
      label: 'Label2',
      count: 12,
    },
  ]

  const props = {
    value: 'value1',
    onChange: jest.fn(),
    options,
  }

  const wrapper = mount(<RadioGroup {...props} />)
  expect(wrapper).toIncludeText('Label1')
  expect(wrapper).toIncludeText('Label2')
  expect(wrapper.find('[type="radio"][value="value1"]')).toHaveProp(
    'checked',
    true
  )
  expect(wrapper.find('[type="radio"][value="value2"]')).not.toHaveProp(
    'checked',
    true
  )

  wrapper.setProps({
    value: 'value2',
  })
  expect(wrapper.find('[type="radio"][value="value1"]')).not.toHaveProp(
    'checked',
    true
  )
  expect(wrapper.find('[type="radio"][value="value2"]')).toHaveProp(
    'checked',
    true
  )
})
