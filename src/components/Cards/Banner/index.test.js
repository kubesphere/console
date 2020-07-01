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
import { set } from 'lodash'
import styles from 'identity-obj-proxy'

import Banner from './index'

beforeAll(() => {
  set(globals, 'user.username', 'admin')
})

it('renders correctly', () => {
  const tips = [
    {
      title: 'SERVICE_TYPES_Q',
      description: 'SERVICE_TYPES_A',
    },
    {
      title: 'SCENARIOS_FOR_SERVICES_Q',
      description: 'SCENARIOS_FOR_SERVICES_A',
    },
  ]

  const handleTabChange = jest.fn()

  const tabs = {
    value: 'deployments',
    onChange: handleTabChange,
    options: [
      {
        value: 'deployments',
        label: 'Deployments',
        count: 10,
      },
      {
        value: 'statefulsets',
        label: 'StatefulSets',
        count: 8,
      },
      {
        value: 'daemonsets',
        label: 'DaemonSets',
        count: 2,
      },
    ],
  }

  const props = {
    title: 'Workloads',
    description: 'WORKLOAD_DESC',
    module: 'deployments',
    tips,
    tabs,
  }

  const wrapper = mount(<Banner {...props} />)
  expect(wrapper.find(`.${styles.title} .h3`)).toHaveText(props.title)
  expect(wrapper.find(`.${styles.title} .text-second`)).toIncludeText(
    props.description
  )
  expect(wrapper.find(`.${styles.tip}`)).toHaveLength(2)
  expect(wrapper.find(`.${styles.tabsWrapper} [type="radio"]`)).toHaveLength(3)

  wrapper
    .find(`.${styles.tabsWrapper} [type="radio"]`)
    .at(2)
    .prop('onChange')({
    target: { checked: true },
  })
  expect(handleTabChange).toHaveBeenCalledWith('daemonsets', undefined)
})
