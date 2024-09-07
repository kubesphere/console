/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import * as semver from 'semver';

import { FormattedExtension } from '../../../../../stores/extension';
import { InstallModalActionType, InstallModalStepKey } from '../../constants';
import { formatInstallModalActionType } from '../../utils/installation';

interface GetInstallModalConfigOptions {
  actionType: InstallModalActionType;
  formattedExtension: FormattedExtension;
  isMultiClusterInstallation?: boolean;
}

function getInstallModalConfig({
  actionType,
  formattedExtension,
  isMultiClusterInstallation,
}: GetInstallModalConfigOptions) {
  const { isExtensionInstall, isExtensionUpdate, isClusterInstall, isClusterConfig } =
    formatInstallModalActionType(actionType);
  const extensionIncludeStepKeys = [
    InstallModalStepKey.ExtensionVersionSelection,
    InstallModalStepKey.ExtensionAction,
  ];
  const clusterIncludeStepKeys = [
    InstallModalStepKey.ClusterSelections,
    InstallModalStepKey.ClusterConfigs,
  ];
  const finalExtensionIncludeStepKeys = isMultiClusterInstallation
    ? [...extensionIncludeStepKeys, ...clusterIncludeStepKeys]
    : extensionIncludeStepKeys;

  if (isExtensionInstall) {
    return {
      title: `${t('INSTALL')} ${formattedExtension.localeDisplayName}`,
      includeStepKeys: finalExtensionIncludeStepKeys,
      extensionActionLabel: t('EXTENSION_INSTALLATION'),
    };
  }

  if (isExtensionUpdate) {
    return {
      title: `${t('UPDATE')} ${formattedExtension.localeDisplayName}`,
      includeStepKeys: finalExtensionIncludeStepKeys,
      extensionActionLabel: t('EXTENSION_UPDATE'),
    };
  }

  if (isClusterInstall) {
    return {
      title: t('INSTALL_CLUSTER_AGENT'),
      includeStepKeys: clusterIncludeStepKeys,
    };
  }

  if (isClusterConfig) {
    return {
      title: t('CLUSTER_AGENT_CONFIGS'),
      includeStepKeys: clusterIncludeStepKeys,
    };
  }

  return {
    title: '',
    includeStepKeys: [],
  };
}

function getIsUpdateEnabled({
  actionType,
  isInstalled,
  installedVersion,
  targetVersion,
}: {
  actionType: InstallModalActionType;
  isInstalled: boolean;
  installedVersion: string | undefined;
  targetVersion: string | undefined;
}) {
  const { isExtensionUpdate } = formatInstallModalActionType(actionType);

  const isUpdateEnabled =
    isExtensionUpdate &&
    isInstalled &&
    installedVersion &&
    targetVersion &&
    semver.lt(installedVersion ?? '', targetVersion ?? '');

  return { isUpdateEnabled: Boolean(isUpdateEnabled) };
}

export { getInstallModalConfig, getIsUpdateEnabled };
