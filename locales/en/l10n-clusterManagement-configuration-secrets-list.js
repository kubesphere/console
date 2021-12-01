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
  // Navigation pane
  CONFIGURATION: 'Configuration',

  // Banner
  SECRET_PL: 'Secrets',
  SECRET_DESC:
    'A Secret is an object that contains a small amount of sensitive data such as a password, a token, or a key.',

  // List
  SECRET_FIELD_COUNT: 'Fields',
  SECRET_EMPTY_DESC: 'Please create a Secret.',

  // List > Create > Basic Information
  SECRET: 'Secret',
  // List > Create > Secret Settings
  DATA_SETTINGS: 'Data Settings',
  IMAGE_REGISTRY_INFORMATION: 'Image registry information',
  TLS_INFORMATION: 'TLS information',
  USERNAME_PASSWORD: 'Username and password',
  ADD_DATA_TCAP: 'Add Data',
  ADD_DATA_DESC: 'Add a key-value pair.',
  REGISTRY_ADDRESS_TIP: 'Set a registry address, for example, docker.io.',
  IMAGE_REGISTRY_REQUIRED_DESC:
    'Please set the registry address, username, and password.',
  CREDENTIAL_NAME_EMPTY_DESC: 'Please enter a credential name.',
  ENTER_PRIVATE_KEY_DESC: 'Please enter a private key.',
  ENTER_DATA_DESC: 'Please add data.',
  PRIVATE_KEY_TCAP: 'Private Key',
  REGISTRY_ADDRESS_TCAP: 'Registry Address',
  REGISTRY_SECRET_VER_ERR: 'Registry Verification Failed.',
  REGISTRY_SECRET_VER_SUC: 'Registry Verification Succeeded.',
  SECRET_NO_CHINESE_CODE_DESC:
    'The key of the Secret must consist of alphanumeric characters, hyphens (-), underscores (_), or periods (.).',
  SECRET_TYPE_DESC: 'Select a Secret type.',
  IMAGE_REGISTRY_VALIDATE_TIP:
    'Please validate the username and password before creating the image registry Secret.',
  DATA_KEY: 'Key',
  DATA_VALUE: 'Value',
  DEFAULT: 'Default',

  // List > Edit Information
  // List > Edit YAML
  // List > Edit Settings
  DATA: 'Data',
  EDIT_DATA_TCAP: 'Edit Data',

  // List > Delete
}
