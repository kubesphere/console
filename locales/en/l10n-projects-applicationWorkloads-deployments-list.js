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
  // List
  HPA_SET_TIP: 'Horizontal Pod autoscaling has been set.',
  WORKLOAD_EMPTY_DESC: 'Please create a workload.',

  // List > Create > Basic Information
  // List > Create > Pod Settings
  // List > Create > Pod Settings > Add Container > Container Settings
  INVALID_IMAGE: 'Invalid image.',
  INVALID_NAME_DESC:
    'Invalid name. The name can contain only lowercase letters, numbers, and hyphens (-), and must start and end with a lowercase letter or number. The maximum length is 63 characters.',
  NO_IMAGE_FOUND: 'No Image Found',
  CONTAINER_EMPTY_DESC: 'Please add at least one container.',

  // List > Create > Pod Settings > Port Settings
  WORKLOAD_PORT_NAME_DESC:
    'The port name can contain only lowercase letters, numbers and hyphens (-), and must start and end with a lowercase letter or number. The maximum length is 15 characters.',

  // List > Create > Pod Settings > Update Strategy > Rolling Update Settings
  MAX_EXTRA_PODS_DESC:
    'Maximum number or percentage of extra Pods allowed during the update process.',
  MAX_EXTRA_PODS: 'Maximum Extra Pods',

  // List > Create > Volume Settings
  AVAILABLE: 'Available',
  IN_USER: 'In use',
  ACCESS_MODE_SCAP: 'Access mode',
  VOLUME_OR_TEMPLATE_EMPTY:
    'You have enabled Collect Logs on Volumes. Please mount at least one volume or volume template and specify the directory of the logs.',
  VOLUME_EMPTY:
    'You have enabled Collect Logs on Volumes. Please mount at least one volume and specify the directory of the logs.',
  PROJECT_COLLECT_SAVED_DISABLED_DESC:
    'To enable this function, you need to enable Collect Logs on Volumes in Project Settings.',
  COLLECT_LOGS_ON_VOLUMES_DESC:
    'Allow the system to collect container logs saved on volumes. To use this function, you need to mount a volume in read and write mode to a container and set the container to export logs to the volume.',

  // List > Create
  // List > Create > Volume Settings > Mount Volume
  CONTAINER_LOG_PATH: 'Container log path',

  // List > Create > Volume Settings > Mount Volume > Temporary Volume (Question Mark)
  CONTAINER_LOG_PATH_TIP:
    'Container log path relative to the volume mount path. Globbing patterns are supported. You can used commas (,) to separate multiple paths.<br /><br /><b>Example</b><br />When the volume mount path is /data, log/*.log indicates that the container log files are all .log files in the /data/log directory.',

  // List > Create > Advanced Settings
  // List > Edit Information
  // List > Edit YAML
  // List > Re-create
  RECREATE_CONFIRM_DESC:
    'Are you sure you want to re-create the {type} {resource}? The Pod replicas will be updated according to the update strategy and the service will be interrupted.',

  // List > Delete
  NO_WORKLOAD_RELATED_RESOURCE_DESC:
    'No resource related to the workload is found.',
  SELECT_ALL: 'Select All',
  DELETE_WORKLOAD_DESC_SI:
    'You are about to delete the workload {resource}.<br/>Do you want to also delete the resource related to the workload?',
  DELETE_WORKLOAD_DESC_PL:
    'You are about to delete the workloads {resource}.<br/>Do you want to also delete the resources related to the workloads?',
  DELETE_WORKLOAD: 'Delete Workload',
  DELETE_MULTIPLE_WORKLOADS: 'Delete Multiple Workloads',
}
