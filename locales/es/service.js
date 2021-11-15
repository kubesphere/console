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
  ' has no corresponding workload.':
    'no tiene carga de trabajo correspondiente.',
  ACCESS_TYPE: 'Tipo de acceso',
  INTERNAL_ACCESS_MODE: 'Internal Access Mode',
  'Add Route Rule': 'Agregar regla de ruta',
  'Add Selector': 'Agregar selector',
  'Associated Application': 'Solicitud asociada',
  AUTO_REFRESH: 'Auto',
  'Automatically assign Service IP':
    'Asigna automáticamente una IP de servicio',
  'Commonly included tags in the current workloads':
    'Etiquetas comúnmente incluidas en las cargas de trabajo actuales',
  CONTAINER_PORT: 'Puerto de contenedores',
  CONTAINER_PORT_SCAP: 'Container port',
  SERVICE_PORT_SCAP: 'Service port',
  CONTAINER_PORT_VALUE: 'Puerto de contenedores: {value}',
  CREATE_SERVICE: 'Crear servicio',
  'Create Service': 'Crear servicio',
  'Create service by specifying workloads':
    'Crear servicio especificando carga de trabajo',
  'Create service by Yaml': 'Crear servicio por Yaml',
  Creating: 'Creando',
  'Creation failed, please delete and try again':
    'Creación fallida, por favor, elimínela e intente de nuevo',
  CUSTOM_SERVICE: 'Custom Service',
  CUSTOMIZE_SERVICE: 'Customize Service',
  'Delete Service': 'Eliminar servicio',
  'Do not assign Service IP': 'No asignar IP de servicio',
  EDIT_EXTERNAL_ACCESS: 'Editar acceso a Internet',
  EDIT_MONITORING_EXPORTER: 'Edit Monitoring Exporter',
  EDIT_SERVICE: 'Servicio de edición',
  STICKY_SESSION: 'Sticky Session',
  'External Address': 'Dirección Externa',
  EXTERNAL_SERVICE: 'Servicio externo',
  EXTERNAL_IP_ADDRESS: 'External IP Address',
  EXTERNAL_IP_ADDRESS_SCAP: 'External IP address',
  'External Service': 'Servicio externo',
  'Internal access': 'Acceso interno',
  INVALID_PORT_DESC: 'Please enter a valid port number.',
  INVALID_PORT: 'Puerto inválido',
  LANGUAGE_TYPE_VALUE: 'Tipo de idioma: {value}',
  ARTIFACT_TYPE_VALUE: 'Artifact Type: {value}',
  'LoadBalancer IP': 'IP del balanceador',
  'Map Services outside the cluster': 'Servicios de mapas fuera del clúster',
  MAXIMUM_STICKINESS_DURATION: 'Tiempo máximo de sesión (s)',
  NO_SERVICE_RELATED_RESOURCE_DESC:
    'No se encontraron recursos relacionados con los servicios actuales',
  NO_WORKLOAD_RELATED_RESOURCE_DESC:
    'No resource related to the workload is found.',
  'Node Port': 'Puerto de nodo',
  'Node Port(s)': 'Puerto(s) de nodo',
  'Not Associate': 'No asociado',
  'Path is Required': 'La ruta es obligatoria',
  EXTERNAL_SERVICE_ADDRESS_EMPTY_DESC: 'Please enter an ExternalName.',
  ENTER_PORT_NUMBER: 'Please enter a port number.',
  'Please input ExternalName': 'Por favor introduce el ExternalName',
  PORT_EMPTY: 'Por favor introduce puertos',
  'Please input selectors that have corresponding workloads':
    'Introduce los selectores que tienen las cargas de trabajo correspondientes',
  'Please input service name': 'Por favor introduce el nombre del servicio',
  ENTER_SELECTOR_TIP: 'Please set a workload selector.',
  'Please select a workload': 'Por favor selecciona una carga de trabajo',
  'Please select Service': 'Por favor selecciona Servicio',
  Ports: 'Puertos',
  routes: 'rutas',
  selector: 'selector',
  ACCESS_INFORMATION: 'Acceso al servicio',
  'Service Mesh': 'Malla de servicio',
  'Service Name': 'Nombre del Servicio',
  SERVICE_PORT: 'Puerto de servicio',
  SERVICE_PORT_VALUE: 'Puerto de servicio: {value}',
  SERVICE_TYPE_TCAP: 'Tipo de servicio',
  SERVICE_TYPE_DESC: 'Select a Service type.',
  SELECT_SERVICE_TYPE_DESC:
    'Create a stateless or stateful Service, or map a Service to an external Service.',
  APP_SELECT_SERVICE_TYPE_DESC: 'Create a stateless or stateful Service.',
  JAVA: 'Java',
  NODEJS: 'Node.js',
  PYTHON: 'Python',
  BINARY: 'Binary',
  SPECIFY_WORKLOAD: 'Specify Workload',
  SPECIFY_WORKLOAD_TO_CREATE_SERVICE: 'Specify Workload to Create Service',
  EDIT_YAML_TO_CREATE_SERVICE: 'Edit YAML to Create Service',
  CREATE_EXTERNAL_SERVICE: 'Create External Service',
  'Specify Node': 'Especificar nó',
  'Service Type': 'Tipo de servicio',
  'Specify Workload': 'Especificar carga de trabajo',
  SPECIFY_NODE: 'Especificar nó',
  STATEFUL_SERVICE: 'Stateful Service',
  STATELESS_SERVICE: 'Stateless Service',
  'Sure to delete the service(s)?':
    '¿Seguro que quiere eliminar los servicios?',
  'Target Port': 'Puerto destino',
  'The current selector': 'El selector actual',
  NO_WORKLOAD_MATCH_SELECTOR: 'The current selector matches no workload.',
  WORKLOADS_MATCH_SELECTOR_SI:
    'The current selector ({selector}) matches {count} workload.',
  WORKLOADS_MATCH_SELECTOR_PL:
    'The current selector ({selector}) matches {count} workloads.',
  STICKY_SESSION_DESC:
    'Set the system to forward all requests from the same client to the same backend within a specified duration.',
  VIRTUAL_IP: 'IP virtual',
  VIRTUAL_IP_ADDRESS: 'Virtual IP address',
  CREATE_EXTERNAL_SERVICE_DESC:
    'Asigne el servicio al contenido del campo externalName devolviendo un registro CNAME con su valor.',
  TOTAL_WORKLOADS_VALUE: 'Total Workloads: { count }',
  SERVICE_SELECTOR_AFFECT_1: '',
  SERVICE_SELECTOR_AFFECT_2: 'afectar las workload de {count}',
  SERVICE_NAME_DESC:
    'The name can contain only lowercase letters, numbers, and hyphens (-), must start with a lowercase letter, and must end with a lowercase letter or number. The maximum length is 63 characters.',
  SERVICE_DESC:
    'Services provide an abstract way to expose applications running on a Pod as network services.',
  SERVICE_EMPTY_DESC: 'Please create a Service.',
  SERVICES_BASEINFO_DESC:
    'El nombre y la descripción del servicio deben proporcionarse para crear el servicio. El nombre del servicio no puedes ser el mismo que el nombre del servicio existente en el mismo proyecto.',
  SERVICES_SETTINGS_DESC:
    'La configuración del servicio define cómo acceder a una carga de trabajo existente.',
  SERVICE_EXTERNAL_ACCESS_DESC: 'Exponga el servicio fuera del clúster.',
  VIRTUAL_IP_TITLE: 'Virtual IP Address',
  VIRTUAL_IP_DESC:
    'The cluster generates a unique IP address for the Service and the Service can be accessed within the cluster using this IP address.',
  INTERNAL_DOMAIN_NAME: 'Internal Domain Name',
  INTERNAL_DOMAIN_NAME_DESC:
    'The cluster does not generate an IP address for the Service and the Service can be directly accessed using the Endpoint IP address of the Service.',
  HEADLESS_EXTERNAL_NAME_TITLE:
    'Sin cabecera (nombre externo): direcciones de mapas fuera del clúster para visitar',
  HEADLESS_EXTERNAL_NAME_DESC:
    'Asigne servicios externos a un clúster o proyecto.',
  ACCESS_NONE_TIP:
    'Internet access is not supported. The Service can be accessed only within the cluster.',
  ACCESS_NODEPORT_TIP: 'Use a port of the cluster nodes to access the Service.',
  ACCESS_LOADBALANCER_TIP: 'Use a load balancer to access the Service.',
  SERVICE_NODE_PORT_DESC:
    'If your current network is on the same network as the cluster node, you can access it through <Cluster IP address>:<NodePort> or through <Node IP address>:<NodePort>.',
  SERVICE_TYPE: 'Service Type',
  SELECT_SERVICE_TYPE: 'Select Service Type',
  SERVICE_TYPES_Q: 'Tipos de servicio',
  SERVICE_TYPES_A:
    'El servicio se divide en un servicio sin estado (Servicio virtual + Depolyment) y un servicio con estado (Servicio sin cabeza + Statefulset). En un servicio sin estado, las réplicas pueden compartir un volumen, y un servicio con estado debe tener su propio volumen independiente.',
  SCENARIOS_FOR_SERVICES_Q:
    '¿Cuáles son los escenarios de aplicación para servicios sin estado y servicios con estado?',
  SCENARIOS_FOR_SERVICES_A:
    'Los servicios sin estado son útiles para escenarios en los que los datos persistentes no se almacenan localmente y varias instancias responden a solicitudes uniformes (Nginx, Tomcat, etc.). Los servicios con estado son útiles cuando se trata de almacenamiento de datos, subprocesos múltiples o colas (base de datos MySQL, Kafka, Zookeeper, etc.).',
  DELETE_SERVICE_DESC:
    'Está a punto de eliminar los servicios {resource}. ¿Confirma si desea eliminar el recurso asociado?',
  DELETE_SERVICE_DESC_PL:
    'You are about to delete the Services {resource}.<br/>Do you want to also delete the following resources related to the Services?',
  DELETE_SERVICE_DESC_SI:
    'You are about to delete the Service {resource}.<br/>Do you want to also delete the following resource related to the Service?',
  SERVICE_FROM_CODE:
    'Cree un nuevo servicio desde el repositorio de código fuente',
  SERVICE_FROM_ARTIFACT: 'Construye un nuevo servicio a través del artefacto',
  SERVICE_FROM_CODE_DESC:
    'Puedes construir su código existente en una imagen e implementarlo a través de Source to Image.',
  SERVICE_FROM_ARTIFACT_DESC:
    'Puedes construir un artefacto existente en una nueva imagen y completar despliegue.',
  CUSTOMIZE_SERVICE_DESC:
    'Puedes crear un servicio ya sea especificando una carga de trabajo o editando la configuración (Yaml).',
  SERVICE_TYPE_STATEFULSERVICE: 'Servicio de estado',
  SERVICE_TYPE_STATELESSSERVICE: 'Servicio sin estado',
  SERVICE_TYPE_EXTERNALSERVICE: 'Servicio externo',
  SERVICE_TYPE_STATEFULSERVICE_SCAP: 'Stateful service',
  SERVICE_TYPE_STATELESSSERVICE_SCAP: 'Stateless service',
  SERVICE_TYPE_EXTERNALSERVICE_SCAP: 'External service',
  STATEFUL_SERVICE_DESC:
    'Los servicios con estado o stateful se usan para administrar aplicaciones con estado, asegurando un despliegue y escala ordenada y elegante. También proporcionan almacenamiento persistente estable e identificadores de red.',
  STATELESS_SERVICE_DESC:
    'El servicio más utilizado en servicios de contenedores. Define la plantilla del Pod para controlar el estado del Pod, incluidas las actualizaciones continuas y los retrocesos.',
  SPECIFY_WORKLOAD_DESC: 'Crea un servicio con Pods existentes.',
  SERVICE_PORTS_DESC: 'Set the container ports and Service ports.',
  SELECT_WORKLOAD_DESC:
    'Pre-populate the fields with labels of container replicas created by the workloads.',

  SPECIFY_NODE_DESC: 'Especifique um nó que precisa ser associado ao serviço.',

  INTERNAL_DOMAIN_NAME_SCAP: 'Método de acceso dentro del clúster (DNS)',

  // Services
  WORKLOAD_SELECTOR: 'Workload Selector',
  UNKNOWN_SERVICE_TYPE: 'Unknown Service Type',
  MAXIMUM_STICKINESS_DURATION_DESC:
    'Set a maximum stickiness duration. The value range is 0 to 86400 and the default value is 10800.',
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
