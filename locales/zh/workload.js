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
  Workload: '工作负载',
  Workloads: '工作负载',
  'Service Configuration': '服务配置',

  'Available number of nodes scheduled': '可用节点数',
  'Desired number of nodes scheduled': '期望节点数',
  'Current number of nodes scheduled': '当前节点数',
  'View YAML': '查看配置文件',
  'Edit YAML': '编辑配置文件',
  'Add Labels': '添加标签',
  'Edit Labels': '编辑标签',
  'Pod Replicas': '容器组副本数量',
  'Container Image': '容器镜像',
  'Pod Status': '容器组运行状态',
  'Container Setting': '容器设置',
  'Pods List': '容器组列表',
  POD_SCALE_DESC: '可以弹性扩展容器组实例数量',
  Log: '日志',
  'Container Logs': '容器日志',
  'Resource Info': '资源信息',
  Logs: '操作日志',
  'Node Name': '节点名称',
  'Node IP': '节点 IP',
  'Pod IP': '容器组 IP',
  Image: '镜像',
  'Image ID': '镜像 ID',
  'Port(s)': '端口',
  Port: '端口',
  port: '端口',
  Topology: '拓扑图',
  'Edit Container': '编辑容器',
  'Host Port': '节点端口',
  'Add Port': '添加端口',
  'target port': '目标端口',
  Environment: '环境变量',
  'Mount point': '挂载点',
  'Mount Path': '挂载路径',
  'Mount Volume': '挂载存储卷',
  'Set Mount Path': '设置挂载路径',
  'Mount Temporary Volume': '挂载临时存储卷',
  'Select by Node': '指定节点',
  Mount: '挂载',
  Capacity: '容量',
  capacity: '容量',
  'Volume Capacity': '存储卷容量',
  'Storage Size': '存储大小',
  'Access Mode': '访问模式',
  Provisioner: '供应者',
  Volumes: '存储卷',
  'Volume Source': '存储卷来源',
  mounted: '已挂载',
  created: '已创建',
  EmptyDir: '临时存储卷',
  'Temporary Volume': '临时存储卷',
  'New Volume': '新建存储卷',
  'Existing Volume': '已有存储卷',
  'Volume Name': '存储卷名称',
  'HTTP Request': 'HTTP 请求',
  'Diff Settings': '差异化配置',
  'Deployment Mode': '部署模式',
  'Custom Deployment Mode': '自定义部署模式',
  'Add Deployment Mode': '添加部署模式',
  DEPLOYMENT_MODE_DESC: '您可以为容器组调度指定规则',
  'Instance Status': '实例状态',

  'No Request': '不预留',
  'No Limit': '不限制',
  'Not Limited': '未限制',
  Cost: '占用',
  'Project Remaining Quota': '项目剩余配额',
  'Workspace Remaining Quota': '企业空间剩余配额',
  QUOTA_OVERCOST_TIP: '当前资源占用已超过剩余配额',

  'Resource Request': '资源预留',
  'Resource Limit': '资源限制',

  'Resource requests remaining quota': '资源预留剩余配额',
  'Resource limits remaining quota': '资源限制剩余配额',

  'No resource limits': '无资源限制',

  'Job Settings': '任务设置',
  'CronJob Settings': '定时任务设置',
  'Job Template': '任务模板',

  'Mount Volumes': '挂载存储',

  'ConfigMap & Secret': '配置文件和密钥',
  'Add Volume': '添加存储卷',
  'Mount ConfigMap or Secret': '挂载配置文件或密钥',
  'Use ConfigMap or Secret': '引用配置文件或密钥',

  'Collecting file log': '收集落盘日志',

  'Add Metadata': '添加元数据',
  'Set Node Scheduling Policy': '设置节点调度策略',
  'You can allow Pod replicas to run on specified nodes.':
    '可以让容器组副本在指定的节点运行',
  'Additional metadata settings for resources such as Labels and Annotations.':
    '对资源进行额外的元数据设置，例如 Label 和 Annotation',

  'Deployment Location': '部署位置',

  REFFER_CONFIGMAP_DESC: '将配置中的值添加为卷。',
  REFFER_SECRET_DESC: '将密钥中的值添加为卷。',

  'Choose an existing volume': '选择已有存储卷',
  CHOOSE_EXIST_VOLUME_DESC: '请选择一个已经创建好的持久化存储卷挂载至容器',

  REQUEST_EXCCED: '资源预留不能超过资源限制',

  WORKLOAD_DESC:
    '工作负载 (Workload) 通常是访问服务的实际载体, 也是对节点日志收集、监控等系统应用的实际运行载体，是对一组容器组 (Pod) 的抽象模型。',

  WORKLOAD_CREATE_DESC:
    '工作负载 (Workload) 通常是访问服务的实际载体, 也是对节点日志收集、监控等系统应用的实际运行载体，是对一组容器组 (Pod) 的抽象模型。',

  JOB_DESC:
    '任务 (Job) 负责批量处理短暂的一次性任务，即仅执行一次的任务，它保证批处理任务的一个或多个容器组成功结束。',
  JOB_CREATE_DESC:
    '任务 (Job) 负责批量处理短暂的一次性任务，即仅执行一次的任务，它保证批处理任务的一个或多个容器组成功结束。',
  CRONJOB_DESC:
    '定时任务 (CronJob) 管理基于时间的任务，例如在给定时间点只运行一次，或周期性地在给定时间点运行。',
  CRONJOB_CREATE_DESC:
    '定时任务 (CronJob) 管理基于时间的任务，例如在给定时间点只运行一次，或周期性地在给定时间点运行。',

  CRONJOB_NAME_DESC:
    '最长 52 个字符，只能包含小写字母、数字及分隔符("-")，且必须以小写字母或数字开头及结尾',
  CRONJOB_NAME_TOO_LONG: '最长 52 个字符',

  IMAGE_PLACEHOLDER: '点击右侧图标可选择镜像，或直接输入名称 例：nginx:latest',
  IMAGE_REGISTRY_PLACEHOLDER: '请选择镜像仓库密钥',
  IMAGE_DESC:
    '要从私有镜像仓库部署，需要先<a href={link} target="_blank">创建镜像仓库密钥</a>，然后拉取镜像。',

  Replicas: '副本',
  'Replicas Number': '副本数量',
  'Specify Replicas Number': '指定副本数量',
  'Replica Status': '副本运行状态',
  REPLICAS_DESC: '{module}将会被创建，由它维护集群中容器组的所需数量',
  'Strategy Type': '策略类型',
  'Update Strategy': '更新策略',
  OnDelete: '删除容器组时更新',
  Recreate: '替换升级',
  RollingUpdate: '滚动更新',
  'RollingUpdate (Recommended)': '滚动更新(推荐)',
  'Restart Count': '重启次数',
  'Resource Requests': '资源预留',
  'Resource Limits': '资源限制',
  'Image Pull Policy': '镜像拉取策略',
  Privileged: '特权模式',
  'Desired Replicas': '期望副本',
  'Current Replicas': '实际运行副本',
  MinReadySeconds: '最小就绪时间 (MinReadySeconds)',

  REPLICAS_SCALE_NOTIFY_TITLE: '立即生效？',
  REPLICAS_SCALE_NOTIFY_CONTENT:
    '您已将工作负载的副本数调整为 <strong>{num}</strong>, 您也可以继续调整副本数量，或者您可以使它立即生效。',
  REPLICAS_SCALE_NOTIFY_CONFIRM: '立即生效({seconds}s)',
  REPLICAS_SCALE_NOTIFY_CANCEL: '放弃更改',

  POD_SETTING_TIP: '更新时容器组数量',
  MAX_UNAVAILABLE_POD_LABEL: '容器组最大不可用数量',
  MAX_SURGE_POD_LABEL: '容器组最大超出数量',
  UPDATE_STRATEGY_DESC:
    '配置升级过程中替换容器组的策略 <a href="{link}" target="_blank">了解更多</a>',
  MAX_DAEMON_UNAVAILABLE_POD_DESC:
    '升级过程中「允许存在的不可用的容器组」所占总容器组数的最大百分比或数量',
  MAX_DEPLOY_UNAVAILABLE_POD_DESC: '升级过程中可能不可用的 Pod 的最大数量。',
  MAX_SURGE_POD_DESC:
    '升级过程中「允许超出副本数量的容器组」的最大数量或百分比',
  ROLLING_UPDATE_POD_TIP:
    '更新时，会根据当前容器组的副本数对最小可用及最大数量进行限制；最小容器组数不可以超过当前副本数，且最大容器组数量不能超过当前副本数的2倍。',
  ONDELETE_ALERT_TIP:
    '控制器不会自动更新容器组，将会在容器组被手动删除时，更新并替换容器组实例。',
  ROLLINGUPDATE_ALERT_TIP:
    '滚动升级将逐步用新版本的实例替换旧版本的实例，升级的过程中，业务流量会同时负载均衡分布到新老的实例上，因此业务不会中断。',
  RECREATE_ALERT_TIP:
    '替换升级会先删除旧的容器组，再创建新容器组；升级过程中业务会中断。',

  STATEFULSET_PARTITION_DESC:
    '当更新有状态副本集时，将更新具有大于或等于 partition 的序数的所有容器组',
  STATEFULSET_PARTITION_PLACEHOLDER: '默认为 0',
  MIN_READY_SECONDS_DESC: '指定守护进程集中容器组启动可用所需的最小的秒数',

  'UI Mode': '界面模式',
  'Coding Mode': '代码模式',

  'Labels exists': '标签组重复',
  'Labels cannot be empty': '标签不能为空',
  'Add Label': '添加标签',
  'Add Container': '添加容器',
  'Add new container': '添加新的容器',
  'Adding new contianer': '正在添加新的容器',
  'Add Node Selector': '添加节点选择器',
  'Please add at least one container.': '请至少添加一个容器',
  'Container Name': '容器名称',
  'Container Type': '容器类型',
  'Advanced Options': '高级选项',
  'Applied to the workload': '应用于工作负载',
  'CPU(m)': 'CPU(m)',
  Commands: '命令',
  'Add command': '添加命令',
  Arguments: '参数',
  Argument: '参数',
  'Add argument': '添加参数',
  Protocols: '协议',
  'Must match': '必须满足',
  'Match as much as possible': '尽可能满足',
  'Deploy with the Target': '与目标部署到一起',
  'Deploy away from the Target': '远离目标部署',
  'Please complete the policy': '请填写完整策略',
  'Session Affinity': '会话亲和性',
  'environment variables': '环境变量',
  'Add Environment Variable': '添加环境变量',
  'Read Write Mode': '读写模式',
  'Please input mount point': '请输入挂载点',
  'Please select a storage class': '请选择存储卷类型',
  'Please select image': '请选择镜像',
  'Invalid name': '名称格式不合法。{message}',
  'Service Labels': '服务标签',

  'Add Existing Volume': '添加已有存储卷',
  'Add Temporary Volume': '添加临时存储卷',
  'Add HostPath': '添加 HostPath',
  'Add Volume Template': '添加存储卷模板',

  'Support EmptyDir and PersistentVolumeClaim.':
    '支持临时存储卷以及持久化存储卷',

  'Mount the configmap or secret to the specified directory.':
    '将配置文件或密钥挂载至指定目录',

  'Please specify an image': '请指定镜像',

  'Please select protocol': '请选择协议',
  'Please input port': '请输入端口',
  'Please input command': '请输入命令',
  'Please input volume name': '请输入存储卷名称',

  PORT_INPUT_DESC: '当存在多条端口时，名称为必填项目且不可重复',

  PORT_NAME_DESC:
    '端口名最长 63 个字符，只能包含小写字母、数字及分隔符("-")，且必须以小写字母或数字开头及结尾',

  WORKLOAD_PORT_NAME_DESC:
    '端口名最长 15 个字符，只能包含小写字母、数字及分隔符("-")，且必须以小写字母或数字开头及结尾',

  CPU_REQUEST_TARGET_DESC:
    '当 CPU 使用率超过或低于此目标值时，将添加或删除副本',
  MEMORY_REQUEST_TARGET_DESC:
    '当内存使用量超过或低于此目标值时，将添加或删除副本',
  MIN_REPLICAS_DESC: '弹性伸缩可以设置的副本数量的下限',
  MAX_REPLICAS_DESC: '副本数量的上限',
  REPLICAS_PLACEHOLDER: '默认值: 1',

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

  STATEFULSETS_BASEINFO_DESC:
    '您可以给有状态副本起一个名字，以便在使用的时候容易区分。',
  STATEFULSETS_VOLUME_TEMPLATE_DESC:
    '为有状态副本集的每个容器组创建专属的持久化存储卷，并挂载至相应的容器组',
  STATEFULSETS_ADD_VOLUME_TEMPLATE_DESC: '请添加一个存储卷模板',
  STATEFULSETS_SERVICE_CONFIG_DESC:
    '集群不为服务生成 IP，集群内部通过服务的后端 Endpoint IP 直接访问服务。此类型适合后端异构的服务，比如需要区分主从的服务。',

  DAEMONSETS_BASEINFO_DESC:
    '守护进程集保证在每个主机上都运行一个容器副本，常用来部署一些集群的日志、监控或者其他系统管理应用。',
  DAEMONSETS_VOLUME_DESC:
    '可将 HostPath，临时存储卷，持久化存储卷挂载至守护进程集的容器组内。',

  JOBS_BASEINFO_DESC: '',
  JOBS_POD_TEMPLATE_DESC: '指定任务中运行的容器组模板',
  JOBS_VOLUME_DESC: '可以将临时存储卷，持久化存储卷挂载至任务的容器组内。',
  CRONJOBS_BASEINFO_DESC: '创建定时任务所需的基本信息，需指定名称与定时计划',
  CRONJOBS_VOLUME_DESC:
    '可以将临时存储卷，持久化存储卷挂载至定时任务的容器组内。',
  CRONJOB_CRON_DESC:
    '按照给定的时间计划运行工作。语法参照 <a href="//en.wikipedia.org/wiki/Cron" target="_blank">CRON</a>。Kubernetes 默认使用 UTC 时间, 请注意根据时区调整定时计划。',

  MOUNT_VOLUME_DESC:
    '持久化存储卷请选择支持多节点读写模式 (ROX 或者 RWX) 的存储卷，否则可能因容器组不在同一节点导致容器组更新失败。如果您选择了单节点读写 (RWO) 模式的存储卷您也可以通过节点选择将容器组安排在同一节点上来避免因存储卷访问模式造成的更新错误。',

  Job: '任务',
  CronJob: '定时任务',
  Revision: '版本',
  'Every Hour': '每小时',
  'Every Day': '每天',
  'Every Week': '每周',
  'Every Month': '每月',
  Schedule: '定时计划',
  'Revision Records': '版本记录',
  'Revision Rollback': '版本回退',
  'Rollback Revisions': '回退版本',
  'Current Revision': '当前版本',
  'Execution Records': '执行记录',
  'Job Records': '任务记录',
  'Cluster Resource Status': '集群资源状态',
  'Resource Status': '资源状态',
  'Resource Name': '资源名称',
  'Config Template': '配置模板',
  'Edit Config Template': '编辑配置模板',
  'Environment Variables': '环境变量',
  'File List': '文件列表',
  Rerun: '重新执行',
  'Please input a schedule.': '请输入定时计划',

  'Please select rollback revision': '请选择回退版本',

  'Horizontal Pod Autoscaling': '弹性伸缩',
  'Container Config': '容器配置',
  'Add Command': '添加命令',
  Probe: '探针',
  'Add Probe': '添加探针',
  'Initial Delay': '初始延迟',
  'Initial Delay(s)': '初始延迟(秒)',
  'Timeout(s)': '超时时间(秒)',
  'Period Seconds': '执行探测频率(秒)',
  'Success Threshold': '健康阈值',
  'Failure Threshold': '不健康阈值',
  'HTTP Request Check': 'HTTP 请求检查',
  'Exec Command Check': '执行命令检查',
  'TCP Port Check': 'TCP 端口检查',
  'Init Container': '初始容器',
  'Worker Container': '工作容器',
  'Request Type': '请求类型',

  startingDeadlineSeconds: '启动 Job 的期限（秒）',
  'startingDeadlineSeconds(s)': '启动 Job 的期限（秒）',
  successfulJobsHistoryLimit: '保留完成 Job 数',
  failedJobsHistoryLimit: '保留失败 Job 数',
  concurrencyPolicy: '并发策略',

  'Select resource': '选择资源',
  'Restart Policy': '重启策略',

  'Container Liveness Check': '容器存活检查',
  'Container Readiness Check': '容器就绪检查',
  'Container Startup Check': '容器启动检查',

  Redeploy: '重新部署',
  'Redeploy Successfully': '重新部署成功',

  REDEPLOY_CONFIRM_DESC:
    '您即将重新部署工作负载 {resource} ({type}) , 容器组将根据更新策略进行重新部署，您的业务可能会被暂时中断。',

  EDIT: '编辑信息',
  MORE: '更多操作',
  VIEW_YAML: '查看 YAML 文件',

  REVISION_ROLLBACK_SELECT: '请选择要回退的版本',
  REVISION_TITLE: '{name}版本',
  'is running': '正在运行',
  PROBE_TIME: '初始延时: {delay}s 超时时间:{timeout}s',
  'Readiness Probe': '就绪探针',
  'Liveness Probe': '存活探针',
  'Startup Probe': '启动探针',

  INITIAL_DELAY_DESC: '在检查其运行状况之前，容器启动后需要等待多长时间。',
  TIMEOUT_DESC:
    '等待探针完成多长时间。如果超过时间，则认为探测失败。默认为1秒。最小值为1。',
  PERIOD_SECONDS_DESC: '执行探测的频率（以秒为单位）。默认为10秒。最小值为1。',
  SUCCESS_THRESHOLD_DESC:
    '探测失败后，连续最小成功探测为成功。默认值为1。最小值为1。存活探针和启动探针内必须为1。',
  FAILURE_THRESHOLD_DESC: '探针进入失败状态时需要连续探测失败的最小次数。',

  HPA_MSG:
    '根据 CPU 和内存使用情况自动伸缩副本。如果同时指定 CPU 和内存，则满足任一条件后即添加或删除副本',
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

  'The number of failed jobs allowed to be retained.':
    '允许保留的失败的任务个数',
  'The number of successful jobs allowed to be retained.':
    '允许保留的成功的任务个数',
  'The concurrency policy setting.': '并发策略设置',
  'Can be found by node IP or node name': '可以通过节点 IP 或者节点名称查找',
  START_DEADLINE_SECONDS_DESC:
    '即在指定 启动时间 + 启动 Job 的期限 这个周期之内都可以启动任务',
  'Container CPU Resource Request, 1 Core = 1000m':
    '容器的 CPU 资源请求值, 1核 = 1000m',
  'Container Memory Resource Request': '容器的 内存 资源请求值',
  'The minimum of the replicas that can be set by HPA':
    '弹性伸缩可以设置的副本数量的下限',
  'Min Replicas Number': '最小副本数',
  'Max Replicas Number': '最大副本数',
  'Maximum number of replicas': '副本数量的上限',
  'Target Utilization': '目标使用率',
  'Target Usage': '目标使用量',
  'Current Utilization': '当前使用率',
  'CPU Target Utilization': 'CPU 目标使用率',
  'Memory Target Utilization': '内存目标使用率',
  'Memory Target Usage': '内存目标使用量',

  'min replicas number should not be greater than max replicas number':
    '最大副本数应不小于最小副本数',

  'Horizontal Pod Autoscaling has been set': '已设置弹性伸缩策略',

  'Mount path is already in use': '挂载路径已使用',
  'Please specify the read and write mode and mount path':
    '请指定读写方式及挂载路径',
  'Please add at least one volume': '请至少添加一个存储卷',
  'Please add at least one volume or volume template':
    '请至少添加一个存储卷或存储卷模板',
  'Please select a volume': '请选择存储卷',
  'Please select a configmap': '请选择配置文件',
  'Please select a secret': '请选择密钥',
  'What is Disk Log Collection?': '什么是落盘日志收集？',

  'for example': '例如',
  'Container mount path': '容器挂载路径',
  'container log relative path': '容器日志相对路径',
  'log path relative to container mount path': '日志路径相对于容器挂载路径',

  'Click to add subPath': '点击添加子路径',
  'sub path': '子路径',
  ADD_SUBPATH_TIP: '仅适用于存储卷挂载，不适用于主机路径映射',

  'Host Path': '主机路径',

  HOST_PATH_DESC:
    'HostPath 允许挂载主机上的文件系统到容器组里面去。如果容器组需要使用主机上的文件，可以使用 HostPath。',
  'Select specific keys and paths': '选择特定的键和路径',
  SELECT_SECRET_DESC:
    '选择要使用的密钥以及将公开每个密钥的文件路径，文件路径相当于装载路径，每个文件的内容都是密钥的值。',
  EMPTY_DIR_DESC:
    '临时存储卷随 Pod 被分配在主机上。当 Pod（不管任何原因）从主机上被删除时，临时存储卷也同时会删除，存储卷的数据也将永久删除。<br />注：删除容器不影响临时存储卷。',
  SELECT_VOLUME_TYPE_DESC: '您可以根据需要选择适合您的存储卷类型进行添加',

  JOB_BACK_OFF_LIMIT_LABEL: '最大重试次数',
  JOB_PARALLELISM_LABEL: '并行数',
  JOB_COMPLETION_LABEL: '完成数',
  JOB_ACTIVE_DL_SECONDS_LABEL: '退出超时时限(单位：秒)',

  JOB_BACK_OFF_LIMIT_DESC:
    '失败尝试次数，若失败次数超过该值，则任务不会继续尝试工作',
  JOB_PARALLELISM_DESC: '标志并行运行的容器组的个数',
  JOB_COMPLETION_DESC: '标志任务结束需要成功运行的容器组个数',
  JOB_ACTIVE_DL_SECONDS: '任务运行的超时时间',

  RESTART_POLICY_NEVER_DESC: '容器组出现故障时创建新的容器组',
  RESTART_POLICY_ONFAILURE_DESC: '容器组出现故障时内部重启容器',

  RESTART_POLICY_TIP:
    'RestartPolicy 只能指定 Never 或 OnFailure，当任务未完成的情况下：<br/>* 如果 RestartPolicy 指定 Never，则任务会在容器组出现故障时创建新的容器组，且故障容器组不会消失。<br/>* 如果 RestartPolicy 指定 OnFailure，则任务会在容器组出现故障时其内部重启容器，而不是创建容器组。',

  MEMBER_CREATE_DESC: '',

  MONITORING_ALERT_DESC:
    '当前监控最多可显示五个副本的运行状态监控，当超过五个副本时，可以单击具体监控项的「查看全部副本」，查看更多的副本监控。',

  RESOURCE_REQUESTS: '最小使用',
  RESOURCE_LIMITS: '最大使用',
  CONTAINER_CPU_DESC:
    '作为容器调度时资源分配的判断依赖。只有当节点上可分配CPU总量 ≥ 容器CPU最小使用值时，才允许将容器调度到该节点。单位换算规则: 1核 = 1000m',
  CONTAINER_MEMORY_DESC:
    '作为容器调度时资源分配的判断依赖。只有当节点上可分配内存总量 ≥ 容器内存最小使用值时，才允许将容器调度到该节点。',
  'request CPU should not be greater than limit CPU':
    '最小使用 CPU 值应不大于最大使用 CPU 值',
  'request memory should not be greater than limit memory':
    '最小使用内存值应不大于最大使用内存值',

  'Invalid image': '无效的镜像',
  IMAGE_PULL_POLICY_ALWAYS: '尝试重新下载镜像（Always）',
  IMAGE_PULL_POLICY_IFNOTPRESENT: '优先使用本地镜像（IfNotPresent）',
  IMAGE_PULL_POLICY_NEVER: '仅使用本地镜像（Never）',
  IMAGE_PULL_POLICY_ALWAYS_DESC: '在创建及更新时，每次都会尝试下载新的镜像',
  IMAGE_PULL_POLICY_IFNOTPRESENT_DESC: '如果本地存在镜像就优先使用本地镜像',
  IMAGE_PULL_POLICY_NEVER_DESC:
    '仅会使用本地镜像，如果本地不存在所需镜像，则会导致容器异常',

  LIVENESS_PROBE_DESC: '该检查方式用于检测容器是否活着。',
  READINESS_PROBE_DESC: '该检查方式用于检测容器是否准备好开始处理用户请求。',
  STARTUP_PROBE_DESC: '该检查方式用于检测容器是否启动成功。',
  STARTUP_PROBE_TIP: '需要 kubernetes 版本 v1.18 或以上。',

  COLLECT_SAVED_LOG_DESC:
    '您已开启落盘日志收集，请至少添加一个存储卷并指定日志所在目录',
  COLLECT_FILE_LOG_TIP:
    '当您添加存储卷后(需要读&写模式)，您可以对存储卷内的日志信息进行收集。开启后，会在容器组中以 SideCar 的方式注入 filebeat 容器镜像，来收集相关日志。',

  PROJECT_COLLECT_SAVED_DISABLED_DESC:
    '请联系项目管理员在 “项目设置” => "高级设置" 中开启项目的落盘日志收集功能',

  ADD_VOLUME_TEMPLATE_DESC:
    '添加存储卷模板，存储卷的生命周期将随容器组的生命周期存在',

  CONTAINER_LOG_PATH_TIP:
    '容器日志相对路径是从容器挂载路径开始的路径，可以 glob 方式给出，多组时以英文逗号分隔。例如当容器挂载路径为 /data 时，容器日志相对路径配置为 log/*.log，表示匹配 /data/log 目录下所有 .log 后缀文件。<br/>若需要匹配 /data/log 目录及其子目录下的所有 .log 后缀文件，可将容器日志相对路径配置为 log/**/*.log',

  'No default ports config': '暂无默认端口配置',
  ports: '端口',
  layers: '层级',
  registry: '仓库',
  'Private Registry': '私有仓库',
  'Image Name': '镜像名称',
  'Not found this image': '没有找到此镜像',
  SEARCH_IMAGE_PLACEHOLDER: '输入关键字查找镜像',

  'Pod Default Deployment': '容器组默认部署',
  'Pod Decentralized Deployment': '容器组分散部署',
  'Pod Soft Decentralized Deployment': '容器组软分散部署',
  'Pod Hard Decentralized Deployment': '容器组硬分散部署',
  'Pod Aggregation Deployment': '容器组聚合部署',
  'Pod Soft Aggregation Deployment': '容器组软聚合部署',
  'Pod Hard Aggregation Deployment': '容器组硬聚合部署',
  'Pod replicas will be deployed on different nodes as much as possible.':
    '容器组副本将会尽量分散在不同的节点中',
  'Pod replicas will be deployed on the same node as much as possible.':
    '容器组副本将会尽量部署在同一节点上',
  'Pod replicas will be deployed according to the default policy.':
    '容器组副本将根据默认策略部署',
  'KubeSphere supports pulling images from the Image Registries and creating new images through source code (Source to Image).':
    'Kubesphere 支持从镜像仓库拉取镜像以及通过代码构建新的镜像并部署',

  'Scheduling Info': '调度信息',
  'Node Scheduling Info': '节点调度信息',
  'Pod Status Analysis': '容器状态分析',
  'Current Stage(phase)': '当前阶段(phase)',
  'Scheduled to node': '调度至节点',
  'How pods are assinged to nodes?': '容器组如何被调度至节点?',
  'Pod CPU Request': '容器组CPU请求',
  'Pod Memory Request': '容器组内存请求',

  'Sync Host Timezone': '同步主机时区',

  POD_CONDITION_INITIALIZED: 'Initialized',
  POD_CONDITION_INITIALIZED_DESC: '所有 init 容器都已成功启动',
  POD_CONDITION_READY: '开始运行(Ready)',
  POD_CONDITION_READY_DESC: '容器组已经开始运行，并可以通过服务进行访问',
  POD_CONDITION_CONTAINERSREADY: '容器准备就绪(ContainersReady)',
  POD_CONDITION_CONTAINERSREADY_DESC: '容器组内容器准备就绪.',
  POD_CONDITION_PODSCHEDULED: '调度成功(PodScheduled)',
  POD_CONDITION_PODSCHEDULED_DESC: '容器组已经被安排到一个节点中',

  POD_REASON_FAILEDCREATE: '创建失败(FailedCreate)',
  POD_REASON_SUCCESSFULCREATE: '创建成功(SuccessfulCreate)',
  POD_REASON_FAILEDDELETE: '删除失败(FailedDelete)',
  POD_REASON_SUCCESSFULDELETE: '删除成功(SuccessfulDelete)',

  POD_ASSIGNED_DESC:
    '根据容器组中容器设置的请求值 (即 Request) 作为容器调度时资源分配的判断依据。只有节点上可分配总量 ≥ 容器请求值时，才允许将容器调度到该节点。',

  CrashLoopBackOff: '容器退出，kubelet 正在将它重启',
  InvalidImageName: '无法解析镜像名称',
  ImageInspectError: '无法校验镜像',
  ErrImageNeverPull: '当前策略禁止拉取镜像',
  ImagePullBackOff: '正在重试拉取镜像',
  RegistryUnavailable: '无法连接镜像仓库',
  ErrImagePull: '镜像拉取失败',
  CreateContainerConfigError: '不能创建 kubelet 使用的容器配置',
  CreateContainerError: '创建容器失败',
  'm.internalLifecycle.PreStartContainer': '执行 hook 报错',
  RunContainerError: '启动容器失败',
  PostStartHookError: '执行 hook 报错',
  ContainersNotInitialized: '容器未初始化',
  ContainersNotReady: '容器没有准备就绪',
  ContainerNotReady: '容器没有准备就绪',
  ContainerCreating: '容器创建中',
  PodInitializing: '容器组初始化中',
  DockerDaemonNotReady: 'Docker 还没有完全启动',
  NetworkPluginNotReady: '网络插件还没有完全启动',
  POD_DESC:
    '容器组 (Pod) 是 Kubernetes 应用程序的基本执行单元，是您创建或部署的 Kubernetes 对象模型中最小和最简单的单元。',
  POD_CREATE_DESC:
    '容器组 (Pod) 是 Kubernetes 应用程序的基本执行单元，是您创建或部署的 Kubernetes 对象模型中最小和最简单的单元。',
  FILL_IMAGE_DEFAULT_PORTS_DESC: '是否暴露该镜像的默认端口？',

  ISTIO_PROTOCOL_TIP:
    '为了充分利用应用治理的能力，请选择服务实际使用的协议。例如，如果服务暴露的是 HTTP 服务，则选择 http 协议，会生成形如 http-[name] 的端口名称。',

  WORKLOAD_CONDITIONS: '状态分析(Conditions)',
  WORKLOAD_CONDITION_AVAILABLE: '可用性(Available)',
  WORKLOAD_CONDITION_PROGRESSING: '创建进度(Progressing)',
  WORKLOAD_REASON_REPLICASETUPDATED: '副本已更新(ReplicaSetUpdated)',
  WORKLOAD_REASON_REPLICASETCREATEERROR: '新建副本错误(ReplicaSetCreateError)',
  WORKLOAD_REASON_NEWREPLICASETCREATED: '已创建新副本(NewReplicaSetCreated)',
  WORKLOAD_REASON_FOUNDNEWREPLICASET: '发现新副本(FoundNewReplicaSet)',
  WORKLOAD_REASON_NEWREPLICASETAVAILABLE: '可用新副本(NewReplicaSetAvailable)',
  WORKLOAD_REASON_PROGRESSDEADLINEEXCEEDED:
    '处理超时(ProgressDeadlineExceeded)',
  WORKLOAD_REASON_DEPLOYMENTPAUSED: '部署中止(DeploymentPaused)',
  WORKLOAD_REASON_DEPLOYMENTRESUMED: '部署已恢复(DeploymentResumed)',
  WORKLOAD_REASON_MINIMUMREPLICASAVAILABLE:
    '最小副本可用(MinimumReplicasAvailable)',
  WORKLOAD_REASON_MINIMUMREPLICASUNAVAILABLE:
    '最小副本不可用(MinimumReplicasUnavailable)',
  WORKLOAD_REASON_FAILEDCREATE: '创建失败(FailedCreate)',

  ReplicaSetUpdated: '副本已更新',
  ReplicaSetCreateError: '新建副本错误',
  NewReplicaSetCreated: '已创建新副本',
  FoundNewReplicaSet: '发现新副本',
  NewReplicaSetAvailable: '可用新副本',
  ProgressDeadlineExceeded: '处理超时',
  DeploymentPaused: '部署中止',
  DeploymentResumed: '部署已恢复',
  MinimumReplicasAvailable: '最小副本可用',
  MinimumReplicasUnavailable: '最小副本不可用',
  FailedCreate: '创建失败',
  SuccessfulCreate: '创建成功',
  FailedDelete: '删除失败',
  SuccessfulDelete: '删除成功',

  SYNC_HOST_TIMEZONE_DESC: '时区与主机同步后，容器内的时区将与主机节点一致。',
  HOST_PATH_WARNING:
    'HostPath 将主机的文件系统挂载到Pod中，它使一些应用程序能逃出对其做出的隔离限制，请谨慎使用。',

  'Use Default Ports': '使用默认端口',

  'Please select at least one container to mount': '请至少选择一个容器进行挂载',
  'Sure to delete the workload(s)?': '确认删除工作负载',
  'No related resources': '没有关联的资源',
  'No related resources found with the current workload(s)':
    '当前工作负载下没有关联的资源',
  DELETE_WORKLOAD_DESC:
    '您即将删除工作负载 {resource}，请您进行确认是否删除关联资源?',

  'Container Security Context': '容器 Security Context',
  'Pod Security Context': '容器组 Security Context',
  'Access Control': '访问控制',
  'User and User Group': '用户和用户组',
  'User Group': '用户组',
  CONTAINER_SECURITY_CTX_DESC:
    'Security Context的目的是限制不可信容器的行为，保护系统和其他容器不受其影响。',
  POD_SECURITY_CONTEXT_DESC:
    '容器组 Security Context 可以为容器组内的容器提供默认的用户和用户组设置以及 seLinuxOptions 的参数设置，如果容器中已经对这些参数进行了定义，则优先以容器中的设置为准。',
  ACCESS_CONTROL_PRIVILEGED: '以特权模式运行(Privileged)',
  ACCESS_CONTROL_PRIVILEGED_DESC:
    '此时容器中的进程本质上等价于宿主节点上的 root 用户。',
  ACCESS_CONTROL_ALLOWPRIVILEGEESCALATION:
    '允许扩大特权(AllowPrivilegeEscalation)',
  ACCESS_CONTROL_ALLOWPRIVILEGEESCALATION_DESC:
    '进程是否可以获取比父进程更多的特权。当以特权模式运行时，则为允许状态。',
  ACCESS_CONTROL_READONLYROOTFILESYSTEM:
    '文件系统root只读(ReadOnlyRootFilesystem)',
  ACCESS_CONTROL_READONLYROOTFILESYSTEM_DESC:
    '该容器的文件系统根路径是否为只读。',
  RUN_AS_NON_ROOT: '仅允许非 Root 用户',
  RUN_AS_NON_ROOT_DESC:
    'Kubernetes 在运行容器之前将执行检查，以确保容器进程不是以 root 用户（UID为0）运行，否则将不能启动容器。',
  RUN_AS_USER_DESC: '执行容器 entrypoint 进程的 UID。默认为 docker 引擎的 GID',
  RUN_AS_USER_GROUP_DESC:
    '执行容器 entrypoint 进程的 GID。默认为 docker 引擎的 GID',

  COMPARE_WITH: '与上一个版本 {version} 的对比',
  REVISION_DESC:
    '对工作负载的资源模板进行修改后会生成一个新的记录并重新调度 容器组（Pod）进行版本的迭代，默认保存10个最近的版本。您可以根据修改记录进行重新部署。',

  CLUSTER_CONTAINER_IMAGE_DIFF_DESC:
    '根据不同的需要在不同的集群中设置不同的容器',
  CLUSTER_SERVICE_DIFF_DESC: '可以在不同集群设置不同的服务端口',
  CLUSTER_ENV_DIFF_DESC: '可以在不同集群设置不同的环境变量',

  CONTAINER_RESOURCE_LIMIT_TIP:
    '请设置容器的资源限制与资源预留，这将能够帮助系统更好地调度容器，提高稳定性。您也可在【项目设置】中，通过【基本信息】->【项目管理】->【编辑资源默认请求】，来统一设置默认值。',

  REPLICAS_AVAILABLE: '实际副本',
  REPLICAS_EXPECTED: '期望副本',

  DEPLOY_PLACEMENT_TIP_TITLE: '什么是部署位置？',
  DEPLOY_PLACEMENT_TIP_VALUE:
    '可以将容器组部署在不同集群中，并对集群中部署的副本数量进行定义。不同集群中的容器组将由联邦集群控制器(Federation Controller Manager)进行统一的调度及状态同步。',
  IGNORE_CERT_DESC: '发现证书错误，是否忽略证书验证并再次',
  IGNORE_CERT_WARN_DESC: '忽略验证证书，可能会导致帐户密码被泄露。',
}
