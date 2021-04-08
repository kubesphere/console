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
  'Allocate all traffic proportionally to grayscale release components':
    'Allocate all traffic proportionally to grayscale release components',
  'Blue-green Deployment': 'Blue-green Deployment',
  'Canary Release': 'Canary Release',
  'Cookie Content': 'Cookie Content',
  'Create Grayscale Release Job': 'Create Grayscale Release Job',
  'Create Job': 'Create Job',
  'Custom Header': 'Custom Header',
  'Deploy sample application': 'Deploy sample application',
  'Deploy Sample App': 'Deploy Sample App',
  'Edit Grayscale Release Job': 'Edit Grayscale Release Job',
  'Exact Match': 'Exact Match',
  'Forward by request content': 'Forward by request content',
  'Forward by traffic ratio': 'Forward by traffic ratio',
  'Grayscale Release': 'Grayscale Release',
  'Grayscale Release Component': 'Grayscale Release Component',
  'Grayscale Release Components': 'Grayscale Release Components',
  'Grayscale Release Strategy': 'Grayscale Release Strategy',
  'Grayscale Release Version': 'Grayscale Release Version',
  'Grayscale release version access rule':
    'Grayscale release version access rule',
  'Grayscale Release Version Number': 'Grayscale Release Version Number',
  'Has taken over all traffic': 'Has taken over all traffic',
  'Introduce traffic that meets the following rules into grayscale version':
    'Introduce traffic that meets the following rules into grayscale version',
  'Job offline': 'Job offline',
  'Job offline Successfully': 'Job offline Successfully',
  'Job Status': 'Job Status',
  'Mirrored traffic': 'Mirrored traffic',
  'Mirrored traffic is only receiving traffic, no service':
    'Mirrored traffic is only receiving traffic, no service',
  'No workload found': 'No workload found',
  'Not online': 'Not online',
  'Version offline': 'Version offline',
  'Operating System': 'Operating System',
  'Please input grayscale release version':
    'Please input grayscale release version',
  'Please select a grayscale release component':
    'Please select a grayscale release component',
  'Policy Config': 'Policy Config',
  POLICY_REQUEST_CONTENT_TIP:
    'Port protocol is not HTTP, HTTP2 or gRPC, cannot publish policy by request content',
  'Prefix Match': 'Prefix Match',
  'Real-time traffic distribution': 'Real-time traffic distribution',
  'Real-time traffic ratio': 'Real-time traffic ratio',
  Recover: 'Recover',
  'Regex Match': 'Regex Match',
  'Release Job Name': 'Release Job Name',
  'Request duration': 'Request duration',
  'Request success rate': 'Request success rate',
  'Rule Description': 'Rule Description',
  'Take Over': 'Take Over',
  'Take over all traffic': 'Take over all traffic',
  'The current version is not online, you can let this version take over all traffic and bring it online.':
    'The current version is not online, you can let this version take over all traffic and bring it online.',
  traffic: 'traffic',
  'Traffic comes from the following operating systems':
    'Traffic comes from the following operating systems',
  'Traffic Control': 'Traffic Control',
  'Traffic Mirroring': 'Traffic Mirroring',
  'Traffic monitor': 'Traffic monitoring',
  'Traffic of last five minutes': 'Traffic of last five minutes',
  'Traffic Ratio': 'Traffic Ratio',
  'Traffic Rules': 'Traffic Rules',
  'Two Versions': 'Two Versions',
  'Unfinished grayscale release jobs exist':
    'Unfinished grayscale release jobs exist',
  'Unsupported workload type': 'Unsupported workload type',
  'Version Comparison': 'Version Comparison',
  'version number is invalid': 'version number is invalid',
  'Version Off': 'Version Off',

  GRAY_RELEASE_CATEGORIES: 'Categories',

  BLUE_GREEN_DEPLOYMENT_DESC:
    'The blue-green release provides a zero downtime deployment, which means the new version can be deployed with the old one preserved. At any time, only one of the versions is active serving all the traffic, while the other one remains idle. If there is a problem with running, you can quickly roll back to the old version.',
  CANARY_RELEASES_DESC:
    'This method brings part of the actual traffic into a new version to test its performance and reliability. It can help detect potential problems in the actual environment while not affecting the overall system stability.',
  TRAFFIC_MIRROR_DESC:
    'Traffic mirroring provides a more accurate way to test new versions as problems can be detected in advance while not affecting the production environment. Therefore, it serves as a more secure and reliable method for version releases.',
  AB_TESTING_DESC:
    'This method is very helpful to understand whether product updates or improvements have met expectations. It can be used when new needs arise and it will not affect the business stability.',

  NO_SERVICE_MESH_TIP:
    'Applications that are not enabled for application governance cannot be published in grayscale.',

  NO_GRAY_RELEASE_JOBS_TIP: 'There is no running grayscale release job.',
  NO_GRAY_RELEASE_JOBS_TIP_2:
    'You can bind grayscale release strategies for publishing grayscale release jobs.',
  TOTAL_GRAY_RELEASE_JOBS: 'Total {num} grayscale release jobs',

  GRAY_RELEASE_VERSION_FORMAT_DESC:
    'It can only contain lowercase letters and numbers with a maximum of 16 characters.',
  GRAY_RELEASE_VERSION_DESC:
    'Introduce the new version into the existing application service mesh',
  POLICY_CONFIG_DESC:
    'Release based on traffic ratio: According to the traffic ratio configuration rule, the specified proportion of traffic will be split from the original version to the grayscale version.',

  GRAY_RELEASE_DESC:
    'Grayscale release represents an important means of software product update in the production environment. It provides a release method for the smooth transition of software applications as they are updated and deployed.',
  GRAYSCALE_RELEASE_DESC:
    'Grayscale release represents an important means of software product update in the production environment. It provides a release method for the smooth transition of software applications as they are updated and deployed.',
  GRAY_RELEASE_BY_CONTENT_TIP:
    'Release based on request content: According to the request content configuration rule, only traffic that meets certain conditions in the requested content will be split into grayscale versions. This policy is only valid for direct access to the portal service.',

  MIRROR_POLICY_DESC:
    'Microservices allow us to deliver applications faster while not affecting business stability. In this connection, traffic mirroring reduces the risk of changes in the production environment. </br>With Traffic mirroring, the network traffic in the production environment can be copied into a grayscale version, which serves as an effective way to test the new version before it runs in the actual environment (with real-time user traffic).',

  RATIO_MODIFY_NOTIFY_CONTENT:
    'You have adjusted the target traffic ratio of the version {version} to {ratio}%, and you can continue to adjust the target traffic ratio or make it take effect immediately.',
  CANARY_BY_TRAFFIC_DESC:
    'According to the traffic proportional rule, {ratio}% of the requested traffic to component {component} is forwarded to the grayscale version {newVersion}.',

  DEPLOY_APP_CONFIRM: 'Sure to deploy sample application?',
  DEPLOY_APP_TIP: 'You are going to deploy the sample app {name}.',

  DEPLOY_SAMPLE_NO_INTERNET_ACCESS_TIP:
    'The gateway for application governance is not found in the current project, so you cannot deploy the sample app. Please contact your project administrator to turn it on in [Advanced Settings].',

  PREREQUEST_FOR_USE_GRAYRELEASE_Q: 'Prerequisites for using grayscale release',
  PREREQUEST_FOR_USE_GRAYRELEASE_A:
    'You need to create a composing app before you adopt grayscale release and enable the service governance feature for the service that will use grayscale release.',

  JOB_OFFLINE_WARNING:
    'Before you take a task offline, you need to select an available version first, which is to make sure the service can run smoothly during the whole process. You need to select a version and take it offline. After that, the system will automatically transfer all the traffic to another available version.',
  JOB_OFFLINE_INFO:
    'Now you can take the task offline and the version {version} will be removed.',
}
