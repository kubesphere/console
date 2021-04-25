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
  'Code URL': '代码地址',
  'New Tag': '新标签',
  S2I_Building: '正在构建中',
  S2I_Failed: '构建失败',
  S2I_Successful: '构建成功',
  'Release Time': '发布时间',
  SORT_BY: '以{ name }排序',
  creationTimestamp: '结束时间',
  'Environment Params': '环境变量参数',
  'is Failed': '构建失败',
  'Add Environment Variables': '添加环境参数',
  'Container Settings': '容器设置',
  NEW_TAG_DESC: '输入重新构建镜像的标签',
  S2I_RELATIVE_PATH_DESC:
    '源代码仓库地址（目前支持 git）并且可以指定代码分支及在源代码终端的相对路径',
  'Specify a relative directory inside the application. (Default value /)':
    '可以指定代码编译的相对路径，默认为 /',
  'building logs': '构建日志',
  'Building Log': '构建日志',
  'Building Image': '构建镜像',
  sourceUrl: '源地址',
  SourceUrl: '源地址',
  builderImage: '镜像模板',
  'Image Artifacts': '镜像制品',
  'Code Resource': '代码源',
  Builder: '构建',
  BuilderImage: '编译模板',
  imageName: '镜像名称',
  BuilderPullPolicy: '镜像拉取策略',
  builderPullPolicy: '镜像拉取策略',
  'Job Records': '任务记录',
  'Source to image jobs': 'S2I 任务',
  S2IJobs: 'S2I 任务',
  'Repo url': '仓库地址',
  'builder name': '编译名称',
  Building: '正在构建',
  'Image Building': '正在构建镜像',
  'Rebuild Image': '重新构建镜像',
  'New Image Tag': '新镜像 Tag',
  'Repo URL': '仓库地址',
  IMAGE_FROM_S2I: '通过代码构建新的容器镜像',
  IMAGE_FROM_B2I: '通过制品构建新的镜像',
  S2I_DESC: '您可以选择您的代码开发语言，并将它们制作成镜像',
  B2I_DESC: '您可以将已有制品构建成新的镜像',
  'Please set the access policy for the container.': '设置容器的访问策略',
  'Please set the container name and computing resources.':
    '对容器的名称及容器的计算资源进行设置',
  'The health of the container will be checked regularly according to user needs.':
    '根据用户需要，定时检查容器健康状况。',
  'Start Command': '启动命令',
  START_COMMAND_DESC:
    '在默认情况下，镜像会运行默认命令，如果想运行特定命令或重写镜像默认值。',
  'Run Command': '运行命令',
  RUN_COMMAND_DESC:
    '容器的启动命令参数，默认使用打包时使用的启动命令, 如需多个请以 "," 分隔',
  CONTAINER_PARAMS_DESC: '容器的启动命令参数, 如需多个请以 "," 分隔',
  PROBE_COMMAND_DESC: '如需多个请以 "," 分隔',
  CONTAINER_ENVIROMENT_DESC: '添加容器的环境变量',
  IMAGE_PULL_POLICY_DESC: '在默认情况下，优先使用本地镜像',
  S2I_ENVIROMENT_DESC:
    '应用程序开发人员可以使用以下环境变量来配置此镜像的运行时行为；详细的配置说明请查看<a href={link} target="_blank">编译模板</a>',
  S2I_UPDATE_WORKLOAD: '构建成功后更新工作负载',
  S2I_UPDATA_WORKLOAD_DESC:
    '重新构建镜像成功后，将更新相关工作负载的镜像，同时工作负载版本也会被更新',
  'No Log Records': '无日志记录',
  S2I_SECRET_DESC: '如果是私有代码仓库，请选择代码仓库密钥',
  S2I_IMAGE_REPONSITRY_DESC:
    '源代码仓库地址(目前支持 git)并且可以指定代码分支及在源代码终端的相对路径',
  S2I_RELATIVE_PATH: '代码相对路径(可选):',
  S2I_BUILDERNAME_DESC:
    '选择编辑环境，您也可以查看对应的 <a href={link} target="_blank">编译模板</a>',
  S2I_TARGET_IMAGE_REPONSTRY_DESC:
    '需要选择一个有推送权限的镜像仓库存放镜像，如果没有可以<a href={link} target="_blank">新建镜像仓库密钥</a>',
  S2I_IMAGENAME_DESC: '镜像名称及 Tag，默认为代码仓库的项目名称',
  'Target Image Repository': '目标镜像仓库',
  'Rebuilt successfully; the image status will be refreshed soon.':
    '重建成功，镜像状态稍后将会更新',
  'Image building failed': '构建镜像失败',
  'Image building succeeded': '构建镜像成功',
  RevisionId: '修订版本号',
  'Image Builder': '镜像构建器',
  'Last build environment': '最后一次构建环境',
  'Build Times': '构建次数',
  ImageName: '镜像名称',
  StartTime: '开始时间',
  'Last Message': '最后消息',
  s2i: '代码构建镜像',
  b2i: '制品构建镜像',
  'Log is loading...': '日志正在加载',
  'The logging module is not installed.': '日志模块未安装',
  'Build Environment': '构建环境',
  'File Uploaded Successfully': '上传文件成功',
  'Upload Percent': '上传进度',
  'File Size': '文件大小',
  'Download Artifact': '下载制品',
  'Image Builders': '镜像构建器',
  'Artifact Type': '制品类型',
  IMAGE_BUILDER_DESC:
    '镜像构建器 (Image Builder) 是将代码或者制品容器化的工具，仅需要通过简单的设置即可将制品或代码直接生成容器镜像。',
  'Pull Command': '拉取命令',
  'Image Size': '镜像大小',
  'Published Time': '发布时间',
  'The file has not been uploaded.': '文件还未上传',
  'Upload file failed': '文件上传失败',
  binary: '二进制文件',
  'Build image for service x': '为 {service} 服务构建镜像',
  'Click to upload an artifact': '点击制品文件进行上传',
  'Upload Artifact': '上传制品',
  'Choose a Language': '选择语言',
  B2I_DEFAULT_DESC: '点击制品文件进行上传',
  JAR_DESC:
    'Jar 文件是一种软件包文件格式，通常用于聚合大量的 Java 类文件、相关的元数据和资源（文本、图片等）文件到一个文件',
  WAR_DESC:
    'War 文件是用于分发 Jar 文件，JavaServer Pages，Java Servlet，Java类，XML 文件，标记库，静态网页（HTML 和相关文件）以及共同构成 Web 应用程序的其他资源的集合的文件。',
  BINARY_DESC: '',
  IMAGE_BUILDER_CREATE_DESC:
    '镜像构建器 (Image Builder) 是将代码或者制品容器化的工具。仅需要通过简单的设置即可将制品和代码构建成服务。目前需配合服务创建一起使用。',
  'The current code repository does not require a key.':
    '当前代码仓库不需要秘钥',
  'Repository Not Found': '未找到代码仓库',
  'Currently only supports git repo': '当前仅支持 git 仓库',
  'Authentication required': '需要认证信息，请选择秘钥。',
  'Repo reading failed': '读取仓库失败',
  'exec: "git": executable file not found in $PATH': '当前 URL 未发现代码仓库',
  WRONG_FILE_EXTENSION_NAME: '选择的文件类型不符合，请选择 {type} 类型',
  'Secret Code': '触发令牌',
  SECRET_CODE_RULE_DESC: '只能包含大小写字母、数字',
  'Remote Trigger Link': '远程触发链接',
}
