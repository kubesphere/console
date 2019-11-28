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

export default {
  DEVOPS_PROJECT_MANAGEMENT: 'Project Management',
  DEVOPS_PROJECT_MEMBERS: 'Project Members',
  DEVOPS_PROJECT_ROLES: 'Project Roles',

  DEVOPS_BASEINFO_DESC:
    'Please input the basic information of the DevOps project',

  DEVOPS_DESCRIPTION:
    'DevOps is a separate namespace that defines a set of pipelines. Users can group their pipelines according to their own (for example: project type, organization type).',
  DEVOPS_PROJECT_CREATE_DESC:
    'DevOps is a separate namespace that defines a set of pipelines. Users can group their pipelines according to their own (for example: project type, organization type).',

  DEVOPS_ADMIN_DESC:
    'You can specify a member of the project as an administrator',

  NO_RELATE_DEVOPS_TITLE: 'No DevOps project associated with you',
  NO_RELATE_DEVOPS_DESC:
    'You can create or contact the project manager to invite you to the DevOps project to start your work.',

  DEVOPS_PROJECT_CREDENTIALS_DESC:
    'Credential is an object that contains some sensitive data, such as username and password, SSH key and Token, etc., used to provide authentication for the process of pulling code, push/pull image, SSH script execution, etc. when Pipeline is running',

  DEVOPS_PROJECT_ROLES_DESC:
    'The project roles defines the permissions that users have under the current DevOps project.',
  DEVOPS_PROJECT_MEM_DESC: 'Manage and assign roles to project members',

  DELETE_DEVOPS_TIP:
    'Are you sure about deleting the DevOps project <strong>{resource}</strong> ? After the deletion, you will not be able to recover, and the resources under the DevOps project will also be destroyed.',

  DEVOPS_TIP_GITOPS_Q: 'How to get started with GitOps?',
  DEVOPS_TIP_GITOPS_A:
    'Create relevant code repository pipeline and apply kubernetes to deploy steps. The the GitOps can be realized.',

  DEVOPS_TIP_TYPE_Q: 'Which code repositories are supported by the Pipeline?',
  DEVOPS_TIP_TYPE_A:
    'The pipeline supports code repositories of git, github, SVN, and Bitbucket Server.',
}
