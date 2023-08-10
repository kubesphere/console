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
  PERCENT_RULE_CONFIG,
  CORE_RULE_CONFIG,
  MIB_RULE_CONFIG,
  MBPS_RULE_CONFIG,
} from './rule.config'

export default {
  'cpu:usage': {
    label: 'CPU_USAGE_SCAP',
    tcapLabel: 'CPU_USAGE_TCAP',
    prefixIcon: 'cpu',
    ruleConfig: CORE_RULE_CONFIG,
  },
  'memory:usage': {
    label: 'MEMORY_USAGE_SCAP',
    tcapLabel: 'MEMORY_USAGE_TCAP',
    prefixIcon: 'memory',
    ruleConfig: MIB_RULE_CONFIG,
  },
  'memory:usageWoCache': {
    label: 'MEMORY_USAGE_WO_CACHE_SCAP',
    tcapLabel: 'MEMORY_USAGE_WO_CACHE_TCAP',
    prefixIcon: 'memory',
    ruleConfig: MIB_RULE_CONFIG,
  },
  'network:transmittedRate': {
    label: 'DATA_SEND_RATE',
    tcapLabel: 'DATA_SEND_RATE_TCAP',
    prefixIcon: 'network',
    ruleConfig: MBPS_RULE_CONFIG,
  },
  'network:receivedRate': {
    label: 'DATA_RECEIVE_RATE',
    tcapLabel: 'DATA_RECEIVE_RATE_TCAP',
    prefixIcon: 'network',
    ruleConfig: MBPS_RULE_CONFIG,
  },
  'replica:unavailableRatio': {
    label: 'UNAVAILABLE_WORKLOAD_REPLICA_RATIO',
    tcapLabel: 'UNAVAILABLE_WORKLOAD_REPLICA_RATIO_NO_PERCENT_TCAP',
    prefixIcon: 'backup',
    ruleConfig: PERCENT_RULE_CONFIG,
  },
}
