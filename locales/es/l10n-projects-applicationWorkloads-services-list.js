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
  SERVICE_TYPES_Q: 'Tipos de servicio',
  SERVICE_TYPES_A: 'El servicio se divide en un servicio sin estado (Servicio virtual + Depolyment) y un servicio con estado (Servicio sin cabeza + Statefulset). En un servicio sin estado, las réplicas pueden compartir un volumen, y un servicio con estado debe tener su propio volumen independiente.',
  SCENARIOS_FOR_SERVICES_Q: '¿Cuáles son los escenarios de aplicación para servicios sin estado y servicios con estado?',
  SCENARIOS_FOR_SERVICES_A: 'Los servicios sin estado son útiles para escenarios en los que los datos persistentes no se almacenan localmente y varias instancias responden a solicitudes uniformes (Nginx, Tomcat, etc.). Los servicios con estado son útiles cuando se trata de almacenamiento de datos, subprocesos múltiples o colas (base de datos MySQL, Kafka, Zookeeper, etc.).',
  // Service List
  SERVICE_TYPE: 'Tipo de servicio',
  SERVICE_LIST: 'Lista',
  SERVICE_TYPE_STATEFULSERVICE: 'Stateful Service',
  SERVICE_TYPE_STATELESSSERVICE: 'Stateless Service',
  SERVICE_TYPE_EXTERNALSERVICE: 'Servicio externo',
  HEADLESS: 'Headless',
  EXTERNALNAME: 'ExternalName',
  // List > Create
  CREATE_SERVICE_DESC: 'Select a service creation method.',
  SELECT_SERVICE_TYPE_DESC: 'Create a stateless or stateful service, or map a service to an external Service.',
  SERVICE_FROM_CODE: 'Cree un nuevo servicio desde el repositorio de código fuente',
  SERVICE_FROM_ARTIFACT: 'Construye un nuevo servicio a través del artefacto',
  SERVICE_FROM_CODE_DESC: 'Puedes construir su código existente en una imagen e implementarlo a través de Source to Image.',
  SERVICE_FROM_ARTIFACT_DESC: 'Puedes construir un artefacto existente en una nueva imagen y completar despliegue.',
  CUSTOMIZE_SERVICE: 'Customize Service',
  CUSTOMIZE_SERVICE_DESC: 'Puedes crear un servicio ya sea especificando una carga de trabajo o editando la configuración (Yaml).',
  // List > Create > Select Service Type > Stateless Service > Pod Settings > Port Settings
  PORT_INPUT_DESC: 'The port name already exists. Please enter another name.',
  PORT_NAME_DESC: 'The port name can contain only lowercase letters, numbers, and hyphens (-) and must begin and end with a lowercase letter or number. The maximum length is 63 characters.',
  // List > Create > Select Service Type > Stateful Service
  // List > Create > Select Service Type > External Service
  CREATE_EXTERNAL_SERVICE_DESC: 'Asigne el servicio al contenido del campo externalName devolviendo un registro CNAME con su valor.',
  CREATE_EXTERNAL_SERVICE: 'Create External Service',
  EXTERNAL_SERVICE_ADDRESS_EMPTY_DESC: 'Please enter an ExternalName.',
  EXTERNAL_SERVICE_ADDRESS: 'External Service Address',
  EXTERNAL_SERVICE_ADDRESS_DESC: 'Enter the domain name of an external Service.',
  // List > Create > Create Service from Source Code
  JAVA: 'Java',
  NODEJS: 'Node.js',
  PYTHON: 'Python',
  LANGUAGE_TYPE_VALUE: 'Tipo de idioma: {value}',
  // List > Create > Create Service from Source Code > Java > Basic Information
  // List > Create > Create Service from Source Code > Java > Build Settings
  // List > Create > Create Service from Source Code > Java > Pod Settings
  // List > Create > Create Service from Source Code > Java > Volume Settings
  // List > Create > Create Service from Source Code > Java > Advanced Settings
  // List > Create > Create Service from Source Code > Node.js > Basic Information
  // List > Create > Create Service from Source Code > Node.js > Build Settings
  // List > Create > Create Service from Source Code > Node.js > Pod Settings
  CONTAINER_SETTINGS: 'Configuración del contenedor',
  // List > Create > Create Service from Source Code > Node.js > Volume Settings
  // List > Create > Create Service from Source Code > Node.js > Advanced Settings
  // List > Create > Create Service from Source Code > Python > Basic Information
  // List > Create > Create Service from Source Code > Python > Build Settings
  // List > Create > Create Service from Source Code > Python > Pod Settings
  // List > Create > Create Service from Source Code > Python > Volume Settings
  // List > Create > Create Service from Source Code > Python > Advanced Settings
  // List > Create > Create Service from Artifact
  ARTIFACT_TYPE_VALUE: 'Artifact Type: {value}',
  // List > Create > Create Service from Artifact > JAR > Basic Information
  // List > Create > Create Service from Artifact > JAR > Build Settings
  // List > Create > Create Service from Artifact > JAR > Pod Settings
  // List > Create > Create Service from Artifact > JAR > Volume Settings
  // List > Create > Create Service from Artifact > JAR > Advanced Settings
  // List > Create > Create Service from Artifact > WAR > Basic Information
  // List > Create > Create Service from Artifact > WAR > Build Settings
  // List > Create > Create Service from Artifact > WAR > Pod Settings
  // List > Create > Create Service from Artifact > WAR > Volume Settings
  // List > Create > Create Service from Artifact > WAR > Advanced Settings
  // List > Create > Create Service from Artifact > Binary > Basic Information
  BINARY: 'Binary',
  // List > Create > Create Service from Artifact > Binary > Build Settings
  // List > Create > Create Service from Artifact > Binary > Pod Settings
  // List > Create > Create Service from Artifact > Binary > Volume Settings
  // List > Create > Create Service from Artifact > Binary > Advanced Settings
  // List > Create > Customize Service > Specify Workload > Basic Information
  SPECIFY_WORKLOAD_TO_CREATE_SERVICE: 'Specify Workload to Create Service',
  EDIT_YAML_TO_CREATE_SERVICE: 'Edit YAML to Create Service',
  SPECIFY_WORKLOAD_DESC: 'Crea un servicio con Pods existentes.',
  // List > Create > Customize Service > Specify Workload > Service Settings
  // List > Create > Customize Service > Specify Workload > Advanced Settings
  // List > Edit Information
  // List > Edit YAML
  // List > Edit Service
  // List > Edit External Access
  // List > Delete
  NO_RELATED_RESOURCE_FOUND: 'No hay recursos relacionados.',
  NO_SERVICE_RELATED_RESOURCE_DESC: 'No se encontraron recursos relacionados con los servicios actuales',
  DELETE_SERVICE_DESC: 'Está a punto de eliminar los servicios {resource}. ¿Confirma si desea eliminar el recurso asociado?',
  DELETE_SERVICE_DESC_PL: 'You are about to delete the Services {resource}.<br/>Do you want to also delete the following resources related to the Services?',
  DELETE_SERVICE_DESC_SI: 'You are about to delete the service {resource}.<br/>Do you want to also delete the following resource related to the service?',
  DELETE_SERVICE: 'Delete Service',
  DELETE_MULTIPLE_SERVICES: 'Delete Multiple Services',
  // Service Topology
  SERVICE_TOPOLOGY: 'Service Topology',
  AUTO_REFRESH: 'Auto',
  POD_COUNT_VALUE: 'Pods: {value}'
};