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
  'namespace:workload_cpu_usage:sum{$1}': {
    label: 'cpu usage',
    prefixIcon: 'cpu',
    ruleConfig: CPU_RULE_CONFIG,
  },
  'namespace:workload_memory_usage:sum{$1}': {
    label: 'memory usage (including cache)',
    prefixIcon: 'memory',
    ruleConfig: MEMORY_RULE_CONFIG,
  },
  'namespace:workload_memory_usage_wo_cache:sum{$1}': {
    label: 'memory usage',
    prefixIcon: 'memory',
    ruleConfig: MEMORY_RULE_CONFIG,
  },
  'namespace:workload_net_bytes_transmitted:sum_irate{$1}': {
    label: 'network data transmitting rate',
    prefixIcon: 'network',
    ruleConfig: BANDWIDTH_RULE_CONFIG,
  },
  'namespace:workload_net_bytes_received:sum_irate{$1}': {
    label: 'network data receiving rate',
    prefixIcon: 'network',
    ruleConfig: BANDWIDTH_RULE_CONFIG,
  },
  'namespace:$2_unavailable_replicas:ratio{$1}': {
    label: 'Unavailable replicas ratio',
    prefixIcon: 'backup',
    ruleConfig: PERCENT_RULE_CONFIG,
  },
}
