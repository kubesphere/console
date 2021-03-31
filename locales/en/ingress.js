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
  'Add Annotation': 'Add Annotation',
  'Add Path': 'Add Path',
  'Auto Generate': 'Auto Generate',
  'Click to visit': 'Click to visit',
  'Create Route': 'Create Route',
  'Edit Annotations': 'Edit Annotations',
  'Edit Rules': 'Edit Rules',
  'Gateway Address': 'Gateway Address',
  'Gateway IP': 'Gateway IP',
  'Gateway Type': 'Gateway Type',
  HostName: 'HostName',
  'Invalid host': 'Invalid host',
  'Invalid paths': 'Invalid paths',
  Mode: 'Mode',
  Paths: 'Paths',
  'Please add at least one routing rule.':
    'Please add at least one routing rule.',
  'Please input Hostname': 'Please input Hostname',
  'Please select a service': 'Please select a service',
  Route: 'Route',
  'Route Rules': 'Route Rules',
  Rules: 'Rules',
  'Set Route Rule': 'Set Route Rule',
  'Specify Domain': 'Specify Domain',
  'Unable to access': 'Unable to access',

  ROUTE_DESC:
    "A Route provides a way to aggregate Services, and you can expose the cluster's internal Services outside through an externally accessible IP address.",
  ROUTE_CREATE_DESC:
    "A Route provides a way to aggregate Services, and you can expose the cluster's internal Services outside through an externally accessible IP address.",
  ROUTE_ANNOTATION_DESC:
    'You can set route behavior by adding annotations to the route. See <a href="https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/" target="_blank">Annotations</a> for the detailed list of available annotations.',

  RULE_SETTING_MODE_AUTO:
    'By configuring DNS access and changing the domain name to {$hostname} + {$gateway address} +nip.io, you can access the Service via {$hostname}.{$gateway address} .nip.io:{$NodePort}. <br/>Please ensure that you are in an enabling network environment to access the gateway address.',
  RULE_SETTING_MODE_SPECIFY:
    'Make sure that the domain name you set can be resolved to the IP address of the access portal. <br/>If you are in a private cloud environment, modify the local host file and then access it via {$domain name}:{$node port}.',
  GATEWAY_SERVICE_MESH_STATUS_ON: 'On',
  GATEWAY_SERVICE_MESH_STATUS_OFF: 'Off',

  INGRESS_CONTROLLER_NODEPORT_DESC:
    'If the gateway is enabled, the system will automatically assign port numbers of http and https. Application routes can access Services through the reverse proxy.',
  INGRESS_CONTROLLER_LOADBALANCER_DESC:
    'To use QingCloud LoadBalancer as a service gateway, please deploy the QingCloud Cloud Controller Manager plugin first.',

  NO_INTERNET_ACCESS_TIP:
    'The gateway address is not found in the current project, so you cannot use Auto Generate. Please contact your project administrator to turn it on in <strong>Internet Access</strong>.',
  UNABLE_CREATE_ROUTE_TIP:
    'The available gateway address is not found in the current project so the application route cannot be created.',

  GATEWAY_APPLICATION_GOVERNANCE_TIP:
    'You don\'t need to enable Application Governance if you don\'t use the Tracing feature. Once Application Governance is enabled, please check if an annotation like "nginx.ingress.kubernetes.io/service-upstream: true" is added for the application route when the route is inaccessible. If not, please add one.',

  UNABLE_TO_ACCESS_TIP:
    '● Make sure that the domain name you set can be resolved to the IP address of the access portal. <br/>● If you are in a private cloud environment, modify the local host file and then access it via {$domain name}:{$node port}.<br/>● By configuring DNS access, you need to modify the domain name to {$hostname} + {$gateway address} + nip.io, and then access the service via {$hostname}.{$gateway address} .nip.io:{$NodePort}. <br/>● If the access is blocked when you use the domain name, please confirm if your domain name exists and has been registered.',

  PREREQUESTS_FOR_USE_ROUTE_Q: 'Prerequisites for using routes',
  PREREQUESTS_FOR_USE_ROUTE_A:
    'To use the route, the administrator needs to set the Internet Access for the current project.',

  ACCESS_TYPES_OF_ROUTE_Q: 'Access types the route supports',
  ACCESS_TYPES_OF_ROUTE_A:
    'KubeSphere routes support custom domain names (HostName) and the wildcard DNS access method.',
}
