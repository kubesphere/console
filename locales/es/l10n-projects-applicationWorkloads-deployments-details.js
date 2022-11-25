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
  ROLL_BACK: 'Revisión de Rollback',
  CURRENT_REVISION_RECORD: 'Revisión actual',
  TARGET_REVISION_EMPTY_DESC: 'Por favor selecciona revisión de reversión',
  TARGET_REVISION_RECORD: 'Revisiones de Rollback',
  // More > Edit Autoscaling
  CONFIGURE_AUTOSCALING_DESC: 'Escala automática de las réplicas automáticamente de acuerdo con el uso de CPU y memoria. Si se especifican tanto la CPU como la memoria, las réplicas se agregan o eliminan después de que se cumpla alguna de las condiciones.',
  EDIT_AUTOSCALING: 'Edit Autoscaling',
  TARGET_CPU_USAGE_UNIT: 'Utilización de CPU',
  AUTOSCALING: 'Autoescalado horizontal de pods',
  RESOURCE_NAME: 'Nombre del recurso',
  TARGET_CPU_USAGE_DESC: 'Las réplicas aumentarán cuando el uso de la CPU exceda este valor objetivo, por el contrario, disminuirá.',
  TARGET_MEMORY_USAGE_DESC: 'Las réplicas aumentarán cuando el uso de la memoria exceda este valor objetivo, por el contrario, disminuirá.',
  MINIMUM_REPLICAS_DESC: 'Valor mínimo de la cantidad de réplicas',
  MAXIMUM_REPLICAS_DESC: 'Valor máximo del número de réplicas.',
  TARGET_MEMORY_USAGE_UNIT: 'Uso de destino de memoria',
  MINIMUM_REPLICAS: 'Número mínimo de réplicas',
  MAXIMUM_REPLICAS: 'Número máximo de réplicas',
  // More > Edit Settings > Update Strategy
  EDIT_SETTINGS: 'Editar plantilla de configuración',
  // More > Edit Settings > Containers
  FROM_CONFIGMAP: 'From configmap',
  FROM_SECRET: 'From secret',
  BATCH_REFERENCE: 'Batch Reference',
  BATCH_REFERENCE_DESC: 'Reference multiple keys in a configmap or secret.',
  DESELECT_ALL: 'Deselect all',
  KEY_PL: 'Keys',
  // More > Edit Settings > Volumes
  // More > Edit Settings > Volumes > Mount Volume
  // More > Edit Settings > Volumes > Mount Configmap or Secret
  // More > Edit Settings > Pod Scheduling Rules
  RULE_NOT_COMPLETE: 'Please set a complete rule.',
  // Attributes
  // Revision Records
  REVISION_RECORDS: 'Registros de revisión',
  CONFIG_FILE: 'Fichero de configuración',
  COMPARE_WITH: 'Comparación con la versión anterior {versión}',
  // Resource Status
  REPLICAS_DESIRED: 'Esperadas',
  REPLICAS_CURRENT: 'Réplicas actuales',
  ADJUST_REPLICAS: '¿Tiene efecto de inmediato?',
  REPLICAS_SCALE_NOTIFY_CONTENT: 'Va a cambiar las réplicas de su carga de trabajo a {num}. Puede continuar cambiando el número de réplicas o puede hacer que el cambio surta efecto de inmediato.',
  REPLICAS_SCALE_NOTIFY_CONFIRM: 'Aplicar cambios ({segundos} s)',
  REPLICAS_SCALE_NOTIFY_CANCEL: 'Descartar los cambios',
  // Resource Status > Autoscaling
  TARGET_MEMORY_USAGE: 'Uso objetivo',
  TARGET_CPU_USAGE: 'Utilización objetivo',
  TARGET_CURRENT: '{target} (Current: {current})',
  NOT_ENABLE: '{feature} no está habilitado',
  // Resource Status > Image Builder
  CONTAINER_LOG_NOT_ENABLED: 'Container Log is not enabled.',
  BUILD_LOG: 'Build Log',
  TASK: 'Task',
  IN_PROGRESS: 'in progress',
  IMAGE_BUILDING: 'Image Building',
  HAS_FAILED: 'has failed',
  // Metadata
  // Monitoring
  // Monitoring > View All Replicas (visible only when replicas > 5)
  VIEW_ALL_REPLICAS: 'Ver todas las réplicas',
  SHOW_SELECTED_ONLY: 'Mostrar solo seleccionados',
  MONITORING_SELECT_LIMIT_MSG: 'Puedes seleccionar hasta diez recursos',
  MONITORING_ALERT_DESC: 'El gráfico de monitoreo actual muestra cinco réplicas como máximo. Puede hacer clic en "Ver todas las réplicas" para ver más gráficos de monitoreo si el número de réplicas supera las cinco.',
  CURRENT_VALUE: 'Current: {value}',
  // Environment Variables
  ENVIRONMENT_VARIABLE_PL: 'Variables de entorno',
  // Events
  EVENT_AGE: 'Occurred',
  EVENT_AGE_DATA: '{lastTime}<br/>({count} times over {duration})',
  EVENT_AGE_DATA_TWICE: '{lastTime}<br/>(twice over {duration})',
  SOURCE: 'Source'
};