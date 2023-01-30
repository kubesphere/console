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
  CONTINUOUS_DEPLOYMENT_DESC:
    'Manage continuous deployments to continuously deploy resources by using GitOps. ',
  // List
  CONTINUOUS_DEPLOYMENT_EMPTY_DESC: 'Please create a continuous deployment.',
  DEGRADED: 'Degraded',
  PROGRESSING: 'Progressing',
  SYNCED: 'Synced',
  MISSING: 'Missing',
  SUSPENDED: 'Suspended',
  OUTOFSYNC: 'Out of sync',
  DEPLOY_LOCATION: 'Deployment Location',
  // List > Create
  CREATE_CONTINUOUS_DEPLOYMENT: 'Create Continuous Deployment',
  CD_SELECT_CODE_REPO_DESC:
    'Select a code repository to be used by the continuous deployment.',
  DEPLOYMENT_SETTINGS: 'Deployment Settings',
  CODE_REPOSITORY_SETTINGS: 'Code Repository Settings',
  SYNC_STRATEGY_TCAP: 'Sync Strategy',
  AUTO_SYNC_DESC: 'Sync according to rules set automatically.',
  // MANUAL_SYNC_DESC: 'Sync according to custom rules.',
  PRUNE_RESOURCES: 'Prune resources',
  SELF_HEAL: 'Self-heal',
  MANIFEST_FILE_PATH: 'Manifest File Path',
  // MANIFEST_FILE_PATH_DESC: 'Set the manifest file path. ',
  DIRECTORY_RECURSE: 'Directory recurse',
  REPO_EMPTY_DESC: 'Please select a code repository.',
  VALUES_FILES: 'Values Files',
  VALUES_FROM: 'Values From',
  STORAGE_NAMESPACE: 'Storage Namespace',
  TEST: 'Test',
  REVISIONS_DESC:
    'Git repository commit ID, branch, or tag. For example: "master", "v1.2.0", "0a1b2c3", or "HEAD".',
  MANIFEST_FILE_PATH_DESC:
    'Manifest file path, for example: "deployments/nginx" or "deployments/"',
  MANUAL_SYNC_DESC: 'Sync according to custom rules.',
  AUTO_SYNC_DESC:
    'Automatically trigger application sync when there is a difference between the manifest in Git and the real-time state of the deployed resources, according to the set sync options.',
  PRUNE_RESOURCES_DESC:
    'If selected, resources that do not exist in Git will be deleted during automatic sync. If not selected, resources in the cluster will not be deleted when automatic sync is triggered.',
  SELF_HEAL_DESC:
    'If selected, when there is a deviation between the defined state in Git and the deployed resources, the defined state in Git will be enforced. If not selected, automatic sync will not be triggered when changes are made to the deployed resources.',
  FOREGROUND_DESC:
    'Delete dependent resources first, then delete the main resource.',
  BACKGROUND_DESC:
    'Delete the main resource first, then delete the dependent resource.',
  ORPHAN_DESC:
    'Delete the main resource and leave the dependent resource as an orphan.',
  SKIP_SCHEMA_VALIDATION_DESC:
    'Skip kubectl validation. Add the --validate=false flag when kubectl applies the object.',
  AUTO_CREATE_PROJECT_DESC:
    'Automatically create a project for application resources when the project does not exist.',
  PRUNE_LAST_DESC:
    'Clean up resources after other resources are deployed and healthy.',
  APPLY_OUT_OF_SYNC_ONLY_DESC: 'Only apply resources that are out of sync.',
  // List > Delete
  CONTINUOUS_DEPLOYMENT: 'Continuous Deployment',
  CONTINUOUS_DEPLOYMENT_LOW: 'continuous deployment',
  DELETE_CONTINUOUS_DEPLOYMENT_DESC_SI:
    'You are about to delete the continuous deployment {resource}. <br/>Please confirm whether to delete resources created by the continuous deployment.',
  DELETE_CONTINUOUS_DEPLOYMENT_DESC_PL:
    'You are about to delete the continuous deployments {resource}. <br/>Please confirm whether to delete resources created by the continuous deployments.',
  NO_CONTINUOUS_DEPLOYMENT_RELATED_RESOURCE_DESC:
    'No resource created by the continuous deployment is found.',
  DELETE_MULTIPLE_CONTINUOUS_DEPLOYMENT:
    'Delete Multiple Continuous Deployments',
  DELETE_CONTINUOUS_DEPLOYMENT: 'Delete Continuous Deployment',
  DELETE_CONTINUOUS_DEPLOYMENT_RELATE_DESC:
    'Delete resources created by {resourceName}',
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
  // List > Parameter
  PARAMETER_SETTINGS: 'Parameter Settings',
  AUTO_PARAMETER: 'Auto',
  AUTO_PARAMETER_DESC: 'Set automatically.',
  HELM_PARAMETER: 'Helm',
  HELM_PARAMETER_DESC: 'Set Helm parameter.',
  KUSTOMIZE_PARAMETER: 'Kustomize',
  KUSTOMIZE_PARAMETER_DESC: 'Set Kustomize parameters.',
  PASS_CREDENTIALS: 'Pass Credentials',
  IGNORE_MISSING_VALUE_FILES: 'Ignore Missing Value Files',
  SKIP_CRDS: 'Skip Crds',
  RELEASE_NAME: 'Release Name',
  VALUE_FILES: 'Value Files',
  FORCE_STRING: 'Force String',
  FILE_PARAMETERS: 'File Parameters',
  NAME_PREFIX: 'Name Prefix',
  NAME_SUFFIX: 'Name Suffix',
  IMAGES: 'Images',
  COMMON_LABELS: 'Common Labels',
  COMMON_ANNOTATIONS: 'Common Annotations',
}
