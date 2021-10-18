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
  ServiceAccounts: 'Service Accounts',
  ServiceAccount: 'Service Account',
  SERVICE_ACCOUNT: 'Service Account',
  SERVICE_ACCOUNT_PL: 'Service Accounts',
  SERVICE_ACCOUNT_LOW: 'service account',
  'Edit Service Account': 'Edit Service Account',
  CHANGE_ROLE: 'Change Role',
  SECRET_DETAILS: 'Secret Details',
  SERVICE_ACCOUNT_DESC:
    'A Service Account provides the processes that run in a Pod with an identity that can be used to access the API server.',
  SERVICE_ACCOUNT_EMPTY_DESC: 'Please create a service account.',
  INVALID_YAML_FILE_FORMAT: 'Invalid YAML file format.',

  SELECT_PROJECT_ROLE_DESC: 'Select a project role to specify permissions.',

  SERVICEACCOUNT_KUBECONFIG_DESC:
    'Download the kubeconfig.yaml file to provide other apps with a account that can access the current project. If the apps to use the kubeconfig.yaml file are deployed outside the current cluster, you need to change the value of clusters:cluster:server to the Kubernetes API server address exposed to the outside. <a href="https://kubernetes.io/docs/tasks/access-application-cluster/configure-access-multiple-clusters/" target="_black">Learn More</a>',

  // Service Account Detail Page
  SECRET_VALUE: 'Secret: {value}',
}
