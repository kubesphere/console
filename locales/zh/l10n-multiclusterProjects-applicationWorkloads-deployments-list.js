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
  WORKLOAD_DESC: '工作负载（Workload）用于处理业务请求，可包含一个或多个容器组。日志、监控等系统功能也是由工作负载实现的。',
  // List
  DEPLOYMENT_EMPTY_DESC: '请创建一个部署。',
  UPDATING: '更新中',
  // List > Edit Information
  // List > Edit YAML
  // List > Delete
  // List > Create
  // List > Create > Basic Information
  NEXT: '下一步',
  INVALID_PROJECT: '项目无效。',
  // List > Create > Pod Settings > Replica Scheduling Mode
  REPLICA_SCHEDULING_MODE: '副本调度模式',
  SPECIFY_REPLICAS: '指定副本数量',
  WEIGHTS: '权重',
  SPECIFY_WEIGHTS: '指定权重',
  SPECIFY_WEIGHTS_DESC: '设置容器组副本总数和每个集群的权重。容器组副本将根据权重调度到每个集群。',
  SPECIFY_REPLICAS_DESC: '手动设置每个集群的容器组副本数。',
  REPLICA_LOW_SI: '副本',
  REPLICA_LOW_PL: '副本',
  WEIGHT: '权重',
  TOTAL_REPLICAS: '副本总数',
  // List > Create > Pod Settings > Add Container > Container Settings
  COST: '占用',
  ADD_CONTAINER: '添加容器',
  ADD_CONTAINER_DESC: '自定义容器的设置以创建容器。',
  CONTAINERS: '容器',
  IMAGE_TIME_SIZE_LAYER: '更新于 {time}',
  IMAGE_DESC: '如需使用私有镜像服务，您需要先创建镜像服务保密字典。<a href={link} target="_blank">了解更多</a>',
  IMAGE_PLACEHOLDER: '镜像名称或路径，例如 nginx:latest',
  IMAGE_EMPTY: '请设置镜像。',
  ENTER_POSITIVE_INTEGER_DESC: '请输入一个正整数。',
  TOTAL_REPLICAS_EMPTY_DESC: '请输入所有集群容器组副本的总数。',
  CONTAINER_NAME: '容器名称',
  CONTAINER_TYPE: '容器类型',
  USE_DEFAULT_PORTS: '使用默认端口',
  USE_IMAGE_DEFAULT_PORTS: '使用默认镜像端口',
  NO_DEFAULT_PORT: '暂无默认端口配置',
  REGISTRY: '镜像服务',
  SET_IMAGE_DESC: '为容器设置镜像。',
  WORKER_CONTAINER: '工作容器',
  CONTAINER_RESOURCE_LIMIT_TIP: '设置容器的资源上限与资源预留，以将容器调度到合适的节点上。',
  GPU_TYPE: 'GPU 类型',
  GPU_LIMIT: 'GPU 上限',
  NVIDIA_COM_GPU: 'NVIDIA GPU',
  NO_LIMIT: '无上限',
  NO_REQUEST: '无预留',
  NO_RESOURCE_LIMIT: '无资源上限',
  IGNORE_AND_RETRY: '忽略并重试',
  AVAILABLE_QUOTAS: '可用配额',
  // List > Create > Pod Settings > Add Container > Port Settings
  PORT_SETTINGS: '端口设置',
  ISTIO_PROTOCOL_TIP: '选择服务实际使用的协议以充分利用应用治理功能。例如，为 HTTP 服务选择 HTTP 协议。',
  REQUIRED: '必填',
  // List > Create > Pod Settings > Add Container > Use Local Image First
  IMAGE_PULL_POLICY_ALWAYS: '每次都拉取镜像',
  IMAGE_PULL_POLICY_NEVER: '仅使用本地镜像',
  IMAGE_PULL_POLICY_ALWAYS_DESC: '在容器组创建及更新时，每次都尝试拉取新的镜像。',
  IMAGE_PULL_POLICY_IFNOTPRESENT_DESC: '如果本地存在所需的镜像，则优先使用本地镜像。',
  IMAGE_PULL_POLICY_NEVER_DESC: '仅使用本地镜像。如果本地不存在所需的镜像，则会导致容器异常。',
  IMAGE_PULL_POLICY_IFNOTPRESENT: '优先使用本地镜像',
  // List > Create > Pod Settings > Add Container > Health Check
  LIVENESS_CHECK: '存活检查',
  READINESS_CHECK: '就绪检查',
  STARTUP_CHECK: '启动检查',
  LIVENESS_CHECK_DESC: '检查容器是否存活。',
  READINESS_CHECK_DESC: '检查容器是否可以处理请求。',
  STARTUP_CHECK_DESC: '检查容器是否启动成功。',
  ADD_PROBE: '添加探针',
  COMMANDS: '命令',
  HEALTH_CHECK: '健康检查',
  STARTUP_CHECK_TIP: '需要 Kubernetes v1.18 或以上版本。',
  HTTP_PATH_EMPTY: '请设置 HTTP 检查的路径。',
  // List > Create > Pod Settings > Add Container > Life Management
  LIFECYCLE_MANAGEMENT: '生命周期管理',
  LIFECYCLE_MANAGEMENT_DESC: '设置容器启动后或终止前需要执行的动作，以进行环境检查或体面终止。',
  POSTSTART_ACTION: '启动后动作',
  PRESTOP_ACTION: '终止前动作',
  POSTSTART_ACTION_DESC: '设置容器启动后需要执行的动作。',
  PRESTOP_ACTION_DESC: '设置容器终止前需要执行的动作。',
  ADD_ACTION: '添加动作',
  // List > Create > Pod Settings > Add Container > Environment Variables
  ADD_ENVIRONMENT_VARIABLE: '添加环境变量',
  KEY_IN_RESOURCE: '资源中的键',
  LABEL_TYPE: '{label} <span style="{style}">（{type}）</span>',
  RESOURCE: '资源',
  CREATE_CONFIGMAP_SECRET_DESC: '如果没有配置字典或保密字典满足要求，您可以',
  CREATE_CONFIG: '创建配置字典',
  OR: '或',
  CREATE_SECRET: '创建保密字典。',
  DEFAULT_REPOSITORY: '默认镜像仓库',
  SET_DEFAULT_REPOSITORY: '设置默认镜像仓库',
  SET_AS_DEFAULT_REPOSITORY_DESC: '设置为默认镜像仓库后，如果没有特殊指定，系统将使用默认镜像仓库创建应用负载。一个项目中仅允许设置一个默认镜像仓库。',
  SET_AS_DEFAULT_REPOSITORY: '设为默认镜像仓库',
  SET_DEFAULT_REPO_SUCCESSFUL: '设置默认镜像仓库成功',
  // List > Create > Pod Settings > Add Container > Container Security Context
  CONTAINER_SECURITY_CONTEXT: '容器安全上下文',
  CONTAINER_SECURITY_CONTEXT_DESC: '自定义容器的权限设置。',
  PRIVILEGED_MODE: '特权模式',
  PRIVILEGED_MODE_DESC: '以主机上的 root 用户运行容器进程。',
  ALLOW_PRIVILEGE_ESCALATION: '允许特权提升',
  ALLOW_PRIVILEGE_ESCALATION_DESC: '允许容器进程获取比父进程更多的特权。当特权模式启用时，此选项目默认启用。',
  ROOT_DIRECTORY_READONLY: '根目录只读',
  ROOT_DIRECTORY_READONLY_DESC: '将容器文件系统的根目录设置为只读。',
  USER_AND_USER_GROUP: '用户和用户组',
  USER_GROUP: '用户组',
  RUN_AS_NON_ROOT: '仅允许非 root 用户运行',
  RUN_AS_NON_ROOT_DESC: '启动容器之前检查容器是否将以 root 用户运行。如果容器将以 root 用户运行则不启动容器。',
  RUN_AS_USER_DESC: '执行容器进程入口点的 UID。默认为镜像元数据中指定的 UID。',
  RUN_AS_USER_GROUP_DESC: '执行容器进程入口点的 GID。默认为容器运行时的默认 GID。',
  SELINUX_CONTEXT: 'SELinux 上下文',
  CAPABILITIES: '权能',
  DROP: '移除',
  ACCESS_CONTROL: '访问控制',
  LEVEL: '等级',
  // List > Create > Pod Settings > Add Container > Synchronize Host Timezone
  SYNC_HOST_TIMEZONE_DESC: '同步容器与主机的时区。',
  SYNC_HOST_TIMEZONE: '同步主机时区',
  // List > Create > Pod Settings > Update Strategy
  UPDATE_STRATEGY: '更新策略',
  ROLLING_UPDATE_RECOMMENDED: '滚动更新（推荐）',
  SIMULTANEOUS_UPDATE: '同时更新',
  ROLLINGUPDATE_DESC: '用新容器组副本逐步替换旧容器组副本。升级过程中业务流量会负载均衡到新旧容器组副本上，业务不会中断。',
  SIMULTANEOUS_UPDATE_DESC: '删除全部旧容器组副本再创建新容器组副本。升级过程中业务会中断。',
  ENTER_INTEGER_OR_PERCENTAGE: '请输入整数或百分比。',
  MAX_EXTRA_EMPTY: '请设置更新过程中允许的多余容器组副本的最大数量或百分比。',
  // List > Create > Pod Settings > Pod Security Context
  POD_SECURITY_CONTEXT: '容器组安全上下文',
  POD_SECURITY_CONTEXT_DESC: '自定义容器组的权限设置。',
  POD_SECURITY_CONTEXT_TIP: '如果容器组安全上下文和容器安全上下文中都设置了用户、用户组和 SELinux 上下文，容器安全上下文中的设置将覆盖容器组安全上下文中的设置。',
  // List > Create > Pod Settings > Pod Scheduling Rules
  POD_SCHEDULING_RULES: '容器组调度规则',
  POD_SCHEDULING_RULES_DESC: '设置容器组副本调度到节点的规则。',
  DEFAULT_RULES: '默认规则',
  DEFAULT_RULES_DESC: '按照默认的规则将容器组副本调度到节点。',
  DECENTRALIZED_SCHEDULING: '分散调度',
  CUSTOM_RULES: '自定义规则',
  CUSTOM_RULES_DESC: '按照自定义的规则将容器组副本调度到节点。',
  DECENTRALIZED_SCHEDULING_DESC: '尽可能将容器组副本调度到不同的节点上。',
  CENTRALIZED_SCHEDULING_DESC: '尽可能将容器组副本调度到同一节点上。',
  CENTRALIZED_SCHEDULING: '集中调度',
  SCHEDULE_WITH_TARGET: '与目标调度到一起',
  SCHEDULE_AWAY_FROM_TARGET: '远离目标调度',
  MATCH_IF_POSSIBLE: '尽可能匹配',
  MUST_MATCH: '必须匹配',
  TARGET: '目标',
  STRATEGY: '策略',
  // List > Create > Pod Settings > Pod Grace Period
  POD_GRACE_PERIOD: '容器组优雅终止',
  POD_GRACE_PERIOD_DESC: '设置容器终止前等待的时间，超时后容器将强制终止。',
  TERMINATION_GRACEPERIOD_SECONDS: '终止宽限时间 (s)',
  // List > Create > Pod Settings > Add Metadata
  ADD_METADATA: '添加元数据',
  POD_ADD_METADATA_DESC: '为容器组副本添加元数据。',
  // List > Create > Storage Settings
  STORAGE_SETTINGS: '存储设置',
  READ_ONLY_LOW: '只读',
  READ_AND_WRITE_LOW: '读写',
  // List > Create > Storage Settings > Mount Volume
  MOUNT_VOLUME: '挂载卷',
  WORKLOAD_MOUNT_VOLUME_DESC: '为容器挂载持久卷、临时卷或 HostPath 卷。',
  SELECT_PERSISITENT_VOLUME_CLAIM: '选择持久卷声明',
  SELECT_PERSISITENT_VOLUME_CLAIM_DESC: '将根据持久卷声明创建的持久卷挂载到容器。',
  CAPACITY: '容量',
  PVC_NOT_SELECT: '请选择一个持久卷声明。',
  TEMPORARY_VOLUME: '临时卷',
  VOLUME_NAME: '卷名称',
  VOLUME_NAME_EMPTY: '请为卷设置名称。',
  HOST_PATH_EMPTY: '请为卷设置主机路径。',
  CONTAINER_NOT_SELECTED: '请将卷挂载到至少一个容器。',
  NOT_MOUNT: '不挂载',
  HOSTPATH_VOLUME: 'HostPath 卷',
  HOSTPATH_TIP: '使用 HostPath 卷将主机文件系统中的文件或目录挂载到容器中。',
  HOST_PATH: '主机路径',
  READ_AND_WRITE: '读写',
  READ_ONLY: '只读',
  // List > Create > Storage Settings > Mount Configmap or Secret
  MOUNT_CONFIGMAP_OR_SECRET: '挂载配置字典或保密字典',
  MOUNT_CONFIGMAP_OR_SECRET_DESC: '为容器挂载配置字典或保密字典。',
  CONFIGMAP: '配置字典',
  SELECT_CONFIGMAP_DESC: '将配置字典挂载到容器。',
  READ_WRITE_MOUNT_EMPTY: '请指定读写方式及挂载路径。',
  SELECT_SPECIFIC_KEYS: '选择特定键',
  SELECT_SPECIFIC_KEYS_DESC: '选择需要挂载到容器的特定键。',
  SELECT_SECRET_DESC: '将保密字典挂载到容器。',
  CONFIGMAP_NOT_SELECT: '请选择配置字典。',
  SECRET_NOT_SELECT: '请选择保密字典。',
  NO_AVAILABLE_RESOURCE: '未发现可用资源',
  // List > Create > Advanced Settings
  SELECT_NODES: '选择节点',
  SELECT_NODES_DESC: '将容器组副本分配给特定的节点。您可以使用标签选择节点或手动指定节点。',
  ADD_NODE_SELECTOR: '添加节点选择器',
  ADD_METADATA_DESC: '为资源添加元数据。',
  KEY: '键',
  VALUE: '值',
  ADVANCED_SETTINGS: '高级设置',
  DUPLICATE_LABELS: '无法添加重复标签。',
  // List > Create > Advanced Settings > Specify Node
  WORKLOAD_SPECIFY_NODE_DESC: '将容器副本分配给特定节点。',
  // List > Create > Cluster Differences
  CLUSTER_DIFF: '集群差异设置',
  CLUSTER_DIFF_CONTAINER_SETTINGS_DESC: '在不同的集群中使用不同的容器设置。',
  CLUSTER_DIFF_PORT_SETTINGS_DESC: '为不同集群中的容器设置不同的端口。',
  CLUSTER_DIFF_ENVIRONMENT_VARIABLES_DESC: '为不同集群中的容器设置不同的环境变量。',
  CONTAINER_IMAGE: '容器镜像'
};