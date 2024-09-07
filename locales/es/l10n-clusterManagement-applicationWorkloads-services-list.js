/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Banner
  SERVICE_PL: 'Servicio',
  SERVICE_DESC:
    'Services provide an abstract way to expose applications running on a Pod as network services.',
  // List
  SERVICE_EMPTY_DESC: 'Please create a Service.',
  UNKNOWN: 'Unknown',
  EXTERNAL_ACCESS: 'External Access',
  INTERNAL_ACCESS: 'Internal Access',
  // List > Edit YAML
  // List > Edit Service
  UNKNOWN_SERVICE_TYPE: 'Unknown Service Type',
  // List > Delete
  SERVICE: 'Servicio',
  SERVICE_LOW: 'Service',
  // List > Create
  INTERNAL_ACCESS_MODE: 'Internal Access Mode',
  CREATE_SERVICE: 'Crear servicio',
  // List > Create > Basic Information
  SERVICE_NAME_DESC:
    'The name can contain only lowercase letters, numbers, and hyphens (-), must start with a lowercase letter, and must end with a lowercase letter or number. The maximum length is 63 characters.',
  // List > Create > Service Settings
  VIRTUAL_IP_TITLE: 'Virtual IP Address',
  INTERNAL_DOMAIN_NAME: 'Internal Domain Name',
  CONTAINER_PORT: 'Puerto de contenedores',
  INVALID_PORT: 'Puerto inválido',
  PORT_EMPTY: 'Por favor introduce puertos',
  ENTER_SELECTOR_TIP: 'Please set a workload selector.',
  Ports: 'Puertos',
  SPECIFY_WORKLOAD: 'Specify Workload',
  SELECT_WORKLOAD_DESC:
    'Pre-populate the fields with labels of container replicas created by the workloads.',
  VIRTUAL_IP_DESC:
    'The cluster generates a unique IP address for the Service and the Service can be accessed within the cluster using this IP address.',
  INTERNAL_DOMAIN_NAME_DESC:
    'The cluster does not generate an IP address for the Service and the Service can be directly accessed using the Endpoint IP address of the Service.',
  SERVICE_PORTS_DESC: 'Set the container ports and Service ports.',
  NO_WORKLOAD_MATCH_SELECTOR: 'The current selector matches no workload.',
  WORKLOADS_MATCH_SELECTOR_SI: 'The current selector ({selector}) matches {count} workload.',
  WORKLOADS_MATCH_SELECTOR_PL: 'The current selector ({selector}) matches {count} workloads.',
  WORKLOAD_SELECTOR: 'Workload Selector',
  SERVICE_SETTINGS: 'Configuraciones de servicio',
  // List > Create > Service Settings > Workload Selector > View Details
  TOTAL_WORKLOADS_VALUE: 'Total Workloads: { count }',
  // List > Create > Advanced Settings
  OPENELB_NOT_READY: 'OpenELB is not installed. Please install OpenELB.',
  SESSION_PERSISTENCE: 'Session Persistence',
  MAXIMUM_STICKINESS_DURATION: 'Tiempo máximo de sesión (s)',
  SESSION_PERSISTENCE_DESC:
    'Set the system to forward all requests from the same client to the same pod within a specified duration.',
  SERVICE_EXTERNAL_ACCESS_DESC: 'Exponga el servicio fuera del clúster.',
  ACCESS_NODEPORT_TIP: 'Use a port of the cluster nodes to access the Service.',
  ACCESS_LOADBALANCER_TIP: 'Use a load balancer to access the Service.',
  WORKLOAD_ANNOTATIONS: 'Workload Annotations',
  LABEL_FORMAT_DESC:
    'The key and value of a label can contain only letters, numbers, hyphens (-), underscores (_), and dots (.), and must start and end with a letter or number. The maximum length of each key and each value is 63 characters (if the key contains a domain name, the maximum length is 253 characters).',
};
