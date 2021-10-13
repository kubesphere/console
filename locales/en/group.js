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
    'Are you sure you want to assign the user to the department <strong>{group}</strong>?',
  ADD_MEMBER_TIP_PL:
    'Are you sure you want to assign the users to the department <strong>{group}</strong>?',
  principal: 'principal',
  CREATE_DEPARTMENT: 'Create Department',
  NO_DEPARTMENT_TIP:
    'No department available. Please create a department on the right.',
  WORKSPACE_ROLE: 'Workspace Role',
  WORKSPACE_MEMBER_EMPTY_DESC: 'Please invite a user to the workspace.',
  GROUP_WORKSPACE_ROLE_DESC:
    'The workspace role will be assigned to all members in the department.',
  PROJECT_ROLE: 'Project Role',
  ADD_PROJECT: 'Add Project',
  'project roles': 'project roles',
  DEVOPS_PROJECT_ROLE: 'DevOps Project Role',
  ADD_DEVOPS_PROJECT: 'Add DevOps Project',
  SELECT_ROLE_TIP: 'Please select a role.',
  DEPARTMENT: 'Department',

  DELETE_GROUP_TIP:
    'Are you sure you want to delete the department <strong>{group_name}</strong>? The associated roles will be unbound from the users.',
  DELETE_PARENT_GROUP_TIP:
    'Are you sure you want to delete the department <strong>{group_name}</strong>? Its subdepartments will also be deleted and the associated roles will be unbound from the users.',
}
