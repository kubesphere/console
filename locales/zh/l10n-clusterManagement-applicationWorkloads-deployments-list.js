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
  APPLICATION_WORKLOAD_PL: '应用负载',
  WORKLOAD_PL: '工作负载',
  // List
  DEPLOYMENTS: '部署',
  UPDATE_TIME_TCAP: '更新时间',
  ALL_PROJECTS: '全部项目',
  SHOW_NUM: '每页显示：{num}',
  // List > Create > Basic Information
  SELECT_PROJECT_DESC: '选择将要创建资源的项目。',
  PROJECT_NOT_SELECT_DESC: '请选择一个项目。',
  BASIC_INFORMATION: '基本信息',
  NAME: '名称',
  FEDPROJECT_RESOURCE_TIP: '无法在集群管理内创建多集群项目的资源, 请到多集群项目页面内进行操作。',
  FINISHED: '已设置',
  NOT_SET: '未设置',
  CURRENT: '当前',
  PROJECT: '项目',
  // List > Create > Pod Settings
  PREVIOUS: '上一步',
  NOTE: '备注',
  // List > Create > Pod Settings > Add Container > Container Settings
  IMAGE: '镜像',
  IMAGE_VALUE: '镜像：{value}',
  // List > Create > Pod Settings > Add Container > Health Check > Readiness Check > TCP Port
  PORT_NUMBER_EMPTY: '请输入端口号。',
  USER: '用户',
  // List > Create > Storage Settings
  VOLUME_NAME_EXIST: '卷名称已存在。',
  SELECT_TYPE: '选择{type}',
  SPECIFY_SUBPATH: '指定子路径',
  SPECIFY_SUBPATH_TIP: '指定需要挂载到容器的卷子路径。',
  MOUNT_PATH: '挂载路径',
  MOUNT_PATH_NOT_SPECIFIED: '请选择需要挂载的键和键的挂载路径。',
  MOUNT_PATH_EMPTY: '请输入挂载路径。',
  MOUNT_PATH_REPEATED: '挂载路径重复。',
  // List > Create > Advanced Settings
  NETWORK_SEGMENT_SCAP: '网段',
  AVAILABLE_ADDRESSES: '可用地址数量',
  POD_IP_POOL: '容器组 IP 池',
  SUBPATH: '子路径',
  // List > Create > Advanced Settings > Add Metadata
  ANNOTATION_PL: '注解',
  CREATE_SUCCESSFUL: '创建成功。',
  // List > Edit Information
  // List > Edit YAML
  // List > Re-create
  // List > Delete
  // List > Stop
  STOP: '停止',
  STOP_TITLE_SI: '停止{type}',
  STOP_TITLE_PL: '批量停止{type}',
  STOP_DESC: '您确定停止该资源吗？'
};