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
  // Navigation pane
  PROJECT_SETTINGS: 'Configuraciones del proyecto',
  // Banner
  HOW_TO_USE_QUOTA_Q: 'How do I use resource quotas?',
  HOW_TO_USE_QUOTA_A: 'Resource quotas are a mechanism used to limit the resource usage. You can edit project resource quotas and default container quotas by clicking <b>Edit Project</b>.',
  WHAT_ARE_DEFAULT_CONTAINER_QUOTAS_Q: 'What are default container quotas?',
  WHAT_ARE_DEFAULT_CONTAINER_QUOTAS_A: 'Default container quotas specify the default CPU request, CPU limit, memory request, and memory limit of containers created in the project.',
  PROJECT_BASIC_INFO_DESC: 'Basic information provides an overview of the project. You can view the project information and resource quotas.',
  // Manage > Edit Information
  // Manage > Edit Project Quotas
  EDIT_PROJECT_QUOTA: 'Edit Project Quota',
  NUMBER_OF_CRONJOBS: 'Number of CronJobs',
  PROJECT_REMAINING_QUOTAS: 'Project Remaining Quotas',
  WORKSPACE_REMAINING_QUOTAS: 'Workspace Remaining Quotas',
  NUMBER_OF_JOBS: 'Number of Jobs',
  // Manage > Edit Default Container Quotas
  GPU_TYPE_SCAP: 'GPU type',
  GPU_LIMIT_SCAP: 'GPU limit',
  REQUEST_EXCEED_WORKSPACE: 'Resource requests and limits cannot exceed workspace resource limits.',
  REQUEST_EXCEED_LIMIT: 'Las solicitudes de recursos no deben ser mayores que los límites de recursos',
  // Mange > Delete
  DELETE_PROJECT_TIP: '¿Está seguro de eliminar el proyecto <strong>{resource}</strong> ? Después de la eliminación no podrás recuperarlo y los recursos del proyecto también serán destruidos.',
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
  // Project Quotas
  PROJECT_QUOTA_PL: 'Project Quotas',
  RESOURCE_TYPE_SCAP: 'Tipo de recurso'
};