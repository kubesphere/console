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
  SELECT_PROJECT_DESC: '選擇一個項目。',
  PROJECT_NOT_SELECT_DESC: '請選擇一個項目。',
  REPLICA_LOW_SI: '副本',
  REPLICA_LOW_PL: '副本',
  Workload: '工作負載',
  WORKLOAD: '工作負載',
  WORKLOAD_PL: '工作負載',
  WORKLOAD_LOW: '工作負載',
  Workloads: '工作負載',
  IMAGE_TIME_SIZE_LAYER: 'Updated {time}',
  IMAGE_TIME_SIZE_LAYER_PL: 'Updated {time}, {size}, {layer} layer',
  IMAGE_TIME_SIZE_LAYER_SI: 'Updated {time}, {size}, {layer} layers',
  CPU_REQUEST: 'CPU 預留',
  CPU_LIMIT: 'CPU 限制',
  CPU_REQUEST_SCAP: 'CPU 預留',
  CPU_LIMIT_SCAP: 'CPU 限制',
  MEMORY_REQUEST: '記憶體預留',
  MEMORY_LIMIT: '記憶體限制',
  MEMORY_REQUEST_SCAP: '記憶體預留',
  MEMORY_LIMIT_SCAP: '記憶體限制',
  ADD_PROBE: '添加檢查器',
  LABEL_TYPE: '{label} <span style="{style}">（{type}）</span>',
  SELINUX_CONTEXT: 'SELinux 上下文',
  CAPABILITIES_BETA: '權能（測試中）',
  SYNC_HOST_TIMEZONE: '同步宿主機時區',
  POD_SETTINGS: '容器組設置',
  MOUNT_PATH_EMPTY: '請輸入掛載路徑。',
  CONFIGMAP: '配置字典',
  CONFIGMAP_PL: 'ConfigMaps',
  CONFIGMAPS: 'ConfigMaps',
  CONFIGMAP_LOW: 'ConfigMap',
  DEPLOYMENT_EMPTY_DESC: 'Please create a Deployment.',
  STATEFULSET_EMPTY_DESC: 'Please create a StatefulSet.',
  DAEMONSET_EMPTY_DESC: 'Please create a DaemonSet.',
  JOB_EMPTY_DESC: 'Please create a Job.',
  CRONJOB_EMPTY_DESC: 'Please create a CronJob.',
  SERVICE_TOPOLOGY: 'Service Topology',
  'Service Configuration': '服務配置',

  'Available number of nodes scheduled': '可用節點數',
  'Desired number of nodes scheduled': '期望節點數',
  'Current number of nodes scheduled': '目前節點數',
  VIEW_YAML: '查看 YAML',
  EDIT_YAML: '編輯配置文件',
  YAML_FILE: 'YAML File',
  'Add Labels': '添加標籤',
  EDIT_LABELS: '編輯標籤',
  POD_REPLICAS: '容器組副本數量',
  DEFAULT_RULES: 'Default Rules',
  DEFAULT_RULES_DESC:
    'Schedules the Pod replicas to nodes according to default rules.',
  CONTAINERS: '容器鏡像',
  CONTAINER_IMAGE: '容器鏡像',
  ADD_CONTAINER: '添加容器',
  'Pod Status': '容器組運行狀態',
  'Container Setting': '容器設置',
  'Pods List': '容器組列表',
  POD_SCALE_DESC: '可以彈性擴展容器組實例數量',
  CONTAINER_LOGS: '容器紀錄',
  'Resource Info': '資源資訊',
  'Node Name': '主機名稱',
  POD_IP_ADDRESS: '容器組 IP 地址',
  POD_IP_ADDRESS_SCAP: '容器組 IP 地址',
  NODE_NAME: '主機名稱',
  POD_IP_TCAP: '容器組 IP',
  IMAGE: '鏡像',
  IMAGE_VALUE: '鏡像：{value}',
  IMAGE_ID: '鏡像 ID',
  'Port(s)': '端口',
  Port: '端口',
  EDIT_CONTAINER: '編輯容器',
  NODE_PORTS: '主機端口',
  NODE_PORT_SCAP: 'Node port',
  NODE_PORTS_SCAP: 'Node ports',
  ADD_PORT: '添加端口',
  'target port': '目標端口',
  Environment: '環境變量',
  'Mount point': '掛載點',
  MOUNT_PATH: '掛載路徑',
  'Mount Volume': '掛載儲存卷',
  'Set Mount Path': '設置掛載路徑',
  'Mount Temporary Volume': '掛載臨時儲存卷',
  'Select by Node': '指定節點',
  Mount: '掛載',
  CAPACITY: '容量',
  capacity: '容量',
  VOLUME_CAPACITY_TCAP: '儲存卷容量',
  'Storage Size': '儲存大小',
  'Access Mode': '訪問模式',
  PROVISIONER: '供應者',
  'Volume Source': '儲存卷來源',
  VOLUME_CAPACITY: '儲存卷容量',
  TOTAL_CAPACITY: 'Total capacity',
  Provisioner: '供應者',
  mounted: '已掛載',
  created: '已創建',
  EmptyDir: '臨時儲存卷',
  TEMPORARY_VOLUME: '臨時儲存卷',
  HOSTPATH_VOLUME: 'HostPath 儲存卷',
  'New Volume': '新建儲存卷',
  EXISTING_VOLUME: '已有儲存卷',
  VOLUME_NAME: '儲存卷名稱',
  CLUSTER_DIFF: 'Cluster Differences',
  REPLICA_SCHEDULING_MODE: '部署模式',
  POD_SCHEDULING_RULES: '容器组调度策略',
  CUSTOM_RULES: 'Custom Rules',
  CUSTOM_RULES_DESC:
    'Pod replicas are scheduled to nodes according to user-defined rules.',
  ADD_RULE: '添加部署模式',
  POD_SCHEDULING_RULES_DESC: '您可以为容器組調度指定規則',
  'Instance Status': '實例狀態',

  NO_REQUEST: '不預留',
  NO_LIMIT: '不限制',
  NO_REQUEST_TCAP: '不預留',
  NO_LIMIT_TCAP: '不限制',
  GPU_TYPE: 'GPU Type',
  GPU_TYPE_SCAP: 'GPU type',
  GPU_LIMIT: 'GPU Limit',
  GPU_LIMIT_SCAP: 'GPU limit',
  'Not Limited': '未限制',
  Cost: '占用',
  PROJECT_REMAINING_QUOTAS: '項目剩餘配額',
  WORKSPACE_REMAINING_QUOTAS: '企業空間剩餘配額',
  QUOTA_OVERCOST_TIP: '目前資源占用已超過剩餘配額',
  QOS_CLASS: 'QoS Class',

  'Resource Request': '資源預留',
  'Resource Limit': '資源限制',

  'Resource requests remaining quota': '資源預留剩餘配額',
  'Resource limits remaining quota': '資源限制剩餘配額',

  NO_RESOURCE_LIMIT: '無資源限制',

  'Job Settings': '任務設置',
  STRATEGY_SETTINGS: 'Strategy Settings',
  'CronJob Settings': '定時任務設置',
  'Job Template': '任務模板',

  VOLUME_SETTINGS: '掛載儲存',
  STORAGE_SETTINGS: 'Storage Settings',

  'Add Volume': '添加儲存卷',
  MOUNT_CONFIGMAP_OR_SECRET: '掛載配置文件或密鑰',
  USE_CONFIGMAP_OR_SECRET: '引用配置文件或密鑰',

  'Collecting file log': '收集落盤紀錄',

  ADD_METADATA: '添加元數據',
  'Set Node Scheduling Policy': '設置節點調度策略',
  'You can allow Pod replicas to run on specified nodes.':
    '可以讓容器組副本在指定的節點運行',

  'Additional metadata settings for resources such as Labels and Annotations.':
    '對資源進行額外的元數據設置，例如 Label 和 Annotation',
  'Additional metadata settings for resources.': '對資源進行額外的元數據設置',

  SELECT_NODES: '設置節點調度策略',
  SELECT_NODES_DESC: '可以讓容器組副本在指定的節點運行',
  WORKLOAD_SPECIFY_NODE_DESC: '可以讓容器組副本在指定的節點運行',
  ADD_METADATA_DESC: '對資源進行額外的元數據設置，例如 Label 和 Annotation',
  ROUTE_ADD_METADATA_DESC: 'Add metadata to the Route.',
  SERVICE_ADD_METADATA_DESC: 'Add metadata to the Service.',
  VOLUME_ADD_METADATA_DESC: 'Add metadata to the volume.',
  WORKLOAD_ADD_METADATA_DESC: 'Add metadata to the workload.',
  POD_ADD_METADATA_DESC: 'Add metadata to the Pod replicas.',

  LOCATION: '位置',

  SELECT_CONFIGMAP_DESC: '將配置中的值添加為卷。',
  SELECT_SECRET_DESC: '將密鑰中的值添加為卷。',

  SELECT_VOLUME: '選擇已有儲存卷',
  SELECT_TYPE: '選擇{type}',
  SELECT_VOLUME_DESC: '請選擇一個已經創建好的持久化儲存卷掛載至容器',

  REQUEST_EXCCED: '資源預留不能超過資源限制',
  REQUEST_EXCEED_AVAILABLE_QUOTA: '資源设置不能大於可用資源限制',
  REQUEST_EXCEED_LIMIT: '資源預留不能超過資源限制。',

  WORKLOAD_DESC:
    '工作負載 (Workload) 通常是訪問服務的實際載體, 也是對節點紀錄收集、監控等系統應用的實際運行載體，是對一組容器組 (Pod) 的抽象模型。',

  WORKLOAD_EMPTY_DESC:
    '工作負載 (Workload) 通常是訪問服務的實際載體, 也是對節點紀錄收集、監控等系統應用的實際運行載體，是對一組容器組 (Pod) 的抽象模型。',

  JOB_DESC:
    'Jobs are used to perform short-lived, one-off tasks. A Job creates one or more Pods and ensures that a specific number of Pods successfully terminate.',
  CRONJOB_DESC:
    'CronJobs manages Jobs on a time-based schedule and can be used to perform periodic or recurring tasks.',

  CRONJOB_NAME_DESC:
    '最長 52 個字元，只能包含小寫字母、數字及分隔符號("-")，且必須以小寫字母或數字開頭及結尾',
  CRONJOB_NAME_TOO_LONG: '最長 52 個字元',

  IMAGE_PLACEHOLDER: '點擊右側圖標可選擇鏡像，或直接輸入名稱 例：nginx:latest',
  IMAGE_EMPTY: '請設置鏡像',
  IMAGE_REGISTRY_PLACEHOLDER: '請選擇鏡像倉庫密鑰',
  IMAGE_DESC:
    '要從私有鏡像倉庫部署，需要先<a href={link} target="_blank">創建鏡像倉庫密鑰</a>，然後拉取鏡像。',
  'Replicas Number': '副本數量',
  GRAYSCALE_REPLICAS_DESC: '指定副本數量',
  REPLICA_STATUS: '副本運行狀態',
  REPLICAS_DESC: '{module}將會被創建，由它維護集群中容器組的所需數量',
  'Strategy Type': '策略類型',
  'Update Strategy': '更新策略',
  UPDATE_STRATEGY: '更新策略',
  ONDELETE: '刪除容器組時更新',
  SIMULTANEOUS_UPDATE: '替換升級',
  RollingUpdate: '滾動更新',
  ROLLING_UPDATE_RECOMMENDED: '滾動更新(推薦)',
  RESTART_PL: '重啟次數',
  RESTART: 'Restart',
  RESOURCE_REQUESTS: '資源預留',
  RESOURCE_LIMITS: '資源限制',
  IMAGE_PULL_POLICY: '鏡像拉取策略',
  Privileged: '特權模式',
  'Desired Replicas': '期望副本',
  REPLICAS_CURRENT: '實際運行副本',
  PARTITION_ORDINAL: 'Ordinal for Dividing Pod Replicas',
  PARTITION_ORDINAL_DESC:
    'Set an ordinal to divide the Pod replicas into two groups. When the StatefulSet is updated, only Pod replicas with an ordinal greater than or equal to the value of this parameter are updated.',
  ADJUST_REPLICAS: '立即生效？',
  ADJUST_TRAFFIC_DISTRIBUTION: 'Adjust Traffic Distribution',
  REPLICAS_SCALE_NOTIFY_CONTENT:
    '您已將工作負載的副本數調整為 <strong>{num}</strong>, 您也可以繼續調整副本數量，或者您可以使它立即生效。',
  REPLICAS_SCALE_NOTIFY_CONFIRM: '立即生效({seconds}s)',
  REPLICAS_SCALE_NOTIFY_CANCEL: '放棄更改',

  ROLLING_UPDATE_SETTINGS: '更新時容器組數量',
  MAX_UNAVAILABLE_PODS: '容器組最大不可用數量',
  MAX_EXTRA_PODS: '容器組最大超出數量',
  UPDATE_STRATEGY_DESC:
    '配置升級過程中替換容器組的策略 <a href="{link}" target="_blank">了解更多</a>',
  MAX_UNAVAILABLE_PODS_DESC:
    '升級過程中「允許存在的不可用的容器組」所占總容器組數的最大百分比或數量',
  MAX_EXTRA_PODS_DESC:
    '升級過程中「允許超出副本數量的容器組」的最大數量或百分比',
  ROLLING_UPDATE_POD_TIP:
    '更新時，會根據目前容器組的副本數對最小可用及最大數量進行限制；最小容器組數不可以超過目前副本數，且最大容器組數量不能超過目前副本數的2倍。',
  ONDELETE_DESC:
    '控制器不會自動更新容器組，將會在容器組被手動刪除時，更新並替換容器組實例。',
  ROLLINGUPDATE_DESC:
    '滾動升級將逐步用新版本的實例替換版本的實例，升級的過程中，業務流量會同時負載平衡分布到新舊的實例上，因此業務不會中斷。',
  SIMULTANEOUS_UPDATE_DESC:
    '替換升級會先刪除舊的容器組，再創建新容器組；升級過程中業務會中斷。',

  STATEFULSET_PARTITION_DESC:
    '當更新有狀態副本集時，將更新具有大於或等於 partition 的序數的所有容器組',
  PARTITION_ORDINAL_EMPTY: 'Please set a ordinal for dividing Pod replicas.',
  MIN_READY_SECONDS_DESC: '指定守護進程集中容器組啟動可用所需的最小的秒數',

  'UI Mode': '界面模式',
  'Coding Mode': '代碼模式',

  LABEL_EXIST_DESC: 'The label already exists. Please enter another label.',
  EMPTY_LABEL_DESC: '請添加標籤。',
  DUPLICATE_LABELS: '標籤組重複',
  'Labels cannot be empty': '標籤不能為空',
  ADD_LABEL: '添加標籤',
  'Add Container': '添加容器',
  'Add new container': '添加新的容器',
  'Adding new contianer': '正在添加新的容器',
  ADD_NODE_SELECTOR: '添加節點選擇器',
  CONTAINER_EMPTY_DESC: '請至少添加一個容器',
  CONTAINER_NAME: '容器名稱',
  CONTAINER_TYPE: '容器類型',
  'Advanced Options': '高級選項',
  'CPU(m)': 'CPU(m)',
  Commands: '命令',
  'Add command': '添加命令',
  ARGUMENTS: '參數',
  Argument: '參數',
  'Add argument': '添加參數',
  Protocols: '協定',
  MUST_MATCH: '必須匹配',
  MATCH_IF_POSSIBLE: '盡可能滿足',
  SCHEDULE_WITH_TARGET: '與目標部署到壹起',
  SCHEDULE_AWAY_FROM_TARGET: '遠離目標部署',
  RULE_NOT_COMPLETE: '請填寫完整策略',
  SESSION_AFFINITY: '會話親和性',
  SELECTOR: 'Selector',
  'environment variables': '環境變量',
  ADD_ENVIRONMENT_VARIABLE: '添加環境變量',
  'Read Write Mode': '讀寫模式',
  'Please input mount point': '請輸入掛載點',
  'Please select a storage class': '請選擇儲存卷類型',
  'Please select image': '請選擇鏡像',

  'Invalid name': '名稱格式不合法。{message}',
  'Invalid pod': '容器組數量格式不合法',
  SET_IMAGE_DESC: '請選擇鏡像',
  INVALID_NAME_DESC:
    'Invalid name. The name can contain only lowercase letters, numbers, and hyphens (-), and must start and end with a lowercase letter or number. The maximum length is 63 characters.',
  'Service Labels': '服務標籤',

  'Add Existing Volume': '添加已有儲存卷',
  'Add Temporary Volume': '添加臨時儲存卷',
  'Add HostPath': '添加 HostPath',
  'Add Volume Template': '添加儲存卷模板',

  WORKLOAD_MOUNT_VOLUME_DESC: '支持臨時儲存卷以及持久化儲存卷',

  MOUNT_CONFIGMAP_OR_SECRET_DESC: '將配置文件或密鑰掛載至指定目錄',

  'Please specify an image': '請指定鏡像',

  'Please select protocol': '請選擇協定',
  'Please input port': '請輸入端口',
  PROBE_COMMAND_EMPTY: '請輸入命令',
  VOLUME_NAME_EMPTY: '請輸入儲存卷名稱',

  PORT_INPUT_DESC: 'The port name already exists. Please enter another name.',

  PORT_NAME_DESC:
    'The port name can contain only lowercase letters, numbers, and hyphens (-) and must begin and end with a lowercase letter or number. The maximum length is 63 characters.',

  WORKLOAD_PORT_NAME_DESC:
    'The port name can contain only lowercase letters, numbers and hyphens (-), and must begin and end with a lowercase letter or number. The maximum length is 15 characters.',

  TARGET_CPU_USAGE_DESC: '當 CPU 使用率超過或低於此目標值時，將添加或刪除副本',
  TARGET_MEMORY_USAGE_DESC:
    '當記憶體使用量超過或低於此目標值時，將添加或刪除副本',
  MINIMUM_REPLICAS_DESC: '彈性伸縮可以設置的副本數量的下限',
  MAXIMUM_REPLICAS_DESC: '副本數量的上限',
  REPLICAS_PLACEHOLDER: '預設值: 1',

  DEPLOYMENTS_BASEINFO_DESC:
    '您可以給部署取一個名字，以便在使用的時候容易區分。',
  DEPLOYMENT_POD_TEMPLATE_DESC:
    '工作負載可以根據容器組模板以及您設置的副本數量，自動生成指定數量的容器組',
  DEPLOYMENTS_VOLUME_DESC:
    '可以將同一個臨時儲存卷或持久化儲存卷掛載至部署的容器組的各個副本内。',
  DEPLOYMENT_LABEL_SETTINGS_DESC:
    '標籤是一個或多個關聯到資源如容器組上的鍵值對，我們通常透過標籤來識别、組識或查找資源對象',
  DEPLOYMENT_NODE_SELECT_DESC:
    '通過使用選擇器將容器組調度到期望運行的節點上，這些選擇器是一組或多組鍵值對匹配節點標籤。',
  DEPLOYMENT_JOB_SETTINGS_DESC:
    '您可以在此配置任務 (Job) 的 Job Spec 格式，Job Controller 負責根據 Job Spec 創建 Pod，並持續監控 Pod 的狀態，直到其成功結束。如果失敗，則根據 RestartPolicy（支持 OnFailure 和 Never）決定是否創建新的 Pod 再次重試任務。',
  DEPLOYMENT_CRONJOB_SETTINGS_DESC:
    '您可以在此配置定時任務 (CronJob) 的 Job Spec 格式，Job Controller 負責根據 Job Spec 創建 Pod，並持續監控 Pod 的狀態，直到其成功結束。如果失敗，則根據 RestartPolicy（支持 OnFailure 和 Never）決定是否創建新的 Pod 再次重試任務。',

  STATEFULSETS_BASEINFO_DESC:
    '您可以給有狀態副本起一個名字，以便在使用的時候容易區分。',
  STATEFULSETS_VOLUME_TEMPLATE_DESC:
    '為有狀態副本集的每個容器組創建專屬的持久化儲存卷，並掛載至相應的容器組',
  STATEFULSETS_ADD_VOLUME_TEMPLATE_DESC: '請添加一個儲存卷模板',
  STATEFULSETS_SERVICE_CONFIG_DESC:
    '集群不為服務生成 IP，集群内部通過服務的後端 Endpoint IP 直接訪問服務。此類型適合後端異構的服務，比如需要區分主從的服務。',

  DAEMONSETS_BASEINFO_DESC:
    '守護進程集保證在每個主機上都運行一個容器副本，常用來部署一些集群的紀錄、監控或者其他系統管理應用。',
  DAEMONSETS_VOLUME_DESC:
    '可將 HostPath，臨時儲存卷，持久化儲存卷掛載至守護進程集的容器組内。',

  JOBS_BASEINFO_DESC: '',
  JOBS_POD_TEMPLATE_DESC: '指定任務中運行的容器組模板',
  JOBS_VOLUME_DESC: '可以將臨時儲存卷，持久化儲存卷掛載至任務的容器組内。',
  CRONJOBS_BASEINFO_DESC: '創建定時任務所需的基本資訊，需指定名稱與定時計畫',
  CRONJOBS_VOLUME_DESC:
    '可以將臨時儲存卷，持久化儲存卷掛載至定時任務的容器組内。',
  CRONJOB_CRON_DESC:
    'Set a schedule for the CronJob. KubeSphere uses UTC by default and you need to adjust the schedule according to your time zone. <a href="//en.wikipedia.org/wiki/Cron" target="_blank">Learn More</a>',

  MOUNT_VOLUME_DESC:
    '持久化儲存卷請選擇支持多節點讀寫模式 (ROX 或者 RWX) 的儲存卷，否則可能因容器組不在同一節點導致容器組更新失敗。如果您選擇了單節點讀寫 (RWO) 模式的儲存卷您也可以通過節點選擇將容器組安排在同一節點上來避免因儲存卷訪問模式造成的更新錯誤。',

  Job: '任務',
  JOB: '任務',
  CronJob: '定時任務',
  CRONJOB: '定時任務',
  CRONJOB_PL: '定時任務',
  NUMBER_OF_CRONJOBS: 'Number of CronJobs',
  CRONJOB_LOW: '定時任務',
  Revision: '版本',
  EVERY_DAY: '0 0 * * * (every day)',
  EVERY_HOUR: '0 * * * * (every hour)',
  EVERY_MONTH: '0 0 1 * * (every month)',
  EVERY_WEEK: '0 0 * * 0 (every week)',
  Schedule: '定時計畫',
  REVISION_RECORDS: '版本記錄',
  'Revision Rollback': '版本回退',
  'Rollback Revisions': '回退版本',
  'Current Revision': '目前版本',
  'Execution Records': '執行記錄',
  REVISION_RECORD: 'Revision record',
  ROLL_BACK: '回退',
  EDIT_AUTOSCALING: 'Edit Autoscaling',
  TARGET_REVISION_RECORD: '回退版本',
  CURRENT_REVISION_RECORD: '目前修改记录',
  RUNNING_RECORDS: '執行記錄',
  'Cluster Resource Status': '集群資源狀態',
  RESOURCE_STATUS: '資源狀態',
  RESOURCE_NAME: '資源名稱',
  'Config Template': '配置模板',
  'Edit Config Template': '編輯配置模板',
  EDIT_SETTINGS: '編輯配置模板',
  EDIT_APP_SETTINGS: 'Edit App Settings',
  ENVIRONMENT_VARIABLE_PL: '環境變量',
  ENVIRONMENT_VARIABLE: '環境變量',
  'File List': '文件列表',
  RERUN: '重新執行',
  ENTER_SCHEDULE_TIP: '請选择定時計畫。',

  TARGET_REVISION_EMPTY_DESC: '請選擇回退版本',

  HORIZONTAL_POD_AUTOSCALING: '彈性伸縮',
  AUTOSCALING: '彈性伸縮',
  'Container Config': '容器配置',
  EDGENODE_CONFIG_COMMAND: '添加命令',
  PROBE_PL: '探針',
  'Add Probe': '添加探針',
  'Initial Delay': '初始延遲',
  INITIAL_DELAY_S: '初始延遲（s）',
  INITIAL_DELAY_TIMEOUT_VALUE: '{delay}s 初始延遲, {timeout}s 超時時間',
  TIMEOUT_PERIOD_S: '超時時間（s）',
  CHECK_INTERVAL_S: '執行探測頻率(秒)',
  SUCCESS_THRESHOLD: '健康臨界值',
  FAILURE_THRESHOLD: '不健康臨界值',
  HTTP_REQUEST: 'HTTP 請求檢查',
  HTTP_PATH_EMPTY: '請設置 HTTP 檢查的路徑。',
  TCP_PORT: 'TCP 端口檢查',
  WORKER_CONTAINER: '工作容器',
  'Request Type': '請求類型',

  MAXIMUM_DELAY: 'Maximum Start Delay (s)',
  SUCCESSFUL_JOBS_RETAINED: '保留完成任务數',
  FAILED_JOBS_RETAINED: '保留失敗任务數',
  CONCURRENCY_POLICY: '並發策略',
  RUN_JOBS_CONCURRENTLY: 'Run Jobs concurrently',
  SKIP_NEW_JOB: 'Skip new Job',
  SKIP_OLD_JOB: 'Skip old Job',

  'Select resource': '選擇資源',
  RESTART_POLICY: '重啟策略',
  RESOURCE: '選擇資源',
  'Restart Policy': '重啟策略',

  LIVENESS_CHECK: '容器存活檢查',
  READINESS_CHECK: '容器就緒檢查',
  STARTUP_CHECK: '容器啟動檢查',

  RECREATE: '重新部署',
  RECREATE_SUCCESS_DESC: '重新部署成功',

  RECREATE_CONFIRM_DESC:
    '您即將重新部署工作負載 {resource} ({type}) , 容器組將根據更新策略進行重新部署，您的業務可能會被暫時中斷。',

  MORE: '更多操作',
  MANAGE: '管理',

  REVISION_ROLLBACK_SELECT: '請選擇要回退的版本',
  REVISION_TITLE: '{name}版本',
  'is running': '正在運行',
  PROBE_TIME: '初始延時: {delay}s 超時時間:{timeout}s',
  READINESS_PROBE: '就緒探針',
  LIVENESS_PROBE: '存活探針',
  STARTUP_PROBE: '啟動探針',

  INITIAL_DELAY_DESC: '在檢查其運行狀況之前，容器啟動後需要等待多長時間。',
  TIMEOUT_PERIOD_DESC:
    '等待探針完成多長時間。如果超過時間，則認為探測失敗。預設為1秒。最小值為1。',
  CHECK_INTERVAL_DESC: '執行探測的頻率（以秒為單位）。預設為10秒。最小值為1。',
  SUCCESS_THRESHOLD_DESC:
    '探測失敗後，連續最小成功探測為成功。預設值為1。最小值為1。存活探針和啟動探針内必須為1。',
  FAILURE_THRESHOLD_DESC: '探針進入失敗狀態時需要連續探測失敗的最小次數。',

  CONFIGURE_AUTOSCALING_DESC:
    '根據 CPU 和記憶體使用情況自動伸縮副本。如果同時指定 CPU 和記憶體，則滿足任一條件後即添加或刪除副本',
  PROBE_MSG:
    'Readiness Probe 檢查容器是否準備好處理請求。失敗意示著容器不應該從代理接收任何流量，即使它正在運行。Liveness Probe 檢查配置它的容器是否仍在運行。如果活動狀態探測器失敗，則會殺死容器，容器將遵循其重啟策略',
  WORKLOAD_REPLICA_MSG:
    '在用戶定義範圍内，如果 Pod 增多，則 ReplicationController 會終止額外的 Pod，如果減少，RC 會創建新的 Pod，始終保持在定義範圍。例如，RC 會在 Pod 維護（例如内核升級）後在節點上重新創建新 Pod。',
  DEPLOYMENTS_REPLICA_DESC:
    '部署 (Deployment) 用來描述期望應用達到的目標狀態，主要用來描述無狀態應用，副本的數量和狀態由其背後的控制器來維護，確保狀態與定義的期望狀態一致。您可以增加副本數量來滿足更高負載；回滾部署的版本來消除程式的錯誤修改；創建自動伸縮器來彈性應對不同場景下的負載。',
  STATEFULSETS_REPLICA_DESC:
    '有狀態副本集 (StatefulSet) 用來描述有狀態應用，比如副本之間有主從關係，數據需要做持久化。與部署 (Deployment) 相同的是，有狀態副本集創建的副本也是完全相同的，不同的是每個副本有個固定且唯一的標示，即使副本被重新調度了，標示也不會發生變化。您可以用有狀態副本集來實現應用的有序部署，有序的刪除，有序的滾動更新。',
  DAEMONSETS_REPLICA_DESC:
    '守護進程集 (DaemonSet) 可以確保集群中的每個節點運行一個副本，當有節點加入集群或者离開集群的時候，會自動地調整副本的數量來保證副本的數量與集群的節點數量一致。您可以使用守護進程集來運行儲存服務，如 GlusterFS，Ceph 等；運行紀錄搜集服務，如 Fluentd，Logstash 等；運行監控服務等。',

  FAILED_JOBS_RETAINED_DESC: '允許保留的失敗的任務個數。',
  SUCCESSFUL_JOBS_RETAINED_DESC: '允許保留的成功的任務個數。',
  CONCURRENCY_POLICY_DESC:
    'Select a concurrency policy of a Job created by the CronJob.',
  'Can be found by node IP or node name': '可以通過節點 IP 或者節點名稱查找',
  MAXIMUM_DELAY_DESC:
    'Deadline for starting the Job if the scheduled run is missed for any reason.',
  'Container CPU Resource Request, 1 Core = 1000m':
    '容器的 CPU 資源請求值, 1核 = 1000m',
  'Container Memory Resource Request': '容器的 記憶體 資源請求值',
  'The minimum of the replicas that can be set by HPA':
    '彈性伸縮可以設置的副本數量的下限',
  MINIMUM_REPLICAS: '最小副本數',
  MAXIMUM_REPLICAS: '最大副本數',
  'Maximum number of replicas': '副本數量的上限',
  TARGET_CPU_USAGE: '目標使用率',
  TARGET_MEMORY_USAGE: '目標使用量',
  'Current Utilization': '目前使用率',
  TARGET_CPU_USAGE_UNIT: 'CPU 目標使用率',
  'Memory Target Utilization': '記憶體目標使用率',
  TARGET_MEMORY_USAGE_UNIT: '記憶體目標使用量',

  'min replicas number should not be greater than max replicas number':
    '最大副本數應不小於最小副本數',

  HPA_SET_TIP: '已設置彈性伸縮策略',

  'Mount path is already in use': '掛載路徑已使用',
  'Please specify the read and write mode and mount path':
    '請指定讀寫方式及掛載路徑',
  'Please add at least one volume': '請至少添加一個儲存卷',
  'Please add at least one volume or volume template':
    '請至少添加一個儲存卷或儲存卷模板',
  'Please select a volume': '請選擇儲存卷',
  'Please select a configmap': '請選擇配置文件',
  'Please select a secret': '請選擇密鑰',
  COLLECT_LOGS_ON_VOLUMES_Q: 'How do I collect logs on volumes?',
  MOUNT_PATH_IN_USE: '掛載路徑已使用',
  READ_WRITE_MOUNT_EMPTY: '請指定讀寫方式及掛載路徑',
  MOUNT_VOLUME: '添加儲存卷',
  MOUNT_VOLUME_OR_TEMPLATE: '請至少添加一個儲存卷或儲存卷模板',
  VOLUME_NOT_SELECT: '請選擇儲存卷',
  CONFIGMAP_NOT_SELECT: '請選擇配置文件',
  SECRET_NOT_SELECT: '請選擇密鑰',
  'What is Disk Log Collection?': '什麼是落盤紀錄收集？',

  'for example': '例如',
  CONTAINER_LOG_PATH: '容器紀錄相對路徑',
  'log path relative to container mount path': '紀錄路徑相對於容器掛載路徑',

  SPECIFY_SUBPATH: '點擊添加子路徑',
  SUBPATH: '子路徑',
  SPECIFY_SUBPATH_TIP: '僅適用於儲存卷掛載，不適用於主機路徑映射',

  'Host Path': '主機路徑',

  HOST_PATH_DESC:
    'HostPath 允許掛載主機上的文件系統到容器組裡面去。如果容器組需要使用主機上的文件，可以使用 HostPath。',
  SELECT_SPECIFIC_KEYS: '選擇特定的鍵和路徑',
  SELECT_SPECIFIC_KEYS_DESC:
    '選擇要使用的密鑰以及將公開每個密鑰的文件路徑，文件路徑相當於裝載路徑，每個文件的内容都是密鑰的值。',
  EMPTY_DIR_DESC:
    '臨時儲存卷隨 Pod 被分配在主機上。當 Pod（不管任何原因）從主機上被刪除時，臨時儲存卷也同時會刪除，儲存卷的數據也將永久刪除。<br />注：刪除容器不影響臨時儲存卷。',
  SELECT_VOLUME_TYPE_DESC: '您可以根據需要選擇適合您的儲存卷類型進行添加',

  MAXIMUM_RETRIES: '最大重試次數',
  PARALLEL_PODS: '並行數',
  COMPLETE_PODS: '完成數',
  MAXIMUM_DURATION: '退出超時時限（s）',

  MAXIMUM_RETRIES_DESC:
    'Maximum number of retries before the Job is marked as failed. The default value is 6.',
  PARALLEL_PODS_DESC: 'Number of Pods that run concurrently.',
  COMPLETE_PODS_DESC:
    'Number of Pods that complete successfully required for the Job to be marked as complete.',
  MAXIMUM_DURATION_DESC:
    'Maximum duration of the Job. The Job is terminated when it reaches the specified deadline.',

  RESTART_POLICY_NEVER_DESC: 'Never（容器組出現故障時創建新的容器組）',
  RESTART_POLICY_ONFAILURE_DESC: 'On failure（容器組出現故障時内部重啟容器）',

  RESTART_POLICY_TIP:
    'RestartPolicy 只能指定 Never 或 OnFailure，當任務未完成的情況下：<br/>* 如果 RestartPolicy 指定 Never，則任務會在容器組出現故障時創建新的容器組，且故障容器組不會消失。<br/>* 如果 RestartPolicy 指定 OnFailure，則任務會在容器組出現故障時其内部重啟容器，而不是創建容器組。',

  MONITORING_ALERT_DESC:
    '目前監控最多可顯示五個副本的運行狀態監控，當超過五個副本時，可以點擊具體監控項目的「查看全部副本」，查看更多的副本監控。',

  CONTAINER_CPU_DESC:
    '作為容器調度時資源分配的判斷依賴。只有當節點上可分配CPU總量 ≥ 容器CPU最小使用值時，才允許將容器調度到該節點。單位換算規則: 1核 = 1000m',
  CONTAINER_MEMORY_DESC:
    '作為容器調度時資源分配的判斷依賴。只有當節點上可分配記憶體總量 ≥ 容器記憶體最小使用值時，才允許將容器調度到該節點。',
  'request CPU should not be greater than limit CPU':
    '最小使用 CPU 值應不大於最大使用 CPU 值',
  'request memory should not be greater than limit memory':
    '最小使用記憶體值應不大於最大使用記憶體值',

  INVALID_IMAGE: '鏡像無效。',
  IMAGE_PULL_POLICY_ALWAYS: '嘗試重新下載鏡像（Always）',
  IMAGE_PULL_POLICY_IFNOTPRESENT: '優先使用本地鏡像（IfNotPresent）',
  IMAGE_PULL_POLICY_NEVER: '僅使用本地鏡像（Never）',
  IMAGE_PULL_POLICY_ALWAYS_DESC: '在創建及更新時，每次都會嘗試下載新的鏡像',
  IMAGE_PULL_POLICY_IFNOTPRESENT_DESC: '如果本地存在鏡像就優先使用本地鏡像',
  IMAGE_PULL_POLICY_NEVER_DESC:
    '僅會使用本地鏡像，如果本地不存在所需鏡像，則會導致容器異常',

  LIVENESS_CHECK_DESC: '該檢查方式用於檢測容器是否活著。',
  READINESS_CHECK_DESC: '該檢查方式用於檢測容器是否準備好開始處理用戶請求。',
  STARTUP_CHECK_DESC: '該檢查方式用於檢測容器是否啟動成功。',
  STARTUP_CHECK_TIP: '需要 Kubernetes v1.18 或以上版本。',

  VOLUME_OR_TEMPLATE_EMPTY:
    '您已開啟落盤紀錄收集，請至少添加一個儲存卷並指定紀錄所在目錄',
  VOLUME_EMPTY: '您已開啟落盤紀錄收集，請至少添加一個儲存卷並指定紀錄所在目錄',
  COLLECT_LOGS_ON_VOLUMES_DESC:
    'After you add a volume (ReadAndWrite mode), you can collect logs inside the volume. When you enable disk log collection, the Filebeat image will be used as a sidecar pattern and injected into the Pod to collect logs.',

  PROJECT_COLLECT_SAVED_DISABLED_DESC:
    'Please contact the project administrator to enable disk log collection in <b>Project Settings</b> > <b>Advanced Settings</b>.',

  ADD_VOLUME_TEMPLATE_DESC:
    '添加儲存卷模板，儲存卷的生命週期將隨容器組的生命週期存在',

  CONTAINER_LOG_PATH_TIP:
    '容器紀錄相對路徑是從容器掛載路徑開始的路徑，可以 glob 方式給出，多組時以英文逗号分隔。例如當容器掛載路徑為 /data 時，容器紀錄相對路徑配置為 log/*.log，表示匹配 /data/log 目錄下所有 .log 後缀文件。<br/>若需要匹配 /data/log 目錄及其子目錄下的所有 .log 後缀文件，可將容器紀錄相對路徑配置為 log/**/*.log',

  NO_DEFAULT_PORT: '暫無預設端口配置',
  ports: '端口',
  layers: '層級',
  REGISTRY: '倉庫',
  'Private Registry': '私有倉庫',
  'Image Name': '鏡像名稱',
  NO_IMAGE_FOUND: '沒有找到此鏡像',
  DECENTRALIZED_SCHEDULING: '容器組分散部署',
  'Pod Soft Decentralized Deployment': '容器組軟分散部署',
  'Pod Hard Decentralized Deployment': '容器組硬分散部署',
  CENTRALIZED_SCHEDULING: '容器組聚合部署',
  'Pod Soft Aggregation Deployment': '容器組軟聚合部署',
  'Pod Hard Aggregation Deployment': '容器組硬聚合部署',
  DECENTRALIZED_SCHEDULING_DESC: '容器組副本將會盡量分散在不同的節點中',
  CENTRALIZED_SCHEDULING_DESC: '容器組副本將會盡量部署在同一節點上',
  'Pod replicas will be deployed by the default policy.':
    '容器組副本將根據預設策略部署',
  ADD_CONTAINER_DESC:
    'Kubesphere 支持從鏡像倉庫拉取鏡像以及通過代碼構建新的鏡像並部署',

  SCHEDULING_INFORMATION: '調度資訊',
  SCHEDULING_RESULT: '節點調度資訊',
  POD_STATUS_ANALYSIS: '容器狀態分析',
  CURRENT_STATUS: '目前階段(phase)',
  SCHEDULED_TO_NODE: '調度至 {value}',
  SCHEDULING_NOT_SUCCESSFUL: 'Scheduling Not Successful',
  POD_SCHEDULING_METHOD: '容器組如何被調度至節點?',
  'Pod CPU Request': '容器組CPU請求',
  'Pod Memory Request': '容器組記憶體請求',

  MIN_READY_SECONDS: '最小就緒時間 (MinReadySeconds)',
  MIN_READY_SECONDS_EMPTY:
    'Please set the minimum stable running time required for the Pod to be considered ready.',

  POD_CONDITION_INITIALIZED: 'Initialized',
  POD_CONDITION_INITIALIZED_DESC: '所有 init 容器都已成功啟動',
  POD_CONDITION_READY: '開始運行(Ready)',
  POD_CONDITION_READY_DESC: '容器組已經開始運行，並可以通過服務進行訪問',
  POD_CONDITION_CONTAINERSREADY: '容器準備就緒(ContainersReady)',
  POD_CONDITION_CONTAINERSREADY_DESC: '容器組内容器準備就緒.',
  POD_CONDITION_PODSCHEDULED: '調度成功(PodScheduled)',
  POD_CONDITION_PODSCHEDULED_DESC: '容器組已經被安排到一個節點中',

  POD_REASON_FAILEDCREATE: '創建失敗(FailedCreate)',
  POD_REASON_SUCCESSFULCREATE: '創建成功(SuccessfulCreate)',
  POD_REASON_FAILEDDELETE: '刪除失敗(FailedDelete)',
  POD_REASON_SUCCESSFULDELETE: '刪除成功(SuccessfulDelete)',

  POD_ASSIGNED_DESC:
    '根據容器組中容器設置的請求值 (即 Request) 作為容器調度時資源分配的判斷依據。只有節點上可分配總量 ≥ 容器請求值時，才允許將容器調度到該節點。',

  CrashLoopBackOff: '容器退出，kubelet 正在將它重啟',
  InvalidImageName: '無法解析鏡像名稱',
  ImageInspectError: '無法校驗鏡像',
  ErrImageNeverPull: '目前策略禁止拉取鏡像',
  ImagePullBackOff: '正在重試拉取鏡像',
  RegistryUnavailable: '無法连接鏡像倉庫',
  ErrImagePull: '鏡像拉取失敗',
  CreateContainerConfigError: '不能創建 kubelet 使用的容器配置',
  CreateContainerError: '創建容器失敗',
  'm.internalLifecycle.PreStartContainer': '執行 hook 報錯',
  RunContainerError: '啟動容器失敗',
  PostStartHookError: '執行 hook 報錯',
  ContainersNotInitialized: '容器未初始化',
  ContainersNotReady: '容器沒有準備就緒',
  ContainerNotReady: '容器沒有準備就緒',
  ContainerCreating: '容器創建中',
  PodInitializing: '容器組初始化中',
  DockerDaemonNotReady: 'Docker 還沒有完全啟動',
  NetworkPluginNotReady: '網路插件還沒有完全啟動',
  POD_DESC:
    '容器組 (Pod) 是 Kubernetes 應用程式的基本執行單元，是您創建或部署的 Kubernetes 對象模型中最小和最簡單的單元。',
  POD_EMPTY_DESC:
    '容器組 (Pod) 是 Kubernetes 應用程式的基本執行單元，是您創建或部署的 Kubernetes 對象模型中最小和最簡單的單元。',
  FILL_IMAGE_DEFAULT_PORTS_DESC: '是否暴露該鏡像的預設端口？',

  ISTIO_PROTOCOL_TIP:
    'To fully use the Application Governance feature, select a protocol based on the actual usage of the Service. The port name will be generated in the <Protocol>-<Name> format.',

  STATUS_INFORMATION: '狀態分析(Conditions)',
  WORKLOAD_CONDITION_AVAILABLE: '可用性(Available)',
  WORKLOAD_CONDITION_PROGRESSING: '創建進度(Progressing)',
  WORKLOAD_REASON_REPLICASETUPDATED: '副本已更新(ReplicaSetUpdated)',
  WORKLOAD_REASON_REPLICASETCREATEERROR: '新建副本錯誤(ReplicaSetCreateError)',
  WORKLOAD_REASON_NEWREPLICASETCREATED: '已創建新副本(NewReplicaSetCreated)',
  WORKLOAD_REASON_FOUNDNEWREPLICASET: '發現新副本(FoundNewReplicaSet)',
  WORKLOAD_REASON_NEWREPLICASETAVAILABLE: '可用新副本(NewReplicaSetAvailable)',
  WORKLOAD_REASON_PROGRESSDEADLINEEXCEEDED:
    '處理超時(ProgressDeadlineExceeded)',
  WORKLOAD_REASON_DEPLOYMENTPAUSED: '部署中止(DeploymentPaused)',
  WORKLOAD_REASON_DEPLOYMENTRESUMED: '部署已恢復(DeploymentResumed)',
  WORKLOAD_REASON_MINIMUMREPLICASAVAILABLE:
    '最小副本可用(MinimumReplicasAvailable)',
  WORKLOAD_REASON_MINIMUMREPLICASUNAVAILABLE:
    '最小副本不可用(MinimumReplicasUnavailable)',
  WORKLOAD_REASON_FAILEDCREATE: '創建失敗(FailedCreate)',

  ReplicaSetUpdated: '副本已更新',
  ReplicaSetCreateError: '新建副本錯誤',
  NewReplicaSetCreated: '已創建新副本',
  FoundNewReplicaSet: '發現新副本',
  NewReplicaSetAvailable: '可用新副本',
  ProgressDeadlineExceeded: '處理超時',
  DeploymentPaused: '部署中止',
  DeploymentResumed: '部署已恢復',
  MinimumReplicasAvailable: '最小副本可用',
  MinimumReplicasUnavailable: '最小副本不可用',
  FailedCreate: '創建失敗',
  SuccessfulCreate: '創建成功',
  FailedDelete: '刪除失敗',
  SuccessfulDelete: '刪除成功',

  USE_DEFAULT_PORTS: '使用預設端口',

  CONTAINER_NOT_SELECTED: '請至少選擇一個容器進行掛載',
  'Sure to delete the workload(s)?': '確認刪除工作負載',
  NO_RELATED_RESOURCE_FOUND: '沒有關聯的資源',
  'No related resources found with the current workload(s)':
    '目前工作負載下沒有關聯的資源',
  DELETE_WORKLOAD_DESC_SI:
    'You are about to delete the workload {resource}.<br/>Do you want to also delete the resource related to the workload?',
  DELETE_WORKLOAD_DESC_PL:
    'You are about to delete the workloads {resource}.<br/>Do you want to also delete the resources related to the workloads?',

  CONTAINER_SECURITY_CONTEXT: '容器 Security Context',
  POD_SECURITY_CONTEXT: '容器組 Security Context',
  USER_AND_USER_GROUP: '用戶和用戶組',
  USER_GROUP: '用戶組',
  CONTAINER_SECURITY_CONTEXT_DESC:
    'Security Context的目的是限制不可信容器的行為，保護系統和其他容器不受其影響。',
  POD_SECURITY_CONTEXT_DESC: '自定義容器組的訪問控制和權限設置。',
  POD_SECURITY_CONTEXT_TIP:
    '容器組 Security Context 可以為容器組内的容器提供預設的用戶和用戶組設置以及 seLinuxOptions 的參數設置，如果容器中已經對這些參數進行了定義，則優先以容器中的設置為準。',
  PRIVILEGED_MODE: '特權模式',
  PRIVILEGED_MODE_DESC: '此時容器中的進程本質上等價於宿主節點上的 root 用戶。',
  ALLOW_PRIVILEGE_ESCALATION: '允許擴大特權(AllowPrivilegeEscalation)',
  ALLOW_PRIVILEGE_ESCALATION_DESC:
    '進程是否可以獲取比父進程更多的特權。當以特權模式運行時，則為允許狀態。',
  ROOT_DIRECTORY_READONLY: '文件系統root唯讀(ReadOnlyRootFilesystem)',
  ROOT_DIRECTORY_READONLY_DESC: '該容器的文件系統根路徑是否唯讀。',
  RUN_AS_NON_ROOT: '僅允許非 Root 用戶',
  RUN_AS_NON_ROOT_DESC:
    'Kubernetes 在運行容器之前將執行檢查，以確保容器進程不是以 root 用戶（UID為0）運行，否則將不能啟動容器。',
  RUN_AS_USER_DESC: '執行容器 entrypoint 進程的 UID。預設為 docker 引擎的 GID',
  RUN_AS_USER_GROUP_DESC:
    '執行容器 entrypoint 進程的 GID。預設為 docker 引擎的 GID',

  COMPARE_WITH: '與上一個版本 {version} 的對比',
  REVISION_RECORDS_DESC:
    '對工作負載的資源模板進行修改後會生成一個新的紀錄並重新調度 容器組（Pod）進行版本的疊代，預設保存10個最近的版本。您可以根據修改紀錄進行重新部署。',

  CLUSTER_DIFF_CONTAINER_SETTINGS_DESC:
    '根據不同的需要在不同的集群中設置不同的容器',
  CLUSTER_DIFF_PORT_SETTINGS_DESC: '可以在不同集群設置不同的服務端口',
  CLUSTER_DIFF_ENVIRONMENT_VARIABLES_DESC: '可以在不同集群設置不同的環境變量',

  CONTAINER_RESOURCE_LIMIT_TIP:
    '請設置容器的資源限制與資源預留，這將能夠幫助系統更好地調度容器，提高穩定性。您也可在【項目設置】中，通過【基本資訊】->【項目管理】->【編輯資源預設請求】，來統一設置預設值。',

  REPLICAS_AVAILABLE: '實際副本',
  REPLICAS_DESIRED: '期望副本数',

  SYNC_HOST_TIMEZONE_DESC: '時區與主機同步後，容器内的時區將與主機節點一致。',
  HOSTPATH_TIP:
    'HostPath 將主機的文件系統掛載到Pod中，它使一些應用程式能逃出對其做出的隔離限制，請謹慎使用。',

  DEPLOY_PLACEMENT_TIP_TITLE: '什麼是部署位置？',
  DEPLOY_PLACEMENT_TIP_VALUE:
    '可以將容器組部署在不同集群中，並對集群中部署的副本數量進行定義。不同集群中的容器組將由聯邦集群控制器(Federation Controller Manager)進行統一的調度及狀態同步。',
  CERT_ERROR: '發現證書錯誤，是否忽略證書驗證並再次',
  IGNORE_CERT_WARN_DESC: '忽略驗證證書，可能會導致帳戶密碼被欺騙。',
  INVALID_PROJECT: '項目不可選',
  DESC_CREATE_CONFIGMAP_SECRET: '如果沒有合適的配置文件或密鑰引用, 您可以',

  // Pods Page
  NODE_IP: '{node}（{ip}）',

  // Jobs
  JOB_PL: 'Jobs',
  JOBS: 'Jobs',
  NUMBER_OF_JOBS: 'Number of Jobs',
  JOB_LOW: 'Job',
  CRONJOBS: 'CronJobs',
  SCHEDULE: 'Schedule',

  // CronJobs
  ADD_VOLUME: 'Add Volume',
  RESTART_POLICY_DESC: 'Set the Pod restart policy.',
  MOUNT_VOLUMES: 'Mount Volumes',

  // Workload
  GPU_SETTING_TIP: 'Set the GPU Limit to null means no limit.',
  NETWORK_SEGMENT_SCAP: 'Network segment',
  JOB_COMPLETED: 'Completed',
  JOB_FAILED: 'Failed',
  JOB_RUNNING: 'Running',
  CRONJOB_PAUSED: 'Paused',
  CRONJOB_RUNNING: 'Running',
  CRONJOB_FAILED: 'Failed',
}
