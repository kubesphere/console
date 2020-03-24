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

import Base from './base'

const mock = [
  {
    name: 'qingcloudcluster',
    description: '描述信息',
    icon: 'qingcloud',
    status: 'active',
    labels: {
      env: '生产环境',
    },
    nodeCount: 12,
    k8sVersion: 'v1.13.5',
    provider: 'QingCloud',
    createTime: Date.now(),
  },
  {
    name: 'kubernetescluster',
    description: '描述信息',
    icon: 'kubernetes',
    status: 'active',
    labels: {
      env: '测试环境',
    },
    nodeCount: 6,
    k8sVersion: 'v1.14.1',
    provider: '自定义',
    createTime: Date.now(),
  },
  {
    name: 'vSpherecluster-dev',
    description: '描述信息',
    icon: 'vmware',
    status: 'active',
    labels: {
      env: '开发环境',
    },
    nodeCount: 6,
    k8sVersion: 'v1.14.1',
    provider: 'Vmware',
    createTime: Date.now(),
  },
]

export default class ClusterStore extends Base {
  @observable
  initializing = true

  @observable
  isLoading = false

  @observable
  data = {}

  constructor() {
    super()
    this.module = 'clusters'
  }

  @action
  async fetchList() {
    this.list.isLoading = true

    this.list.update({
      data: mock,
      total: mock.length || 0,
      limit: 10,
      page: 1,
      isLoading: false,
    })
  }

  @action
  async fetchDetail({ cluster }) {
    this.data = mock.find(item => item.name === cluster) || {}
  }
}
