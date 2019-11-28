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

export default {
  Interval: 'Interval',
  Last: 'Last',
  TIME_M: '{num, plural, =1 {1 minute} other{# minutes}}',
  TIME_H: '{num, plural, =1 {1 hour} other{# hours}}',
  TIME_D: '{num, plural, =1 {1 day} other{# days}}',
  UTILIZATION: 'Utilization',
  RESOURCE_USAGE_TITLE: 'Resources Usage',
  MONITORING_CLUSTER_DESC: 'Monitor the running status of the cluster',
  MONITORING_PHYSICAL_DESC:
    'Monitor the running status of the physical resources',
  MONITORING_APPLICATION_DESC:
    'Monitor the running status of the application resources',
  TIMERANGE_SELECTOR_MSG: 'End time needs to be later than start time',
  MONITORING_SELECT_LIMIT_MSG: 'You can select up to ten resources',

  AVERAGE: 'Average',
  TOTAL_AVERAGE: 'Total',
  SCHEDULED_SUCCESS: 'Scheduled',
  SCHEDULED_ERROR: 'Error',
  SCHEDULED_FAIL: 'Unschedulable',
  ETCD_NODE_TITLE: 'ETCD Node',
  ETCD_LEADER_TITLE: 'Is there a Leader',
  ETCD_CHANGES_TITLE: 'Leader change times (within 1 hour)',
  ETCD_STATUS: 'Service <span>status</span>',
  ETCD_PROPOSAL: 'Raft <span>proposal</span>',
  ETCD_DB_SIZE: 'DB <span>size</span>',
  ETCD_CLIENT_TRAFFIC: 'Client <span>traffic</span>',
  REQUEST_LATENCY: 'Request <span>latency</span>',
  REQUEST_RATE: 'Request <span>rate</span>',
  ATTEMPT_FREQUENCY: 'Attempt <span>frequency</span>',
  ATTEMPT_RATE: 'Attempt <span>rate</span>',
  PROPOSAL_COMMITTED: 'Committed',
  PROPOSAL_APPLIED: 'Applied',
  PROPOSAL_FAILED: 'Failed',
  PROPOSAL_PENDING: 'Pending',
}
