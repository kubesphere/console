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

import Card from './index'

it('renders correctly', () => {
  const props = {
    title: 'Test',
    operations: 'test operations',
  }

  const wrapper = mount(<Card {...props}>Children</Card>)
  expect(wrapper).toIncludeText(props.title)
  expect(wrapper).toIncludeText('Children')
  expect(wrapper.find(`.${styles.default}`)).toHaveLength(1)
  expect(wrapper.find(`.${styles.operations}`)).toHaveLength(1)

  wrapper.setProps({ loading: true })
  expect(wrapper.find(`.${styles.loading}`)).toExist()

  wrapper.setProps({ loading: false, empty: 'test empty' })
  expect(wrapper.find(`.${styles.loading}`)).toHaveLength(0)
  expect(wrapper.find(`.${styles.empty}`)).toHaveLength(0)

  wrapper.setProps({ isEmpty: true })
  expect(wrapper.find(`.${styles.empty}`)).toHaveLength(1)
})
