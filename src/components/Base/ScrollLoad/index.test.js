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

import ScrollLoad from './index'

it('renders correctly', () => {
  const data = Array(20)
    .fill('')
    .map((item, index) => ({
      label: `label-${index}`,
      value: `value-${index}`,
    }))

  const props = {
    data: data.slice(0, 10),
    total: data.length,
    page: 1,
    loading: false,
    onFetch: jest.fn(),
  }

  const wrapper = mount(
    <ScrollLoad {...props}>
      {data.map(item => (
        <div key={item.value}>{item.label}</div>
      ))}
    </ScrollLoad>
  )

  expect(props.onFetch).toHaveBeenCalledTimes(1)

  wrapper.find(`.${styles.main}`).prop('onScrollCapture')()

  expect(props.onFetch).toHaveBeenCalledWith({
    more: true,
    page: 2,
  })
})
