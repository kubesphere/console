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
  'Grayscale Release': '灰度发布',
  'Job Status': '任务状态',

  GRAY_RELEASE_CATEGORIES: '灰度策略',
  TOTAL_GRAY_RELEASE_JOBS: '共计 {num} 个灰度任务',
  NO_GRAY_RELEASE_JOBS_TIP: '暂时没有进行中的灰度任务',
  NO_GRAY_RELEASE_JOBS_TIP_2: '您可以绑定灰度策略进行灰度任务发布',

  'Blue-green Deployment': '蓝绿部署',
  'Canary Release': '金丝雀发布',
  'A/B Testing': 'A/B 测试',
  'Traffic Mirroring': '流量镜像',

  traffic: '流量',

  'Release Job Name': '发布任务名称',
  'Grayscale Release Components': '灰度组件',
  'Grayscale Release Component': '灰度组件',
  'Grayscale Release Version': '灰度版本',
  'Grayscale Release Version Number': '灰度版本号',
  'Grayscale Release Strategy': '灰度策略',
  'Version Comparison': '版本对比',
  'Policy Config': '策略配置',

  'Create Job': '发布任务',

  'Rule Description': '规则描述',
  'Traffic Ratio': '流量比例',

  'Version Off': '版本下线',
  'Take Over': '接管所有流量',

  'Edit Grayscale Release Job': '编辑灰度任务',

  'Please select a grayscale release component': '请选择一个灰度组件',

  'Exact Match': '完全匹配',
  'Regex Match': '正则匹配',
  'Prefix Match': '前缀匹配',

  'Traffic Control': '流量控制',
  'Introduce traffic that meets the following rules into grayscale version':
    '将符合以下规则的流量引入灰度版本',

  'Cookie Content': 'Cookie 内容',
  'Operating System': '操作系统',
  'Custom Header': '自定义 Header',
  'Mirrored traffic is only receiving traffic, no service':
    '镜像流量只负责接收流量，不提供服务',
  'The current version is not online, you can let this version take over all traffic and bring it online.':
    '当前版本未上线，您可以让该版本接管所有流量，使该版本上线',
  'Mirrored traffic': '镜像流量',

  'version number is invalid': '版本号不可用',

  'Not online': '未上线',

  'Job offline': '任务下线',

  'Job offline Successfully': '任务下线成功',

  'Real-time traffic distribution': '实时流量分布',
  'Real-time traffic ratio': '流量实时占比',
  'Allocate all traffic proportionally to grayscale release components':
    '将所有的流量按比例分配给灰度组件',

  'Has taken over all traffic': '已接管全部流量',

  'Traffic monitor': '流量监控',
  'Request success rate': '请求成功率',
  'Request duration': '请求延迟',

  'Traffic of last five minutes': '最近五分钟流量',

  'Unfinished grayscale release jobs exist': ' 存在未完成的灰度任务',
  'Unsupported workload type': '不支持该工作负载类型',
  'No workload found': '未找到工作负载',

  'Create Grayscale Release Job': '发布灰度任务',

  'Grayscale release version access rule': '灰度版本访问规则',

  'Traffic comes from the following operating systems':
    '流量来自于以下操作系统',

  'Please input grayscale release version': '请输入灰度版本号',

  Recover: '恢复',

  'Two Versions': '两个版本',
  'Traffic Rules': '流量规则',
  'Version offline': '下线此版本',
  'Take over all traffic': '接管所有流量',
  'Forward by traffic ratio': '按流量比例下发',
  'Forward by request content': '按请求内容下发',

  'Deploy sample application': '部署示例应用',
  'Deploy Sample App': '部署示例应用',
  POLICY_REQUEST_CONTENT_TIP:
    '端口协议非 HTTP, HTTP2 或 gRPC, 不能发布按内容分配的策略',

  NO_SERVICE_MESH_TIP: '未开启应用治理的应用无法使用灰度发布',

  BLUE_GREEN_DEPLOYMENT_DESC:
    '蓝绿发布提供了一种零宕机的部署方式，在<strong>保留旧版本的同时部署新版本</strong>。两个版本中总有一个版本处于在线状态接收所有流量，另一个版本则保持待机，如果有问题可以快速处理。',
  CANARY_RELEASES_DESC:
    '将一部分实际流量引入一个新版本进行测试，测试新版本的性能和表现，在保证系统整体稳定运行的前提下，尽早发现新版本在实际环境上的问题。',
  AB_TESTING_DESC:
    '当产品已经相对稳定，同时又有新的业务需求或者产品形态，在保证业务的稳定运行前提下，获取产品更新或者优化是否达到合理的预期。',
  TRAFFIC_MIRROR_DESC:
    '流量镜像用来更为真实地测试新版本，提前发现问题，同时不对生产环境产生影响，从而，提高版本发布的安全性可靠性。',
  GRAY_RELEASE_VERSION_DESC: '将新版本引入已有的应用服务网格中',
  GRAY_RELEASE_VERSION_FORMAT_DESC: '只能包含小写字母及数字, 长度在16个字符内',
  POLICY_CONFIG_DESC:
    '基于流量比例发布：根据流量比例配置规则，将从原版本中切分指定比例的流量到灰度版本。',

  MIRROR_POLICY_DESC:
    '微服务让我们可以更快地实现交付。在追求快速的同时保证业务的稳定性。流量镜像可以降低变更所带来的风险，并且同时让生产环境上的新变化变得更为安全。</br>流量镜像将生产环境的流量复制灰度版本中，在真正负载实时流量（也就是客户流量）之前验证新版本是不是没有问题',

  JOB_OFFLINE_WARNING:
    '为了保证服务的正常运行，任务下线需要将需要保留一个可用版本并且将流量全部切换至该版本。我们需要您选择一个需要下线的版本。系统会自动将全部流量切换至该另外的可用版本。',
  JOB_OFFLINE_INFO: '现在可下线任务, 版本 {version} 将被移除。',

  GRAY_RELEASE_DESC:
    '灰度发布是迭代的软件产品在生产环境安全上线的一种重要手段，提供软件版本部署升级平滑过渡的一种发布方式。',
  GRAYSCALE_RELEASE_DESC:
    '灰度发布是迭代的软件产品在生产环境安全上线的一种重要手段，提供软件版本部署升级平滑过渡的一种发布方式。',

  GRAY_RELEASE_BY_CONTENT_TIP:
    '基于请求内容发布：根据请求内容配置规则，只有请求内容中满足特定条件的流量会切分到灰度版本上。该策略只对直接访问的入口服务有效。',

  RATIO_MODIFY_NOTIFY_CONTENT:
    '您已将{version}版本的目标流量配比调整至 {ratio}%  , 您也可以继续调整目标流量配比，或者使它立即生效。',
  CANARY_BY_TRAFFIC_DESC:
    '根据基于流量比例规则，对组件 {component} 的访问满足 {ratio}% 的请求流量会转发到灰度版本 {newVersion}',

  DEPLOY_APP_CONFIRM: '确认部署示例应用?',

  DEPLOY_APP_TIP: '您即将部署示例应用 {name}',

  DEPLOY_SAMPLE_NO_INTERNET_ACCESS_TIP:
    '当前项目中没有找到已开启应用治理的网关，因此您无法部署示例应用。请联系您的项目管理员在【高级设置】中设置外网访问方式',

  PREREQUEST_FOR_USE_GRAYRELEASE_Q: '使用灰度发布的前提条件?',
  PREREQUEST_FOR_USE_GRAYRELEASE_A:
    '使用灰度发布功能您需要创建自定义应用，并且将需要灰度发布的服务开启服务治理功能。',
}
