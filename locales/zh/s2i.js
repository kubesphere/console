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
  PULL_COMMAND_SCAP: '拉取命令',
  'Add Environment Variables': '添加环境参数',
  'Artifact Type': '制品类型',
  'Authentication required': '需要认证信息，请选择秘钥。',
  b2i: '制品构建镜像',
  binary: '二进制文件',
  'Build Times': '构建次数',
  Builder: '构建',
  'builder name': '编译名称',
  builderImage: '镜像模板',
  BuilderImage: '编译模板',
  BuilderPullPolicy: '镜像拉取策略',
  builderPullPolicy: '镜像拉取策略',
  Building: '正在构建',
  'Building Image': '构建镜像',
  'Building Log': '构建日志',
  'building logs': '构建日志',
  CLICK_UPLOAD_ARTIFACT: '点击上传制品文件',
  'Code Resource': '代码源',
  CODE_URL: 'Code URL',
  creationTimestamp: '结束时间',
  'Currently only supports git repo': '当前仅支持 Git 仓库。',
  'Download Artifact': '下载制品',
  'Environment Params': '环境变量参数',
  'exec: "git": executable file not found in $PATH': '未发现 URL 对应的代码仓库。',
  'Image Builder': '镜像构建器',
  'Image Building': '正在构建镜像',
  'Image building failed': '构建镜像失败',
  'Image building succeeded': '构建镜像成功',
  ImageName: '镜像名称',
  'is Failed': '构建失败',
  'New Image Tag': '新镜像 Tag',
  'New Tag': '新标签',
  'No Log Records': '无日志记录',
  'Published Time': '发布时间',
  PULL_COMMAND: '拉取命令',
  'Rebuild Image': '重新构建镜像',
  'Rebuilt successfully; the image status will be refreshed soon.': '重建成功，镜像状态稍后将会更新',
  'Release Time': '发布时间',
  'Repo reading failed': '读取仓库失败',
  'Repo url': '仓库地址',
  'Repo URL': '仓库地址',
  'Repository Not Found': '未发现代码仓库。',
  RevisionId: '修订版本号',
  'Run Command': '运行命令',
  s2i: '代码构建镜像',
  S2IJobs: 'S2I 任务',
  'Source to image jobs': 'S2I 任务',
  sourceUrl: '源地址',
  SourceUrl: '源地址',
  S2I_RELATIVE_PATH_TIP: 'Specify a relative directory inside the application. (Default value /)',
  StartTime: '开始时间',
  S2I_NO_SECRET: '当前代码仓库不需要密钥。',
  UPLOAD_ARTIFACT_TIP: '请上传一个制品。',
  UPLOAD_ARTIFACT: '上传制品',
  'Upload file failed': '文件上传失败',
  'Upload Percent': '上传进度',
  SORT_BY: '以{ name }排序',
  S2I_RELATIVE_PATH_DESC: '源代码仓库地址（目前支持 git）并且可以指定代码分支及在源代码终端的相对路径',
  IMAGE_PULL_POLICY_DESC: '在默认情况下，优先使用本地镜像',
  S2I_UPDATE_WORKLOAD: '构建成功后更新工作负载',
  S2I_UPDATA_WORKLOAD_DESC: '重新构建镜像成功后，将更新相关工作负载的镜像，工作负载版本也会一同更新。',
  IMAGE_FROM_S2I_DESC: 'Get the code from the existing code repository and build the image by way of Source to Image. The process of building the image each time will be done as a job.',
  IMAGE_FROM_EXSIT: 'Select an existing image deployment container',
  IMAGE_FROM_EXSIT_DESC: 'Pull an image from a public or private image repository',
  S2I_SECRET_DESC: 'Select a secret if the code repository is a private repository.',
  S2I_IMAGE_REPONSITRY_DESC: 'The source code repository address (currently supports Git). You can specify the code branch and relative path in the source code terminal.',
  S2I_RELATIVE_PATH: 'Code Relative Path (Optional)',
  S2I_IMAGENAME_DESC: 'Image name and tag, which defaults to the project name of the code repository.',
  S2I_BUILDERNAME_DESC: '选择编辑环境，您也可以查看对应的 <a href={link} target="_blank">编译模板</a>',
  CONTAINERD_RUNTIME_NOT_SUPPORT: 'S2I 和 B2I 暂时不支持 containerd 容器运行时。',
  'Build image for service x': '为 {service} 服务构建镜像',
  BINARY_DESC: '',
  SECRET_CODE: '触发令牌',
  SECRET_CODE_RULE_DESC: '只能包含大小写字母、数字。',
  S2I_ACCESS_TOKEN_DESC: 'Set the ',
  'Remote Trigger Link': '远程触发链接',
  // Image Builder List Page
  // Creation Page
  S2I_SECRET: '密钥'
};