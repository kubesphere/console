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
  // Attributes
  TRUE: 'True',
  FALSE: 'False',
  // More > Set as Default Storage Class
  SET_DEFAULT_STORAGE_CLASS_TITLE: 'Set as Default Storage Class',
  SET_AS_DEFAULT_STORAGE_CLASS: 'Set as Default Storage Class',
  STORAGE_CLASS_SET_DEFAULT_DESC: 'Una vez establecida la clase de almacenamiento predeterminada, el sistema creará volúmenes de esta clase de forma predeterminada si no se agrega ningún requisito especial. Solo se permite una clase de almacenamiento predeterminada en un clúster de KubeSphere.',
  // More > Edit Authorization Rules
  SET_AUTHORIZATION_RULES: 'Set Authorization Rules',
  AUTHORIZATION_RULES: 'Authorization Rules',
  AUTHORIZATION_RULES_DESC: 'Set authorization rules so that the storage class can be accessed only in specific projects and workspaces.',
  AUTHORIZATION_NOT_SUPPORT: 'The cluster currently does not support this feature. Please upgrade KubeSphere to v3.3.0 or later, or manually install <a href="https://github.com/kubesphere/storageclass-accessor" target="_blank">storageclass-accessor</a>.',
  OPERATOR_IN: 'En',
  OPERATOR_NOT_IN: 'Not in',
  // More > Set Volume Permissions
  SET_VOLUME_OPERATIONS: 'Set Volume Operations',
  VOLUME_CLONING: 'Volume Cloning',
  VOLUME_CLONING_DESC: 'Allow users to clone volumes.',
  VOLUME_SNAPSHOT_CREATION: 'Volume Snapshot Creation',
  VOLUME_SNAPSHOT_CREATION_DESC: 'Allow users to create volume snapshots.',
  VOLUME_EXPANSION_DESC: 'Allow users to expand volumes. Volumes can only be expanded and cannot be shrunk.',
  SET_VOLUME_OPERATIONS_TIP: 'The following settings only control whether users are allowed to perform the operations on the web console. Whether persistent volumes created based on the storage class actually support the operations depends on the backend storage system.',
  // More > Set Auto Expansion
  SET_AUTO_EXPANSION: 'Set Auto Expansion',
  AUTO_EXPANSION: 'Auto Expansion',
  AUTO_EXPANSION_DESC: 'Set the system to automatically expand volumes when the remaining volume space is lower than a threshold.',
  AUTO_EXPANSION_SETTINGS: 'Auto Expansion Settings',
  MAXIMUM_SIZE: 'Maximum Size',
  INCREMENT: 'Increment',
  INCREMENT_DESC: 'Set the volume size increment according to the CSI pluggin of the storage class.',
  RESTART_WORKLOAD_AUTOMATICALLY: 'Restart workload automatically',
  RESTART_WORKLOAD_AUTOMATICALLY_DESC: 'The system automatically checks volume status to determine whether the workload needs to be restarted.',
  RESTART_WORKLOAD_AUTOMATICALLY_TIP: 'If the volume is not expanded successfully when the timeout period expires, the system will add the "restart.kubesphere.io/skip" annotation to the workload so that the workload is not restarted any more. To enable the automatic restart function for the workload again, you need to manually delete the annotation on the workload.',
  // More > Delete
  // Persistent Volume Claims > Persistent Volume Claims
  MAXIMUM_SIZE_SCAP: 'Maximum size',
  VALUE_TIMEOUT: '{value}s (timeout)',
  // Persistent Volume Claims > Persistent Volume Claims
  PVC_COUNT: 'PVCs'
};