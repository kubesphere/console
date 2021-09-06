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
  SELECT_PROJECT_DESC:
    'Select a project in which the resource is to be created.',
  PROJECT_EMPTY_DESC: 'Please select a project.',
  REPLICA_LOW_SI: 'replica',
  REPLICA_LOW_PL: 'replicas',
  IMAGE_TIME_SIZE_LAYER_PL: '{time}, {size}, {layer} layers',
  IMAGE_TIME_SIZE_LAYER_SI: '{time}, {size}, {layer} layers',
  TAG: 'Tag',
  CPU_REQUEST: 'CPU Request',
  CPU_LIMIT: 'CPU Limit',
  MEMORY_REQUEST: 'Memory Request',
  MEMORY_LIMIT: 'Memory Limit',
  ADD_PROBE: 'Add Probe',
  LABEL_TYPE: '{label} <span style="{style}">({type})</span>',
  SELINUX_CONTEXT: 'SELinux Context',
  CAPABILITIES_BETA: 'Capabilities (beta)',
  POD_SETTINGS: 'Pod Settings',
  ADD_RULE: 'Add Rule',
  RULE_NOT_COMPLETE: 'Please set a complete rule.',
  SCHEDULE_WITH_TARGET: 'Schedule with target',
  SCHEDULE_AWAY_FROM_TARGET: 'Schedule away from target',
  MATCH_IF_POSSIBLE: 'Match if possible',
  MUST_MATCH: 'Must match',
  MOUNT_PATH_EMPTY: 'Please enter a mount path.',
  CONFIGMAP: 'ConfigMap',
  SECRET: 'Secret',
  PARTITION_ORDINAL: 'Ordinal for Dividing Pod Replicas',
  PARTITION_ORDINAL_DESC:
    'Ordinal that divides the Pod replicas into two groups. When the StatefulSet is updated, only Pod replicas with an ordinal greater than or equal to the value of this parameter are updated.',
  'Access Mode': 'Access Mode',
  'Add argument': 'Add argument',
  'Add Command': 'Add Command',
  'Add command': 'Add command',
  'Add Container': 'Add Container',
  ADD_ENVIRONMENT_VARIABLE: 'Add Environment Variable',
  'Add Existing Volume': 'Add Existing Volume',
  'Add HostPath': 'Add HostPath',
  ADD_LABEL: 'Add Label',
  'Add Labels': 'Add Labels',
  ADD_METADATA: 'Add Metadata',
  'Add new container': 'Add new container',
  'Add Node Selector': 'Add Node Selector',
  ADD_NODE_SELECTOR: 'Add Node Selector',
  ADD_PORT: 'Add Port',
  'Add Probe': 'Add Probe',
  'Add Temporary Volume': 'Add Temporary Volume',
  'Add Volume': 'Add Volume',
  'Add Volume Template': 'Add Volume Template',
  'Adding new contianer': 'Adding new contianer',
  'Additional metadata settings for resources such as Labels and Annotations.':
    'Additional metadata settings for resources such as Labels and Annotations.',
  'Additional metadata settings for resources.':
    'Additional metadata settings for resources.',
  ADD_METADATA_DESC:
    'Add metadata such as labels and annotations to resources.',
  'Advanced Options': 'Advanced Options',
  'Applied to the workload': 'Applied to the workload',
  Argument: 'Argument',
  ARGUMENTS: 'Arguments',
  'Available number of nodes scheduled': 'Available number of nodes scheduled',
  'Can be found by node IP or node name':
    'Can be found by node IP or node name',
  CAPACITY: 'Capacity',
  capacity: 'capacity',
  SELECT_VOLUME: 'Select Volume',
  SELECT_TYPE: 'Select {type}',
  SPECIFY_SUBPATH: 'Specify Subpath',
  'Cluster Resource Status': 'Cluster Resource Status',
  'Coding Mode': 'Coding Mode',
  'Collecting file log': 'Collecting file log',
  Commands: 'Commands',
  CONCURRENCY_POLICY: 'Concurrency Policy',
  'Config Template': 'Config Template',
  'Container Config': 'Container Config',
  'Container CPU Resource Request, 1 Core = 1000m':
    'Container CPU Resource Request, 1 Core = 1000m',
  CONTAINERS: 'Containers',
  CONTAINER_IMAGE: 'Container Image',
  ADD_CONTAINER: 'Add Container',
  LIVENESS_CHECK: 'Liveness Check',
  CONTAINER_LOG_PATH: 'Container log path',
  'Container Logs': 'Container Logs',
  'Container Memory Resource Request': 'Container Memory Resource Request',
  CONTAINER_NAME: 'Container Name',
  READINESS_CHECK: 'Readiness Check',
  CONTAINER_SECURITY_CONTEXT: 'Container Security Context',
  'Container Setting': 'Container Setting',
  STARTUP_CHECK: 'Startup Check',
  CONTAINER_TYPE: 'Container Type',
  ContainerCreating: 'ContainerCreating',
  ContainerNotReady: 'ContainerNotReady',
  ContainersNotInitialized: 'ContainersNotInitialized',
  ContainersNotReady: 'ContainersNotReady',
  'CPU Target Utilization': 'CPU Target Utilization',
  'CPU(m)': 'CPU(m)',
  CrashLoopBackOff: 'CrashLoopBackOff',
  CreateContainerConfigError: 'CreateContainerConfigError',
  CreateContainerError: 'CreateContainerError',
  created: 'created',
  CronJob: 'CronJob',
  'CronJob Settings': 'CronJob Settings',
  'Current number of nodes scheduled': 'Current number of nodes scheduled',
  'Current Replicas': 'Current Replicas',
  'Current Revision': 'Current Revision',
  'Current Stage(phase)': 'Current Stage(phase)',
  'Current Utilization': 'Current Utilization',
  DEPLOYMENT_LOCATION: 'Deployment Location',
  'Deployment Mode': 'Deployment Mode',
  POD_SCHEDULING_RULES: 'Pod Scheduling Rules',
  POD_SCHEDULING_RULES_DESC:
    'Specify the rules for scheduling the Pod replicas to nodes.',
  DeploymentPaused: 'DeploymentPaused',
  DeploymentResumed: 'DeploymentResumed',
  'Desired number of nodes scheduled': 'Desired number of nodes scheduled',
  'Desired Replicas': 'Desired Replicas',
  'Diff Settings': 'Diff Settings',
  DockerDaemonNotReady: 'DockerDaemonNotReady',
  'Edit Config Template': 'Edit Config Template',
  EDIT_CONTAINER: 'Edit Container',
  'Edit Labels': 'Edit Labels',
  EDIT_YAML: 'Edit YAML',
  EmptyDir: 'EmptyDir',
  Environment: 'Environment',
  'Environment Variables': 'Environment Variables',
  ENVIRONMENT_VARIABLES: 'Environment Variables',
  'environment variables': 'environment variables',
  ErrImageNeverPull: 'ErrImageNeverPull',
  ErrImagePull: 'ErrImagePull',
  EVERY_DAY: ' (Every day)',
  EVERY_HOUR: ' (Every hour)',
  EVERY_MONTH: ' (Every month)',
  EVERY_WEEK: ' (Every week)',
  'Exec Command Check': 'Exec Command Check',
  'Every Day': 'Every Day',
  'Every Hour': 'Every Hour',
  'Every Month': 'Every Month',
  'Every Week': 'Every Week',
  'Execution Records': 'Execution Records',
  EXISTING_VOLUME: 'Existing Volume',
  FailedCreate: 'FailedCreate',
  FailedDelete: 'FailedDelete',
  failedJobsHistoryLimit: 'failedJobsHistoryLimit',
  FAILURE_THRESHOLD: 'Failure Threshold',
  'File List': 'File List',
  'for example': 'for example',
  FoundNewReplicaSet: 'FoundNewReplicaSet',
  'Horizontal Pod Autoscaling': 'Horizontal Pod Autoscaling',
  'Horizontal Pod Autoscaling has been set':
    'Horizontal Pod Autoscaling has been set',
  'Host Path': 'Host Path',
  'Host Port': 'Host Port',
  'How pods are assinged to nodes?': 'How pods are assinged to nodes?',
  HTTP_REQUEST: 'HTTP Request',
  HTTP_PATH_EMPTY: 'Please set a path for the HTTP check.',
  IMAGE: 'Image',
  IMAGE_VALUE: 'Image: {value}',
  'Image ID': 'Image ID',
  'Image Name': 'Image Name',
  'Image Pull Policy': 'Image Pull Policy',
  ImageInspectError: 'ImageInspectError',
  ImagePullBackOff: 'ImagePullBackOff',
  INIT_CONTAINER: 'Init container',
  'Initial Delay': 'Initial Delay',
  INITIAL_DELAY_S: 'Initial Delay (s)',
  INITIAL_DELAY_TIMEOUT_VALUE:
    '{delay}s initial delay, {timeout}s timeout period',
  'Instance Status': 'Instance Status',
  'Invalid image': 'Invalid image',

  'Invalid name': 'Invalid name. {message}',
  'Invalid pod': 'Invalid value',
  INVALID_IMAGE: 'Invalid image.',
  INVALID_NAME_DESC: 'Invalid name. {message}',
  InvalidImageName: 'InvalidImageName',
  'is running': 'is running',
  Job: 'Job',
  'Job Settings': 'Job Settings',
  'Job Template': 'Job Template',
  EMPTY_LABEL_DESC: 'Please add a label.',
  LABEL_EXIST_DESC: 'The label already exists. Please use another label.',
  ADD_CONTAINER_DESC: 'Customize container settings to create a container.',
  'Labels cannot be empty': 'Labels cannot be empty',
  DUPLICATE_LABELS: 'Duplicate labels cannot be added.',
  layers: 'layers',
  'Liveness Probe': 'Liveness Probe',
  'log path relative to container mount path':
    'log path relative to container mount path',
  'm.internalLifecycle.PreStartContainer':
    'm.internalLifecycle.PreStartContainer',
  'Max Replicas Number': 'Max Replicas Number',
  MAX_SURGE_POD_VALIDATOR: 'MAX_SURGE_POD_VALIDATOR',
  'Maximum number of replicas': 'Maximum number of replicas',
  'Memory Target Usage': 'Memory Target Usage',
  'Memory Target Utilization': 'Memory Target Utilization',
  'Min Replicas Number': 'Min Replicas Number',
  'min replicas number should not be greater than max replicas number':
    'min replicas number should not be greater than max replicas number',
  MinimumReplicasAvailable: 'MinimumReplicasAvailable',
  MinimumReplicasUnavailable: 'MinimumReplicasUnavailable',
  MIN_READY_SECONDS: 'Minimum Running Time for Pod Readiness (s)',
  Mount: 'Mount',
  MOUNT_CONFIGMAP_OR_SECRET: 'Mount ConfigMap or Secret',
  MOUNT_PATH: 'Mount path',
  MOUNT_PATH_IN_USE:
    'The mount path is already in use. Please use another mount path.',
  'Mount point': 'Mount point',
  'Mount Temporary Volume': 'Mount Temporary Volume',
  MOUNT_CONFIGMAP_OR_SECRET_DESC:
    'Mount a ConfigMap or Secret to the containers.',
  'Mount Volume': 'Mount Volume',
  VOLUME_SETTINGS: 'Volume Settings',
  mounted: 'mounted',
  NetworkPluginNotReady: 'NetworkPluginNotReady',
  'New Volume': 'New Volume',
  NewReplicaSetAvailable: 'NewReplicaSetAvailable',
  NewReplicaSetCreated: 'NewReplicaSetCreated',
  NO_DEFAULT_PORT: 'No default ports config',
  NO_LIMIT: 'No limit',
  'No related resources found with the current workload(s)':
    'No related resources found with the current workload(s)',
  'No related resources': 'No related resources',
  NO_REQUEST: 'No request',
  NO_RESOURCE_LIMIT: 'No resource limit',
  'Node Name': 'Node Name',
  'Node Scheduling Info': 'Node Scheduling Information',
  NO_IMAGE_FOUND: 'No Image Found',
  ONDELETE: 'Update on Deletion',
  CHECK_INTERVAL_S: 'Check Interval (s)',
  CONTAINER_EMPTY_DESC: 'Please add at least one container.',
  'Please add at least one volume': 'Please add at least one volume',
  'Please add at least one volume or volume template':
    'Please add at least one volume or volume template',
  ENTER_SCHEDULE_TIP: 'Please enter a schedule.',
  'Please input command': 'Please input command',
  MOUNT_VOLUME: 'Mount Volume',
  MOUNT_VOLUME_OR_TEMPLATE: 'Mount Volume or Volume Template',
  'Please input a schedule.': 'Please input a schedule.',
  PROBE_COMMAND_EMPTY: 'Please enter at least one command.',
  'Please input mount point': 'Please input mount point',
  'Please input port': 'Please input port',
  VOLUME_NAME_EMPTY: 'Please set a name for the volume.',
  CONFIGMAP_NOT_SELECT: 'Please select a ConfigMap.',
  SECRET_NOT_SELECT: 'Please select a Secret.',
  'Please select a storage class': 'Please select a storage class',
  VOLUME_NOT_SELECT: 'Please select a volume.',
  CONTAINER_NOT_SELECTED: 'Please mount the volume to at least one container.',
  SET_IMAGE_DESC: 'Set an image for the container.',
  'Please select protocol': 'Please select protocol',
  'Please select rollback revision': 'Please select rollback revision',
  'Please specify an image': 'Please specify an image',
  READ_WRITE_MOUNT_EMPTY:
    'Please specify the volume access mode and mount path.',
  CENTRALIZED_SCHEDULING: 'Centralized Scheduling',
  'Pod CPU Request': 'Pod CPU Request',
  'Pod Decentralized Deployment': 'Pod Decentralized Deployment',
  'Pod Default Deployment': 'Pod Default Deployment',
  POD_IP_ADDRESS: 'Pod IP Address',
  'Pod Memory Request': 'Pod Memory Request',
  POD_REPLICAS: 'Pod Replicas',
  DEFAULT_RULES: 'Default Rules',
  DEFAULT_RULES_DESC:
    'Schedules Pod replicas to nodes according to default rules.',
  'Pod replicas will be deployed on different nodes as much as possible.':
    'Pod replicas will be deployed on different nodes as much as possible.',
  'Pod replicas will be deployed on the same node as much as possible.':
    'Pod replicas will be deployed on the same node as much as possible.',
  'Pod replicas will be deployed according to user customization.':
    'Pod replicas will be deployed according to user customization.',
  'Pod Security Context': 'Pod Security Context',
  DECENTRALIZED_SCHEDULING: 'Decentralized Scheduling',
  CUSTOM_RULES_DESC:
    'Schedules the Pod replicas to nodes according to custom rules.',
  'Pod IP': 'Pod IP',
  DECENTRALIZED_SCHEDULING_DESC:
    'Schedules the Pod replicas to different nodes if possible.',
  CENTRALIZED_SCHEDULING_DESC:
    'Schedules the Pod replicas to the same node if possible.',
  POD_SECURITY_CONTEXT: 'Pod Security Context',
  'Pod Status': 'Pod Status',
  'Pod Status Analysis': 'Pod Status Analysis',
  POD_REASON_FAILEDCREATE: 'Creation failed',
  POD_REASON_FAILEDDELETE: 'Deletion failed',
  POD_REASON_SUCCESSFULCREATE: 'Creation succeeded',
  POD_REASON_SUCCESSFULDELETE: 'Deletion succeeded',
  PodInitializing: 'Pod initializing',
  'Pods List': 'Pods List',
  Port: 'Port',
  'Port(s)': 'Port(s)',
  ports: 'ports',
  PostStartHookError: 'PostStartHookError',
  'Private Registry': 'Private Registry',
  Privileged: 'Privileged',
  Probe: 'Probe',
  ProgressDeadlineExceeded: 'ProgressDeadlineExceeded',
  Protocols: 'Protocols',
  PROVISIONER: 'Provisioner',
  'Read Write Mode': 'Read Write Mode',
  'Readiness Probe': 'Readiness Probe',
  SIMULTANEOUS_UPDATE: 'Simultaneous Update',
  REDEPLOY: 'Redeploy',
  'Redeploy Successfully': 'Redeploy Successfully',
  REGISTRY: 'Registry',
  RegistryUnavailable: 'RegistryUnavailable',
  'Replica Status': 'Replica Status',
  'Replicas Number': 'Replicas Number',
  ReplicaSetCreateError: 'ReplicaSetCreateError',
  ReplicaSetUpdated: 'ReplicaSetUpdated',
  'request CPU should not be greater than limit CPU':
    'request CPU should not be greater than limit CPU',
  'request memory should not be greater than limit memory':
    'request memory should not be greater than limit memory',
  'Request Type': 'Request Type',
  RERUN: 'Rerun',
  'Resource Info': 'Resource Info',
  'Resource Limit': 'Resource Limit',
  'Resource Limits': 'Resource Limits',
  'Resource limits remaining quota': 'Resource limits remaining quota',
  'Resource Name': 'Resource Name',
  'Resource Request': 'Resource Request',
  'Resource Requests': 'Resource Requests',
  'Resource requests remaining quota': 'Resource requests remaining quota',
  'Resource Status': 'Resource Status',
  'Restart Count': 'Restart Count',
  RESTART_POLICY: 'Restart Policy',
  Revision: 'Revision',
  'Revision Records': 'Revision Records',
  'Revision Rollback': 'Revision Rollback',
  'Rollback Revisions': 'Rollback Revisions',
  RollingUpdate: 'RollingUpdate',
  ROLLING_UPDATE_RECOMMENDED: 'Rolling Update (recommended)',
  RunContainerError: 'RunContainerError',
  Schedule: 'Schedule',
  'Scheduled to node': 'Scheduled to node',
  'Scheduling Info': 'Scheduling Information',
  'Select by Node': 'Select by Node',
  RESOURCE: 'Resource',
  SELECT_SPECIFIC_KEYS: 'Select Specific Keys',
  'Service Configuration': 'Service Configuration',
  'Service Labels': 'Service Labels',
  'Session Affinity': 'Session Affinity',
  'Set Mount Path': 'Set Mount Path',
  SELECT_NODES: 'Select Nodes',
  'Specify Replicas Number': 'Specify Replicas Number',
  SYNC_HOST_TIMEZONE: 'Synchronize Host Timezone',
  startingDeadlineSeconds: 'startingDeadlineSeconds',
  'startingDeadlineSeconds(s)': 'startingDeadlineSeconds(s)',
  'Startup Probe': 'Startup Probe',
  'Storage Size': 'Storage Size',
  'Strategy Type': 'Strategy Type',
  SUBPATH: 'Subpath',
  SUCCESS_THRESHOLD: 'Success Threshold',
  SuccessfulCreate: 'SuccessfulCreate',
  SuccessfulDelete: 'SuccessfulDelete',
  successfulJobsHistoryLimit: 'successfulJobsHistoryLimit',
  WORKLOAD_MOUNT_VOLUME_DESC:
    'Mount an existing volume, temporary volume, or HostPath volume to the containers.',
  'Sure to delete the workload(s)?': 'Sure to delete the workload(s)?',
  'target port': 'target port',
  'Target Usage': 'Target Usage',
  'Target Utilization': 'Target Utilization',
  'TCP Port Check': 'TCP Port Check',
  'Temporary Volume': 'Temporary Volume',
  CONCURRENCY_POLICY_DESC:
    'Select a concurrency policy of a Job created by the CronJob.',
  FAILED_JOBS_DESC: 'Number of failed Jobs to be retained.',
  SUCCESSFUL_JOBS_DESC: 'Number of successful Jobs to be retained.',
  'Timeout(s)': 'Timeout(s)',
  TCP_PORT: 'TCP Port',
  TEMPORARY_VOLUME: 'Temporary Volume',
  HOSTPATH_VOLUME: 'HostPath Volume',
  'The concurrency policy setting.': 'The concurrency policy setting.',
  'The minimum of the replicas that can be set by HPA':
    'The minimum of the replicas that can be set by HPA',
  'The number of failed jobs allowed to be retained.':
    'The number of failed jobs allowed to be retained.',
  'The number of successful jobs allowed to be retained.':
    'The number of successful jobs allowed to be retained.',
  TIMEOUT_PERIOD_S: 'Timeout (s)',
  'UI Mode': 'UI Mode',
  'Update Strategy': 'Update Strategy',
  UPDATE_STRATEGY: 'Update Strategy',
  USE_CONFIGMAP_OR_SECRET: 'Use ConfigMap or Secret',
  USE_DEFAULT_PORT: 'Use Default Port',
  USER_AND_USER_GROUP: 'User and User Group',
  USER_GROUP: 'User Group',
  'View YAML': 'View YAML',
  VOLUME_CAPACITY_TCAP: 'Volume Capacity',
  'Volume Name': 'Volume Name',
  'Volume Source': 'Volume Source',
  DISK_LOG_COLLECTION_Q: 'What is disk log collection?',
  'What is Disk Log Collection?': 'What is Disk Log Collection?',
  'Worker Container': 'Worker Container',
  VOLUME_CAPACITY: 'Volume Capacity',
  VOLUME_NAME: 'Volume Name',
  WORKER_CONTAINER: 'Worker container',
  Workload: 'Workload',

  'Not Limited': 'Not Limited',
  Cost: 'Cost',
  'Project Remaining Quota': 'Project Remaining Quota',
  'Workspace Remaining Quota': 'Workspace Remaining Quota',
  QUOTA_OVERCOST_TIP:
    'The current resource usage has exceeded the remaining quota',

  WORKLOAD_REASON_DEPLOYMENTPAUSED: 'Deployment paused',
  WORKLOAD_REASON_DEPLOYMENTRESUMED: 'Deployment resumed',
  WORKLOAD_REASON_FAILEDCREATE: 'Creation failed',
  WORKLOAD_REASON_FOUNDNEWREPLICASET: 'New ReplicaSet found',
  WORKLOAD_REASON_MINIMUMREPLICASAVAILABLE: 'Minimum replicas available',
  WORKLOAD_REASON_MINIMUMREPLICASUNAVAILABLE: 'Minimum replicas unavailable',
  WORKLOAD_REASON_NEWREPLICASETAVAILABLE: 'New ReplicaSet available',
  WORKLOAD_REASON_NEWREPLICASETCREATED: 'New ReplicaSet created',
  WORKLOAD_REASON_PROGRESSDEADLINEEXCEEDED: 'Process timed out',
  WORKLOAD_REASON_REPLICASETCREATEERROR: 'New ReplicaSet creation error',
  WORKLOAD_REASON_REPLICASETUPDATED: 'ReplicaSet updated',
  Workloads: 'Workloads',
  SELECT_NODES_DESC:
    'Assign Pod replicas to specific nodes. You can use labels to select nodes or manually specify a node.',
  WORKLOAD_SPECIFY_NODE_DESC: 'Assign Pod replicas to a specific node.',
  WORKLOAD_DESC:
    'A workload is usually the actual carrier for accessing a Service, and is also the actual running carrier for system applications such as node log collection and monitoring. A workload is an abstract model for a group of Pods.',
  DEPLOYMENT_DESC:
    'Deployment provides fine-grained management of common applications in KubeSphere. Deployment configuration describes the desired state of specific components of an application as Pod templates.',
  DEPLOYMENT_CREATE_DESC:
    "A Deployment controller provides declarative updates for Pods and ReplicaSets, it's used to replace the ReplicationController to get Application management easier. Typically, using Deployment to create pods and ReplicateSet, rolling upgrade and rolling back applications, scaling out or in applications, stopping or resuming applications.",
  STATEFULSET_DESC:
    'StatefulSet is used to manage stateful applications, manages the deployment and scaling of a set of Pods, and provides guarantees about the ordering and uniqueness of these Pods.',
  STATEFULSET_CREATE_DESC:
    'StatefulSet is used to manage stateful applications, manages the deployment and scaling of a set of Pods, and provides guarantees about the ordering and uniqueness of these Pods.',
  DAEMONSET_DESC:
    'A DaemonSet ensures that all (or some) Nodes run a copy of a Pod. Typically, a DaemonSet is used to running a logs collection, monitoring daemon or other system management applications.',
  DAEMONSET_CREATE_DESC:
    'A DaemonSet ensures that all (or some) Nodes run a copy of a Pod. Typically, a DaemonSet is used to running a logs collection, monitoring daemon or other system management applications.',
  JOB_DESC:
    'Jobs are used to perform short-lived, one-off tasks. A Job creates one or more Pods and ensures that a specific number of Pods successfully terminate.',
  JOB_CREATE_DESC:
    'Jobs are used to perform short-lived, one-off tasks. A Job creates one or more Pods and ensures that a specific number of Pods successfully terminate.',
  CRONJOB_DESC:
    'CronJobs manages Jobs on a time-based schedule and can be used to perform periodic or recurring tasks.',
  CRONJOB_CREATE_DESC:
    'CronJobs manages Jobs on a time-based schedule and can be used to perform periodic or recurring tasks.',
  CRONJOB_NAME_DESC:
    'It can only contain lowercase letters, numbers and hyphens("-"), and must start and end with a lowercase letter or a number. The value can contain a maximum of 52 characters.',
  CRONJOB_NAME_TOO_LONG: 'The value can contain a maximum of 52 characters.',

  REPLICAS_SCALE_NOTIFY_TITLE: 'Does it take effect immediately?',
  REPLICAS_SCALE_NOTIFY_CONTENT:
    'You are going to change the number of replicas of your workload to {num}. You can continue to change it, or you can make the change take effect immediately.',
  REPLICAS_SCALE_NOTIFY_CONFIRM: 'Apply changes ({seconds}s)',
  REPLICAS_SCALE_NOTIFY_CANCEL: 'Discard changes',

  ROLLING_UPDATE_SETTINGS: 'Rolling Update Settings',
  MAX_UNAVAILABLE_PODS: 'Maximum Unavailable Pods',
  MAX_EXTRA_PODS: 'Maximum Extra Pods',
  UPDATE_STRATEGY_DESC:
    'It\'s used to configure the strategy for replacing pods during the upgrade process. <a href="{link}" target="_blank">Learn more.</a>',
  MAX_UNAVAILABLE_PODS_DESC:
    'Maximum number or percentage of unavailable Pod replicas allowed during the update process.',
  MAX_DEPLOY_UNAVAILABLE_POD_DESC:
    'The maximum number of Pods that can be unavailable during the update.',
  MAX_EXTRA_PODS_DESC:
    'Maximum number or percentage of extra Pods allowed during the update process.',
  ROLLING_UPDATE_POD_TIP:
    'It limits the minimum and maximum available quantities based on the current replicas when it is in rolling update. The minimum number of replicas cannot exceed the current number of replicas, and the maximum number of Pods cannot exceed 2 times the current replicas.',
  ONDELETE_DESC: 'Updates Pod replicas only when they are manually deleted.',
  ROLLINGUPDATE_DESC:
    'Gradually replaces old Pod replicas with new ones. The service is not interrupted during the update process.',
  SIMULTANEOUS_UPDATE_DESC:
    'Deletes all existing Pod replicas before creating new ones. The service is interrupted during the update process.',

  STATEFULSET_PARTITION_DESC:
    'Partition indicates the ordinal at which the StatefulSet should be partitioned. Default value is 0.',
  PARTITION_ORDINAL_EMPTY: 'Please set a ordinal for dividing Pod replicas.',
  MIN_READY_SECONDS_DESC:
    'Minimum stable running time required for a Pod replica to be considered ready.',
  MIN_READY_SECONDS_EMPTY:
    'Please set the minimum stable running time required for a Pod replica to be considered ready.',
  IMAGE_PLACEHOLDER: 'Image name or path such as nginx:latest',
  IMAGE_EMPTY: 'Please set an image.',
  IMAGE_REGISTRY_PLACEHOLDER: 'Select the registry secret',
  IMAGE_DESC:
    'To use a private image registry, you need to <a href={link} target="_blank">create an image registry secret</a> first.',

  REPLICAS_DESC: 'The desired number of pods will be created for the {module}.',
  VOLUME_SUB_TEXT: 'Volumes used by the containers of the workload',
  EMPTYDIR_DESC: 'Temporary storage created for the workload',
  HOSTPATH_DESC:
    'A hostPath volume mounts a file or directory from the host node’s filesystem into your Pod.',
  PORT_INPUT_DESC: 'The port name already exists. Please enter another name.',
  PORT_NAME_DESC:
    'The port name can contain only lowercase letters, numbers, and hyphens (-) and must begin and end with a lowercase letter or number. The maximum length is 63 characters.',
  WORKLOAD_PORT_NAME_DESC:
    'The port name can contain only lowercase letters, numbers and hyphens (-), and must start and end with a lowercase letter or number. The maximum length is 15 characters.',

  DEPLOYMENTS_BASEINFO_DESC:
    'You can give the deployment a name that is easy to distinguish when you use it.',
  DEPLOYMENT_POD_TEMPLATE_DESC:
    'The workload can automatically create a specified number of pods based on the Pod template and the number of replicas you set.',
  DEPLOYMENTS_VOLUME_DESC:
    'You can mount the same temporary storage volume or persistent storage volume to each copy of the deployed pods.',
  DEPLOYMENT_LABEL_SETTINGS_DESC:
    'The labels are one or more key-value pairs that are associated with a resource, such as a Pod. We usually identify, organize, or find resource objects through labels.',
  DEPLOYMENT_NODE_SELECT_DESC:
    "By using a selector to dispatch a Pod to a node that is expected to run, these selectors are one or more sets of key-value pairs that match the node's labels.",
  DEPLOYMENT_JOB_SETTINGS_DESC:
    'You can configure the Job Spec template, where the Job Controller is responsible for creating pods based on the Job Spec and keep monitoring the status of the Pod until it completes successfully. If it fails, the RestartPolicy (which supports OnFailure and Never) determines whether to create a new Pod and rerun the job.',
  DEPLOYMENT_CRONJOB_SETTINGS_DESC:
    'The CronJob settings is the part of template for the CronJob, it has exactly the same schema as a Job, where the Job Controller is responsible for creating pods based on the CronJob Spec and keep monitoring the status of the Pod until it completes successfully. If it fails, the RestartPolicy (which supports OnFailure and Never) determines whether to create a new Pod and rerun the CronJob.',

  STATEFULSETS_VOLUME_TEMPLATE_DESC:
    'Create a dedicated persistent volume for each Pod of the statefulset and mount it to the appropriate Pod',
  STATEFULSETS_ADD_VOLUME_TEMPLATE_DESC: 'Please add a volume template',
  STATEFULSETS_BASEINFO_DESC:
    'StatefulSet is used to manage stateful applications.',
  STATEFULSETS_SERVICE_CONFIG_DESC:
    "The cluster doesn't generate cluster IP for the service. In another word, a StatefulSet works with a headless service with selector. Therefore, the service is accessed internally through the service's endpoint IPs directly. StatefulSet is used for stateful applications such as master-slave serivces.",

  DAEMONSETS_BASEINFO_DESC:
    'The daemonset guarantees that a copy of the container is running on each host, often used to deploy logs, monitoring, or other system management applications for some clusters.',
  DAEMONSETS_VOLUME_DESC:
    'You can mount a HostPath, temporary volumes, or persistent volumes to a Pod of the daemonset.',

  JOBS_BASEINFO_DESC: '',
  JOBS_POD_TEMPLATE_DESC: 'Specify the Pod template to run in the job',
  JOBS_VOLUME_DESC:
    'You can mount a temporary volumes, or persistent volumes to a Pod of the job.',

  BACK_OFF_LIMIT: 'Backoff Limit',
  BACK_OFF_LIMIT_DESC:
    'Maximum number of retries before marking a Job as failed. The default value is 6.',
  JOB_PARALLELISM_LABEL: 'Parallelism',
  JOB_PARALLELISM_DESC: 'Number of Pods that run concurrently.',
  JOB_COMPLETION_LABEL: 'Completions',
  JOB_COMPLETION_DESC:
    'Number of Pods that need to run successfully before a Job is complete.',
  JOB_ACTIVE_DEADLINE: 'Active Deadline (s)',
  JOB_ACTIVE_DEADLINE_DESC:
    'Duration of a Job. The running Pods are terminated when the Job reaches the duration. The value must be a positive integer.',

  RESTART_POLICY_TIP:
    'RestartPolicy can only specify Never or OnFailure, when the job is not completed:<br/>* If RestartPolicy specifies Never, the job creates a new Pod when the Pod fails, and the failed Pod does not disappear.<br/>* If RestartPolicy specifies OnFailure, the job will internally restart the container when the Pod fails, instead of creating a new Pod.',

  RESTART_POLICY_NEVER_DESC: ' (Create a new Pod when a Pod fails)',
  RESTART_POLICY_ONFAILURE_DESC: ' (Restart the container when a Pod fails)',

  CRONJOBS_BASEINFO_DESC:
    'Basic information regarding the CronJob. You need to specify the name and schedule',
  CRONJOBS_VOLUME_DESC:
    'You can mount a temporary volumes, or persistent volumes to a Pod of the cronjob.',
  CRONJOB_CRON_DESC:
    'Set a schedule of a CronJob to be executed. For Cron syntax, see <a href="//en.wikipedia.org/wiki/Cron" target="_blank">Cron</a>. Kubernetes use UTC by default. You need to adjust the schedule according to your time zone.',

  START_DEADLINE_SECONDS_DESC: 'Deadline for starting a Job.',

  VOLUME_EMPTY_TIP: 'No created volumes, please',

  HOST_PATH_DESC:
    'HostPath allows you to mount the file system on the host to the Pod. If the Pod needs to use files on the host, you can use HostPath.',
  SELECT_SPECIFIC_KEYS_DESC:
    'Select specific keys to be mounted to the containers.',
  EMPTY_DIR_DESC:
    'Temporary volumes are assigned to the host along with the Pod. When a Pod is deleted from the host, the temporary volume is also deleted and the data of the volume is permanently deleted. <br /> Note: Deleting a container does not affect the temporary volume.',
  SELECT_VOLUME_TYPE_DESC: 'You can choose to an proper volume type to add',

  MOUNT_VOLUME_DESC:
    'For persistent storage volumes, select a volume that supports multi-node read-write mode (ROX or RWX). Otherwise, the pods update may fail because the pods are not on the same node. If you choose a single-node read-write (RWO) mode volume, you can also schedule the pods on the same node by node selection to avoid update errors.',

  CPU_REQUEST_TARGET_DESC:
    'Replicas will be increased when CPU usage exceeds this target value, on the contrary it will be decreased.',
  MEMORY_REQUEST_TARGET_DESC:
    'Replicas will be increased when memory usage exceeds this target value, on the contrary it will be decreased.',
  MIN_REPLICAS_DESC: 'Minimum value of the number of replicas',
  MAX_REPLICAS_DESC: 'Maximum value of the number of replicas',
  REPLICAS_PLACEHOLDER: 'Default: 1',

  ADD_VOLUME_TEMPLATE_DESC:
    'Use a volume template to mount a volume with the same lifecycle as the Pod.',

  MORE: 'More',
  VIEW_YAML: 'View YAML',

  REVISION_ROLLBACK_SELECT: 'Please select the version to be rolled back',
  REVISION_TITLE: '{name} revision',
  PROBE_TIME: '{delay}s delay, {timeout}s timeout',
  INITIAL_DELAY_DESC:
    'Delay time before the probe is initiated after container startup. The value must be an integer and the minimum value is 0.',
  TIMEOUT_PERIOD_DESC:
    'Timeout period after which the probe times out and is considered failed. The value must be an integer and the minimum value is 1.',
  CHECK_INTERVAL_DESC:
    'Interval between check attempts. The value must be an integer and the minimum value is 1.',
  SUCCESS_THRESHOLD_DESC:
    'Minimum number of consecutive successes for the probe to be considered successful after having failed. The minimum value is 1 and the value must be 1 for liveness and startup probes.',
  FAILURE_THRESHOLD_DESC:
    'Minimum number of consecutive failures for the probe to be considered failed after having succeeded. The minimum value is 1.',

  HPA_MSG:
    'Automatically autoscale the replicas according to CPU and memory usage. If both CPU and memory are specified, the replicas is added or deleted after any of the conditions are met.',
  PROBE_MSG:
    'Readiness Probe checks whether the container is ready to handle requests. Failure means the container should not receive any traffic from the agent even if it were running. Liveness Probe checks whether the container that configures it is running. If the Probe fails, the container will be killed and the restart policy will be implemented for the container.',
  WORKLOAD_REPLICA_MSG:
    'In the user-defined scope, if the number of Pods increases, the ReplicationController will terminate the extra Pods. Instead, the RC will create a new Pod that remains in the defined scope. For example, the RC will recreate the Pod on the node after Pod maintenance (such as kernel upgrades).',
  DEPLOYMENTS_REPLICA_DESC:
    'Deployment is used to describe a desired state that is expected to be reached by the application. It is mainly used to describe stateless applications. The number and state of replicas are maintained by the deployment controller, ensuring the state is consistent with the defined expected state. You can increase the replicas to meet higher loads. Rolling back the deployment version can eliminate program bugs. And you can create an autoscaler to flexibly handle the load in different scenarios.',
  STATEFULSETS_REPLICA_DESC:
    'StatefulSet is used to describe stateful applications, such as master-slave relations between replicas and persistent data storage. Like a Deployment, a StatefulSet creates identical replicas. The difference is that each replica has a persistent and unique identifier that it maintains across any rescheduling. You can use StatefulSets to achieve ordered deployment, deletion and rolling updates.',
  DAEMONSETS_REPLICA_DESC:
    'DaemonSet ensures that each node in the cluster runs a replica. When a node joins the cluster or leaves, the number of replicas is automatically adjusted to ensure that the number of replicas is the same as the number of nodes in the cluster. You can use DaemonSets to run storage services (GlusterFS, Ceph, etc.), log collection services (Fluentd, Logstash, etc.), and monitoring services.',

  SELECT_CONFIGMAP_DESC: 'Mount a ConfigMap to the containers.',
  SELECT_SECRET_DESC: 'Mount a Secret to the containers.',

  MONITORING_ALERT_DESC:
    'The current monitoring graph displays five replicas at most. You can click "View All Replicas" to view more monitoring graphs if the number of replicas exceeds five.',

  RESOURCE_REQUESTS: 'Request',
  RESOURCE_LIMITS: 'Limit',
  CONTAINER_CPU_DESC:
    "It's used as the judgment of resource allocation when scheduling containers. The container is allowed to be scheduled to the node only if the total amount of CPU that can be allocated on the node is equal or greater than the request value of the container CPU.",
  CONTAINER_MEMORY_DESC:
    "It's used as the judgment of resource allocation when scheduling containers. The container is allowed to be scheduled to the node only if the total amount of memory that can be allocated on the node is equal or greater than the request value of the container memory.",
  IMAGE_PULL_POLICY_ALWAYS: 'Pull Image Always',
  IMAGE_PULL_POLICY_IFNOTPRESENT: 'Use Local Image First',
  IMAGE_PULL_POLICY_NEVER: 'Use Local Image Only',
  IMAGE_PULL_POLICY_ALWAYS_DESC:
    'Pulls the image always when the Pod is created or updated.',
  IMAGE_PULL_POLICY_IFNOTPRESENT_DESC:
    'Pulls the image only when it does not exist locally.',
  IMAGE_PULL_POLICY_NEVER_DESC:
    'Uses a local image only. The container will become abnormal if the required image does not exist locally.',

  LIVENESS_CHECK_DESC: 'Checks whether the container is alive.',
  READINESS_CHECK_DESC:
    'Checks whether the container is ready to process requests.',
  STARTUP_CHECK_DESC: 'Checks whether the container is started successfully.',

  STARTUP_CHECK_TIP: 'Kubernetes v1.18 or later is required.',

  POD_CONDITION_INITIALIZED: 'Initialized',
  POD_CONDITION_INITIALIZED_DESC:
    'All Init containers have started successfully.',
  POD_CONDITION_READY: 'Ready',
  POD_CONDITION_READY_DESC:
    'The Pod is already running and can be accessed through the Service.',
  POD_CONDITION_CONTAINERSREADY: 'Containers Ready',
  POD_CONDITION_CONTAINERSREADY_DESC: 'Containers in the Pod are ready.',
  POD_CONDITION_PODSCHEDULED: 'Pod Scheduled',
  POD_CONDITION_PODSCHEDULED_DESC:
    'The Pod has been successfully assigned to a node.',
  POD_ASSIGNED_DESC:
    "The request value (namely, Request) set by the containers in the Pod is used as the basis for determining the resource allocation. Only when the amount available for allocation in the node is greater than or equal to the Pod's request value can the Pod be allocated to this node.",
  POD_DESC:
    'A Pod is the basic execution unit of a Kubernetes application, representing the smallest and simplest unit in the Kubernetes object model that you create or deploy.',
  POD_CREATE_DESC:
    'A Pod is the basic execution unit of a Kubernetes application, representing the smallest and simplest unit in the Kubernetes object model that you create or deploy.',
  FILL_IMAGE_DEFAULT_PORTS_DESC:
    'Whether to expose the default port of the image?',

  REQUEST_EXCCED:
    'Resource requests should not be greater than resource limits.',
  REQUEST_EXCCED_WORKSPACE:
    'Resource setting should not be greater than workspace resource limits.',
  REQUEST_EXCEED_LIMIT:
    'Resource requests cannot be greater than resource limits.',

  WORKLOAD_CONDITIONS: 'Conditions',
  WORKLOAD_CONDITION_AVAILABLE: 'Available',
  WORKLOAD_CONDITION_PROGRESSING: 'Progressing',

  VOLUME_OR_TEMPLATE_EMPTY:
    'You have enabled Collect Logs on Volumes. Please mount at least one volume or volume template and specify the directory of the logs.',
  VOLUME_EMPTY:
    'You have enabled Collect Logs on Volumes. Please mount at least one volume and specify the directory of the logs.',
  PROJECT_COLLECT_SAVED_DISABLED_DESC:
    'To enable this function, you need to enable Collect Logs on Volumes in Project Settings.',

  COLLECT_FILE_LOG_TIP:
    'Allow the system to collect container logs saved in a volume. To use this function, you need to mount a volume in read and write mode to a container and set the container to export logs to the volume.',

  ISTIO_PROTOCOL_TIP:
    'Select the protocol used by the service to fully utilize the Application Governance function. For example, select HTTP for an HTTP service.',

  CONTAINER_LOG_PATH_TIP:
    'Container log path relative to the volume mount path. Globbing patterns are supported. You can used commas (,) to separate multiple paths. For example, when the volume mount path is /data, log/*.log indicates that the container log files are all .log files in the /data/log directory.',
  SPECIFY_SUBPATH_TIP:
    'Specify a volume subpath to be mounted to the container.',
  DELETE_WORKLOAD_DESC:
    'You are about to delete the workload(s) {resource}. Please confirm whether to delete the associated resource?',
  SELECT_VOLUME_DESC:
    'Select an existing volume and mount it to the containers.',

  REDEPLOY_CONFIRM_DESC:
    'You are about to redeploy the workload {resource} ({type}). The pod will be redeployed according to the update strategy, and your business may be temporarily interrupted.',

  CONTAINER_SECURITY_CONTEXT_DESC:
    'Customize the privilege settings of the container.',
  POD_SECURITY_CONTEXT_DESC: 'Customize the Pod privilege settings.',

  POD_SECURITY_CONTEXT_TIP:
    'If User, User Group, and SELinux Context settings are defined in both Pod Security Context and Container Security Context, the Container Security Context settings will override the Pod Security Context settings.',

  PRIVILEGED_MODE: 'Privileged Mode',
  PRIVILEGED_MODE_DESC:
    'Runs container processes as the root user of the host.',
  ALLOW_PRIVILEGE_ESCALATION: 'Allow Privilege Escalation',
  ALLOW_PRIVILEGE_ESCALATION_DESC:
    'Allows container processes to acquire more privileges than the parent process. This option is enabled by default when the privileged mode is enabled.',
  ROOT_DIRECTORY_READONLY: 'Root Directory Read-Only',
  ROOT_DIRECTORY_READONLY_DESC:
    'Sets the root directory of the container file system to read-only.',

  RUN_AS_NON_ROOT: 'Run as Non-root',
  RUN_AS_NON_ROOT_DESC:
    'Checks whether the container is to be run by the root user before starting the container. If yes, the container will not be started.',
  RUN_AS_USER_DESC:
    'UID to run the entrypoint of the container process. The default value is the UID specified in the image metadata.',
  RUN_AS_USER_GROUP_DESC:
    'GID to run the entrypoint of the container process. The default value is the container runtime default GID.',

  WORKLOAD_CREATE_DESC:
    'A workload is usually the actual carrier for accessing a Service, and is also the actual running carrier for system applications such as node log collection and monitoring. A workload is an abstract model for a group of Pods.',

  CONTAINER_RESOURCE_LIMIT_TIP:
    'Set the resource limits and requests of the container so that the container is scheduled to appropriate nodes.',

  COMPARE_WITH: 'Comparison with the previous version {version}',
  REVISION_DESC:
    'After the resource template of workload is changed, a new log will be generated and Pods will be rescheduled for version update. The latest 10 versions will be saved by default. You can implement a redeployment based on the change log.',

  CLUSTER_CONTAINER_IMAGE_DIFF_DESC:
    'Set different containers in different clusters according to needs',
  CLUSTER_SERVICE_DIFF_DESC:
    'Different service ports can be set in different clusters',
  CLUSTER_ENV_DIFF_DESC:
    'Different container enviroments can be set in different clusters',
  POD_SCALE_DESC: 'The number of Pod instances that can be scaled',
  REPLICAS_AVAILABLE: 'Available',
  REPLICAS_EXPECTED: 'Expected',

  SYNC_HOST_TIMEZONE_DESC:
    'Synchronize the time zone of the container with that of the host.',
  HOSTPATH_TIP:
    'Use a HostPath volume to mount a file or directory in the host file system to the containers.',

  DEPLOY_PLACEMENT_TIP_TITLE: 'What is Deployment Location?',
  DEPLOY_PLACEMENT_TIP_VALUE:
    'You can deploy Pods on different clusters and define the number of replicas deployed. The Federation Controller Manager schedules Pods on different clusters in a unified way and synchronizes status.',
  CERT_ERROR: 'Certificate error.',
  IGNORE_CERT_WARN_DESC:
    'Ignoring certificate verification may cause password disclosure.',
  INVALID_PROJECT: 'Invalid project.',
  DESC_CREATE_CONFIGMAP_SECRET:
    'If there is no suitable configuration file or key reference, you can',
  // Pods Page
  NODE_IP: '{node} ({ip})',

  // Jobs
  JOBS: 'Jobs',
  CRONJOBS: 'CronJobs',
  SCHEDULE: 'Schedule',

  // CronJobs
  ADD_VOLUME: 'Add Volume',
  RESTART_POLICY_DESC:
    'The Pod restart policy. The value can be Never or onFailure.',
  MOUNT_VOLUMES: 'Mount Volumes',
}
