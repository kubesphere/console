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
  // Navigation pane
  STORAGE: 'Storage',
  // Banner
  VOLUME_DESC: 'A volume is used for workloads created by users. It represents a resource object for the data persistence of workloads.',
  // List
  VOLUME_SNAPSHOT_EMPTY_DESC: 'Un snapshot de volumen se refiere a una snapshot de un volumen en un punto de tiempo particular. Se puede utilizar para crear nuevos volúmenes (preestablecer los datos del snapshot) o restaurar un volumen existente a su estado anterior (que se muestra en los snapshots).',
  VOLUME_STATUS_BOUND: 'Enlazado',
  VOLUME_STATUS_LOST: 'Perdido',
  VOLUME_STATUS_PENDING: 'Pendiente',
  VOLUME_STATUS_TERMINATING: 'Terminando',
  VOLUME_STATUS_UPDATING: 'Actualizando',
  VOLUME_CONDITION_FILESYSTEMRESIZEPENDING: 'Expandiendo disco',
  VOLUME_EMPTY_DESC: 'Please create a volume.',
  MOUNT_STATUS: 'Montar',
  MOUNTED: 'Montado',
  NOT_MOUNTED: 'No montado',
  ACCESS_MODE_TCAP: 'Modo de acceso',
  // List > Create > Basic Information
  CREATE: 'Create',
  // List > Create > Volume Settings
  CREATE_VOLUME_BY_STORAGE_CLASS: 'Crear volumen por clase de almacenamiento',
  CREATE_VOLUME_BY_SNAPSHOT: 'Crear volumen por snapshot',
  SELECT_SNAPSHOT_TO_CREATE_VOLUME: 'Selecciona snapshot para crear volumen.',
  SELECT_STORAGE_CLASS_CREATE_VOLUME: 'Seleccione una clase de almacenamiento para crear un volumen.',
  VOLUME_CAPACITY: 'Capacidad de volumen',
  PARAM_REQUIRED: 'Este parámetro es obligatorio',
  VOLUME_SIZE_TIP: 'The volume capacity must be greater than 0.',
  VOLUME_STORAGE_CLASS_DESC: 'Selecciona clase de almacenamiento para crear un tipo específico de volumen.',
  // List > Advanced Settings
  // List > Edit
  EDIT_TCAP: 'Edit',
  // List > Edit YAML
  // List > Delete
  VOLUME_LOW: 'volume'
};