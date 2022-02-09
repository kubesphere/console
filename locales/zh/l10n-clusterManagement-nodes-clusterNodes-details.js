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
  DETAILS: '详情',
  ARCHITECTURE: '系统架构',
  OS_VERSION: '操作系统版本',
  OS_TYPE: '操作系统类型',
  LINUX: 'Linux',
  KERNEL_VERSION: '内核版本',
  CONTAINER_RUNTIME: '容器运行时',
  KUBELET_VERSION: 'kubelet 版本',
  KUBE_PROXY_VERSION: 'kube-proxy 版本',
  IP_ADDRESS: 'IP 地址',
  SCHEDULABLE: '可调度',
  YES: '是',
  // More > Edit Labels
  EDIT_LABELS: '编辑标签',
  LABEL_PL: '标签',
  // More > Edit Taints
  TAINTS: '污点',
  EDIT_TAINTS: '编辑污点',
  TAINTS_DESC: '为节点添加污点以避免或尽可能避免容器组调度到节点。为节点设置污点后，您可以为容器组设置容忍度以允许容器组调度到有特定污点的节点。',
  ADD_TAINT: '添加污点',
  COMMON_TAINTS: '公共污点',
  NOSCHEDULE: '阻止调度',
  PREFER_NOSCHEDULE: '尽可能阻止调度',
  NOEXECUTE: '阻止调度并驱逐现有容器组',
  TAINTS_TIPS: '如果主机中存在一个或多个影响策略为 NoSchedule 的污点，该容器组不会被调度到该主机<br>如果主机中不存在影响策略为 NoSchedule 的污点，但是存在一个或多个影响策略为 PreferNoSchedule 的污点，该容器组会尽量不调度到该主机<br>如果主机中存在一个或多个影响策略为 NoExecute 的污点，该容器组不会被调度到该主机，并且会驱逐已经调度到该主机的容器组实例',
  // Running Status > Resource Usage
  RESOURCE_USAGE: '资源用量',
  MAXIMUM_PODS: '容器组最大数量',
  MAXIMUM_PODS_SCAP: '容器组最大数量',
  // Running Status > Allocated resources
  MEMORY_REQUEST_SCAP: '内存预留',
  MEMORY_LIMIT_SCAP: '内存限制',
  CPU_REQUEST_SCAP: 'CPU 预留',
  CPU_LIMIT_SCAP: 'CPU 限制',
  // Running Status > Allocated Resources
  ALLOCATED_RESOURCES: '已分配资源',
  // Running Status > Health Status
  RUNNING_STATUS: '运行状态',
  HEALTH_STATUS: '健康状态',
  NODE_NETWORKUNAVAILABLE: '网络可用性',
  NODE_NETWORKUNAVAILABLE_DESC: '检查节点上的网络配置是否正确。',
  NODE_MEMORYPRESSURE: '内存压力(MemoryPressure)',
  NODE_MEMORYPRESSURE_DESC: '如果节点上的内存使用压力过大,则调度失败。',
  NODE_DISKPRESSURE: '磁盘压力(DiskPressure)',
  NODE_DISKPRESSURE_DESC: '磁盘大小存在压力 - 即磁盘容量低。',
  NODE_PIDPRESSURE: '进程压力(PIDPressure)',
  NODE_PIDPRESSURE_DESC: '如果节点进程压力过大，则会调度失败。',
  NODE_READY: '节点就绪状态',
  NODE_READY_DESC: '节点是否可以接收新的容器组。',
  // Running Status > Taints
  NO_TAINTS_TIPS: '未发现污点。',
  POLICY: '策略',
  // Pods
  READY_VALUE: '就绪：{readyCount}/{total}',
  STATUS_VALUE: '状态：{value}',
  CREATED_AGO: '创建于 {diff}'
};