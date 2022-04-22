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

  BLUE_GREEN_DEPLOYMENT_LOW: 'blue-green deployment',
  CANARY_RELEASE_LOW: 'canary release',
  TRAFFIC_MIRRORING_LOW: 'traffic mirroring',

  'Deploy sample application': 'Deploy sample application',
  'Edit Grayscale Release Job': 'Edit Grayscale Release Job',

  GRAYSCALE_RELEASE_COMPONENT: 'Grayscale Release Component',
  GRAYSCALE_RELEASE_COMPONENT_PL: 'Grayscale Release Components',
  GRAYSCALE_RELEASE_VERSION_TCAP: 'Grayscale Release Version',
  GRAYSCALE_RELEASE_VERSION_NUMBER: 'Grayscale Release Version Number',

  DELETE_JOB: 'Delete Job',

  'Mirrored traffic is only receiving traffic, no service':
    'Mirrored traffic is only receiving traffic, no service',
  NO_WORKLOAD_FOUND_TIP: 'No workload found',
  'Not online': 'Not online',

  'Operating System': 'Operating System',

  STRATEGY_CONFIGURATIONS_TCAP: 'Strategy Configurations',

  REAL_TIME_TRAFFIC_DIST_TCAP: 'Real-Time Traffic Distribution',

  GRAY_RELEASE_JOB_NAME: 'Grayscale Release Job Name',

  RULE_DESCRIPTION: 'Rule Description',
  'Take Over': 'Take Over',
  TAKE_ONLINE: 'Take Online',
  'The current version is not online, you can let this version take over all traffic and bring it online.':
    'The current version is not online, you can let this version take over all traffic and bring it online.',
  traffic: 'traffic',

  TRAFFIC_CONTROL: 'Traffic Control',

  VERSION_COMPARISON: 'Version Comparison',
  'version number is invalid': 'version number is invalid.',
  'Version Off': 'Version Off',

  GRAY_RELEASE_CATEGORIES: 'Strategies',

  GRAY_RELEASE_STRATEGY_SI: 'Grayscale Release Strategy',

  AB_TESTING_DESC:
    'This method is very helpful to understand whether product updates or improvements have met expectations. It can be used when new needs arise and it will not affect the business stability.',

  GRAY_RELEASE_VERSION_DESC:
    'Introduce the new version into the existing application service mesh',
  POLICY_CONFIG_DESC:
    'Release based on traffic ratio: According to the traffic ratio configuration rule, the specified proportion of traffic will be split from the original version to the grayscale version.',

  DEPLOY_APP_CONFIRM: 'Sure to deploy sample application?',
  DEPLOY_APP_TIP: 'You are going to deploy the sample app {name}.',

  DEPLOY_SAMPLE_NO_INTERNET_ACCESS_TIP:
    'The gateway for application governance is not found in the current project, so you cannot deploy the sample app. Please contact your project administrator to turn it on in [Advanced Settings].',

  // Grayscale release detail page

  // Grayscale release components tab

  GRAY_WORKLOAD_TYPE: 'Workload Type: ',

  // Grayscale release version tab

  // Grayscale strategy configurations tab

  // Canary Strategy Tab

  // Grayscale Release Job List
  GRAYSCALE_JOB_STRATEGY: 'Grayscale release strategy',
  GRAYSCALE_JOB_COMPONENT: 'Grayscale release component',
}
