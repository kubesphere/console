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
  ROUTE_DESC: 'An ingress provides a way to aggregate services. You can expose the internal services outside the cluster through an externally accessible IP address.',
  PREREQUESTS_FOR_USE_ROUTE_Q: 'What are the prerequisites for using ingresses?',
  PREREQUESTS_FOR_USE_ROUTE_A: 'To use ingresses, you need to contact the project administrator to set the gateway for the project.',
  ACCESS_TYPES_OF_ROUTE_Q: 'What are the external access modes of ingresses?',
  ACCESS_TYPES_OF_ROUTE_A: 'KubeSphere ingresses support the NodePort and LoadBalancer external access modes.',
  ROUTE_PL: 'Ingresses',
  // List
  GATEWAY_ADDRESS_TCAP: 'Dirección del gateway',
  ROUTE_EMPTY_DESC: 'Please create an ingress.',
  // List > Create > Basic Information
  // List > Create > Routing Rules
  ADD_ROUTING_RULE_DESC: 'Agregar una regla de ruta para asignar un nombre de dominio a un servicio.',
  ADD_ROUTING_RULE: 'Agregar regla de ruta',
  ROUTING_RULE_EMPTY_DESC: 'Please add at least one routing rule.',
  PATH_EMPTY_DESC: 'Please add at least one path.',
  AUTO_GENERATE_TCAP: 'Autogenerar',
  DOMAIN_NAME_TCAP: 'Domain Name',
  DOMAIN_NAME_EMPTY_DESC: 'Ingrese un nombre de dominio',
  INVALID_DOMAIN_DESC: 'Invalid domain name',
  INVALID_PATH_DESC: 'Establezca una ruta correcta',
  MODE_TCAP: 'Modo',
  PATH_PL: 'Rutas',
  PATH_SERVICE_TIP: 'Selecciona un servicio',
  SET_ROUTING_RULES: 'Establecer regla de ruta',
  SPECIFY_DOMAIN_TCAP: 'Especificar dominio',
  NO_GATEWAY_DESC: 'Para usar la generación automática, comuníquese con el administrador del proyecto para configurar el método de acceso a la puerta de enlace en la configuración avanzada del proyecto.',
  PATH: 'Ruta',
  PROTOCOL: 'Protocolo',
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
  ROUTE_LOW: 'ingress'
};