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
  VOLUME_SNAPSHOT_DESC: 'A volume snapshot is the copy of a volume at a specific point in time. It can be used to provision a new volume with data pre-populated by the snapshot or restore a volume to its previous state that is captured by the snapshot.',
  WHAT_IS_VOLUME_SNAPSHOT_CLASS_Q: 'What is a volume snapshot class?',
  WHAT_IS_VOLUME_SNAPSHOT_CLASS_A: 'A volume snapshot class defines the storage types used to create a volume snapshot.',
  WHAT_IS_VOLUME_SNAPSHOT_CONTENT_Q: 'What is a volume snapshot content?',
  WHAT_IS_VOLUME_SNAPSHOT_CONTENT_A: 'A volume snapshot content is a resource that represents the content of a volume snapshot.',
  SELECT_A_VOLUME_DESC: 'Select a persistent volume claim to create a snapshot.',
  SELECT_VOLUME_SNAPSHOT_CLASS_DESC: 'Select a snapshot class to create a snapshot of a specific type.',
  // List
  VOLUME_SNAPSHOT_EMPTY_DESC: 'Please create a volume snapshot.',
  VOLUME_SNAPSHOT_STATUS_CREATING: 'Wird erstellt',
  VOLUME_SNAPSHOT_STATUS_FAILED: 'Erstellung fehlgeschlagen',
  VOLUME_SNAPSHOT_STATUS_READY: 'Erfolgreich erstellt',
  VOLUME_SNAPSHOT_STATUS_DELETING: 'Wird gelöscht',
  CREATE_STATUS_SUCCESS: 'Erfolgreich erstellt',
  CREATE_STATUS_UPDATING: 'Wird erstellt',
  CREATE_STATUS_FAILED: 'Erstellung fehlgeschlagen',
  CREATE_STATUS_DELETING: 'Wird gelöscht',
  // List > Delete
  VOLUME_SNAPSHOT_LOW: 'volume snapshot',
  // List > Create
  STORAGECLASS_NOT_ALLOW_CREATE_SNAPSHOT: 'The storage class of the persistent volume claim does not support snapshot creation. Please select another persistent volume claim.'
};