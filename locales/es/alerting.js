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
  SUMMARY: 'Summary',
  NOTIFICATION_MESSAGE: 'Message',
  'Alerting Detail': 'Detalles de alertas',
  ALERTING_HISTORY: 'Historial de alertas',
  ALERTING_MESSAGE: 'Mensaje de alerta',
  'Alerting Messages': 'Mensajes de alerta',
  ALERT_MONITORING: 'Alerting Monitoring',
  'Alerting Policies': 'Políticas de alerta',
  'alerting policy': 'política de alerta',
  ALERTING_POLICY: 'Política de alerta',
  ALERTING_RESOURCE: 'Alerting Resource',
  'alerting rule': 'regla de alerta',
  ALERTING_RULE: 'Regla de Alerta',
  ALERTING_RULES: 'Reglas de Alerta',
  ALERTING_STATUS: 'Estado de Alerta',
  'Alerting Duration': 'Alerting Duration',
  ALERTING_TYPE: 'Tipo de alerta',
  Condition: 'Condición',
  'cpu usage': 'uso de CPU',
  CPU_USAGE_SCAP: 'ratio de uso de CPU',
  DISK_READ_IOPS: 'iops de lectura de disco',
  DISK_READ_THROUGHPUT: 'rendimiento de lectura de disco',
  DISK_SPACE_AVAILABLE: 'espacio de disco disponible',
  DISK_WRITE_IOPS: 'iops de escritura de disco',
  DISK_WRITE_THROUGHPUT: 'rendimiento de escritura en disco',
  'Edit Rule': 'Editar regla',
  INODE_USAGE: 'ratio de utilización de inodes',
  DISK_SPACE_USAGE: 'ratio de utilización de espacio del disco local',
  MEMORY_AVAILABLE: 'memoria disponible',
  'memory usage': 'uso de memoria',
  'memory usage (including cache)': 'uso de memoria (incluyendo caché)',
  'memory utilisation (including cache)': 'uso de memoria (incluyendo caché)',
  MEMORY_USAGE_SCAP: 'ratio de uso de memoria',
  Message: 'Mensaje',

  CRITICAL_ALERT: 'Critical Alert',
  ERROR_ALERT: 'Error Alert',
  WARNING_ALERT: 'Warning Alert',

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
  POD_ANOMALY: 'Relación anormal pod',
  POD_USAGE_SCAP: 'ratio de utilización de pod',
  ACTIVATED_AT: 'Activated At',
  'Recent Notification': 'Notificación reciente',
  'Recovery Time': 'Tiempo de Recuperación',
  'Repeat Rule': 'Regla de Repetición',
  Rule: 'Regla',
  'Rule Name': 'Nombre de la Regla',
  THRESHOLD: 'Umbral',
  'Unavailable replicas ratio': 'Ratio de replicas no disponibles',
  'Unavailable daemonset replicas ratio':
    'Ratio de replicas de daemonset no disponibles',
  'Unavailable deployment replicas ratio':
    'Ratio de replicas de despliegues no disponibles',
  'Unavailable statefulset replicas ratio':
    'Ratio de replicas de statefulset no disponibles',
  'View Details': 'Ver detalles',

  RULE_TEMPLATES: 'Rule Templates',
  CUSTOM_RULES: 'Custom Rules',
  RULE_EXPRESSION: 'Rule Expression',
  INVALID_TIME_DESC:
    'Invalid value. Please select a value from the drop-down list or enter 0 or a positive integer.',
  NAME: 'Name',
  ALIAS: 'Alias',
  ALERT_DURATION_MIN: 'Duration (Minutes)',

  ENTER_RULE_EXPRESSION: 'Please enter a rule expression.',
  ALERT_FUNCTIONS: 'Functions',
  ALERT_METRICS: 'Metrics',
  ALERT_LABELS: 'Labels',
  ALERT_RATE_RANGES: 'Rate Ranges',

  NOTIFICATION_CONTENT: 'Notification Content',

  CUSTOM_POLICIES: 'Custom Policies',
  BUILT_IN_POLICIES: 'Built-In Policies',

  CPU_LOAD_1: 'Average CPU load over 1 minute',
  CPU_LOAD_5: 'Average CPU load over 5 minutes',
  CPU_LOAD_15: 'Average CPU load over 15 minutes',
  ALERT_TYPE: 'Alerta {type}',
  ALERT_POLICY_DESC: 'Establecer reglas de alerta',
  ALERT_MESSAGE_DESC:
    'Users can view all alerting messages that have met the conditions of alerting policies at the cluster level.',

  ALERTING_POLICY_CREATE_DESC:
    'You can notice if a resource is abnormal in real time by creating an alerting policy.',

  SELECT_NODE_TIP: 'Please select at lease a cluster resource.',
  SELECT_WORKLOAD_TIP: 'Please select at lease a workload.',

  EDIT_TCAP: 'Edit',
  EDIT_ALERTING_POLICY: 'Edit Alerting Policy',
  DELETE_TCAP: 'Delete',
  CREATE_ALERTING_POLICY: 'Create Alerting Policy',

  REQUESTS_FOR_TRIGGER_AN_ALARM_Q: 'How do I trigger alerting messages?',
  REQUESTS_FOR_TRIGGER_AN_ALARM_A:
    'Debe establecer una política de alerta para un recurso. Cuando un determinado indicador de un recurso alcanza el umbral de la política de alerta, el mensaje se activa y envía.',
  REQUESTS_FOR_PUSH_AN_ALARM_Q:
    '¿Pre-requisitos para un mensaje push de política de alerta?',
  REQUESTS_FOR_PUSH_AN_ALARM_A:
    'The platform administrator needs to select a notification method and configure the corresponding server.',
  HOW_TO_SUPRESS_AN_ALARM_Q: '¿Cómo suprimir mensajes de alerta?',
  HOW_TO_SUPRESS_AN_ALARM_A:
    'Cada política de alerta se puedes establecer en diferentes niveles, y cada nivel corresponde a un período de alerta y período de repetición diferente.',

  ALERT_DURATION:
    'After the monitoring target meets the alert condition for the alert duration, the alert will be triggered',
  ALERT_RULE_INACTIVE: 'Inactive',
  ALERT_RULE_PENDING: 'Pending',
  ALERT_RULE_FIRING: 'Firing',
  ALERT_RULE_HEALTH_OK: 'Health',
  ALERT_RULE_HEALTH_ERR: 'Error',
  ALERT_RULE_HEALTH_UNKNOWN: 'UnKnown',

  ALERT_RULE_EXPRESSION_DESC:
    'Alerting rules can be customized through PromQL statements. For PromQL related syntax, refer to <a href="https://prometheus.io/docs/prometheus/latest/querying/basics/" target="_blank" rel="noreferrer noopener"> Prometheus Querying</a>.',

  // Alerting Messages
  ALERTING_MESSAGES: 'Alerting Messages',
  NO_DATA_DESC: 'No Data Found',

  // Alerting Policies
  ALERTING_POLICIES: 'Alerting Policies',
  NOTIFICATION_SETTINGS: 'Notification Settings',

  // Custom Monitoring
  CREATED_AT: 'Created At',
}
