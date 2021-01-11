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
  secrets: '密钥',
  Secrets: '密钥',
  Secret: '密钥',
  'Secret Name': '密钥名称',
  'Config Number': '配置项数量',
  'Edit Secret': '编辑密钥',
  'Secret Settings': '密钥设置',
  'Private Key': '私钥',
  'Image Registry Secret': '镜像仓库密钥',
  'Please input credential': '请输入凭证',
  'Please input private key': '请输入私钥',
  'Please input data': '请输入数据',
  Unverified: '镜像仓库密钥验证失败',
  SECRET_TYPE_DESC: '可以选择也可以自定义一个密钥类型',

  SECRET_DESC:
    '密钥 (Secret) 是一种包含少量敏感信息的资源对象，例如密码、token、秘钥等，以键/值对形式保存并且可以在容器组中使用。',
  SECRET_CREATE_DESC:
    '密钥 (Secret) 是一种包含少量敏感信息的资源对象，例如密码、token、秘钥等，以键/值对形式保存并且可以在容器组中使用。',

  SECRET_NO_CHINESE_CODE_DESC: '密钥中不能包含中文字符',

  'Registry Address': '仓库地址',
  'Registry verification failed': '镜像仓库校验失败',
  'Registry verification succeeded': '镜像仓库校验通过',
  'Account Password Secret': '帐户密码密钥',

  Data: '数据',
  'Add Data': '添加数据',
  'Edit Data': '编辑数据',
  'Add key / value pair data': '添加键/值对形式数据',

  'DATA-KEY': '键(Key)',
  'DATA-VALUE': '值(Value)',
  'Example: docker.io': '例：docker.io',

  IMAGE_REGISTRY_REQUIRED_DESC:
    '镜像仓库密钥需要至少包含仓库地址、用户名和密码信息',

  IMAGE_REGISTRY_VALIDATE_TIP: '创建镜像仓库密钥前, 请先验证密钥是否可用',

  'Please input the registry address': '请输入镜像仓库地址',
}
