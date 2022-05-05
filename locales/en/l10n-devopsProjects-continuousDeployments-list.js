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
  CONTINUOUS_DEPLOYMENT_PL: 'Continuous Deployments',
  CONTINUOUS_DEPLOYMENT_DESC: 'Manage continuous deployments to continuously deploy resources by using GitOps. ',
  // List
  CONTINUOUS_DEPLOYMENT_EMPTY_DESC: 'Please create a continuous deployment.',
  DEGRADED: 'Degraded',
  PROGRESSING: 'Progressing',
  SYNCED: 'Synced',
  MISSING: 'Missing',
  SUSPENDED: 'Suspended',
  OUT_OF_SYNC: 'Out of sync',
  DEPLOY_LOCATION: 'Deployment Location',
  // List > Create
  CREATE_CONTINUOUS_DEPLOYMENT: 'Create Continuous Deployment',
  CD_SELECT_CODE_REPO_DESC: 'Select a code repository to be used by the continuous deployment.',
  DEPLOYMENT_SETTINGS: 'Deployment Settings',
  CODE_REPOSITORY_SETTINGS: 'Code Repository Settings',
  SYNC_STRATEGY_TCAP: 'Sync Strategy',
  AUTO_SYNC_DESC: 'Sync according to rules set automatically.',
  MANUAL_SYNC_DESC: 'Sync according to custom rules.',
  PRUNE_RESOURCES: 'Prune resources',
  SELF_HEAL: 'Self-heal',
  MANIFEST_FILE_PATH: 'Manifest File Path',
  MANIFEST_FILE_PATH_DESC: 'Set the manifest file path. ',
  REPO_EMPTY_DESC: 'Please select a code repository.',
  // List > Delete
  CONTINUOUS_DEPLOYMENT: 'Continuous Deployment',
  CONTINUOUS_DEPLOYMENT_LOW: 'continuous deployment',
  DELETE_CONTINUOUS_DEPLOYMENT_DESC_SI: 'You are about to delete the continuous deployment {resource}. <br/>Please confirm whether to delete resources created by the continuous deployment.',
  DELETE_CONTINUOUS_DEPLOYMENT_DESC_PL:'You are about to delete the continuous deployments {resource}. <br/>Please confirm whether to delete resources created by the continuous deployments.',
  NO_CONTINUOUS_DEPLOYMENT_RELATED_RESOURCE_DESC:'No resource created by the continuous deployment is found.',
  DELETE_MULTIPLE_CONTINUOUS_DEPLOYMENT: 'Delete Multiple Continuous Deployments',
  DELETE_CONTINUOUS_DEPLOYMENT: 'Delete Continuous Deployment',
  DELETE_CONTINUOUS_DEPLOYMENT_RELATE_DESC:'Delete resources created by {resourceName}',
  // List > Sync
  SYNC: 'Sync',
  SYNC_RESOURCE: 'Sync Resource',
  REVISION: 'Revision',
  REVISION_DESC: 'Set a branch or tag of the code repository.',
  PRUNE: 'Prune',
  DRY_RUN: 'Dry run',
  APPLY_ONLY: 'Apply only',
  FORCE: 'Force',
  SYNC_SETTINGS: 'Sync Settings',
  SKIP_SCHEMA_VALIDATION: 'Skip schema validation',
  AUTO_CREATE_PROJECT: 'Auto create project',
  PRUNE_LAST: 'Prune last',
  APPLY_OUT_OF_SYNC_ONLY: 'Apply out of sync only',
  PRUNE_PROPAGATION_POLICY: 'Prune Propagation Policy',
  REPLACE_RESOURCE: 'Replace Resource',
  REPLACE_RESOURCE_DESC: 'Replace resources that already exist.',
  EMPTY_CD_TITLE: 'No Continuous Deployment Found',
  SYNC_TRIGGERED: 'Resource sync was triggered successfully.',
}
