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
  Workload: '工作負載',
  Workloads: '工作負載',
  'Service Configuration': '服務配置',

  'Available number of nodes scheduled': '可用節點數',
  'Desired number of nodes scheduled': '期望節點數',
  'Current number of nodes scheduled': '目前節點數',
  'View YAML': '查看配置文件',
  'Edit YAML': '編輯配置文件',
  'Add Labels': '添加標籤',
  'Edit Labels': '編輯標籤',
  'Pod Replicas': '容器組副本數量',
  'Container Image': '容器鏡像',
  'Pod Status': '容器組運行狀態',
  'Container Setting': '容器設置',
  'Pods List': '容器組列表',
  POD_SCALE_DESC: '可以彈性擴展容器組實例數量',
  Log: '紀錄',
  'Container Logs': '容器紀錄',
  'Resource Info': '資源資訊',
  Logs: '操作紀錄',
  'Node Name': '主機名稱',
  'Node IP': '主機 IP',
  'Pod IP': '容器組 IP',
  Image: '鏡像',
  'Image ID': '鏡像 ID',
  'Port(s)': '端口',
  Port: '端口',
  port: '端口',
  'Edit Container': '編輯容器',
  'Host Port': '主機端口',
  'Add Port': '添加端口',
  'target port': '目標端口',
  Environment: '環境變量',
  'Mount point': '掛載點',
  'Mount Path': '掛載路徑',
  'Mount Volume': '掛載儲存卷',
  'Set Mount Path': '設置掛載路徑',
  'Mount Temporary Volume': '掛載臨時儲存卷',
  'Select by Node': '指定節點',
  Mount: '掛載',
  Capacity: '容量',
  capacity: '容量',
  'Volume Capacity': '儲存卷容量',
  'Storage Size': '儲存大小',
  'Access Mode': '訪問模式',
  Provisioner: '供應者',
  Volumes: '儲存卷',
  'Volume Source': '儲存卷來源',
  mounted: '已掛載',
  created: '已創建',
  EmptyDir: '臨時儲存卷',
  'Temporary Volume': '臨時儲存卷',
  'New Volume': '新建儲存卷',
  'Existing Volume': '已有儲存卷',
  'Volume Name': '儲存卷名稱',
  'HTTP Request': 'HTTP 請求',
  'Diff Settings': '差異化配置',
  'Deployment Mode': '部署模式',
  'Custom Deployment Mode': '自定義部署模式',
  'Add Deployment Mode': '添加部署模式',
  DEPLOYMENT_MODE_DESC: '您可以为容器組調度指定規則',
  'Instance Status': '實例狀態',

  'No Request': '不預留',
  'No Limit': '不限制',

  'Not Limited': '未限制',
  Cost: '占用',
  'Project Remaining Quota': '項目剩餘配額',
  'Workspace Remaining Quota': '企業空間剩餘配額',
  QUOTA_OVERCOST_TIP: '目前資源占用已超過剩餘配額',

  'Resource Request': '資源預留',
  'Resource Limit': '資源限制',

  'Resource requests remaining quota': '資源預留剩餘配額',
  'Resource limits remaining quota': '資源限制剩餘配額',

  'No resource limits': '無資源限制',

  'Job Settings': '任務設置',
  'CronJob Settings': '定時任務設置',
  'Job Template': '任務模板',

  'Mount Volumes': '掛載儲存',

  'ConfigMap & Secret': '配置文件和密鑰',
  'Add Volume': '添加儲存卷',
  'Mount ConfigMap or Secret': '掛載配置文件或密鑰',
  'Use ConfigMap or Secret': '引用配置文件或密鑰',

  'Collecting file log': '收集落盤紀錄',

  'Add Metadata': '添加元數據',
  'Set Node Scheduling Policy': '設置節點調度策略',
  'You can allow Pod replicas to run on specified nodes.':
    '可以讓容器組副本在指定的節點運行',
  'Additional metadata settings for resources such as Labels and Annotations.':
    '對資源進行額外的元數據設置，例如 Label 和 Annotation',

  'Deployment Location': '部署位置',

  REFFER_CONFIGMAP_DESC: '將配置中的值添加為卷。',
  REFFER_SECRET_DESC: '將密鑰中的值添加為卷。',

  'Choose an existing volume': '選擇已有儲存卷',
  CHOOSE_EXIST_VOLUME_DESC: '請選擇一個已經創建好的持久化儲存卷掛載至容器',

  REQUEST_EXCCED: '資源預留不能超過資源限制',

  WORKLOAD_DESC:
    '工作負載 (Workload) 通常是訪問服務的實際載體, 也是對節點紀錄收集、監控等系統應用的實際運行載體，是對一組容器組 (Pod) 的抽象模型。',

  WORKLOAD_CREATE_DESC:
    '工作負載 (Workload) 通常是訪問服務的實際載體, 也是對節點紀錄收集、監控等系統應用的實際運行載體，是對一組容器組 (Pod) 的抽象模型。',

  JOB_DESC:
    '任務 (Job) 負責批量處理短暫的一次性任務，即僅執行一次的任務，它保證批處理任務的一個或多個容器組成功結束。',
  JOB_CREATE_DESC:
    '任務 (Job) 負責批量處理短暫的一次性任務，即僅執行一次的任務，它保證批處理任務的一個或多個容器組成功結束。',
  CRONJOB_DESC:
    '定時任務 (CronJob) 管理基於時間的任務，例如在給定時間點只運行一次，或週期性地在給定時間點運行。',
  CRONJOB_CREATE_DESC:
    '定時任務 (CronJob) 管理基於時間的任務，例如在給定時間點只運行一次，或週期性地在給定時間點運行。',

  CRONJOB_NAME_DESC:
    '最長 52 個字元，只能包含小寫字母、數字及分隔符號("-")，且必須以小寫字母或數字開頭及結尾',
  CRONJOB_NAME_TOO_LONG: '最長 52 個字元',

  IMAGE_PLACEHOLDER: '點擊右側圖標可選擇鏡像，或直接輸入名稱 例：nginx:latest',
  IMAGE_REGISTRY_PLACEHOLDER: '請選擇鏡像倉庫密鑰',
  IMAGE_DESC:
    '要從私有鏡像倉庫部署，需要先<a href={link} target="_blank">創建鏡像倉庫密鑰</a>，然後拉取鏡像。',

  Replicas: '副本',
  'Replicas Number': '副本數量',
  'Specify Replicas Number': '指定副本數量',
  'Replica Status': '副本運行狀態',
  REPLICAS_DESC: '{module}將會被創建，由它維護集群中容器組的所需數量',
  'Strategy Type': '策略類型',
  'Update Strategy': '更新策略',
  OnDelete: '刪除容器組時更新',
  Recreate: '替換升級',
  RollingUpdate: '滾動更新',
  'RollingUpdate (Recommended)': '滾動更新(推薦)',
  'Restart Count': '重啟次數',
  'Resource Requests': '資源預留',
  'Resource Limits': '資源限制',
  'Image Pull Policy': '鏡像拉取策略',
  Privileged: '特權模式',
  'Desired Replicas': '期望副本',
  'Current Replicas': '實際運行副本',

  REPLICAS_SCALE_NOTIFY_TITLE: '立即生效？',
  REPLICAS_SCALE_NOTIFY_CONTENT:
    '您已將工作負載的副本數調整為 <strong>{num}</strong>, 您也可以繼續調整副本數量，或者您可以使它立即生效。',
  REPLICAS_SCALE_NOTIFY_CONFIRM: '立即生效({seconds}s)',
  REPLICAS_SCALE_NOTIFY_CANCEL: '放棄更改',

  POD_SETTING_TIP: '更新時容器組數量',
  MAX_UNAVAILABLE_POD_LABEL: '容器組最大不可用數量',
  MAX_SURGE_POD_LABEL: '容器組最大超出數量',
  UPDATE_STRATEGY_DESC:
    '配置升級過程中替換容器組的策略 <a href="{link}" target="_blank">了解更多</a>',
  MAX_DAEMON_UNAVAILABLE_POD_DESC:
    '升級過程中「允許存在的不可用的容器組」所占總容器組數的最大百分比或數量',
  MAX_SURGE_POD_DESC:
    '升級過程中「允許超出副本數量的容器組」的最大數量或百分比',
  ROLLING_UPDATE_POD_TIP:
    '更新時，會根據目前容器組的副本數對最小可用及最大數量進行限制；最小容器組數不可以超過目前副本數，且最大容器組數量不能超過目前副本數的2倍。',
  ONDELETE_ALERT_TIP:
    '控制器不會自動更新容器組，將會在容器組被手動刪除時，更新並替換容器組實例。',
  ROLLINGUPDATE_ALERT_TIP:
    '滾動升級將逐步用新版本的實例替換版本的實例，升級的過程中，業務流量會同時負載平衡分布到新舊的實例上，因此業務不會中斷。',
  RECREATE_ALERT_TIP:
    '替換升級會先刪除舊的容器組，再創建新容器組；升級過程中業務會中斷。',

  STATEFULSET_PARTITION_DESC:
    '當更新有狀態副本集時，將更新具有大於或等於 partition 的序數的所有容器組',
  STATEFULSET_PARTITION_PLACEHOLDER: '預設為 0',
  MIN_READY_SECONDS_DESC: '指定守護進程集中容器組啟動可用所需的最小的秒數',

  'UI Mode': '界面模式',
  'Coding Mode': '代碼模式',

  'Labels exists': '標籤組重複',
  'Labels cannot be empty': '標籤不能為空',
  'Add Label': '添加標籤',
  'Add Container': '添加容器',
  'Add new container': '添加新的容器',
  'Adding new contianer': '正在添加新的容器',
  'Add Node Selector': '添加節點選擇器',
  'Please add at least one container.': '請至少添加一個容器',
  'Container Name': '容器名稱',
  'Container Type': '容器類型',
  'Advanced Options': '高級選項',
  'CPU(m)': 'CPU(m)',
  Commands: '命令',
  'Add command': '添加命令',
  Arguments: '參數',
  Argument: '參數',
  'Add argument': '添加參數',
  Protocols: '協定',
  'Must match': '必須滿足',
  'Match as much as possible': '盡可能滿足',
  'Deploy with the Target': '與目標部署到壹起',
  'Deploy away from the Target': '遠離目標部署',
  'Please complete the policy': '請填寫完整策略',
  'Session Affinity': '會話親和性',
  'environment variables': '環境變量',
  'Add Environment Variable': '添加環境變量',
  'Read Write Mode': '讀寫模式',
  'Please input mount point': '請輸入掛載點',
  'Please select a storage class': '請選擇儲存卷類型',
  'Please select image': '請選擇鏡像',
  'Invalid name': '名稱格式不合法。{message}',
  'Service Labels': '服務標籤',

  'Add Existing Volume': '添加已有儲存卷',
  'Add Temporary Volume': '添加臨時儲存卷',
  'Add HostPath': '添加 HostPath',
  'Add Volume Template': '添加儲存卷模板',

  'Support EmptyDir and PersistentVolumeClaim.':
    '支持臨時儲存卷以及持久化儲存卷',

  'Mount the configmap or secret to the specified directory.':
    '將配置文件或密鑰掛載至指定目錄',

  'Please specify an image': '請指定鏡像',

  'Please select protocol': '請選擇協定',
  'Please input port': '請輸入端口',
  'Please input command': '請輸入命令',
  'Please input volume name': '請輸入儲存卷名稱',

  PORT_INPUT_DESC: '當存在多條端口時，名稱為必填項目且不可重複',

  PORT_NAME_DESC:
    '端口名最長 63 個字元，只能包含小寫字母、數字及分隔符號("-")，且必須以小寫字母開頭, 字母或數字結尾',

  WORKLOAD_PORT_NAME_DESC:
    '端口名最長 15 個字元，只能包含小寫字母、數字及分隔符號("-")，且必須以小寫字母開頭, 字母或數字結尾',

  CPU_REQUEST_TARGET_DESC:
    '當 CPU 使用率超過或低於此目標值時，將添加或刪除副本',
  MEMORY_REQUEST_TARGET_DESC:
    '當記憶體使用量超過或低於此目標值時，將添加或刪除副本',
  MIN_REPLICAS_DESC: '彈性伸縮可以設置的副本數量的下限',
  MAX_REPLICAS_DESC: '副本數量的上限',
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
    '按照給定的時間計畫運行工作。語法參照 <a href="//en.wikipedia.org/wiki/Cron" target="_blank">CRON</a>。Kubernetes 預設使用 UTC 時間, 請注意根據時區調整定時計畫。',

  MOUNT_VOLUME_DESC:
    '持久化儲存卷請選擇支持多節點讀寫模式 (ROX 或者 RWX) 的儲存卷，否則可能因容器組不在同一節點導致容器組更新失敗。如果您選擇了單節點讀寫 (RWO) 模式的儲存卷您也可以通過節點選擇將容器組安排在同一節點上來避免因儲存卷訪問模式造成的更新錯誤。',

  Job: '任務',
  CronJob: '定時任務',
  Revision: '版本',
  'Every Hour': '每小時',
  'Every Day': '每天',
  'Every Week': '每週',
  'Every Month': '每月',
  Schedule: '定時計畫',
  'Revision Records': '版本記錄',
  'Revision Rollback': '版本回退',
  'Rollback Revisions': '回退版本',
  'Current Revision': '目前版本',
  'Execution Records': '執行記錄',
  'Job Records': '任務記錄',
  'Cluster Resource Status': '集群資源狀態',
  'Resource Status': '資源狀態',
  'Resource Name': '資源名稱',
  'Config Template': '配置模板',
  'Edit Config Template': '編輯配置模板',
  'Environment Variables': '環境變量',
  'File List': '文件列表',
  Rerun: '重新執行',
  'Please input a schedule.': '請輸入定時計畫',

  'Please select rollback revision': '請選擇回退版本',

  'Horizontal Pod Autoscaling': '彈性伸縮',
  'Container Config': '容器配置',
  'Add Command': '添加命令',
  Probe: '探針',
  'Add Probe': '添加探針',
  'Initial Delay': '初始延遲',
  'Initial Delay(s)': '初始延遲(秒)',
  'Timeout(s)': '超時時間(秒)',
  'Period Seconds': '執行探測頻率(秒)',
  'Success Threshold': '健康臨界值',
  'Failure Threshold': '不健康臨界值',
  'HTTP Request Check': 'HTTP 請求檢查',
  'Exec Command Check': '執行命令檢查',
  'TCP Port Check': 'TCP 端口檢查',
  'Init Container': '初始容器',
  'Worker Container': '工作容器',
  'Request Type': '請求類型',

  startingDeadlineSeconds: '啟動 Job 的期限（秒）',
  'startingDeadlineSeconds(s)': '啟動 Job 的期限（秒）',
  successfulJobsHistoryLimit: '保留完成 Job 數',
  failedJobsHistoryLimit: '保留失敗 Job 數',
  concurrencyPolicy: '並發策略',

  'Select resource': '選擇資源',
  'Restart Policy': '重啟策略',

  'Container Liveness Check': '容器存活檢查',
  'Container Readiness Check': '容器就緒檢查',
  'Container Startup Check': '容器啟動檢查',

  Redeploy: '重新部署',
  'Redeploy Successfully': '重新部署成功',

  REDEPLOY_CONFIRM_DESC:
    '您即將重新部署工作負載 {resource} ({type}) , 容器組將根據更新策略進行重新部署，您的業務可能會被暫時中斷。',

  EDIT: '編輯資訊',
  MORE: '更多操作',
  VIEW_YAML: '查看 YAML 文件',

  REVISION_ROLLBACK_SELECT: '請選擇要回退的版本',
  REVISION_TITLE: '{name}版本',
  'is running': '正在運行',
  PROBE_TIME: '初始延時: {delay}s 超時時間:{timeout}s',
  'Readiness Probe': '就緒探針',
  'Liveness Probe': '存活探針',
  'Startup Probe': '啟動探針',

  INITIAL_DELAY_DESC: '在檢查其運行狀況之前，容器啟動後需要等待多長時間。',
  TIMEOUT_DESC:
    '等待探針完成多長時間。如果超過時間，則認為探測失敗。預設為1秒。最小值為1。',
  PERIOD_SECONDS_DESC: '執行探測的頻率（以秒為單位）。預設為10秒。最小值為1。',
  SUCCESS_THRESHOLD_DESC:
    '探測失敗後，連續最小成功探測為成功。預設值為1。最小值為1。存活探針和啟動探針内必須為1。',
  FAILURE_THRESHOLD_DESC: '探針進入失敗狀態時需要連續探測失敗的最小次數。',

  HPA_MSG:
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

  'The number of failed jobs allowed to be retained.':
    '允許保留的失敗的任務個數',
  'The number of successful jobs allowed to be retained.':
    '允許保留的成功的任務個數',
  'The concurrency policy setting.': '並發策略設置',
  'Can be found by node IP or node name': '可以通過節點 IP 或者節點名稱查找',
  START_DEADLINE_SECONDS_DESC:
    '即在指定 啟動時間 + 啟動 Job 的期限 這個週期之内都可以啟動任務',
  'Container CPU Resource Request, 1 Core = 1000m':
    '容器的 CPU 資源請求值, 1核 = 1000m',
  'Container Memory Resource Request': '容器的 記憶體 資源請求值',
  'The minimum of the replicas that can be set by HPA':
    '彈性伸縮可以設置的副本數量的下限',
  'Min Replicas Number': '最小副本數',
  'Max Replicas Number': '最大副本數',
  'Maximum number of replicas': '副本數量的上限',
  'Target Utilization': '目標使用率',
  'Target Usage': '目標使用量',
  'Current Utilization': '目前使用率',
  'CPU Target Utilization': 'CPU 目標使用率',
  'Memory Target Utilization': '記憶體目標使用率',
  'Memory Target Usage': '記憶體目標使用量',

  'min replicas number should not be greater than max replicas number':
    '最大副本數應不小於最小副本數',

  'Horizontal Pod Autoscaling has been set': '已設置彈性伸縮策略',

  'Mount path is already in use': '掛載路徑已使用',
  'Please specify the read and write mode and mount path':
    '請指定讀寫方式及掛載路徑',
  'Please add at least one volume': '請至少添加一個儲存卷',
  'Please add at least one volume or volume template':
    '請至少添加一個儲存卷或儲存卷模板',
  'Please select a volume': '請選擇儲存卷',
  'Please select a configmap': '請選擇配置文件',
  'Please select a secret': '請選擇密鑰',
  'What is Disk Log Collection?': '什麼是落盤紀錄收集？',

  'for example': '例如',
  'Container mount path': '容器掛載路徑',
  'container log relative path': '容器紀錄相對路徑',
  'log path relative to container mount path': '紀錄路徑相對於容器掛載路徑',

  'Click to add subPath': '點擊添加子路徑',
  'sub path': '子路徑',
  ADD_SUBPATH_TIP: '僅適用於儲存卷掛載，不適用於主機路徑映射',

  'Host Path': '主機路徑',

  HOST_PATH_DESC:
    'HostPath 允許掛載主機上的文件系統到容器組裡面去。如果容器組需要使用主機上的文件，可以使用 HostPath。',
  'Select specific keys and paths': '選擇特定的鍵和路徑',
  SELECT_SECRET_DESC:
    '選擇要使用的密鑰以及將公開每個密鑰的文件路徑，文件路徑相當於裝載路徑，每個文件的内容都是密鑰的值。',
  EMPTY_DIR_DESC:
    '臨時儲存卷隨 Pod 被分配在主機上。當 Pod（不管任何原因）從主機上被刪除時，臨時儲存卷也同時會刪除，儲存卷的數據也將永久刪除。<br />注：刪除容器不影響臨時儲存卷。',
  SELECT_VOLUME_TYPE_DESC: '您可以根據需要選擇適合您的儲存卷類型進行添加',

  JOB_BACK_OFF_LIMIT_LABEL: '最大重試次數',
  JOB_PARALLELISM_LABEL: '並行數',
  JOB_COMPLETION_LABEL: '完成數',
  JOB_ACTIVE_DL_SECONDS_LABEL: '退出超時時限(單位：秒)',

  JOB_BACK_OFF_LIMIT_DESC:
    '失敗嘗試次數，若失敗次數超過該值，則任務不會繼續嘗試工作',
  JOB_PARALLELISM_DESC: '標誌運行的容器組的最大期望數量',
  JOB_COMPLETION_DESC: '標誌任務結束需要成功運行的容器組所需數量',
  JOB_ACTIVE_DL_SECONDS: '任務運行的超時時間',

  RESTART_POLICY_NEVER_DESC: '容器組出現故障時創建新的容器組',
  RESTART_POLICY_ONFAILURE_DESC: '容器組出現故障時内部重啟容器',

  RESTART_POLICY_TIP:
    'RestartPolicy 只能指定 Never 或 OnFailure，當任務未完成的情況下：<br/>* 如果 RestartPolicy 指定 Never，則任務會在容器組出現故障時創建新的容器組，且故障容器組不會消失。<br/>* 如果 RestartPolicy 指定 OnFailure，則任務會在容器組出現故障時其内部重啟容器，而不是創建容器組。',

  MEMBER_CREATE_DESC: '',

  MONITORING_ALERT_DESC:
    '目前監控最多可顯示五個副本的運行狀態監控，當超過五個副本時，可以點擊具體監控項目的「查看全部副本」，查看更多的副本監控。',

  RESOURCE_REQUESTS: '最小使用',
  RESOURCE_LIMITS: '最大使用',
  CONTAINER_CPU_DESC:
    '作為容器調度時資源分配的判斷依賴。只有當節點上可分配CPU總量 ≥ 容器CPU最小使用值時，才允許將容器調度到該節點。單位換算規則: 1核 = 1000m',
  CONTAINER_MEMORY_DESC:
    '作為容器調度時資源分配的判斷依賴。只有當節點上可分配記憶體總量 ≥ 容器記憶體最小使用值時，才允許將容器調度到該節點。',
  'request CPU should not be greater than limit CPU':
    '最小使用 CPU 值應不大於最大使用 CPU 值',
  'request memory should not be greater than limit memory':
    '最小使用記憶體值應不大於最大使用記憶體值',

  'Invalid image': '無效的鏡像',
  IMAGE_PULL_POLICY_ALWAYS: '嘗試重新下載鏡像（Always）',
  IMAGE_PULL_POLICY_IFNOTPRESENT: '優先使用本地鏡像（IfNotPresent）',
  IMAGE_PULL_POLICY_NEVER: '僅使用本地鏡像（Never）',
  IMAGE_PULL_POLICY_ALWAYS_DESC: '在創建及更新時，每次都會嘗試下載新的鏡像',
  IMAGE_PULL_POLICY_IFNOTPRESENT_DESC: '如果本地存在鏡像就優先使用本地鏡像',
  IMAGE_PULL_POLICY_NEVER_DESC:
    '僅會使用本地鏡像，如果本地不存在所需鏡像，則會導致容器異常',

  LIVENESS_PROBE_DESC: '該檢查方式用於檢測容器是否活著。',
  READINESS_PROBE_DESC: '該檢查方式用於檢測容器是否準備好開始處理用戶請求。',
  STARTUP_PROBE_DESC: '該檢查方式用於檢測容器是否啟動成功。',
  STARTUP_PROBE_TIP: '需要 kubernetes 版本 v1.18 或以上。',

  COLLECT_SAVED_LOG_DESC:
    '您已開啟落盤紀錄收集，請至少添加一個儲存卷並指定紀錄所在目錄',
  COLLECT_FILE_LOG_TIP:
    '當您添加儲存卷後(需要讀&寫模式)，您可以對儲存卷内的紀錄資訊進行收集。開啟後，會在容器組中以 SideCar 的方式注入 filebeat 容器鏡像，來收集相關紀錄。',

  PROJECT_COLLECT_SAVED_DISABLED_DESC:
    '請聯繫項目管理員在 “項目設置” => "高級設置" 中開啟項目的落盤紀錄收集功能',

  ADD_VOLUME_TEMPLATE_DESC:
    '添加儲存卷模板，儲存卷的生命週期將隨容器組的生命週期存在',

  CONTAINER_LOG_PATH_TIP:
    '容器紀錄相對路徑是從容器掛載路徑開始的路徑，可以 glob 方式給出，多組時以英文逗号分隔。例如當容器掛載路徑為 /data 時，容器紀錄相對路徑配置為 log/*.log，表示匹配 /data/log 目錄下所有 .log 後缀文件。<br/>若需要匹配 /data/log 目錄及其子目錄下的所有 .log 後缀文件，可將容器紀錄相對路徑配置為 log/**/*.log',

  'No default ports config': '暫無預設端口配置',
  ports: '端口',
  layers: '層級',
  registry: '倉庫',
  'Private Registry': '私有倉庫',
  'Image Name': '鏡像名稱',
  'Not found this image': '沒有找到此鏡像',
  SEARCH_IMAGE_PLACEHOLDER: '輸入關鍵字查找鏡像',

  'Pod Default Deployment': '容器組預設部署',
  'Pod Decentralized Deployment': '容器組分散部署',
  'Pod Soft Decentralized Deployment': '容器組軟分散部署',
  'Pod Hard Decentralized Deployment': '容器組硬分散部署',
  'Pod Aggregation Deployment': '容器組聚合部署',
  'Pod Soft Aggregation Deployment': '容器組軟聚合部署',
  'Pod Hard Aggregation Deployment': '容器組硬聚合部署',
  'Pod replicas will be deployed on different nodes as much as possible.':
    '容器組副本將會盡量分散在不同的節點中',
  'Pod replicas will be deployed on the same node as much as possible.':
    '容器組副本將會盡量部署在同一節點上',
  'Pod replicas will be deployed by the default policy.':
    '容器組副本將根據預設策略部署',
  'KubeSphere supports pulling images from the Image Registries and creating new images through source code (Source to Image).':
    'Kubesphere 支持從鏡像倉庫拉取鏡像以及通過代碼構建新的鏡像並部署',

  'Scheduling Info': '調度資訊',
  'Node Scheduling Info': '節點調度資訊',
  'Pod Status Analysis': '容器狀態分析',
  'Current Stage(phase)': '目前階段(phase)',
  'Scheduled to node': '調度至節點',
  'How pods are assinged to nodes?': '容器組如何被調度至節點?',
  'Pod CPU Request': '容器組CPU請求',
  'Pod Memory Request': '容器組記憶體請求',

  MinReadySeconds: '最小就緒時間 (MinReadySeconds)',

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
  POD_CREATE_DESC:
    '容器組 (Pod) 是 Kubernetes 應用程式的基本執行單元，是您創建或部署的 Kubernetes 對象模型中最小和最簡單的單元。',
  FILL_IMAGE_DEFAULT_PORTS_DESC: '是否暴露該鏡像的預設端口？',

  ISTIO_PROTOCOL_TIP:
    '為了充分利用應用治理的能力，請選擇服務實際使用的協定。例如，如果服務暴露的是 HTTP 服務，則選擇 http 協定，會生成形如 http-[name] 的端口名稱。',

  WORKLOAD_CONDITIONS: '狀態分析(Conditions)',
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

  'Use Default Ports': '使用預設端口',

  'Please select at least one container to mount': '請至少選擇一個容器進行掛載',
  'Sure to delete the workload(s)?': '確認刪除工作負載',
  'No related resources': '沒有關聯的資源',
  'No related resources found with the current workload(s)':
    '目前工作負載下沒有關聯的資源',
  DELETE_WORKLOAD_DESC:
    '您即將刪除工作負載 {resource}，請您進行確認是否刪除關聯資源?',

  'Container Security Context': '容器 Security Context',
  'Pod Security Context': '容器組 Security Context',
  'Access Control': '訪問控制',
  'User and User Group': '用戶和用戶組',
  'User Group': '用戶組',
  CONTAINER_SECURITY_CTX_DESC:
    'Security Context的目的是限制不可信容器的行為，保護系統和其他容器不受其影響。',
  POD_SECURITY_CONTEXT_DESC:
    '容器組 Security Context 可以為容器組内的容器提供預設的用戶和用戶組設置以及 seLinuxOptions 的參數設置，如果容器中已經對這些參數進行了定義，則優先以容器中的設置為準。',
  ACCESS_CONTROL_PRIVILEGED: '以特權模式運行(Privileged)',
  ACCESS_CONTROL_PRIVILEGED_DESC:
    '此時容器中的進程本質上等價於宿主節點上的 root 用戶。',
  ACCESS_CONTROL_ALLOWPRIVILEGEESCALATION:
    '允許擴大特權(AllowPrivilegeEscalation)',
  ACCESS_CONTROL_ALLOWPRIVILEGEESCALATION_DESC:
    '進程是否可以獲取比父進程更多的特權。當以特權模式運行時，則為允許狀態。',
  ACCESS_CONTROL_READONLYROOTFILESYSTEM:
    '文件系統root唯讀(ReadOnlyRootFilesystem)',
  ACCESS_CONTROL_READONLYROOTFILESYSTEM_DESC:
    '該容器的文件系統根路徑是否唯讀。',
  RUN_AS_NON_ROOT: '僅允許非 Root 用戶',
  RUN_AS_NON_ROOT_DESC:
    'Kubernetes 在運行容器之前將執行檢查，以確保容器進程不是以 root 用戶（UID為0）運行，否則將不能啟動容器。',
  RUN_AS_USER_DESC: '執行容器 entrypoint 進程的 UID。預設為 docker 引擎的 GID',
  RUN_AS_USER_GROUP_DESC:
    '執行容器 entrypoint 進程的 GID。預設為 docker 引擎的 GID',

  COMPARE_WITH: '與上一個版本 {version} 的對比',
  REVISION_DESC:
    '對工作負載的資源模板進行修改後會生成一個新的紀錄並重新調度 容器組（Pod）進行版本的疊代，預設保存10個最近的版本。您可以根據修改紀錄進行重新部署。',

  CLUSTER_CONTAINER_IMAGE_DIFF_DESC:
    '根據不同的需要在不同的集群中設置不同的容器',
  CLUSTER_SERVICE_DIFF_DESC: '可以在不同集群設置不同的服務端口',
  CLUSTER_ENV_DIFF_DESC: '可以在不同集群設置不同的環境變量',

  CONTAINER_RESOURCE_LIMIT_TIP:
    '請設置容器的資源限制與資源預留，這將能夠幫助系統更好地調度容器，提高穩定性。您也可在【項目設置】中，通過【基本資訊】->【項目管理】->【編輯資源預設請求】，來統一設置預設值。',

  REPLICAS_AVAILABLE: '實際副本',
  REPLICAS_EXPECTED: '期望副本',

  SYNC_HOST_TIMEZONE_DESC: '時區與主機同步後，容器内的時區將與主機節點一致。',
  HOST_PATH_WARNING:
    'HostPath 將主機的文件系統掛載到Pod中，它使一些應用程式能逃出對其做出的隔離限制，請謹慎使用。',

  DEPLOY_PLACEMENT_TIP_TITLE: '什麼是部署位置？',
  DEPLOY_PLACEMENT_TIP_VALUE:
    '可以將容器組部署在不同集群中，並對集群中部署的副本數量進行定義。不同集群中的容器組將由聯邦集群控制器(Federation Controller Manager)進行統一的調度及狀態同步。',
  IGNORE_CERT_DESC: '發現證書錯誤，是否忽略證書驗證並再次',
  IGNORE_CERT_WARN_DESC: '忽略驗證證書，可能會導致帳戶密碼被欺騙。',
}
