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
  ADD_ANNOTATION: 'Add Annotation',
  ADD_PATH_TCAP: 'Add Path',
  'Add Path': 'Add Path',
  'Auto Generate': 'Auto Generate',
  VISIT: 'Visit',
  'Create Route': 'Create Route',
  EDIT_RULES: 'Edit Rules',
  PATH_SI: 'Path',
  Route: 'Route',
  ROUTE_ANNOTATION_DESC: 'You can set route behavior by adding annotations to the route. See <a href="https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/" target="_blank">Annotations</a> for the detailed list of available annotations.',
  RULE_SETTING_MODE_AUTO: 'The system will automatically generate a domain name in the &ltService name&gt.&ltProject name&gt.&ltGateway IP address&gt.nip.io format, and the domain name will be resolved by nip.io into the gateway IP address. This mode supports only HTTP.',
  RULE_SETTING_MODE_SPECIFY: 'Customize a domain name and use the local hosts file or a DNS server to resolve the domain name into the gateway IP address.',
  GATEWAY_SERVICE_MESH_STATUS_ON: 'On',
  GATEWAY_SERVICE_MESH_STATUS_OFF: 'Off',
  INGRESS_CONTROLLER_NODEPORT_DESC: 'If the gateway is enabled, the system will automatically assign port numbers of http and https. Application routes can access services through the reverse proxy.',
  INGRESS_CONTROLLER_LOADBALANCER_DESC: 'To use QingCloud LoadBalancer as a service gateway, please deploy the QingCloud Cloud Controller Manager plugin first.',
  UNABLE_CREATE_ROUTE_TIP: 'The available gateway address is not found in the current project so the application route cannot be created.'
};