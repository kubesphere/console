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
  WORKLOAD_DESC: '工作負載 (Workload) 通常是訪問服務的實際載體, 也是對節點紀錄收集、監控等系統應用的實際運行載體，是對一組容器組 (Pod) 的抽象模型。',
  // List
  DEPLOYMENT_EMPTY_DESC: 'Please create a Deployment.',
  UPDATING: 'Updating',
  // List > Edit Information
  // List > Edit YAML
  // List > Delete
  // List > Create
  // List > Create > Basic Information
  NEXT: '下一步',
  INVALID_PROJECT: 'Invalid project.',
  // List > Create > Pod Settings > Replica Scheduling Mode
  REPLICA_SCHEDULING_MODE: '部署模式',
  SPECIFY_REPLICAS: 'Specify Replicas',
  WEIGHTS: 'Weights',
  SPECIFY_WEIGHTS: 'Specify Weights',
  SPECIFY_WEIGHTS_DESC: '設定的總副本數將按照設定的權重分配到選擇的集群中，非可用集群的副本會自定遷移到可用集群上。',
  SPECIFY_REPLICAS_DESC: '明確指定各集群所需部署的副本數。',
  REPLICA_LOW_SI: '副本',
  REPLICA_LOW_PL: '副本',
  WEIGHT: '權重',
  TOTAL_REPLICAS: '副本總數',
  // List > Create > Pod Settings > Add Container > Container Settings
  COST: 'Cost',
  ADD_CONTAINER: '添加容器',
  ADD_CONTAINER_DESC: 'Kubesphere 支持從鏡像倉庫拉取鏡像以及通過代碼構建新的鏡像並部署',
  CONTAINERS: '容器鏡像',
  IMAGE_TIME_SIZE_LAYER: 'Updated {time}',
  IMAGE_DESC: '要從私有鏡像倉庫部署，需要先<a href={link} target="_blank">創建鏡像倉庫密鑰</a>，然後拉取鏡像。',
  IMAGE_PLACEHOLDER: '點擊右側圖標可選擇鏡像，或直接輸入名稱 例：nginx:latest',
  IMAGE_EMPTY: '請設置鏡像',
  ENTER_POSITIVE_INTEGER_DESC: '副本輸入不合法',
  TOTAL_REPLICAS_EMPTY_DESC: '請輸入副本總數',
  CONTAINER_NAME: '容器名稱',
  CONTAINER_TYPE: '容器類型',
  USE_DEFAULT_PORTS: '使用預設端口',
  NO_DEFAULT_PORT: '暫無預設端口配置',
  REGISTRY: '倉庫',
  SET_IMAGE_DESC: '請選擇鏡像',
  WORKER_CONTAINER: '工作容器',
  CONTAINER_RESOURCE_LIMIT_TIP: '請設置容器的資源限制與資源預留，這將能夠幫助系統更好地調度容器，提高穩定性。您也可在【項目設置】中，通過【基本資訊】->【項目管理】->【編輯資源預設請求】，來統一設置預設值。',
  GPU_TYPE: 'GPU Type',
  GPU_LIMIT: 'GPU Limit',
  NVIDIA_COM_GPU: 'NVIDIA GPU',
  NO_LIMIT: '不限制',
  NO_REQUEST: '不預留',
  NO_RESOURCE_LIMIT: '無資源限制',
  IGNORE_AND_RETRY: '重試',
  AVAILABLE_QUOTAS: 'Available Quotas',
  // List > Create > Pod Settings > Add Container > Port Settings
  PORT_SETTINGS: '端口設置',
  ISTIO_PROTOCOL_TIP: 'To fully use the Application Governance feature, select a protocol based on the actual usage of the Service. The port name will be generated in the <Protocol>-<Name> format.',
  REQUIRED: '必填',
  // List > Create > Pod Settings > Add Container > Use Local Image First
  IMAGE_PULL_POLICY_ALWAYS: '嘗試重新下載鏡像（Always）',
  IMAGE_PULL_POLICY_NEVER: '僅使用本地鏡像（Never）',
  IMAGE_PULL_POLICY_ALWAYS_DESC: 'Pulls an image always when the pod is created or updated.',
  IMAGE_PULL_POLICY_IFNOTPRESENT_DESC: 'Pulls an image only when the required image does not exist locally.',
  IMAGE_PULL_POLICY_NEVER_DESC: '僅會使用本地鏡像，如果本地不存在所需鏡像，則會導致容器異常',
  IMAGE_PULL_POLICY_IFNOTPRESENT: '優先使用本地鏡像（IfNotPresent）',
  // List > Create > Pod Settings > Add Container > Health Check
  LIVENESS_CHECK: '容器存活檢查',
  READINESS_CHECK: '容器就緒檢查',
  STARTUP_CHECK: '容器啟動檢查',
  LIVENESS_CHECK_DESC: '該檢查方式用於檢測容器是否活著。',
  READINESS_CHECK_DESC: '該檢查方式用於檢測容器是否準備好開始處理用戶請求。',
  STARTUP_CHECK_DESC: '該檢查方式用於檢測容器是否啟動成功。',
  ADD_PROBE: '添加檢查器',
  COMMANDS: '命令',
  HEALTH_CHECK: '健康檢查',
  STARTUP_CHECK_TIP: '需要 Kubernetes v1.18 或以上版本。',
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
  ADD_ENVIRONMENT_VARIABLE: '添加環境變量',
  KEY_IN_RESOURCE: '選擇鍵',
  LABEL_TYPE: '{label} <span style="{style}">（{type}）</span>',
  RESOURCE: 'Resource',
  CREATE_CONFIGMAP_SECRET_DESC: 'If no configmap or secret meets the requirements, you can',
  CREATE_CONFIG: 'create a configmap',
  OR: 'or',
  CREATE_SECRET: 'create a secret.',
  DEFAULT_REPOSITORY: 'Default repository',
  SET_DEFAULT_REPOSITORY: 'Set default repository',
  SET_AS_DEFAULT_REPOSITORY_DESC: 'Set as default repository after setting, if not specified, the system will use the default repository to create the application load. Only one default repository can be set in a project.',
  SET_AS_DEFAULT_REPOSITORY: 'Set as default mirror repository',
  SET_DEFAULT_REPO_SUCCESSFUL: 'Set default repository successful',
  // List > Create > Pod Settings > Add Container > Container Security Context
  CONTAINER_SECURITY_CONTEXT: '容器 Security Context',
  CONTAINER_SECURITY_CONTEXT_DESC: 'Security Context的目的是限制不可信容器的行為，保護系統和其他容器不受其影響。',
  PRIVILEGED_MODE: '特權模式',
  PRIVILEGED_MODE_DESC: '此時容器中的進程本質上等價於宿主節點上的 root 用戶。',
  ALLOW_PRIVILEGE_ESCALATION: '允許擴大特權(AllowPrivilegeEscalation)',
  ALLOW_PRIVILEGE_ESCALATION_DESC: '進程是否可以獲取比父進程更多的特權。當以特權模式運行時，則為允許狀態。',
  ROOT_DIRECTORY_READONLY: '文件系統root唯讀(ReadOnlyRootFilesystem)',
  ROOT_DIRECTORY_READONLY_DESC: '該容器的文件系統根路徑是否唯讀。',
  USER_AND_USER_GROUP: '用戶和用戶組',
  USER_GROUP: '用戶組',
  RUN_AS_NON_ROOT: '僅允許非 Root 用戶',
  RUN_AS_NON_ROOT_DESC: 'Kubernetes 在運行容器之前將執行檢查，以確保容器進程不是以 root 用戶（UID為0）運行，否則將不能啟動容器。',
  RUN_AS_USER_DESC: '執行容器 entrypoint 進程的 UID。預設為 docker 引擎的 GID',
  RUN_AS_USER_GROUP_DESC: '執行容器 entrypoint 進程的 GID。預設為 docker 引擎的 GID',
  SELINUX_CONTEXT: 'SELinux 上下文',
  CAPABILITIES: 'Capabilities',
  DROP: '移除',
  ACCESS_CONTROL: '訪問控制',
  LEVEL: '等級',
  // List > Create > Pod Settings > Add Container > Synchronize Host Timezone
  SYNC_HOST_TIMEZONE_DESC: '時區與主機同步後，容器内的時區將與主機節點一致。',
  SYNC_HOST_TIMEZONE: '同步宿主機時區',
  // List > Create > Pod Settings > Update Strategy
  UPDATE_STRATEGY: '更新策略',
  ROLLING_UPDATE_RECOMMENDED: '滾動更新(推薦)',
  SIMULTANEOUS_UPDATE: '替換升級',
  ROLLINGUPDATE_DESC: '滾動升級將逐步用新版本的實例替換版本的實例，升級的過程中，業務流量會同時負載平衡分布到新舊的實例上，因此業務不會中斷。',
  SIMULTANEOUS_UPDATE_DESC: '替換升級會先刪除舊的容器組，再創建新容器組；升級過程中業務會中斷。',
  ENTER_INTEGER_OR_PERCENTAGE: '請輸入值',
  MAX_EXTRA_EMPTY: 'Please set the maximum number of extra Pod replicas allowed during the update process.',
  // List > Create > Pod Settings > Pod Security Context
  POD_SECURITY_CONTEXT: '容器組 Security Context',
  POD_SECURITY_CONTEXT_DESC: '自定義容器組的訪問控制和權限設置。',
  POD_SECURITY_CONTEXT_TIP: '容器組 Security Context 可以為容器組内的容器提供預設的用戶和用戶組設置以及 seLinuxOptions 的參數設置，如果容器中已經對這些參數進行了定義，則優先以容器中的設置為準。',
  // List > Create > Pod Settings > Pod Scheduling Rules
  POD_SCHEDULING_RULES: '容器组调度策略',
  POD_SCHEDULING_RULES_DESC: '您可以为容器組調度指定規則',
  DEFAULT_RULES: 'Default Rules',
  DEFAULT_RULES_DESC: 'Schedules the Pod replicas to nodes according to default rules.',
  DECENTRALIZED_SCHEDULING: '容器組分散部署',
  CUSTOM_RULES: 'Custom Rules',
  CUSTOM_RULES_DESC: 'Pod replicas are scheduled to nodes according to user-defined rules.',
  DECENTRALIZED_SCHEDULING_DESC: '容器組副本將會盡量分散在不同的節點中',
  CENTRALIZED_SCHEDULING_DESC: '容器組副本將會盡量部署在同一節點上',
  CENTRALIZED_SCHEDULING: '容器組聚合部署',
  SCHEDULE_WITH_TARGET: '與目標部署到壹起',
  SCHEDULE_AWAY_FROM_TARGET: '遠離目標部署',
  MATCH_IF_POSSIBLE: '盡可能滿足',
  MUST_MATCH: '必須匹配',
  TARGET: '目標',
  STRATEGY: '策略',
  // List > Create > Pod Settings > Pod Grace Period
  POD_GRACE_PERIOD: 'Pod Grace Period',
  POD_GRACE_PERIOD_DESC: 'Set the waiting time before Pod terminates, after which Pod will be forcibly terminated.',
  TERMINATION_GRACEPERIOD_SECONDS: 'Termination GracePeriod Seconds (s)',
  // List > Create > Pod Settings > Add Metadata
  ADD_METADATA: '添加元數據',
  POD_ADD_METADATA_DESC: 'Add metadata to the Pod replicas.',
  // List > Create > Storage Settings
  STORAGE_SETTINGS: 'Storage Settings',
  READ_ONLY_LOW: 'read-only',
  READ_AND_WRITE_LOW: 'read and write',
  // List > Create > Storage Settings > Mount Volume
  MOUNT_VOLUME: '添加儲存卷',
  WORKLOAD_MOUNT_VOLUME_DESC: 'Mount an persistent volume, temporary volume, or HostPath volume to the containers.',
  SELECT_PERSISITENT_VOLUME_CLAIM: 'Select Persistent Volume Claim',
  SELECT_PERSISITENT_VOLUME_CLAIM_DESC: 'Mount a persistent volume created according to the persistent volume claim to the containers.',
  CAPACITY: '容量',
  PVC_NOT_SELECT: 'Please select a persistent volume claim.',
  TEMPORARY_VOLUME: '臨時儲存卷',
  VOLUME_NAME: '儲存卷名稱',
  VOLUME_NAME_EMPTY: '請輸入儲存卷名稱',
  HOST_PATH_EMPTY: '請輸入存儲卷主機路徑',
  CONTAINER_NOT_SELECTED: '請至少選擇一個容器進行掛載',
  NOT_MOUNT: '不掛載',
  HOSTPATH_VOLUME: 'HostPath 儲存卷',
  HOSTPATH_TIP: 'HostPath 將主機的文件系統掛載到Pod中，它使一些應用程式能逃出對其做出的隔離限制，請謹慎使用。',
  HOST_PATH: '主机路徑',
  READ_AND_WRITE: '讀寫',
  READ_ONLY: '只讀',
  // List > Create > Storage Settings > Mount Configmap or Secret
  MOUNT_CONFIGMAP_OR_SECRET: '掛載配置文件或密鑰',
  MOUNT_CONFIGMAP_OR_SECRET_DESC: '將配置文件或密鑰掛載至指定目錄',
  CONFIGMAP: '配置字典',
  SELECT_CONFIGMAP_DESC: '將配置中的值添加為卷。',
  READ_WRITE_MOUNT_EMPTY: '請指定讀寫方式及掛載路徑',
  SELECT_SPECIFIC_KEYS: '選擇特定的鍵和路徑',
  SELECT_SPECIFIC_KEYS_DESC: '選擇要使用的密鑰以及將公開每個密鑰的文件路徑，文件路徑相當於裝載路徑，每個文件的内容都是密鑰的值。',
  SELECT_SECRET_DESC: '將密鑰中的值添加為卷。',
  CONFIGMAP_NOT_SELECT: '請選擇配置文件',
  SECRET_NOT_SELECT: '請選擇密鑰',
  NO_AVAILABLE_RESOURCE: '暫無可用資源',
  // List > Create > Advanced Settings
  SELECT_NODES: '設置節點調度策略',
  SELECT_NODES_DESC: '可以讓容器組副本在指定的節點運行',
  ADD_NODE_SELECTOR: '添加節點選擇器',
  ADD_METADATA_DESC: '對資源進行額外的元數據設置，例如 Label 和 Annotation',
  KEY: '鍵',
  VALUE: '值',
  ADVANCED_SETTINGS: '高級設置',
  DUPLICATE_LABELS: 'Duplicate labels cannot be added.',
  // List > Create > Advanced Settings > Specify Node
  WORKLOAD_SPECIFY_NODE_DESC: '可以讓容器組副本在指定的節點運行',
  // List > Create > Cluster Differences
  CLUSTER_DIFF: 'Cluster Differences',
  CLUSTER_DIFF_CONTAINER_SETTINGS_DESC: '根據不同的需要在不同的集群中設置不同的容器',
  CLUSTER_DIFF_PORT_SETTINGS_DESC: '可以在不同集群設置不同的服務端口',
  CLUSTER_DIFF_ENVIRONMENT_VARIABLES_DESC: '可以在不同集群設置不同的環境變量',
  CONTAINER_IMAGE: 'Container Image'
};