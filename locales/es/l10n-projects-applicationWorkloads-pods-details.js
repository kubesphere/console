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
  // Attributes
  QOS_CLASS: 'QoS Class',
  NODE_NAME: 'Nombre del nodo',
  POD_IP_ADDRESS: 'IP del POD',
  // Run Records
  JOB_UNFINISHED: 'Unfinished',
  // Resource Status
  TERMINATED: 'Terminated',
  // Scheduling Information
  SCHEDULED_TO_NODE: 'Scheduled to {value}',
  SCHEDULING_NOT_SUCCESSFUL: 'Scheduling Not Successful',
  SCHEDULING_INFORMATION: 'Información de programación',
  SCHEDULING_RESULT: 'Información de programación de nodos',
  POD_SCHEDULING_METHOD: '¿Cómo se asignan los pods a los nodos?',
  POD_ASSIGNED_DESC: 'El valor de solicitud (es decir, Solicitud) establecido por el pod en el grupo de pod se utiliza como base para determinar la asignación de recursos. Solo cuando la cantidad que se puede asignar en el nodo ≥ el valor requerido del pod, se puede asignar el pod a este nodo.',
  STATUS_INFORMATION: 'Condiciones',
  WORKLOAD_CONDITION_AVAILABLE: 'Disponible',
  WORKLOAD_CONDITION_PROGRESSING: 'Progresando',
  NOT_SUCCESSFUL: 'Not successful',
  CURRENT_STATUS: 'Estado actual (fase)',
  POD_CONDITION_INITIALIZED: 'Inicializado',
  POD_CONDITION_INITIALIZED_DESC: 'Todos los contenedores init se han iniciado con éxito.',
  POD_CONDITION_READY: 'Listo',
  POD_CONDITION_READY_DESC: 'El pod ya se está ejecutando y se puede acceder a través del servicio.',
  POD_CONDITION_CONTAINERSREADY: 'Contenedores Listo',
  POD_CONDITION_CONTAINERSREADY_DESC: 'Los contenedores en la cápsula están listos.',
  POD_CONDITION_PODSCHEDULED: 'Pod programado',
  POD_CONDITION_PODSCHEDULED_DESC: 'El pod se ha asignado correctamente a un nodo.'
};