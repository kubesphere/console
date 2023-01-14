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
  WORKLOAD_DESC: 'Workloads are used to handle service requests and can contain one or more pods. System functions such as logging and monitoring are also implemented by workloads.',
  // List
  DEPLOYMENT_EMPTY_DESC: 'Please create a deployment.',
  UPDATING: 'Updating',
  // List > Edit Information
  // List > Edit YAML
  // List > Delete
  // List > Create
  // List > Create > Basic Information
  NEXT: 'Next',
  INVALID_PROJECT: 'Invalid project.',
  // List > Create > Pod Settings > Replica Scheduling Mode
  REPLICA_SCHEDULING_MODE: 'Replica Scheduling Mode',
  SPECIFY_REPLICAS: 'Specify Replicas',
  WEIGHTS: 'Weights',
  SPECIFY_WEIGHTS: 'Specify Weights',
  SPECIFY_WEIGHTS_DESC: 'Set the total number of pod replicas and a weight for each cluster. The pod replicas will be scheduled to the clusters according to the weights.',
  SPECIFY_REPLICAS_DESC: 'Manually set the number of pod replicas in each cluster.',
  REPLICA_LOW_SI: 'replica',
  REPLICA_LOW_PL: 'replicas',
  WEIGHT: 'weight',
  TOTAL_REPLICAS: 'Total Replicas',
  // List > Create > Pod Settings > Add Container > Container Settings
  COST: 'Cost',
  ADD_CONTAINER: 'Add Container',
  ADD_CONTAINER_DESC: 'Customize container settings to create a container.',
  CONTAINERS: 'Containers',
  IMAGE_TIME_SIZE_LAYER: 'Updated {time}',
  IMAGE_DESC: 'To use a private image registry, you need to first create an image registry secret. <a href={link} target="_blank">Learn More</a>',
  IMAGE_PLACEHOLDER: 'Image name or path such as nginx:latest',
  IMAGE_EMPTY: 'Please set an image.',
  ENTER_POSITIVE_INTEGER_DESC: 'Please enter a positive integer.',
  TOTAL_REPLICAS_EMPTY_DESC: 'Please enter the total number of pod replicas in all clusters.',
  CONTAINER_NAME: 'Container Name',
  CONTAINER_TYPE: 'Container Type',
  USE_DEFAULT_PORTS: 'Use Default Ports',
  NO_DEFAULT_PORT: 'No default ports config',
  REGISTRY: 'Registry',
  SET_IMAGE_DESC: 'Set an image for the container.',
  WORKER_CONTAINER: 'Worker container',
  CONTAINER_RESOURCE_LIMIT_TIP: 'Set the resource limits and requests of the container so that the container is scheduled to appropriate nodes.',
  GPU_TYPE: 'GPU Type',
  GPU_LIMIT: 'GPU Limit',
  NVIDIA_COM_GPU: 'NVIDIA GPU',
  NO_LIMIT: 'No limit',
  NO_REQUEST: 'No request',
  NO_RESOURCE_LIMIT: 'No resource limit',
  IGNORE_AND_RETRY: 'Ignore and Try Again',
  AVAILABLE_QUOTAS: 'Available Quotas',
  // List > Create > Pod Settings > Add Container > Port Settings
  PORT_SETTINGS: 'Port Settings',
  ISTIO_PROTOCOL_TIP: 'Select the protocol used by the service to fully utilize the Application Governance function. For example, select HTTP for an HTTP service.',
  REQUIRED: 'Required',
  // List > Create > Pod Settings > Add Container > Use Local Image First
  IMAGE_PULL_POLICY_ALWAYS: 'Pull Image Always',
  IMAGE_PULL_POLICY_NEVER: 'Use Local Image Only',
  IMAGE_PULL_POLICY_ALWAYS_DESC: 'Pulls an image always when the pod is created or updated.',
  IMAGE_PULL_POLICY_IFNOTPRESENT_DESC: 'Pulls an image only when the required image does not exist locally.',
  IMAGE_PULL_POLICY_NEVER_DESC: 'Uses a local image only. The container will become abnormal if the required image does not exist locally.',
  IMAGE_PULL_POLICY_IFNOTPRESENT: 'Use Local Image First',
  // List > Create > Pod Settings > Add Container > Health Check
  LIVENESS_CHECK: 'Liveness Check',
  READINESS_CHECK: 'Readiness Check',
  STARTUP_CHECK: 'Startup Check',
  LIVENESS_CHECK_DESC: 'Checks whether the container is alive.',
  READINESS_CHECK_DESC: 'Checks whether the container is ready to process requests.',
  STARTUP_CHECK_DESC: 'Checks whether the container is started successfully.',
  ADD_PROBE: 'Add Probe',
  COMMANDS: 'Commands',
  HEALTH_CHECK: 'Health Check',
  STARTUP_CHECK_TIP: 'Kubernetes v1.18 or later is required.',
  HTTP_PATH_EMPTY: 'Please set a path for the HTTP check.',
  // List > Create > Pod Settings > Add Container > Life Management
  LIFECYCLE_MANAGEMENT: 'Lifecycle Management',
  LIFECYCLE_MANAGEMENT_DESC: 'Add actions to be performed after the container is started or before it is stopped for environment preparation or graceful shutdown.',
  POSTSTART_ACTION: 'Post-start Action',
  PRESTOP_ACTION: 'Pre-stop Action',
  POSTSTART_ACTION_DESC: 'Add an action to be performed after the container is started.',
  PRESTOP_ACTION_DESC: 'Add an action to be performed before the container is stopped.',
  ADD_ACTION: 'Add Action',
  // List > Create > Pod Settings > Add Container > Environment Variables
  ADD_ENVIRONMENT_VARIABLE: 'Add Environment Variable',
  KEY_IN_RESOURCE: 'Key in resource',
  LABEL_TYPE: '{label} <span style="{style}">({type})</span>',
  RESOURCE: 'Resource',
  CREATE_CONFIGMAP_SECRET_DESC: 'If no configmap or secret meets the requirements, you can',
  CREATE_CONFIG: 'create a configmap',
  OR: 'or',
  CREATE_SECRET: 'create a secret.',
  // List > Create > Pod Settings > Add Container > Container Security Context
  CONTAINER_SECURITY_CONTEXT: 'Container Security Context',
  CONTAINER_SECURITY_CONTEXT_DESC: 'Customize the privilege settings of the container.',
  PRIVILEGED_MODE: 'Privileged Mode',
  PRIVILEGED_MODE_DESC: 'Runs container processes as the root user of the host.',
  ALLOW_PRIVILEGE_ESCALATION: 'Allow Privilege Escalation',
  ALLOW_PRIVILEGE_ESCALATION_DESC: 'Allows container processes to acquire more privileges than the parent process. This option is enabled by default when the privileged mode is enabled.',
  ROOT_DIRECTORY_READONLY: 'Root Directory Read-Only',
  ROOT_DIRECTORY_READONLY_DESC: 'Sets the root directory of the container file system to read-only.',
  USER_AND_USER_GROUP: 'User and User Group',
  USER_GROUP: 'User Group',
  RUN_AS_NON_ROOT: 'Run as Non-root',
  RUN_AS_NON_ROOT_DESC: 'Checks whether the container is to be run by the root user before starting the container. If yes, the container will not be started.',
  RUN_AS_USER_DESC: 'UID to run the entrypoint of the container process. The default value is the UID specified in the image metadata.',
  RUN_AS_USER_GROUP_DESC: 'GID to run the entrypoint of the container process. The default value is the container runtime default GID.',
  SELINUX_CONTEXT: 'SELinux Context',
  CAPABILITIES: 'Capabilities',
  DROP: 'Drop',
  ACCESS_CONTROL: 'Zugangskontrolle',
  LEVEL: 'Level',
  // List > Create > Pod Settings > Add Container > Synchronize Host Timezone
  SYNC_HOST_TIMEZONE_DESC: 'Synchronize the time zone of the container with that of the host.',
  SYNC_HOST_TIMEZONE: 'Synchronize Host Timezone',
  // List > Create > Pod Settings > Update Strategy
  UPDATE_STRATEGY: 'Update Strategy',
  ROLLING_UPDATE_RECOMMENDED: 'Rolling Update (recommended)',
  SIMULTANEOUS_UPDATE: 'Simultaneous Update',
  ROLLINGUPDATE_DESC: 'Gradually replaces old pod replicas with new ones. The service is not interrupted during the update process.',
  SIMULTANEOUS_UPDATE_DESC: 'Deletes all existing pod replicas before creating new ones. The service is interrupted during the update process.',
  ENTER_INTEGER_OR_PERCENTAGE: 'Please enter an integer or percentage.',
  MAX_EXTRA_EMPTY: 'Please set the maximum number or percentage of extra pod replicas allowed during the update process.',
  // List > Create > Pod Settings > Pod Security Context
  POD_SECURITY_CONTEXT: 'Pod Security Context',
  POD_SECURITY_CONTEXT_DESC: 'Customize the pod privilege settings.',
  POD_SECURITY_CONTEXT_TIP: 'If User, User Group, and SELinux Context settings are defined in both pod Security Context and Container Security Context, the Container Security Context settings will override the Pod Security Context settings.',
  // List > Create > Pod Settings > Pod Scheduling Rules
  POD_SCHEDULING_RULES: 'Pod Scheduling Rules',
  POD_SCHEDULING_RULES_DESC: 'Specify the rules for scheduling the pod replicas to nodes.',
  DEFAULT_RULES: 'Default Rules',
  DEFAULT_RULES_DESC: 'Schedules the pod replicas to nodes according to default rules.',
  DECENTRALIZED_SCHEDULING: 'Decentralized Scheduling',
  CUSTOM_RULES: 'Custom Rules',
  CUSTOM_RULES_DESC: 'Schedules the pod replicas to nodes according to custom rules.',
  DECENTRALIZED_SCHEDULING_DESC: 'Schedules the pod replicas to different nodes if possible.',
  CENTRALIZED_SCHEDULING_DESC: 'Schedules the pod replicas to the same node if possible.',
  CENTRALIZED_SCHEDULING: 'Centralized Scheduling',
  SCHEDULE_WITH_TARGET: 'Schedule with target',
  SCHEDULE_AWAY_FROM_TARGET: 'Schedule away from target',
  MATCH_IF_POSSIBLE: 'Match if possible',
  MUST_MATCH: 'Must match',
  TARGET: 'Target',
  STRATEGY: 'Strategy',
  // List > Create > Pod Settings > Add Metadata
  ADD_METADATA: 'Add Metadata',
  POD_ADD_METADATA_DESC: 'Add metadata to the pod replicas.',
  // List > Create > Storage Settings
  STORAGE_SETTINGS: 'Storage Settings',
  READ_ONLY_LOW: 'read-only',
  READ_AND_WRITE_LOW: 'read and write',
  // List > Create > Storage Settings > Mount Volume
  MOUNT_VOLUME: 'Mount Volume',
  WORKLOAD_MOUNT_VOLUME_DESC: 'Mount an persistent volume, temporary volume, or HostPath volume to the containers.',
  SELECT_PERSISITENT_VOLUME_CLAIM: 'Select Persistent Volume Claim',
  SELECT_PERSISITENT_VOLUME_CLAIM_DESC: 'Mount a persistent volume created according to the persistent volume claim to the containers.',
  CAPACITY: 'Capacity',
  PVC_NOT_SELECT: 'Please select a persistent volume claim.',
  TEMPORARY_VOLUME: 'Temporary Volume',
  VOLUME_NAME: 'Volume Name',
  VOLUME_NAME_EMPTY: 'Please set a name for the volume.',
  HOST_PATH_EMPTY: 'Please set a host path for the volume.',
  CONTAINER_NOT_SELECTED: 'Please mount the volume to at least one container.',
  NOT_MOUNT: 'Not mounted',
  HOSTPATH_VOLUME: 'HostPath Volume',
  HOSTPATH_TIP: 'Use a HostPath volume to mount a file or directory in the host file system to the containers.',
  HOST_PATH: 'Host Path',
  READ_AND_WRITE: 'Read and write',
  READ_ONLY: 'Read-only',
  // List > Create > Storage Settings > Mount Configmap or Secret
  MOUNT_CONFIGMAP_OR_SECRET: 'Mount Configmap or Secret',
  MOUNT_CONFIGMAP_OR_SECRET_DESC: 'Mount a configmap or secret to the containers.',
  CONFIGMAP: 'Configmap',
  SELECT_CONFIGMAP_DESC: 'Mount a configmap to the containers.',
  READ_WRITE_MOUNT_EMPTY: 'Please specify the volume access mode and mount path.',
  SELECT_SPECIFIC_KEYS: 'Select Specific Keys',
  SELECT_SPECIFIC_KEYS_DESC: 'Select specific keys to be mounted to the containers.',
  SELECT_SECRET_DESC: 'Mount a secret to the containers.',
  CONFIGMAP_NOT_SELECT: 'Please select a configmap.',
  SECRET_NOT_SELECT: 'Please select a secret.',
  NO_AVAILABLE_RESOURCE: 'No Available Resource',
  // List > Create > Advanced Settings
  SELECT_NODES: 'Select Nodes',
  SELECT_NODES_DESC: 'Assign pod replicas to specific nodes. You can use labels to select nodes or manually specify a node.',
  ADD_NODE_SELECTOR: 'Add Node Selector',
  ADD_METADATA_DESC: 'Add metadata to the resource.',
  KEY: 'Key',
  VALUE: 'Value',
  ADVANCED_SETTINGS: 'Advanced Settings',
  DUPLICATE_LABELS: 'Duplicate labels cannot be added.',
  // List > Create > Advanced Settings > Specify Node
  WORKLOAD_SPECIFY_NODE_DESC: 'Assign pod replicas to a specific node.',
  // List > Create > Cluster Differences
  CLUSTER_DIFF: 'Cluster Differences',
  CLUSTER_DIFF_CONTAINER_SETTINGS_DESC: 'Use different container settings in different clusters.',
  CLUSTER_DIFF_PORT_SETTINGS_DESC: 'Set different ports for containers in different clusters.',
  CLUSTER_DIFF_ENVIRONMENT_VARIABLES_DESC: 'Set different environment variables for containers in different clusters.',
  CONTAINER_IMAGE: 'Container Image'
};