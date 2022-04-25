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
  ROUTE_DESC: 'A route provides a way to aggregate services. You can expose the internal services outside the cluster through an externally accessible IP address.',
  PREREQUESTS_FOR_USE_ROUTE_Q: 'What are the prerequisites for using routes?',
  PREREQUESTS_FOR_USE_ROUTE_A: 'To use routes, you need to contact the project administrator to set the gateway for the project.',
  ACCESS_TYPES_OF_ROUTE_Q: 'What are the external access modes of routes?',
  ACCESS_TYPES_OF_ROUTE_A: 'KubeSphere routes support the NodePort and LoadBalancer external access modes.',
  ROUTE_PL: 'Routes',
  // List
  GATEWAY_ADDRESS_TCAP: 'Gateway Address',
  ROUTE_EMPTY_DESC: 'Please create a route.',
  // List > Create > Basic Information
  // List > Create > Routing Rules
  ADD_ROUTING_RULE_DESC: 'Add a routing rule to map domain name paths to services.',
  ADD_ROUTING_RULE: 'Add Routing Rule',
  ROUTING_RULE_EMPTY_DESC: 'Please add at least one routing rule.',
  PATH_EMPTY_DESC: 'Please add at least one path.',
  AUTO_GENERATE_TCAP: 'Auto Generate',
  DOMAIN_NAME_TCAP: 'Domain Name',
  DOMAIN_NAME_EMPTY_DESC: 'Please enter a domain name.',
  INVALID_DOMAIN_DESC: 'Invalid domain name.',
  INVALID_PATH_DESC: 'Invalid path.',
  MODE_TCAP: 'Mode',
  PATH_PL: 'Paths',
  PATH_SERVICE_TIP: 'Service',
  SET_ROUTING_RULES: 'Set Routing Rules',
  SPECIFY_DOMAIN_TCAP: 'Specify Domain',
  NO_GATEWAY_DESC: 'To use Auto Generate, please contact the project administrator to set the gateway access mode in Gateway Settings of the project.',
  PATH: 'Path',
  PROTOCOL: 'Protocol',
  PORT: 'Port',
  PORT_VALUE: 'Port: {value}',
  CERTIFICATE: 'Certificate',
  // List > Create > Advanced Settings
  // List > Edit Information
  // List > Edit YAML
  // List > Edit Routing Rules
  EDIT_ROUTING_RULES: 'Edit Routing Rules',
  // List > Edit Annotations
  EDIT_ANNOTATIONS: 'Edit Annotations',
  // List > Delete
  ROUTE_LOW: 'route'
};