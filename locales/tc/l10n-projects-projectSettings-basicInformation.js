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
  PROJECT_SETTINGS: '項目設置',
  // Banner
  HOW_TO_USE_QUOTA_Q: '如何使用資源配額?',
  HOW_TO_USE_QUOTA_A: 'Resource quotas are a mechanism used to limit the resource usage. You can edit project resource quotas and default container quotas by clicking <b>Edit Project</b>.',
  WHAT_ARE_DEFAULT_CONTAINER_QUOTAS_Q: 'What are default container quotas?',
  WHAT_ARE_DEFAULT_CONTAINER_QUOTAS_A: 'Default container quotas specify the default CPU request, CPU limit, memory request, and memory limit of containers created in the project.',
  PROJECT_BASIC_INFO_DESC: 'Basic information provides an overview of the project. You can view the project information and resource quotas.',
  // Manage > Edit Information
  // Manage > Edit Project Quotas
  EDIT_PROJECT_QUOTA: 'Edit Project Quota',
  PROJECT_REMAINING_QUOTAS: '項目剩餘配額',
  WORKSPACE_REMAINING_QUOTAS: '企業空間剩餘配額',
  // Manage > Edit Default Container Quotas
  GPU_TYPE_SCAP: 'GPU type',
  GPU_LIMIT_SCAP: 'GPU limit',
  REQUEST_EXCEED_WORKSPACE: 'Resource requests and limits cannot exceed workspace resource limits.',
  REQUEST_EXCEED_LIMIT: '資源預留不能超過資源限制。',
  REQUEST_EXCEED_AVAILABLE_QUOTA: 'Insufficient resources.',
  // Mange > Delete
  DELETE_PROJECT_TIP: 'Enter the project name <strong>{resource}</strong> to confirm that you understand the risks of this operation.',
  // Project Information
  MANAGE: '管理',
  PROJECT_INFO: '項目資訊',
  EDIT_PROJECT_QUOTAS: 'Edit Project Quotas',
  PROJECT_ROLE_SCAP: 'Project role',
  PROJECT_ROLE_SCAP_PL: 'Project roles',
  PROJECT_MEMBER_SCAP: 'Project member',
  PROJECT_MEMBER_SCAP_PL: 'Project members',
  // Default Container Quotas
  DEFAULT_CONTAINER_QUOTA_PL: 'Default Container Quotas',
  EDIT_DEFAULT_CONTAINER_QUOTAS: 'Edit Default Container Quotas',
  LIMITS_CPU: 'CPU 限額',
  LIMITS_MEMORY: '記憶體限額',
  REQUESTS_CPU: 'CPU 預留',
  REQUESTS_MEMORY: 'CPU 限額',
  // Project Quotas
  PROJECT_QUOTA_PL: 'Project Quotas',
  RESOURCE_TYPE_SCAP: '資源類型',
  JOBS: 'Jobs',
  VOLUMES: 'Volumes',
  SERVICES: '服務',
  ROUTES: 'Ingresses',
  SECRETS: '保密字典'
};