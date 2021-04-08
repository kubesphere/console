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
  'Access Method': 'Access Method',
  'Access Type': 'Access Type',
  'Add Route Rule': 'Add Route Rule',
  'Add Selector': 'Add Selector',
  'Associated Application': 'Associated Application',
  Auto: 'Auto',
  'Automatically assign Service IP': 'Automatically assign Service IP',
  'Commonly included tags in the current workloads':
    'Commonly included tags in the current workloads',
  'Container Port': 'Container Port',
  'Create Service': 'Create Service',
  'Create service by specifying workloads':
    'Create service by specifying workloads',
  'Create service by Yaml': 'Create service by Yaml',
  Creating: 'Creating',
  'Creation failed, please delete and try again':
    'Creation failed, please delete and try again',
  'Custom Creation': 'Custom Creation',
  'Delete Service': 'Delete Service',
  'Do not assign Service IP': 'Do not assign Service IP',
  'Edit Internet Access': 'Edit Internet Access',
  'Edit Service': 'Edit Service',
  'Enable Sticky Session': 'Enable Sticky Session',
  'External Address': 'External Address',
  'External Service': 'External Service',
  'Internal access': 'Internal access',
  'Invalid port': 'Invalid port',
  'Language Type': 'Language Type',
  'LoadBalancer IP': 'LoadBalancer IP',
  'Map Services outside the cluster': 'Map Services outside the cluster',
  'Maximum Session Sticky Time (s)': 'Maximum Session Sticky Time (s)',
  'No related resources found with current service(s)':
    'No related resources found with current service(s)',
  'Node Port': 'Node Port',
  'Node Port(s)': 'Node Port(s)',
  'Not Associate': 'Not Associate',
  'Path is Required': 'Path is Required',
  'Please input ExternalName': 'Please input ExternalName',
  'Please input ports': 'Please input ports',
  'Please input selectors that have corresponding workloads':
    'Please input selectors that have corresponding workloads',
  'Please input service name': 'Please input service name',
  'Please input valid Selector': 'Please input valid Selector',
  'Please select a workload': 'Please select a workload',
  'Please select Service': 'Please select Service',
  Ports: 'Ports',
  routes: 'routes',
  Selector: 'Selector',
  selector: 'selector',
  'Service Access': 'Service Access',
  'Service Mesh': 'Service Mesh',
  'Service Name': 'Service Name',
  'Service Port': 'Service Port',
  'Service Type': 'Service Type',
  services: 'services',
  'Simple Service': 'Simple Service',
  'Specify Workload': 'Specify Workload',
  'Specify Node': 'Specify Node',
  'Specify Workloads': 'Specify Workloads',
  'Stateful Service': 'Stateful Service',
  'Stateless Service': 'Stateless Service',
  'Sure to delete the service(s)?': 'Sure to delete the service(s)?',
  'Target Port': 'Target Port',
  'The current selector': 'The current selector',
  'The maximum session sticky time is 10800s (3 hours).':
    'The maximum session sticky time is 10800s (3 hours).',
  'Virtual IP': 'Virtual IP',

  SERVICE_EXTERNAL_NAME_DESC:
    'Map the service to the contents of the externalName field by returning a CNAME record with its value.',
  TOTAL_WORKLOAD: '{ count } workloads in total',

  SERVICE_SELECTOR_AFFECT_1: '',
  SERVICE_SELECTOR_AFFECT_2: ' affect {count} workloads',

  SERVICE_NAME_DESC:
    'It can only contain lowercase letters, numbers and hyphens("-"), and must begin with a lowercase letter, ending with a number or lowercase letter. The value can contain a maximum of 63 characters.',
  SERVICE_DESC:
    'A Service is an abstraction that defines a logical collection of Pods and a strategy for accessing them.',
  SERVICE_CREATE_DESC:
    'A Service is an abstraction that defines a logical collection of Pods and a strategy for accessing them. You can select the Service type or how a Service is created. KubeSphere supports both stateful and stateless Services and Services can be created through codes or artifacts.',

  SERVICES_BASEINFO_DESC:
    'The name and description of the service need to be provided to create the service. The service name cannot be the same as the existing service name under the same project.',
  SERVICES_SETTINGS_DESC:
    'Service settings define how to access an existing workload.',
  SERVICES_INTERNET_ACCESS_DESC: 'Expose the service outside of the cluster.',

  VIRTUAL_IP_TITLE:
    'Virtual IP: Access the service through the internal IP of the cluster',
  VIRTUAL_IP_DESC:
    'Based on the unique IP generated by the cluster. The IP can be used to access the service inside the cluster.',
  HEADLESS_SELECTOR_TITLE:
    'Headless (selector): Direct access to the service through the endpoint IP of the service inside the cluster',
  HEADLESS_SELECTOR_DESC:
    'The cluster will not create an IP for the service. Instead, clients within the cluster access it through its endpoints directly. For example, services that need to distinguish master from slave.',
  HEADLESS_EXTERNAL_NAME_TITLE:
    'Headless (externalname): Map addresses outside the cluster to visit',
  HEADLESS_EXTERNAL_NAME_DESC: 'Map external services to a cluster or project.',

  ACCESS_NONE_TIP: 'Make the service accessible internally only',
  ACCESS_NODEPORT_TIP: 'Expose the service on each Node’s IP at a static port',
  ACCESS_LOADBALANCER_TIP:
    'Expose the service externally using the cloud provider’s load balancer',

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
  SERVICE_SIMPLE_DESC: 'Create a service from an existing pods group',
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

  SERVISE_SIMPLE_DESC: 'Create a service with existing Pods.',
  SERVICE_PORTS_DESC:
    'Set the port to expose the container image and the service port.',
  SPECIFY_WORKLOAD_DESC:
    'Specify a workload that needs to be associated with the service.',

  SPECIFY_NODE_DESC:
    'Specify a node that needs to be associated with the service.',

  EIP_POOL_DESC: 'Access method within the cluster (DNS)',

  SERVICE_SESSION_STICKY_DESC: 'Must be greater than 0 and less than 86400',
}
