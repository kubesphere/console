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
  // Details
  DETAILS: '詳情',
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
  TAINTS_DESC: '汙點表示此節點已被 key=value 汙染，容器組調度不允許（PodToleratesNodeTaints 策略）或盡量不（TaintTolerationPriority 策略）調度到此節點，除非是能夠容忍（Tolerations）key=value 汙點的容器組。',
  ADD_TAINT: '添加汙點',
  COMMON_TAINTS: '公共汙點',
  NOSCHEDULE: '不允許調度 (NoSchedule)',
  PREFER_NOSCHEDULE: '盡量不調度 (PreferNoSchedule)',
  NOEXECUTE: '不允許並驅逐已有容器組 (NoExecute)',
  TAINTS_TIPS: '如果主機中存在一個或多個影響策略為 NoSchedule 的汙點，該容器組不會被調度到該主機<br>如果主機中不存在影響策略為 NoSchedule 的汙點，但是存在一個或多個影響策略為 PreferNoSchedule 的汙點，該容器組會盡量不調度到該主機<br>如果主機中存在一個或多個影響策略為 NoExecute 的汙點，該容器組不會被調度到該主機，並且會驅逐已經調度到該主機的容器組實例',
  // Running Status > Resource Usage
  RESOURCE_USAGE: '資源使用情況',
  MAXIMUM_PODS: 'Maximum Pods',
  MAXIMUM_PODS_SCAP: 'Maximum Pods',
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
  NODE_NETWORKUNAVAILABLE: '網路配置 (NetworkUnavailable)',
  NODE_NETWORKUNAVAILABLE_DESC: '檢查節點上的網路配置是否正確',
  NODE_MEMORYPRESSURE: '記憶體壓力 (MemoryPressure)',
  NODE_MEMORYPRESSURE_DESC: '如果節點上的記憶體使用壓力過大,則調度失敗',
  NODE_DISKPRESSURE: '硬碟壓力 (DiskPressure)',
  NODE_DISKPRESSURE_DESC: '硬碟大小存在壓力 - 即硬碟容量低',
  NODE_PIDPRESSURE: '進程壓力 (PIDPressure)',
  NODE_PIDPRESSURE_DESC: '如果節點進程壓力過大，則會調度失敗',
  NODE_READY: '節點就緒 (Ready)',
  NODE_READY_DESC: '節點健康且可以接收新的容器組',
  // Running Status > Taints
  NO_TAINTS_TIPS: '暫未設置汙點',
  POLICY: 'Policy',
  // Pods
  READY_VALUE: 'Ready: {readyCount}/{total}',
  STATUS_VALUE: 'Status: {value}',
  CREATED_AGO: '創建於 {diff}'
};