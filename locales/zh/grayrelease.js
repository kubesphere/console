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

  GRAY_RELEASE_CATEGORIES: '灰度策略',
  GRAY_RELEASE_STRATEGY_SI: '灰度策略',
  TOTAL_GRAY_RELEASE_JOB: '共计 {num} 个灰度任务',
  TOTAL_GRAY_RELEASE_JOBS: '共计 {num} 个灰度任务',
  NO_GRAY_RELEASE_JOBS_TIP: '没有找到灰度发布任务',
  NO_GRAY_RELEASE_JOBS_TIP_2: '请创建一个灰度发布任务。',

  BLUE_GREEN_DEPLOYMENT: '蓝绿部署',
  CANARY_RELEASE: '金丝雀发布',
  'A/B Testing': 'A/B 测试',
  TRAFFIC_MIRRORING: '流量镜像',

  traffic: '流量',

  GRAY_RELEASE_JOB_NAME: '灰度任务名称',
  GRAYSCALE_RELEASE_COMPONENT_PL: '灰度组件',
  GRAYSCALE_RELEASE_COMPONENT: '灰度组件',
  GRAYSCALE_RELEASE_VERSION_TCAP: '灰度版本',
  GRAYSCALE_RELEASE_VERSION_NUMBER: '灰度版本号',
  VERSION_COMPARISON: '版本对比',
  STRATEGY_CONFIGURATIONS_TCAP: '策略配置',

  CREATE_JOB: '发布任务',

  RULE_DESCRIPTION: '规则描述',
  TRAFFIC_RATIO: '流量比例',

  'Version Off': '版本下线',
  'Take Over': '接管所有流量',

  'Edit Grayscale Release Job': '编辑灰度任务',

  SELECT_GRAY_COMPONENT_TIP: '请选择一个灰度组件。',

  EXACT_MATCH: '完全匹配',
  REGEX_MATCH: '正则匹配',
  PREFIX_MATCH: '前缀匹配',

  TRAFFIC_CONTROL: '流量控制',
  TRAFFIC_CONTROL_DESC: '将符合以下规则的流量引入灰度版本。',

  'Cookie Content': 'Cookie 内容',
  'Operating System': '操作系统',
  CUSTOM_HEADER: '自定义 Header',
  'Mirrored traffic is only receiving traffic, no service':
    '镜像流量只负责接收流量，不提供服务',
  'The current version is not online, you can let this version take over all traffic and bring it online.':
    '当前版本未上线，您可以让该版本接管所有流量，使该版本上线',
  'Mirrored traffic': '镜像流量',

  'version number is invalid': '版本号不可用。',

  'Not online': '未上线',

  JOB_OFFLINE: '任务下线',

  JOB_OFFLINE_SUCCESSFULLY: '任务下线成功。',

  REAL_TIME_TRAFFIC_DIST_TCAP: '实时流量分布',
  REAL_TIME_TRAFFIC_RATIO: '流量实时配比。',
  ALLOCATE_TRAFFIC_DESC: '将所有流量按比例分配给灰度组件。',

  'Has taken over all traffic': '已接管全部流量',

  TRAFFIC_MONITORING: '流量监控',
  REQUEST_SUCCESS_RATE: '请求成功率',
  REQUEST_LATENCY: '请求延迟',

  TRAFFIC_IN_LAST_FIVE_MINUTES: '最近五分钟流量。',

  UNFINISHED_GRAY_JOB: '存在未完成的灰度任务',
  UNSUPPORTED_WORKLOAD_TYPE: '不支持该工作负载类型',
  NO_WORKLOAD_FOUND_TIP: '未找到工作负载',

  CREATE_GRAYSCALE_RELEASE_JOB: '创建灰度任务',

  GRAYSCALE_ACCESS_RULE: '灰度版本访问规则',

  TRAFFIC_OS: '流量来自于以下操作系统',

  GRAY_VERSION_TIP: '请输入灰度版本号。',

  Recover: '恢复',

  TWO_VERSIONS: '两个版本。',
  TRAFFIC_RULES: '流量规则',
  VERSION_OFFLINE: '下线此版本',
  TAKE_OVER_ALL_TRAFFIC: '接管所有流量',
  FORWARD_BY_TRAFFIC_RATIO: '按流量比例下发',
  FORWARD_BY_REQUEST_CONTENT: '按请求内容下发',

  'Deploy sample application': '部署示例应用',
  DEPLOY_SAMPLE_APP: '部署示例应用',
  POLICY_REQUEST_CONTENT_TIP:
    '如果端口协议非 HTTP、HTTP2 或 gRPC，则按请求内容下发不可用。',

  NO_SERVICE_MESH_TIP: '未开启应用治理的应用无法使用灰度发布。',

  BLUE_GREEN_DEPLOYMENT_DESC:
    '蓝绿部署在保留旧版本的同时部署新版本，确保零宕机。两个版本中总有一个版本处于在线状态接收所有流量，另一个版本则保持待机，如果有问题，可以快速回滚至旧版本。',
  CANARY_RELEASES_DESC:
    '金丝雀发布将一部分实际流量引入一个新版本进行测试，测试新版本的性能和表现，在保证系统整体稳定运行的前提下，尽早发现新版本在实际环境上的问题。',
  AB_TESTING_DESC:
    '当产品已经相对稳定，同时又有新的业务需求或者产品形态，在保证业务的稳定运行前提下，获取产品更新或者优化是否达到合理的预期。',
  TRAFFIC_MIRROR_DESC:
    '流量镜像用来更为真实地测试新版本，提前发现问题，同时不对生产环境产生影响，从而提高版本发布的安全性与可靠性。',
  GRAY_RELEASE_VERSION_DESC: '将新版本引入已有的应用服务网格中',
  GRAY_RELEASE_VERSION_FORMAT_DESC: '只能包含小写字母及数字, 长度在16个字符内',
  POLICY_CONFIG_DESC:
    '基于流量比例发布：根据流量比例配置规则，将从原版本中切分指定比例的流量到灰度版本。',

  MIRROR_POLICY_DESC:
    '流量镜像将生产环境的流量复制到灰度版本中，在新版本上线到真实环境之前使用实时用户流量对它进行测试。</br>因此，流量镜像可以降低直接在生产环境进行变更所带来的风险。',

  JOB_OFFLINE_WARNING:
    '您需要选择一个下线版本，系统会保留一个可用版本并且自动将流量全部切换至该可用版本，保证服务正常运行。',
  JOB_OFFLINE_INFO: '现在可下线任务, 版本 {version} 将被移除。',

  GRAY_RELEASE_DESC:
    '灰度发布是在生产环境进行应用迭代的一种重要方式。您可以选择不同的发布方法，在应用升级至新版本的过程中实现平滑过渡。',
  GRAYSCALE_RELEASE_DESC:
    '灰度发布是在生产环境进行应用迭代的一种重要方式。您可以选择不同的发布方法，在应用升级至新版本的过程中实现平滑过渡。',

  GRAY_RELEASE_BY_CONTENT_TIP:
    '根据请求内容配置规则，只有请求内容中满足特定条件的流量会切分到灰度版本上。该策略只对直接访问入口服务有效。',

  RATIO_MODIFY_NOTIFY_CONTENT:
    '您已将 {version} 版本的目标流量配比调整至 {ratio}%，您可以继续调整目标流量配比，或者使它立即生效。',
  CANARY_BY_TRAFFIC_DESC:
    '根据流量比例，对组件 {component} 的 {ratio}% 的请求流量会转发到灰度版本 {newVersion}。',

  DEPLOY_APP_CONFIRM: '确认部署示例应用?',

  DEPLOY_APP_TIP: '您即将部署示例应用 {name}',

  DEPLOY_SAMPLE_NO_INTERNET_ACCESS_TIP:
    '当前项目中没有找到已开启应用治理的网关，因此您无法部署示例应用。请联系您的项目管理员在【高级设置】中设置外网访问方式',

  PREREQUEST_FOR_USE_GRAYRELEASE_Q: '使用灰度发布的前提条件?',
  PREREQUEST_FOR_USE_GRAYRELEASE_A:
    '使用灰度发布功能前，您需要创建自制应用并且开启应用治理功能。',

  // Grayscale release detail page
  GRAY_COMPONENT_DESC: '用于接管流量的灰度组件。',
  TRAFFIC_LOW: '流量',

  // Grayscale release components tab
  GRAY_APP_NAME: '应用：{name}',
  GRAY_WORKLOAD_TYPE: '负载类型：',

  // Grayscale release version tab
  GRAY_DEPLOY_VERSION_TIP: '部署 {name} 已存在，版本号不可用。',
  INIT_CONTAINER: 'Init 容器',
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
