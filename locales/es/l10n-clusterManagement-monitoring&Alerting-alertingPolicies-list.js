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
  ALERTING_POLICY_PL: 'Alerting Policies',
  ALERT_POLICY_DESC: 'Alerting policies are a series of conditions used to monitor cluster resources. You can create alerting policies to monitor resources.',
  REQUESTS_FOR_TRIGGER_AN_ALARM_Q: 'How are alerting messages generated?',
  REQUESTS_FOR_TRIGGER_AN_ALARM_A: 'You need to set an alerting policy for a resource. Alerting messages will be generated when the metric configured in the alerting policy reaches a threshold.',
  // List
  ALERTING_STATUS: 'Alerting Status',
  ALERTING_POLICY_EMPTY_DESC: 'You can notice if a resource is abnormal in real time by creating an alerting policy.',
  ALERT_RULE_INACTIVE: 'Inactive',
  ALERT_RULE_PENDING: 'Pendiente',
  ALERT_RULE_FIRING: 'Firing',
  ALERT_RULE_HEALTH_OK: 'Healthy',
  ALERT_RULE_HEALTH_ERR: 'Error',
  ALERT_RULE_HEALTH_UNKNOWN: 'UnKnown',
  // List > Create > Basic Information
  SEVERITY: 'Tipo de alerta',
  CREATE_ALERTING_POLICY: 'Create Alerting Policy',
  CRITICAL_ALERT: 'Critical',
  ERROR_ALERT: 'Error',
  WARNING_ALERT: 'Warning',
  INVALID_TIME_DESC: 'Invalid value. Please select a value from the drop-down list or enter 0 or a positive integer.',
  ALIAS: 'Alias',
  THRESHOLD_DURATION_MIN: 'Threshold Duration (min)',
  ALERT_DURATION: 'An alert is firing when the threshold duration reaches the preset value.',
  LONG_NAME_DESC: 'Solo puede contener letras minúsculas, números y guiones ("-"), y debe comenzar con una letra minúscula y terminar con un número o letra minúscula. La longitud máxima de carácteres se establece en 253.',
  // List > Create > Rule Settings > Rule Template
  RULE_SETTINGS: 'Rule Settings',
  MONITORING_TARGETS: 'Monitoring Targets',
  CPU_USAGE_SCAP: 'ratio de uso de CPU',
  DISK_READ_IOPS: 'iops de lectura de disco',
  DISK_READ_THROUGHPUT: 'rendimiento de lectura de disco',
  DISK_SPACE_AVAILABLE: 'espacio de disco disponible',
  DISK_WRITE_IOPS: 'iops de escritura de disco',
  DISK_WRITE_THROUGHPUT: 'rendimiento de escritura en disco',
  DISK_SPACE_USAGE: 'ratio de utilización de espacio del disco local',
  MEMORY_AVAILABLE: 'memoria disponible',
  MEMORY_USAGE_CACHE: 'Memory usage (including caches)',
  MEMORY_USAGE_SCAP: 'ratio de uso de memoria',
  DATA_RECEIVE_RATE: 'ratio de datos de red recibidos',
  DATA_SEND_RATE: 'Network data sending rate',
  SET_RULE_DESC: 'Please set an alerting rule.',
  ABNORMAL_PODS: 'Relación anormal pod',
  POD_USAGE_SCAP: 'ratio de utilización de pod',
  THRESHOLD: 'Umbral',
  UNAVAILABLE_REPLICAS: 'Unavailable replicas',
  RULE_TEMPLATE: 'Rule Template',
  CPU_LOAD_1: 'Average CPU load over 1 minute',
  CPU_LOAD_5: 'Average CPU load over 5 minutes',
  CPU_LOAD_15: 'Average CPU load over 15 minutes',
  SELECT_NODE_TIP: 'Please select at lease a cluster node.',
  // List > Create > Rule Settings > Custom Rule
  CUSTOM_RULE: 'Custom Rule',
  RULE_EXPRESSION: 'Rule Expression',
  ENTER_RULE_EXPRESSION: 'Please enter a rule expression.',
  ALERT_RULE_EXPRESSION_DESC: 'You can define a custom rule using PromQL statements. <a href="https://prometheus.io/docs/prometheus/latest/querying/basics/" target="_blank" rel="noreferrer noopener">Learn More</a>',
  // List > Create > Message Settings
  MESSAGE_SETTINGS: 'Message Settings',
  NOTIFICATION_SUMMARY: 'Summary',
  NOTIFICATION_DETAILS: 'Details',
  // List > Edit
  EDIT_ALERTING_POLICY: 'Edit Alerting Policy',
  // List > Delete
  ALERTING_POLICY: 'Política de alerta',
  ALERTING_POLICY_LOW: 'alerting policy'
};