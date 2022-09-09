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
  // Banner
  PROJECT_DESC: '项目用于对资源进行分组管理和控制不同用户的资源管理权限。',
  SYSTEM_PROJECTS: '系统项目',
  USER_PROJECTS: '用户项目',
  // List
  EMPTY_WRAPPER: '未发现{resource}',
  TERMINATING: '删除中',
  ACTIVE: '活跃',
  // List > Assign Workspace
  PROJECT_ADMINISTRATOR: '项目管理员',
  PROJECT_ADMINISTRATOR_DESC: '选择企业空间中的用户作为项目管理员。',
  PROJECT_ASSIGN_DESC: '项目被分配到企业空间后不允许变更项目所属的企业空间。',
  // List > Create
  CREATE_PROJECT_DESC: '创建项目以对资源进行分组并控制不同用户的权限。',
  PROJECT_NAME_DESC: '名称只能包含小写字母、数字和连字符（-），必须以小写字母开头并以小写字母或数字结尾，最长 63 个字符。',
  PROJECT_NAME_INVALID_DESC: '名称无效。名称只能包含小写字母、数字和连字符（-），必须以小写字母开头并以小写字母或数字结尾，最长 63 个字符。',
  CANCEL: '取消',
  CREATE_NAME: '创建{name}',
  DESCRIPTION: '描述',
  NAME_VALIDATION_FAILED: '名称不能以 kube- 开头，该字符串为 Kubernetes 系统保留保留字符串。',
  PROJECT_NAME_EXIST_DESC: '名称已存在，请输入其他名称。项目名称必须在整个平台上唯一。',
  NAME_EMPTY_DESC: '请设置一个名称。',
  OK: '确定',
  NAME_DESC: '名称只能包含小写字母、数字和连字符（-），必须以小写字母或数字开头和结尾，最长 63 个字符。',
  DESCRIPTION_DESC: '描述可包含任意字符，最长 256 个字符。',
  ALIAS_DESC: '别名可包含任意字符，最长 63 个字符。',
  // List > Edit Information
  EDIT_INFORMATION: '编辑信息',
  // List > Delete
  DELETE_TITLE_SI: '删除{type}',
  DELETE_TITLE_PL: '批量删除{type}',
  DELETE: '删除',
  PROJECT_LOW: '项目',
  DELETED_SUCCESSFULLY: '删除成功。',
  STOP_SUCCESS_DESC: '停止成功。',
  DELETE_RESOURCE_TYPE_DESC_SI: '请输入{type}名称 <strong>{resource}</strong> 以确认您了解此操作的风险。',
  DELETE_RESOURCE_TYPE_DESC_PL: '请输入{type}名称 <strong>{resource}</strong> 以确认您了解此操作的风险。',
  DELETE_RESOURCE_TYPE_DESC_GW: '请输入{type}名称 <strong>{resource}</strong> 以确认您了解此操作的风险。'
};