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
  ServiceAccounts: '服務帳戶',
  ServiceAccount: '服務帳戶',
  SERVICE_ACCOUNT: '服務帳戶',
  SERVICE_ACCOUNT_PL: '服務帳戶',
  SERVICE_ACCOUNT_LOW: 'service account',
  'Edit Service Account': '編輯服務帳戶',
  CHANGE_ROLE: '修改角色',
  SECRET_DETAILS: '保密字典詳情',
  SERVICE_ACCOUNT_DESC:
    '服務帳戶（Service Account）為 Pod 中運行的進程提供了壹個標識，用於訪問 API Server。',
  SERVICE_ACCOUNT_EMPTY_DESC: 'Please create a service account.',
  INVALID_YAML_FILE_FORMAT: 'YAML 文件格式錯誤。',

  SELECT_PROJECT_ROLE_DESC: '選擇一個項目角色以指定權限。',

  SERVICEACCOUNT_KUBECONFIG_DESC:
    'Kubeconfig 配置方法請參照 <a href="https://kubernetes.io/docs/tasks/access-application-cluster/configure-access-multiple-clusters/" target="_black">官方文檔</a> ，下載後請將服務地址修改為 Kubernetes API 的外部地址。',

  // Service Account Detail Page
  SECRET_VALUE: '保密字典：{value}',
}
