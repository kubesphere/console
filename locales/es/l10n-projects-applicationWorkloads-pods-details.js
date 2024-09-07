/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
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
  POD_ASSIGNED_DESC:
    'El valor de solicitud (es decir, Solicitud) establecido por el pod en el grupo de pod se utiliza como base para determinar la asignación de recursos. Solo cuando la cantidad que se puede asignar en el nodo ≥ el valor requerido del pod, se puede asignar el pod a este nodo.',
  STATUS_INFORMATION: 'Condiciones',
  WORKLOAD_CONDITION_AVAILABLE: 'Disponible',
  WORKLOAD_CONDITION_PROGRESSING: 'Progresando',
  NOT_SUCCESSFUL: 'Not successful',
  CURRENT_STATUS: 'Estado actual (fase)',
  POD_CONDITION_INITIALIZED: 'Inicializado',
  POD_CONDITION_INITIALIZED_DESC: 'Todos los contenedores init se han iniciado con éxito.',
  POD_CONDITION_READY: 'Listo',
  POD_CONDITION_READY_DESC:
    'El pod ya se está ejecutando y se puede acceder a través del servicio.',
  POD_CONDITION_CONTAINERSREADY: 'Contenedores Listo',
  POD_CONDITION_CONTAINERSREADY_DESC: 'Los contenedores en la cápsula están listos.',
  POD_CONDITION_PODSCHEDULED: 'Pod programado',
  POD_CONDITION_PODSCHEDULED_DESC: 'El pod se ha asignado correctamente a un nodo.',
};
