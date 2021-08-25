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
  secrets: '保密字典',
  Secrets: '保密字典',
  Secret: '保密字典',
  SECRET_NAME_TCAP: '保密字典名称',
  'Config Number': '配置项数量',
  'Edit Secret': '编辑保密字典',
  SECRET_SETTINGS_TCAP: '保密字典设置',
  PRIVATE_KEY_TCAP: '私钥',
  IMAGE_REGISTRY_SECRET_TCAP: '镜像仓库保密字典',
  ENTER_CREDENTIAL_TIP: '请输入凭证',
  ENTER_PRIVATE_KEY_DESC: '请输入私钥',
  ENTER_DATA_DESC: '请输入数据',
  Unverified: '镜像仓库保密字典验证失败',
  SECRET_TYPE_DESC: '选择或者自定义一个保密字典类型。',

  SECRET_DESC:
    '保密字典是一种包含少量敏感信息的资源对象，例如密码、令牌、保密字典等，以键/值对形式保存并且可以在容器组中使用。',
  SECRET_CREATE_DESC:
    '保密字典是一种包含少量敏感信息的资源对象，例如密码、令牌、保密字典等，以键/值对形式保存并且可以在容器组中使用。',

  SECRET_NO_CHINESE_CODE_DESC: '保密字典中不能包含中文字符',

  REGISTRY_ADDRESS_TCAP: '仓库地址',
  REGISTRY_SECRET_VER_ERR: '镜像仓库校验失败',
  REGISTRY_SECRET_VER_SUC: '镜像仓库校验通过',
  ACCOUNT_PASSWORD_SECRET_TCAP: '帐户密码保密字典',

  DATA: '数据',
  ADD_DATA_TCAP: '添加数据',
  EDIT_DATA_TCAP: '编辑数据',
  ADD_DATA_DESC: '添加键/值对形式数据',

  DATA_KEY: '键（Key）',
  DATA_VALUE: '值（Value）',
  'Example: docker.io': '例：docker.io',

  IMAGE_REGISTRY_REQUIRED_DESC:
    '镜像仓库保密字典需要至少包含仓库地址、用户名和密码信息',

  IMAGE_REGISTRY_VALIDATE_TIP:
    '创建镜像仓库保密字典前, 请先验证保密字典是否可用',

  'Please input the registry address': '请输入镜像仓库地址',
}
