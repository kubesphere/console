/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Navigation pane
  PROJECT_SETTINGS: 'Configuraciones del proyecto',
  // Banner
  HOW_TO_USE_QUOTA_Q: 'How do I use resource quotas?',
  HOW_TO_USE_QUOTA_A:
    'Resource quotas are a mechanism used to limit the resource usage. You can edit project resource quotas and default container quotas by clicking <b>Edit Project</b>.',
  WHAT_ARE_DEFAULT_CONTAINER_QUOTAS_Q: 'What are default container quotas?',
  WHAT_ARE_DEFAULT_CONTAINER_QUOTAS_A:
    'Default container quotas specify the default CPU request, CPU limit, memory request, and memory limit of containers created in the project.',
  PROJECT_BASIC_INFO_DESC:
    'Basic information provides an overview of the project. You can view the project information and resource quotas.',
  // Manage > Edit Information
  // Manage > Edit Project Quotas
  EDIT_PROJECT_QUOTA: 'Edit Project Quota',
  PROJECT_REMAINING_QUOTAS: 'Project Remaining Quotas',
  WORKSPACE_REMAINING_QUOTAS: 'Workspace Remaining Quotas',
  // Manage > Edit Default Container Quotas
  GPU_TYPE_SCAP: 'GPU type',
  GPU_LIMIT_SCAP: 'GPU limit',
  REQUEST_EXCEED_WORKSPACE: 'Resource requests and limits cannot exceed workspace resource limits.',
  REQUEST_EXCEED_LIMIT:
    'Las solicitudes de recursos no deben ser mayores que los límites de recursos',
  REQUEST_EXCEED_AVAILABLE_QUOTA: 'Insufficient resources.',
  // Mange > Delete
  DELETE_PROJECT_TIP:
    'Enter the project name <strong>{resource}</strong> to confirm that you understand the risks of this operation.',
  // Project Information
  MANAGE: 'Manage',
  PROJECT_INFO: 'Información del proyecto',
  EDIT_PROJECT_QUOTAS: 'Edit Project Quotas',
  PROJECT_ROLE_SCAP: 'Project role',
  PROJECT_ROLE_SCAP_PL: 'Project roles',
  PROJECT_MEMBER_SCAP: 'Project member',
  PROJECT_MEMBER_SCAP_PL: 'Project members',
  // Default Container Quotas
  DEFAULT_CONTAINER_QUOTA_PL: 'Default Container Quotas',
  EDIT_DEFAULT_CONTAINER_QUOTAS: 'Edit Default Container Quotas',
  LIMITS_CPU: 'limit.cpu',
  LIMITS_MEMORY: 'limits.memoria',
  REQUESTS_CPU: 'CPU Request',
  REQUESTS_MEMORY: 'limit.cpu',
  // Project Quotas
  PROJECT_QUOTA_PL: 'Project Quotas',
  RESOURCE_TYPE_SCAP: 'Tipo de recurso',
  JOBS: 'Jobs',
  VOLUMES: 'Volumes',
  SERVICES: 'Servicio',
  ROUTES: 'Routes',
  SECRETS: 'Secrets',
};
