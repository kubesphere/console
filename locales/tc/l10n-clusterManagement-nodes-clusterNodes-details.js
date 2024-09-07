/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Attributes
  ATTRIBUTES: 'Attributes',
  ARCHITECTURE: '系統架構',
  OS_VERSION: '操作系統',
  OS_TYPE: '操作系統類型',
  LINUX: 'Linux',
  KERNEL_VERSION: '内核版本',
  CONTAINER_RUNTIME: '容器版本',
  KUBELET_VERSION: 'Kubelet 版本',
  KUBE_PROXY_VERSION: 'Kube-Proxy 版本',
  IP_ADDRESS: 'IP 地址',
  SCHEDULABLE: '可調度',
  YES: '是',
  // More > Edit Labels
  EDIT_LABELS: '編輯標籤',
  LABEL_PL: '標籤',
  // More > Edit Taints
  TAINTS: '汙點',
  EDIT_TAINTS: '汙點管理',
  TAINTS_DESC:
    '汙點表示此節點已被 key=value 汙染，容器組調度不允許（PodToleratesNodeTaints 策略）或盡量不（TaintTolerationPriority 策略）調度到此節點，除非是能夠容忍（Tolerations）key=value 汙點的容器組。',
  COMMON_TAINTS: '公共汙點',
  NOSCHEDULE: '不允許調度 (NoSchedule)',
  PREFER_NOSCHEDULE: '盡量不調度 (PreferNoSchedule)',
  NOEXECUTE: '不允許並驅逐已有容器組 (NoExecute)',
  TAINT_SELECT_TIPS: 'Join Common Taints',
  TAINTS_TIPS:
    '如果主機中存在一個或多個影響策略為 NoSchedule 的汙點，該容器組不會被調度到該主機<br>如果主機中不存在影響策略為 NoSchedule 的汙點，但是存在一個或多個影響策略為 PreferNoSchedule 的汙點，該容器組會盡量不調度到該主機<br>如果主機中存在一個或多個影響策略為 NoExecute 的汙點，該容器組不會被調度到該主機，並且會驅逐已經調度到該主機的容器組實例',
  TAINT_DELETE_TIP: 'Delete taint',
  // Running Status > Resource Usage
  RESOURCE_USAGE: '資源用量',
  MAXIMUM_PODS: '容器組最大數量',
  MAXIMUM_PODS_SCAP: '容器組最大數量',
  DISK_USAGE_SCAP: 'Disk usage',
  // Running Status > Allocated resources
  MEMORY_REQUEST_SCAP: '記憶體預留',
  MEMORY_LIMIT_SCAP: '記憶體限制',
  CPU_REQUEST_SCAP: 'CPU 預留',
  CPU_LIMIT_SCAP: 'CPU 限制',
  // Running Status > Allocated Resources
  ALLOCATED_RESOURCES: '已分配資源',
  // Running Status > Health Status
  RUNNING_STATUS: '運行狀態',
  HEALTH_STATUS: '健康狀態',
  NODE_NETWORKUNAVAILABLE: '網路可用性',
  NODE_NETWORKUNAVAILABLE_DESC: '節點的網路狀態是否正常。',
  NODE_MEMORYPRESSURE: '記憶體壓力 (MemoryPressure)',
  NODE_MEMORYPRESSURE_DESC: '節點的剩餘記憶體是否小於閾值。',
  NODE_DISKPRESSURE: '磁碟壓力 (DiskPressure)',
  NODE_DISKPRESSURE_DESC: '節點的剩餘磁碟空間或 Inode 數量是否小於閾值。',
  NODE_PIDPRESSURE: '進程壓力 (PIDPressure)',
  NODE_PIDPRESSURE_DESC: '允許在節點上創建的進程數量是否小於閾值。',
  NODE_READY: '就緒',
  NODE_READY_DESC: '節點是否可以接收容器組。',
  LAST_HEARTBEAT_VALUE: 'Last Heartbeat: {value}',
  // Running Status > Taints
  NO_TAINTS_TIPS: '未發現汙點。',
  POLICY: '策略',
  // Pods
  READY_VALUE: '就緒：{readyCount}/{total}',
  STATUS_VALUE: '狀態：{value}',
  // Metadata
  // Monitoring
  USAGE: 'Usage',
  OUT: 'Out',
  IN: '入',
};
