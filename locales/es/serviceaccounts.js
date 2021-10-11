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
  ServiceAccounts: 'Cuentas de servicio',
  ServiceAccount: 'Cuentas de servicio',
  SERVICE_ACCOUNT: 'Cuentas de servicio',
  SERVICE_ACCOUNT_PL: 'Cuentas de servicio',
  SERVICE_ACCOUNT_LOW: 'service account',
  'Edit Service Account': 'Editar cuenta de servicio',
  CHANGE_ROLE: 'Cambiar rol',
  SECRET_DETAILS: 'Detalle secreto',
  SERVICE_ACCOUNT_DESC:
    'La cuenta de servicio proporciona una identidad para los procesos que se ejecutan en un pod que se puede usar para acceder al servidor de API',
  SERVICE_ACCOUNT_EMPTY_DESC: 'Please create a service account.',
  INVALID_YAML_FILE_FORMAT: 'Formato de archivo YAML no válido.',

  SELECT_PROJECT_ROLE_DESC:
    'Seleccione un rol de proyecto para especificar permisos.',

  SERVICEACCOUNT_KUBECONFIG_DESC:
    'método de configuración kubeconfig, consulte <a href="https://kubernetes.io/docs/tasks/access-application-cluster/configure-access-multiple-clusters/" target="_black"> la documentación oficial </ a >. Después de la descarga archivo, modifique la dirección del servicio a la dirección externa de la API de Kubernetes',

  // Service Account Detail Page
  SECRET_VALUE: 'Secreto: {value}',
}
