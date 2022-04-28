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
  CREDENTIAL_PL: 'Autentificación',
  DEVOPS_CREDENTIALS_DESC: 'Credentials are objects that contain some sensitive data, such as username and password, SSH key and Token. They are used to provide authentication for pulling code, pushing/pulling images, executing SSH scripts, etc. when a pipeline is running.',
  // List
  CREDENTIAL_EMPTY_DESC: 'Please create a credential.',
  // List > Create
  CREATE_CREDENTIAL: 'Crear credenciale',
  CREDENTIAL_NAME_EXIST_DESC: 'El ID de credencial ya existe',
  CREDENTIAL_TYPE_USERNAME_PASSWORD: 'Secreto de contraseña de cuenta',
  CREDENTIAL_TYPE_SSH: 'SSH key',
  PRIVATE_KEY: 'Llave privada',
  PASSPHRASE: 'Pasphrase',
  CREDENTIAL_TYPE_SECRET_TEXT: 'Access token',
  CREDENTIAL_TYPE_KUBECONFIG: 'kubeconfig',
  PASSWORD_TOKEN: 'Token/Contraseña',
  KUBECONFIG_CONTENT_DESC: 'El contenido predeterminado es el kubeconfig del usuario actual.',
  CONTENT: 'Content'
};