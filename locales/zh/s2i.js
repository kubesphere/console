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
  CODE_REPOSITORY_URL: '代码仓库 URL',
  'New Tag': '新标签',
  IMAGE_NAME_BUILDING: '镜像：{name}/构建中',
  IMAGE_NAME_FAILED: '镜像：{name}/失败',
  IMAGE_NAME_SUCCESSFUL: '镜像：{name}/成功',
  'Release Time': '发布时间',
  SORT_BY: '以{ name }排序',
  creationTimestamp: '结束时间',
  'Environment Params': '环境变量参数',
  'is Failed': '构建失败',
  'Add Environment Variables': '添加环境参数',
  CONTAINER_SETTINGS: '容器设置',
  NEW_TAG_DESC: '输入重新构建镜像的标签',
  S2I_RELATIVE_PATH_DESC:
    '源代码仓库地址（目前支持 git）并且可以指定代码分支及在源代码终端的相对路径',
  CODE_RELATIVE_PATH_DESC: '设置代码在代码仓库中的相对路径。默认值为 /。',
  'building logs': '构建日志',
  'Building Log': '构建日志',
  'Building Image': '构建镜像',
  sourceUrl: '源地址',
  SourceUrl: '源地址',
  builderImage: '镜像模板',
  IMAGE_ARTIFACTS: '镜像制品',
  'Code Resource': '代码源',
  Builder: '构建',
  BuilderImage: '编译模板',
  IMAGE_NAME: '镜像名称',
  IMAGE_NAME_SCAP: '镜像名称',
  IMAGE_NAME_EMPTY_DESC: '请输入镜像名称。',
  IMAGE_TAG_EMPTY_DESC: '请输入镜像标签。',
  TARGET_IMAGE_REPOSITORY_EMPTY_DESC: '请设置目标镜像仓库。',
  IMAGE_TAG: '镜像标签',
  BuilderPullPolicy: '镜像拉取策略',
  builderPullPolicy: '镜像拉取策略',
  JOB_RECORDS: '任务记录',
  'Source to image jobs': 'S2I 任务',
  S2IJobs: 'S2I 任务',
  'Repo url': '仓库地址',
  'builder name': '编译名称',
  Building: '正在构建',
  'Image Building': '正在构建镜像',
  'Rebuild Image': '重新构建镜像',
  'New Image Tag': '新镜像 Tag',
  'Repo URL': '仓库地址',
  IMAGE_FROM_S2I: '通过代码构建镜像',
  IMAGE_FROM_B2I: '通过制品构建镜像',
  S2I_DESC: '选择代码的开发语言。',
  B2I_DESC: '选择制品的文件类型。',
  PORT_SETTINGS_DESC: '设置用于访问容器的端口。',
  CONTAINER_SETTINGS_DESC: '设置容器的镜像、名称、类型和计算资源。',
  HEALTH_CHECKER_DESC: '添加探针以定时检查容器健康状态。',
  STARTUP_COMMAND: '启动命令',
  STARTUP_COMMAND_DESC:
    '自定义容器启动时运行的命令。默认情况下，容器启动时将运行镜像默认命令。',
  'Run Command': '运行命令',
  CONTAINER_COMMAND_DESC: '容器的启动命令。',
  CONTAINER_ARGUMENT_DESC:
    '容器启动命令的参数。如有多个参数请使用半角逗号（,）分隔。',
  PROBE_COMMAND_DESC: '使用半角逗号（,）分隔多条命令。',
  CONTAINER_ENVIRONMENT_DESC: '为容器添加添加环境变量。',
  IMAGE_PULL_POLICY_DESC: '在默认情况下，优先使用本地镜像',
  S2I_ENVIRONMENT_DESC:
    '添加环境变量以控制镜像运行时的行为。<a href={link} target="_blank">了解更多</a>',
  S2I_UPDATE_WORKLOAD: '构建成功后更新工作负载',
  S2I_UPDATA_WORKLOAD_DESC:
    '重新构建镜像成功后，将更新相关工作负载的镜像，工作负载版本也会一同更新。',
  'No Log Records': '无日志记录',
  CODE_REPOSITORY_KEY_DESC:
    '如果使用私有代码仓库，请选择包含代码仓库密钥的保密字典。',
  CODE_REPOSITORY_URL_DESC: '输入代码仓库的地址。目前仅支持 Git 仓库。',
  CODE_RELATIVE_PATH: '代码相对路径',
  S2I_BUILDERNAME_DESC:
    '选择编辑环境，您也可以查看对应的 <a href={link} target="_blank">编译模板</a>',
  S2I_TARGET_IMAGE_REPOSITORY_DESC:
    '选择一个镜像仓库用于存放即将创建的镜像。如果没有可用的镜像仓库，您需要先创建镜像仓库保密字典。<a href={link} target="_blank">了解更多</a>',
  S2I_IMAGE_NAME_DESC:
    '名称只能包含小写字母、数字、连字符（-）、句点（.）、斜钱（/）和冒号（:），并以小写字母或数字开头和结尾。',
  TARGET_IMAGE_REPOSITORY: '目标镜像仓库',
  'Rebuilt successfully; the image status will be refreshed soon.':
    '重建成功，镜像状态稍后将会更新',
  'Image building failed': '构建镜像失败',
  'Image building succeeded': '构建镜像成功',
  RevisionId: '修订版本号',
  'Image Builder': '镜像构建器',
  IMAGE_BUILDER: '镜像构建器',
  BUILDER_IMAGE: '构建器镜像',
  BUILDER_IMAGE_SCAP: '构建器镜像',
  PULL_POLICY: '拉取策略',
  SOURCE_URL: '源 URL',
  REMOTE_TRIGGER: '远程触发器',
  IMAGE_BUILDER_LOW: '镜像构建器',
  LAST_BUILD_ENVIRONMENT: '最后构建环境',
  'Build Times': '构建次数',
  ImageName: '镜像名称',
  StartTime: '开始时间',
  s2i: '代码构建镜像',
  b2i: '制品构建镜像',
  LOADING_DOTS: '加载中...',
  LOG_MODULE_NOT_INSTALLED: '日志模块未安装。',
  BUILD_ENVIRONMENT: '构建环境',
  FILE_UPLOADED_TIP: '上传文件成功。',
  'Upload Percent': '上传进度',
  FILE_SIZE_VALUE: '文件大小：{value}',
  DOWNLOAD_ARTIFACT: '下载制品',
  'File Uploaded Successfully': '上传文件成功',
  'Download Artifact': '下载制品',
  IMAGE_BUILDER_PL: '镜像构建器',
  'Artifact Type': '制品类型',
  IMAGE_BUILDER_DESC:
    '镜像构建器（Image Builder）是将代码或者制品制作成容器镜像的工具。您可以通过简单的设置将制品或代码直接制作成容器镜像。',
  PULL_COMMAND: '拉取命令',
  PULL_COMMAND_SCAP: '拉取命令',
  IMAGE_SIZE_SCAP: '镜像大小',
  'Published Time': '发布时间',
  UPLOAD_ARTIFACT_TIP: '请上传一个制品。',
  UPLOAD_FAILED: '上传失败。',
  binary: '二进制文件',
  BUILD_IMAGE_FOR_SERVICE: '为 {service} 服务构建镜像。',
  CLICK_UPLOAD_ARTIFACT: '点击上传制品文件',
  UPLOAD_ARTIFACT: '上传制品',
  BUILD_MODE: '构建模式',
  IMAGE_BUILDER_EMPTY_DESC: '请创建一个镜像构建器。',
  S2I_NO_SECRET: '当前代码仓库不需要密钥。',
  'Authentication required': '需要认证信息，请选择秘钥。',
  'Repo reading failed': '读取仓库失败',
  WRONG_FILE_EXTENSION_NAME: '选择的文件类型不匹配，请选择 {type} 类型。',
  SECRET_CODE: '触发令牌',
  SECRET_CODE_RULE_DESC: '只能包含大小写字母、数字。',
  ARTIFACT_FILE_EMPTY_DESC: '请上传一个制品文件。',
  'Upload file failed': '文件上传失败',
  'Build image for service x': '为 {service} 服务构建镜像',
  UPLOAD_ARTIFACT_FILE: '上传制品文件',
  ARTIFACT_FILE: '制品文件',
  B2I_DEFAULT_DESC: '上传一个制品文件。',
  JAR_DESC: '上传一个 JAR 格式的制品文件。',
  WAR_DESC: '上传一个 WAR 格式的制品文件。',
  BINARY_DESC: '',
  CODE_REPOSITORY_KEY_NOT_REQUIRED: '当前代码仓库不需要密钥。',
  'Repository Not Found': '没有找到代码仓库。',
  'Currently only supports git repo': '当前仅支持 Git 仓库。',
  'exec: "git": executable file not found in $PATH':
    '没有找到 URL 对应的代码仓库。',
  TRIGGER_TOKEN: '触发令牌',
  TRIGGER_TOKEN_DESC:
    '设置客户端通过 Webhook 触发 KubeSphere 镜像构建时所使用的认证令牌。令牌只能包含大写字母、小写字母和数字。',
  INVALID_TRIGGER_TOKEN_DESC:
    '令牌无效。令牌只能包含大写字母、小写字母和数字。',
  'Remote Trigger Link': '远程触发链接',

  // Image Builder List Page

  // Creation Page
  UPLOAD_PERCENT: '已上传：{percent}%',
  UPLOAD_FULLY: '已上传：100%',
  FILE_SIZE: '文件大小：{size}',
  S2I_SECRET: '密钥',
}
