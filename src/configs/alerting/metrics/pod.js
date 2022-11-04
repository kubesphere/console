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
  pod_cpu_usage: {
    label: 'CPU_USAGE_SCAP',
    prefixIcon: 'cpu',
    ruleConfig: CPU_RULE_CONFIG,
  },
  pod_cpu_utilisation: {
    label: 'CPU_UTILIZATION_SCAP',
    prefixIcon: 'cpu',
    ruleConfig: PERCENT_RULE_CONFIG,
  },
  pod_memory_usage: {
    label: 'MEMORY_USAGE_SCAP',
    prefixIcon: 'memory',
    ruleConfig: MEMORY_RULE_CONFIG,
  },
  pod_memory_usage_wo_cache: {
    label: 'MEMORY_USAGE_WO_CACHE_SCAP',
    prefixIcon: 'memory',
    ruleConfig: MEMORY_RULE_CONFIG,
  },
  pod_memory_utilisation: {
    label: 'MEMORY_UTILIZATION_SCAP',
    prefixIcon: 'memory',
    ruleConfig: PERCENT_RULE_CONFIG,
  },
  pod_net_bytes_transmitted: {
    label: 'DATA_SEND_RATE',
    prefixIcon: 'network',
    ruleConfig: BANDWIDTH_RULE_CONFIG,
  },
  pod_net_bytes_received: {
    label: 'DATA_RECEIVE_RATE',
    prefixIcon: 'network',
    ruleConfig: BANDWIDTH_RULE_CONFIG,
  },
}
