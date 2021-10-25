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
  ' has no corresponding workload.': ' has no corresponding workload.',
  ACCESS_TYPE: 'Access Type',
  INTERNAL_ACCESS_MODE: 'Internal Access Mode',
  'Add Route Rule': 'Add Route Rule',
  'Add Selector': 'Add Selector',
  'Associated Application': 'Associated Application',
  AUTO_REFRESH: 'Auto Refresh',
  'Automatically assign Service IP': 'Automatically assign Service IP',
  'Commonly included tags in the current workloads':
    'Commonly included tags in the current workloads',
  CONTAINER_PORT: 'Container Port',
  CONTAINER_PORT_SCAP: 'Container port',
  SERVICE_PORT_SCAP: 'Service port',
  CONTAINER_PORT_VALUE: 'Container Port: {value}',
  CREATE_SERVICE: 'Create Service',
  'Create Service': 'Create Service',
  'Create service by specifying workloads':
    'Create service by specifying workloads',
  'Create service by Yaml': 'Create service by Yaml',
  Creating: 'Creating',
  'Creation failed, please delete and try again':
    'Creation failed, please delete and try again',
  CUSTOM_SERVICE: 'Custom Service',
  CUSTOMIZE_SERVICE: 'Customize Service',
  'Delete Service': 'Delete Service',
  'Do not assign Service IP': 'Do not assign Service IP',
  EDIT_EXTERNAL_ACCESS: 'Edit External Access',
  EDIT_MONITORING_EXPORTER: 'Edit Monitoring Exporter',
  EDIT_SERVICE: 'Edit Service',
  STICKY_SESSION: 'Sticky Session',
  'External Address': 'External Address',
  EXTERNAL_SERVICE: 'External Service',
  EXTERNAL_IP_ADDRESS: 'External IP Address',
  EXTERNAL_IP_ADDRESS_SCAP: 'External IP address',
  'External Service': 'External Service',
  'Internal access': 'Internal access',
  INVALID_PORT_DESC: 'Please enter a valid port number.',
  INVALID_PORT: 'Invalid port.',
  LANGUAGE_TYPE_VALUE: 'Language Type: {value}',
  ARTIFACT_TYPE_VALUE: 'Artifact Type: {value}',
  'LoadBalancer IP': 'LoadBalancer IP',
  'Map Services outside the cluster': 'Map Services outside the cluster',
  MAXIMUM_STICKINESS_DURATION: 'Maximum Stickiness Duration (s)',
  'No related resources found with current service(s)':
    'No related resources found with current service(s)',
  NO_SERVICE_RELATED_RESOURCE_DESC:
    'No resource related to the Service is found.',
  NO_WORKLOAD_RELATED_RESOURCE_DESC:
    'No resource related to the workload is found.',
  'Node Port': 'Node Port',
  'Node Port(s)': 'Node Port(s)',
  'Not Associate': 'Not Associate',
  'Path is Required': 'Path is Required',
  EXTERNAL_SERVICE_ADDRESS_EMPTY_DESC:
    'Please enter the domain name of an external Service.',
  ENTER_PORT_NUMBER: 'Please enter a port number.',
  'Please input ExternalName': 'Please input ExternalName',
  PORT_EMPTY: 'Please set at least one port.',
  'Please input selectors that have corresponding workloads':
    'Please input selectors that have corresponding workloads',
  'Please input service name': 'Please input service name',
  ENTER_SELECTOR_TIP: 'Please set a workload selector.',
  'Please select a workload': 'Please select a workload',
  'Please select Service': 'Please select Service',
  Ports: 'Ports',
  routes: 'routes',
  selector: 'selector',
  ACCESS_INFORMATION: 'Access Information',
  'Service Mesh': 'Service Mesh',
  'Service Name': 'Service Name',
  SERVICE_PORT: 'Service Port',
  SERVICE_PORT_VALUE: 'Service Port: {value}',
  SERVICE_TYPE_TCAP: 'Service Type',
  SERVICE_TYPE_DESC: 'Select a Service type.',
  SELECT_SERVICE_TYPE_DESC:
    'Create a stateless or stateful Service, or map a Service to an external Service.',
  APP_SELECT_SERVICE_TYPE_DESC: 'Create a stateless or stateful Service.',
  'Simple Service': 'Simple Service',
  SPECIFY_WORKLOAD: 'Specify Workload',
  SPECIFY_WORKLOAD_TO_CREATE_SERVICE: 'Specify Workload to Create Service',
  EDIT_YAML_TO_CREATE_SERVICE: 'Edit YAML to Create Service',
  CREATE_EXTERNAL_SERVICE: 'Create External Service',
  'Specify Node': 'Specify Node',
  'Service Type': 'Service Type',
  'Specify Workload': 'Specify Workload',
  SPECIFY_NODE: 'Specify Node',
  STATEFUL_SERVICE: 'Stateful Service',
  STATELESS_SERVICE: 'Stateless Service',
  'Sure to delete the service(s)?': 'Sure to delete the service(s)?',
  'Target Port': 'Target Port',
  'The current selector': 'The current selector',
  NO_WORKLOAD_MATCH_SELECTOR: 'The current selector matches no workload.',
  WORKLOADS_MATCH_SELECTOR_SI:
    'The current selector ({selector}) matches {count} workload.',
  WORKLOADS_MATCH_SELECTOR_PL:
    'The current selector ({selector}) matches {count} workloads.',
  STICKY_SESSION_DESC:
    'Set the system to forward all requests from the same client to the same Pod within a specified duration.',
  VIRTUAL_IP: 'VirtualIP',
  VIRTUAL_IP_ADDRESS: 'Virtual IP address',

  CREATE_EXTERNAL_SERVICE_DESC:
    'Create a Service and map it to an external Service.',
  TOTAL_WORKLOADS_VALUE: 'Total Workloads: {count}',

  SERVICE_SELECTOR_AFFECT_1: '',
  SERVICE_SELECTOR_AFFECT_2: ' affect {count} workloads',

  SERVICE_NAME_DESC:
    'The name can contain only lowercase letters, numbers, and hyphens (-), must start with a lowercase letter, and must end with a lowercase letter or number. The maximum length is 63 characters.',
  SERVICE_DESC:
    'Services provide an abstract way to expose applications running on a Pod as network services.',
  SERVICE_EMPTY_DESC: 'Please create a Service.',
  SERVICES_BASEINFO_DESC:
    'The name and description of the service need to be provided to create the service. The service name cannot be the same as the existing service name under the same project.',
  SERVICES_SETTINGS_DESC:
    'Service settings define how to access an existing workload.',
  SERVICE_EXTERNAL_ACCESS_DESC:
    'Set the method for accessing the Service from outside the cluster.',

  VIRTUAL_IP_TITLE: 'Virtual IP Address',
  VIRTUAL_IP_DESC:
    'A virtual IP address is assigned to the Service. The Service can be accessed within the cluster through the virtual IP address.',
  INTERNAL_DOMAIN_NAME: 'Internal Domain Name',
  INTERNAL_DOMAIN_NAME_DESC:
    'No IP address is assigned to the Service. The Service can be accessed within the cluster through the cluster DNS mechanism.',
  HEADLESS_EXTERNAL_NAME_TITLE:
    'Headless (externalname): Map addresses outside the cluster to visit',
  HEADLESS_EXTERNAL_NAME_DESC: 'Map external services to a cluster or project.',

  ACCESS_NONE_TIP:
    'Internet access is not supported. The Service can be accessed only within the cluster.',
  ACCESS_NODEPORT_TIP: 'Use a port of the cluster nodes to access the Service.',
  ACCESS_LOADBALANCER_TIP: 'Use a load balancer to access the Service.',

  SERVICE_NODE_PORT_DESC:
    'If your client machine is on the same network as the cluster, you can use <Node IP address>:<Node port> to access the Service.',

  SERVICE_TYPE: 'Service Type',
  SELECT_SERVICE_TYPE: 'Select Service Type',
  SERVICE_TYPES_Q: 'What Service types does KubeSphere support?',
  SERVICE_TYPES_A:
    'KubeSphere supports stateless Services and stateful Services. Pod replicas in a stateless Service share the same volume, while each Pod replica in a stateful Service has an independent volume.',

  SCENARIOS_FOR_SERVICES_Q:
    'What are the use cases of stateless Services and stateful Services?',
  SCENARIOS_FOR_SERVICES_A:
    'Stateless Services applies to scenarios where data persistence is not required, such as Nginx and Tomcat. Stateful Services applies to scenarios where data persistence is required, such as MySQL databases, Kafka, and Zookeeper.',
  DELETE_SERVICE_DESC:
    'You are about to delete the service(s) {resource}. Please confirm whether to delete the associated resource?',
  DELETE_SERVICE_DESC_PL:
    'You are about to delete the Services {resource}.<br/>Do you want to also delete the following resources related to the Services?',
  DELETE_SERVICE_DESC_SI:
    'You are about to delete the Service {resource}.<br/>Do you want to also delete the following resource related to the Service?',
  SERVICE_FROM_CODE: 'Create Service from Source Code',
  SERVICE_FROM_ARTIFACT: 'Create Service from Artifact',
  SERVICE_FROM_CODE_DESC:
    'Build an image from existing source code and deploy the image.',
  SERVICE_FROM_ARTIFACT_DESC:
    'Build an image from an existing artifact and deploy the image.',
  JAVA: 'Java',
  NODEJS: 'Node.js',
  PYTHON: 'Python',
  BINARY: 'Binary',

  CUSTOMIZE_SERVICE_DESC:
    'Specify workloads or edit a YAML configuration file to create a Service.',

  SERVICE_TYPE_STATEFULSERVICE: 'Stateful Service',
  SERVICE_TYPE_STATELESSSERVICE: 'Stateless Service',
  SERVICE_TYPE_EXTERNALSERVICE: 'External Service',
  SERVICE_TYPE_STATEFULSERVICE_SCAP: 'Stateful service',
  SERVICE_TYPE_STATELESSSERVICE_SCAP: 'Stateless service',
  SERVICE_TYPE_EXTERNALSERVICE_SCAP: 'External service',
  STATEFUL_SERVICE_DESC: 'Create a Service and a StatefulSet.',
  STATELESS_SERVICE_DESC: 'Create a Service and a Deployment.',

  SPECIFY_WORKLOAD_DESC:
    'Create a Service by using one or more existing workloads.',
  SERVICE_PORTS_DESC: 'Set the container ports and Service ports.',
  SELECT_WORKLOAD_DESC: 'Use labels of a workload as the selector.',

  SPECIFY_NODE_DESC:
    'Specify a node that needs to be associated with the service.',

  INTERNAL_DOMAIN_NAME_SCAP: 'Internal domain name',

  MAXIMUM_STICKINESS_DURATION_DESC:
    'Set a maximum stickiness duration. The value range is 0 to 86400 and the default value is 10800.',

  // Services
  WORKLOAD_SELECTOR: 'Workload Selector',
  UNKNOWN_SERVICE_TYPE: 'Unknown Service Type',
  HEADLESS: 'Headless',
  EXTERNALNAME: 'ExternalName',
  EXTERNAL_SERVICE_ADDRESS: 'External Service Address',
  EXTERNAL_SERVICE_ADDRESS_DESC:
    'Enter the domain name of an external Service.',
  UNKNOWN: 'Unknown',
  EXTERNALNAME_EXAMPLE: 'Example: ',
  PORT_PL: 'Ports',
  ENDPOINT: 'Endpoint',
}
