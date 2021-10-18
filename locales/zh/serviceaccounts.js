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
  ServiceAccounts: '服务帐户',
  ServiceAccount: '服务帐户',
  SERVICE_ACCOUNT: '服务帐户',
  SERVICE_ACCOUNT_PL: '服务帐户',
  SERVICE_ACCOUNT_LOW: '服务帐户',
  'Edit Service Account': '编辑服务帐户',
  CHANGE_ROLE: '修改角色',
  SECRET_DETAILS: '保密字典详情',
  SERVICE_ACCOUNT_DESC:
    '服务帐户（Service Account）为 Pod 中运行的进程提供了一个标识，用于访问 API Server。',
  SERVICE_ACCOUNT_EMPTY_DESC: '请创建一个服务帐户。',
  INVALID_YAML_FILE_FORMAT: 'YAML 文件格式错误。',

  SELECT_PROJECT_ROLE_DESC: '选择一个项目角色以指定权限。',

  SERVICEACCOUNT_KUBECONFIG_DESC:
    '下载 kubeconfig.yaml 文件供其他应用使用，从而为其他应用访问提供可访问当前项目的帐户。如果使用 kubeconfig.yaml 文件的应用部署在当前集群外，您需要将 clusters:cluster:server 参数的值修改为对外暴露的 Kubernetes API 服务器地址。<a href="https://kubernetes.io/docs/tasks/access-application-cluster/configure-access-multiple-clusters/" target="_black">了解更多</a>',

  // Service Account Detail Page
  SECRET_VALUE: '保密字典：{value}',
}
