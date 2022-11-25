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
  DEVOPS_TIP_GITOPS_Q: 'How do I get started with DevOps?',
  DEVOPS_TIP_GITOPS_A: 'You can start using DevOps by creating a pipeline that is associated with the code repository and deploying steps with Kubernetes.',
  DEVOPS_TIP_TYPE_Q: 'Which code repositories are supported by pipelines?',
  DEVOPS_TIP_TYPE_A: 'Pipelines support code repositories of Git, GitHub, Gitlab, SVN, and Bitbucket.',
  // List
  DEVOPS_PROJECT_EMPTY_DESC: 'Please create a DevOps project.',
  // List > Create
  CREATE_DEVOPS_PROJECT: 'Create DevOps Project',
  DEVOPS_PROJECT_CREATE_DESC: 'DevOps is a separate namespace that defines a set of pipelines. Users can group their pipelines themselves (for example, project type and organization type).',
  DEVOPS_BASEINFO_DESC: 'Please set the basic information of the DevOps project',
  PATTERN_NAME_INVALID_TIP: 'Invalid name. The name can contain only lowercase letters, numbers, and hyphens (-).',
  // List > Create > Cluster Settings
  NO_DEVOPS_INSTALL: 'DevOps not installed',
  // List > Edit
  DEVOPS_ADMIN_DESC: 'Select a project member as the project administrator.',
  // List > Delete
  DELETE_MULTIPLE_DEVOPS_PROJECTS: 'Delete Multiple DevOps Projects',
  DELETE_DEVOPS_PROJECT: 'Delete DevOps Project',
  DELETE_DEVOPS_PROJECT_TIP: 'Enter the DevOps project name <strong>{resource}</strong> to confirm that you understand the risks of this operation.',
  DELETE_DEVOPS_PROJECT_TIP_PL: 'Enter the DevOps project names <strong>{resource}</strong> to confirm that you understand the risks of this operation.',
}
