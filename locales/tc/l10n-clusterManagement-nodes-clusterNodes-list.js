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
  CLUSTER_NODE_PL: '集群節點',
  CLUSTER_NODE: '集群節點',
  CLUSTER_NODE_DESC: '集群節點提供了目前集群下節點的運行狀態，以及可以編輯刪除節點',
  NODE_TYPES_Q: '集群節點的類型？',
  NODE_TYPES_A: '集群節點分為控制平面節點和工作節點。',
  WHAT_IS_NODE_TAINTS_Q: '什麼是節點汙點？',
  WHAT_IS_NODE_TAINTS_A: '節點汙點 (Taints) 可以阻止某些容器組 (Pod) 副本部署至該節點中, 與容忍度 (Tolerations) 一起工作確保容器組不會被調度到不合適的節點上',
  LEARN_MORE: '了解更多',
  // Node Count
  NODE_SI: '節點',
  NODE_PL: '節點',
  MASTER_NODE_SI: '控制平面節點',
  MASTER_NODE_PL: '控制平面節點',
  WORKER_NODE_SI: '工作節點',
  WORKER_NODE_PL: '工作節點',
  // List
  KUBE_OPERATE: '操作',
  KUBE_ASCENDING_ORDER: '正序排列…',
  KUBE_DESCENDING_ORDER: '倒序排列…',
  KUBE_FILTER: '過濾選項',
  SEARCH: '輸入查詢條件進行過濾',
  ADD_NODE: '添加節點',
  NODE_STATUS_UNSCHEDULABLE: '無法調度',
  NODE_STATUS_RUNNING: '運行中',
  NODE_STATUS_WARNING: '異常中',
  NODE_STATUS_PENDING: '創建中',
  NODE_STATUS_FAILED: '創建失敗',
  CLUSTER_NODE_EMPTY_DESC: '請為集群添加一個節點。',
  NODE_NAME_EMPTY_DESC: '請輸入節點名稱',
  CPU_USAGE: 'CPU 使用量',
  MEMORY_USAGE: '記憶體使用量',
  CONTROL_PLANE: '控制平面節點',
  WORKER: '工作節點',
  ALLOCATED_CPU: '已分配 CPU',
  ALLOCATED_MEMORY: '已分配記憶體',
  CPU_LIMIT_SI: '資源限制：{core} 核（{percent}）',
  CPU_LIMIT_PL: '資源限制：{core} 核（{percent}）',
  CPU_REQUEST_SI: '{core} 核（{percent}）',
  CPU_REQUEST_PL: '{core} 核（{percent}）',
  CORE_PL: '核',
  CPU_CORE_PERCENT_SI: '{core} 核（{percent}）',
  CPU_CORE_PERCENT_PL: '{core} 核（{percent}）',
  MEMORY_GIB_PERCENT: '{gib} GiB（{percent}）',
  MEMORY_LIMIT_VALUE: '資源限制：{gib} GiB（{percent}）',
  MEMORY_REQUEST_VALUE: '{gib} GiB（{percent}）',
  RESOURCE_REQUEST: '資源預留',
  CORDON: '停止調度',
  UNCORDON: '啟動調度',
  OPEN_TERMINAL: '打開終端機',
  CUSTOM_COLUMNS: '内容自定義',
  NO_MATCHING_RESULT_FOUND: '暫時沒有找到符合過濾條件的資源',
  STATUS: '狀態',
  TOTAL_ITEMS: '共 {num} 個項目',
  YOU_CAN_TRY_TO: 'You can try',
  REFRESH_DATA: 'refreshing data',
  CLEAR_SEARCH_CONDITIONS: 'clearing search conditions',
  // List > Edit Taints
  DUPLICATE_KEYS: '無法添加重複的 key',
  EMPTY_KEY: '無法添加空的 key'
};