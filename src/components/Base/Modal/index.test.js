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

import Modal from './index'

it('renders correctly', () => {
  const props = {
    icon: 'pen',
    title: 'modal title',
    description: 'modal description',
    visible: true,
    onOk: jest.fn(),
    onCancel: jest.fn(),
  }

  const wrapper = mount(<Modal {...props}>Checkbox</Modal>)
  expect(
    wrapper.find(`.${styles.title} .${styles.text} > div`).first()
  ).toHaveText(props.title)
  expect(
    wrapper.find(`.${styles.title} .${styles.text} > div`).last()
  ).toHaveText(props.description)
  expect(wrapper.find(`.${styles.body}`)).toHaveText('Checkbox')

  wrapper
    .find(`.${styles.footer} button`)
    .first()
    .simulate('click')
  expect(props.onCancel).toHaveBeenCalled()

  wrapper
    .find(`.${styles.footer} button`)
    .last()
    .simulate('click')
  expect(props.onCancel).toHaveBeenCalled()
})
