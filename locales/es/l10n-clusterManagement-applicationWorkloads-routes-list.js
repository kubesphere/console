/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Banner
  ROUTE_DESC:
    'Una ruta proporciona una forma de agregar servicios, y puede exponer los servicios internos del clúster al exterior a través de una dirección IP accesible desde el exterior.',
  PREREQUESTS_FOR_USE_ROUTE_Q: '¿Cuales son los requisitos para poder usar rutas?',
  PREREQUESTS_FOR_USE_ROUTE_A:
    'To use a route, the project administrator needs to set the gateway for the current project.',
  ACCESS_TYPES_OF_ROUTE_Q: '¿Qué tipos de acceso admite la ruta?',
  ACCESS_TYPES_OF_ROUTE_A:
    'Las rutas de KubeSphere admiten nombres de dominio personalizados (HostName) y así como wildcards DNS.',
  ROUTE_PL: 'Routes',
  ROUTE_SETTING_PL: 'Application routing tools',
  // List
  GATEWAY_ADDRESS_TCAP: 'Dirección del gateway',
  ROUTE_EMPTY_DESC:
    'Una ruta proporciona una forma de agregar servicios, y puede exponer los servicios internos del clúster al exterior a través de una dirección IP accesible desde el exterior.',
  // List > Create > Basic Information
  // List > Create > Routing Rules
  ADD_ROUTING_RULE_DESC:
    'Agregar una regla de ruta para asignar un nombre de dominio a un servicio.',
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
  NO_GATEWAY_DESC:
    'Para usar la generación automática, comuníquese con el administrador del proyecto para configurar el método de acceso a la puerta de enlace en la configuración avanzada del proyecto.',
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
  ROUTE_LOW: 'Route',
};
