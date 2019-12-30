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

import Search from './index'

const nativeEvent = { nativeEvent: { stopImmediatePropagation() {} } }

it('renders correctly', () => {
  const props = {
    value: '',
    placeholder: 'Please input',
    onSearch: jest.fn(),
  }

  const wrapper = mount(<Search {...props} />)
  expect(wrapper.find(`input[type="text"]`)).toHaveProp(
    'placeholder',
    props.placeholder
  )
  expect(wrapper.find('.qicon-close')).not.toExist()

  wrapper.find(`input[type="text"]`).prop('onChange')(
    {
      target: { value: 'redis' },
    },
    'redis'
  )
  wrapper.update()
  expect(wrapper.find('.qicon-close')).toExist()
  wrapper.find(`input[type="text"]`).prop('onKeyUp')({
    keyCode: 13,
  })
  expect(props.onSearch).toHaveBeenCalledWith('redis')

  wrapper.find('.qicon-close').simulate('click', nativeEvent)
  expect(props.onSearch).toHaveBeenCalledWith('')
})

it('update props', () => {
  const props = {
    value: 'admin',
    placeholder: 'Please input',
    onSearch: jest.fn(),
  }

  const wrapper = mount(<Search {...props} />)
  expect(wrapper.find(`input[type="text"]`)).toHaveValue(props.value)
  wrapper.setProps({ value: 'admin2' })
  expect(wrapper.find(`input[type="text"]`)).toHaveValue('admin2')

  wrapper.find(`input[type="text"]`).prop('onKeyUp')({
    keyCode: 14,
  })
  expect(props.onSearch).not.toHaveBeenCalled()

  wrapper.find(`input[type="text"]`).prop('onChange')(
    {
      target: { value: '' },
    },
    ''
  )
  wrapper.update()

  wrapper.find(`input[type="text"]`).prop('onKeyUp')({
    keyCode: 13,
  })
  expect(props.onSearch).toHaveBeenCalledWith()
})
