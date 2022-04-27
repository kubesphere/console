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
module.exports = {
  // Banner
  // List
  DAEMONSETS: 'Daemonsets',
  DAEMONSET_EMPTY_DESC: 'Please create a daemonset.',
  // List > Create > Basic Information
  // List > Create > Pod Settings
  // List > Create > Pod Settings > Add Container > Update Strategy > Rolling Update Settings
  MIN_READY_SECONDS: 'Minimum Running Time for Pod Readiness (s)',
  MAX_UNAVAILABLE_PODS: 'Maximum Unavailable Pods',
  ROLLING_UPDATE_SETTINGS: 'Rolling Update Settings',
  MAX_UNAVAILABLE_PODS_DESC: 'Maximum number or percentage of unavailable pod replicas allowed during the update process.',
  MIN_READY_SECONDS_DESC: 'Minimum stable running time required for a pod replica to be considered ready.',
  MIN_READY_SECONDS_EMPTY: 'Please set the minimum stable running time required for a pod replica to be considered ready.',
  MAX_UNAVAILABLE_EMPTY: 'Please set the maximum number or percentage of unavailable pod replicas allowed during the update process.',
  // List > Create > Pod Settings > Add Container > Health Check > Liveness Check > HTTP Request
  FAILURE_THRESHOLD: 'Failure Threshold',
  HTTP_REQUEST: 'HTTP Request',
  INITIAL_DELAY_S: 'Initial Delay (s)',
  INITIAL_DELAY_TIMEOUT_VALUE: '{delay}s initial delay, {timeout}s timeout period',
  PROBE_TIME: '{delay}s delay, {timeout}s timeout',
  TIMEOUT_PERIOD_S: 'Timeout (s)',
  CHECK_INTERVAL_S: 'Check Interval (s)',
  SUCCESS_THRESHOLD: 'Success Threshold',
  INITIAL_DELAY_DESC: 'Delay time before the probe is initiated after container startup. The value must be an integer and the minimum value is 0.',
  TIMEOUT_PERIOD_DESC: 'Timeout period after which the probe times out and is considered failed. The value must be an integer and the minimum value is 1.',
  CHECK_INTERVAL_DESC: 'Interval between check attempts. The value must be an integer and the minimum value is 1.',
  SUCCESS_THRESHOLD_DESC: 'Minimum number of consecutive successes for the probe to be considered successful after having failed. The minimum value is 1 and the value must be 1 for liveness and startup probes.',
  FAILURE_THRESHOLD_DESC: 'Minimum number of consecutive failures for the probe to be considered failed after having succeeded. The minimum value is 1.',
  // List > Create > Pod Settings > Add Container > Health Check > Liveness Check > Command
  PROBE_COMMAND_EMPTY: 'Please enter at least one command.',
  // List > Create > Pod Settings > Add Container > Health Check > Liveness Check > TCP Port
  TCP_PORT: 'TCP Port',
  // List > Create > Storage Settings
  MOUNT_PATH_IN_USE: 'The mount path is already in use. Please enter another mount path.'
};