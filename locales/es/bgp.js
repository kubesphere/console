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
  'BGP Configuration': 'Configuración BGP',
  'BGP Configurations': 'Configuración BGP',
  'Router ID': 'ID de enrutador',
  'Listen Port': 'Puerto de escucha',
  'Add BGP Peer': 'Agregar vecino BGP',
  'BGP Peers': 'Vecinos BGP',
  'Neighbor ASN': 'ASN vecino',
  'Neighbor IP Address': 'Dirección IP del vecino',
  'Please input Neighbor ASN': 'Ingrese ASN vecino',
  'Please input neighbor ip address': 'Ingrese la dirección IP del vecino',
  'Edit BGP Global Config': 'Editar configuración global de BGP',
  'Please input ASN': 'Introduzca ASN',
  'Please input router id': 'Ingrese la identificación del enrutador',
  'Invalid router id': 'ID de enrutador ilegal',
  'Please input listen port': 'Introduzca el puerto de escucha',

  BGP_CONFIG_DESC:
    'BGP es un protocolo de enrutamiento dinámico basado en el protocolo TCP, que se utiliza principalmente para intercambiar información de enrutamiento e información de accesibilidad de la red entre diferentes dominios autónomos. Antes de usar BGP para sincronizar rutas, debe configurar el Número de sistema autónomo (ASN) y la ID del enrutador que usa el clúster, y agregar vecinos BGP. Al mismo tiempo, también debe agregar vecinos BGP del nodo del clúster en el enrutador. ',
  ASN_DESC:
    'AS se refiere a una red IP con la misma estrategia de enrutamiento bajo la jurisdicción de una entidad. A cada AS en la red BGP se le asigna un número de AS único, que se utiliza para distinguir diferentes AS. ',
}
