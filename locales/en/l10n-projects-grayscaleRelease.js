/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Banner
  GRAYSCALE_RELEASE: 'Grayscale Release',
  // Release Modes
  BLUE_GREEN_DEPLOYMENT: 'Blue-Green Deployment',
  CANARY_RELEASE: 'Canary Release',
  TRAFFIC_MIRRORING: 'Traffic Mirroring',
  BLUE_GREEN_DEPLOYMENT_DESC:
    'Send service traffic to the new version for testing. If the new version does not function properly, you can immediately switch service traffic to the old version.',
  CANARY_RELEASE_DESC:
    'Allocate service traffic among the new version and old version to both test the new version and ensure service continuity.',
  TRAFFIC_MIRRORING_DESC:
    'Send a copy of service traffic to the new version for testing without actually exposing the new version.',
  // Release Modes > Blue-Green Deployment > Create > Basic Information
  CREATE_BLUE_GREEN_DEPLOYMENT_TASK: 'Create Blue-Green Deployment Task',
  // Release Modes > Blue-Green Deployment > Create > Service Settings
  DESELECT: 'Deselect',
  SELECT: 'Select',
  SELECT_GRAY_COMPONENT_TIP: 'Please select a service.',
  // Release Modes > Blue-Green Deployment > Create > New Version Settings
  REPLICA: 'Replica',
  REPLICA_PL: 'Replicas',
  GRAYSCALE_REPLICAS_DESC: 'Pod replicas in the new version',
  // Release Modes > Blue-Green Deployment > Create > Strategy Settings
  SELECT_VERSION: 'Select Version',
  BLUE_GREEN_STRATEGY_DESC: 'Select a version to take over all service traffic.',
  TAKE_OFFLINE: 'Take Offline',
  TAKE_OVER: 'Take Over',
  GRAYSCALE_VERSION: 'Version: {version}',
  // Release Modes > Canary Release > Create
  CREATE_CANARY_RELEASE_TASK: 'Create Canary Release Task',
  // Release Modes > Canary Release > Create > Service Settings
  UNFINISHED_GRAY_TASK: 'Grayscale release in progress',
  NO_WORKLOAD_FOUND_TIP: 'No workload found',
  NO_SERVICE_MESH_TIP:
    'Application governance is disabled for the app and grayscale release is unavailable.',
  GRAY_APP_NAME: 'App: {name}',
  UNSUPPORTED_WORKLOAD_TYPE: 'Workload type not supported',
  // Release Modes > Canary Release > Create > New Version Settings
  VERSION_EXISTS: 'The version code already exists. Please enter another version code.',
  NEW_VERSION_NUMBER_EXIST_DESC:
    'The workload {name} already exists. Please enter another version code.',
  INIT_CONTAINER: 'Init container',
  INIT_CONTAINER_VALUE: 'Init Container: {value}',
  CONTAINER_VALUE: 'Container: {value}',
  GRAYSCALE_IMAGE: 'Image: {image}',
  NEW_VERSION_NUMBER: 'New Version Number',
  NEW_VERSION_NUMBER_EMPTY_DESC: 'Please enter a new version number.',
  NEW_VERSION_SETTINGS: 'New Version Settings',
  NEW_VERSION_NUMBER_DESC:
    'The new version number can contain only lowercase letters and numbers. The maximum length is 16 characters.',
  NEW_VERSION_NUMBER_INVALID_DESC:
    'Invalid new version number. The new version number can contain only lowercase letters and numbers. The maximum length is 16 characters.',
  // Release Modes > Canary Release > Create > Strategy Settings > Specify Request Parameters
  KEY_EQ_VALUE: 'Key=Value',
  HEADER: 'Header',
  CLIENT_OS: 'Client OS',
  COOKIE: 'Cookie',
  SPECIFY_REQUEST_PARAMETERS_DESC:
    'Requests that meet the following conditions are sent to the new version.',
  POLICY_REQUEST_CONTENT_TIP:
    'The Specify Request Parameters function supports only HTTP, HTTPS, and gRPG requests.',
  SPECIFY_REQUEST_PARAMETERS: 'Specify Request Parameters',
  REQUEST_PARAMETERS: 'Request Parameters',
  EXACT_MATCH: 'Exact match',
  PREFIX_MATCH: 'Prefix match',
  REGEX_MATCH: 'Regex match',
  // Release Modes > Canary Release > Create > Strategy Settings > Specify Traffic Distribution
  CANARY_BY_TRAFFIC_DESC:
    '{ratio}% of traffic bound for the service <b>{component}</b> is sent to the new version <b>{newVersion}</b>.',
  SPECIFY_TRAFFIC_DISTRIBUTION: 'Specify Traffic Distribution',
  TRAFFIC: 'Traffic',
  TRAFFIC_DISTRIBUTION: 'Traffic Distribution',
  // Release Modes > Traffic Mirroring > Create

  CREATE_TRAFFIC_MIRRORING_TASK: 'Create Traffic Mirroring Task',
  // Release Modes > Traffic Mirroring > Create > Strategy Settings
  // Release Tasks
  PREREQUEST_FOR_USE_GRAYRELEASE_Q:
    'What are the prerequisites for implementing grayscale release?',
  PREREQUEST_FOR_USE_GRAYRELEASE_A:
    'Before implementing grayscale release, you need to create a composed app and enable application governance for the app.',
  RELEASE_TASKS: 'Release Tasks',
  TCP_INBOUND_TRAFFIC: 'TCP Inbound Traffic',
  TCP_OUTBOUND_TRAFFIC: 'TCP Outbound Traffic',
  NO_DATA_SCAP: 'No data',
  REPLICA_COUNT_LOW: 'replicas',
  MIRROR_POLICY_DESC:
    'A copy of service traffic is sent to the new version for testing. Only the old version is exposed and the new version is not exposed.',
  // Release Tasks > Blue-Green Deployment > Task Status
  BLUE_GREEN_DEPLOYMENT_LOW: 'blue-green deployment',
  BLUE_GREEN_TRAFFIC_DISTRI_DESC: 'The new version or old version receives all traffic.',
  TRAFFIC_LOW: 'traffic',
  VERSION_TRAFFIC_PERCENT: '{version} traffic {percent}%',
  OFFLINE: 'Offline',
  OFFLINE_TIP:
    'No service traffic is sent to this version. You can take the version online to make it take over all traffic.',
  // Release Tasks > Canary Release > Task Status
  CANARY_RELEASE_LOW: 'canary release',
  ADJUST_TRAFFIC_DISTRIBUTION_DESC:
    'Are you sure you want to send {ratioNew}% of traffic to the new version <b>{newVersion}</b> and {ratioOld}% to the old version <b>{oldVersion}</b>?',
  ALLOCATE_TRAFFIC_DESC:
    'Move the slider to set the proportion of traffic sent to the new version and that sent to the old version.',
  COOKIE_EXACT_MATCH: 'Cookie (exact match)',
  COOKIE_REGEX_MATCH: 'Cookie (regex match)',
  HEADER_EXACT_MATCH: 'Header (exact match)',
  HEADER_REGEX_MATCH: 'Header (regex match)',
  URL_PREFIX_MATCH: 'URL (prefix match)',
  URL_EXACT_MATCH: 'URL (regex match)',
  OS: 'OS',
  SERVICE_VERSION_RECEIVE_ALL_TRAFFIC: 'The version <b>{version}</b> has taken over all traffic.',
  RESTORE: 'Restore',
  SUCCESSFUL_REQUEST_RATE: 'Successful Request Rate',
  TRAFFIC_IN_LAST_FIVE_MINUTES: 'Traffic in last five minutes.',
  DELETE_GRAYSCALE_RELEASE_TASK_DESC:
    'Please select a version to take over all traffic before deleting the grayscale release task.',
  GRAY_COMPONENT_DESC: 'Information about the new version being tested and the old version.',
  // Release Tasks > Traffic Mirroring > Task Status
  TRAFFIC_MIRRORING_LOW: 'traffic mirroring',
  MIRRORED_TRAFFIC: 'Mirrored traffic',
  MIRRORED_TRAFFIC_TIP: 'Traffic mirroring does not actually expose the new version.',
  RELEASE_MODE_PL: 'Release Modes',
  RELEASE_MODE: 'Release mode',
  NEW_VERSION_TAKEOVER_DESC:
    'The new version <b>{newVersion}</b> is receiving all traffic. If you delete the current grayscale release task, the old version <b>{oldVersion}</b> will be also be deleted.',
  OLD_VERSION_TAKEOVER_DESC:
    'The old version <b>{oldVersion}</b> is receiving all traffic. If you delete the current grayscale release task, the new version <b>{newVersion}</b> will be also be deleted.',
  GRAYSCALE_REPLICA_SI: 'Replica: {count}',
  GRAYSCALE_REPLICA_PL: 'Replicas: {count}',
  TRAFFIC_MIRRORING_TRAFFIC_DISTRI_DESC:
    'A copy of traffic is sent to the new version for testing.',
  // Release Tasks > Task Status > Edit
  EDIT_GRAYSCALE_RELEASE_TASK: 'Edit Grayscale Release Task',
  // Release Tasks > Canary Release > Traffic Distribution
  ADJUST_TRAFFIC_DISTRIBUTION: 'Adjust Traffic Distribution',
};
