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
  TRUE: 'True',
  FALSE: 'False',
  // More > Set as Default Storage Class
  SET_DEFAULT_STORAGE_CLASS_TITLE: 'Set as Default Storage Class',
  SET_AS_DEFAULT_STORAGE_CLASS: 'Set as Default Storage Class',
  STORAGE_CLASS_SET_DEFAULT_DESC: 'After the default storage class is set, the system will create volumes of this class by default if no special requirement is added. Only one default storage class is allowed in a KubeSphere cluster.',
  // More > Volume Management
  VOLUME_MANAGEMENT: 'Volume Management',
  VOLUME_CLONE: 'Volume Clone',
  ALLOW_VOLUME_CLONE_DESC: 'Allows users to clone volumes.',
  ALLOW_VOLUME_SNAPSHOT_DESC: 'Allows users to create volume snapshots.',
  'Volume Expansion': 'Storage volume expansion',
  ALLOW_VOLUME_EXPANSION_DESC: 'Allows users to extend volumes. Volumes can only be extended and cannot be shrunk.',
  VOLUME_FUNCTION_MANAGEMENT_TIP: 'Volume Management only controls whether the following features are enabled in the KubeSphere web console. Before the features are enabled, contact your system administrator to confirm that they are supported by the storage system.',
  VOLUME_SNAPSHOT: 'Volume Snapshot',
  // More > Delete
  // Volumes
  VOLUME_COUNT: 'Volumes'
};