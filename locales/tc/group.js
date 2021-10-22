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
  ADD_MEMBER_TIP_SI:
    'Are you sure you want to assign the user to <strong>{group}</strong>?',
  ADD_MEMBER_TIP_PL:
    'Are you sure you want to assign the users to the department <strong>{group}</strong>?',
  principal: '負責人',
  CREATE_DEPARTMENT: 'Create Department',
  NO_DEPARTMENT_TIP:
    'No department available. Please create a department on the right.',
  'workspace role': '企業空間角色',
  PROJECT_ROLE: '項目角色',
  ADD_PROJECT: '添加項目',
  'project roles': '項目角色',
  DEVOPS_PROJECT_ROLE: 'DevOps 项目角色',
  ADD_DEVOPS_PROJECT: '添加 DevOps 项目',
  SELECT_ROLE_TIP: 'Please select a role.',
  DEPARTMENT: 'Department',
  GROUP_WORKSPACE_ROLE_DESC: '企業空間角色將授予部門中的所有用戶。',

  DELETE_PARENT_GROUP_TIP:
    '確定刪除子部門 <strong>{group_name}</strong>? 刪除該部門的同時，其子部門也會被刪除，且所有成員的授權也將被取消。',
  DELETE_GROUP_TIP:
    '確定刪除子部門 <strong>{group_name}</strong>? 刪除該部門的同時，所有成員的授權也將被取消。',
}
