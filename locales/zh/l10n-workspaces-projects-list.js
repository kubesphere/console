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
  // List
  PROJECT_EMPTY_DESC: '请创建一个项目。',
  // List > Projects > Create
  CREATE_PROJECT: '创建项目',
  // List > Multi-cluster Projects > Create
  CREATE_MULTI_CLUSTER_PROJECT: '创建多集群项目',
  CREATE_MULTI_CLUSTER_PROJECT_DESC: '您可以创建多集群项目，让项目运行在多个集群中，为应用提供快速迭代开发的容器环境并实现高可用。',
  MULTI_CLUSTER_PROJECT_PL: '多集群项目',
  FED_HOST_NAMESPACE_TIP: '该项目与多集群项目关联, 请勿修改此项目中的资源。',
  MULTI_CLUSTER_PROJECT: '多集群项目',
  PROJECT_NAME_EXISTS_IN_HOST: '项目名称在主集群中已经存在，请输入其他项目名称。',
  SELECT_CLUSTER_DESC: '选择要创建项目的集群。',
  CLUSTER_EMPTY_DESC: '请选择一个集群。',
  PROJECT_NAME_EXISTS_IN_CLUSTER: '项目名称在在 {cluster} 集群中已存在，请输入其他项目名称。',
  PROJECT_CLUSTER_SETTINGS_DESC: '为项目选择至少一个集群。如果选择多个集群，主集群上将创建同名项目。',
  // List > Edit Information
  // List > Edit Quotas
  // List > Delete
  // List > Add Cluster
  FEDPROJECT_CANNOT_ADD_CLUSTER: '没有可添加的集群。'
};