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

export default {
  GRAY_RELEASE_CATEGORIES: 'Categories',

  NO_GRAY_RELEASE_JOBS_TIP: 'There is no running grayscale release job.',
  NO_GRAY_RELEASE_JOBS_TIP_2:
    'You can bind grayscale release strategies for publishing grayscale release jobs.',

  TOTAL_GRAY_RELEASE_JOBS: 'Total {num} grayscale release jobs',

  GRAY_RELEASE_VERSION_FORMAT_DESC:
    'It can only contain lowercase letters and numbers. The maximum length of characters is set to 16.',

  GRAY_RELEASE_VERSION_DESC:
    'Introduce the new version into the existing application service mesh',
  POLICY_CONFIG_DESC:
    'Release based on traffic ratio: According to the traffic ratio configuration rule, the specified proportion of traffic will be split from the original version to the grayscale version.',

  GRAY_RELEASE_DESC:
    'Grayscale release is an important means for the iterative software products to be safely launched in production environment. It provides a release method for software version deployment and upgrade smooth transition.',
  GRAY_RELEASE_BY_CONTENT_TIP:
    'Release based on request content: According to the request content configuration rule, only traffic that meets certain conditions in the requested content will be split into grayscale versions. This policy is only valid for direct access to the portal service.',

  MIRROR_POLICY_DESC:
    'Microservice allows us to deliver applications faster, thus we can pursue delivery speed while ensuring the stability of the business. <br />Traffic Mirror reduces the risk of changes in the production environment more secure. Traffic Mirror can replicate the traffic of the production environment into a grayscale version, verifying if there are problems with the new version before real-time user traffic and load.',

  RATIO_MODIFY_NOTIFY_CONTENT:
    'You have adjusted the target traffic ratio of the version {version} to {ratio}%, and you can continue to adjust the target traffic ratio or make it take effect immediately.',
  CANARY_BY_TRAFFIC_DESC:
    'According to the traffic proportional rule, {ratio}% of the requested traffic to component {component} is forwarded to the grayscale version {newVersion}',

  DEPLOY_APP_CONFIRM: 'Sure to deploy sample application ?',
  DEPLOY_APP_TIP: 'You are going to deploy the sample app {name}.',

  DEPLOY_SAMPLE_NO_INTERNET_ACCESS_TIP:
    'The gateway for application governance is not found in the current project, so you cannot deploy the sample app. Please contact your project administrator to turn it on in [Advanced Settings].',

  PREREQUEST_FOR_USE_GRAYRELEASE_Q:
    'Prerequisites for using grayscale release ?',
  PREREQUEST_FOR_USE_GRAYRELEASE_A:
    'With the grayscale release feature you need to create a composing app and turn on service governance for services that require grayscale release.',
}
