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
  PROJECT_DESC: 'Projects are used to group resources and control the resource management permissions of different users.',
  SYSTEM_PROJECTS: 'System Projects',
  USER_PROJECTS: 'User Projects',
  // List
  EMPTY_WRAPPER: 'No {resource} Found',
  TERMINATING: 'Terminating',
  ACTIVE: 'सक्रिय',
  // List > Assign Workspace
  PROJECT_ADMINISTRATOR: 'Project Administrator',
  PROJECT_ADMINISTRATOR_DESC: 'Select a user in the workspace as the project administrator.',
  PROJECT_ASSIGN_DESC: 'After the project is assigned to a workspace, the workspace cannot be changed.',
  // List > Create
  CREATE_PROJECT_DESC: 'Create a project to group resources and control the resource management permissions of different users.',
  PROJECT_NAME_DESC: 'The name can contain only lowercase letters, numbers, and hyphens (-), must start with a lowercase letter, and must end with a lowercase letter or number. The maximum length is 63 characters.',
  PROJECT_NAME_INVALID_DESC: 'Invalid name. The name can contain only lowercase letters, numbers, and hyphens (-), must start with a lowercase letter, and must end with a lowercase letter or number. The maximum length is 63 characters.',
  CANCEL: 'Cancel',
  CREATE_NAME: 'Create {name}',
  DESCRIPTION: 'Description',
  NAME_VALIDATION_FAILED: 'The name cannot start with kube-, which is reserved for the Kubernetes system.',
  PROJECT_NAME_EXIST_DESC: 'The name already exists. Please enter another name. Project names must be unique on the entire platform.',
  NAME_EMPTY_DESC: 'Please set a name.',
  OK: 'OK',
  NAME_DESC: 'The name can contain only lowercase letters, numbers, and hyphens (-), and must start and end with a lowercase letter or number. The maximum length is 63 characters.',
  DESCRIPTION_DESC: 'The description can contain any characters and the maximum length is 256 characters.',
  ALIAS_DESC: 'The alias name can contain only letters, numbers, and hyphens (-), and cannot start or end with a hyphen. The maximum length is 63 characters.',
  // List > Edit Information
  EDIT_INFORMATION: 'Edit Information',
  // List > Delete
  DELETE_TITLE_SI: 'Delete {type}',
  DELETE_TITLE_PL: 'Delete Multiple {type}',
  DELETE: 'Delete',
  PROJECT_LOW: 'project',
  DELETED_SUCCESSFULLY: 'Deleted successfully.',
  STOP_SUCCESS_DESC: 'Stopped successfully.',
  DELETE_RESOURCE_TYPE_DESC_SI: 'Enter the {type} name <strong>{resource}</strong> to confirm that you understand the risks of this operation.',
  DELETE_RESOURCE_TYPE_DESC_PL: 'Enter the {type} names <strong>{resource}</strong> to confirm that you understand the risks of this operation.',
  DELETE_RESOURCE_TYPE_DESC_GW: 'Enter the {type} names <strong>{resource}</strong> to confirm that you understand the risks of this operation.'
};