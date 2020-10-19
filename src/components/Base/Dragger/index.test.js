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
import Dragger from './index'

jest.useFakeTimers()

it('renders correctly', () => {
  const wrapper = mount(
    <Dragger
      style={{ height: '800px', width: '800px' }}
      initialScale={0.5}
      class="container"
      contentClassName="content"
    >
      <div />
    </Dragger>
  )

  return Promise.resolve(wrapper)
    .then(() => wrapper.update())
    .then(() => {
      const content = wrapper.find('.main_content').first()
      expect(wrapper.find('.container')).toExist()
      expect(content).toExist()
      expect(
        getComputedStyle(content.getDOMNode()).getPropertyValue(`transform`)
      ).toEqual(expect.stringContaining('scale(0.5)'))
    })
})

it('scale correctly', () => {
  const wrapper = mount(
    <Dragger initialScale={0.5} class="container" contentClassName="content">
      <div />
    </Dragger>
  )

  return Promise.resolve(wrapper)
    .then(() => wrapper.update())
    .then(() => {
      wrapper
        .find('.kubed-icon-substract')
        .first()
        .simulate('click')
      const content = wrapper.find('.main_content').first()
      expect(content).toExist()
      expect(
        getComputedStyle(content.getDOMNode()).getPropertyValue(`transform`)
      ).toEqual(expect.stringContaining('scale(0.3)'))
    })
})

it('mouseWheel change correctly', () => {
  const wrapper = mount(
    <Dragger initialScale={0.5} class="container" contentClassName="content">
      <div style={{ height: '200px', width: '200px' }} />
    </Dragger>
  )

  return Promise.resolve(wrapper)
    .then(() => wrapper.update())
    .then(() => {
      const content = wrapper.find('.main_content').first()
      const container = wrapper.find('.container').first()
      expect(content).toExist()
      expect(container).toExist()

      wrapper.instance().handleWheel({
        clientX: 0,
        clientY: 0,
        deltaY: 4,
        preventDefault: () => {},
        stopPropagation: () => {},
      })
      expect(
        getComputedStyle(content.getDOMNode()).getPropertyValue(`transform`)
      ).toEqual(expect.stringContaining('scale(0.46)'))
    })
})

it('move correctly', () => {
  const wrapper = mount(
    <Dragger initialScale={0.5} class="container" contentClassName="content">
      <div style={{ height: '200px', width: '200px' }} />
    </Dragger>
  )

  return Promise.resolve(wrapper)
    .then(() => wrapper.update())
    .then(() => {
      const content = wrapper.find('.main_content').first()
      const container = wrapper.find('.container').first()
      expect(content).toExist()
      expect(container).toExist()

      container.simulate('mouseDown', { button: 0, clientX: 0, clientY: 0 })
      container.simulate('mouseMove', { clientX: 0, clientY: 0 })
      container.simulate('mouseMove', { clientX: 10, clientY: 10 })
      container.simulate('mouseUp', { clientX: 10, clientY: 10 })
      expect(
        getComputedStyle(content.getDOMNode()).getPropertyValue(`transform`)
      ).toEqual(expect.stringContaining('translate3d(10px, 10px, 0)'))
    })
})
