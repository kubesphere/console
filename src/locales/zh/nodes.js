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

export default {
  Node: '主机',
  nodes: '主机',
  Nodes: '主机',
  host: '主机',
  Hosts: '主机',
  Master: '主节点',
  Worker: '计算节点',
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
  'Resource Status': '资源状态',
  Taints: '污点',
  taints: '污点',
  Taint: '污点',
  taint: '污点',
  Conditions: '状态',
  Annotations: '注解',

  NODE_STATUS_UNSCHEDULABLE: '无法调度',
  NODE_STATUS_RUNNING: '运行中',
  NODE_STATUS_WARNING: '异常中',

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

  NODE_DESC:
    'KubeSphere 集群中的计算能力由主机提供，集群中的节点是所有容器组运行所在的工作主机。',

  NODE_NETWORKUNAVAILABLE_TIP: '当前节点网络配置是否正确',
  NODE_OUTOFDISK_TIP: '当前节点是否有足够的空间添加和运行新的 Pods',
  NODE_MEMORYPRESSURE_TIP: '当前节点的内存压力的高低',
  NODE_DISKPRESSURE_TIP: '当前节点的磁盘压力高低',
  NODE_PIDPRESSURE_TIP: '当前节点的进程是否存在压力',
  NODE_READY_TIP: '当前节点的状态是否健康和能够准备接收新的 Pods 运行',

  NODE_TYPES_Q: '集群节点的类型？',
  NODE_TYPES_A: '节点分为主控 (Master) 节点和工作 (Worker) 节点',
  WHAT_IS_NODE_TAINTS_Q: '什么是节点污点？',
  WHAT_IS_NODE_TAINTS_A:
    '节点污点 (Taints) 可以阻止某些容器组 (Pod) 副本部署至该节点中, 与容忍度 (Tolerations) 一起工作确保容器组不会被调度到不合适的节点上',
}
