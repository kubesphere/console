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
  TRUE: '是',
  FALSE: '否',
  // More > Set as Default Storage Class
  SET_DEFAULT_STORAGE_CLASS_TITLE: '设为默认存储类',
  SET_AS_DEFAULT_STORAGE_CLASS: '设为默认存储类',
  STORAGE_CLASS_SET_DEFAULT_DESC: '设置为默认存储类后，如果没有特殊指定，系统将使用默认存储类创建卷。一个 KubeSphere 集群中仅允许设置一个默认存储类。',
  // More > Edit Authorization Rules
  SET_AUTHORIZATION_RULES: '设置授权规则',
  AUTHORIZATION_RULES: '授权规则',
  AUTHORIZATION_RULES_DESC: '设置授权规则使用户只能在特定项目和企业空间使用存储类。',
  AUTHORIZATION_NOT_SUPPORT: '当前集群不支持此功能。请升级 KubeSphere 到 v3.3.0 或更高版本，或者手动安装 <a href="https://github.com/kubesphere/storageclass-accessor" target="_blank">storageclass-accessor</a>。',
  OPERATOR_IN: '属于',
  OPERATOR_NOT_IN: '不属于',
  // More > Set Volume Permissions
  SET_VOLUME_OPERATIONS: '设置卷操作',
  VOLUME_CLONING: '卷克隆',
  VOLUME_CLONING_DESC: '允许用户克隆卷。',
  VOLUME_SNAPSHOT_CREATION: '卷快照创建',
  VOLUME_SNAPSHOT_CREATION_DESC: '允许用户创建卷快照。',
  VOLUME_EXPANSION_DESC: '允许用户扩展卷容量。卷容量只能增加，不能减少。',
  SET_VOLUME_OPERATIONS_TIP: '以下设置仅控制用户是否被允许在 Web 控制台执行操作。基于存储类型创建的持久卷是否实际支持这些操作取决于后端存储系统。',
  // More > Set Auto Expansion
  SET_AUTO_EXPANSION: '设置自动扩展',
  AUTO_EXPANSION: '自动扩展',
  AUTO_EXPANSION_DESC: '设置系统在卷剩余空间低于阈值时自动扩展卷容量。',
  AUTO_EXPANSION_SETTINGS: '自动扩展设置',
  MAXIMUM_SIZE: '最大容量',
  INCREMENT: '增量',
  INCREMENT_DESC: '根据存储类的 CSI 插件设置卷容量增量。',
  RESTART_WORKLOAD_AUTOMATICALLY: '自动重启工作负载',
  RESTART_WORKLOAD_AUTOMATICALLY_DESC: '该系统自动检查卷状态，以确定是否需要重新启动工作负载。',
  RESTART_WORKLOAD_AUTOMATICALLY_TIP: '如果到达超时时间时卷容量仍未扩展成功，系统将在工作负载上添加“restart.kubesphere.io/skip”注解使工作负载不再被重启。如需再次为工作负载启用自动重启功能，您需要在工作负载上手动删除该注解。',
  // More > Delete
  // Persistent Volume Claims > Persistent Volume Claims
  MAXIMUM_SIZE_SCAP: '最大容量',
  VALUE_TIMEOUT: '{value}s（超时时间）',
  // Persistent Volume Claims > Persistent Volume Claims
  PVC_COUNT: '持久卷声明数量'
};