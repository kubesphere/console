/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Workspaces
  'Please select workspace': 'Please select a workspace',
  'workspaces found': '{count} workspaces found',
  WS_STORAGE_QUOTA_DESC: 'You can limit the total amount of storage resources under the workspace.',
  ROLE_WORKSPACES_MANAGER: 'Manage all workspaces on the KubeSphere platform.',
  ROLE_PLATFORM_REGULAR: 'Cannot access any resources before being invited to a workspace.',
  ROLE_PLATFORM_SELF_PROVISIONER:
    'Create workspaces and become the administrator of the created workspaces.',
  PERMISSION_WORKSPACES_VIEW: 'Workspace view',
  PERMISSION_WORKSPACES_MANAGEMENT: 'Workspace management',
  PERMISSION_WORKSPACES_MANAGEMENT_DESC: 'Create, edit, and delete workspaces.',
  PERMISSION_WORKSPACES_CREATE: 'Workspace creation',
  PERMISSION_WORKSPACES_CREATE_DESC:
    'Create a workspace and become the administrator of the created workspace.',
  WORKSPACE_PL: 'Workspace',
  WORKSPACE_DESC:
    'A workspace is a logical unit that organizes your projects and DevOps projects, manages resource access permissions, and shares resources within teams. It can serve as an independent workspace for team work.',
  CREATE_WORKSPACE: 'Create Workspace',
  WORKSPACE_NAME_EMPTY_DESC: 'Please enter a workspace name.',
  WORKSPACE_CREATE_DESC: 'Set the basic information for the workspace.',
  WORKSPACE_NAME_EXISTS_DESC: 'Workspace name already exists.',
  INVALID_WORKSPACE_NAME: 'Invalid workspace name.',
  SELECT_CLUSTERS_DESC: 'Select the clusters that the workspace needs to use.',
  NO_CLUSTER_AVAILABLE_DESC:
    'No available clusters found. Please contact the platform administrator or cluster administrator to authorize a cluster to this workspace after the workspace is created.',
  WORKSPACE_NO_CLUSTER_TIP:
    'Please contact the platform administrator or cluster administrator to authorize a cluster to the workspace.',
  DELETE_WORKSPACE: 'Delete Workspace',
  WORKSPACE_LOW: 'workspace',
  APP_REVIEW_EMPTY_DESC:
    'Please create an application template in the workspace and submit it for review.',
  APP_EMPTY_DESC:
    'Please create an application template in the workspace and publish it to the app store.',
  EDIT_VISIBILITY_DESC: 'Edit the visibility of the cluster in the workspace.',
  CLUSTER_VISIBILITY_DESC:
    "Cluster visibility controls the cluster's authorization to the workspace. After authorizing a cluster to a workspace, you can view and manage cluster resources in the workspace.",
  CLUSTER_VISIBILITY_Q1: 'How to authorize a cluster for use by a designated workspace?',
  CLUSTER_VISIBILITY_A1:
    'You can click on edit visibility to authorize a cluster for use by a designated workspace.',
  WORKSPACE: 'Workspace',
  HOST_CLUSTER_VISIBILITY_WARNING:
    'Please be cautious when authorizing the host cluster to a workspace, as high load on the host cluster can lead to decreased stability of the multi-cluster system.',
  CLUSTER_VISIBILITY_REMOVE_WARNING:
    "After removing the cluster's authorization to the workspace, all resources of that workspace under the current cluster will be deleted.",
  REMOVE_WORKSPACE_CONFIRM_SI:
    'Please enter the workspace name <strong>{resource}</strong> to ensure you understand the risks of this operation.',
  REMOVE_WORKSPACE_CONFIRM_PL:
    'Please enter the workspace name <strong>{resource}</strong> to ensure you understand the risks of this operation.',
  WORKSPACES: 'Workspaces',
  IPPOOL_WORKSPACE_EMPTY_TIP: 'No workspace found using this IP pool',
  IPPOOL_ASSIGN_WORKSPACE_DESC: 'Assign a workspace to the IP pool.',
  IPPOOL_ASSIGN_WORKSPACE_ALLOCATED_WARNING:
    'The IP pool has been used and cannot be allocated to another specific workspace.',
  IPPOOL_ASSIGN_WORKSPACE_CHANGE_WARNING:
    'The IP pool has been used and a specific workspace has been designated, so the workspace cannot be changed.',
  ASSIGN_WORKSPACE: 'Assign Workspace',
  SELECT_WORKSPACE_DESC: 'Select a workspace.',
  VISIBILITY_PARTIAL: 'Visible to partial workspaces',
  VISIBILITY_PUBLIC: 'Visible to all workspaces',
  PROJECT_ADMINISTRATOR_DESC: 'Select a user in the workspace as the project administrator.',
  PROJECT_ASSIGN_DESC:
    "Once a project is assigned to a workspace, it is not allowed to change the project's associated workspace.",
  AUTHORIZATION_RULES_DESC:
    'Set authorization rules so that users can only use storage classes in specific projects and workspaces.',
  KS_CONTROLLER_MANAGER_DESC:
    'Implements business logic. For example, when creating a workspace, it creates corresponding permissions; when creating a service policy, it generates corresponding Istio configurations.',
  DEVOPS_PROJECT_MEMBER_EMPTY_DESC:
    'Please invite members of the current workspace to the current DevOps project.',
  INVITE_MEMBER_DESC_DEVOPS:
    'Invite members of the current workspace to the current DevOps project.',
  HOW_TO_INVITE_MEMBER_A:
    'Business administrators or users with member invitation permissions can invite members within the current workspace to join the project.',
  ACCESS_CONTROL_DESC: 'Unified management of workspaces, users, and roles in the platform.',
  CURRENT_WORKSPACE: 'Current Workspace',
  FROM_APP_TEMPLATE_DESC:
    'Create applications from app templates in the workspace or remote app repositories.',
  APP_TEMPLATES_MODAL_DESC:
    'Select from the drop-down list to view available app templates from the current workspace or remote app repositories.',
  WORKSPACE_REMAINING_QUOTAS: 'Workspace Remaining Quotas',
  REQUEST_EXCEED_WORKSPACE:
    'Resource reservations and resource limits cannot exceed the workspace resource limit.',
  NETWORK_ISOLATION_DESC:
    'Control the traffic between pods within the same workspace and from external sources by configuring network isolation, thus isolating applications and enhancing application security.',
  INTERNAL_ALLOWLIST_TIP: 'Add services and projects within the workspace to the allowlist.',
  INTERNAL_ALLOWLIST_DESC:
    'Allow pods within the current project to communicate with services in other projects within the same workspace.',
  EXTERNAL_ALLOWLIST_TIP: 'Add external CIDRs and ports to the allowlist.',
  EXTERNAL_ALLOWLIST_DESC:
    'Allow pods within the current project to communicate with specific external CIDRs and ports.',
  EXTERNAL_TRAFFIC_DIRECTION_DESC:
    'Outbound indicates traffic from the current project to outside the workspace. Inbound indicates traffic from outside the workspace to the current project.',
  PROJECT_MEMBER_DESC:
    'Project members can view or manage project resources. Project administrators can invite workspace members to the project and manage project members.',
  INVITE_MEMBER_DESC: 'Invite members of the current workspace to the current project.',
  PROJECT_MEMBER_EMPTY_DESC:
    'Please invite members of the current workspace to the current project.',
  AUDIT_LOG_WORKSPACE_TIP: 'Enter the workspace name to search for audit logs.',
  METERING_AND_BILLING_DESC: 'View resource consumption for clusters and workspaces.',
  WORKSPACE_CONSUMPTION: 'Workspace Resource Consumption',
  WORKSPACE_CONSUMPTION_DESC: 'View resource consumption for the workspace.',
  WORKSPACE_RESOURCE_CONSUMPTION_DESC:
    'CPU, memory, volume, and other resource consumption in the <strong>workspace</strong>',
  WORKSPACE_PROJECT_CONSUMPTION_DESC:
    'CPU, memory, volume, and other resource consumption in <strong>projects</strong> within the workspace',
  RESOURCE_EVENT_WORKSPACE_TIP: 'Enter the workspace name to search for resource events.',
  SEARCH_BY_WORKSPACE: 'Search by Workspace',
  AUDIT_LOG_WORKSPACE_TIP: 'Enter the workspace name to search for audit logs.',
  METERING_AND_BILLING_DESC: 'View resource consumption for clusters and workspaces.',
  WORKSPACE_SCAP: 'Workspace',
  ADD_CLUSTER_FOR_WORKSPACE: 'Authorize a cluster to the workspace.',
  WORKSPACE_CONSUMPTION: 'Workspace Resource Consumption',
  WORKSPACE_CONSUMPTION_DESC: 'View resource consumption for the workspace.',
  WORKSPACE_RESOURCE_CONSUMPTION_DESC:
    'CPU, memory, volume, and other resource consumption in the <strong>workspace</strong>',
  WORKSPACE_PROJECT_CONSUMPTION_DESC:
    'CPU, memory, volume, and other resource consumption in <strong>projects</strong> within the workspace',
  RESOURCE_EVENT_WORKSPACE_TIP: 'Enter the workspace name to search for resource events.',
  SEARCH_BY_WORKSPACE: 'Search by Workspace',
  WORKBENCH_WORKSPACE: 'Workspace',
  HOW_TO_USE_APP_REPO_A:
    'You need to go to the project under that workspace. When deploying a new application, choose <b>From App Template</b> and select your app repository from the drop-down list to deploy applications from the app repository.',
  HOW_PUBLISH_APP_DESC:
    'You can upload the Helm chart as an app template for the workspace, and once approved, the app will be published in the app store.',
  HOW_TO_APPLY_MORE_CLUSTER_Q: 'How to apply for more clusters for the workspace?',
  WORKSPACE_OVERVIEW_DESC:
    'The workspace provides a secure, access-controlled, and isolated platform on KubeSphere. Here you can see an overview of the resources running in the current workspace.',
  WORKSPACE_SETTINGS: 'Workspace Settings',
  WORKSPACE_BASIC_INFO_DESC:
    'Basic information provides an overview of the workspace, where you can view basic information about the workspace.',
  WORKSPACE_BASE_INFO_Q1: 'How to apply for more clusters for the workspace?',
  WORKSPACE_INFO: 'Workspace Information',
  WORKSPACE_MEMBER_TCAP: 'Workspace Member',
  WORKSPACE_MEMBER_TCAP_PL: 'Workspace Members',
  WS_MEMBER_SCAP: 'Workspace Member',
  WS_MEMBER_SCAP_PL: 'Workspace Members',
  WS_NETWORK_ISOLATION: 'Workspace Network Isolation',
  DELETE_WORKSPACE_PROJECTS_DESC: 'Delete projects in the workspace',
  DELETE_WORKSPACE_DESC:
    'deleted, it cannot be recovered, and all resources under the workspace will also be destroyed.',
  DELETE_WORKSPACE_TIP:
    'Are you sure you want to delete workspace <strong>{resource}</strong>? After deletion, it cannot be recovered, and all resources under the workspace will also be destroyed.',
  DEPARTMENT_DESC:
    'Departments in a workspace are logical units for managing permissions. You can set workspace roles, multiple project roles, and multiple DevOps project roles within a department, and assign users to departments to manage user permissions in bulk.',
  WORKSPACE_ROLE: 'Workspace Role',
  GROUP_WORKSPACE_ROLE_DESC:
    'Workspace roles will grant permissions to all users in the department.',
  WORKSPACE_MEMBERS: 'Workspace Members',
  WORKSPACE_MEMBER_PL: 'Workspace Members',
  WORKSPACE_MEMBER_DESC:
    'Workspace members can view or manage workspace resources. You can manage members in the workspace and control their permissions.',
  WORKSPACE_MEMBER_EMPTY_DESC: 'Please invite a user to the current workspace.',
  INVITE_WORKSPACE_MEMBER_DESC: 'Invite a user to the current workspace.',
  WORKSPACE_QUOTA_PL: 'Workspace Quota',
  WORKSPACE_QUOTAS_DESC:
    'Workspace quotas are used to manage the total resource usage of all projects and DevOps projects in the workspace.',
  EDIT_WORKSPACE_QUOTAS: 'Edit Workspace Quotas',
  WORKSPACE_ROLE_PL: 'Workspace Role',
  WORKSPACE_ROLE_DESC:
    'Workspace roles define the permissions that a user has under the current workspace.',
  WORKSPACE_ROLE_EMPTY_DESC: 'Please create a workspace role.',
  ROLE_WORKSPACE_ADMIN: 'Manage all resources in the workspace.',
  ROLE_WORKSPACE_REGULAR: 'View workspace settings.',
  ROLE_WORKSPACE_VIEWER: 'View all resources in the workspace.',
  CREATE_WORKSPACE_ROLE: 'Create Workspace Role',
  PERMISSION_PROJECTS_VIEW_DESC: 'View all projects in the workspace.',
  PERMISSION_PROJECTS_MANAGEMENT_DESC: 'Create, edit, and delete projects in the workspace.',
  PERMISSION_DEVOPS_VIEW_DESC: 'View all DevOps projects in the workspace.',
  PERMISSION_DEVOPS_MANAGEMENT_DESC: 'Create, edit, and delete DevOps projects in the workspace.',
  PERMISSION_WORKSPACE_APP_REPOS_VIEW_DESC: 'View app repositories in the workspace.',
  PERMISSION_WORKSPACE_APP_REPOS_MANAGEMENT_DESC:
    'Create, edit, and delete app repositories in the workspace.',
  PERMISSION_WORKSPACE_APP_TEMPLATES_VIEW_DESC: 'View app templates in the workspace.',
  PERMISSION_WORKSPACE_GROUPS_VIEW_DESC: 'View the structure and members of workspace departments.',
  PERMISSION_WORKSPACE_GROUPS_MANAGEMENT_DESC:
    'Manage the structure, members, and permissions of workspace departments.',
  PERMISSION_WORKSPACE_MEMBERS_VIEW_DESC: 'View workspace members.',
  PERMISSION_WORKSPACE_MEMBERS_MANAGEMENT_DESC: 'Invite, edit, and remove workspace members.',
  PERMISSION_WORKSPACE_ROLES_VIEW_DESC: 'View workspace roles.',
  PERMISSION_WORKSPACE_ROLES_MANAGEMENT_DESC:
    'Create, edit, and delete workspace roles outside of system predefined roles.',
  PERMIGROUP_WORKSPACE_SETTINGS: 'Workspace Settings',
  PERMISSION_WORKSPACE_SETTINGS_VIEW: 'View Workspace Settings',
  PERMISSION_WORKSPACE_SETTINGS_VIEW_DESC: 'View the settings of the workspace.',
  PERMISSION_WORKSPACE_SETTINGS_MANAGEMENT: 'Manage Workspace Settings',
  PERMISSION_WORKSPACE_SETTINGS_MANAGEMENT_DESC:
    'Manage the basic information, network policy, and other settings of the workspace.',
  'Clean Workspace': 'Clean Workspace',

  // Projects
  DEVOPS_PROJECT_SETTINGS: 'DevOps Project Management',
  DEVOPS_PROJECT_ROLE_SCAP: 'DevOps Project Role',
  DEVOPS_PROJECT_SCAP: 'DevOps Project',
  DEVOPS_PROJECT_ROLE_PL_SCAP: 'DevOps Project Roles',
  CREDENTIAL_EMPTY_DESC: 'Please create a credential in the DevOps project.',
  DEVOPS_PROJECT_MEMBER_PL: 'DevOps Project Members',
  DEVOPS_PROJECT_MEM_DESC: 'Manage members and assign roles within the project.',
  INVITE_MEMBER_DESC_DEVOPS: 'You can invite current workspace members to this DevOps project.',
  DEVOPS_PROJECT_ROLE_PL: 'DevOps Project Roles',
  DEVOPS_PROJECT_ROLES_DESC:
    'Member roles define the permissions a user has in the current DevOps project.',
  ROLE_DEVOPS_VIEWER: 'DevOps project observer, can view all resources under the DevOps project.',
  ROLE_DEVOPS_OPERATOR:
    'DevOps project ordinary member, can create pipelines, credentials, etc., in the DevOps project.',
  DEVOPS_PROJECT: 'DevOps Project',
  WORKBENCH_DEVOPS: 'DevOps Project',
  CREATE_DEVOPS_PROJECT: 'Create DevOps Project',
  DEVOPS_ADMIN_DESC: 'Designate a member within the project as an administrator.',
  DELETE_DEVOPS_PROJECT: 'Delete DevOps Project',
  DEVOPS_PROJECT_TCAP: 'DevOps Project',
  DEVOPS_PROJECT_LOW: 'DevOps project',
  DEVOPS_PROJECT_ROLE: 'DevOps Project Role',
  ADD_DEVOPS_PROJECT: 'Add DevOps Project',
  ROLE_WORKSPACE_REGULAR: 'Workspace regular member, cannot create DevOps projects and items.',
  ROLE_WORKSPACE_SELF_PROVISIONER:
    'Workspace regular member, can create DevOps projects and items under the workspace.',
  pipeline_owner: 'Owner of the DevOps project, can perform all operations on the DevOps project',
  pipeline_maintainer:
    'Main maintainer of the DevOps project, can perform project internal credential configuration, pipeline configuration and other operations',
  pipeline_developer: 'Developer of the DevOps project, can trigger pipelines and view',
  pipeline_reporter: 'Observer of the DevOps project, can view the running status of pipelines',
  DEVOPS_PROJECT_DESC:
    "DevOps project is used to group resources for management and control different users' resource management permissions.",

  // Project
  'Please select project': 'Please select a project',
  NAV_PROJECTS: 'Projects',
  SET_AS_DEFAULT_REGISTRY_DESC:
    'Set the image service as the default image service. If not specifically specified, the system will use the images from the default image service to create containers. Each project is allowed only one default image service.',
  PROJECT_CPU_USAGE: 'Project CPU usage',
  NS_STORAGE_QUOTA_DESC: 'You can limit the total amount of storage resources under the project.',
  KS_DESCRIPTION:
    'KubeSphere is an open-source platform built on top of the mainstream container orchestration platform Kubernetes, providing an easy-to-use operating interface and wizard-style operations. It greatly lowers the learning curve of the container orchestration platform for users and reduces the complexity of daily work for developers, testing personnel, and operation and maintenance personnel.',
  REPS_ADDRESS: 'Project address',
  WORKSPACE_DESC:
    'A workspace is a logical unit that organizes your projects and DevOps projects, manages resource access permissions, and shares resources within teams. It can serve as an independent workspace for team work.',
  FEDPROJECT_CANNOT_DEPLOY_APP_TIP: 'Cannot install applications in multi-cluster projects.',
  ALL_PROJECTS: 'All Projects',
  SELECT_PROJECT_DESC: 'Select the project where you want to create resources.',
  PROJECT_NOT_SELECT_DESC: 'Please select a project.',
  FEDPROJECT_RESOURCE_TIP:
    'Resources for multi-cluster projects cannot be created in cluster management. Please operate on the multi-cluster project page.',
  PROJECT: 'Project',
  PREREQUESTS_FOR_USE_ROUTE_A:
    'To use the application route, you need to contact the project administrator to enable the project gateway.',
  NO_GATEWAY_DESC:
    'To use the auto-generate mode, please contact the project administrator to set the gateway access mode in the advanced settings of this project.',
  PERMIGROUP_PROJECT_RESOURCES_MANAGEMENT: 'Project Resources',
  PERMISSION_PROJECT_RESOURCES_VIEW: 'View Project Resources',
  PERMISSION_PROJECT_RESOURCES_MANAGEMENT: 'Manage Project Resources',
  PROJECT_GATEWAY_PL: 'Project Gateway',
  PROJECT_GATEWAY_NOT_ENABLED: 'Project gateway not enabled',
  PROJECT_ENABLE_GATEWAY_DESC: 'Please enable the project gateway.',
  PROJECT_GATEWAY_LOW: 'Project Gateway',
  PROJECT_DEVOPS_PROJECT: 'Project/DevOps Project',
  ALERTING_MESSAGE_EMPTY_DESC: 'No alerts found in the current project.',
  DEVOPS_PROJECT_PL: 'DevOps Project',
  PROJECT_PL: 'Project',
  PROJECT_COUNT: 'Project Count',
  ENABLE_GATEWAY_TIP: 'To use the gateway, configure the gateway in the cluster or project',
  PROJECT_DESC:
    "A project is used to group resources for management and control different users' resource management permissions.",
  SYSTEM_PROJECTS: 'System Projects',
  USER_PROJECTS: 'User Projects',
  PROJECT_ADMINISTRATOR: 'Project Administrator',
  PROJECT_ADMINISTRATOR_DESC: 'Select a user in the workspace as the project administrator.',
  PROJECT_ASSIGN_DESC:
    "Once a project is assigned to a workspace, it is not allowed to change the project's associated workspace.",
  CREATE_PROJECT_DESC:
    "Create a project to group resources and control different users' permissions.",
  PROJECT_NAME_EXIST_DESC:
    'The name already exists, please enter another name. The project name must be unique across the entire platform.',
  PROJECT_LOW: 'project',
  AUTHORIZATION_RULES_DESC:
    'Set authorization rules so that users can only use storage classes in specific projects and workspaces.',
  GLUSTERFS_SECRET_NAMESPACE_DESC: 'The namespace of the Heketi user secret.',
  SECRET_NAMESPACE: 'Secret Namespace',
  CEPHRBD_ADMIN_SECRET_NAMESPACE_DESC: 'The namespace of the adminSecrect.',
  CEPHRBD_USER_SECRET_NAMESPACE_DESC: 'The namespace of the userSecret.',
  STORAGE_NAMESPACE: 'Storage Namespace',
  AUTO_CREATE_PROJECT_DESC:
    'Automatically create a project for application resources if the project does not exist.',
  AUTO_CREATE_PROJECT: 'Automatically Create Project',
  DEVOPS_PROJECT_SETTINGS: 'DevOps Project Settings',
  DEVOPS_DESCRIPTION:
    'A DevOps project is an independent namespace where a set of pipelines are defined. Users can group pipelines in any way they prefer, such as by application type or organizational type.',
  DEVOPS_PROJECT_ROLE_SCAP: 'DevOps Project Role',
  DEVOPS_PROJECT_SCAP: 'DevOps Project',
  DEVOPS_PROJECT_MEMBER_SCAP: 'DevOps Project Member',
  DEVOPS_PROJECT_MEMBER_PL_SCAP: 'DevOps Project Members',
  DEVOPS_PROJECT_ROLE_PL_SCAP: 'DevOps Project Roles',
  MULTI_CLUSTER_PROJECT_NOT_FOR_CD:
    'Multi-cluster projects cannot be used for continuous deployment.',
  DEVOPS_PROJECT_MEMBER: 'DevOps Project Member',
  DEVOPS_PROJECT_MEMBER_PL: 'DevOps Project Members',
  DEVOPS_PROJECT_MEM_DESC: 'Manage members and assign roles within the project.',
  DEVOPS_PROJECT_MEMBER_EMPTY_DESC:
    'Please invite members of the current workspace to the current DevOps project.',
  INVITE_MEMBER_DESC_DEVOPS:
    'Invite members of the current workspace to the current DevOps project.',
  HOW_TO_INVITE_MEMBER_Q: 'How to invite members to the project?',
  HOW_TO_INVITE_MEMBER_A:
    'Project administrators or users with member invitation permissions can invite members within the current workspace to join the project.',
  DEVOPS_PROJECT_ROLE_PL: 'DevOps Project Roles',
  DEVOPS_PROJECT_ROLES_DESC:
    'Member roles define the permissions a user has in the current DevOps project.',
  DEVOPS_PROJECT_ROLE_EMPTY_DESC: 'Please create a DevOps project role.',
  ROLE_DEVOPS_VIEWER: 'View all resources in the DevOps project.',
  ROLE_DEVOPS_OPERATOR:
    'Manage DevOps credentials and pipelines, and view members and roles in the DevOps project.',
  ROLE_DEVOPS_ADMIN: 'Manage all resources in the DevOps project.',
  PERMISSION_PIPELINES_VIEW_DESC: 'View pipelines in the DevOps project and download artifacts.',
  PERMISSION_PIPELINES_MANAGEMENT_DESC: 'Create, edit, and delete pipelines in the DevOps project.',
  PERMISSION_PIPELINERUNS_VIEW_DESC: 'View pipeline execution records in the DevOps project.',
  PERMISSION_PIPELINERUNS_MANAGEMENT_DESC:
    'View, edit, and delete pipeline execution records in the DevOps project.',
  PERMIGROUP_DEVOPS_SETTINGS: 'DevOps Settings',
  PERMISSION_DEVOPS_SETTINGS: 'DevOps Settings Management',
  PERMISSION_DEVOPS_SETTINGS_DESC: 'Manage the settings of the DevOps project.',
  PERMISSION_CONTINUOUS_DEPLOYMENTS_VIEW_DESC: 'View continuous deployments in the DevOps project.',
  PERMISSION_CONTINUOUS_DEPLOYMENTS_MANAGEMENT_DESC:
    'Manage continuous deployments in the DevOps project.',
  PERMISSION_CODE_REPOSITORIES_VIEW_DESC: 'View code repositories in the DevOps project.',
  PERMISSION_CODE_REPOSITORIES_MANAGEMENT_DESC: 'Manage code repositories in the DevOps project.',
  DEVOPS_PROJECT: 'DevOps Project',
  PIPELINE_NAME_DESC: 'The name of the pipeline, cannot be duplicated within the same project.',
  PIPELINE_CREATE_DEVOPS_PROJECT_DESC: 'Select the DevOps project to which the pipeline belongs.',
  PROJECT_GROUP_OWNER: 'Project Group/Owner',
  PROJECT_GROUP_OWNER_EMPTY_TIP:
    'Please enter the name of the GitLab project group or project owner.',
  INVALID_PROJECT: 'Invalid project.',
  ALLOW_PRIVILEGE_ESCALATION_DESC:
    'Allows the container process to gain more privileges than its parent process. This option is enabled by default when privileged mode is enabled.',
  MULTI_CLUSTER_PROJECT_EMPTY_DESC: 'Please create a multi-cluster project.',
  MULTI_CLUSTER_PROJECT_LOW: 'Multi-cluster Project',
  MULTI_CLUSTER_PROJECT_SCAP: 'Multi-cluster Project',
  PROJECT_NAME: 'Project Name',
  DELETE_PROJECT: 'Delete Project',
  PROJECT_COLLECT_SAVED_DISABLED_DESC:
    'To enable this feature, you need to enable log collection on volumes in the project settings.',
  SERVICE_ACCOUNT_PROJECT_ROLE_DESC:
    'Select the role of the service account in the current project.',
  PROJECT_ROLE_SI: 'Project Role',
  SELECT_PROJECT_ROLE_DESC: 'Select a project role to specify permissions.',
  PROJECT_QUOTAS_NOT_SET: 'Project quotas not set',
  PROJECT_QUOTAS_DESC:
    'Project quotas are used to specify the number of CPU and memory resources available in the project, and the maximum number of application resources such as Pods, Deployments, Services, etc.',
  DEFAULT_CONTAINER_QUOTAS_DESC:
    'Default container quotas are used to specify the default CPU reservation, CPU limit, memory reservation, and memory limit for containers created in the project.',
  PROJECT_SETTINGS: 'Project Settings',
  HOW_TO_USE_QUOTA_A:
    'Resource quotas are mechanisms for limiting resource usage. You can edit project resource quotas and default container quotas by clicking <b>Edit Project</b>.',
  WHAT_ARE_DEFAULT_CONTAINER_QUOTAS_A:
    'Default container quotas specify the default CPU reservations, CPU limits, memory reservations, and memory limits for containers created within the project.',
  PROJECT_BASIC_INFO_DESC:
    'Basic information provides an overview of the project, where you can view the project’s information and default container quotas.',
  EDIT_PROJECT_QUOTA: 'Edit Project Quota',
  PROJECT_REMAINING_QUOTAS: 'Project Remaining Quotas',
  DELETE_PROJECT_TIP:
    'Please enter the project name <strong>{resource}</strong> to confirm you understand the risks of this operation.',
  PROJECT_INFO: 'Project Information',
  EDIT_PROJECT_QUOTAS: 'Edit Project Quotas',
  PROJECT_ROLE_SCAP: 'Project Role',
  PROJECT_ROLE_SCAP_PL: 'Project Roles',
  PROJECT_MEMBER_SCAP: 'Project Member',
  PROJECT_MEMBER_SCAP_PL: 'Project Members',
  PROJECT_QUOTA_PL: 'Project Quota',
  PROJECT_GATEWAY_DESC:
    'Set and manage external access gateways and service governance configurations for the project.',
  PROJECT_GATEWAY: 'Project Gateway',
  PROJECT_GATEWAY_EMPTY_DESC: 'Please create a project gateway.',
  CLUSTER_GATEWAY_GUIDE_DESC:
    'If both cluster gateway and project gateway exist, the project gateway cannot be re-enabled once disabled. It is recommended to use only the cluster gateway or only the project gateway.',
  PROJECT_NETWORK_ISOLATION: 'Project Network Isolation',
  NETWORK_POLICY_EMP_DESC:
    'Enabling project network isolation will prohibit other projects from accessing the current project, but you can allow access to specific projects, services, and external IP addresses as needed.',
  INTERNAL_ALLOWLIST_TIP: 'Add services and projects within the workspace to the allowlist.',
  INTERNAL_EGRESS_DESC:
    'Pods within the current project can access the following services and projects.',
  INTERNAL_INGRESS_DESC:
    'Pods within the current project can be accessed by the following services and projects.',
  INTERNAL_ALLOWLIST_DESC:
    'Allow pods within the current project to communicate with services in other projects within the same workspace.',
  EMPTY_RESOURCE_DESC: 'Please select at least one project or service.',
  EXTERNAL_ALLOWLIST_DESC:
    'Allow pods within the current project to communicate with specific external CIDRs and ports.',
  EXTERNAL_EGRESS_DESC: 'Pods within the current project can access the following CIDRs and ports.',
  EXTERNAL_INGRESS_DESC:
    'Pods within the current project can be accessed by the following CIDRs and ports.',
  EXTERNAL_TRAFFIC_DIRECTION_DESC:
    'Outbound indicates traffic from the current project to outside the workspace. Inbound indicates traffic from outside the workspace to the current project.',
  INTERNAL_TRAFFIC_DIRECTION_DESC:
    'Outbound indicates traffic from the current project to other projects. Inbound indicates traffic from other projects to the current project.',
  PROJECT_MEMBER: 'Project Member',
  PROJECT_MEMBER_PL: 'Project Members',
  PROJECT_MEMBER_DESC:
    'Project members can view or manage project resources. Project administrators can invite workspace members to the project and manage project members.',
  INVITE_MEMBER_DESC: 'Invite members of the current workspace to the current project.',
  PROJECT_MEMBER_EMPTY_DESC:
    'Please invite members of the current workspace to the current project.',
  INVITE_MEMBER_SEARCH_PLACEHOLDER: 'Enter a username to invite project members',
  PROJECT_ROLE_PL: 'Project Role',
  PROJECT_ROLE_DESC: 'Project roles define the permissions a user has under the current project.',
  ROLE_PROJECT_ADMIN: 'Manage all resources in the project.',
  ROLE_PROJECT_REGULAR: 'Manage resources in the project, excluding users and roles.',
  ROLE_PROJECT_VIEWER: 'View all resources in the project.',
  ROLE_PROJECT_OPERATOR: 'Manage resources in the project, excluding users and roles.',
  PROJECT_ROLE_EMPTY_DESC: 'Please create a project role.',
  PERMISSION_APPLICATION_WORKLOADS_VIEW_DESC:
    'View applications, services, workloads, tasks, grayscale release tasks, and image builders in the project.',
  PERMISSION_APPLICATION_WORKLOADS_MANAGEMENT_DESC:
    'Create, edit, and delete applications, services, workloads, tasks, grayscale release tasks, and image builders in the project.',
  PERMISSION_VOLUME_SNAPSHOTS_VIEW_DESC: 'View volume snapshots in the project.',
  PERMISSION_VOLUME_SNAPSHOTS_MANAGEMENT_DESC:
    'Create, edit, and delete volume snapshots in the project.',
  PERMISSION_VOLUMES_VIEW_DESC: 'View persistent volume claims in the project.',
  PERMISSION_VOLUMES_MANAGEMENT_DESC:
    'Create, edit, and delete persistent volume claims in the project.',
  PERMISSION_CONFIGMAPS_VIEW_DESC: 'View config maps in the project.',
  PERMISSION_CONFIGMAPS_MANAGEMENT_DESC: 'Create, edit, and delete config maps in the project.',
  PERMISSION_SECRETS_VIEW_DESC: 'View secrets in the project.',
  PERMISSION_SECRETS_MANAGEMENT_DESC: 'Create, edit, and delete secrets in the project.',
  PERMISSION_SERVICEACCOUNT_VIEW_DESC: 'View service accounts in the project.',
  PERMISSION_SERVICEACCOUNT_MANAGEMENT_DESC:
    'Create, edit, and delete service accounts in the project.',
  PERMISSION_ALERTING_MESSAGES_VIEW_DESC: 'View alerts in the project.',
  PERMISSION_ALERTING_MESSAGES_MANAGEMENT_DESC: 'Comment on and delete alerts in the project.',
  PERMISSION_ALERTING_POLICIES_VIEW_DESC: 'View alerting policies in the project.',
  PERMISSION_ALERTING_POLICIES_MANAGEMENT_DESC:
    'Create, edit, and delete alerting policies in the project.',
  PERMISSION_CUSTOM_MONITORING_VIEW_DESC: 'View custom monitoring dashboards in the project.',
  PERMISSION_CUSTOM_MONITORING_MANAGEMENT_DESC:
    'Create, edit, and delete custom monitoring dashboards in the project.',
  PERMISSION_PROJECT_MEMBERS_VIEW_DESC: 'View project members.',
  PERMISSION_PROJECT_MEMBERS_MANAGEMENT_DESC: 'Invite, edit, and remove project members.',
  PERMISSION_PROJECT_ROLES_VIEW_DESC: 'View project roles.',
  PERMISSION_PROJECT_ROLES_MANAGEMENT_DESC:
    'Create, edit, and delete project roles, except for system predefined roles.',
  PERMIGROUP_PROJECT_SETTINGS: 'Project Settings',
  PERMISSION_PROJECT_SETTINGS: 'Project Settings Management',
  PERMISSION_PROJECT_SETTINGS_DESC:
    'Manage project settings, including basic information, external access settings, network policies, resource quotas, log collection settings, etc.',
  AUDIT_LOG_PROJECT_TIP: 'Enter the project name to find audit logs.',
  SEARCH_BY_PROJECT: 'Search by Project',
  CONTAINER_LOG_PROJECT_TIP: 'Enter the project name to find container logs.',
  PROJECT_SCAP: 'Project',
  WORKSPACE_PROJECT_CONSUMPTION_DESC:
    'CPU, memory, volume, and other resource consumption in <strong>projects</strong> within the workspace',
  PROJECT_CONSUMPTION_DESC:
    'CPU, memory, volume, and other resource consumption in <strong>applications</strong>, <strong>services</strong>, <strong>pods</strong> within the project',
  RESOURCE_EVENT_PROJECT_TIP: 'Enter the project name to find resource events.',
  AUDIT_LOG_PROJECT_TIP: 'Enter the project name to find audit logs.',
  SEARCH_BY_PROJECT: 'Search by Project',
  CONTAINER_LOG_PROJECT_TIP: 'Enter the project name to find container logs.',
  PROJECT_SCAP: 'Project',
  RESOURCE_EVENT_PROJECT_TIP: 'Enter the project name to find resource events.',
  MULTI_CLUSTER_DEPLOYMENT: 'Multi-cluster Project',
  WORKBENCH_PROJECT: 'Project',
  WORKBENCH_DEVOPS: 'DevOps Project',
  WORKBENCH_MULTI_CLUSTER_PROJECT: 'Multi-cluster Project',
  MULTI_CLUSTER_PROJECT_TIP: 'This project spans multiple clusters.',
  HOW_TO_USE_APP_REPO_A:
    'You need to go to the project under that workspace. When deploying a new application, select <b>From App Template</b> and choose your app repository from the drop-down list to deploy applications from the app repository.',
  DEVOPS_PROJECT_EMPTY_DESC: 'Please create a DevOps project.',
  CREATE_DEVOPS_PROJECT: 'Create DevOps Project',
  DEVOPS_BASEINFO_DESC: 'Please set the basic information for the DevOps project',
  DEVOPS_ADMIN_DESC: 'Select a project member as the project administrator.',
  DELETE_MULTIPLE_DEVOPS_PROJECTS: 'Delete multiple DevOps projects',
  DELETE_DEVOPS_PROJECT: 'Delete DevOps Project',
  DELETE_DEVOPS_PROJECT_TIP:
    'Please enter the DevOps project name {resource} to confirm you understand the risks of this operation.',
  DELETE_DEVOPS_PROJECT_TIP_PL:
    'Please enter the DevOps project name <strong>{resource}</strong> to confirm you understand the risks of this operation.',
  PROJECT_EMPTY_DESC: 'Please create a project.',
  CREATE_PROJECT: 'Create Project',
  CREATE_MULTI_CLUSTER_PROJECT: 'Create Multi-cluster Project',
  CREATE_MULTI_CLUSTER_PROJECT_DESC:
    'You can create a multi-cluster project, allowing the project to run across multiple clusters, providing a fast iteration development container environment for applications and achieving high availability.',
  MULTI_CLUSTER_PROJECT_PL: 'Multi-cluster Project',
  FED_HOST_NAMESPACE_TIP:
    'This project is associated with a multi-cluster project, please do not modify the resources in this project.',
  MULTI_CLUSTER_PROJECT: 'Multi-cluster Project',
  PROJECT_NAME_EXISTS_IN_HOST:
    'Project name already exists in the host cluster, please enter a different project name.',
  SELECT_CLUSTER_DESC: 'Select the clusters where you want to create the project.',
  PROJECT_NAME_EXISTS_IN_CLUSTER:
    'Project name already exists in {cluster}, please enter a different project name.',
  PROJECT_CLUSTER_SETTINGS_DESC:
    'Select at least one cluster for the project. If multiple clusters are selected, a project with the same name will be created on the host cluster.',
  DEVOPS_PROJECT_TCAP: 'DevOps Project',
  DEVOPS_PROJECT_TCAP_PL: 'DevOps Projects',
  DEVOPS_PROJECT_LOW: 'DevOps project',
  DEVOPS_PROJECT_LOW_PL: 'DevOps projects',
  PROJECTS: 'Projects',
  DEPARTMENT_DESC:
    'Departments within a workspace are logical units for managing permissions. You can set workspace roles, multiple project roles, and DevOps project roles within a department, and assign users to the department to manage user permissions in bulk.',
  PROJECT_VALUE: 'Project: {value}',
  PROJECT_ROLE_VALUE: 'Project Role: {value}',
  DEVOPS_VALUE: 'DevOps Project: {value}',
  DEVOPS_PROJECT_ROLES_VALUE: 'DevOps Project Roles: {value}',
  PROJECT_ROLE: 'Project Role',
  SELECT_ROLE_TIP: 'Please select a role.',
  ADD_PROJECT: 'Add Project',
  DEVOPS_PROJECT_ROLE: 'DevOps Project Role',
  ADD_DEVOPS_PROJECT: 'Add DevOps Project',
  DEVOPS_PROJECTS: 'DevOps Projects',
  WORKSPACE_QUOTAS_DESC:
    'Workspace quotas are used to manage the total resource usage of all projects and DevOps projects within the workspace.',
  ROLE_WORKSPACE_SELF_PROVISIONER:
    'View enterprise settings, manage application templates, create projects, and DevOps projects.',
  PERMIGROUP_PROJECTS_MANAGEMENT: 'Projects',
  PERMISSION_PROJECTS_VIEW: 'Project View',
  PERMISSION_PROJECTS_VIEW_DESC: 'View all projects within the workspace.',
  PERMISSION_PROJECTS_MANAGEMENT: 'Project Management',
  PERMISSION_PROJECTS_MANAGEMENT_DESC: 'Create, edit, and delete projects within the workspace.',
  PERMISSION_PROJECTS_CREATE: 'Project Creation',
  PERMISSION_PROJECTS_CREATE_DESC:
    'Create a project and become the administrator of the created project.',
  PERMIGROUP_DEVOPS_MANAGEMENT: 'DevOps Projects',
  PERMISSION_DEVOPS_VIEW: 'DevOps Project View',
  PERMISSION_DEVOPS_VIEW_DESC: 'View all DevOps projects within the workspace.',
  PERMISSION_DEVOPS_MANAGEMENT: 'DevOps Project Management',
  PERMISSION_DEVOPS_MANAGEMENT_DESC:
    'Create, edit, and delete DevOps projects within the workspace.',
  PERMISSION_DEVOPS_CREATE: 'DevOps Project Creation',
  PERMISSION_DEVOPS_CREATE_DESC:
    'Create a DevOps project and become the administrator of the created DevOps project.',
  CREDENTIALS_CREATE_DESC: 'Create credentials for use within DevOps projects',
  pipeline_owner:
    'Owner of the DevOps project, capable of all operations within the DevOps project',
  pipeline_maintainer:
    'Main maintainer of the DevOps project, capable of internal credential configuration, pipeline configuration, and other operations',
  pipeline_developer:
    'Developer of the DevOps project, capable of triggering pipelines and viewing them',
  pipeline_reporter:
    'Observer of the DevOps project, capable of viewing the running status of pipelines',
  DEVOPS_PROJECT_DESC:
    "DevOps projects are used to group resources for management and to control different users' resource management permissions.",
};
