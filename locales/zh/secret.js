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
  SECRET: '保密字典',
  CODE_REPOSITORY_KEY: '代码仓库密钥',
  SECRET_PL: '保密字典',
  SECRET_LOW: '保密字典',
  SECRET_FIELD_COUNT: '字段数量',
  EDIT_SECRET: '编辑保密字典',
  DATA_SETTINGS: '数据设置',
  KUBECONFIG_SETTINGS: 'kubeconfig 设置',
  PRIVATE_KEY_TCAP: '私钥',
  IMAGE_REGISTRY_INFORMATION: '镜像仓库信息',
  TLS_INFORMATION: 'TLS 信息',
  IMAGE_REGISTRY_SECRET_TCAP: '镜像仓库保密字典',
  ENTER_CREDENTIAL_TIP: '请输入凭证 ID。',
  ENTER_PRIVATE_KEY_DESC: '请输入私钥。',
  ENTER_DATA_DESC: '请添加数据。',
  Unverified: '镜像仓库保密字典验证失败。',
  SECRET_TYPE_DESC: '选择一个保密字典类型。',

  SECRET_DESC:
    '保密字典（Secret）是一种包含少量敏感信息的资源对象，例如密码、令牌、保密字典等，以键值对形式保存并且可以在容器组中使用。',
  SECRET_EMPTY_DESC: '请创建一个保密字典。',

  SECRET_NO_CHINESE_CODE_DESC:
    '保密字典的键必须由字母数字字符、连字符（-）、下划线（_）或句点（.）组成。',

  REGISTRY_ADDRESS_TCAP: '仓库地址',
  REGISTRY_SECRET_VER_ERR: '镜像仓库验证失败。',
  REGISTRY_SECRET_VER_SUC: '镜像仓库验证通过。',
  USERNAME_PASSWORD: '用户名和密码',
  ACCOUNT_PASSWORD_SECRET_TCAP: '帐户密码保密字典',

  DATA: '数据',
  ADD_DATA_TCAP: '添加数据',
  EDIT_DATA_TCAP: '编辑数据',
  ADD_DATA_DESC: '添加键值对数据。',

  DATA_KEY: '键',
  DATA_VALUE: '值',
  REGISTRY_ADDRESS_TIP: '设置镜像仓库地址，例如 docker.io。',

  IMAGE_REGISTRY_REQUIRED_DESC: '请设置仓库地址、用户名和密码信息。',

  IMAGE_REGISTRY_VALIDATE_TIP: '创建镜像仓库保密字典前, 请先验证用户名和密码。',

  'Please input the registry address': '请输入镜像仓库地址。',

  // Secret Type Drop-down List
  SECRET_VALUE_LABEL: '{value}（{label}）',
  CREATE_SECRET: '新建保密字典',
}
