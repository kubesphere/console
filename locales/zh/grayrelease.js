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
  JOB_STATUS: '任务状态',
  RELEASE_JOBS: '任务状态',
  RELEASE_MODE_PL: '发布模式',
  RELEASE_MODE: '发布模式',
  GRAY_RELEASE_STRATEGY_SI: '灰度策略',
  TOTAL_GRAY_RELEASE_JOB: '共计 {num} 个灰度任务',
  TOTAL_GRAY_RELEASE_JOBS: '共计 {num} 个灰度任务',
  NO_GRAYSCALE_RELEASE_JOB_FOUND: '没有找到灰度发布任务',
  NO_GRAYSCALE_RELEASE_TASK_FOUND_DESC: '请创建一个灰度发布任务。',

  BLUE_GREEN_DEPLOYMENT: '蓝绿部署',
  CREATE_BLUE_GREEN_DEPLOYMENT_JOB: '创建蓝绿部署任务',
  CREATE_CANARY_RELEASE_JOB: '创建金丝雀发布任务',
  CREATE_TRAFFIC_MIRRORING_JOB: '创建流量镜像任务',
  CANARY_RELEASE: '金丝雀发布',
  BLUE_GREEN_DEPLOYMENT_LOW: '蓝绿部署',
  CANARY_RELEASE_LOW: '金丝雀发布',
  TRAFFIC_MIRRORING_LOW: '流量镜像',
  'A/B Testing': 'A/B 测试',
  TRAFFIC_MIRRORING: '流量镜像',

  traffic: '流量',

  GRAY_RELEASE_JOB_NAME: '灰度任务名称',
  GRAYSCALE_RELEASE_COMPONENT_PL: '灰度组件',
  NEW_VERSION_SETTINGS: '新版本设置',
  NEW_VERSION_NUMBER: '新版本号',
  GRAYSCALE_RELEASE_COMPONENT: '灰度组件',
  GRAYSCALE_RELEASE_VERSION_TCAP: '灰度版本',
  GRAYSCALE_RELEASE_VERSION_NUMBER: '灰度版本号',
  VERSION_COMPARISON: '版本对比',
  STRATEGY_CONFIGURATIONS_TCAP: '策略配置',

  CREATE_JOB: '发布任务',

  RULE_DESCRIPTION: '规则描述',
  TRAFFIC_DISTRIBUTION: '流量分配',

  'Version Off': '版本下线',
  'Take Over': '接管所有流量',

  'Edit Grayscale Release Job': '编辑灰度任务',

  SELECT_GRAY_COMPONENT_TIP: '请选择一个服务。',

  EXACT_MATCH: '完全匹配',
  REGEX_MATCH: '正则匹配',
  PREFIX_MATCH: '前缀匹配',

  TRAFFIC_CONTROL: '流量控制',
  REQUEST_PARAMETERS_DESC: '将符合以下规则的流量引入灰度版本。',

  COOKIE_EXACT_MATCH: 'Cookie（完全匹配）',
  COOKIE_REGEX_MATCH: 'Cookie（正则匹配）',
  HEADER_EXACT_MATCH: 'Header（完全匹配）',
  HEADER_REGEX_MATCH: 'Header（正则匹配）',
  URL_PREFIX_MATCH: 'URL（前缀匹配）',
  URL_EXACT_MATCH: 'URL（正则匹配）',
  'Operating System': '操作系统',
  HEADER: 'Header',
  'Mirrored traffic is only receiving traffic, no service':
    '镜像流量只负责接收流量，不提供服务',
  'The current version is not online, you can let this version take over all traffic and bring it online.':
    '当前版本未上线，您可以让该版本接管所有流量，使该版本上线',
  MIRRORED_TRAFFIC: '镜像流量',

  'version number is invalid': '版本号不可用。',

  'Not online': '未上线',

  DELETE_JOB: '删除任务',

  JOB_OFFLINE_SUCCESSFULLY: '任务下线成功。',

  REAL_TIME_TRAFFIC_DIST_TCAP: '实时流量分布',
  TRAFFIC_MIRRORING_TRAFFIC_DISTRI_DESC: '将流量的副本发送给新版本进行测试。',
  BLUE_GREEN_TRAFFIC_DISTRI_DESC: '新版本或旧版本接收全部流量。',
  ALLOCATE_TRAFFIC_DESC:
    '拖动滑块设置发送给新版本的流量比例和发送给旧版本的流量比例。',

  SERVICE_VERSION_RECEIVE_ALL_TRAFFIC: '版本 <b>{version}</b> 已接管所有流量。',

  TRAFFIC_MONITORING: '流量监控',
  TRAFFIC: '流量',
  SUCCESSFUL_REQUEST_RATE: '请求成功率',

  TRAFFIC_IN_LAST_FIVE_MINUTES: '最近五分钟的流量。',

  UNFINISHED_GRAY_JOB: '灰度发布进行中',
  UNSUPPORTED_WORKLOAD_TYPE: '不支持该工作负载类型',
  NO_WORKLOAD_FOUND_TIP: '未找到工作负载',

  CREATE_GRAYSCALE_RELEASE_JOB: '创建灰度发布任务',

  REQUEST_PARAMETERS: '请求参数',

  CLIENT_OS: '客户端操作系统',
  OS: '操作系统',

  NEW_VERSION_NUMBER_EMPTY_DESC: '请输入新版本号。',

  RESTORE: '恢复',

  BLUE_GREEN_STRATEGY_DESC: '选择一个版本接管所有业务流量。',
  SELECT_VERSION: '选择版本',
  TAKE_OFFLINE: '下线',
  TAKE_OVER: '接管',
  TAKE_ONLINE: '上线',
  SPECIFY_TRAFFIC_DISTRIBUTION: '指定流量分配',
  SPECIFY_REQUEST_PARAMETERS: '指定请求参数',

  'Deploy sample application': '部署示例应用',
  DEPLOY_SAMPLE_APP: '部署示例应用',
  POLICY_REQUEST_CONTENT_TIP:
    '指定请求参数功能仅支持 HTTP、HTTP2 和 gRPC 请求。',

  NO_SERVICE_MESH_TIP: '该应用未开启应用治理，无法使用灰度发布功能。',

  BLUE_GREEN_DEPLOYMENT_DESC:
    '将业务流量发送给新版本进行测试。如果新版本运行不正常，可立即将业务流量切换给旧版本。',
  CANARY_RELEASE_DESC:
    '将业务流量同时分配给新版本和旧版本，在测试新版本的同时保证业务连续性。',
  AB_TESTING_DESC:
    '当产品已经相对稳定，同时又有新的业务需求或者产品形态，在保证业务的稳定运行前提下，获取产品更新或者优化是否达到合理的预期。',
  TRAFFIC_MIRRORING_DESC:
    '将业务流量的副本发送给新版本进行测试，而不实际暴露新版本。',
  GRAY_RELEASE_VERSION_DESC: '将新版本引入已有的应用服务网格中',
  NEW_VERSION_NUMBER_INVALID_DESC:
    '新版本号无效。新版本号只能包含小写字母和数字, 最长 16 个字符。',
  NEW_VERSION_NUMBER_DESC: '新版本号只能包含小写字母和数字, 最长 16 个字符。',
  POLICY_CONFIG_DESC:
    '基于流量比例发布：根据流量比例配置规则，将从原版本中切分指定比例的流量到灰度版本。',

  MIRROR_POLICY_DESC:
    '流量镜像将生产环境的流量复制到灰度版本中，在新版本上线到真实环境之前使用实时用户流量对它进行测试。</br>因此，流量镜像可以降低直接在生产环境进行变更所带来的风险。',

  DELETE_GRAYSCALE_RELEASE_JOB_DESC:
    '删除灰度发布任务前，请选择一个版本接管所有流量。',
  NEW_VERSION_TAKEOVER_DESC:
    '新版本 <b>{newVersion}</b> 正在接收所有流量。如果您删除当前灰度发布任务，旧版本 <b>{oldVersion}</b> 也将被删除。',
  OLD_VERSION_TAKEOVER_DESC:
    '旧版本 <b>{oldVersion}</b> 已接管所有流量。如果您删除当前灰度发布任务，新版本 <b>{newVersion}</b> 也将被删除。',
  GRAYSCALE_RELEASE_DESC:
    '灰度发布是在生产环境进行应用迭代的一种重要方式。您可以选择不同的发布方法，在应用升级至新版本的过程中实现平滑过渡。',
  SPECIFY_REQUEST_PARAMETERS_DESC: '满足以下条件的请求将被发送给新版本。',

  ADJUST_TRAFFIC_DISTRIBUTION_DESC:
    '您确定将 {ratioNew}% 的流量发送给新版本 <b>{newVersion}</b> 以及 {ratioOld}% 的流量发送给旧版本 <b>{oldVersion}</b> 吗？',
  CANARY_BY_TRAFFIC_DESC:
    '{ratio}% 前往服务 <b>{component}</b> 的流量将被发送给新版本 <b>{newVersion}</b>。',

  DEPLOY_APP_CONFIRM: '确认部署示例应用?',

  DEPLOY_APP_TIP: '您即将部署示例应用 {name}',

  DEPLOY_SAMPLE_NO_INTERNET_ACCESS_TIP:
    '当前项目中没有找到已开启应用治理的网关，因此您无法部署示例应用。请联系您的项目管理员在【高级设置】中设置外网访问方式',

  PREREQUEST_FOR_USE_GRAYRELEASE_Q: '使用灰度发布功能有哪些前提条件？',
  PREREQUEST_FOR_USE_GRAYRELEASE_A:
    '使用灰度发布功能前，您需要创建自制应用并且为自制应用开启应用治理功能。',

  // Grayscale release detail page
  GRAY_COMPONENT_DESC: '测试中的新版本和旧版本的相关信息。',
  TRAFFIC_LOW: '流量',
  VERSION_TRAFFIC_PERCENT: '{version} 流量 {percent}%',

  // Grayscale release components tab
  GRAY_APP_NAME: '应用：{name}',
  GRAY_WORKLOAD_TYPE: '负载类型：',

  // Grayscale release version tab
  NEW_VERSION_NUMBER_EXIST_DESC: '工作负载 {name} 已经存在，请输入其他版本号。',
  INIT_CONTAINER: '初始化容器',
  INIT_CONTAINER_VALUE: '初始化容器：{value}',
  CONTAINER_VALUE: '容器：{value}',
  GRAYSCALE_IMAGE: '镜像：{image}',

  // Grayscale strategy configurations tab
  GRAYSCALE_VERSION: '版本：{version}',
  GRAYSCALE_REPLICA_SI: '副本数量：{count}',
  GRAYSCALE_REPLICA_PL: '副本数量：{count}',

  // Canary Strategy Tab
  COOKIE: 'Cookie',

  // Grayscale Release Job List
  GRAYSCALE_JOB_STRATEGY: '灰度策略',
  GRAYSCALE_JOB_COMPONENT: '灰度组件',
}
