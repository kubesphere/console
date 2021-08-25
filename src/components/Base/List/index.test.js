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

import List from './index'

it('renders correctly', () => {
  const value = {
    key1: 'data1',
    key2: 'data2',
  }

  const onAdd = jest.fn()
  const onDelete = jest.fn()
  const onEdit = jest.fn()

  const wrapper = mount(
    <List>
      {' '}
      {Object.entries(value).map(([key, _value]) => (
        <List.Item
          key={key}
          icon="key"
          title={key}
          description={_value || '-'}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}{' '}
      <List.Add
        title={'ADD_DATA_TCAP'}
        description={'ADD_DATA_DESC'}
        onClick={onAdd}
      />{' '}
    </List>
  )
  expect(wrapper).toIncludeText('key1')
  expect(wrapper).toIncludeText('key2')
  expect(wrapper).toIncludeText('data1')
  expect(wrapper).toIncludeText('data2')

  wrapper
    .find('button')
    .first()
    .simulate('click')
  expect(onDelete).toHaveBeenCalled()

  wrapper
    .find('button')
    .at(1)
    .simulate('click')
  expect(onEdit).toHaveBeenCalled()

  wrapper.find(`.${styles.add}`).simulate('click')
  expect(onAdd).toHaveBeenCalled()
})
