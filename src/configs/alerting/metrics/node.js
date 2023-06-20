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
  GIB_RULE_CONFIG,
  MBPS_RULE_CONFIG,
  GB_RULE_CONFIG,
  KBS_RULE_CONFIG,
} from './rule.config'

export const NODE_ALERTING_CONFIG = {
  'cpu:utilization': {
    label: 'CPU_UTILIZATION_SCAP',
    tcapLabel: 'CPU_UTILIZATION_NO_PERCENT_TCAP',
    prefixIcon: 'cpu',
    ruleConfig: PERCENT_RULE_CONFIG,
  },
  'cpu:load1m': {
    label: 'CPU_LOAD_1',
    tcapLabel: 'CPU_LOAD_1_TCAP',
    prefixIcon: 'cpu',
    ruleConfig: BASE_RULE_CONFIG,
  },
  'cpu:load5m': {
    label: 'CPU_LOAD_5',
    tcapLabel: 'CPU_LOAD_5_TCAP',
    prefixIcon: 'cpu',
    ruleConfig: BASE_RULE_CONFIG,
  },
  'cpu:load15m': {
    label: 'CPU_LOAD_15',
    tcapLabel: 'CPU_LOAD_15_TCAP',
    prefixIcon: 'cpu',
    ruleConfig: BASE_RULE_CONFIG,
  },
  'memory:utilization': {
    label: 'MEMORY_UTILIZATION_SCAP',
    tcapLabel: 'MEMORY_UTILIZATION_NO_PERCENT_TCAP',
    prefixIcon: 'memory',
    ruleConfig: PERCENT_RULE_CONFIG,
  },
  'memory:available': {
    label: 'MEMORY_AVAILABLE',
    tcapLabel: 'MEMORY_AVAILABLE_TCAP',
    prefixIcon: 'memory',
    ruleConfig: GIB_RULE_CONFIG,
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
  'disk:spaceUtilization': {
    label: 'DISK_SPACE_UTILIZATION',
    tcapLabel: 'DISK_SPACE_UTILIZATION_NO_PERCENT_TCAP',
    prefixIcon: 'storage',
    ruleConfig: PERCENT_RULE_CONFIG,
  },
  'disk:spaceAvailable': {
    label: 'DISK_SPACE_AVAILABLE',
    tcapLabel: 'DISK_SPACE_AVAILABLE_TCAP',
    prefixIcon: 'storage',
    ruleConfig: GB_RULE_CONFIG,
  },
  'disk:inodeUtilization': {
    label: 'INODE_UTILIZATION',
    tcapLabel: 'INODE_UTILIZATION_NO_PERCENT_TCAP',
    prefixIcon: 'storage',
    ruleConfig: PERCENT_RULE_CONFIG,
  },
  'disk:iopsRead': {
    label: 'DISK_READ_IOPS',
    tcapLabel: 'DISK_READ_IOPS_TCAP',
    prefixIcon: 'storage',
    ruleConfig: BASE_RULE_CONFIG,
  },
  'disk:iopsWrite': {
    label: 'DISK_WRITE_IOPS',
    tcapLabel: 'DISK_WRITE_IOPS_TCAP',
    prefixIcon: 'storage',
    ruleConfig: BASE_RULE_CONFIG,
  },
  'disk:throughputRead': {
    label: 'DISK_READ_THROUGHPUT',
    tcapLabel: 'DISK_READ_THROUGHPUT_TCAP',
    prefixIcon: 'storage',
    ruleConfig: KBS_RULE_CONFIG,
  },
  'disk:throughputWrite': {
    label: 'DISK_WRITE_THROUGHPUT',
    tcapLabel: 'DISK_WRITE_THROUGHPUT_TCAP',
    prefixIcon: 'storage',
    ruleConfig: KBS_RULE_CONFIG,
  },
  'pod:abnormalRatio': {
    label: 'UNAVAILABLE_POD_RATIO',
    tcapLabel: 'UNAVAILABLE_POD_RATIO_NO_PERCENT_TCAP',
    prefixIcon: 'pod',
    ruleConfig: PERCENT_RULE_CONFIG,
  },
  'pod:utilization': {
    label: 'POD_QUOTA_UTILIZATION_SCAP',
    tcapLabel: 'POD_QUOTA_UTILIZATION_NO_PERCENT_TCAP',
    prefixIcon: 'pod',
    ruleConfig: PERCENT_RULE_CONFIG,
  },
}

export default NODE_ALERTING_CONFIG
