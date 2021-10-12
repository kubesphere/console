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
  CREATE_DEVOPS_PROJECT: 'Crear Proyecto DevOps',
  DELETE_DEVOPS_PROJECT: 'Eliminar Proyecto DevOps',
  'DevOps Basic Info': 'Información básica de DevOps',
  DEVOPS_PROJECT_CREDENTIAL_PL: 'Credenciales de Proyecto DevOps',
  DEVOPS_CREDENTIAL: 'DevOps Credential',
  DEVOPS_CREDENTIAL_PL: 'Credenciales de DevOps',
  DEVOPS_CREDENTIAL_EMPTY_DESC: 'Please create a DevOps project credential.',
  DEVOPS_CREDENTIAL_LOW: 'DevOps credential',
  'DevOps Member': 'Miembro de DevOps',
  'DevOps Members': 'Miembros de DevOps',
  DEVOPS_NAME: 'Nombre',
  DEVOPS_PROJECT: 'Proyecto DevOps',
  DEVOPS_PROJECT_MEMBER_EMPTY_DESC:
    'Please invite a member of the current workspace to the DevOps project.',
  'DevOps Project Manager': 'Gestor de Proyecto DevOps',
  'DevOps Role': 'Rol de DevOps',
  'DevOps Roles': 'Roles de DevOps',
  MANAGER: 'Gestor',
  DEVOPS_PROJECT_MANAGEMENT: 'Gestión de proyectos',
  DEVOPS_PROJECT_SETTINGS: 'Gestión de proyectos',
  MANAGE_DEVOPS_PROJECT: 'Manage DevOps Project',
  DEVOPS_PROJECT_MEMBER_PL: 'Miembros del proyecto',
  DEVOPS_PROJECT_ROLE_PL: 'Roles del proyecto',
  DEVOPS_BASEINFO_DESC: 'Introduce la información básica del proyecto DevOps',
  DEVOPS_DESCRIPTION:
    'DevOps es un namespace separado que define un conjunto de pipelines. Los usuarios pueden agrupar sus pipelines ellos mismos (por ejemplo, por tipo de proyecto y tipo de organización).',
  DEVOPS_PROJECT_CREATE_DESC:
    'DevOps es un namespace separado que define un conjunto de pipelines. Los usuarios pueden agrupar sus pipelines ellos mismos (por ejemplo, por tipo de proyecto y tipo de organización).',
  DEVOPS_PROJECT_EMPTY_DESC: 'Please create a DevOps project.',
  PIPELINE_EMPTY_DESC: 'Please create a pipeline.',
  DEVOPS_ADMIN_DESC:
    'Puedes especificar un miembro del proyecto como administrador',
  NO_RELATE_DEVOPS_TITLE: 'No hay ningún proyecto DevOps asociado a ti',
  NO_RELATE_DEVOPS_DESC:
    'Puedes crear un proyecto o ponerte en contacto con el gestor del proyecto para que te invite al proyecto DevOps y comenzar tu trabajo.',
  DEVOPS_CREDENTIALS_DESC:
    'La credencial es un objeto que contiene datos confidenciales, como por ejemplo un nombre de usuario y contraseña, una clave SSH o un token. Se utiliza para proporcionar autenticación en el proceso de descarga de código, push / pull de imágenes, ejecución de scripts SSH, etc., cuando se está ejecutando una pipeline.',
  DEVOPS_PROJECT_ROLES_DESC:
    'Los roles de proyecto definen los permisos que los usuarios tienen en el proyecto DevOps actual.',
  DEVOPS_PROJECT_MEM_DESC:
    'Gestionar y asignar roles a los miembros del proyecto.',
  DELETE_DEVOPS_TIP:
    '¿Estás seguro de eliminar el proyecto DevOps <strong>{resource}</strong>? Después de la eliminación, no podrás recuperarlo y los recursos del proyecto DevOps también serán destruidos.',
  DEVOPS_TIP_GITOPS_Q: '¿Cómo comenzar con DevOps?',
  DEVOPS_PROJECT_ROLE_EMPTY_DESC: 'Please create a DevOps project role.',
  DEVOPS_TIP_GITOPS_A:
    'Puedes comenzar a usar DevOps creando una pipeline asociada con el repositorio de código e implementando pasos con Kubernetes.',
  DEVOPS_TIP_TYPE_Q:
    '¿Qué repositorios de código son compatibles con Pipeline?',
  DEVOPS_TIP_TYPE_A:
    'Pipeline admite repositorios de código Git, GitHub, Gitlab, SVN y Bitbucket.',
  NO_DEVOPS_INSTALL: 'DevOps no instalado',

  // Credentials Creation Page
  SECRET_DEVOPS: 'Secreto',
  CONTENT: 'Content',
  INVALID_ID_TIP:
    'The ID can contain only lowercase letters, numbers, and hyphens (-), and must start and end with a lowercase letter or number. The maximum length is 63 characters.',
}
