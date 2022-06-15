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

import ContainerPort from './index'

jest.mock('lodash/debounce', () => jest.fn(fn => fn))

it('renders correctly', () => {
  const onchangeCb = jest.fn()
  const value = {
    name: 'http2-test',
    containerPort: 8080,
    protocol: 'tcp',
  }
  const wrapper = mount(<ContainerPort onChange={onchangeCb} value={value} />)

  const select = wrapper.find('Select')
  const input = wrapper.find('NumberInput input')
  expect(select).toHaveProp({ value: 'HTTP2' })
  expect(input).toHaveProp({ value: 8080 })

  const value2 = { name: 'redis-test', containerPort: 6379, protocol: 'tcp' }
  wrapper.setProps({ value: value2 })
  expect(wrapper.state().protocol).toEqual('REDIS')

  const value3 = { name: '-', containerPort: 6379, protocol: 'tcp' }
  wrapper.setProps({ value: value3 })
  expect(wrapper.state().protocol).toEqual('HTTP')

  const value4 = { name: 'Test-', containerPort: 6379, protocol: 'tcp' }
  wrapper.setProps({ value: value4 })
  expect(wrapper.state().protocol).toEqual('tcp')
})

it('change correctly', () => {
  const onchangeCb = jest.fn()
  const wrapper = mount(<ContainerPort onChange={onchangeCb} index={0} />)
  const protocol = wrapper.find('Select[name="protocol"]')
  const name = wrapper.find('Input[name="name"]')
  const port = wrapper.find('NumberInput[name="containerPort"]')

  port.prop('onChange')(8080)
  expect(onchangeCb).toHaveBeenCalledWith({
    containerPort: 8080,
    name: 'http-0',
    protocol: 'TCP',
  })

  protocol.prop('onChange')('REDIS')
  expect(onchangeCb).toHaveBeenCalledWith({
    containerPort: 8080,
    name: 'redis-0',
    protocol: 'TCP',
  })

  name.prop('onChange')({}, 'http2-test')
  expect(onchangeCb).toHaveBeenCalledWith({
    containerPort: 8080,
    name: 'http2-test',
    protocol: 'TCP',
  })

  protocol.prop('onChange')('REDIS')
  expect(onchangeCb).toHaveBeenCalledWith({
    containerPort: 8080,
    name: 'redis-0',
    protocol: 'TCP',
  })

  protocol.prop('onChange')('UDP')
  expect(onchangeCb).toHaveBeenCalledWith({
    containerPort: 8080,
    name: 'udp-0',
    protocol: 'UDP',
  })
})
