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

import { observable } from 'mobx'
import Store from './index'

const sort_metric_options = [
  'node_cpu_utilisation',
  'node_load1',
  'node_memory_utilisation',
  'node_disk_size_utilisation',
  'node_disk_inode_utilisation',
  'node_pod_utilisation',
]

const metrics_filter = [
  'node_cpu_utilisation',
  'node_cpu_usage',
  'node_cpu_total',

  'node_memory_utilisation',
  'node_memory_usage_wo_cache',
  'node_memory_total',

  'node_disk_size_utilisation',
  'node_disk_size_usage',
  'node_disk_size_capacity',

  'node_pod_utilisation',
  'node_pod_running_count',
  'node_pod_quota',

  'node_disk_inode_utilisation',
  'node_disk_inode_total',
  'node_disk_inode_usage',

  'node_load1$',
]

export default class NodeStore extends Store {
  @observable
  sort_metric_options = sort_metric_options

  @observable
  sort_metric = sort_metric_options[0]

  @observable
  metrics_filter = metrics_filter.join('|')

  resource = 'nodes'
}
