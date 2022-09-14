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
  DEVOPS_TIP_GITOPS_Q: '如何落地 DevOps？',
  DEVOPS_TIP_GITOPS_A: '創建關聯代碼倉庫的流水線，並積極使用部署 Kubernetes 部署步驟，就可以實現 DevOps 了。',
  DEVOPS_TIP_TYPE_Q: '流水線 (Pipeline) 支持哪些代碼倉庫類別？',
  DEVOPS_TIP_TYPE_A: '流水線支持 Git、GitHub、Gitlab、SVN、以及 Bitbucket 代碼倉庫.',
  // List
  DEVOPS_PROJECT_EMPTY_DESC: 'Please create a DevOps project.',
  // List > Create
  CREATE_DEVOPS_PROJECT: '創建 DevOps 项目',
  DEVOPS_PROJECT_CREATE_DESC: 'DevOps 是一個獨立的命名空間，其中定義了一組流水線；用戶可以按照自己的方式對流水線進行分組 (例如：項目類型、組織類型)。',
  DEVOPS_BASEINFO_DESC: 'Please set the basic information of the DevOps project',
  PATTERN_NAME_INVALID_TIP: 'Invalid name. The name can contain only lowercase letters, numbers, and hyphens (-).',
  // List > Create > Cluster Settings
  NO_DEVOPS_INSTALL: '未安裝 DevOps',
  // List > Edit
  DEVOPS_ADMIN_DESC: '指定项目内一個成員為管理員。',
  // List > Delete
  DELETE_MULTIPLE_DEVOPS_PROJECTS: 'Delete Multiple DevOps Projects',
  DELETE_DEVOPS_PROJECT: '刪除 DevOps 项目',
  DELETE_DEVOPS_PROJECT_TIP: 'Enter the DevOps project name <strong>{resource}</strong> to confirm that you understand the risks of this operation.',
  DELETE_DEVOPS_PROJECT_TIP_PL: 'Enter the DevOps project names <strong>{resource}</strong> to confirm that you understand the risks of this operation.'
};