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
  IMAGE_BUILDER_PL: '镜像构建器',
  IMAGE_BUILDER_DESC: '镜像构建器（Image Builder）是将代码或者制品制作成容器镜像的工具。您可以通过简单的设置将制品或代码直接制作成容器镜像。',
  // List
  IMAGE_BUILDER_EMPTY_DESC: '请创建一个镜像构建器。',
  NOT_RUNNING_YET: '未运行',
  BUILDING: '构建中',
  S2I: '源码构建镜像',
  B2I: '制品构建镜像',
  // List > Name (Displayed after you create a service from artifact)
  BUILD_IMAGE_FOR_SERVICE: '为 {service} 服务构建镜像。',
  // List > Create > Build Mode
  BUILD_MODE: '构建模式',
  CONTAINERD_RUNTIME_NOT_SUPPORTED: '容器运行时不支持此功能。',
  S2I_DESC: '选择代码的开发语言。',
  IMAGE_FROM_S2I: '通过代码构建镜像',
  IMAGE_FROM_B2I: '通过制品构建镜像',
  B2I_DESC: '选择制品的文件类型。',
  EMPTY_IMAGE_TYPE_DESC: '请选择语言或制品类型。',
  // List > Create > Java > Build Settings
  CODE_REPOSITORY_URL: '代码仓库 URL',
  CODE_REPOSITORY_BRANCH: '代码仓库分支',
  CODE_REPOSITORY_KEY: '代码仓库密钥',
  CODE_REPOSITORY_URL_DESC: '输入代码仓库的地址。目前仅支持 Git 仓库。',
  CODE_REPOSITORY_KEY_DESC: '如果使用私有代码仓库，请选择包含代码仓库密钥的保密字典。',
  IMAGE_NAME: '镜像名称',
  IMAGE_TAG: '镜像标签',
  TARGET_IMAGE_REPOSITORY: '目标镜像服务',
  S2I_IMAGE_NAME_DESC: '名称只能包含小写字母、数字、连字符（-）、句点（.）、斜钱（/）和冒号（:），并以小写字母或数字开头和结尾。',
  S2I_TARGET_IMAGE_REPOSITORY_DESC: '选择一个镜像服务用于存放即将创建的镜像。如果没有可用的镜像服务，您需要先创建镜像服务保密字典。<br/><a href={link} target="_blank">了解更多</a>',
  TRIGGER_TOKEN: '触发令牌',
  INVALID_TRIGGER_TOKEN_DESC: '令牌无效。令牌只能包含大写字母、小写字母和数字。',
  TRIGGER_TOKEN_DESC: '设置客户端通过 Webhook 触发 KubeSphere 镜像构建时所使用的认证令牌。令牌只能包含大写字母、小写字母和数字。',
  CODE_RELATIVE_PATH: '代码相对路径',
  CODE_RELATIVE_PATH_DESC: '设置代码在代码仓库中的相对路径。默认值为 /。',
  S2I_ENVIRONMENT_DESC: '添加环境变量以控制镜像运行时的行为。<a href={link} target="_blank">了解更多</a>',
  // List > Create > JAR > Build Settings
  UPLOAD_ARTIFACT_FILE: '上传制品文件',
  UPLOAD_PERCENT: '已上传：{percent}%',
  UPLOAD_FULLY: '已上传：100%',
  UPLOAD_FAILED: '上传失败。',
  ARTIFACT_FILE_EMPTY_DESC: '请上传一个制品文件。',
  B2I_DEFAULT_DESC: '上传一个制品文件。',
  JAR_DESC: '上传一个 JAR 格式的制品文件。',
  WAR_DESC: '上传一个 WAR 格式的制品文件。',
  BUILD_ENVIRONMENT: '构建环境',
  CODE_REPOSITORY_KEY_NOT_REQUIRED: '当前代码仓库不需要密钥。',
  FILE_SIZE_VALUE: '文件大小：{value}',
  FILE_UPLOADED_TIP: '上传文件成功。',
  WRONG_FILE_EXTENSION_NAME: '选择的文件类型不匹配，请选择 {type} 类型。',
  IMAGE_NAME_EMPTY_DESC: '请输入镜像名称。',
  IMAGE_TAG_EMPTY_DESC: '请输入镜像标签。',
  TARGET_IMAGE_REPOSITORY_EMPTY_DESC: '请设置目标镜像服务。',
  VALIDATE_SUCCESS: '校验成功',
  VALIDATE_FAILED: '校验失败',
  RUN_SUCCESSFUL: '运行成功',
  RUN_FAILED: '运行失败'
};