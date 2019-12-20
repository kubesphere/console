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

import { getNodeRoles, getConditionsStatus, getNodeStatus } from './node'

it('getNodeRoles', () => {
  const labels = { app: 'xxx', 'node-role.kubernetes.io/master': 'true' }
  expect(getNodeRoles(labels)).toStrictEqual(['master'])
  expect(getNodeRoles()).toStrictEqual([])
})

it('getConditionsStatus', () => {
  const record = { status: 'Unknown' }
  expect(getConditionsStatus(record)).toBe('Warning')

  expect(getConditionsStatus({})).toBe('Running')

  const arrs = [
    { type: 'OutOfDisk', status: 'True', result: 'Warning' },
    { type: 'OutOfDisk', status: 'False', result: 'Running' },
    { type: 'MemoryPressure', status: 'True', result: 'Warning' },
    { type: 'MemoryPressure', status: 'False', result: 'Running' },
    { type: 'DiskPressure', status: 'True', result: 'Warning' },
    { type: 'DiskPressure', status: 'False', result: 'Running' },
    { type: 'PIDPressure', status: 'True', result: 'Warning' },
    { type: 'PIDPressure', status: 'False', result: 'Running' },
    { type: 'NetworkUnavailable', status: 'True', result: 'Warning' },
    { type: 'NetworkUnavailable', status: 'False', result: 'Running' },
    { type: 'ConfigOK', status: 'False', result: 'Warning' },
    { type: 'ConfigOK', status: 'True', result: 'Running' },
    { type: 'KubeletReady', status: 'False', result: 'Warning' },
    { type: 'KubeletReady', status: 'True', result: 'Running' },
    { type: 'Ready', status: 'False', result: 'Warning' },
    { type: 'Ready', status: 'True', result: 'Running' },
  ]

  arrs.forEach(({ result, ...rest }) => {
    expect(getConditionsStatus(rest)).toBe(result)
  })
})

it('getNodeStatus', () => {
  expect(getNodeStatus({})).toBe('Running')
  expect(getNodeStatus({ spec: { unschedulable: true } })).toBe('Unschedulable')
  expect(
    getNodeStatus({
      status: { conditions: [{ type: 'OutOfDisk', status: 'False' }] },
    })
  ).toBe('Running')
  expect(
    getNodeStatus({
      status: { conditions: [{ type: 'OutOfDisk', status: 'True' }] },
    })
  ).toBe('Warning')
})
