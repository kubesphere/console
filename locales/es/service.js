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
  ACCESS_METHOD: 'Método de acceso',
  ACCESS_TYPE: 'Tipo de acceso',
  'Add Route Rule': 'Agregar regla de ruta',
  'Add Selector': 'Agregar selector',
  'Associated Application': 'Solicitud asociada',
  Auto: 'Auto',
  'Automatically assign Service IP':
    'Asigna automáticamente una IP de servicio',
  'Commonly included tags in the current workloads':
    'Etiquetas comúnmente incluidas en las cargas de trabajo actuales',
  CONTAINER_PORT: 'Puerto de contenedores',
  CREATE_SERVICE: 'Crear servicio',
  'Create Service': 'Crear servicio',
  'Create service by specifying workloads':
    'Crear servicio especificando carga de trabajo',
  'Create service by Yaml': 'Crear servicio por Yaml',
  Creating: 'Creando',
  'Creation failed, please delete and try again':
    'Creación fallida, por favor, elimínela e intente de nuevo',
  CUSTOM_CREATION: 'Creacion personalizada',
  'Delete Service': 'Eliminar servicio',
  'Do not assign Service IP': 'No asignar IP de servicio',
  EDIT_INTERNET_ACCESS: 'Editar acceso a Internet',
  EDIT_SERVICE: 'Servicio de edición',
  STICKY_SESSION: 'Sticky Session',
  'External Address': 'Dirección Externa',
  'External Service': 'Servicio externo',
  'Internal access': 'Acceso interno',
  INVALID_PORT_DESC: 'Please enter a valid protocol or port number.',
  INVALID_PORT: 'Puerto inválido',
  'Language Type': 'Tipo de idioma',
  'LoadBalancer IP': 'IP del balanceador',
  'Map Services outside the cluster': 'Servicios de mapas fuera del clúster',
  MAXIMUM_STICKINESS_DURATION: 'Tiempo máximo de sesión (s)',
  'No related resources found with current service(s)':
    'No se encontraron recursos relacionados con los servicios actuales',
  'Node Port': 'Puerto de nodo',
  'Node Port(s)': 'Puerto(s) de nodo',
  'Not Associate': 'No asociado',
  'Path is Required': 'La ruta es obligatoria',
  ENTER_EXTERNALNAME_DESC: 'Please enter an ExternalName.',
  ENTER_PORT_NUMBER: 'Please enter a port number.',
  'Please input ExternalName': 'Por favor introduce el ExternalName',
  PORT_EMPTY: 'Por favor introduce puertos',
  'Please input selectors that have corresponding workloads':
    'Introduce los selectores que tienen las cargas de trabajo correspondientes',
  'Please input service name': 'Por favor introduce el nombre del servicio',
  ENTER_SELECTOR_TIP: 'Please enter a valid selector.',
  'Please select a workload': 'Por favor selecciona una carga de trabajo',
  'Please select Service': 'Por favor selecciona Servicio',
  Ports: 'Puertos',
  routes: 'rutas',
  Selector: 'Selector',
  selector: 'selector',
  'Service Access': 'Acceso al servicio',
  'Service Mesh': 'Malla de servicio',
  'Service Name': 'Nombre del Servicio',
  SERVICE_PORT: 'Puerto de servicio',
  SERVICE_TYPE_TCAP: 'Tipo de servicio',
  SPECIFY_WORKLOAD: 'Specify Workload',
  'Specify Node': 'Especificar nó',
  'Service Type': 'Tipo de servicio',
  services: 'servicios',
  'Simple Service': 'Servicio simple',
  'Specify Workload': 'Especificar carga de trabajo',
  SPECIFY_NODE: 'Especificar nó',
  'Specify Workloads': 'Especificar cargas de trabajo',
  STATEFUL_SERVICE: 'Stateful Service',
  STATELESS_SERVICE: 'Stateless Service',
  'Sure to delete the service(s)?':
    '¿Seguro que quiere eliminar los servicios?',
  'Target Port': 'Puerto destino',
  'The current selector': 'El selector actual',
  STICKY_SESSION_DESC: 'The default stickiness duration is 10800s (3 h).',
  VIRTUAL_IP: 'IP virtual',
  SERVICE_EXTERNAL_NAME_DESC:
    'Asigne el servicio al contenido del campo externalName devolviendo un registro CNAME con su valor.',
  TOTAL_WORKLOAD: 'Total Workloads: { count }',
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
  SERVICES_INTERNET_ACCESS_DESC: 'Exponga el servicio fuera del clúster.',
  VIRTUAL_IP_TITLE: 'Virtual IP Address',
  VIRTUAL_IP_DESC:
    'The cluster generates a unique IP address for the Service and the Service can be accessed within the cluster using this IP address.',
  HEADLESS_SELECTOR_TITLE: 'Headless (Selector)',
  HEADLESS_SELECTOR_DESC:
    'The cluster does not generate an IP address for the Service and the Service can be directly accessed using the Endpoint IP address of the Service.',
  HEADLESS_EXTERNAL_NAME_TITLE:
    'Sin cabecera (nombre externo): direcciones de mapas fuera del clúster para visitar',
  HEADLESS_EXTERNAL_NAME_DESC:
    'Asigne servicios externos a un clúster o proyecto.',
  ACCESS_NONE_TIP:
    'Internet access is not supported. The Service can be accessed only within the cluster.',
  ACCESS_NODEPORT_TIP:
    'Access the Service through the port of the cluster node.',
  ACCESS_LOADBALANCER_TIP:
    'Access the Service using a LoadBalancer provided by a cloud provider.',
  SERVICE_NODE_PORT_DESC:
    'Si su red actual está en la misma red que el nodo del clúster, puedes acceder a ella a través de la dirección IP del clúster + número de puerto del nodo o a través del puerto del nodo IP + nodo.',
  SERVICE_TYPE: 'Puedes crear un servicio sin estado o un servicio con estado.',
  SERVICE_TYPES_Q: 'Tipos de servicio',
  SERVICE_TYPES_A:
    'El servicio se divide en un servicio sin estado (Servicio virtual + Depolyment) y un servicio con estado (Servicio sin cabeza + Statefulset). En un servicio sin estado, las réplicas pueden compartir un volumen, y un servicio con estado debe tener su propio volumen independiente.',
  SCENARIOS_FOR_SERVICES_Q:
    '¿Cuáles son los escenarios de aplicación para servicios sin estado y servicios con estado?',
  SCENARIOS_FOR_SERVICES_A:
    'Los servicios sin estado son útiles para escenarios en los que los datos persistentes no se almacenan localmente y varias instancias responden a solicitudes uniformes (Nginx, Tomcat, etc.). Los servicios con estado son útiles cuando se trata de almacenamiento de datos, subprocesos múltiples o colas (base de datos MySQL, Kafka, Zookeeper, etc.).',
  SERVICE_SIMPLE_DESC:
    'Crear un servicio a partir de un grupo de pods existente',
  DELETE_SERVICE_DESC:
    'Está a punto de eliminar los servicios {resource}. ¿Confirma si desea eliminar el recurso asociado?',
  SERVICE_FROM_CODE:
    'Cree un nuevo servicio desde el repositorio de código fuente',
  SERVICE_FROM_ARTIFACTS: 'Construye un nuevo servicio a través del artefacto',
  SERVICE_FROM_CODE_DESC:
    'Puedes construir su código existente en una imagen e implementarlo a través de Source to Image.',
  SERVICE_FROM_ARTIFACTS_DESC:
    'Puedes construir un artefacto existente en una nueva imagen y completar despliegue.',
  SERVICE_CUSTOM_CREATE:
    'Puedes crear un servicio ya sea especificando una carga de trabajo o editando la configuración (Yaml).',
  SERVICE_TYPE_STATEFULSERVICE: 'Servicio de estado',
  SERVICE_TYPE_STATELESSSERVICE: 'Servicio sin estado',
  SERVICE_TYPE_EXTERNALSERVICE: 'Servicio externo',
  STATEFUL_SERVICE_DESC:
    'Los servicios con estado o stateful se usan para administrar aplicaciones con estado, asegurando un despliegue y escala ordenada y elegante. También proporcionan almacenamiento persistente estable e identificadores de red.',
  STATELESS_SERVICE_DESC:
    'El servicio más utilizado en servicios de contenedores. Define la plantilla del Pod para controlar el estado del Pod, incluidas las actualizaciones continuas y los retrocesos.',
  SERVISE_SIMPLE_DESC: 'Crea un servicio con Pods existentes.',
  SERVICE_PORTS_DESC:
    'Set the ports to which container images are exposed and the service ports.',
  SPECIFY_WORKLOAD_DESC:
    'Pre-populate the fields with labels of container replicas created by the workloads.',

  SPECIFY_NODE_DESC: 'Especifique um nó que precisa ser associado ao serviço.',

  EIP_POOL_DESC: 'Método de acceso dentro del clúster (DNS)',

  // Services
  LABEL_SELECTOR: 'Label Selector',
  NONE: 'None',
  UNKNOWN_SERVICE_TYPE: 'Unknown Service Type',
  STICKINESS_VALUE_RANGE: 'Value range: 0–86400.',
  HEADLESS: 'Headless',
  EXTERNALNAME: 'ExternalName',
  UNKNOWN: 'Unknown',
  EXTERNALNAME_EXAMPLE: 'Example: ',
  PORTS: 'Ports',
}
