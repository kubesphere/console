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
  'Alerting Detail': 'Detalles de alertas',
  'Alerting History': 'Historial de alertas',
  'Alerting Message': 'Mensaje de alerta',
  'Alerting Messages': 'Mensajes de alerta',
  'Alerting Monitoring': 'Alerting Monitoring',
  'Alerting Policies': 'Políticas de alerta',
  'alerting policy': 'política de alerta',
  'Alerting Policy': 'Política de alerta',
  'Alerting Resource': 'Alerting Resource',
  'alerting rule': 'regla de alerta',
  'Alerting Rule': 'Regla de Alerta',
  'Alerting Rules': 'Reglas de Alerta',
  'Alerting Status': 'Estado de Alerta',
  'Alerting Duration': 'Alerting Duration',
  'Alerting Type': 'Tipo de alerta',
  Condition: 'Condición',
  'cpu usage': 'uso de CPU',
  'cpu utilization rate': 'ratio de uso de CPU',
  'disk read iops': 'iops de lectura de disco',
  'disk read throughput': 'rendimiento de lectura de disco',
  'disk space available': 'espacio de disco disponible',
  'disk write iops': 'iops de escritura de disco',
  'disk write throughput': 'rendimiento de escritura en disco',
  'Edit Rule': 'Editar regla',
  'inode utilization rate': 'ratio de utilización de inodes',
  'local disk space utilization rate':
    'ratio de utilización de espacio del disco local',
  'memory available': 'memoria disponible',
  'memory usage': 'uso de memoria',
  'memory usage (including cache)': 'uso de memoria (incluyendo caché)',
  'memory utilisation (including cache)': 'uso de memoria (incluyendo caché)',
  'memory utilization rate': 'ratio de uso de memoria',
  Message: 'Mensaje',

  'Critical Alert': 'Critical Alert',
  'Error Alert': 'Error Alert',
  'Warning Alert': 'Warning Alert',

  'Monitoring Rules': 'Regla de monitorización',
  'monitoring target': 'objetivo de monitorización',
  'Monitoring Target': ' Objetivo de Monitorización',
  'network data receiving rate': 'ratio de datos de red recibidos',
  'network data transmitting rate': 'ratio de datos transmitidos',
  'Notification Channel': 'Canal de notificación',
  'Notification List': 'Lista de Notificación',
  'Notification Settings': 'Notification Settings',
  'Please add at least one rule': 'Por favor, añade al menos una regla',
  'Please input the threshold': 'Por favor, introduce el umbral',
  'pod abnormal ratio': 'Relación anormal pod',
  'pod utilization rate': 'ratio de utilización de pod',
  'Alert Active Time': 'Hora de Alerta reciente',
  'Recent Notification': 'Notificación reciente',
  'Recovery Time': 'Tiempo de Recuperación',
  'Repeat Rule': 'Regla de Repetición',
  Rule: 'Regla',
  'Rule Name': 'Nombre de la Regla',
  Threshold: 'Umbral',
  'Unavailable replicas ratio': 'Ratio de replicas no disponibles',
  'Unavailable daemonset replicas ratio':
    'Ratio de replicas de daemonset no disponibles',
  'Unavailable deployment replicas ratio':
    'Ratio de replicas de despliegues no disponibles',
  'Unavailable statefulset replicas ratio':
    'Ratio de replicas de statefulset no disponibles',
  'View Details': 'Ver detalles',

  'Rule Templates': 'Rule Templates',
  'Custom Rule': 'Custom Rule',
  'Rule Expression': 'Rule Expression',

  'Please input the rule expression': 'Please input the rule expression',

  'Notification Content': 'Notification Content',

  'Custom Policies': 'Custom Policies',
  'Built-In Policies': 'Built-In Policies',

  load1: 'Promedio de carga de CPU durante 1 minuto',
  load5: 'Promedio de carga de CPU durante 5 minutos',
  load15: 'Promedio de carga de CPU durante 10 minutos',
  ALERT_TYPE: 'Alerta {type}',
  ALERT_POLICY_DESC: 'Establecer reglas de alerta',
  ALERT_MESSAGE_DESC:
    'Los mensajes de alerta se generan en función de las métricas de monitorización y de las políticas de alerta de carga de trabajo en el proyecto actual. Pueden ayudar a los usuarios a detectar problemas y responder a tiempo.',

  ALERTING_POLICY_CREATE_DESC:
    'Puede encontrar condiciones anormales de los recursos al instante estableciendo políticas de alerta',

  RESOURCE_NODE_FORM_TIP: 'Please select cluster nodes',
  RESOURCE_WORKLOAD_FORM_TIP: 'Please select workloads',

  REQUESTS_FOR_TRIGGER_AN_ALARM_Q:
    '¿Pre-requisitos para activar un mensaje de alerta?',
  REQUESTS_FOR_TRIGGER_AN_ALARM_A:
    'Debe establecer una política de alerta para un recurso. Cuando un determinado indicador de un recurso alcanza el umbral de la política de alerta, el mensaje se activa y envía.',
  REQUESTS_FOR_PUSH_AN_ALARM_Q:
    '¿Pre-requisitos para un mensaje push de política de alerta?',
  REQUESTS_FOR_PUSH_AN_ALARM_A:
    'The platform administrator must select a notification method and configure the corresponding server.',
  HOW_TO_SUPRESS_AN_ALARM_Q: '¿Cómo suprimir mensajes de alerta?',
  HOW_TO_SUPRESS_AN_ALARM_A:
    'Cada política de alerta se puedes establecer en diferentes niveles, y cada nivel corresponde a un período de alerta y período de repetición diferente.',

  ALERTING_DURATION:
    'After the monitoring target meets the alert condition for the alert duration, the alert will be triggered',
  ALERT_RULE_INACTIVE: 'Inactive',
  ALERT_RULE_PENDING: 'Pending',
  ALERT_RULE_FIRING: 'Firing',
  ALERT_RULE_HEALTH_OK: 'Health',
  ALERT_RULE_HEALTH_ERR: 'Error',
  ALERT_RULE_HEALTH_UNKNOWN: 'UnKnown',

  ALERT_RULE_EXPRESSION_DESC:
    'Alerting rules can be customized through PromQL statements. For PromQL related syntax, refer to <a href="https://prometheus.io/docs/prometheus/latest/querying/basics/" target="_blank" rel="noreferrer noopener"> Prometheus Querying</a>.',
}
