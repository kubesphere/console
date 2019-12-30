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
import styles from 'identity-obj-proxy'

import NumberInput from './index'

it('renders correctly', () => {
  const props = {
    value: '10%',
    onChange: jest.fn(),
    unit: '%',
  }
  const wrapper = mount(<NumberInput {...props} />)

  expect(wrapper.find('input')).toHaveProp({ value: '10' })

  wrapper.setProps({ showUnit: true })

  expect(wrapper.find(`.${styles.withUnit}`)).toExist()

  wrapper.find('input').simulate('change', { target: { value: '50' } })
  expect(props.onChange).toHaveBeenCalledWith('50%')

  wrapper.find('input').simulate('change', { target: { value: '00.aa' } })
  expect(props.onChange).toHaveBeenCalledWith('50%')

  wrapper.find('input').simulate('change', { target: { value: 'aa' } })
  expect(props.onChange).toHaveBeenCalledWith('50%')
})

it('renders with minmax', () => {
  const props = {
    value: 10,
    onChange: jest.fn(),
    min: 1,
    max: 30,
  }
  const wrapper = mount(<NumberInput {...props} />)

  expect(wrapper.find('input')).toHaveProp({ value: 10 })

  wrapper.find('input').simulate('change', { target: { value: '50' } })
  expect(props.onChange).toHaveBeenCalledWith(30)

  wrapper.find('input').simulate('change', { target: { value: '0' } })
  expect(props.onChange).toHaveBeenCalledWith(1)

  wrapper.find('input').simulate('change', { target: { value: '2.' } })
  expect(props.onChange).toHaveBeenCalledWith('2.')
})
