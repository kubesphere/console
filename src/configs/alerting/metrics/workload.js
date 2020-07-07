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
  getBaseRuleConfig,
  PERCENT_RULE_CONFIG,
  CPU_RULE_CONFIG,
  MEMORY_RULE_CONFIG,
} from './rule.config'

const BANDWIDTH_RULE_CONFIG = getBaseRuleConfig({
  thresholds: {
    unit: 'Kbps',
  },
})

export default {
  workload_cpu_usage: {
    label: 'cpu usage',
    prefixIcon: 'cpu',
    ruleConfig: CPU_RULE_CONFIG,
  },
  workload_memory_usage: {
    label: 'memory usage (including cache)',
    prefixIcon: 'memory',
    ruleConfig: MEMORY_RULE_CONFIG,
  },
  workload_memory_usage_wo_cache: {
    label: 'memory usage',
    prefixIcon: 'memory',
    ruleConfig: MEMORY_RULE_CONFIG,
  },
  workload_net_bytes_transmitted: {
    label: 'network data transmitting rate',
    prefixIcon: 'network',
    ruleConfig: BANDWIDTH_RULE_CONFIG,
  },
  workload_net_bytes_received: {
    label: 'network data receiving rate',
    prefixIcon: 'network',
    ruleConfig: BANDWIDTH_RULE_CONFIG,
  },
  workload_deployment_unavailable_replicas_ratio: {
    kind: 'deployment',
    label: 'Unavailable deployment replicas ratio',
    prefixIcon: 'backup',
    ruleConfig: PERCENT_RULE_CONFIG,
  },
  workload_daemonset_unavailable_replicas_ratio: {
    kind: 'daemonset',
    label: 'Unavailable daemonset replicas ratio',
    prefixIcon: 'deamon-set',
    ruleConfig: PERCENT_RULE_CONFIG,
  },
  workload_statefulset_unavailable_replicas_ratio: {
    kind: 'statefulset',
    label: 'Unavailable statefulset replicas ratio',
    prefixIcon: 'stateful-set',
    ruleConfig: PERCENT_RULE_CONFIG,
  },
}
