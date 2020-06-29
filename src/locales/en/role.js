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
  NO_AVAILABLE_ROLE: 'No roles are available for the current project.',

  JOIN_PROJECT_PLACEHOLDER:
    'Invite members by user name or email to join the project.',
  ROLE_PROJECTS_JOIN_TIP:
    'Enter the username or email address to invite users to the project.',
  ROLE_DELETE_TIP:
    'The current role is already bound to the user, please try again after unbinding.',
  ROLE_NO_AVAILABLE_TIP: 'No roles are available for the current project.',
  ROLE_TYPE_DESC:
    'The role types are classified into cluster and project, the current role is authorized as the project scope.',
  DELETE_ROLE_TIP:
    'Are you sure about deleting the role <strong>{resource}</strong>?',
  ROLE_USERS_TIP:
    'Current role has <strong>{count}</strong> authorized users, please remove them first。',

  RULE_WORKSPACES: 'Workspaces',
  RULE_KUBECTL: 'KubeCtl',
  RULE_MONITORING: 'Monitoring Management',
  RULE_PROJECTS: 'Project Management',
  RULE_USERS: 'User Management',
  RULE_ACCOUNTS: 'Account Management',
  RULE_ROLES: 'Role Management',
  RULE_REGISTRYS: 'Image Registry',
  RULE_PERSISTENTVOLUMECLAIMS: 'Volume Management',
  RULE_STORAGECLASSES: 'Storage Class Management',
  RULE_IMAGES: 'Image Repository Management',
  RULE_NODES: 'Node Management',
  RULE_APP_CATALOG: 'Repo Management',
  RULE_REPOS: 'Repo Management',
  RULE_APPS: 'App Template',
  RULE_DEPLOYMENTS: 'Deployments',
  RULE_STATEFULSETS: 'StatefulSets',
  RULE_DAEMONSETS: 'DaemonSets',
  RULE_SERVICES: 'Service Management',
  RULE_ROUTES: 'Route Management',
  RULE_VIEW: 'View',
  RULE_CREATE: 'Create',
  RULE_EDIT: 'Edit',
  RULE_DELETE: 'Delete',
  RULE_ROLE_BINDING: 'Binding Roles',
  RULE_PODSCALE: 'Pod Scale Management',
  RULE_SCALE: 'Scale out/in',
  RULE_MEMBERS: 'Members Management',
  RULE_MEMBER_ROLES: 'Member Role',
  RULE_COMPONENTS: 'Components',
  RULE_VOLUMES: 'Volumes',
  RULE_PODS: 'Pod Management',
  RULE_TERMINAL: 'Remote Terminal',
  RULE_APPLICATIONS: 'Applications',
  RULE_JOBS: 'Jobs',
  RULE_CRONJOBS: 'CronJobs',
  RULE_SECRETS: 'Secrets',
  RULE_CONFIGMAPS: 'ConfigMaps',
  RULE_DRAIN: 'Drain',
  RULE_CORDON: 'Cordon/Uncordon',
  RULE_TAINT: 'Taints Management',
  RULE_DEVOPS: 'DevOps Project Management',
  RULE_REGISTRIES: 'Image Registry',
  RULE_ORGANIZATIONS: 'Organization',
  RULE_INTERNET: 'Internet Access Management',
  RULE_LOGGING: 'Log Management',
  RULE_ALERTING: 'Alerting Management',
  RULE_MANAGE: 'Manage',
  RULE_ADVANCED: 'Advanced Settings',
  RULE_S2IBUILDERS: 'Image Builder',

  CLUSTER_SETTINGS_DESC:
    'Manage cluster settings and authorizations to workspaces & edit cluster information',
  ROLE_CREATE_TIP_TITLE: 'Next Step',
  ROLE_CREATE_TIP_MESSAGE:
    'You need to edit authorization after which the role can be created successfully.',
  NODES_VIEW_DESC: 'View node information',
  NODES_MANAGEMENT_DESC: 'Manage, enable and disable nodes; manage taints',
  CRD_MANAGEMENT_DESC: 'Manage, view, modify and delele cluster CRDs',
  COMPONENTS_MANAGEMENT_DESC: 'Manage cluster components',
  CLUSTERS_VIEW_DESC:
    'View all clusters and cluster resources within a platform',
  CLUSTERS_MANAGEMENT_DESC:
    'Create and delete clusters; manage resources in all clusters',
  WORKSPACES_VIEW_DESC: 'View the current workspaces that users have access to',
  ROLES_VIEW_DESC: 'View the current roles in the platform',
  USERS_VIEW_DESC: 'View users in the current platform',

  WORKSPACES_MANAGEMENT_DESC:
    'Support workspace management, including adding/deleting/editing workspaces; view all workspaces in the platform',
  USERS_MANAGEMENT_DESC:
    'Support account management, including adding/deleting/updating account information',
  ROLES_MANAGEMENT_DESC:
    'Support account role management, including adding/deleting/updating account roles',
  APP_TEMPLATES_VIEW_DESC: 'View platform App Store',
  APP_TEMPLATES_MANAGEMENT_DESC:
    'Manage App Store at platform level and responsible for unified lifecycle management of cloud native applications including their release, removal and review',
  PLATFORM_SETTINGS_MANAGEMENT_DESC:
    'Manage platform settings, such as customized platform information, log collection configuration and email notification',
  ACCOUNT_ROLE_DESC:
    'Account roles define the authorization an account has in the platform.',
  ACCOUNT_ROLE_CREATE_DESC:
    'Account roles define the authorization an account has in the platform.',
  PIPELINES_MANAGEMENT_DESC:
    'Manage DevOps project pipeline, including creating, editing and deleting',
  PIPELINES_VIEW_DESC: 'View DevOps project pipeline and download artifacts',
  CREDENTIALS_MANAGEMENT_DESC:
    'Manage project credentials, including creating, editing and deleting',
  CREDENTIALS_VIEW_DESC: 'View and use credentials',
  DEVOPS_ROLES_VIEW_DESC: 'View DevOps project roles',
  DEVOPS_ROLES_MANAGEMENT_DESC:
    'Create, edit and delete DevOps project roles (system preset roles cannot be deleted)',
  DEVOPS_MEMBERS_VIEW_DESC: 'View DevOps project members',
  DEVOPS_MEMBERS_MANAGEMENT_DESC: 'Invite/edit/remove DevOps project members',
  DEVOPS_SETTINGS_DESC:
    'Manage DevOps project settings and edit DevOps project information',

  CLUSTER_MEMBERS_MANAGEMENT_DESC: 'Invite/edit/remove cluster members',
  CLUSTER_MEMBERS_VIEW_DESC: 'View cluster members',
  CLUSTER_ROLES_MANAGEMENT_DESC:
    'Create, edit and delete cluster roles (system preset roles cannot be deleted)',
  CLUSTER_ROLES_VIEW_DESC: 'View cluster roles',

  NETWORK_POLICIES_MANAGEMENT_DESC:
    'Create/edit/delete cluster network policies',
  NETWORK_POLICIES_VIEW_DESC: 'View cluster network policies',
  STORAGECLASSES_VIEW_DESC: 'View all storage classes in the cluster',
  STORAGECLASSES_MANAGEMENT_DESC:
    'Create/edit/delete storage classes and set the default storage class',
  VOLUME_SNAPSHOTS_VIEW_DESC: 'View all volume snapshots in the cluster',
  VOLUME_SNAPSHOTS_MANAGEMENT_DESC: 'Create/edit/delete volume snapshots',
  CLUSTER_MONITORING_VIEW_DESC:
    'View cluster physical resources and monitoring data of application resources',
  APPLICATION_WORKLOADS_VIEW_DESC:
    'View applications, services, workloads and tasks in the project',
  APPLICATION_WORKLOADS_MANAGEMENT_DESC:
    'Create, edit and delete applications, services, workloads and tasks in the project',
  VOLUMES_VIEW_DESC: 'View project volumes',
  VOLUMES_MANAGEMENT_DESC: 'Create/edit/delete project volumes',
  SECRETS_VIEW_DESC: 'View project secrets',
  SECRETS_MANAGEMENT_DESC: 'Create/edit/delete project secrets',

  CUSTOM_MONITORING_DESC: 'Create and manage custom monitoring data',

  ALERTING_POLICIES_VIEW_DESC: 'View alerting policies',
  ALERTING_POLICIES_MANAGEMENT_DESC: 'Create/edit/delete alerting policies',
  ALERTING_MESSAGES_VIEW_DESC: 'View alerting messages',
  ALERTING_MESSAGES_MANAGEMENT_DESC: 'Comment/delete alerting messages',

  PROJECT_ROLES_VIEW_DESC: 'View project roles',
  PROJECT_ROLES_MANAGEMENT_DESC:
    'Create, edit and delete project roles (system preset roles cannot be deleted)',
  PROJECT_MEMBERS_VIEW_DESC: 'View project members',
  PROJECT_MEMBERS_MANAGEMENT_DESC: 'Invite/edit/remove project members',
  PROJECT_SETTINGS_DESC:
    'Manage project settings and edit project information, including Internet access, network policies, resource quota, and disk log collection and configuration',
  PROJECTS_MANAGEMENT_DESC:
    'Manage all projects in the workspace, including creating/editing/deleting projects',
  PROJECTS_CREATE_DESC:
    'Have the access to create projects and the project administrator has to be the creator',
  PROJECTS_VIEW_DESC: 'View all projects in the workspace',

  DEVOPS_MANAGEMENT_DESC:
    'Manage all DevOps projects in the workspace, including creating/editing/deleting DevOps projects',
  DEVOPS_CREATE_DESC:
    'Have the access to create DevOps projects and the DevOps project administrator has to be the creator',
  DEVOPS_VIEW_DESC: 'View all DevOps projects in the workspace',

  WORKSPACE_ROLES_VIEW_DESC: 'View workspace roles',
  WORKSPACE_ROLES_MANAGEMENT_DESC:
    'Create, edit and delete workspace roles (system preset roles cannot be deleted)',
  WORKSPACE_MEMBERS_VIEW_DESC: 'View workspace members',
  WORKSPACE_MEMBERS_MANAGEMENT_DESC: 'Invite/edit/remove workspace members',
  WORKSPACE_APP_REPOS_VIEW_DESC: 'View app repository list ',
  WORKSPACE_APP_REPOS_MANAGEMENT_DESC: 'Create/edit/delete app repositories',
  WORKSPACE_APP_TEMPLATES_VIEW_DESC: 'View workspace app templates',
  WORKSPACE_APP_TEMPLATES_MANAGEMENT_DESC:
    'Upload/edit/delete workspace app templates; release/remove apps to App Store in the platform',

  ROLE_PLATFORM_ADMIN:
    'Platform administrator who can manage all resources in the platform.',
  ROLE_PLATFORM_REGULAR:
    'Normal user in the platform who has no access to any resources before joining the workspace or cluster.',
  ROLE_USER_MANAGER: 'User manager in the platform who manages all users.',
  ROLE_WORKSPACE_MANAGER:
    'Workspace manager in the platform who manages all workspaces in the platform.',

  ROLE_CLUSTER_ADMIN:
    'Allows cluster-admin access to perform any action on any resource. It gives full control over all resources in the cluster and in all namespaces.',
  ROLE_CLUSTER_VIEWER:
    'Allows cluster-viwer to view all resources in the cluster.',

  ROLE_WORKSPACE_ADMIN:
    'Allows admin access to perform any action on any resource. It gives full control over all resources in the workspace.',
  ROLE_WORKSPACE_REGULAR:
    'Normal user in the workspace who can create namespace and DevOps project.',
  ROLE_WORKSPACE_VIEWER:
    'Allows viewer access to view all resources in the workspace.',
  ROLE_WORKSPACE_SELF_PROVISIONER:
    'Normal user in the workspace who can not create namespace and DevOps project.',

  ROLE_PROJECT_ADMIN:
    'Allows admin access to perform any action on any resource, it gives full control over every resource in the namespace.',
  ROLE_PROJECT_REGULAR:
    'The maintainer of the namespace who can manage resources other than users and roles in the namespace.',
  ROLE_PROJECT_VIEWER:
    'Allows viewer access to view all resources in the namespace.',

  ROLE_DEVOPS_ADMIN:
    'Allows admin access to perform any action on any resource, it gives full control over every resource in the devops.',
  ROLE_DEVOPS_REGULAR:
    'The maintainer of the namespace who can manage resources other than users and roles in the devops.',
  ROLE_DEVOPS_VIEWER:
    'Allows viewer access to view all resources in the devops.',
}
