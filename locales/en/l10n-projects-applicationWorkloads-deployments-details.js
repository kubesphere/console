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
  // More > Roll Back
  ROLL_BACK: 'Roll Back',
  CURRENT_REVISION_RECORD: 'Current Revision Record',
  TARGET_REVISION_EMPTY_DESC: 'Please select a target revision record.',
  TARGET_REVISION_RECORD: 'Target Revision Record',

  // More > Edit Autoscaling
  CONFIGURE_AUTOSCALING_DESC:
    'Set the system to automatically adjust the number of Pod replicas based on target CPU usage and target memory usage.',
  EDIT_AUTOSCALING: 'Edit Autoscaling',
  TARGET_CPU_USAGE_UNIT: 'Target CPU Usage (%)',
  AUTOSCALING: 'Autoscaling',
  RESOURCE_NAME: 'Resource Name',
  TARGET_CPU_USAGE_DESC:
    'The system automatically decreases/increases the number of Pod replicas when the actual CPU usage is higher/lower than the target.',
  TARGET_MEMORY_USAGE_DESC:
    'The system automatically decreases/increases the number of Pod replicas when the actual memory usage is higher/lower than the target.',
  MINIMUM_REPLICAS_DESC:
    'Set the minimum number of Pod replicas allowed. The default value is 1.',
  MAXIMUM_REPLICAS_DESC:
    'Set the maximum number of Pod replicas allowed. The default value is 1.',
  TARGET_MEMORY_USAGE_UNIT: 'Target Memory Usage (MiB)',
  MINIMUM_REPLICAS: 'Minimum Replicas',
  MAXIMUM_REPLICAS: 'Maximum Replicas',

  // More > Edit Settings > Update Strategy
  EDIT_SETTINGS: 'Edit Settings',

  // More > Edit Settings > Containers
  // More > Edit Settings > Volumes
  // More > Edit Settings > Volumes > Mount Volume
  // More > Edit Settings > Volumes > Mount ConfigMap or Secret
  // More > Edit Settings > Pod Scheduling Rules
  RULE_NOT_COMPLETE: 'Please set a complete rule.',

  // Details

  // Revision Records
  REVISION_RECORDS: 'Revision Records',
  CONFIG_FILE: 'Configuration File',
  COMPARE_WITH: 'Compared with the previous record {version}',

  // Resource Status
  REPLICAS_DESIRED: 'Desired',
  REPLICAS_CURRENT: 'Current',
  ADJUST_REPLICAS: 'Adjust Replicas',
  REPLICAS_SCALE_NOTIFY_CONTENT:
    'Are you sure you want to change the number of Pod replicas to {num}?',
  REPLICAS_SCALE_NOTIFY_CONFIRM: 'OK ({seconds}s)',
  REPLICAS_SCALE_NOTIFY_CANCEL: 'Cancel',

  // Resource Status > Autoscaling
  TARGET_MEMORY_USAGE: 'Target Memory Usage',
  TARGET_CPU_USAGE: 'Target CPU Usage',
  TARGET_CURRENT: '{target} (Current: {current})',
  NOT_ENABLE: '{resource} Not Enabled',

  // Metadata
  // Monitoring
  // Monitoring > View All Replicas (visible only when replicas > 5)
  VIEW_ALL_REPLICAS: 'View All Replicas',
  SHOW_SELECTED_ONLY: 'Show Selected Only',
  MONITORING_SELECT_LIMIT_MSG: 'A maximum of 10 resources can be selected.',
  MONITORING_ALERT_DESC:
    'Information about a maximum of five Pod replicas are displayed by default. You can click <b>View All Replicas</b> to view information about all Pod replicas.',
  CURRENT_VALUE: 'Current: {value}',

  // Environment Variables
  ENVIRONMENT_VARIABLE_PL: 'Environment Variables',

  // Events
}
