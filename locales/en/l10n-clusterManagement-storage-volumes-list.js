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
  VOLUME_DESC:
    'A volume is used for workloads created by users. It represents a resource object for the data persistence of workloads.',

  // List
  VOLUME_SNAPSHOT_EMPTY_DESC:
    'Please go to the details page of a volume and create a volume snapshot',
  VOLUME_STATUS_BOUND: 'Bound',
  VOLUME_STATUS_LOST: 'Lost',
  VOLUME_STATUS_PENDING: 'Pending',
  VOLUME_STATUS_TERMINATING: 'Terminating',
  VOLUME_STATUS_UPDATING: 'Updating',
  VOLUME_CONDITION_FILESYSTEMRESIZEPENDING: 'Disk Expanding',
  VOLUME_EMPTY_DESC: 'Please create a volume.',
  MOUNT_STATUS: 'Mount Status',
  MOUNTED: 'Mounted',
  NOT_MOUNTED: 'Not mounted',
  ACCESS_MODE_TCAP: 'Access Mode',

  // List > Create > Basic Information
  CREATE: 'Create',

  // List > Create > Volume Settings
  CREATE_VOLUME_BY_STORAGE_CLASS: 'From Storage Class',
  CREATE_VOLUME_BY_SNAPSHOT: 'From Volume Snapshot',
  SELECT_SNAPSHOT_TO_CREATE_VOLUME: 'Select a snapshot to create a volume.',
  SELECT_STORAGE_CLASS_CREATE_VOLUME:
    'Select a storage class to create a volume.',
  VOLUME_CAPACITY: 'Volume Capacity',
  PARAM_REQUIRED: 'This parameter is required.',
  VOLUME_SIZE_TIP: 'The volume capacity must be greater than 0.',
  VOLUME_STORAGE_CLASS_DESC:
    'Select a storage class to create a volume of a specific type.',

  // List > Advanced Settings
  // List > Edit
  EDIT_TCAP: 'Edit',

  // List > Edit YAML
  // List > Delete
  VOLUME_LOW: 'volume',
}
