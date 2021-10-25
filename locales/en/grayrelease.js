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
  'A/B Testing': 'A/B Testing',
  ALLOCATE_TRAFFIC_DESC:
    'Move the slider to set the proportion of traffic sent to the new version and that sent to the old version.',
  BLUE_GREEN_DEPLOYMENT: 'Blue-Green Deployment',
  CREATE_BLUE_GREEN_DEPLOYMENT_JOB: 'Create Blue-Green Deployment Job',
  CREATE_CANARY_RELEASE_JOB: 'Create Canary Release Job',
  CREATE_TRAFFIC_MIRRORING_JOB: 'Create Traffic Mirroring Job',
  CANARY_RELEASE: 'Canary Release',
  BLUE_GREEN_DEPLOYMENT_LOW: 'blue-green deployment',
  CANARY_RELEASE_LOW: 'canary release',
  TRAFFIC_MIRRORING_LOW: 'traffic mirroring',
  COOKIE_EXACT_MATCH: 'Cookie (exact match)',
  COOKIE_REGEX_MATCH: 'Cookie (regex match)',
  HEADER_EXACT_MATCH: 'Header (exact match)',
  HEADER_REGEX_MATCH: 'Header (regex match)',
  URL_PREFIX_MATCH: 'URL (prefix match)',
  URL_EXACT_MATCH: 'URL (regex match)',
  CREATE_GRAYSCALE_RELEASE_JOB: 'Create Grayscale Release Job',
  HEADER: 'Header',
  'Deploy sample application': 'Deploy sample application',
  DEPLOY_SAMPLE_APP: 'Deploy Sample App',
  'Edit Grayscale Release Job': 'Edit Grayscale Release Job',
  EXACT_MATCH: 'Exact match',
  SPECIFY_REQUEST_PARAMETERS: 'Specify Request Parameters',
  SPECIFY_TRAFFIC_DISTRIBUTION: 'Specify Traffic Distribution',
  GRAYSCALE_RELEASE_COMPONENT: 'Grayscale Release Component',
  GRAYSCALE_RELEASE_COMPONENT_PL: 'Grayscale Release Components',
  NEW_VERSION_SETTINGS: 'New Version Settings',
  NEW_VERSION_NUMBER: 'New Version Number',
  GRAYSCALE_RELEASE_VERSION_TCAP: 'Grayscale Release Version',
  REQUEST_PARAMETERS: 'Request Parameters',
  GRAYSCALE_RELEASE_VERSION_NUMBER: 'Grayscale Release Version Number',
  SERVICE_VERSION_RECEIVE_ALL_TRAFFIC:
    'The version <b>{version}</b> has taken over all traffic.',
  DELETE_JOB: 'Delete Job',
  JOB_OFFLINE_SUCCESSFULLY: 'Job offline successfully.',
  JOB_STATUS: 'Job Status',
  RELEASE_JOBS: 'Release Jobs',
  MIRRORED_TRAFFIC: 'Mirrored traffic',
  'Mirrored traffic is only receiving traffic, no service':
    'Mirrored traffic is only receiving traffic, no service',
  NO_WORKLOAD_FOUND_TIP: 'No workload found',
  'Not online': 'Not online',
  TAKE_OFFLINE: 'Take Offline',
  TAKE_OVER: 'Take Over',
  'Operating System': 'Operating System',
  NEW_VERSION_NUMBER_EMPTY_DESC: 'Please enter a new version number.',
  SELECT_GRAY_COMPONENT_TIP: 'Please select a Service.',
  STRATEGY_CONFIGURATIONS_TCAP: 'Strategy Configurations',
  POLICY_REQUEST_CONTENT_TIP:
    'The Specify Request Parameters function supports only HTTP, HTTPS, and gRPG requests.',
  PREFIX_MATCH: 'Prefix match',
  REAL_TIME_TRAFFIC_DIST_TCAP: 'Real-Time Traffic Distribution',
  TRAFFIC_MIRRORING_TRAFFIC_DISTRI_DESC:
    'A copy of traffic is sent to the new version for testing.',
  BLUE_GREEN_TRAFFIC_DISTRI_DESC:
    'The new version or old version receives all traffic.',
  RESTORE: 'Restore',
  REGEX_MATCH: 'Regex match',
  GRAY_RELEASE_JOB_NAME: 'Grayscale Release Job Name',
  SUCCESSFUL_REQUEST_RATE: 'Successful Request Rate',
  RULE_DESCRIPTION: 'Rule Description',
  'Take Over': 'Take Over',
  TAKE_ONLINE: 'Take Online',
  'The current version is not online, you can let this version take over all traffic and bring it online.':
    'The current version is not online, you can let this version take over all traffic and bring it online.',
  traffic: 'traffic',
  CLIENT_OS: 'Client OS',
  OS: 'OS',
  TRAFFIC_CONTROL: 'Traffic Control',
  TRAFFIC_MIRRORING: 'Traffic Mirroring',
  TRAFFIC_IN_LAST_FIVE_MINUTES: 'Traffic in last five minutes.',
  TRAFFIC_MONITORING: 'Traffic Monitoring',
  TRAFFIC: 'Traffic',
  TRAFFIC_DISTRIBUTION: 'Traffic Distribution',
  SELECT_VERSION: 'Select Version',
  BLUE_GREEN_STRATEGY_DESC:
    'Select a version to take over all service traffic.',
  UNFINISHED_GRAY_JOB: 'Grayscale release in progress',
  UNSUPPORTED_WORKLOAD_TYPE: 'Workload type not supported',
  VERSION_COMPARISON: 'Version Comparison',
  'version number is invalid': 'version number is invalid.',
  'Version Off': 'Version Off',

  GRAY_RELEASE_CATEGORIES: 'Strategies',
  RELEASE_MODE_PL: 'Release Modes',
  RELEASE_MODE: 'Release mode',
  GRAY_RELEASE_STRATEGY_SI: 'Grayscale Release Strategy',

  BLUE_GREEN_DEPLOYMENT_DESC:
    'Send service traffic to the new version for testing. If the new version does not function properly, you can immediately switch service traffic to the old version.',
  CANARY_RELEASE_DESC:
    'Allocate service traffic among the new version and old version to both test the new version and ensure service continuity.',
  TRAFFIC_MIRRORING_DESC:
    'Send a copy of service traffic to the new version for testing without actually exposing the new version.',
  AB_TESTING_DESC:
    'This method is very helpful to understand whether product updates or improvements have met expectations. It can be used when new needs arise and it will not affect the business stability.',

  NO_SERVICE_MESH_TIP:
    'Application governance is disabled for the app and grayscale release is unavailable.',

  NO_GRAYSCALE_RELEASE_JOB_FOUND: 'No Grayscale Release Job Found',
  NO_GRAYSCALE_RELEASE_TASK_FOUND_DESC:
    'Please create a grayscale release job.',
  TOTAL_GRAY_RELEASE_JOB: '{num} grayscale release job in total',
  TOTAL_GRAY_RELEASE_JOBS: '{num} grayscale release jobs in total',

  NEW_VERSION_NUMBER_DESC:
    'The new version number can contain only lowercase letters and numbers. The maximum length is 16 characters.',
  NEW_VERSION_NUMBER_INVALID_DESC:
    'Invalid new version number. The new version number can contain only lowercase letters and numbers. The maximum length is 16 characters.',
  GRAY_RELEASE_VERSION_DESC:
    'Introduce the new version into the existing application service mesh',
  POLICY_CONFIG_DESC:
    'Release based on traffic ratio: According to the traffic ratio configuration rule, the specified proportion of traffic will be split from the original version to the grayscale version.',

  GRAYSCALE_RELEASE_DESC:
    'Grayscale release represents an important method of application iteration in the production environment. You can choose different release methods for the smooth transition as you upgrade your applications to a new version.',
  SPECIFY_REQUEST_PARAMETERS_DESC:
    'Requests that meet the following conditions are sent to the new version.',

  MIRROR_POLICY_DESC:
    'A copy of service traffic is sent to the new version for testing. Only the old version is exposed and the new version is not exposed.',

  ADJUST_TRAFFIC_DISTRIBUTION_DESC:
    'Are you sure you want to send {ratioNew}% of traffic to the new version <b>{newVersion}</b> and {ratioOld}% to the old version <b>{oldVersion}</b>?',
  CANARY_BY_TRAFFIC_DESC:
    '{ratio}% of traffic bound for the Service <b>{component}</b> is sent to the new version <b>{newVersion}</b>.',

  DEPLOY_APP_CONFIRM: 'Sure to deploy sample application?',
  DEPLOY_APP_TIP: 'You are going to deploy the sample app {name}.',

  DEPLOY_SAMPLE_NO_INTERNET_ACCESS_TIP:
    'The gateway for application governance is not found in the current project, so you cannot deploy the sample app. Please contact your project administrator to turn it on in [Advanced Settings].',

  PREREQUEST_FOR_USE_GRAYRELEASE_Q:
    'What are the prerequisites for implementing grayscale release?',
  PREREQUEST_FOR_USE_GRAYRELEASE_A:
    'Before implementing grayscale release, you need to create a composed app and enable application governance for the app.',

  DELETE_GRAYSCALE_RELEASE_JOB_DESC:
    'Please select a version to take over all traffic before deleting the grayscale release job.',
  NEW_VERSION_TAKEOVER_DESC:
    'The new version <b>{newVersion}</b> is receiving all traffic. If you delete the current grayscale release job, the old version <b>{oldVersion}</b> will be also be deleted.',
  OLD_VERSION_TAKEOVER_DESC:
    'The old version <b>{oldVersion}</b> is receiving all traffic. If you delete the current grayscale release job, the new version <b>{newVersion}</b> will be also be deleted.',
  // Grayscale release detail page
  GRAY_COMPONENT_DESC:
    'Information about the new version being tested and the old version.',
  TRAFFIC_LOW: 'traffic',
  VERSION_TRAFFIC_PERCENT: '{version} traffic {percent}%',

  // Grayscale release components tab
  GRAY_APP_NAME: 'App: {name}',
  GRAY_WORKLOAD_TYPE: 'Workload Type: ',

  // Grayscale release version tab
  NEW_VERSION_NUMBER_EXIST_DESC:
    'The workload {name} already exists. Please enter another version number.',
  INIT_CONTAINER: 'Init container',
  INIT_CONTAINER_VALUE: 'Init Container: {value}',
  CONTAINER_VALUE: 'Container: {value}',
  GRAYSCALE_IMAGE: 'Image: {image}',

  // Grayscale strategy configurations tab
  GRAYSCALE_VERSION: 'Version: {version}',
  GRAYSCALE_REPLICA_SI: 'Replica: {count}',
  GRAYSCALE_REPLICA_PL: 'Replicas: {count}',

  // Canary Strategy Tab
  COOKIE: 'Cookie',

  // Grayscale Release Job List
  GRAYSCALE_JOB_STRATEGY: 'Grayscale release strategy',
  GRAYSCALE_JOB_COMPONENT: 'Grayscale release component',
}
