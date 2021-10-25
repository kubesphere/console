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
  WEIGHTS: 'Weights',
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
  STORAGE_MANAGEMENT_SCAP: 'Gestión de la función de volumen de almacenamiento',
  VOLUME_CLONE: 'Clon de volumen de almacenamiento',
  ALLOW_VOLUME_CLONE_DESC: 'Allows users to clone volumes.',
  ALLOW_VOLUME_SNAPSHOT_DESC: 'Allows users to create volume snapshots.',
  'Volume Expansion': 'Expansión del volumen de almacenamiento',
  ALLOW_VOLUME_EXPANSION_DESC:
    'Allows users to extend volumes. Volumes can only be extended and cannot be shrunk.',
}
