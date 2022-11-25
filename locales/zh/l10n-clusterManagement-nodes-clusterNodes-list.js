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
  CLUSTER_NODE_PL: '集群节点',
  CLUSTER_NODE: '集群节点',
  CLUSTER_NODE_DESC: '集群节点是 KubeSphere 集群中的基础服务器，您可以在此页面对集群节点进行管理。',
  NODE_TYPES_Q: '集群节点有哪些类型？',
  NODE_TYPES_A: '集群节点分为控制平面节点和工作节点。',
  WHAT_IS_NODE_TAINTS_Q: '什么是节点污点？',
  WHAT_IS_NODE_TAINTS_A: '节点污点（Taint）可以阻止某些容器组部署到该节点，与容忍度（Toleration）一起使用，可确保容器组不会被调度到不合适的节点上。',
  LEARN_MORE: '了解更多',
  // Node Count
  NODE_SI: '节点',
  NODE_PL: '节点',
  MASTER_NODE_SI: '控制平面节点',
  MASTER_NODE_PL: '控制平面节点',
  WORKER_NODE_SI: '工作节点',
  WORKER_NODE_PL: '工作节点',
  // List
  KUBE_OPERATE: '排序',
  KUBE_ASCENDING_ORDER: '升序',
  KUBE_DESCENDING_ORDER: '降序',
  KUBE_FILTER: '过滤',
  SEARCH: '搜索',
  ADD_NODE: '添加节点',
  NODE_STATUS_UNSCHEDULABLE: '无法调度',
  NODE_STATUS_RUNNING: '运行中',
  NODE_STATUS_WARNING: '告警',
  NODE_STATUS_PENDING: '创建中',
  NODE_STATUS_FAILED: '创建失败',
  CLUSTER_NODE_EMPTY_DESC: '请为集群添加一个节点。',
  NODE_NAME_EMPTY_DESC: '请设置节点的名称。',
  CPU_USAGE: 'CPU 用量',
  MEMORY_USAGE: '内存用量',
  CONTROL_PLANE: '控制平面节点',
  WORKER: '工作节点',
  ALLOCATED_CPU: '已分配 CPU',
  ALLOCATED_MEMORY: '已分配内存',
  CPU_LIMIT_SI: '资源上限：{core} 核（{percent}）',
  CPU_LIMIT_PL: '资源上限：{core} 核（{percent}）',
  CPU_REQUEST_SI: '{core} 核（{percent}）',
  CPU_REQUEST_PL: '{core} 核（{percent}）',
  CORE_PL: '核',
  CPU_CORE_PERCENT_SI: '{core} 核（{percent}）',
  CPU_CORE_PERCENT_PL: '{core} 核（{percent}）',
  MEMORY_GIB_PERCENT: '{gib} GiB（{percent}）',
  MEMORY_LIMIT_VALUE: '资源上限：{gib} GiB（{percent}）',
  MEMORY_REQUEST_VALUE: '{gib} GiB（{percent}）',
  RESOURCE_REQUEST: '资源预留',
  CORDON: '停止调度',
  UNCORDON: '启用调度',
  OPEN_TERMINAL: '打开终端',
  CUSTOM_COLUMNS: '定制内容',
  NO_MATCHING_RESULT_FOUND: '未发现匹配的结果',
  STATUS: '状态',
  TOTAL_ITEMS: '总数：{num}',
  YOU_CAN_TRY_TO: '您可以尝试',
  REFRESH_DATA: '刷新数据',
  CLEAR_SEARCH_CONDITIONS: '清空搜索条件。',
  // List > Edit Taints
  DUPLICATE_KEYS: '该键已经存在，请输入其他键。',
  EMPTY_KEY: '请输入一个键。'
};