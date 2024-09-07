/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Navigation pane
  PROJECT_SETTINGS: '项目设置',
  // Banner
  HOW_TO_USE_QUOTA_Q: '如何使用资源配额?',
  HOW_TO_USE_QUOTA_A:
    '资源配额是用来限制资源用量的一种机制，您可以通过<b>编辑项目</b>来编辑项目资源配额和默认容器配额。',
  WHAT_ARE_DEFAULT_CONTAINER_QUOTAS_Q: '什么是默认容器配额?',
  WHAT_ARE_DEFAULT_CONTAINER_QUOTAS_A:
    '默认容器配额用于指定项目中创建的容器的默认 CPU 预留、CPU 上限、内存预留和内存上限。',
  PROJECT_BASIC_INFO_DESC: '基本信息提供项目的信息概览，您可以查看项目的信息以及默认容器配额。',
  // Manage > Edit Information
  // Manage > Edit Project Quotas
  EDIT_PROJECT_QUOTA: '编辑项目配额',
  PROJECT_REMAINING_QUOTAS: '项目剩余配额',
  WORKSPACE_REMAINING_QUOTAS: '企业空间剩余配额',
  // Manage > Edit Default Container Quotas
  GPU_TYPE_SCAP: 'GPU 类型',
  GPU_LIMIT_SCAP: 'GPU 上限',
  REQUEST_EXCEED_WORKSPACE: '资源预留和资源上限均不能超过企业空间资源上限。',
  REQUEST_EXCEED_LIMIT: '资源预留不能超过资源上限。',
  REQUEST_EXCEED_AVAILABLE_QUOTA: '资源不足。',
  // Mange > Delete
  DELETE_PROJECT_TIP: '请输入项目名称 <strong>{resource}</strong> 以确认您了解此操作的风险。',
  // Project Information
  MANAGE: '管理',
  PROJECT_INFO: '项目信息',
  EDIT_PROJECT_QUOTAS: '编辑项目配额',
  PROJECT_ROLE_SCAP: '项目角色',
  PROJECT_ROLE_SCAP_PL: '项目角色',
  PROJECT_MEMBER_SCAP: '项目成员',
  PROJECT_MEMBER_SCAP_PL: '项目成员',
  // Default Container Quotas
  DEFAULT_CONTAINER_QUOTA_PL: '默认容器配额',
  EDIT_DEFAULT_CONTAINER_QUOTAS: '编辑默认容器配额',
  LIMITS_CPU: 'CPU 上限',
  LIMITS_MEMORY: '内存上限',
  REQUESTS_CPU: 'CPU 预留',
  REQUESTS_MEMORY: '内存预留',
  // Project Quotas
  PROJECT_QUOTA_PL: '项目配额',
  RESOURCE_TYPE_SCAP: '资源类型',
  JOBS: '任务',
  VOLUMES: '卷',
  SERVICES: '服务',
  ROUTES: '应用路由',
  SECRETS: '保密字典',
};
