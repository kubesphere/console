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
  VOLUME_SNAPSHOT: 'Volume Snapshot',
  VOLUME_SNAPSHOT_PL: 'Volume Snapshots',
  VOLUME_SNAPSHOT_DESC: 'Un snapshot de volumen se refiere a una snapshot de un volumen en un punto de tiempo particular. Se puede utilizar para crear nuevos volúmenes (preestablecer los datos del snapshot) o restaurar un volumen existente a su estado anterior (que se muestra en los snapshots).',
  WHAT_IS_VOLUME_SNAPSHOT_CLASS_Q: 'What is a volume snapshot class?',
  WHAT_IS_VOLUME_SNAPSHOT_CLASS_A: 'A volume snapshot class defines the storage types used to create a volume snapshot.',
  WHAT_IS_VOLUME_SNAPSHOT_CONTENT_Q: 'What is a volume snapshot content?',
  WHAT_IS_VOLUME_SNAPSHOT_CONTENT_A: 'A volume snapshot content is a resource that represents the content of a volume snapshot.',
  SELECT_A_VOLUME_DESC: 'Select a volume to create a snapshot.',
  SELECT_VOLUME_SNAPSHOT_CLASS_DESC: 'Select a snapshot class to create a snapshot of a specific type.',
  // List
  VOLUME_SNAPSHOT_EMPTY_DESC: 'Please create a volume snapshot.',
  VOLUME_SNAPSHOT_STATUS_CREATING: 'Creando',
  VOLUME_SNAPSHOT_STATUS_FAILED: 'Creado sin éxito',
  VOLUME_SNAPSHOT_STATUS_READY: 'Creado con éxito',
  VOLUME_SNAPSHOT_STATUS_DELETING: 'Eliminando',
  CREATE_STATUS_SUCCESS: 'Creado con éxito',
  CREATE_STATUS_UPDATING: 'Creando',
  CREATE_STATUS_FAILED: 'Creado sin éxito',
  CREATE_STATUS_DELETING: 'Eliminando',
  // List > Delete
  VOLUME_SNAPSHOT_LOW: 'volume snapshot',
  // List > Create
  STORAGECLASS_NOT_ALLOW_CREATE_SNAPSHOT: 'The storage type to which this storage volume belongs does not allow snapshots to be created, please reselect it.'
};