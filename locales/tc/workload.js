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
  CONTAINER_IMAGE: '容器鏡像',
  MOUNT_PATH_EMPTY: '請輸入掛載路徑。',
  IMAGE_TIME_SIZE_LAYER_PL: 'Updated {time}, {size}, {layer} layer',
  IMAGE_TIME_SIZE_LAYER_SI: 'Updated {time}, {size}, {layer} layers',
  HTTP_PATH_EMPTY: '請設置 HTTP 檢查的路徑。',
  DUPLICATE_LABELS: '標籤組重複',
  REVISION_RECORD: 'Revision record',
  INVALID_PROJECT: '項目不可選',
  ADD_RULE: '添加部署模式',
  GPU_SETTING_TIP: 'Set the GPU Limit to null means no limit.',
  'Access Mode': '訪問模式',
  'Add argument': '添加參數',
  'Add command': '添加命令',
  'Add Container': '添加容器',
  'Add Existing Volume': '添加已有儲存卷',
  'Add HostPath': '添加 HostPath',
  ADD_LABEL: '添加標籤',
  'Add Labels': '添加標籤',
  'Add new container': '添加新的容器',
  'Add Probe': '添加探針',
  'Add Temporary Volume': '添加臨時儲存卷',
  'Add Volume': '添加儲存卷',
  'Add Volume Template': '添加儲存卷模板',
  'Adding new contianer': '正在添加新的容器',
  'Additional metadata settings for resources such as Labels and Annotations.':
    '對資源進行額外的元數據設置，例如 Label 和 Annotation',
  'Additional metadata settings for resources.': '對資源進行額外的元數據設置',
  WORKLOAD_ADD_METADATA_DESC: 'Add metadata to the workload.',
  'Advanced Options': '高級選項',
  'Applied to the workload': 'Applied to the workload',
  Argument: '參數',
  ARGUMENTS: '參數',
  'Available number of nodes scheduled': '可用節點數',
  'Can be found by node IP or node name': '可以通過節點 IP 或者節點名稱查找',
  capacity: '容量',
  'Cluster Resource Status': '集群資源狀態',
  'Coding Mode': '代碼模式',
  'Collecting file log': '收集落盤紀錄',
  Commands: '命令',
  'Config Template': '配置模板',
  'Container Config': '容器配置',
  'Container CPU Resource Request, 1 Core = 1000m':
    '容器的 CPU 資源請求值, 1核 = 1000m',
  'Container Memory Resource Request': '容器的 記憶體 資源請求值',
  'Container Setting': '容器設置',
  ContainerCreating: '容器創建中',
  ContainerNotReady: '容器沒有準備就緒',
  ContainersNotInitialized: '容器未初始化',
  ContainersNotReady: '容器沒有準備就緒',
  'CPU(m)': 'CPU(m)',
  CrashLoopBackOff: '容器退出，kubelet 正在將它重啟',
  CreateContainerConfigError: '不能創建 kubelet 使用的容器配置',
  CreateContainerError: '創建容器失敗',
  created: '已創建',
  CronJob: '定時任務',
  'CronJob Settings': '定時任務設置',
  'Current number of nodes scheduled': '目前節點數',
  'Current Revision': '目前版本',
  'Current Stage(phase)': 'Current Stage(phase)',
  'Current Utilization': '目前使用率',
  DeploymentPaused: '部署中止',
  DeploymentResumed: '部署已恢復',
  'Desired number of nodes scheduled': '期望節點數',
  'Desired Replicas': '期望副本',
  DockerDaemonNotReady: 'Docker 還沒有完全啟動',
  EDIT_CONTAINER: '編輯容器',
  EmptyDir: '臨時儲存卷',
  Environment: '環境變量',
  'environment variables': '環境變量',
  ErrImageNeverPull: '目前策略禁止拉取鏡像',
  ErrImagePull: '鏡像拉取失敗',
  'Exec Command Check': 'Exec Command Check',
  'Every Day': 'Every Day',
  'Every Hour': 'Every Hour',
  'Every Month': 'Every Month',
  'Every Week': 'Every Week',
  RUNNING_RECORDS: '執行記錄',
  FailedCreate: '創建失敗',
  FailedDelete: '刪除失敗',
  'File List': '文件列表',
  'for example': '例如',
  FoundNewReplicaSet: '發現新副本',
  HORIZONTAL_POD_AUTOSCALING: '彈性伸縮',
  'Host Path': '主機路徑',
  'Image Name': '鏡像名稱',
  ImageInspectError: '無法校驗鏡像',
  ImagePullBackOff: '正在重試拉取鏡像',
  'Initial Delay': '初始延遲',
  'Instance Status': '實例狀態',
  'Invalid image': 'Invalid image',
  'Invalid name': '名稱格式不合法。{message}',
  'Invalid pod': '容器組數量格式不合法',
  InvalidImageName: '無法解析鏡像名稱',
  'is running': '正在運行',
  Job: '任務',
  'Job Settings': '任務設置',
  'Job Template': '任務模板',
  LABEL_EXIST_DESC: 'The label already exists. Please enter another label.',
  'Labels cannot be empty': '標籤不能為空',
  layers: '層級',
  'log path relative to container mount path': '紀錄路徑相對於容器掛載路徑',
  'm.internalLifecycle.PreStartContainer': '執行 hook 報錯',
  MAX_SURGE_POD_VALIDATOR: 'MAX_SURGE_POD_VALIDATOR',
  'Maximum number of replicas': '副本數量的上限',
  'Memory Target Utilization': '記憶體目標使用率',
  'min replicas number should not be greater than max replicas number':
    '最大副本數應不小於最小副本數',
  MinimumReplicasAvailable: '最小副本可用',
  MinimumReplicasUnavailable: '最小副本不可用',
  Mount: '掛載',
  'Mount point': '掛載點',
  'Mount Temporary Volume': '掛載臨時儲存卷',
  'Mount Volume': '掛載儲存卷',
  mounted: '已掛載',
  NetworkPluginNotReady: '網路插件還沒有完全啟動',
  'New Volume': '新建儲存卷',
  NewReplicaSetAvailable: '可用新副本',
  NewReplicaSetCreated: '已創建新副本',
  'No related resources found with the current workload(s)':
    '目前工作負載下沒有關聯的資源',
  'No Request': 'No Request',
  'No resource limits': 'No resource limits',
  'Please add at least one volume': '請至少添加一個儲存卷',
  'Please add at least one volume or volume template':
    '請至少添加一個儲存卷或儲存卷模板',
  'Please input command': 'Please input command',
  'Please input a schedule.': 'Please input a schedule.',
  'Please input mount point': '請輸入掛載點',
  'Please input port': '請輸入端口',
  'Please select a storage class': '請選擇儲存卷類型',
  'Please select protocol': '請選擇協定',
  'Please specify an image': '請指定鏡像',
  'Pod CPU Request': '容器組CPU請求',
  'Pod Decentralized Deployment': 'Pod Decentralized Deployment',
  'Pod Default Deployment': 'Pod Default Deployment',
  'Pod Memory Request': '容器組記憶體請求',
  'Pod replicas will be deployed on different nodes as much as possible.':
    'Pod replicas will be deployed on different nodes as much as possible.',
  'Pod replicas will be deployed on the same node as much as possible.':
    'Pod replicas will be deployed on the same node as much as possible.',
  'Pod replicas will be deployed according to user customization.':
    'Pod replicas will be deployed according to user customization.',
  'Pod Security Context': 'Pod Security Context',
  'Pod Status': '容器組運行狀態',
  POD_STATUS_ANALYSIS: '容器狀態分析',
  POD_REASON_FAILEDCREATE: '創建失敗(FailedCreate)',
  POD_REASON_FAILEDDELETE: '刪除失敗(FailedDelete)',
  POD_REASON_SUCCESSFULCREATE: '創建成功(SuccessfulCreate)',
  POD_REASON_SUCCESSFULDELETE: '刪除成功(SuccessfulDelete)',
  PodInitializing: '容器組初始化中',
  'Pods List': '容器組列表',
  Port: '端口',
  'Port(s)': '端口',
  ports: '端口',
  PostStartHookError: '執行 hook 報錯',
  'Private Registry': '私有倉庫',
  Privileged: '特權模式',
  ProgressDeadlineExceeded: '處理超時',
  Protocols: '協定',
  'Read Write Mode': '讀寫模式',
  RegistryUnavailable: '無法连接鏡像倉庫',
  REPLICA_STATUS: '副本運行狀態',
  'Replicas Number': '副本數量',
  ReplicaSetCreateError: '新建副本錯誤',
  ReplicaSetUpdated: '副本已更新',
  'request CPU should not be greater than limit CPU':
    '最小使用 CPU 值應不大於最大使用 CPU 值',
  'request memory should not be greater than limit memory':
    '最小使用記憶體值應不大於最大使用記憶體值',
  'Request Type': '請求類型',
  'Resource Info': '資源資訊',
  'Resource Limit': '資源限制',
  'Resource limits remaining quota': '資源限制剩餘配額',
  'Resource Request': '資源預留',
  'Resource requests remaining quota': '資源預留剩餘配額',
  Revision: '版本',
  'Revision Rollback': '版本回退',
  'Rollback Revisions': '回退版本',
  RollingUpdate: '滾動更新',
  RunContainerError: '啟動容器失敗',
  Schedule: '定時計畫',
  'Select by Node': '指定節點',
  RESOURCE: '選擇資源',
  'Service Configuration': '服務配置',
  'Service Labels': '服務標籤',
  'Set Mount Path': '設置掛載路徑',
  'Storage Size': '儲存大小',
  'Strategy Type': '策略類型',
  SuccessfulCreate: '創建成功',
  SuccessfulDelete: '刪除成功',
  'Sure to delete the workload(s)?': '確認刪除工作負載',
  'target port': '目標端口',
  'TCP Port Check': 'TCP Port Check',
  'Temporary Volume': 'Temporary Volume',
  'Timeout(s)': 'Timeout(s)',
  'The concurrency policy setting.': 'The concurrency policy setting.',
  'The minimum of the replicas that can be set by HPA':
    '彈性伸縮可以設置的副本數量的下限',
  'The number of failed jobs allowed to be retained.':
    'The number of failed jobs allowed to be retained.',
  'The number of successful jobs allowed to be retained.':
    'The number of successful jobs allowed to be retained.',
  'UI Mode': '界面模式',
  'Update Strategy': '更新策略',
  'Volume Name': 'Volume Name',
  'Volume Source': '儲存卷來源',
  DISK_LOG_COLLECTION_Q: 'What is disk log collection?',
  'What is Disk Log Collection?': '什麼是落盤紀錄收集？',
  'Worker Container': 'Worker Container',
  Workload: '工作負載',
  'Not Limited': '未限制',
  Cost: '占用',
  AVAILABLE_QUOTAS: 'Available Quotas',
  WORKLOAD_REASON_DEPLOYMENTPAUSED: '部署中止(DeploymentPaused)',
  WORKLOAD_REASON_DEPLOYMENTRESUMED: '部署已恢復(DeploymentResumed)',
  WORKLOAD_REASON_FAILEDCREATE: '創建失敗(FailedCreate)',
  WORKLOAD_REASON_FOUNDNEWREPLICASET: '發現新副本(FoundNewReplicaSet)',
  WORKLOAD_REASON_MINIMUMREPLICASAVAILABLE:
    '最小副本可用(MinimumReplicasAvailable)',
  WORKLOAD_REASON_MINIMUMREPLICASUNAVAILABLE:
    '最小副本不可用(MinimumReplicasUnavailable)',
  WORKLOAD_REASON_NEWREPLICASETAVAILABLE: '可用新副本(NewReplicaSetAvailable)',
  WORKLOAD_REASON_NEWREPLICASETCREATED: '已創建新副本(NewReplicaSetCreated)',
  WORKLOAD_REASON_PROGRESSDEADLINEEXCEEDED:
    '處理超時(ProgressDeadlineExceeded)',
  WORKLOAD_REASON_REPLICASETCREATEERROR: '新建副本錯誤(ReplicaSetCreateError)',
  WORKLOAD_REASON_REPLICASETUPDATED: '副本已更新(ReplicaSetUpdated)',
  Workloads: '工作負載',
  DEPLOYMENT_DESC:
    'Deployment provides fine-grained management of common applications in KubeSphere. Deployment configuration describes the desired state of specific components of an application as pod templates.',
  STATEFULSET_DESC:
    'Statefulset is used to manage stateful applications, manages the deployment and scaling of a set of pods, and provides guarantees about the ordering and uniqueness of these pods.',
  DAEMONSET_DESC:
    'A daemonset ensures that all (or some) Nodes run a copy of a pod. Typically, a daemonset is used to running a logs collection, monitoring daemon or other system management applications.',
  CRONJOB_NAME_DESC:
    '最長 52 個字元，只能包含小寫字母、數字及分隔符號("-")，且必須以小寫字母或數字開頭及結尾',
  CRONJOB_NAME_TOO_LONG: '最長 52 個字元',
  UPDATE_STRATEGY_DESC:
    '配置升級過程中替換容器組的策略 <a href="{link}" target="_blank">了解更多</a>',
  MAX_DEPLOY_UNAVAILABLE_POD_DESC:
    'The maximum number of pods that can be unavailable during the update.',
  ROLLING_UPDATE_POD_TIP:
    '更新時，會根據目前容器組的副本數對最小可用及最大數量進行限制；最小容器組數不可以超過目前副本數，且最大容器組數量不能超過目前副本數的2倍。',
  STATEFULSET_PARTITION_DESC:
    '當更新有狀態副本集時，將更新具有大於或等於 partition 的序數的所有容器組',
  IMAGE_REGISTRY_PLACEHOLDER: '請選擇鏡像倉庫密鑰',
  REPLICAS_DESC: '{module}將會被創建，由它維護集群中容器組的所需數量',
  VOLUME_SUB_TEXT: 'Volumes used by the containers of the workload',
  EMPTYDIR_DESC: 'Temporary storage created for the workload',
  HOSTPATH_DESC:
    'A HostPath volume mounts a file or directory from the host node’s filesystem into your pod.',
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
  STATEFULSETS_VOLUME_TEMPLATE_DESC:
    '為有狀態副本集的每個容器組創建專屬的持久化儲存卷，並掛載至相應的容器組',
  STATEFULSETS_BASEINFO_DESC:
    '您可以給有狀態副本起一個名字，以便在使用的時候容易區分。',
  STATEFULSETS_SERVICE_CONFIG_DESC:
    '集群不為服務生成 IP，集群内部通過服務的後端 Endpoint IP 直接訪問服務。此類型適合後端異構的服務，比如需要區分主從的服務。',
  DAEMONSETS_BASEINFO_DESC:
    '守護進程集保證在每個主機上都運行一個容器副本，常用來部署一些集群的紀錄、監控或者其他系統管理應用。',
  DAEMONSETS_VOLUME_DESC:
    '可將 HostPath，臨時儲存卷，持久化儲存卷掛載至守護進程集的容器組内。',
  JOBS_BASEINFO_DESC: '',
  JOBS_POD_TEMPLATE_DESC: '指定任務中運行的容器組模板',
  JOBS_VOLUME_DESC: '可以將臨時儲存卷，持久化儲存卷掛載至任務的容器組内。',
  RESTART_POLICY_TIP:
    'RestartPolicy 只能指定 Never 或 OnFailure，當任務未完成的情況下：<br/>* 如果 RestartPolicy 指定 Never，則任務會在容器組出現故障時創建新的容器組，且故障容器組不會消失。<br/>* 如果 RestartPolicy 指定 OnFailure，則任務會在容器組出現故障時其内部重啟容器，而不是創建容器組。',
  CRONJOBS_BASEINFO_DESC: '創建定時任務所需的基本資訊，需指定名稱與定時計畫',
  CRONJOBS_VOLUME_DESC:
    '可以將臨時儲存卷，持久化儲存卷掛載至定時任務的容器組内。',
  VOLUME_EMPTY_TIP: 'No created volumes, please',
  HOST_PATH_DESC:
    'HostPath 允許掛載主機上的文件系統到容器組裡面去。如果容器組需要使用主機上的文件，可以使用 HostPath。',
  EMPTY_DIR_DESC:
    '臨時儲存卷隨 Pod 被分配在主機上。當 Pod（不管任何原因）從主機上被刪除時，臨時儲存卷也同時會刪除，儲存卷的數據也將永久刪除。<br />注：刪除容器不影響臨時儲存卷。',
  SELECT_VOLUME_TYPE_DESC: '您可以根據需要選擇適合您的儲存卷類型進行添加',
  MOUNT_VOLUME_DESC:
    '持久化儲存卷請選擇支持多節點讀寫模式 (ROX 或者 RWX) 的儲存卷，否則可能因容器組不在同一節點導致容器組更新失敗。如果您選擇了單節點讀寫 (RWO) 模式的儲存卷您也可以通過節點選擇將容器組安排在同一節點上來避免因儲存卷訪問模式造成的更新錯誤。',
  REVISION_ROLLBACK_SELECT: '請選擇要回退的版本',
  REVISION_TITLE: '{name}版本',
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
  CONTAINER_CPU_DESC:
    '作為容器調度時資源分配的判斷依賴。只有當節點上可分配CPU總量 ≥ 容器CPU最小使用值時，才允許將容器調度到該節點。單位換算規則: 1核 = 1000m',
  CONTAINER_MEMORY_DESC:
    '作為容器調度時資源分配的判斷依賴。只有當節點上可分配記憶體總量 ≥ 容器記憶體最小使用值時，才允許將容器調度到該節點。',
  FILL_IMAGE_DEFAULT_PORTS_DESC: '是否暴露該鏡像的預設端口？',
  REQUEST_EXCCED: '資源預留不能超過資源限制',
  REQUEST_EXCEED_AVAILABLE_QUOTA: '資源设置不能大於可用資源限制',
  POD_SCALE_DESC: '可以彈性擴展容器組實例數量',
  REPLICAS_AVAILABLE: '實際副本',
  DEPLOY_PLACEMENT_TIP_TITLE: '什麼是部署位置？',
  DEPLOY_PLACEMENT_TIP_VALUE:
    '可以將容器組部署在不同集群中，並對集群中部署的副本數量進行定義。不同集群中的容器組將由聯邦集群控制器(Federation Controller Manager)進行統一的調度及狀態同步。',
  DESC_CREATE_CONFIGMAP_SECRET: '如果沒有合適的配置文件或密鑰引用, 您可以',
  // Pods Page
  NODE_IP: '{node}（{ip}）',
  // Jobs
  JOBS: 'Jobs',
  // Cronjobs
  ADD_VOLUME: 'Add Volume',
  MOUNT_VOLUMES: 'Mount Volumes',
  // Workload
}
