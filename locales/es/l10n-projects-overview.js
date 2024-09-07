/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Edit Quotas
  EDIT_QUOTAS: 'Editar quota',
  QUOTA: 'Quota',
  PROJECT_QUOTAS_NOT_SET: 'Project Quota Not Set',
  PROJECT_QUOTAS_DESC:
    'Project quotas specify the number of available CPU and memory resources and the maximum number of application resources such as oods, deployments, and services allowed in the project.',
  DEFAULT_CONTAINER_QUOTAS_NOT_SET: 'Resource Default Request Not Set',
  DEFAULT_CONTAINER_QUOTAS_DESC:
    'Default container quotas specify the default CPU request, CPU limit, memory request, and memory limit of containers created in the project.',
  APPLICATION_RESOURCE_COUNT: 'Monitorización de recursos de aplicaciones',
  SELECT_RESOURCE_TIP: 'Select a resource or enter a resource name',
  NUMBER_OF_PODS: 'Number of pods',
  NUMBER_OF_DEPLOYMENTS: 'Number of deployments',
  NUMBER_OF_STATEFULSETS: 'Number of statefulsets',
  NUMBER_OF_DAEMONSETS: 'Number of daemonsets',
  NUMBER_OF_JOBS: 'Number of jobs',
  NUMBER_OF_CRONJOBS: 'Number of cronjobs',
  NUMBER_OF_VOLUMES: 'Number of persistent volume claims',
  NUMBER_OF_SERVICES: 'Number of services',
  NUMBER_OF_ROUTES: 'Number of routes',
  NUMBER_OF_SECRETS: 'Number of secrets',
  NUMBER_OF_CONFIGMAPS: 'Number of configmaps',
  // Deployed Apps
  INSTALLED_APPS: 'Installed Apps',
  // Resource Status
  RESOURCE_STATUS: 'Estado del recurso',
  // Resource Status > Application Resources
  RESOURCE_WARNING_TIPS: 'Hay {warnNum} {tipName} que se muestran anormalmente.',
  // Resource Status > Physical Resources
  PHYSICAL_RESOURCE_PL: 'Physical Resources',
  CPU_USAGE_TIME: 'CPU Usage ({time})',
  MEMORY_USAGE_TIME: 'Memory Usage ({time})',
  // Tips
  TIPS: 'Tips',
  HOW_TO_INVITE_USERS: '¿Cómo invitar a otros miembros al proyecto actual?',
  HOW_TO_SET_PROJECT_GATEWAY: '¿Cómo configurar la puerta de enlace del proyecto?',
  // Top 5 for Resource Usage
  TOP_5_FOR_RSC_USAGE: 'Top 5 for Resource Usage',
  TOP_5_FOR_RESOURCE_USAGE: 'Ranking de uso de recursos',
  SORT_BY_WORKLOAD_CPU_USAGE: 'Ordenar por uso de CPU',
  SORT_BY_WORKLOAD_MEMORY_USAGE_WO_CACHE: 'Ordenar por uso de memoria',
  SORT_BY_WORKLOAD_NET_BYTES_TRANSMITTED: 'Ordenar por tráfico saliente',
  SORT_BY_WORKLOAD_NET_BYTES_RECEIVED: 'Ordenar por tráfico entrante',
};
