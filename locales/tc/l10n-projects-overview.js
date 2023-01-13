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
  // Edit Quotas
  EDIT_QUOTAS: '編輯配額',
  QUOTA: 'Quota',
  PROJECT_QUOTAS_NOT_SET: '項目配額未設置',
  PROJECT_QUOTAS_DESC: 'Project quotas specify the number of available CPU and memory resources and the maximum number of application resources such as Pods, Deployments, and Services in the project.',
  DEFAULT_CONTAINER_QUOTAS_NOT_SET: '容器資源預設請求未設置',
  DEFAULT_CONTAINER_QUOTAS_DESC: 'Default container quotas specify the default CPU request, CPU limit, memory request, and memory limit of containers created in the project.',
  APPLICATION_RESOURCE_COUNT: '應用資源監控',
  SELECT_RESOURCE_TIP: 'Select a resource or enter a resource name',
  NUMBER_OF_PODS: 'Number of pods',
  NUMBER_OF_DEPLOYMENTS: 'Number of deployments',
  NUMBER_OF_STATEFULSETS: 'Number of statefulsets',
  NUMBER_OF_DAEMONSETS: 'Number of daemonsets',
  NUMBER_OF_JOBS: 'Number of jobs',
  NUMBER_OF_CRONJOBS: 'Number of cronjobs',
  NUMBER_OF_VOLUMES: 'Number of persistent volume claims',
  NUMBER_OF_SERVICES: 'Number of services',
  NUMBER_OF_ROUTES: 'Number of ingresses',
  NUMBER_OF_SECRETS: 'Number of secrets',
  NUMBER_OF_CONFIGMAPS: 'Number of configmaps',
  // Deployed Apps
  INSTALLED_APPS: 'Installed Apps',
  // Resource Status
  RESOURCE_STATUS: '資源狀態',
  // Resource Status > Application Resources
  RESOURCE_WARNING_TIPS: '有 {warnNum} 個 {tipName} 狀態異常',
  // Resource Status > Physical Resources
  PHYSICAL_RESOURCE_PL: 'Physical Resources',
  CPU_USAGE_TIME: 'CPU 使用量（{time}）',
  MEMORY_USAGE_TIME: '記憶體使用量（{time}）',
  // Tips
  TIPS: 'Tips',
  HOW_TO_INVITE_USERS: '邀請其他成員到目前項目中?',
  HOW_TO_SET_PROJECT_GATEWAY: '如何設置項目網關？',
  // Top 5 for Resource Usage
  TOP_5_FOR_RSC_USAGE: '資源用量 Top 5',
  TOP_5_FOR_RESOURCE_USAGE: '資源用量 Top 5',
  SORT_BY_WORKLOAD_CPU_USAGE: '按 CPU 使用量排行',
  SORT_BY_WORKLOAD_MEMORY_USAGE_WO_CACHE: '按記憶體使用量排行',
  SORT_BY_WORKLOAD_NET_BYTES_TRANSMITTED: '按網路流出速率排行',
  SORT_BY_WORKLOAD_NET_BYTES_RECEIVED: '按網路流入速率排行'
};