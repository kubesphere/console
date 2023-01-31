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
  WORKSPACE_PL: '企业空间',
  WORKSPACE_DESC: '企业空间是一个组织您的项目和 DevOps 项目、管理资源访问权限以及在团队内部共享资源等的逻辑单元，可以作为团队工作的独立工作空间。',
  // List
  CLUSTER_PL: '集群',
  ALL_CLUSTERS: 'All Clusters',
  // List > Create > Basic Information
  CREATE_WORKSPACE: '创建企业空间',
  WORKSPACE_NAME_EMPTY_DESC: '请输入企业空间名称。',
  WORKSPACE_CREATE_DESC: '设置企业空间的基本信息。',
  ADMINISTRATOR: '管理员',
  WORKSPACE_NAME_EXISTS_DESC: '企业空间名称已存在。',
  INVALID_WORKSPACE_NAME: '企业空间名称无效。',
  // List > Create > Cluster Settings
  SELECT_CLUSTERS_DESC: '选择企业空间需要使用的集群。',
  NO_CLUSTER_AVAILABLE: '没有可用集群',
  NO_CLUSTER_AVAILABLE_DESC: '未发现可用的集群。请在企业空间创建完成后，联系平台管理员或集群管理员将一个集群授权给该企业空间。',
  WORKSPACE_NO_CLUSTER_TIP: '请联系平台管理员或者集群管理员将一个集群授权给企业空间。',
  AVAILABLE_CLUSTERS: '可用集群',
  CLUSTER_SETTINGS: '集群设置',
  SELECT_HOST_CLUSTER_WARNING: '当前系统为多集群系统，请尽量避免在主集群上创建资源。主集群负载过高会导致多集群系统稳定性下降。',
  // List > Edit Information
  // List > Delete
  DELETE_WORKSPACE: '删除企业空间',
  WORKSPACE_LOW: '企业空间'
};