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
    'Allocate all traffic proportionally to grayscale release components.',
  BLUE_GREEN_DEPLOYMENT: 'Blue-Green Deployment',
  CANARY_RELEASE: 'Canary Release',
  'Cookie Content': 'Cookie Content',
  CREATE_GRAYSCALE_RELEASE_JOB: 'Create Grayscale Release Job',
  CUSTOM_HEADER: 'Custom Header',
  'Deploy sample application': 'Deploy sample application',
  DEPLOY_SAMPLE_APP: 'Deploy Sample App',
  'Edit Grayscale Release Job': 'Edit Grayscale Release Job',
  EXACT_MATCH: 'Exact Match',
  FORWARD_BY_REQUEST_CONTENT: 'Forward by Request Content',
  FORWARD_BY_TRAFFIC_RATIO: 'Forward by Traffic Ratio',
  GRAYSCALE_RELEASE_COMPONENT: 'Grayscale Release Component',
  GRAYSCALE_RELEASE_COMPONENT_PL: 'Grayscale Release Components',
  GRAYSCALE_RELEASE_VERSION_TCAP: 'Grayscale Release Version',
  GRAYSCALE_ACCESS_RULE: 'Grayscale Release Version Access Rules',
  GRAYSCALE_RELEASE_VERSION_NUMBER: 'Grayscale Release Version Number',
  'Has taken over all traffic': 'Has taken over all traffic',
  TRAFFIC_CONTROL_DESC:
    'Introduce traffic that meets the following rules into grayscale version.',
  JOB_OFFLINE: 'Job Offline',
  JOB_OFFLINE_SUCCESSFULLY: 'Job offline successfully.',
  JOB_STATUS: 'Job Status',
  'Mirrored traffic': 'Mirrored traffic',
  'Mirrored traffic is only receiving traffic, no service':
    'Mirrored traffic is only receiving traffic, no service',
  NO_WORKLOAD_FOUND_TIP: 'No workload found',
  'Not online': 'Not online',
  VERSION_OFFLINE: 'Version Offline',
  'Operating System': 'Operating System',
  GRAY_VERSION_TIP: 'Please enter a grayscale release version.',
  SELECT_GRAY_COMPONENT_TIP: 'Please select a grayscale release component.',
  STRATEGY_CONFIGURATIONS_TCAP: 'Strategy Configurations',
  POLICY_REQUEST_CONTENT_TIP:
    'Forwarding by request content is unavailable if port protocol is not HTTP, HTTP2, or gRPC.',
  PREFIX_MATCH: 'Prefix Match',
  REAL_TIME_TRAFFIC_DIST_TCAP: 'Real-Time Traffic Distribution',
  REAL_TIME_TRAFFIC_RATIO: 'Real-time traffic ratio.',
  Recover: 'Recover',
  REGEX_MATCH: 'Regex Match',
  GRAY_RELEASE_JOB_NAME: 'Grayscale Release Job Name',
  REQUEST_SUCCESS_RATE: 'Request Success Rate',
  RULE_DESCRIPTION: 'Rule Description',
  'Take Over': 'Take Over',
  TAKE_OVER_ALL_TRAFFIC: 'Take Over All Traffic',
  'The current version is not online, you can let this version take over all traffic and bring it online.':
    'The current version is not online, you can let this version take over all traffic and bring it online.',
  traffic: 'traffic',
  TRAFFIC_OS: 'Traffic from the Following Operating Systems',
  TRAFFIC_CONTROL: 'Traffic Control',
  TRAFFIC_MIRRORING: 'Traffic Mirroring',
  TRAFFIC_MONITORING: 'Traffic Monitoring',
  TRAFFIC_IN_LAST_FIVE_MINUTES: 'Traffic in last five minutes.',
  TRAFFIC_RATIO: 'Traffic Ratio',
  TRAFFIC_RULES: 'Traffic Rules',
  TWO_VERSIONS: 'Two versions.',
  UNFINISHED_GRAY_JOB: 'Unfinished grayscale release job exists.',
  UNSUPPORTED_WORKLOAD_TYPE: 'Unsupported workload type.',
  VERSION_COMPARISON: 'Version Comparison',
  'version number is invalid': 'version number is invalid.',
  'Version Off': 'Version Off',

  GRAY_RELEASE_CATEGORIES: 'Strategies',
  GRAY_RELEASE_STRATEGY_SI: 'Grayscale Release Strategy',

  BLUE_GREEN_DEPLOYMENT_DESC:
    'Blue-green deployment deploys the new version while retaining the old version to ensure zero downtime. At any time, only one of the versions is active serving all the traffic and the other one remains idle. If anything goes wrong, you can quickly roll back to the old version.',
  CANARY_RELEASES_DESC:
    'Canary release brings part of the actual traffic into a new version to test its performance and reliability. It can help detect potential problems in the actual environment with no impact on the overall system stability.',
  TRAFFIC_MIRROR_DESC:
    'Traffic mirroring provides a more accurate way to test new versions and detect problems in advance with no impact on the production environment. It serves as a more secure and reliable method for version releases.',
  AB_TESTING_DESC:
    'This method is very helpful to understand whether product updates or improvements have met expectations. It can be used when new needs arise and it will not affect the business stability.',

  NO_SERVICE_MESH_TIP:
    'Applications that are not enabled for application governance cannot be published in grayscale.',

  NO_GRAY_RELEASE_JOBS_TIP: 'No Grayscale Release Job Found',
  NO_GRAY_RELEASE_JOBS_TIP_2: 'Please create a grayscale release job.',
  TOTAL_GRAY_RELEASE_JOB: '{num} grayscale release job in total',
  TOTAL_GRAY_RELEASE_JOBS: '{num} grayscale release jobs in total',

  GRAY_RELEASE_VERSION_FORMAT_DESC:
    'It can only contain lowercase letters and numbers with a maximum of 16 characters.',
  GRAY_RELEASE_VERSION_DESC:
    'Introduce the new version into the existing application service mesh',
  POLICY_CONFIG_DESC:
    'Release based on traffic ratio: According to the traffic ratio configuration rule, the specified proportion of traffic will be split from the original version to the grayscale version.',

  GRAY_RELEASE_DESC:
    'Grayscale release represents an important method of application iteration in the production environment. You can choose different release methods for the smooth transition as you upgrade your applications to a new version.',
  GRAYSCALE_RELEASE_DESC:
    'Grayscale release represents an important method of application iteration in the production environment. You can choose different release methods for the smooth transition as you upgrade your applications to a new version.',
  GRAY_RELEASE_BY_CONTENT_TIP:
    'According to the grayscale release version access rules, only traffic that meets certain conditions in the request content will be diverted to grayscale versions. This strategy is only valid for direct access to the portal service.',

  MIRROR_POLICY_DESC:
    'With traffic mirroring, the network traffic in the production environment can be copied into a grayscale version. It serves as an effective way to test the new version with real-time user traffic before it runs in the actual environment.</br>Therefore, traffic mirroring reduces the risk of directly making changes in the production environment.',

  RATIO_MODIFY_NOTIFY_CONTENT:
    'You have adjusted the target traffic ratio of the version {version} to {ratio}%, and you can continue to adjust the target traffic ratio or make it take effect immediately.',
  CANARY_BY_TRAFFIC_DESC:
    'According to the traffic ratio, {ratio}% of the request traffic to component {component} is forwarded to the grayscale version {newVersion}.',

  DEPLOY_APP_CONFIRM: 'Sure to deploy sample application?',
  DEPLOY_APP_TIP: 'You are going to deploy the sample app {name}.',

  DEPLOY_SAMPLE_NO_INTERNET_ACCESS_TIP:
    'The gateway for application governance is not found in the current project, so you cannot deploy the sample app. Please contact your project administrator to turn it on in [Advanced Settings].',

  PREREQUEST_FOR_USE_GRAYRELEASE_Q:
    'What are the requirements for implementing grayscale release?',
  PREREQUEST_FOR_USE_GRAYRELEASE_A:
    'You need to create a composed app and enable the application governance feature before you implement grayscale release.',

  JOB_OFFLINE_WARNING:
    'You need to select a version to take it offline. The system will retain an available version and automatically transfer all traffic to this available version to make sure the service can run smoothly.',
  JOB_OFFLINE_INFO:
    'Now you can take the job offline and the version {version} will be removed.',

  // Grayscale release detail page
  GRAY_COMPONENT_DESC:
    'The grayscale release components used to serve the traffic.',
  TRAFFIC_LOW: 'traffic',

  // Grayscale release components tab
  GRAY_APP_NAME: 'App: {name}',
  GRAY_WORKLOAD_TYPE: 'Workload Type: ',

  // Grayscale release version tab
  GRAY_DEPLOY_VERSION_TIP:
    'Deployment {name} exists. Please enter another version number.',
  INIT_CONTAINER: 'Init Container',
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
