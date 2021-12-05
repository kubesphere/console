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
  'Add Path': 'Agregar ruta',
  'Auto Generate': 'Autogenerar',
  VISIT: 'Haz clic para visitar',
  'Create Route': 'Crear ruta',
  EDIT_RULES: 'Editar reglas',
  PATH_SI: 'Ruta',
  Route: 'Ruta',
  ROUTE_ANNOTATION_DESC: 'Puedes definir el comportamiento de la ruta agregando annotations a la ruta. Consulta <a href="https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/" target="_blank">Annotations</a> para obtener una lista detallada de las annotations disponibles.',
  RULE_SETTING_MODE_AUTO: 'Al configurar el acceso DNS y cambiar el nombre de dominio a &ltService name&gt + &ltProject name&gt + &ltGateway address&gt + nip.io, podrás acceder al servicio a través de &ltService name&gt.&ltProject name&gt.&ltGateway address&gt.nip.io:&ltNodePort&gt. <br/>Asegúrate de estar en un entorno de red capaz de acceder a la dirección de la puerta de enlace.',
  RULE_SETTING_MODE_SPECIFY: 'Especifique un nombre de dominio personalizado y use el archivo de hosts local o un servidor DNS para resolver el nombre de dominio en la dirección IP de la puerta de enlace.',
  GATEWAY_SERVICE_MESH_STATUS_ON: 'On',
  GATEWAY_SERVICE_MESH_STATUS_OFF: 'Off',
  INGRESS_CONTROLLER_NODEPORT_DESC: 'Si el gateway está habilitado, el sistema asignará automáticamente números de puerto de http y https. Las rutas de aplicación pueden acceder a los servicios a través del proxy inverso.',
  INGRESS_CONTROLLER_LOADBALANCER_DESC: 'Para usar un LoadBalancer de QingCloud como gateway, primero implementa el complemento QingCloud Cloud Controller Manager.',
  UNABLE_CREATE_ROUTE_TIP: 'No se puede crear la ruta de la aplicación puesto que la dirección de gateway disponible no se encuentra en el proyecto actual.'
};