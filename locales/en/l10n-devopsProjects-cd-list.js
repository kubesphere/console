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
  CD_PL: 'Continuous Deployment',
  CD_LOW: 'Continuous Deployment',
  CD_RESOURCE_PL: 'Continuous deployment of resources',
  CD_DESC:
    'This page allows you to create and manage continuously deployed resources via gitops. ',
  EMPTY_CD_TITLE: 'No continuous deployment resources found',
  CD_EMPTY_DESC: 'Please create a continuous deployment resource. ',
  DEPLOY_LOCATION: 'Deployment location',
  SYNC_STRATEGY: 'Sync strategy',
  SYNC_SETTINGS: 'Sync settings',
  CODE_REPOSITORY_SETTINGS: 'Code repository settings',
  AUTO_SYNC: 'Auto Sync',
  MANUAL_SYNC: 'Manual sync',
  AUTO_SYNC_DESC: 'Synchronize according to the rules set automatically. ',
  MANUAL_SYNC_DESC: 'Sync according to manually set rules. ',
  REVISE: 'Revision',
  REVISE_DESC: 'Set the branch and tag of the code repository. ',
  RESOURCE_FILE_PATH: 'Resource file path',
  SET_THE_RESOURCE_FILE_PATH: 'Set the resource file path. ',
  ABANDON_KUBECTL_APPLY: 'Abandon kubectl apply',
  ABANDON_KUBECTL_APPLY_DESC:
    "The resource will be synced using the 'kubectl replace/create' command, which may cause the resource to be recreated.",
  INFO: 'Information',
  SYNC_RESULT: 'Synchronization result',
  SYNC_RESULT_EMPTY_DESC: 'The synchronization result query result is empty',
  DEPLOYMENT_SETTINGS: 'Deployment settings',
  LATEST_SYNC_STATUS: 'Latest sync status',
  REPO_EMPTY_DESC: 'Code repository cannot be empty',
}
