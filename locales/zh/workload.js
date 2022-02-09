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
  CONTAINER_IMAGE: '容器镜像',
  MOUNT_PATH_EMPTY: '请输入挂载路径。',
  IMAGE_TIME_SIZE_LAYER_PL: '更新于 {time}，{size}，{layer} 层',
  IMAGE_TIME_SIZE_LAYER_SI: '更新于 {time}，{size}，{layer} 层',
  HTTP_PATH_EMPTY: '请设置 HTTP 检查的路径。',
  DUPLICATE_LABELS: '无法添加重复标签。',
  REVISION_RECORD: '修改记录',
  INVALID_PROJECT: '项目无效。',
  ADD_RULE: '添加规则',
  GPU_SETTING_TIP: '设置 GPU 限制为空即为取消该限制。',
  'Access Mode': '访问模式',
  'Add argument': '添加参数',
  'Add command': '添加命令',
  'Add Container': '添加容器',
  'Add Existing Volume': '添加已有存储卷',
  'Add HostPath': '添加 HostPath',
  ADD_LABEL: '添加标签',
  'Add Labels': '添加标签',
  'Add new container': '添加新的容器',
  'Add Probe': '添加探针',
  'Add Temporary Volume': '添加临时存储卷',
  'Add Volume': '添加存储卷',
  'Add Volume Template': '添加存储卷模板',
  'Adding new contianer': '正在添加新的容器',
  'Additional metadata settings for resources such as Labels and Annotations.':
    'Additional metadata settings for resources such as Labels and Annotations.',
  'Additional metadata settings for resources.': '对资源进行额外的元数据设置',
  WORKLOAD_ADD_METADATA_DESC: '为工作负载添加元数据。',
  'Advanced Options': '高级选项',
  'Applied to the workload': '应用于工作负载',
  Argument: '参数',
  ARGUMENTS: '参数',
  'Available number of nodes scheduled': '可用节点数',
  'Can be found by node IP or node name': '可以通过节点 IP 或者节点名称查找',
  capacity: '容量',
  'Cluster Resource Status': '集群资源状态',
  'Coding Mode': '代码模式',
  'Collecting file log': '收集落盘日志',
  Commands: '命令',
  'Config Template': '配置模板',
  'Container Config': '容器配置',
  'Container CPU Resource Request, 1 Core = 1000m':
    '容器的 CPU 资源预留值, 1核 = 1000m',
  'Container Memory Resource Request': '容器的 内存 资源预留值',
  'Container Setting': '容器设置',
  ContainerCreating: '容器创建中',
  ContainerNotReady: '容器没有准备就绪',
  ContainersNotInitialized: '容器未初始化',
  ContainersNotReady: '容器没有准备就绪',
  'CPU(m)': 'CPU(m)',
  CrashLoopBackOff: '容器退出，kubelet 正在将它重启',
  CreateContainerConfigError: '不能创建 kubelet 使用的容器配置',
  CreateContainerError: '创建容器失败',
  created: '已创建',
  CronJob: '定时任务',
  'CronJob Settings': '定时任务设置',
  'Current number of nodes scheduled': '当前节点数',
  'Current Revision': '当前版本',
  'Current Stage(phase)': 'Current Stage(phase)',
  'Current Utilization': '当前使用率',
  DeploymentPaused: '部署中止',
  DeploymentResumed: '部署已恢复',
  'Desired number of nodes scheduled': '期望节点数',
  'Desired Replicas': '期望副本',
  DockerDaemonNotReady: 'Docker 还没有完全启动',
  EDIT_CONTAINER: '编辑容器',
  EmptyDir: '临时存储卷',
  Environment: '环境变量',
  'environment variables': '环境变量',
  ErrImageNeverPull: '当前策略禁止拉取镜像',
  ErrImagePull: '镜像拉取失败',
  'Exec Command Check': 'Exec Command Check',
  'Every Day': 'Every Day',
  'Every Hour': 'Every Hour',
  'Every Month': 'Every Month',
  'Every Week': 'Every Week',
  RUNNING_RECORDS: '运行记录',
  FailedCreate: '创建失败',
  FailedDelete: '删除失败',
  'File List': '文件列表',
  'for example': '例如',
  FoundNewReplicaSet: '发现新副本',
  HORIZONTAL_POD_AUTOSCALING: '容器组水平自动扩缩',
  'Host Path': '主机路径',
  'Image Name': '镜像名称',
  ImageInspectError: '无法校验镜像',
  ImagePullBackOff: '正在重试拉取镜像',
  'Initial Delay': '初始延迟',
  'Instance Status': '实例状态',
  'Invalid image': 'Invalid image',
  'Invalid name': '名称格式不合法。{message}',
  'Invalid pod': '容器组数量格式不合法',
  InvalidImageName: '无法解析镜像名称',
  'is running': '正在运行',
  Job: '任务',
  'Job Settings': '任务设置',
  'Job Template': '任务模板',
  LABEL_EXIST_DESC: '标签已存在，请输入其他标签。',
  'Labels cannot be empty': '标签不能为空',
  layers: '层级',
  'log path relative to container mount path': '日志路径相对于容器挂载路径',
  'm.internalLifecycle.PreStartContainer': '执行 hook 报错',
  MAX_SURGE_POD_VALIDATOR: 'MAX_SURGE_POD_VALIDATOR',
  'Maximum number of replicas': '副本数量的上限',
  'Memory Target Utilization': '内存目标使用率',
  'min replicas number should not be greater than max replicas number':
    '最大副本数应不小于最小副本数',
  MinimumReplicasAvailable: '最小副本可用',
  MinimumReplicasUnavailable: '最小副本不可用',
  Mount: '挂载',
  'Mount point': '挂载点',
  'Mount Temporary Volume': '挂载临时存储卷',
  'Mount Volume': '挂载存储卷',
  mounted: '已挂载',
  NetworkPluginNotReady: '网络插件还没有完全启动',
  'New Volume': '新建存储卷',
  NewReplicaSetAvailable: '可用新副本',
  NewReplicaSetCreated: '已创建新副本',
  'No related resources found with the current workload(s)':
    '当前工作负载下没有关联的资源',
  'No Request': '不预留',
  'No resource limits': 'No resource limits',
  'Please add at least one volume': '请至少添加一个存储卷',
  'Please add at least one volume or volume template':
    '请至少添加一个存储卷或存储卷模板',
  'Please input command': 'Please input command',
  'Please input a schedule.': 'Please input a schedule.',
  'Please input mount point': '请输入挂载点',
  'Please input port': '请输入端口',
  'Please select a storage class': '请选择存储卷类型',
  'Please select protocol': '请选择协议',
  'Please specify an image': '请指定镜像',
  'Pod CPU Request': '容器组CPU请求',
  'Pod Decentralized Deployment': 'Pod Decentralized Deployment',
  'Pod Default Deployment': 'Pod Default Deployment',
  'Pod Memory Request': '容器组内存预留',
  'Pod replicas will be deployed on different nodes as much as possible.':
    '容器组副本将会尽量分散在不同的节点中',
  'Pod replicas will be deployed on the same node as much as possible.':
    '容器组副本将会尽量部署在同一节点上',
  'Pod replicas will be deployed according to user customization.':
    '容器组副本将根据用户自定义规则部署',
  'Pod Security Context': '容器组 Security Context',
  'Pod Status': '容器组运行状态',
  POD_STATUS_ANALYSIS: '容器状态分析',
  POD_REASON_FAILEDCREATE: '创建失败',
  POD_REASON_FAILEDDELETE: '删除失败',
  POD_REASON_SUCCESSFULCREATE: '创建成功',
  POD_REASON_SUCCESSFULDELETE: '删除成功',
  PodInitializing: '容器组初始化中',
  'Pods List': '容器组列表',
  Port: '端口',
  'Port(s)': '端口',
  ports: '端口',
  PostStartHookError: '执行 hook 报错',
  'Private Registry': '私有仓库',
  Privileged: '特权模式',
  ProgressDeadlineExceeded: '处理超时',
  Protocols: '协议',
  'Read Write Mode': '读写模式',
  RegistryUnavailable: '无法连接镜像仓库',
  REPLICA_STATUS: '副本运行状态',
  'Replicas Number': '副本数量',
  ReplicaSetCreateError: '新建副本错误',
  ReplicaSetUpdated: '副本已更新',
  'request CPU should not be greater than limit CPU':
    '最小使用 CPU 值应不大于最大使用 CPU 值',
  'request memory should not be greater than limit memory':
    '最小使用内存值应不大于最大使用内存值',
  'Request Type': '请求类型',
  'Resource Info': '资源信息',
  'Resource Limit': '资源限制',
  'Resource limits remaining quota': '资源限制剩余配额',
  'Resource Request': '资源预留',
  'Resource requests remaining quota': '资源预留剩余配额',
  Revision: '版本',
  'Revision Rollback': '版本回退',
  'Rollback Revisions': '回退版本',
  RollingUpdate: '滚动更新',
  RunContainerError: '启动容器失败',
  Schedule: '定时计划',
  'Select by Node': '指定节点',
  RESOURCE: '资源',
  'Service Configuration': '服务配置',
  'Service Labels': '服务标签',
  'Set Mount Path': '设置挂载路径',
  'Storage Size': '存储大小',
  'Strategy Type': '策略类型',
  SuccessfulCreate: '创建成功',
  SuccessfulDelete: '删除成功',
  'Sure to delete the workload(s)?': '确认删除工作负载',
  'target port': '目标端口',
  'TCP Port Check': 'TCP Port Check',
  'Temporary Volume': 'Temporary Volume',
  'Timeout(s)': 'Timeout(s)',
  'The concurrency policy setting.': 'The concurrency policy setting.',
  'The minimum of the replicas that can be set by HPA':
    '弹性伸缩可以设置的副本数量的下限',
  'The number of failed jobs allowed to be retained.':
    'The number of failed jobs allowed to be retained.',
  'The number of successful jobs allowed to be retained.':
    'The number of successful jobs allowed to be retained.',
  'UI Mode': '界面模式',
  'Update Strategy': '更新策略',
  'Volume Name': 'Volume Name',
  'Volume Source': '存储卷来源',
  DISK_LOG_COLLECTION_Q: 'What is disk log collection?',
  'What is Disk Log Collection?': '什么是落盘日志收集？',
  'Worker Container': 'Worker Container',
  Workload: '工作负载',
  'Not Limited': '未限制',
  Cost: '占用',
  AVAILABLE_QUOTAS: '可用配额',
  WORKLOAD_REASON_DEPLOYMENTPAUSED: '部署中止',
  WORKLOAD_REASON_DEPLOYMENTRESUMED: '部署已恢复',
  WORKLOAD_REASON_FAILEDCREATE: '创建失败(FailedCreate)',
  WORKLOAD_REASON_FOUNDNEWREPLICASET: '发现新副本集',
  WORKLOAD_REASON_MINIMUMREPLICASAVAILABLE: '达到最小可用副本数量',
  WORKLOAD_REASON_MINIMUMREPLICASUNAVAILABLE: '未达到最小可用副本数量',
  WORKLOAD_REASON_NEWREPLICASETAVAILABLE: '新副本集可用',
  WORKLOAD_REASON_NEWREPLICASETCREATED: '已创建副本集',
  WORKLOAD_REASON_PROGRESSDEADLINEEXCEEDED: '进程超时',
  WORKLOAD_REASON_REPLICASETCREATEERROR: '副本集创建错误',
  WORKLOAD_REASON_REPLICASETUPDATED: '副本集已更新',
  Workloads: '工作负载',
  DEPLOYMENT_DESC:
    'Deployment provides fine-grained management of common applications in KubeSphere. Deployment configuration describes the desired state of specific components of an application as pod templates.',
  STATEFULSET_DESC:
    'Statefulset is used to manage stateful applications, manages the deployment and scaling of a set of pods, and provides guarantees about the ordering and uniqueness of these pods.',
  DAEMONSET_DESC:
    'A daemonset ensures that all (or some) Nodes run a copy of a pod. Typically, a daemonset is used to running a logs collection, monitoring daemon or other system management applications.',
  CRONJOB_NAME_DESC:
    '最长 52 个字符，只能包含小写字母、数字及分隔符("-")，且必须以小写字母或数字开头及结尾',
  CRONJOB_NAME_TOO_LONG: '最长 52 个字符',
  UPDATE_STRATEGY_DESC:
    '配置升级过程中替换容器组的策略 <a href="{link}" target="_blank">了解更多</a>',
  MAX_DEPLOY_UNAVAILABLE_POD_DESC: '升级过程中不可用副本的最大数量或百分比',
  ROLLING_UPDATE_POD_TIP:
    '更新时，会根据当前容器组的副本数对最小可用及最大数量进行限制；最小容器组数不可以超过当前副本数，且最大容器组数量不能超过当前副本数的2倍。',
  STATEFULSET_PARTITION_DESC:
    '当更新有状态副本集时，将更新具有大于或等于 partition 的序数的所有容器组',
  IMAGE_REGISTRY_PLACEHOLDER: '请选择镜像仓库密钥',
  REPLICAS_DESC: '{module}将会被创建，由它维护集群中容器组的所需数量',
  VOLUME_SUB_TEXT: 'Volumes used by the containers of the workload',
  EMPTYDIR_DESC: 'Temporary storage created for the workload',
  HOSTPATH_DESC:
    'A HostPath volume mounts a file or directory from the host node’s filesystem into your pod.',
  DEPLOYMENTS_BASEINFO_DESC:
    '您可以给部署起一个名字，以便在使用的时候容易区分。',
  DEPLOYMENT_POD_TEMPLATE_DESC:
    '工作负载可以根据容器组模板以及您设置的副本数量，自动生成指定数量的容器组',
  DEPLOYMENTS_VOLUME_DESC:
    '可以将同一个临时存储卷或持久化存储卷挂载至部署的容器组的各个副本内。',
  DEPLOYMENT_LABEL_SETTINGS_DESC:
    '标签是一个或多个关联到资源如容器组上的键值对，我们通常通过标签来识别、组织或查找资源对象',
  DEPLOYMENT_NODE_SELECT_DESC:
    '通过使用选择器将容器组调度到期望运行的节点上，这些选择器是一组或多组键值对匹配节点标签。',
  DEPLOYMENT_JOB_SETTINGS_DESC:
    '您可以在此配置任务 (Job) 的 Job Spec 格式，Job Controller 负责根据 Job Spec 创建 Pod，并持续监控 Pod 的状态，直至其成功结束。如果失败，则根据 RestartPolicy（支持 OnFailure 和 Never）决定是否创建新的 Pod 再次重试任务。',
  DEPLOYMENT_CRONJOB_SETTINGS_DESC:
    '您可以在此配置定时任务 (CronJob) 的 Job Spec 格式，Job Controller 负责根据 Job Spec 创建 Pod，并持续监控 Pod 的状态，直至其成功结束。如果失败，则根据 RestartPolicy（支持 OnFailure 和 Never）决定是否创建新的 Pod 再次重试任务。',
  STATEFULSETS_VOLUME_TEMPLATE_DESC:
    '为有状态副本集的每个容器组创建专属的持久化存储卷，并挂载至相应的容器组',
  STATEFULSETS_BASEINFO_DESC:
    '您可以给有状态副本起一个名字，以便在使用的时候容易区分。',
  STATEFULSETS_SERVICE_CONFIG_DESC:
    '集群不为服务生成 IP，集群内部通过服务的后端 Endpoint IP 直接访问服务。此类型适合后端异构的服务，比如需要区分主从的服务。',
  DAEMONSETS_BASEINFO_DESC:
    '守护进程集保证在每个主机上都运行一个容器副本，常用来部署一些集群的日志、监控或者其他系统管理应用。',
  DAEMONSETS_VOLUME_DESC:
    '可将 HostPath，临时存储卷，持久化存储卷挂载至守护进程集的容器组内。',
  JOBS_BASEINFO_DESC: '',
  JOBS_POD_TEMPLATE_DESC: '指定任务中运行的容器组模板',
  JOBS_VOLUME_DESC: '可以将临时存储卷，持久化存储卷挂载至任务的容器组内。',
  RESTART_POLICY_TIP:
    'RestartPolicy 只能指定 Never 或 OnFailure，当任务未完成的情况下：<br/>* 如果 RestartPolicy 指定 Never，则任务会在容器组出现故障时创建新的容器组，且故障容器组不会消失。<br/>* 如果 RestartPolicy 指定 OnFailure，则任务会在容器组出现故障时其内部重启容器，而不是创建容器组。',
  CRONJOBS_BASEINFO_DESC: '创建定时任务所需的基本信息，需指定名称与定时计划',
  CRONJOBS_VOLUME_DESC:
    '可以将临时存储卷，持久化存储卷挂载至定时任务的容器组内。',
  VOLUME_EMPTY_TIP: 'No created volumes, please',
  HOST_PATH_DESC:
    'HostPath 允许挂载主机上的文件系统到容器组里面去。如果容器组需要使用主机上的文件，可以使用 HostPath。',
  EMPTY_DIR_DESC:
    '临时存储卷随 Pod 被分配在主机上。当 Pod（不管任何原因）从主机上被删除时，临时存储卷也同时会删除，存储卷的数据也将永久删除。<br />注：删除容器不影响临时存储卷。',
  SELECT_VOLUME_TYPE_DESC: '您可以根据需要选择适合您的存储卷类型进行添加',
  MOUNT_VOLUME_DESC:
    '持久化存储卷请选择支持多节点读写模式 (ROX 或者 RWX) 的存储卷，否则可能因容器组不在同一节点导致容器组更新失败。如果您选择了单节点读写 (RWO) 模式的存储卷您也可以通过节点选择将容器组安排在同一节点上来避免因存储卷访问模式造成的更新错误。',
  REVISION_ROLLBACK_SELECT: '请选择要回退的版本',
  REVISION_TITLE: '{name}版本',
  PROBE_MSG:
    'Readiness Probe 检查容器是否准备好处理请求。失败意味着容器不应从代理接收任何流量，即使它正在运行。Liveness Probe 检查配置它的容器是否仍在运行。如果活态探测器失败，则会杀死容器，容器将遵循其重启策略',
  WORKLOAD_REPLICA_MSG:
    '在用户定义范围内，如果 Pod 增多，则 ReplicationController 会终止额外的 Pod，如果减少，RC 会创建新的 Pod，始终保持在定义范围。例如，RC 会在 Pod 维护（例如内核升级）后在节点上重新创建新 Pod。',
  DEPLOYMENTS_REPLICA_DESC:
    '部署 (Deployment) 用来描述期望应用达到的目标状态，主要用来描述无状态应用，副本的数量和状态由其背后的控制器来维护，确保状态与定义的期望状态一致。您可以增加副本数量来满足更高负载；回滚部署的版本来消除程序的错误修改；创建自动伸缩器来弹性应对不同场景下的负载。',
  STATEFULSETS_REPLICA_DESC:
    '有状态副本集 (StatefulSet) 用来描述有状态应用，比如副本之间有主从关系，数据需要做持久化。与部署 (Deployment) 相同的是，有状态副本集创建的副本也是完全相同的，不同的是每个副本有个固定且唯一的标识，即使副本被重新调度了，标识也不会发生变化。您可以用有状态副本集来实现应用的有序部署，有序的删除，有序的滚动更新。',
  DAEMONSETS_REPLICA_DESC:
    '守护进程集 (DaemonSet) 可以确保集群中的每个节点运行一个副本，当有节点加入集群或者离开集群的时候，会自动地调整副本的数量来保证副本的数量与集群的节点数量一致。您可以使用守护进程集来运行存储服务，如 GlusterFS，Ceph 等；运行日志搜集服务，如 Fluentd，Logstash 等；运行监控服务等。',
  CONTAINER_CPU_DESC:
    '作为容器调度时资源分配的判断依赖。只有当节点上可分配CPU总量 ≥ 容器CPU最小使用值时，才允许将容器调度到该节点。单位换算规则: 1核 = 1000m',
  CONTAINER_MEMORY_DESC:
    '作为容器调度时资源分配的判断依赖。只有当节点上可分配内存总量 ≥ 容器内存最小使用值时，才允许将容器调度到该节点。',
  FILL_IMAGE_DEFAULT_PORTS_DESC: '是否暴露该镜像的默认端口？',
  REQUEST_EXCCED: '资源预留不能超过资源限制',
  REQUEST_EXCEED_AVAILABLE_QUOTA: '资源设置不能超过可用资源限制。',
  POD_SCALE_DESC: '可以弹性扩展容器组实例数量',
  REPLICAS_AVAILABLE: '实际副本',
  DEPLOY_PLACEMENT_TIP_TITLE: '什么是部署位置？',
  DEPLOY_PLACEMENT_TIP_VALUE:
    '可以将容器组部署在不同集群中，并对集群中部署的副本数量进行定义。不同集群中的容器组将由联邦集群控制器(Federation Controller Manager)进行统一的调度及状态同步。',
  DESC_CREATE_CONFIGMAP_SECRET: '如果没有合适的配置文件或密钥引用, 您可以',
  // Pods Page
  NODE_IP: '{node}（{ip}）',
  // Jobs
  JOBS: '任务',
  // Cronjobs
  ADD_VOLUME: '添加存储卷',
  MOUNT_VOLUMES: '挂载存储卷',
  // Workload
}
