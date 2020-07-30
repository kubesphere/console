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

import { action, observable } from 'mobx'

import ObjectMapper from 'utils/object.mapper'

export default class EventsStore {
  @observable
  list = {
    data: [],
    page: 1,
    limit: 10,
    total: 0,
    isLoading: true,
  }

  @action
  async fetchList({ name, cluster, namespace, ...rest }) {
    this.list.isLoading = true

    const clusterPath = cluster ? `/klusters/${cluster}` : ''
    const namespacePath = namespace ? `/namespaces/${namespace}` : ''
    let result = await request.get(
      `api/v1${clusterPath}${namespacePath}/events`,
      rest
    )

    result = {
      kind: 'EventList',
      apiVersion: 'v1',
      metadata: {
        selfLink: '/api/v1/namespaces/test3/events',
        resourceVersion: '33035',
      },
      items: [
        {
          metadata: {
            name: 'hpa-v1.1626831d5e6edcd5',
            namespace: 'test3',
            selfLink: '/api/v1/namespaces/test3/events/hpa-v1.1626831d5e6edcd5',
            uid: '8efa24e3-be6c-4d54-91e7-f67f18ed2450',
            resourceVersion: '30257',
            creationTimestamp: '2020-07-30T12:56:57Z',
          },
          involvedObject: {
            kind: 'Deployment',
            namespace: 'test3',
            name: 'hpa-v1',
            uid: 'f81e3caf-3938-4ffd-b1ab-95ca82b00005',
            apiVersion: 'apps/v1',
            resourceVersion: '30252',
          },
          reason: 'ScalingReplicaSet',
          message: 'Scaled up replica set hpa-v1-76c6f6c8d5 to 4',
          source: {
            component: 'deployment-controller',
          },
          firstTimestamp: '2020-07-30T11:08:00Z',
          lastTimestamp: '2020-07-30T12:56:57Z',
          count: 3,
          type: 'Normal',
          eventTime: null,
          reportingComponent: '',
          reportingInstance: '',
        },
        {
          metadata: {
            name: 'hpa-v1.162683211f44dc23',
            namespace: 'test3',
            selfLink: '/api/v1/namespaces/test3/events/hpa-v1.162683211f44dc23',
            uid: 'b4fd63fa-77b9-4e57-b53e-f8bd8b744873',
            resourceVersion: '30358',
            creationTimestamp: '2020-07-30T12:57:14Z',
          },
          involvedObject: {
            kind: 'Deployment',
            namespace: 'test3',
            name: 'hpa-v1',
            uid: 'f81e3caf-3938-4ffd-b1ab-95ca82b00005',
            apiVersion: 'apps/v1',
            resourceVersion: '30350',
          },
          reason: 'ScalingReplicaSet',
          message: 'Scaled up replica set hpa-v1-76c6f6c8d5 to 5',
          source: {
            component: 'deployment-controller',
          },
          firstTimestamp: '2020-07-30T11:08:16Z',
          lastTimestamp: '2020-07-30T12:57:14Z',
          count: 2,
          type: 'Normal',
          eventTime: null,
          reportingComponent: '',
          reportingInstance: '',
        },
        {
          metadata: {
            name: 'hpa-v1.1626832bdd6b7cdf',
            namespace: 'test3',
            selfLink: '/api/v1/namespaces/test3/events/hpa-v1.1626832bdd6b7cdf',
            uid: 'bce280b0-3e0e-4a76-abbb-3643c77d5f7f',
            resourceVersion: '30609',
            creationTimestamp: '2020-07-30T12:57:59Z',
          },
          involvedObject: {
            kind: 'Deployment',
            namespace: 'test3',
            name: 'hpa-v1',
            uid: 'f81e3caf-3938-4ffd-b1ab-95ca82b00005',
            apiVersion: 'apps/v1',
            resourceVersion: '30603',
          },
          reason: 'ScalingReplicaSet',
          message: 'Scaled up replica set hpa-v1-76c6f6c8d5 to 10',
          source: {
            component: 'deployment-controller',
          },
          firstTimestamp: '2020-07-30T11:09:02Z',
          lastTimestamp: '2020-07-30T12:57:59Z',
          count: 3,
          type: 'Normal',
          eventTime: null,
          reportingComponent: '',
          reportingInstance: '',
        },
        {
          metadata: {
            name: 'hpa-v1.162683c357ab7b15',
            namespace: 'test3',
            selfLink: '/api/v1/namespaces/test3/events/hpa-v1.162683c357ab7b15',
            uid: 'b2564e1a-246a-4b65-9c94-7211286ab37d',
            resourceVersion: '32048',
            creationTimestamp: '2020-07-30T13:06:57Z',
          },
          involvedObject: {
            kind: 'Deployment',
            namespace: 'test3',
            name: 'hpa-v1',
            uid: 'f81e3caf-3938-4ffd-b1ab-95ca82b00005',
            apiVersion: 'apps/v1',
            resourceVersion: '32034',
          },
          reason: 'ScalingReplicaSet',
          message: 'Scaled down replica set hpa-v1-76c6f6c8d5 to 1',
          source: {
            component: 'deployment-controller',
          },
          firstTimestamp: '2020-07-30T11:19:52Z',
          lastTimestamp: '2020-07-30T13:06:57Z',
          count: 3,
          type: 'Normal',
          eventTime: null,
          reportingComponent: '',
          reportingInstance: '',
        },
      ],
    }

    this.list = {
      data: result.items.map(ObjectMapper.events),
      total: result.items.length,
      isLoading: false,
    }
  }
}
