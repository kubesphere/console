/*
 * This file i s part of KubeSphere Console.
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

import Bar from './index'

it('renders correctly', () => {
  const props = {
    value: 0.5,
    text: 'Used',
  }

  let wrapper = mount(<Bar {...props} />)
  expect(wrapper).toIncludeText(props.text)

  let $bar = wrapper.find('div > div').first()
  const $text = wrapper.find('div > span').first()
  expect($bar).toHaveStyle('width', '50%')
  expect($bar).toHaveClassName(styles.default)
  expect($text).toHaveStyle('left', '25%')
  expect($text).toHaveStyle('transform', 'translateX(-50%)')
  expect($text).toHaveStyle('color', '#fff')

  props.value = 0.85
  wrapper = mount(<Bar {...props} />)
  $bar = wrapper.find('div > div').first()
  expect($bar).toHaveClassName(styles.warning)

  props.value = 0.96
  wrapper = mount(<Bar {...props} />)
  $bar = wrapper.find('div > div').first()
  expect($bar).toHaveClassName(styles.danger)
})
