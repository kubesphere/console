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

import {
  BASE_RULE_CONFIG,
  PERCENT_RULE_CONFIG,
  DISK_RULE_CONFIG,
  THROUGHPUT_RULE_CONFIG,
  BANDWIDTH_RULE_CONFIG,
} from './rule.config'

export default {
  node_pod_abnormal_ratio: {
    label: 'pod abnormal ratio',
    prefixIcon: 'pod',
    ruleConfig: PERCENT_RULE_CONFIG,
  },
  node_pod_utilisation: {
    label: 'pod utilization rate',
    prefixIcon: 'pod',
    ruleConfig: PERCENT_RULE_CONFIG,
  },
  node_cpu_utilisation: {
    label: 'cpu utilization rate',
    prefixIcon: 'cpu',
    ruleConfig: PERCENT_RULE_CONFIG,
  },
  node_load1: {
    label: 'load1',
    prefixIcon: 'cpu',
    ruleConfig: BASE_RULE_CONFIG,
  },
  node_load5: {
    label: 'load5',
    prefixIcon: 'cpu',
    ruleConfig: BASE_RULE_CONFIG,
  },
  node_load15: {
    label: 'load15',
    prefixIcon: 'cpu',
    ruleConfig: BASE_RULE_CONFIG,
  },
  node_memory_available: {
    label: 'memory available',
    prefixIcon: 'memory',
    ruleConfig: DISK_RULE_CONFIG,
  },
  node_memory_utilisation: {
    label: 'memory utilization rate',
    prefixIcon: 'memory',
    ruleConfig: PERCENT_RULE_CONFIG,
  },
  node_disk_size_available: {
    label: 'disk space available',
    prefixIcon: 'storage',
    ruleConfig: DISK_RULE_CONFIG,
  },
  node_disk_size_utilisation: {
    label: 'local disk space utilization rate',
    prefixIcon: 'storage',
    ruleConfig: PERCENT_RULE_CONFIG,
  },
  node_disk_inode_utilisation: {
    label: 'inode utilization rate',
    prefixIcon: 'storage',
    ruleConfig: PERCENT_RULE_CONFIG,
  },
  node_disk_read_iops: {
    label: 'disk read iops',
    prefixIcon: 'storage',
    ruleConfig: BASE_RULE_CONFIG,
  },
  node_disk_write_iops: {
    label: 'disk write iops',
    prefixIcon: 'storage',
    ruleConfig: BASE_RULE_CONFIG,
  },
  node_disk_read_throughput: {
    label: 'disk read throughput',
    prefixIcon: 'storage',
    ruleConfig: THROUGHPUT_RULE_CONFIG,
  },
  node_disk_write_throughput: {
    label: 'disk write throughput',
    prefixIcon: 'storage',
    ruleConfig: THROUGHPUT_RULE_CONFIG,
  },
  node_net_bytes_transmitted: {
    label: 'network data transmitting rate',
    prefixIcon: 'network',
    ruleConfig: BANDWIDTH_RULE_CONFIG,
  },
  node_net_bytes_received: {
    label: 'network data receiving rate',
    prefixIcon: 'network',
    ruleConfig: BANDWIDTH_RULE_CONFIG,
  },
}
