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
  GRAYSCALE_RELEASE: '灰度发布',
  // Release Modes
  BLUE_GREEN_DEPLOYMENT: '蓝绿部署',
  CANARY_RELEASE: '金丝雀发布',
  TRAFFIC_MIRRORING: '流量镜像',
  BLUE_GREEN_DEPLOYMENT_DESC: '将业务流量发送给新版本进行测试。如果新版本运行不正常，可立即将业务流量切换给旧版本。',
  CANARY_RELEASE_DESC: '将业务流量同时分配给新版本和旧版本，在测试新版本的同时保证业务连续性。',
  TRAFFIC_MIRRORING_DESC: '将业务流量的副本发送给新版本进行测试，而不实际暴露新版本。',
  // Release Modes > Blue-Green Deployment > Create > Basic Information
  CREATE_BLUE_GREEN_DEPLOYMENT_TASK: '创建蓝绿部署任务',
  // Release Modes > Blue-Green Deployment > Create > Service Settings
  DESELECT: '取消选择',
  SELECT: '选择',
  SELECT_GRAY_COMPONENT_TIP: '请选择一个服务。',
  // Release Modes > Blue-Green Deployment > Create > New Version Settings
  REPLICA: '副本',
  REPLICA_PL: '副本',
  GRAYSCALE_REPLICAS_DESC: '新版本容器组副本数量',
  // Release Modes > Blue-Green Deployment > Create > Strategy Settings
  SELECT_VERSION: '选择版本',
  BLUE_GREEN_STRATEGY_DESC: '选择一个版本接管所有业务流量。',
  TAKE_OFFLINE: '下线',
  TAKE_OVER: '接管',
  GRAYSCALE_VERSION: '版本：{version}',
  // Release Modes > Canary Release > Create
  CREATE_CANARY_RELEASE_TASK: '创建金丝雀发布任务',
  // Release Modes > Canary Release > Create > Service Settings
  UNFINISHED_GRAY_TASK: '灰度发布进行中',
  NO_WORKLOAD_FOUND_TIP: '未发现工作负载',
  NO_SERVICE_MESH_TIP: '该应用未启用应用治理，无法使用灰度发布功能。',
  GRAY_APP_NAME: '应用：{name}',
  UNSUPPORTED_WORKLOAD_TYPE: '不支持该工作负载类型',
  // Release Modes > Canary Release > Create > New Version Settings
  VERSION_EXISTS: '版本号已经存在，请输入其他版本号。',
  NEW_VERSION_NUMBER_EXIST_DESC: '工作负载 {name} 已经存在，请输入其他版本号。',
  INIT_CONTAINER: '初始化容器',
  INIT_CONTAINER_VALUE: '初始化容器：{value}',
  CONTAINER_VALUE: '容器：{value}',
  GRAYSCALE_IMAGE: '镜像：{image}',
  NEW_VERSION_NUMBER: '新版本号',
  NEW_VERSION_NUMBER_EMPTY_DESC: '请输入新版本号。',
  NEW_VERSION_SETTINGS: '新版本设置',
  NEW_VERSION_NUMBER_DESC: '新版本号只能包含小写字母和数字, 最长 16 个字符。',
  NEW_VERSION_NUMBER_INVALID_DESC: '新版本号无效。新版本号只能包含小写字母和数字, 最长 16 个字符。',
  // Release Modes > Canary Release > Create > Strategy Settings > Specify Request Parameters
  KEY_EQ_VALUE: '键=值',
  HEADER: 'Header',
  CLIENT_OS: '客户端操作系统',
  COOKIE: 'Cookie',
  SPECIFY_REQUEST_PARAMETERS_DESC: '满足以下条件的请求将被发送给新版本。',
  POLICY_REQUEST_CONTENT_TIP: '指定请求参数功能仅支持 HTTP、HTTP2 和 gRPC 请求。',
  SPECIFY_REQUEST_PARAMETERS: '指定请求参数',
  REQUEST_PARAMETERS: '请求参数',
  EXACT_MATCH: '完全匹配',
  PREFIX_MATCH: '前缀匹配',
  REGEX_MATCH: '正则匹配',
  // Release Modes > Canary Release > Create > Strategy Settings > Specify Traffic Distribution
  CANARY_BY_TRAFFIC_DESC: '{ratio}% 前往服务 <b>{component}</b> 的流量将被发送给新版本 <b>{newVersion}</b>。',
  SPECIFY_TRAFFIC_DISTRIBUTION: '指定流量分配',
  TRAFFIC: '流量',
  TRAFFIC_DISTRIBUTION: '流量分配',
  // Release Modes > Traffic Mirroring > Create
  CREATE_TRAFFIC_MIRRORING_TASK: '创建流量镜像任务',
  // Release Modes > Traffic Mirroring > Create > Strategy Settings
  // Release Tasks
  PREREQUEST_FOR_USE_GRAYRELEASE_Q: '使用灰度发布功能有哪些前提条件？',
  PREREQUEST_FOR_USE_GRAYRELEASE_A: '使用灰度发布功能前，您需要创建自制应用并且为自制应用启用应用治理功能。',
  RELEASE_TASKS: '发布任务',
  TCP_INBOUND_TRAFFIC: 'TCP 入站流量',
  TCP_OUTBOUND_TRAFFIC: 'TCP 出站流量',
  NO_DATA_SCAP: '未发现数据',
  REPLICA_COUNT_LOW: '副本数量',
  MIRROR_POLICY_DESC: '流量镜像将生产环境的流量复制到灰度版本中，在新版本上线到真实环境之前使用实时用户流量对它进行测试。<br/>因此，流量镜像可以降低直接在生产环境进行变更所带来的风险。',
  // Release Tasks > Blue-Green Deployment > Task Status
  BLUE_GREEN_DEPLOYMENT_LOW: '蓝绿部署',
  BLUE_GREEN_TRAFFIC_DISTRI_DESC: '新版本或旧版本接收全部流量。',
  TRAFFIC_LOW: '流量',
  VERSION_TRAFFIC_PERCENT: '{version} 流量 {percent}%',
  OFFLINE: '下线',
  OFFLINE_TIP: '没有服务流量被发送到此版本。您可以上线此版本使其接管所有流量。',
  // Release Tasks > Canary Release > Task Status
  CANARY_RELEASE_LOW: '金丝雀发布',
  ADJUST_TRAFFIC_DISTRIBUTION_DESC: '您确定将 {ratioNew}% 的流量发送给新版本 <b>{newVersion}</b> 以及 {ratioOld}% 的流量发送给旧版本 <b>{oldVersion}</b> 吗？',
  ALLOCATE_TRAFFIC_DESC: '拖动滑块设置发送给新版本的流量比例和发送给旧版本的流量比例。',
  COOKIE_EXACT_MATCH: 'Cookie（完全匹配）',
  COOKIE_REGEX_MATCH: 'Cookie（正则匹配）',
  HEADER_EXACT_MATCH: 'Header（完全匹配）',
  HEADER_REGEX_MATCH: 'Header（正则匹配）',
  URL_PREFIX_MATCH: 'URL（前缀匹配）',
  URL_EXACT_MATCH: 'URL（正则匹配）',
  OS: '操作系统',
  SERVICE_VERSION_RECEIVE_ALL_TRAFFIC: '版本 <b>{version}</b> 已接管所有流量。',
  RESTORE: '恢复',
  SUCCESSFUL_REQUEST_RATE: '请求成功率',
  TRAFFIC_IN_LAST_FIVE_MINUTES: '最近五分钟的流量。',
  DELETE_GRAYSCALE_RELEASE_TASK_DESC: '删除灰度发布任务前，请选择一个版本接管所有流量。',
  GRAY_COMPONENT_DESC: '测试中的新版本和旧版本的相关信息。',
  // Release Tasks > Traffic Mirroring > Task Status
  TRAFFIC_MIRRORING_LOW: '流量镜像',
  MIRRORED_TRAFFIC: '镜像流量',
  MIRRORED_TRAFFIC_TIP: '流量镜像并不实际暴露新版本。',
  RELEASE_MODE_PL: '发布模式',
  RELEASE_MODE: '发布模式',
  NEW_VERSION_TAKEOVER_DESC: '新版本 <b>{newVersion}</b> 正在接收所有流量。如果您删除当前灰度发布任务，旧版本 <b>{oldVersion}</b> 也将被删除。',
  OLD_VERSION_TAKEOVER_DESC: '旧版本 <b>{oldVersion}</b> 已接管所有流量。如果您删除当前灰度发布任务，新版本 <b>{newVersion}</b> 也将被删除。',
  GRAYSCALE_REPLICA_SI: '副本数量：{count}',
  GRAYSCALE_REPLICA_PL: '副本数量：{count}',
  TRAFFIC_MIRRORING_TRAFFIC_DISTRI_DESC: '将流量的副本发送给新版本进行测试。',
  // Release Tasks > Task Status > Edit
  EDIT_GRAYSCALE_RELEASE_TASK: '编辑灰度发布任务',
  // Release Tasks > Canary Release > Traffic Distribution
  ADJUST_TRAFFIC_DISTRIBUTION: '调整流量分配'
};