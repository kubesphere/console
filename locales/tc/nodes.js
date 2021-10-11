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
  NODE_SI: '節點',
  NODE_PL: '節點',
  MASTER_NODE_SI: 'Master 節點',
  MASTER_NODE_PL: 'Master 節點',
  WORKER_NODE_SI: '工作節點',
  WORKER_NODE_PL: '工作節點',

  'Cluster Node': '集群節點',
  CLUSTER_NODE_PL: '集群節點',
  CLUSTER_NODE: 'Cluster Node',
  'Cluster Nodes': '集群節點',

  'Edge Node': '邊緣節點',
  EDGE_NODE_PL: '邊緣節點',
  'Master Node': 'Master 節點',
  'Worker Node': '工作節點',
  ADD_NODE: '添加節點',
  'System Version': '系統版本',
  ONLINE_NODES: '在線節點',
  ALL_NODES: '全部節點',
  IP_ADDRESS: 'IP 地址',
  LINUX: 'Linux',
  'Node IP': '節點 IP',
  Unschedulable: '無法調度',
  SCHEDULABLE: '可調度',
  ARCHITECTURE: '系統架構',
  'OS Image': '操作系統',
  OS_TYPE: '操作系統類型',
  OS_VERSION: '操作系統',
  KERNEL_VERSION: '内核版本',
  CONTAINER_RUNTIME: '容器版本',
  KUBELET_VERSION: 'Kubelet 版本',
  KUBE_PROXY_VERSION: 'Kube-Proxy 版本',
  lastHeartbeatTime: '最近更新時間',
  LATEST_UPDATE_VALUE: 'Latest update: {value}',
  NODE_ONLINE_STATUS: '節點在線狀態',
  PODS: '容器組',
  'Pod Usage': '容器組使用情況',
  'Pod Quantity Trend': '容器組數量變化',
  'Local Storage Capacity': '本地儲存容量',
  used: '已用',
  'Resource Usage Status': '資源使用狀態',
  TAINTS: '汙點',
  taints: '汙點',
  Taint: '汙點',
  taint: '汙點',
  Conditions: '狀態',
  ANNOTATION_PL: '注解',
  WORKLOAD_ANNOTATIONS: 'Workload Annotations',

  'Resource Usage': '資源使用情況',

  'CPU Requests': 'CPU 請求',
  'CPU Limits': 'CPU 限制',
  'Memory Requests': '記憶體請求',
  'Memory Limits': '記憶體限制',

  NODE_STATUS_UNSCHEDULABLE: '無法調度',
  NODE_STATUS_RUNNING: '運行中',
  NODE_STATUS_WARNING: '異常中',

  NOSCHEDULE: '不允許調度 (NoSchedule)',
  PREFER_NOSCHEDULE: '盡量不調度 (PreferNoSchedule)',
  NOEXECUTE: '不允許並驅逐已有容器組 (NoExecute)',

  EDIT_TAINT: '汙點管理',
  EDIT_TAINTS: '汙點管理',
  COMMON_TAINTS: '公共汙點',
  'Node List': '主機列表',
  'Node Taints': '主機汙點',
  TAINTS_DESC:
    '汙點表示此節點已被 key=value 汙染，容器組調度不允許（PodToleratesNodeTaints 策略）或盡量不（TaintTolerationPriority 策略）調度到此節點，除非是能夠容忍（Tolerations）key=value 汙點的容器組。',
  TAINTS_TIPS:
    '如果主機中存在一個或多個影響策略為 NoSchedule 的汙點，該容器組不會被調度到該主機<br>如果主機中不存在影響策略為 NoSchedule 的汙點，但是存在一個或多個影響策略為 PreferNoSchedule 的汙點，該容器組會盡量不調度到該主機<br>如果主機中存在一個或多個影響策略為 NoExecute 的汙點，該容器組不會被調度到該主機，並且會驅逐已經調度到該主機的容器組實例',
  NO_TAINTS_TIPS: '暫未設置汙點',
  TAINT_SELECT_TIPS: '加入公共汙點',
  TAINT_DELETE_TIPS: '刪除汙點',
  ADD_TAINT: '添加汙點',
  'Delete All Taints': '全部刪除',
  'CPU Used': '已使用 CPU ',
  'Memory Used': '已使用記憶體',
  'Pod Used': '已使用容器組',
  'Scheduling Policy': '調度策略',
  'Add Type': '添加類型',
  'Add Node Type': '添加節點類型',
  'Type Name': '類型名稱',
  'Allocated CPU': '已分配 CPU',
  'Allocated Memory': '已分配記憶體',
  ALLOCATED_RESOURCES: '已分配資源',

  METADATA: '元數據',

  CLUSTER_NODE_DESC:
    '集群節點提供了目前集群下節點的運行狀態，以及可以編輯刪除節點',
  CLUSTER_NODE_EMPTY_DESC:
    '集群節點提供了目前集群下節點的運行狀態，以及可以編輯刪除節點',
  EDGE_NODE_DESC:
    '邊緣節點提供了目前集群下節點的運行狀態，以及可以編輯刪除節點',
  EDGE_NODE_EMPTY_DESC:
    '邊緣節點提供了目前集群下節點的運行狀態，以及可以編輯刪除節點',
  NODE_NETWORKUNAVAILABLE: '網路配置 (NetworkUnavailable)',
  NODE_NETWORKUNAVAILABLE_DESC: '檢查節點上的網路配置是否正確',
  NODE_OUTOFDISK: '硬碟可用空間 (OutOfDisk)',
  NODE_OUTOFDISK_DESC: '檢查節點上是否有空間添加新的容器組',
  NODE_MEMORYPRESSURE: '記憶體壓力 (MemoryPressure)',
  NODE_MEMORYPRESSURE_DESC: '如果節點上的記憶體使用壓力過大,則調度失敗',
  NODE_DISKPRESSURE: '硬碟壓力 (DiskPressure)',
  NODE_DISKPRESSURE_DESC: '硬碟大小存在壓力 - 即硬碟容量低',
  NODE_PIDPRESSURE: '進程壓力 (PIDPressure)',
  NODE_PIDPRESSURE_DESC: '如果節點進程壓力過大，則會調度失敗',
  NODE_READY: '節點就緒 (Ready)',
  NODE_READY_DESC: '節點健康且可以接收新的容器組',

  NODE_TYPES_Q: '集群節點的類型？',
  NODE_TYPES_A: '節點分為主控 (Master) 節點和工作 (Worker) 節點',
  WHAT_IS_NODE_TAINTS_Q: '什麼是節點汙點？',
  WHAT_IS_NODE_TAINTS_A:
    '節點汙點 (Taints) 可以阻止某些容器組 (Pod) 副本部署至該節點中, 與容忍度 (Tolerations) 一起工作確保容器組不會被調度到不合適的節點上',

  NODE_TYPE_DESC:
    '節點類型為提供了主機節點分組功能，用戶可以通過創建合適關係的節點類型並將主機節點加入相應的分組，從而將容器組按照分組關係部署到合適的物理節點上，來提高資源的可用性，業務的連續性。',

  NODE_TYPE_DESCRIPTION_DEC:
    '描述資訊在選擇節點類型時將幫助用戶更好的選擇節點類型並使用集群',
  ADD_EDGE_COMMAND: '將命令複製到命令行中進行創建邊緣節點',
  IN_USE_Node_IP: '節點 IP {ip} 已被使用',
  IN_USE_Node_NAME: '節點名稱 {name} 已被使用',
  'Add Edge Node': '添加邊緣節點',
  NODE_NAME_EMPTY_DESC: '請輸入節點名稱',
  EDGENODE_NAME_EMPTY_DESC: '請輸入節點名稱',
  EDGENODE_CONFIG_COMMAND_TIP:
    '運行命令前請確保已在邊緣節點安裝容器運行時如 docker 或 container。<a href="https://kubeedge.io/en/docs/" target="_blank">了解更多</a>',
  ADD_DEFAULT_TAINT: '添加默認污點 {params}',
}
