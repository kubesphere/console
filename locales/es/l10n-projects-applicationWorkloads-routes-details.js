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
  // Details
  // Resource Status
  DOMAIN_NAME_VALUE: 'Domain Name: {value}',
  PATH_VALUE: 'Ruta: {value}',
  RULES: 'Reglas',
  ROUTE_PATH_VALUE: 'Path: <strong>{value}</strong>',
  ROUTE_SERVICE_VALUE: 'Servicio: <strong>{value}</strong>',
  ROUTE_PORT_VALUE: 'Port: <strong>{value}</strong>',
  ACCESS_SERVICE: 'Access Service',
  UNABLE_TO_ACCESS: 'Unable to access service',
  UNABLE_TO_ACCESS_TIP: '● Asegúrate de que el nombre de dominio establecido pueda resolverse en la dirección IP del portal de acceso. <br/>Si se encuentra en un entorno de nube privada, modifica el archivo de host local y luego accede a través de &ltDomain name&gt:&ltNodePort&gt. <br/> ● Al configurar el acceso DNS, modifica el nombre de dominio a &ltHostname&gt.&ltGateway address&gt.nip.io, y luego acceda al servicio a través de &ltHostname&gt.&ltGateway address&gt.nip.io:&ltNodePort&gt. <br/> ● Si el acceso está bloqueado cuando se usa el nombre de dominio, confirma si tu nombre de dominio existe y se ha registrado.',
  CERTIFICATE_VALUE: 'Certificate: {value}'
};