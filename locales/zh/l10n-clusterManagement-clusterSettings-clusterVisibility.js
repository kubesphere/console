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
  CLUSTER_VISIBILITY: '集群可见性',
  EDIT_VISIBILITY_DESC: '编辑集群在企业空间中的可见性。',
  UNAUTHORIZED: '未授权',
  CLUSTER_VISIBILITY_DESC: '集群可见性控制集群对企业空间的授权。将集群授权给企业空间后，即可在企业空间中查看并管理集群资源。',
  CLUSTER_VISIBILITY_Q1: '如何将集群授权给指定的企业空间使用？',
  CLUSTER_VISIBILITY_A1: '您可以点击编辑可见性将集群授权给指定的企业空间使用。',
  CLUSTER_VISIBILITY_Q2: '什么是公开集群?',
  CLUSTER_VISIBILITY_A2: '公开状态的集群意味着平台内的用户都可以使用该集群，并在集群中创建和调度资源。',
  // List
  WORKSPACE: '企业空间',
  CLUSTER_VISIBILITY_SCAP: '集群可见性',
  AUTHORIZATION_TIME_TCAP: '授权时间',
  // List > Edit Visibility
  EDIT_VISIBILITY: '编辑可见性',
  AUTHORIZED: '已授权',
  SET_PUBLIC_CLUSTER: '设置为公开集群',
  HOST_CLUSTER_VISIBILITY_WARNING: '请谨慎将主集群授权给企业空间，主集群负载过高会导致多集群系统稳定性下降。',
  CLUSTER_VISIBILITY_REMOVE_WARNING: '移除集群对企业空间的授权后，该企业空间在当前集群下的所有资源将被删除。',
  REMOVE_WORKSPACE_CONFIRM_TITLE: '移除授权',
  REMOVE_WORKSPACE_CONFIRM_SI: '请输入企业空间名称 <strong>{resource}</strong> 确保您已了解操作所带来的风险。',
  REMOVE_WORKSPACE_CONFIRM_PL: '请输入企业空间名称 <strong>{resource}</strong> 确保您已了解操作所带来的风险。'
};