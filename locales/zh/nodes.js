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
  NODE_SI: '节点',
  NODE_PL: '节点',
  MASTER_NODE_SI: '主节点',
  MASTER_NODE_PL: '主节点',
  WORKER_NODE_SI: '工作节点',
  WORKER_NODE_PL: '工作节点',

  'Cluster Node': '集群节点',
  CLUSTER_NODE_PL: '集群节点',
  CLUSTER_NODE: '集群节点',
  'Cluster Nodes': '集群节点',

  'Node Role': '节点角色',
  'Edge Node': '边缘节点',
  EDGE_NODE_PL: '边缘节点',
  'Master Node': 'Master 节点',
  'Worker Node': '工作节点',
  ADD_NODE: '添加节点',
  'System Version': '系统版本',
  ONLINE_NODES: '在线节点',
  ALL_NODES: '全部节点',
  IP_ADDRESS: 'IP 地址',
  LINUX: 'Linux',
  'Node IP': '节点 IP',
  Unschedulable: '无法调度',
  SCHEDULABLE: '可调度',
  ARCHITECTURE: '系统架构',
  'OS Image': '操作系统',
  OS_TYPE: '操作系统类型',
  OS_VERSION: '操作系统版本',
  KERNEL_VERSION: '内核版本',
  CONTAINER_RUNTIME: '容器运行时',
  KUBELET_VERSION: 'kubelet 版本',
  KUBE_PROXY_VERSION: 'kube-proxy 版本',
  lastHeartbeatTime: '最近更新时间',
  LATEST_UPDATE_VALUE: '状态更新时间：{value}',
  NODE_ONLINE_STATUS: '节点在线状态',
  PODS: '容器组',
  'Pod Usage': '容器组使用情况',
  'Pod Quantity Trend': '容器组数量变化',
  'Local Storage Capacity': '本地存储容量',
  used: '已用',
  'Resource Usage Status': '资源使用状态',
  TAINTS: '污点',
  taints: '污点',
  Taint: '污点',
  taint: '污点',
  Conditions: '状态',
  ANNOTATION_PL: '注解',
  WORKLOAD_ANNOTATIONS: '工作负载注解',

  'Resource Usage': '资源使用情况',

  'CPU Requests': 'CPU 预留',
  'CPU Limits': 'CPU 限制',
  'Memory Requests': '内存预留',
  'Memory Limits': '内存限制',

  NODE_STATUS_UNSCHEDULABLE: '无法调度',
  NODE_STATUS_RUNNING: '运行中',
  NODE_STATUS_WARNING: '告警',
  NODE_STATUS_PENDING: '创建中',
  NODE_STATUS_FAILED: '创建失败',

  NOSCHEDULE: '阻止调度',
  PREFER_NOSCHEDULE: '尽可能阻止调度',
  NOEXECUTE: '阻止调度并驱逐现有容器组',

  EDIT_TAINT: '编辑污点',
  EDIT_TAINTS: '编辑污点',
  COMMON_TAINTS: '公共污点',
  'Node List': '主机列表',
  'Node Taints': '主机污点',
  TAINTS_DESC:
    '为节点添加污点以避免或尽可能避免容器组调度到节点。为节点设置污点后，您可以为容器组设置容忍度以允许容器组调度到有特定污点的节点。',
  TAINTS_TIPS:
    '如果主机中存在一个或多个影响策略为 NoSchedule 的污点，该容器组不会被调度到该主机<br>如果主机中不存在影响策略为 NoSchedule 的污点，但是存在一个或多个影响策略为 PreferNoSchedule 的污点，该容器组会尽量不调度到该主机<br>如果主机中存在一个或多个影响策略为 NoExecute 的污点，该容器组不会被调度到该主机，并且会驱逐已经调度到该主机的容器组实例',
  NO_TAINTS_TIPS: '没有找到污点。',
  TAINT_SELECT_TIPS: '加入公共污点',
  TAINT_DELETE_TIPS: '删除污点',
  ADD_TAINT: '添加污点',
  'Delete All Taints': '全部删除',
  'CPU Used': 'CPU 使用',
  'Memory Used': '内存使用',
  'Pod Used': '容器组使用',
  'Scheduling Policy': '调度策略',
  'Add Type': '添加类型',
  'Add Node Type': '添加节点类型',
  'Type Name': '类型名称',
  'Allocated CPU': '已分配 CPU',
  'Allocated Memory': '已分配内存',
  ALLOCATED_RESOURCES: '已分配资源',

  METADATA: '元数据',

  CLUSTER_NODE_DESC:
    '集群节点是 KubeSphere 集群中的基础服务器，您可以在此页面对集群节点进行管理。',
  CLUSTER_NODE_EMPTY_DESC: '请为集群添加一个节点。',
  EDGE_NODE_DESC:
    '边缘节点是部署在 KubeSphere 集群外部的服务器，您可以将边缘节点添加到 KubeSphere 集群以对其进行管理。',
  EDGE_NODE_EMPTY_DESC: '请为集群添加一个边缘节点。',

  NODE_NETWORKUNAVAILABLE: '网络可用性',
  NODE_NETWORKUNAVAILABLE_DESC: '检查节点上的网络配置是否正确',
  NODE_OUTOFDISK: '磁盘可用空间(OutOfDisk)',
  NODE_OUTOFDISK_DESC: '检查节点上是否有空间添加新的容器组',
  NODE_MEMORYPRESSURE: '内存压力(MemoryPressure)',
  NODE_MEMORYPRESSURE_DESC: '如果节点上的内存使用压力过大,则调度失败',
  NODE_DISKPRESSURE: '磁盘压力(DiskPressure)',
  NODE_DISKPRESSURE_DESC: '磁盘大小存在压力 - 即磁盘容量低',
  NODE_PIDPRESSURE: '进程压力(PIDPressure)',
  NODE_PIDPRESSURE_DESC: '如果节点进程压力过大，则会调度失败',
  NODE_READY: '节点就绪状态',
  NODE_READY_DESC: '节点是否可以接收新的容器组。',

  NODE_TYPES_Q: '集群节点有哪些类型？',
  NODE_TYPES_A: '集群节点分为主节点和工作节点。',
  WHAT_IS_NODE_TAINTS_Q: '什么是节点污点？',
  WHAT_IS_NODE_TAINTS_A:
    '节点污点（Taint）可以阻止某些容器组部署到该节点，与容忍度（Toleration）一起使用，可确保容器组不会被调度到不合适的节点上。',

  NODE_TYPE_DESC:
    '节点类型为提供了主机节点分组功能，用户可以通过创建合适关系的节点类型并将主机节点加入相应的分组，从而将容器组按照分组关系部署到合适的物理节点上，来提高资源的可用性，业务的连续性。',

  NODE_TYPE_DESCRIPTION_DEC:
    '描述信息在选择节点类型时将帮助用户更好的选择节点类型并使用集群',
  ADD_EDGE_COMMAND: '在边缘节点中运行以上命令以对其进行配置。',
  IN_USE_Node_IP: 'IP 地址 {ip} 已被使用，请输入其他 IP 地址。',
  IN_USE_Node_NAME: '节点名称 {name} 已存在，请输入其他名称。',
  'Add Edge Node': '添加边缘节点',
  NODE_NAME_EMPTY_DESC: '请设置节点的名称。',
  EDGENODE_NAME_EMPTY_DESC: '请设置边缘节点的名称。',
  EDGENODE_CONFIG_COMMAND_TIP:
    '运行命令前请确保已在边缘节点安装容器运行时，例如 Docker 或 containerd。<a href="https://kubeedge.io/en/docs/" target="_blank">了解更多</a>',
  ADD_DEFAULT_TAINT: '添加默认污点 {params}',
}
