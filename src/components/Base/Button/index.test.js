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
import { Icon, Loading } from '@pitrix/lego-ui'

import Button from './index'

it('renders correctly', () => {
  const props = {
    type: 'control',
    htmlType: 'submit',
    className: 'primary',
    icon: 'refresh',
  }

  const wrapper = mount(<Button {...props}>Test</Button>)
  expect(wrapper.find('button')).toHaveText('Test')
  expect(wrapper.find('button')).toHaveClassName(styles.control)
  expect(wrapper.find('button')).toHaveClassName(styles.hasIcon)
  expect(wrapper.find('button')).toHaveProp('type', props.htmlType)
  expect(wrapper.find('button')).toHaveProp('type', props.htmlType)
  expect(wrapper.find(Icon)).toHaveLength(1)

  wrapper.setProps({ loading: true })
  expect(wrapper.find(Loading)).toExist()
})

it('call onClick', () => {
  const onClick = jest.fn()
  const wrapper = mount(<Button onClick={onClick} />)
  wrapper.find('button').simulate('click')

  expect(onClick).toHaveBeenCalled()
})

it('not call onClick if disabled', () => {
  const onClick = jest.fn()
  const wrapper = mount(<Button onClick={onClick} disabled />)
  wrapper.find('button').simulate('click')

  expect(onClick).not.toHaveBeenCalled()
})
