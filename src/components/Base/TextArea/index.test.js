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
import TextArea from './index'

it('renders correctly', () => {
  const props = {
    value: 'test',
    placeholder: 'placeholder',
    onChange: jest.fn(),
  }
  const wrapper = mount(<TextArea {...props} />)
  const textarea = wrapper.find('textarea')

  expect(textarea).toHaveProp({ placeholder: props.placeholder })
  expect(textarea).toHaveProp({ value: props.value })
})

it('renders with autoResize', () => {
  const props = {
    value: 'test',
    placeholder: 'placeholder',
    autoResize: true,
    onChange: jest.fn(),
  }
  const wrapper = mount(<TextArea {...props} />)

  expect(wrapper.find('textarea')).toHaveClassName(styles.textareaAuto)

  wrapper.find('textarea').simulate('change', {
    target: {
      value: `test\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\ntest`,
    },
  })
  expect(props.onChange).toHaveBeenCalledWith(
    'test\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\ntest'
  )
})
