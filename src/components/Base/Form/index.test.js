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
import { Button } from 'components/Base'
import { Input, TextArea } from '@pitrix/lego-ui'

import Form from './index'

it('renders correctly', () => {
  const data = {
    name: 'redis-001',
    alias: 'Redis',
    desc: 'redis for lab',
  }

  const wrapper = mount(
    <Form data={data}>
      <Form.Item label={'Name'} desc={'SERVICE_NAME_DESC'}>
        <Input name="name" />
      </Form.Item>
      <Form.Item label={'Alias'} desc={'ALIAS_DESC'}>
        <Input name="alias" />
      </Form.Item>
      <Form.Item label={'Description'}>
        <TextArea name="desc" />
      </Form.Item>
    </Form>
  )

  expect(wrapper.find('form')).toExist()
  expect(wrapper.find('input[name="name"]')).toHaveValue(data.name)
  expect(wrapper.find('input[name="alias"]')).toHaveValue(data.alias)
  expect(wrapper.find('textarea[name="desc"]')).toHaveValue(data.desc)
})

it('submit correctly', () => {
  const data = {
    name: 'redis-001',
    alias: 'Redis',
    desc: 'redis for lab',
  }

  const handleSubmit = jest.fn()

  const wrapper = mount(
    <Form onSubmit={handleSubmit}>
      <Form.Item label={'Name'} desc={'SERVICE_NAME_DESC'}>
        <Input name="name" />
      </Form.Item>
      <Form.Item label={'Alias'} desc={'ALIAS_DESC'}>
        <Input name="alias" />
      </Form.Item>
      <Form.Item label={'Description'}>
        <TextArea name="desc" />
      </Form.Item>
      <Button htmlType="submit">Submit</Button>
    </Form>
  )

  wrapper.find('input[name="name"]').prop('onChange')({
    target: { value: data.name },
    currentTarget: { value: data.name },
  })
  wrapper.find('input[name="alias"]').prop('onChange')({
    target: { value: data.alias },
    currentTarget: { value: data.alias },
  })
  wrapper.find('textarea[name="desc"]').prop('onChange')({
    target: { value: data.desc },
    currentTarget: { value: data.desc },
  })

  wrapper.find('button[type="submit"]').simulate('submit')
  expect(handleSubmit).toHaveBeenCalledWith(data)
})
