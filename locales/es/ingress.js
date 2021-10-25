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
  ADD_ANNOTATION: 'Añadir annotation',
  ADD_PATH_TCAP: 'Agregar ruta',
  PATH_EMPTY_DESC: 'Please add at least one path.',
  AUTO_GENERATE_TCAP: 'Autogenerar',
  ADD_ROUTING_RULE: 'Agregar regla de ruta',
  EDIT_ROUTING_RULES: 'Edit Routing Rules',
  'Add Path': 'Agregar ruta',
  'Auto Generate': 'Autogenerar',
  VISIT: 'Haz clic para visitar',
  'Create Route': 'Crear ruta',
  EDIT_ANNOTATIONS: 'Edit Annotations',
  EDIT_RULES: 'Editar reglas',
  GATEWAY_ADDRESS_TCAP: 'Dirección del gateway',
  GATEWAY_ADDRESS_SCAP: 'Gateway address',
  GATEWAY_IP_ADDRESS: 'IP del gateway',
  GATEWAY_ACCESS_MODE: 'Tipo de gateway',
  DOMAIN_NAME_TCAP: 'Domain Name',
  DOMAIN_NAME_VALUE: 'Domain Name: {value}',
  INVALID_DOMAIN_DESC: 'Invalid domain name',
  INVALID_PATH_DESC: 'Establezca una ruta correcta',
  PATH_EXIST: 'PATH is duplicated, please re-enter。',
  MODE_TCAP: 'Modo',
  PATH_PL: 'Rutas',
  PATH_SI: 'Ruta',
  PATH_VALUE: 'Ruta: {value}',
  ADD_ROUTING_RULE_DESC:
    'Agregar una regla de ruta para asignar un nombre de dominio a un servicio.',
  ROUTING_RULE_EMPTY_DESC: 'Please add at least one routing rule.',
  DOMAIN_NAME_EMPTY_DESC: 'Ingrese un nombre de dominio',
  PATH_SERVICE_TIP: 'Selecciona un servicio',
  Route: 'Ruta',
  ROUTE: 'Ruta',
  ROUTE_PL: 'Routes',
  ROUTE_LOW: 'Route',
  ROUTING_RULES: 'Reglas de ruta',
  RULES: 'Reglas',
  SET_ROUTING_RULES: 'Establecer regla de ruta',
  SPECIFY_DOMAIN_TCAP: 'Especificar dominio',
  UNABLE_TO_ACCESS: 'Unable to access Service',
  ROUTE_DESC:
    'Una ruta proporciona una forma de agregar servicios, y puede exponer los servicios internos del clúster al exterior a través de una dirección IP accesible desde el exterior.',
  ROUTE_EMPTY_DESC:
    'Una ruta proporciona una forma de agregar servicios, y puede exponer los servicios internos del clúster al exterior a través de una dirección IP accesible desde el exterior.',
  ROUTE_ANNOTATION_DESC:
    'Puedes definir el comportamiento de la ruta agregando annotations a la ruta. Consulta <a href="https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/" target="_blank">Annotations</a> para obtener una lista detallada de las annotations disponibles.',
  RULE_SETTING_MODE_AUTO:
    'Al configurar el acceso DNS y cambiar el nombre de dominio a &ltService name&gt + &ltProject name&gt + &ltGateway address&gt + nip.io, podrás acceder al servicio a través de &ltService name&gt.&ltProject name&gt.&ltGateway address&gt.nip.io:&ltNodePort&gt. <br/>Asegúrate de estar en un entorno de red capaz de acceder a la dirección de la puerta de enlace.',
  RULE_SETTING_MODE_SPECIFY:
    'Especifique un nombre de dominio personalizado y use el archivo de hosts local o un servidor DNS para resolver el nombre de dominio en la dirección IP de la puerta de enlace.',
  INGRESS_CONTROLLER_NODEPORT_DESC:
    'Si el gateway está habilitado, el sistema asignará automáticamente números de puerto de http y https. Las rutas de aplicación pueden acceder a los servicios a través del proxy inverso.',
  INGRESS_CONTROLLER_LOADBALANCER_DESC:
    'Para usar un LoadBalancer de QingCloud como gateway, primero implementa el complemento QingCloud Cloud Controller Manager.',
  NO_GATEWAY_DESC:
    'Para usar la generación automática, comuníquese con el administrador del proyecto para configurar el método de acceso a la puerta de enlace en la configuración avanzada del proyecto.',
  UNABLE_CREATE_ROUTE_TIP:
    'No se puede crear la ruta de la aplicación puesto que la dirección de gateway disponible no se encuentra en el proyecto actual.',
  GATEWAY_APPLICATION_GOVERNANCE_TIP:
    'Necesitas habilitar Application Governance si deseas utilizar la función de Tracing. Una vez que Application Governance esté habilitado, verifica si se ha agregado una annotation como "nginx.ingress.kubernetes.io/service-upstream: true" para la ruta de la aplicación si la ruta es inaccesible. Si no existe el annotation, agrégalo.',
  UNABLE_TO_ACCESS_TIP:
    '● Asegúrate de que el nombre de dominio establecido pueda resolverse en la dirección IP del portal de acceso. <br/>Si se encuentra en un entorno de nube privada, modifica el archivo de host local y luego accede a través de &ltDomain name&gt:&ltNodePort&gt. <br/> ● Al configurar el acceso DNS, modifica el nombre de dominio a &ltHostname&gt.&ltGateway address&gt.nip.io, y luego acceda al servicio a través de &ltHostname&gt.&ltGateway address&gt.nip.io:&ltNodePort&gt. <br/> ● Si el acceso está bloqueado cuando se usa el nombre de dominio, confirma si tu nombre de dominio existe y se ha registrado.',
  PREREQUESTS_FOR_USE_ROUTE_Q:
    '¿Cuales son los requisitos para poder usar rutas?',
  PREREQUESTS_FOR_USE_ROUTE_A:
    'To use a route, the project administrator needs to set the gateway for the current project.',
  ACCESS_TYPES_OF_ROUTE_Q: '¿Qué tipos de acceso admite la ruta?',
  ACCESS_TYPES_OF_ROUTE_A:
    'Las rutas de KubeSphere admiten nombres de dominio personalizados (HostName) y así como wildcards DNS.',

  // Route Detail Page
  ROUTE_PATH_VALUE: 'Path: <strong>{value}</strong>',
  ROUTE_SERVICE_VALUE: 'Servicio: <strong>{value}</strong>',
  ROUTE_PORT_VALUE: 'Port: <strong>{value}</strong>',
  ACCESS_SERVICE: 'Access Service',
}
