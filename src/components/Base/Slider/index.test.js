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

import { Slider as BaseSlider } from '@pitrix/lego-ui'
import Slider from './index'

it('renders correctly', () => {
  const props = {
    name: 'storage',
    min: 0,
    max: 2048,
    defaultValue: '10Gi',
    step: 1,
    unit: 'Gi',
    marks: {
      '0': '0',
      '512': '512Gi',
      '1024': '1024Gi',
      '1536': '1536Gi',
      '2048': '2048Gi',
    },
    onChange: jest.fn(),
  }

  const wrapper = mount(<Slider {...props} />)
  expect(wrapper.find(BaseSlider)).toExist()
  wrapper.find(BaseSlider).prop('onChange')(20)
  expect(props.onChange).toHaveBeenCalledWith(`20${props.unit}`)

  wrapper.setProps({ value: '30Gi' })
  expect(wrapper.find(BaseSlider)).toHaveProp('value', 30)

  wrapper.setProps({ defaultValue: undefined })
  expect(wrapper.find(BaseSlider)).toHaveProp('defaultValue', 0)
})
