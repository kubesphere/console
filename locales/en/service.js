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
  ACCESS_METHOD: 'Access Method',
  ACCESS_TYPE: 'Access Type',
  'Add Route Rule': 'Add Route Rule',
  'Add Selector': 'Add Selector',
  'Associated Application': 'Associated Application',
  Auto: 'Auto',
  'Automatically assign Service IP': 'Automatically assign Service IP',
  'Commonly included tags in the current workloads':
    'Commonly included tags in the current workloads',
  CONTAINER_PORT: 'Container Port',
  CREATE_SERVICE: 'Create Service',
  'Create Service': 'Create Service',
  'Create service by specifying workloads':
    'Create service by specifying workloads',
  'Create service by Yaml': 'Create service by Yaml',
  Creating: 'Creating',
  'Creation failed, please delete and try again':
    'Creation failed, please delete and try again',
  CUSTOM_CREATION: 'Custom Creation',
  'Delete Service': 'Delete Service',
  'Do not assign Service IP': 'Do not assign Service IP',
  EDIT_INTERNET_ACCESS: 'Edit Internet Access',
  EDIT_SERVICE: 'Edit Service',
  STICKY_SESSION: 'Sticky Session',
  'External Address': 'External Address',
  'External Service': 'External Service',
  'Internal access': 'Internal access',
  INVALID_PORT_DESC: 'Please enter a valid protocol or port number.',
  INVALID_PORT: 'Invalid port.',
  'Language Type': 'Language Type',
  'LoadBalancer IP': 'LoadBalancer IP',
  'Map Services outside the cluster': 'Map Services outside the cluster',
  MAXIMUM_STICKINESS_DURATION: 'Maximum Stickiness Duration (s)',
  'No related resources found with current service(s)':
    'No related resources found with current service(s)',
  'Node Port': 'Node Port',
  'Node Port(s)': 'Node Port(s)',
  'Not Associate': 'Not Associate',
  'Path is Required': 'Path is Required',
  ENTER_EXTERNALNAME_DESC: 'Please enter an ExternalName.',
  ENTER_PORT_NUMBER: 'Please enter a port number.',
  'Please input ExternalName': 'Please input ExternalName',
  PORT_EMPTY: 'Please set a port.',
  'Please input selectors that have corresponding workloads':
    'Please input selectors that have corresponding workloads',
  'Please input service name': 'Please input service name',
  ENTER_SELECTOR_TIP: 'Please enter a valid selector.',
  'Please select a workload': 'Please select a workload',
  'Please select Service': 'Please select Service',
  Ports: 'Ports',
  routes: 'routes',
  Selector: 'Selector',
  selector: 'selector',
  'Service Access': 'Service Access',
  'Service Mesh': 'Service Mesh',
  'Service Name': 'Service Name',
  SERVICE_PORT: 'Service Port',
  SERVICE_TYPE_TCAP: 'Service Type',
  'Simple Service': 'Simple Service',
  SPECIFY_WORKLOAD: 'Specify Workload',
  'Specify Node': 'Specify Node',
  'Service Type': 'Service Type',
  services: 'services',
  'Specify Workload': 'Specify Workload',
  SPECIFY_NODE: 'Specify Node',
  'Specify Workloads': 'Specify Workloads',
  STATEFUL_SERVICE: 'Stateful Service',
  STATELESS_SERVICE: 'Stateless Service',
  'Sure to delete the service(s)?': 'Sure to delete the service(s)?',
  'Target Port': 'Target Port',
  'The current selector': 'The current selector',
  STICKY_SESSION_DESC: 'The default stickiness duration is 10800s (3 h).',
  VIRTUAL_IP: 'Virtual IP',

  SERVICE_EXTERNAL_NAME_DESC:
    'Map the service to the contents of the externalName field by returning a CNAME record with its value.',
  TOTAL_WORKLOAD: 'Total Workloads: { count }',

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
  SERVICES_INTERNET_ACCESS_DESC: 'Expose the Service outside the cluster.',

  VIRTUAL_IP_TITLE: 'Virtual IP Address',
  VIRTUAL_IP_DESC:
    'The cluster generates a unique IP address for the Service and the Service can be accessed within the cluster using this IP address.',
  HEADLESS_SELECTOR_TITLE: 'Headless (Selector)',
  HEADLESS_SELECTOR_DESC:
    'The cluster does not generate an IP address for the Service and the Service can be directly accessed using the Endpoint IP address of the Service.',
  HEADLESS_EXTERNAL_NAME_TITLE:
    'Headless (externalname): Map addresses outside the cluster to visit',
  HEADLESS_EXTERNAL_NAME_DESC: 'Map external services to a cluster or project.',

  ACCESS_NONE_TIP:
    'Internet access is not supported. The Service can be accessed only within the cluster.',
  ACCESS_NODEPORT_TIP:
    'Access the Service through the port of the cluster node.',
  ACCESS_LOADBALANCER_TIP:
    'Access the Service using a LoadBalancer provided by a cloud provider.',

  SERVICE_NODE_PORT_DESC:
    'If your current network is on the same network as the cluster node, you can access it through the cluster IP address + node port number or through the node IP + node port.',

  SERVICE_TYPE: 'You can create a stateless Service or a stateful Service.',
  SERVICE_TYPES_Q: 'Service Types',
  SERVICE_TYPES_A:
    'Services are divided into stateless Services (Virtual Service + Depolyment) and stateful Services (Headless Service + Statefulset). In a stateless Service, replicas can share one volume, and a stateful Service needs to have its own independent volume.',

  SCENARIOS_FOR_SERVICES_Q:
    'What are the scenarios for stateless Services and stateful Services?',
  SCENARIOS_FOR_SERVICES_A:
    'Stateless Services are useful for scenarios where persistent data is not stored locally and multiple instances respond to uniform requests (Nginx, Tomcat, etc.). Stateful Services are helpful when it comes to data storage, multithreading or queues (MySQL database, Kafka, Zookeeper, etc.).',
  SERVICE_SIMPLE_DESC: 'Create a Service from an existing pods group',
  DELETE_SERVICE_DESC:
    'You are about to delete the service(s) {resource}. Please confirm whether to delete the associated resource?',
  SERVICE_FROM_CODE: 'Build a New Service from Source Code Repository',
  SERVICE_FROM_ARTIFACTS: 'Build a New Service through the Artifact',
  SERVICE_FROM_CODE_DESC:
    'You can build your existing code into an image and deploy it through Source to Image.',
  SERVICE_FROM_ARTIFACTS_DESC:
    'You can build an existing artifact into a new image and complete the deployment.',

  SERVICE_CUSTOM_CREATE:
    'You can create a Service either by specifying a workload or by editing the configuration (Yaml).',

  SERVICE_TYPE_STATEFULSERVICE: 'Stateful Service',
  SERVICE_TYPE_STATELESSSERVICE: 'Stateless Service',
  SERVICE_TYPE_EXTERNALSERVICE: 'External Service',
  STATEFUL_SERVICE_DESC:
    'Stateful services are used to manage stateful applications, ensuring ordered and graceful deployment and scaling. They also provide stable persistent storage and network identifiers.',
  STATELESS_SERVICE_DESC:
    'The most commonly used service in container services. It defines the Pod template to control the Pod status, including rolling updates and rollbacks.',

  SERVISE_SIMPLE_DESC: 'Create a Service with existing Pods.',
  SERVICE_PORTS_DESC:
    'Set the ports to which container images are exposed and the service ports.',
  SPECIFY_WORKLOAD_DESC:
    'Pre-populate the fields with labels of container replicas created by the workloads.',

  SPECIFY_NODE_DESC:
    'Specify a node that needs to be associated with the service.',

  EIP_POOL_DESC: 'Access method within the cluster (DNS)',

  STICKINESS_VALUE_RANGE: 'Value range: 0–86400.',

  // Services
  LABEL_SELECTOR: 'Label Selector',
  NONE: 'None',
  UNKNOWN_SERVICE_TYPE: 'Unknown Service Type',
  HEADLESS: 'Headless',
  EXTERNALNAME: 'ExternalName',
  UNKNOWN: 'Unknown',
  EXTERNALNAME_EXAMPLE: 'Example: ',
  PORTS: 'Ports',
}
