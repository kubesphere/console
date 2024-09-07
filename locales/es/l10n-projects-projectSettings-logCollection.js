/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Banner
  LOG_COLLECTION: 'Log Collection',
  DISK_LOG_COLLECTION_DESC:
    'The Log Collection function allows the system to collect container logs saved on volumes. To use this function, you need to mount a volume in read and write mode to a container and set the container to export logs to the volume.',
  COLLECT_LOGS_ON_VOLUMES_Q: 'How do I collect logs on volumes?',
  COLLECT_LOGS_ON_VOLUMES_A:
    'To collect logs on volumes, you need to mount a volume in read and write mode to a container and set the container to export logs to the volume.',
  // Collect Logs on Volumes
  COLLECT_LOGS_ON_VOLUMES: 'Colección de registro de disco',
  DISABLE_LOG_COLLECTION: 'Disable Log Collection',
  DISABLE_LOG_COLLECTION_TIP:
    'Are you sure you want to disable log collection? After it is disabled, services that have enabled log collection will continue to collect logs saved in the volumes before the Pod replicas are restarted. If you need to collect the logs again, please enable log collection and restart the Pod replicas.',
  LOG_COLLECTION_ENABLED_DESC:
    'After this function is enabled or disabled, you need to restart the Pod replicas to make the change take effect.',
  DISABLED: 'Deshabilitado',
  ENABLED: 'Habilitado',
};
