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
  'Add Annotation': 'Añadir annotation',
  'Add Path': 'Agregar ruta',
  'Auto Generate': 'Autogenerar',
  'Click to visit': 'Haz clic para visitar',
  'Create Route': 'Crear ruta',
  'Edit Annotations': 'Editar annotations',
  'Edit Rules': 'Editar reglas',
  'Gateway Address': 'Dirección del gateway',
  'Gateway IP': 'IP del gateway',
  'Gateway Type': 'Tipo de gateway',
  HostName: 'HostName',
  'Invalid host': 'Host inválido',
  'Invalid paths': 'Rutas inválidas',
  Mode: 'Modo',
  Paths: 'Rutas',
  'Please add at least one routing rule.':
    'Agrega al menos una regla de enrutamiento.',
  'Please input Hostname': 'Introduce el nombre de host',
  'Please select a service': 'Selecciona un servicio',
  Route: 'Ruta',
  'Route Rules': 'Reglas de ruta',
  Rules: 'Reglas',
  'Set Route Rule': 'Establecer regla de ruta',
  'Specify Domain': 'Especificar dominio',
  'Unable to access': 'No es posible acceder',
  ROUTE_DESC:
    'Una ruta proporciona una forma de agregar servicios, y puede exponer los servicios internos del clúster al exterior a través de una dirección IP accesible desde el exterior.',
  ROUTE_CREATE_DESC:
    'Una ruta proporciona una forma de agregar servicios, y puede exponer los servicios internos del clúster al exterior a través de una dirección IP accesible desde el exterior.',
  ROUTE_ANNOTATION_DESC:
    'Puedes definir el comportamiento de la ruta agregando annotations a la ruta. Consulta <a href="https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/" target="_blank">Annotations</a> para obtener una lista detallada de las annotations disponibles.',
  RULE_SETTING_MODE_AUTO:
    'Al configurar el acceso DNS y cambiar el nombre de dominio a {$hostname} + {$gateway address} + nip.io, podrás acceder al servicio a través de {$hostname}.{$gateway address} .nip.io:{$NodePort}. <br/>Asegúrate de estar en un entorno de red capaz de acceder a la dirección de la puerta de enlace.',
  RULE_SETTING_MODE_SPECIFY:
    'Asegúrate de que el nombre de dominio establecido pueda resolverse en la dirección IP del portal de acceso. <br/>Si se encuentra en un entorno de nube privada, modifica el archivo de host local y luego accede a través de {$domain name}:{$node port}.',
  GATEWAY_SERVICE_MESH_STATUS_ON: 'Activado',
  GATEWAY_SERVICE_MESH_STATUS_OFF: 'Desactivado',
  INGRESS_CONTROLLER_NODEPORT_DESC:
    'Si el gateway está habilitado, el sistema asignará automáticamente números de puerto de http y https. Las rutas de aplicación pueden acceder a los servicios a través del proxy inverso.',
  INGRESS_CONTROLLER_LOADBALANCER_DESC:
    'Para usar un LoadBalancer de QingCloud como gateway, primero implementa el complemento QingCloud Cloud Controller Manager.',
  NO_INTERNET_ACCESS_TIP:
    'La dirección de gateway no se encuentra en el proyecto actual, por lo que no puede usar el modo generado automáticamente. Ponte en contacto con el administrador de tu proyecto para activarlo en <strong>Acceso a Internet</strong> .',
  UNABLE_CREATE_ROUTE_TIP:
    'No se puede crear la ruta de la aplicación puesto que la dirección de gateway disponible no se encuentra en el proyecto actual.',
  GATEWAY_APPLICATION_GOVERNANCE_TIP:
    'Necesitas habilitar Application Governance si deseas utilizar la función de Tracing. Una vez que Application Governance esté habilitado, verifica si se ha agregado una annotation como "nginx.ingress.kubernetes.io/service-upstream: true" para la ruta de la aplicación si la ruta es inaccesible. Si no existe el annotation, agrégalo.',
  UNABLE_TO_ACCESS_TIP:
    '● Asegúrate de que el nombre de dominio establecido pueda resolverse en la dirección IP del portal de acceso. <br/>Si se encuentra en un entorno de nube privada, modifica el archivo de host local y luego accede a través de {$domain name}:{$node port}. <br/> ● Al configurar el acceso DNS, modifica el nombre de dominio a {$hostname} + {$gateway address} + nip.io, y luego acceda al servicio a través de {$hostname}.{$gateway address} .nip.io:{$NodePort}. <br/> ● Si el acceso está bloqueado cuando se usa el nombre de dominio, confirma si tu nombre de dominio existe y se ha registrado.',
  PREREQUESTS_FOR_USE_ROUTE_Q:
    '¿Cuales son los requisitos para poder usar rutas?',
  PREREQUESTS_FOR_USE_ROUTE_A:
    'Para usar la ruta, el administrador debe configurar el acceso a Internet para el proyecto actual.',
  ACCESS_TYPES_OF_ROUTE_Q: '¿Qué tipos de acceso admite la ruta?',
  ACCESS_TYPES_OF_ROUTE_A:
    'Las rutas de KubeSphere admiten nombres de dominio personalizados (HostName) y así como wildcards DNS.',
}
