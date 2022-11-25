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
  // Attributes
  QOS_CLASS: 'QoS 类别',
  NODE_NAME: '节点名称',
  POD_IP_ADDRESS: '容器组 IP 地址',
  // Run Records
  JOB_UNFINISHED: '未完成',
  // Resource Status
  TERMINATED: '已终止',
  // Scheduling Information
  SCHEDULED_TO_NODE: '调度至 {value}',
  SCHEDULING_NOT_SUCCESSFUL: '调度未成功',
  SCHEDULING_INFORMATION: '调度信息',
  SCHEDULING_RESULT: '调度结果',
  POD_SCHEDULING_METHOD: '容器组调度方式',
  POD_ASSIGNED_DESC: '系统根据容器组的资源预留值将容器组调度到具有足够可用资源的节点上。',
  STATUS_INFORMATION: '状态信息',
  WORKLOAD_CONDITION_AVAILABLE: '可用',
  WORKLOAD_CONDITION_PROGRESSING: '进行中',
  NOT_SUCCESSFUL: '未成功',
  CURRENT_STATUS: '当前状态',
  POD_CONDITION_INITIALIZED: '初始化完成',
  POD_CONDITION_INITIALIZED_DESC: '启动所有初始化容器。',
  POD_CONDITION_READY: '容器组就绪',
  POD_CONDITION_READY_DESC: '开始运行并允访问容器组。',
  POD_CONDITION_CONTAINERSREADY: '所有容器就绪',
  POD_CONDITION_CONTAINERSREADY_DESC: '启动容器组中的所有容器。',
  POD_CONDITION_PODSCHEDULED: '容器组调度完成',
  POD_CONDITION_PODSCHEDULED_DESC: '将容器组调度到集群中的一个节点。'
};