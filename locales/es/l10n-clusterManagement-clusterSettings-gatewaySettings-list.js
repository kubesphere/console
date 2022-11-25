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
  // Navigation Pane
  GATEWAY_SETTINGS: 'Gateway Settings',
  // Banner
  CLUSTER_GATEWAY_DESC: 'Set up and manage the configuration of the external network access gateway and service management in the cluster and project',
  // Cluster Gateway
  CLUSTER_GATEWAY_NOT_ENABLED: 'Cluster Gateway Not Enabled',
  CLUSTER_ENABLE_GATEWAY_DESC: 'Before creating an application route, you need to enable the external network access portal, that is, the gateway. This step is to create the corresponding application routing controller, which is responsible for forwarding the request to the corresponding back-end service. ',
  CLUSTER_GATEWAY: 'Cluster Gateway',
  GATEWAY_ADDRESS_SCAP: 'Gateway address',
  LOAD_BALANCER_PROVIDER_SCAP: 'Load balancer provider',
  // Cluster Gateway > Enable Gateway
  ENABLE_GATEWAY: 'Establecer puerta de enlace',
  GATEWAY_TRACING_TIP: 'Necesitas habilitar Application Governance si deseas utilizar la función de Tracing. Una vez que Application Governance esté habilitado, verifica si se ha agregado una annotation como "nginx.ingress.kubernetes.io/service-upstream: true" para la ruta de la aplicación si la ruta es inaccesible. Si no existe el annotation, agrégalo.',
  // Cluster Gateway > Manage > View Details
  VIEW_DETAILS: 'Ver detalles',
  // Cluster Gateway > Manage > Disable
  DISABLE: 'Disable',
  DISABLE_GATEWAY: 'Disable Gateway',
  DISABLE_GATEWAY_TIP: 'Are you sure you want to disable the gateway?',
  DISABLE_SUCCESSFUL: 'Disabled successfully.',
  // Cluster Gateway > Manage > Edit
  EDIT: 'Editar',
  EDIT_TITLE: 'Edit {title}',
  // Cluster Gateway > Manage > Update
  UPDATE: 'Update',
  UPDATE_GATEWAY_DESC: 'The current gateway can be updated.',
  // Project Gateways
  PROJECT_GATEWAY_PL: 'Project Gateways',
  PROJECT_GATEWAY_NOT_ENABLED: 'Project Gateway Not Enabled',
  PROJECT_ENABLE_GATEWAY_DESC: 'The cluster management page does not support the setting of the project gateway. If you need to set it, you need to go to the corresponding project to set it. ',
  REPLICA_COUNT: 'Replicas',
  NODE_PORTS: 'Puerto host',
  UPDATE_GATEWAY_DESC: 'The current gateway can be updated.',
  // Project Gateways > Disable
  PROJECT_GATEWAY_LOW: 'project gateway',
  DISABLE_MULTIPLE_GATEWAYS: 'Disable Multiple Gateways'
};