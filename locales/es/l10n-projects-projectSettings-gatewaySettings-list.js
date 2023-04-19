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
  PROJECT_GATEWAY_DESC: 'Set up and manage the configuration of the external network access gateway and service management in the cluster and project',
  // Project Gateway
  PROJECT_GATEWAY: 'Project Gateway',
  PROJECT_GATEWAY_EMPTY_DESC: 'Please create a project gateway.',
  // Project Gateway > Enable Gateway
  ENABLE_GATEWAY_DESC: 'Antes de crear una ruta, debe habilitar el portal de acceso a Internet (es decir, la puerta de enlace). Este paso crea un controlador de enrutamiento correspondiente para reenviar la solicitud al servicio de back-end correspondiente.',
  // Project Gateway > Enable Gateway > NodePort
  // Project Gateway > Enable Gateway > LoadBalancer
  LOAD_BALANCER_PROVIDER: 'LoadBalancer Provider',
  GATEWAY_UPDATING_TIP: 'Updating the gateway. Please try again later.',
  // Manage > View Details
  // Manage > Edit
  // Manage > Edit > NodePort
  // Manage > Edit > LoadBalancer
  // Manage > Disable
  // Cluster Gateway (displayed when the cluster gateway and project gateway are both enabled)
  CLUSTER_GATEWAY_GUIDE_DESC: 'After the cluster gateway is turned on, the project gateway can no longer be set. If the project gateway already exists, it cannot be reset after deleting it. '
};