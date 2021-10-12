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
  CREATE_DEVOPS_PROJECT: 'Create DevOps Project',
  DELETE_DEVOPS_PROJECT: 'Delete DevOps Project',
  'DevOps Basic Info': 'DevOps Basic Information',
  DEVOPS_PROJECT_CREDENTIAL_PL: 'DevOps Project Credentials',
  DEVOPS_CREDENTIAL_EMPTY_DESC: 'Please create a DevOps project credential.',
  DEVOPS_CREDENTIAL: 'DevOps Credential',
  DEVOPS_CREDENTIAL_LOW: 'DevOps credential',
  'DevOps Member': 'DevOps Member',
  'DevOps Members': 'DevOps Members',
  DEVOPS_NAME: 'Name',
  DEVOPS_PROJECT: 'DevOps Project',
  DEVOPS_PROJECT_MEMBER: 'DevOps Project Member',
  DEVOPS_PROJECT_MEMBER_EMPTY_DESC:
    'Please invite a member of the current workspace to the DevOps project.',
  'DevOps Project Manager': 'DevOps Project Manager',
  'DevOps Role': 'DevOps Role',
  'DevOps Roles': 'DevOps Roles',
  MANAGER: 'Manager',

  DEVOPS_PROJECT_MANAGEMENT: 'Project Management',
  DEVOPS_PROJECT_SETTINGS: 'DevOps Project Settings',
  MANAGE_DEVOPS_PROJECT: 'Manage DevOps Project',
  DEVOPS_PROJECT_MEMBER_PL: 'DevOps Project Members',
  DEVOPS_PROJECT_ROLE_PL: 'DevOps Project Roles',

  DEVOPS_BASEINFO_DESC:
    'Please input the basic information of the DevOps project',

  DEVOPS_DESCRIPTION:
    'A DevOps project is a separate namespace where a set of pipelines is defined. Users can group their pipelines themselves (for example, project type and organization type).',
  DEVOPS_PROJECT_CREATE_DESC:
    'DevOps is a separate namespace that defines a set of pipelines. Users can group their pipelines themselves (for example, project type and organization type).',
  DEVOPS_PROJECT_EMPTY_DESC: 'Please create a DevOps project.',
  PIPELINE_EMPTY_DESC: 'Please create a pipeline.',
  DEVOPS_ADMIN_DESC: 'Specify a member of the project as an administrator.',

  NO_RELATE_DEVOPS_TITLE: 'No DevOps project associated with you',
  NO_RELATE_DEVOPS_DESC:
    'You can create or contact the project manager to invite you to the DevOps project to start your work.',

  DEVOPS_PROJECT_CREDENTIALS_DESC:
    'Credentials are objects that contain sensitive data, such as usernames and passwords, SSH keys, and tokens, to provide authentication for pulling code, pushing or pulling images, executing SSH scripts, and so on when a pipeline is running.',
  DEVOPS_CREDENTIALS_DESC:
    'Credentials are objects that contain some sensitive data, such as username and password, SSH key and Token. They are used to provide authentication for pulling code, pushing/pulling images, executing SSH scripts, etc. when a pipeline is running.',

  DEVOPS_PROJECT_ROLES_DESC:
    'The project roles define the permissions that users have under the current DevOps project.',
  DEVOPS_PROJECT_MEM_DESC: 'Manage and assign roles to project members.',
  DEVOPS_PROJECT_ROLE_EMPTY_DESC: 'Please create a DevOps project role.',

  DELETE_DEVOPS_TIP:
    'Are you sure you want to delete the DevOps project <strong>{resource}</strong>? After the deletion, you will not be able to recover it, and the resources in the DevOps project will also be removed.',

  DEVOPS_TIP_GITOPS_Q: 'How do I get started with DevOps?',
  DEVOPS_TIP_GITOPS_A:
    'You can start using DevOps by creating a pipeline that is associated with the code repository and deploying steps with Kubernetes.',

  DEVOPS_TIP_TYPE_Q: 'Which code repositories are supported by pipelines?',
  DEVOPS_TIP_TYPE_A:
    'Pipelines support code repositories of Git, GitHub, Gitlab, SVN, and Bitbucket.',

  NO_DEVOPS_INSTALL: 'DevOps not installed',

  // Credentials Creation Page
  SECRET_DEVOPS: 'Secret',
  CONTENT: 'Content',
  INVALID_ID_TIP:
    'The ID can contain only lowercase letters, numbers, and hyphens (-), and must start and end with a lowercase letter or number. The maximum length is 63 characters.',
}
