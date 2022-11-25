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
  // Create Cluster
  SELECT_ADD_CLUSTER_METHOD: 'Choose how to add a cluster',
  SELECT_ADD_CLUSTER_METHOD_DESC: 'Support for adding new clusters and importing existing clusters.',
  CLUSTER_NODE_SETTINGS_DESC: 'add the nodes for the cluster',
  K8S_CLUSTER_SETTINGS_DESC: 'Initially configure the new Kubernetes cluster.',
  CLUSTER_MAX_PODS_DESC: 'maxPods is the number of pods that can run on this Kubelet. [Default: 110].',
  KUBE_PODS_CIDR_DESC:
    "The pod running on the node allocates IP addresses from the node's pod CIDR range.",
  KUBE_SERVICE_CIDR_DESC: 'IP address range assigned to the service.',
  CLUSTER_COMPONENTS_DESC: 'Customize the service components of the cluster.',
  CLUSTER_ADVANCED_SETTINGS_DESC: 'You can configure the services you need according to your needs.',
  CLUSTER_PRIVATE_REGISTRY_DESC: 'Configure a private registry for the cluster. The cluster will use this registry to pull all the required mirrors.',
  CLUSTER_CONTROLPLANE_ENDPOINT: 'Cluster Access EndPoint',
  CLUSTER_CONTROLPLANE_ENDPOINT_DESC: 'Directly communicate with the cluster through the authorized cluster access address, and generate kubeconfig for the cluster to access the cluster.',
  CLUSTER_ETCD_BACKUP_DESC: 'Make regular backup settings for etcd',
  CLUSTER_ETCD_BACKUP_DIR_DESC: 'The location to store etcd backups files on etcd host machines.',
  CLUSTER_ETCD_BACKUP_PERIOD_DESC: 'Period of running backup etcd job, the unit is minutes.',
  CLUSTER_ETCD_BACKUP_NUMBER_DESC: 'How many backup replicas to keep.',
  CLUSTER_KUBESPHERE_SETTINGS_DESC: 'Customized settings for KubeSphere',
  MASTER_NODE_COUNT_TIP: 'The number of Master nodes needs to be 1 or 3',
  WORKER_NODE_COUNT_TIP: 'The number of Worker nodes is at least 1',
  HOW_TO_ADD: 'How to Add',
  DOMAIN: 'Domain',
  // Add Node
  NODE_ROLE_EMPTY_DESC: 'Please set the role of the node in the cluster.',
  EXTERNAL_IP: 'External IP Address',
  SSH_KEY_TCAP: 'SSH Key',
  SSH_KEY_SCAP: 'SSH key',
  SSH_AUTH_MODE: 'SSH Authentication Mode',
  NODE_INTERNAL_IP_DESC: 'Set the internal IP address of the node in the KubeSphere cluster.',
  NODE_INTERNAL_IP_EMPTY_DESC: 'Please set the internal IP address of the node in the KubeSphere cluster.',
  NODE_ROLE_DESC: 'Set the role of the node in the cluster.',
  NODE_EXTERNAL_IP_DESC: 'Enter the node IP address and port number used for SSH login.',
  NODE_EXTERNAL_IP_EMPTY_DESC: 'Please enter the node IP address and port number used for SSH login.',
  SSH_AUTH_MODE_DESC: 'Select an SSH authentication mode.',
  NODE_USERNAME_DESC: 'Enter the username used for SSH login.',
  NODE_PASSWORD_DESC: 'Enter the password used for SSH login.',
  ADD_NODE_TO_THE_CLUSTER: 'Add node to the cluster',
  // src/pages/workspaces/containers/Clusters
  WORKSPACE_CLUSTERS_DESC: 'The cluster information shows how cluster resources are used in the workspace.',
  // src/pages/console/components/Cards/Workspace
  DEVOPS_PROJECT_NUMBER: 'DevOps Projects',
  PROJECT_NUMBER: 'Projects',
  VIEW_WORKSPACE: 'View Workspace',
  MEMBERS: 'Members',
  // src/components/Forms/Cluster/AdvanceSettings
  PRIVATE_REGISTRY: 'Private Registry',
  // src/pages/projects/containers/Alerting/Messages
  ALERT_TYPE: '{type} Alert',
  // src/pages/projects/containers/Applications/OPAppDetail/VersionInfo
  CURRENT_VERSION: 'Current version',
  UPGRADE: 'Upgrade',
  // src/utils/time.js
  DAYS: 'days',
  WEEKS: 'weeks',
  // components/Inputs/Upload
  FILE_OVERSIZED_TIP: 'The file size must be less than 2 MB.',
  // pages/clusters/containers/Clusters/index.jsx
  NEW_CLUSTER: 'New Cluster',
  IMPORT_CLUSTER: 'Import Cluster',
  // src/components/Forms/Cluster/BaseInfo/index.jsx
  NODE_SETTINGS: 'Node Settings',
  PLEASE_ADD_AT_LEAST_ONE_CLUSTER_NODE: 'Please add at least one cluster node',
  // src/components/Forms/Cluster/ClusterSettings
  NETWORK_PLUGIN: 'Network Plugin',
  MAX_PODS: 'Max Pods',
  PODS_CIDR: 'Pods CIDR',
  SERVICE_CIDR: 'Service CIDR',
  DEFAULT_STORAGE_PLUGIN: 'Default Storage Plugin',
  // src/components/Forms/Cluster/AdvanceSettings
  PRIVATE_REGISTRY_CONFIGURATION: 'Private Registry Configuration',
  ETCD_BACKUP: 'etcd Backup',
  ETCD_BACKUP_DIR: 'etcd Backup Dir',
  ETCD_BACKUP_PERIOD: 'etcd Backup Period',
  KEEP_BACKUP_NUMBER: 'Keep Backup Number',
  KUBESPHERE_SETTINGS: 'KubeSphere Settings',
  // src/clusters/components/Modals/AddNodeType
  ADD_NODE_TYPE: 'Add Node Type',
  NODE_TYPE_DESCRIPTION_DEC: 'The description will help users to select nodes types and use the cluster.',
  TYPE_NAME: 'Type Name',
  // src/pages/projects/components/Modals/RebuildS2i
  REPO_URL: 'Repository URL',
  REVISION_ID: 'Revision ID',
  // src/pages/settings/containers/ThirdPartyLogin/index.jsx
  CONFIGURE: 'Configure',
  CURRENT_THIRD_PARTY_LOGIN_CONFIGURATIONS: 'Current third-party login configurations',
  NOT_CONFIGURED: 'not configured',
  PLEASE_INPUT_CLIENT_ID: 'Please input client id',
  PLEASE_INPUT_SERVER_ADDRESS: 'Please input server address',
  PROTOCOL_TYPE: 'Protocol Type',
  SERVER_ADDRESS: 'Server Address',
  THIRD_PARTY_LOGIN: 'Third-party Login',
  THIRD_PARTY_LOGIN_DESC: 'When a third part service is used for login, users need to enter related information. After that, a local user will be created which is associated with the user for the secure login in the environment.',
  THIRD_PARTY_LOGIN_Q: 'What third parties are supported for login?',
  THIRD_PARTY_LOGIN_A: 'LDAP, AD, OAuth and Github OAuth are supported.',
  OAUTH_DESC: 'OAuth is an open standard that provides an easy and secure way for users to grant access to their resources.',
  GITHUB_OAUTH_DESC: 'GitHub OAuth grants access based on organization membership.',
  CLIENT_ID: 'Client ID',
  PLEASE_INPUT_CLIENT_ID: 'Please input client ID.',
  HOW_TO_OBTAIN_A_GITHUB_CLIENT_ID: 'How to obtain a GitHub Client ID?',
  SERVER_ADDRESS: 'Server Address',
  PLEASE_INPUT_SERVER_ADDRESS: 'Please input server address.',
  CLIENT_SECRET: 'Client Secret',
  // src/pages/projects/components/Modals/ModifyMember
  MODIFY_MEMBER_ROLE: 'Modify Member Role',
}
