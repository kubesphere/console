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
  'Set Replicas': 'Número fijo de copias',
  SPECIFY_REPLICAS: 'Specify Replicas',
  SPECIFY_WEIGHTS: 'Specify Weights',
  SPECIFY_WEIGHTS_DESC:
    'El número total de copias establecido se asignará a los grupos seleccionados de acuerdo con los pesos establecidos, y las copias de los grupos no disponibles se migrarán automáticamente a los grupos disponibles.',
  SPECIFY_REPLICAS_DESC:
    'Especifique claramente la cantidad de réplicas que se implementarán para cada clúster.',
  'Total Replicas Number': 'Número total de copias',
  WEIGHT: 'Peso',
  TOTAL_REPLICAS: 'Número total de copias',
  ENTER_POSITIVE_INTEGER_DESC: 'La entrada de copia es ilegal',
  TOTAL_REPLICAS_EMPTY_DESC: 'Ingrese el número total de copias',
  'Storage Function Manage':
    'Gestión de la función de volumen de almacenamiento',
  'Volume Clone': 'Clon de volumen de almacenamiento',
  Volume_Clone_Des: 'Crea un volumen de almacenamiento idéntico.',
  Volume_SnapShot_Des:
    'Cree una instantánea del volumen de almacenamiento, que se puede utilizar para crear otros volúmenes de almacenamiento.',
  'Volume Expansion': 'Expansión del volumen de almacenamiento',
  Volume_Expansion_Des:
    'Aumente la capacidad del volumen de almacenamiento. La capacidad del volumen de almacenamiento no se puede reducir en la consola porque se pueden perder datos.',
}
