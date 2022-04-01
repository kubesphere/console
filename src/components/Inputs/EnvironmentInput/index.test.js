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

import EnvironmentInput from './index'

jest.mock('lodash/debounce', () => jest.fn(fn => fn))

const props = {
  onChange: jest.fn(),
  configMaps: [
    {
      uid: 'd85469ad-6fa7-4cb7-8d43-c5a84254ad32',
      name: 'aaa',
      namespace: 'test-1',
      data: { aaa: 'bbb' },
    },
  ],
  secrets: [
    {
      uid: '79232937-724a-49b0-aa58-c51965e09069',
      name: 'aaa',
      namespace: 'test-1',
      type: 'Opaque',
      data: { aaa: 'bbb' },
    },
  ],
}

it('renders correctly', () => {
  const wrapper = mount(<EnvironmentInput {...props} />)

  let items = wrapper.find('EnvironmentInputItem')
  const button = wrapper.find('button[data-test="add-env-configmap"]')
  expect(items).toHaveLength(1)
  expect(items.first().find('input[name="name"]')).toHaveValue('')
  expect(items.first().find('input[name="value"]')).toHaveValue('')
  expect(button).toExist()

  wrapper.setProps({ value: [{ name: 'aaa', value: 'bbb' }] })
  items = wrapper.find('EnvironmentInputItem')
  expect(items.first().find('input[name="name"]')).toHaveProp({ value: 'aaa' })
  expect(items.first().find('input[name="value"]')).toHaveProp({ value: 'bbb' })

  wrapper.setProps({
    value: [
      { name: 'aaa', value: 'bbb' },
      {
        name: 'xxx',
        valueFrom: {
          configMapKeyRef: {
            name: 'aaa',
            key: 'aaa',
          },
        },
      },
      {
        name: 'yyy',
        valueFrom: {
          secretKeyRef: {
            name: 'aaa',
            key: 'aaa',
          },
        },
      },
      {
        name: 'zzz',
        valueFrom: {
          secretKeyRef: {
            name: 'aaax',
            key: 'aaa',
          },
        },
      },
    ],
  })
  items = wrapper.find('EnvironmentInputItem')
  expect(items).toHaveLength(4)
  expect(items.at(1).find('Input[name="name"]')).toHaveProp({ value: 'xxx' })
  expect(items.at(1).find('Select[name="resource"]')).toHaveProp({
    value: 'aaa',
  })
  expect(items.at(1).find('Select[name="resourceKey"]')).toHaveProp({
    value: 'aaa',
  })

  items
    .at(1)
    .find('Input[name="name"]')
    .prop('onChange')('xxxyyy')

  expect(props.onChange).toHaveBeenCalledWith([
    { name: 'aaa', value: 'bbb' },
    {
      name: 'xxxyyy',
      valueFrom: {
        configMapKeyRef: {
          name: '',
          key: 'aaa',
        },
      },
    },
    {
      name: 'yyy',
      valueFrom: {
        secretKeyRef: {
          name: 'aaa',
          key: 'aaa',
        },
      },
    },
    {
      name: 'zzz',
      valueFrom: {
        secretKeyRef: {
          name: 'aaax',
          key: 'aaa',
        },
      },
    },
  ])
})
