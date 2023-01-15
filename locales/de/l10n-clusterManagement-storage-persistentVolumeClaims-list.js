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
  STORAGE: 'Speicher',
  // Banner
  PERSISTENT_VOLUME_CLAIM_DESC: 'Persistent volume claims define storage requirements. The system creates persistent volumes according to persistent volume claims.',
  PERSISTENT_VOLUME_CLAIM: 'Persistent Volume Claim',
  PERSISTENT_VOLUME_CLAIM_PL: 'Persistent Volume Claims',
  WHAT_IS_STORAGE_CLASS_Q: 'What is a storage class?',
  WHAT_IS_STORAGE_CLASS_A: 'A storage class is a storage type configured by the cluster administrator. Different storage classes provide cluster users with different types of volumes.',
  WHAT_IS_LOCAL_VOLUME_Q: 'What is a local volume?',
  WHAT_IS_LOCAL_VOLUME_A: 'A local volume is a volume created in the local file system of the cluster.',
  // List
  VOLUME_STATUS_BOUND: 'Bound',
  VOLUME_STATUS_LOST: 'Lost',
  VOLUME_STATUS_PENDING: 'Ausstehend',
  VOLUME_STATUS_TERMINATING: 'Terminating',
  VOLUME_STATUS_UPDATING: 'Updating',
  VOLUME_CONDITION_FILESYSTEMRESIZEPENDING: 'Disk Expanding',
  PERSISTENT_VOLUME_CLAIM_EMPTY_DESC: 'Please create a persistent volume claim.',
  MOUNT_STATUS: 'Mount Status',
  MOUNTED: 'Mounted',
  NOT_MOUNTED: 'Not mounted',
  ACCESS_MODE_TCAP: 'Access Mode',
  RWO_DESC: 'RWO: Single-node read and write',
  ROX_DESC: 'ROX: Multi-node readonly',
  RWX_DESC: 'RWX: Multi-node read and write',
  // List > Create > Basic Information
  CREATE: 'Create',
  CREATE_PERSISTENT_VOLUME_CLAIM: 'Create Persistent Volume Claim',
  // List > Create > Storage Settings
  CREATION_METHOD: 'Creation Method',
  CREATE_VOLUME_BY_STORAGE_CLASS: 'From Storage Class',
  CREATE_VOLUME_BY_SNAPSHOT: 'From Volume Snapshot',
  SELECT_SNAPSHOT_TO_CREATE_VOLUME: 'Select a snapshot to create a volume.',
  SELECT_STORAGE_CLASS_CREATE_VOLUME: 'Select a storage class to create a volume.',
  VOLUME_CAPACITY: 'Volume Capacity',
  PARAM_REQUIRED: 'This parameter is required.',
  VOLUME_SIZE_TIP: 'The volume capacity must be greater than 0.',
  VOLUME_STORAGE_CLASS_DESC: 'Select a storage class to create a volume of a specific type.',
  // List > Advanced Settings
  // List > Edit
  // List > Edit YAML
  // List > Delete
  PERSISTENT_VOLUME_CLAIM_LOW: 'persistent volume claim'
};