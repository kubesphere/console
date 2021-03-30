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
  'Cluster Node': '集群节点',
  'Cluster Nodes': '集群节点',
  'Node Role': '节点角色',
  'Edge Node': '边缘节点',
  'Edge Nodes': '边缘节点',
  'Master Node': 'Master 节点',
  'Worker Node': '工作节点',
  'Add Node': '添加节点',
  'System Version': '系统版本',
  'Node Status': '节点状态',
  'Online Nodes': '在线节点',
  'All Nodes': '全部节点',
  'IP Address': 'IP 地址',
  'Node IP': '节点 IP',
  Unschedulable: '无法调度',
  Architecture: '系统架构',
  'OS Image': '操作系统',
  OperatingSystem: '操作系统类型',
  OsImage: '操作系统',
  KernelVersion: '内核版本',
  ContainerRuntimeVersion: '容器版本',
  'Kubelet Version': 'Kubelet 版本',
  'Kube-Proxy Version': 'Kube-Proxy 版本',
  lastHeartbeatTime: '最近更新时间',
  'Node Online Status': '节点在线状态',
  'CPU Utilization': 'CPU 使用情况',
  'Memory Utilization': '内存使用情况',
  'Pod Count': '容器组数量',
  'Pod Usage': '容器组使用情况',
  'Pod Quantity Trend': '容器组数量变化',
  'Local Storage Capacity': '本地存储容量',
  used: '已用',
  'Resource Usage Status': '资源使用状态',
  Taints: '污点',
  taints: '污点',
  Taint: '污点',
  taint: '污点',
  Conditions: '状态',
  Annotations: '注解',

  'Resource Usage': '资源使用情况',

  'CPU Requests': 'CPU 请求',
  'CPU Limits': 'CPU 限制',
  'Memory Requests': '内存请求',
  'Memory Limits': '内存限制',

  NODE_STATUS_UNSCHEDULABLE: '无法调度',
  NODE_STATUS_RUNNING: '运行中',
  NODE_STATUS_WARNING: '异常中',
  NODE_STATUS_PENDING: '创建中',
  NODE_STATUS_FAILED: '创建失败',

  NOSCHEDULE_OPTION: '不允许调度 (NoSchedule)',
  PREFER_NOSCHEDULE_OPTION: '尽量不调度 (PreferNoSchedule)',
  NOEXECUTE_OPTION: '不允许并驱逐已有容器组 (NoExecute)',

  'Taint Management': '污点管理',
  'Common Taints': '公共污点',
  'Node List': '主机列表',
  'Node Taints': '主机污点',
  TAINTS_MSG:
    '污点表示此节点已被 key=value 污染，容器组调度不允许（PodToleratesNodeTaints 策略）或尽量不（TaintTolerationPriority 策略）调度到此节点，除非是能够容忍（Tolerations）key=value 污点的容器组。',
  TAINTS_TIPS:
    '如果主机中存在一个或多个影响策略为 NoSchedule 的污点，该容器组不会被调度到该主机<br>如果主机中不存在影响策略为 NoSchedule 的污点，但是存在一个或多个影响策略为 PreferNoSchedule 的污点，该容器组会尽量不调度到该主机<br>如果主机中存在一个或多个影响策略为 NoExecute 的污点，该容器组不会被调度到该主机，并且会驱逐已经调度到该主机的容器组实例',
  NO_TAINTS_TIPS: '暂未设置污点',
  TAINT_SELECT_TIPS: '加入公共污点',
  TAINT_DELETE_TIPS: '删除该污点',
  'Add Taint': '添加污点',
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
  'Allocated Resources': '已分配资源',

  Metadata: '元数据',

  CLUSTER_NODE_DESC:
    '集群节点提供了当前集群下节点的运行状态，以及可以编辑删除节点',
  CLUSTER_NODE_CREATE_DESC:
    '集群节点提供了当前集群下节点的运行状态，以及可以编辑删除节点',
  EDGE_NODE_DESC:
    '边缘节点提供了当前集群下节点的运行状态，以及可以编辑删除节点',
  EDGE_NODE_CREATE_DESC:
    '边缘节点提供了当前集群下节点的运行状态，以及可以编辑删除节点',

  NODE_NETWORKUNAVAILABLE: '网络配置(NetworkUnavailable)',
  NODE_NETWORKUNAVAILABLE_DESC: '检查节点上的网络配置是否正确',
  NODE_OUTOFDISK: '磁盘可用空间(OutOfDisk)',
  NODE_OUTOFDISK_DESC: '检查节点上是否有空间添加新的容器组',
  NODE_MEMORYPRESSURE: '内存压力(MemoryPressure)',
  NODE_MEMORYPRESSURE_DESC: '如果节点上的内存使用压力过大,则调度失败',
  NODE_DISKPRESSURE: '磁盘压力(DiskPressure)',
  NODE_DISKPRESSURE_DESC: '磁盘大小存在压力 - 即磁盘容量低',
  NODE_PIDPRESSURE: '进程压力(PIDPressure)',
  NODE_PIDPRESSURE_DESC: '如果节点进程压力过大，则会调度失败',
  NODE_READY: '容器组接收(Ready)',
  NODE_READY_DESC: '节点健康且可以接收新的容器组',

  NODE_TYPES_Q: '集群节点的类型？',
  NODE_TYPES_A: '节点分为主控 (Master) 节点和工作 (Worker) 节点',
  WHAT_IS_NODE_TAINTS_Q: '什么是节点污点？',
  WHAT_IS_NODE_TAINTS_A:
    '节点污点 (Taints) 可以阻止某些容器组 (Pod) 副本部署至该节点中, 与容忍度 (Tolerations) 一起工作确保容器组不会被调度到不合适的节点上',

  NODE_TYPE_DESC:
    '节点类型为提供了主机节点分组功能，用户可以通过创建合适关系的节点类型并将主机节点加入相应的分组，从而将容器组按照分组关系部署到合适的物理节点上，来提高资源的可用性，业务的连续性。',

  NODE_TYPE_DESCRIPTION_DEC:
    '描述信息在选择节点类型时将帮助用户更好的选择节点类型并使用集群',
  ADD_EDGE_COMMAND: '将命令复制到命令行中进行创建边缘节点',
  IN_USE_Node_IP: '节点 IP {ip} 已被使用',
  IN_USE_Node_NAME: '节点名称 {name} 已被使用',
  'Add Edge Node': '添加边缘节点',
  "Please input the node's name": '请输入节点名称',
  INSTALL_EDGENODE_DESC:
    '运行命令前请确保已在边缘节点安装容器运行时如 docker 或 containerd，详见  <a href="https://kubeedge.io/en/docs/" target="_blank">文档</a>',
  ADD_DEFAULT_STAIN: '添加默认污点 {params}',
}
