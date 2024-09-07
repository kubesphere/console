/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Banner
  ROUTE_DESC:
    'An ingress provides a way to aggregate services. You can expose the internal services outside the cluster through an externally accessible IP address.',
  PREREQUESTS_FOR_USE_ROUTE_Q: 'What are the prerequisites for using ingresses?',
  PREREQUESTS_FOR_USE_ROUTE_A:
    'To use ingresses, you need to contact the project administrator to set the gateway for the project.',
  ACCESS_TYPES_OF_ROUTE_Q: 'What are the external access modes of ingresses?',
  ACCESS_TYPES_OF_ROUTE_A:
    'KubeSphere ingresses support the NodePort and LoadBalancer external access modes.',
  ROUTE_PL: 'Ingresses',
  ROUTE_SETTING_PL: 'Application routing tools',
  // List
  GATEWAY_ADDRESS_TCAP: 'Gateway Address',
  ROUTE_EMPTY_DESC: 'Please create an ingress.',
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
  NO_GATEWAY_DESC:
    'To use Auto Generate, please contact the project administrator to set the gateway access mode in Gateway Settings of the project.',
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
  ROUTE_LOW: 'ingress',
};
