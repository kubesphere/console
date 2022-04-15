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
  // More > Edit Authorization Rules
  SET_AUTHORIZATION_RULES: 'Set Authorization Rules',
  AUTHORIZATION_RULES: 'Authorization Rules',
  AUTHORIZATION_RULES_DESC: 'Set authorization rules so that the storage class can be accessed only in specific projects and workspaces.',
  OPERATOR_IN: 'In',
  OPERATOR_NOT_IN: 'Not in',
  // More > Set Volume Permissions
  SET_VOLUME_PERMISSIONS: 'Set Volume Permissions',
  VOLUME_CLONING: 'Volume Cloning',
  VOLUME_CLONING_DESC: 'Allow users to clone volumes.',
  VOLUME_SNAPSHOT_CREATION: 'Volume Snapshot Creation',
  VOLUME_SNAPSHOT_CREATION_DESC: 'Allow users to create volume snapshots.',
  VOLUME_EXPANSION: 'Volume Expansion',
  VOLUME_EXPANSION_DESC: 'Allow users to expand volumes. Volumes can only be expanded and cannot be shrunk.',
  SET_VOLUME_PERMISSIONS_TIP: 'The following settings only control whether users are allowed to perform the operations on the web console. Whether volumes created based on the storage class actually support the operations depends on the backend storage system.',
  // More > Set Auto Expansion
  SET_AUTO_EXPANSION: 'Set Auto Expansion',
  AUTO_EXPANSION: 'Auto Expansion',
  AUTO_EXPANSION_DESC: 'Set the system to automatically expand volumes when the remaining volume space is lower than a threshold.',
  AUTO_EXPANSION_SETTINGS: 'Auto Expansion Settings',
  MAXIMUM_SIZE: 'Maximum Size',
  INCREMENT: 'Size Increment',
  RESTART_WORKLOAD_AUTOMATICALLY: 'Restart workload automatically',
  RESTART_WORKLOAD_AUTOMATICALLY_DESC: 'The system automatically checks volume status to determine whether the workload needs to be restarted.',
  RESTART_WORKLOAD_AUTOMATICALLY_TIP: 'If the automatic restart time of the PVC exceeds the maximum time, the corresponding workload will be annotated with "restart.kubesphere.io/skip". To enable the automatic restart function for the PVC again, delete the above annotation.',
  // More > Delete
  // Volumes
  VOLUME_COUNT: 'Volumes'
};