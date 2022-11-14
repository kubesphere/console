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
  HPA_SET_TIP: '已设置容器组水平自动扩缩策略。',
  WORKLOAD_EMPTY_DESC: '请创建一个工作负载。',
  // List > Create > Basic Information
  // List > Create > Pod Settings
  // List > Create > Pod Settings > Add Container > Container Settings
  INVALID_IMAGE: '镜像无效。',
  INVALID_NAME_DESC: '名称无效。名称只能包含小写字母、数字和连字符（-），必须以小写字母或数字开头和结尾，最长 63 个字符。',
  NO_IMAGE_FOUND: '没有找到镜像',
  CONTAINER_EMPTY_DESC: '请添加至少一个工作容器。',
  RESOURC_QUOTAS_UNSET: '资源配额未设置',
  INSUFFICENT_RESOURCES: '资源不足',
  REMAINING_QUOTAS: '剩余配额',
  // List > Create > Pod Settings > Add Container > Container Settings > Environment Settings
  ENVIRONMENT_INVALID_TIP: '环境变量的键只能包含字母、数字、下划线（_）、连字符（-）和句点（.），并且不能以数字开头。',
  ENVIRONMENT_CANNOT_BE_EMPTY: '请设置环境变量的键。',
  // List > Create > Pod Settings > Port Settings
  WORKLOAD_PORT_NAME_DESC: '端口名称只能包含小写字母、数字及分隔符（-），且必须以小写字母或数字开头及结尾，不能有连续的分隔符，最长 15 个字符。',
  // List > Create > Pod Settings > Update Strategy > Rolling Update Settings
  MAX_EXTRA_PODS_DESC: '更新过程中允许的多余容器组副本的最大数量或百分比。',
  MAX_EXTRA_PODS: '最大多余容器组数量',
  // List > Create > Storage Settings
  AVAILABLE: '可用',
  IN_USER: '使用中',
  ACCESS_MODE_SCAP: '访问模式',
  PVC_OR_TEMPLATE_EMPTY: '您已启用收集卷上日志，请添加至少一个持久卷、临时卷或持久卷声明模板并指定容器日志所在的路径。',
  PVC_EMPTY: '您已启用收集卷上日志，请添加至少一个持久卷、临时卷或持久卷声明模板并指定容器日志所在的路径。',
  PROJECT_COLLECT_SAVED_DISABLED_DESC: '如需启用此功能，您需要在项目设置中启用收集卷上日志。',
  COLLECT_LOGS_ON_VOLUMES_DESC: '允许系统收集保存在卷上的容器日志。如需使用此功能，请为容器挂载读写模式的卷并设置容器将日志导出到卷。',
  // List > Create
  // List > Create > Storage Settings > Mount Volume
  CONTAINER_LOG_PATH: '容器日志路径',
  // List > Create > Storage Settings > Mount Volume > Temporary Volume
  CONTAINER_LOG_PATH_TIP: '容器日志的路径，相对于卷的挂载路径，支持通配符，可使用半角逗号（,）分隔多个路径。<br /><br /><b>示例</b><br />当卷挂载路径为 /data 时，log/*.log 表示日志文件为 /data/log 目录下所有 .log 格式的文件。',
  // List > Create > Advanced Settings
  // List > Edit Information
  // List > Edit YAML
  // List > Re-create
  RECREATE_CONFIRM_DESC: '您确定重新创建{type} {resource} 吗？容器组副本将会根据更新策略更新，同时相关业务将会中断。',
  // List > Delete
  NO_WORKLOAD_RELATED_RESOURCE_DESC: '当前工作负载没有关联的资源。',
  SELECT_ALL: '选择全部',
  DELETE_WORKLOAD_DESC_SI: '您即将删除工作负载 {resource}。<br/>请确认是否同时删除以下与工作负载关联的资源。',
  DELETE_WORKLOAD_DESC_PL: '您即将删除工作负载 {resource}。<br/>请确认是否同时删除以下与工作负载关联的资源。',
  DELETE_WORKLOAD: '删除工作负载',
  DELETE_MULTIPLE_WORKLOADS: '批量删除工作负载',
  DELETE_APP_RESOURCE_TIP: '资源由应用 <strong>{app}</strong> 管理，删除后可能影响应用的正常使用。请输入{type}名称 <strong>{resource}</strong> 以确认您了解此操作的风险。',
  STOP_APP_RESOURCE_TIP: '资源由应用 <strong>{app}</strong> 管理，停止后可能影响应用的正常使用。请输入{type}名称 <strong>{resource}</strong> 以确认您了解此操作的风险。'
};