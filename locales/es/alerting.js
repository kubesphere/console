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
  'Add Rule': 'Añadir regla',
  Alerting: 'Alertando',
  NOTIFICATION_SUMMARY: 'Summary',
  NOTIFICATION_MESSAGE: 'Notification Message',
  'Alerting Detail': 'Detalles de alertas',
  ALERTING_HISTORY: 'Historial de alertas',
  ALERTING_MESSAGE: 'Mensaje de alerta',
  'Alerting Messages': 'Mensajes de alerta',
  ALERT_MONITORING: 'Alerting Monitoring',
  'Alerting Policies': 'Políticas de alerta',
  'alerting policy': 'política de alerta',
  ALERTING_POLICY: 'Política de alerta',
  ALERTING_POLICY_PL: 'Alerting Policies',
  ALERTING_POLICY_LOW: 'alerting policy',
  ALERTING_RESOURCE: 'Alerting Resource',
  'alerting rule': 'regla de alerta',
  ALERTING_RULE: 'Regla de Alerta',
  RULE_SETTINGS: 'Rule Settings',
  ALERTING_STATUS: 'Estado de Alerta',
  'Alerting Duration': 'Alerting Duration',
  ALERTING_SEVERITY: 'Gravedad de alerta',
  ALERTING_TYPE: 'Tipo de alerta',
  ALERTING_NAME: 'Nombre de la alerta',
  SEVERITY: 'Tipo de alerta',
  Condition: 'Condición',
  'cpu usage': 'uso de CPU',
  CPU_USAGE_SCAP: 'ratio de uso de CPU',
  DISK_READ_IOPS: 'iops de lectura de disco',
  DISK_READ_THROUGHPUT: 'rendimiento de lectura de disco',
  DISK_SPACE_AVAILABLE: 'espacio de disco disponible',
  DISK_WRITE_IOPS: 'iops de escritura de disco',
  DISK_WRITE_THROUGHPUT: 'rendimiento de escritura en disco',
  'Edit Rule': 'Editar regla',
  DISK_SPACE_USAGE: 'ratio de utilización de espacio del disco local',
  MEMORY_AVAILABLE: 'memoria disponible',
  'memory usage': 'uso de memoria',
  MEMORY_USAGE_CACHE: 'Memory usage (including caches)',
  'memory utilisation (including cache)': 'uso de memoria (incluyendo caché)',
  MEMORY_USAGE_SCAP: 'ratio de uso de memoria',

  CRITICAL_ALERT: 'Critical',
  ERROR_ALERT: 'Error',
  WARNING_ALERT: 'Warning',

  'Monitoring Rules': 'Regla de monitorización',
  'monitoring target': 'objetivo de monitorización',
  MONITORING_TARGETS: 'Monitoring Targets',
  DATA_RECEIVE_RATE: 'ratio de datos de red recibidos',
  DATA_SEND_RATE: 'Network data sending rate',
  'Notification Channel': 'Canal de notificación',
  'Notification List': 'Lista de Notificación',
  'Notification Settings': 'Notification Settings',
  SET_RULE_DESC: 'Please set an alerting rule.',
  'Please input the threshold': 'Por favor, introduce el umbral',
  ABNORMAL_PODS: 'Relación anormal pod',
  POD_USAGE_SCAP: 'ratio de utilización de pod',
  ACTIVATION_TIME: 'Activation Time',
  'Recent Notification': 'Notificación reciente',
  'Recovery Time': 'Tiempo de Recuperación',
  'Repeat Rule': 'Regla de Repetición',
  Rule: 'Regla',
  RULE: 'Regla',
  'Rule Name': 'Nombre de la Regla',
  THRESHOLD: 'Umbral',
  UNAVAILABLE_REPLICAS: 'Unavailable replicas',
  'Unavailable daemonset replicas ratio':
    'Ratio de replicas de daemonset no disponibles',
  'Unavailable deployment replicas ratio':
    'Ratio de replicas de despliegues no disponibles',
  'Unavailable statefulset replicas ratio':
    'Ratio de replicas de statefulset no disponibles',
  VIEW_DETAILS: 'Ver detalles',

  RULE_TEMPLATE: 'Rule Template',
  CUSTOM_RULE: 'Custom Rule',
  RULE_EXPRESSION: 'Rule Expression',
  INVALID_TIME_DESC:
    'Invalid value. Please select a value from the drop-down list or enter 0 or a positive integer.',
  ALIAS: 'Alias',
  THRESHOLD_DURATION_MIN: 'Threshold Duration (min)',

  ENTER_RULE_EXPRESSION: 'Please enter a rule expression.',
  ALERT_FUNCTIONS: 'Functions',
  ALERT_METRICS: 'Metrics',
  ALERT_LABELS: 'Labels',
  ALERT_RATE_RANGES: 'Rate Ranges',

  NOTIFICATION_DETAILS: 'Details',

  CUSTOM_POLICIES: 'Custom Policies',
  BUILT_IN_POLICIES: 'Built-In Policies',

  CPU_LOAD_1: 'Average CPU load over 1 minute',
  CPU_LOAD_5: 'Average CPU load over 5 minutes',
  CPU_LOAD_15: 'Average CPU load over 15 minutes',
  ALERT_TYPE: 'Alerta {type}',
  ALERT_POLICY_DESC:
    'Alerting policies are a series of conditions used to monitor cluster resources. You can create alerting policies to monitor resources.',
  ALERT_MESSAGE_DESC:
    'Alert messages display details of triggered alerts that have met the conditions of the alert rules.',
  ALERTING_MESSAGE_EMPTY_DESC:
    'No alerting message is found in the current project.',
  ALERTING_POLICY_EMPTY_DESC:
    'You can notice if a resource is abnormal in real time by creating an alerting policy.',
  ALERTING_POLICY_CREATE_DESC:
    'You can create alerting policies to detect abnormal resources in real time.',

  SELECT_NODE_TIP: 'Please select at lease a cluster node.',
  SELECT_WORKLOAD_TIP: 'Please select at lease a workload.',

  EDIT_TCAP: 'Edit',
  EDIT_ALERTING_POLICY: 'Edit Alerting Policy',
  DELETE_TCAP: 'Delete',
  CREATE_ALERTING_POLICY: 'Create Alerting Policy',

  REQUESTS_FOR_TRIGGER_AN_ALARM_Q: 'How are alerting messages generated?',
  REQUESTS_FOR_TRIGGER_AN_ALARM_A:
    'You need to set an alerting policy for a resource. Alerting messages will be generated when the metric configured in the alerting policy reaches a threshold.',
  REQUESTS_FOR_PUSH_AN_ALARM_Q:
    '¿Pre-requisitos para un mensaje push de política de alerta?',
  REQUESTS_FOR_PUSH_AN_ALARM_A:
    'The platform administrator needs to select a notification method and configure the server corresponding to the method.',
  HOW_TO_SUPRESS_AN_ALARM_Q: '¿Cómo suprimir mensajes de alerta?',
  HOW_TO_SUPRESS_AN_ALARM_A:
    'You can set alerting policies at different levels. Each level corresponds to an alerting interval.',

  ALERT_DURATION:
    'An alert is firing when the threshold duration reaches the preset value.',
  ALERT_RULE_INACTIVE: 'Inactive',
  ALERT_RULE_PENDING: 'Pending',
  ALERT_RULE_FIRING: 'Firing',
  ALERT_RULE_HEALTH_OK: 'Healthy',
  ALERT_RULE_HEALTH_ERR: 'Error',
  ALERT_RULE_HEALTH_UNKNOWN: 'UnKnown',

  ALERT_RULE_EXPRESSION_DESC:
    'You can define a custom rule using PromQL statements. <a href="https://prometheus.io/docs/prometheus/latest/querying/basics/" target="_blank" rel="noreferrer noopener">Learn More</a>',

  // Alerting Messages
  ALERTING_MESSAGE_PL: 'Alerting Messages',
  NO_DATA_DESC: 'No Data Found',
  MONITORING_TARGET: 'Monitoring Target',

  // Alerting Policies
  ALERTING_POLICIES: 'Alerting Policies',
  MESSAGE_SETTINGS: 'Message Settings',
  DEPLOYMENT: 'Deployment',
  DEPLOYMENT_PL: 'Deployments',
  STATEFULSET: 'StatefulSet',
  STATEFULSET_PL: 'StatefulSets',
  DAEMONSET: 'DaemonSet',
  DAEMONSET_PL: 'DaemonSets',
  DEPLOYMENTS_VALUE: 'Deployments: {value}',
  STATEFULSETS_VALUE: 'StatefulSets: {value}',
  DAEMONSETS_VALUE: 'DaemonSets: {value}',

  // Alerting Policies > Details
  NOTIFICATION_SUMMARY_COLON: 'Summary: ',
  DETAILS_COLON: 'Details: ',
  MONITORING_TARGETS_SCAP: 'Monitoring targets',
  ALERTING_RULE_SCAP: 'Alerting rule',
  THRESHOLD_DURATION: 'Threshold Duration',
}
