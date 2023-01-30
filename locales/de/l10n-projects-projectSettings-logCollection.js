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
  LOG_COLLECTION: 'Log Collection',
  DISK_LOG_COLLECTION_DESC: 'The Log Collection function allows the system to collect container logs saved on volumes and send the logs to standard output.',
  COLLECT_LOGS_ON_VOLUMES_Q: 'How do I collect logs on volumes?',
  COLLECT_LOGS_ON_VOLUMES_A: 'To collect logs on volumes, you need to mount a volume in read and write mode to a container and set the container to export logs to the volume.',
  // Collect Logs on Volumes
  COLLECT_LOGS_ON_VOLUMES: 'Collect Logs on Volumes',
  DISABLE_LOG_COLLECTION: 'Disable Log Collection',
  DISABLE_LOG_COLLECTION_TIP: 'Are you sure you want to disable log collection? You need to restart the pod replicas to make the change take effect.',
  LOG_COLLECTION_ENABLED_DESC: 'After this function is enabled or disabled, you need to restart the pod replicas to make the change take effect.',
  DISABLED: 'Deaktiviert',
  ENABLED: 'Enabled'
};