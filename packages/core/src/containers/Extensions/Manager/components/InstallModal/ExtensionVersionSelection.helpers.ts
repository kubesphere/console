/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { FormattedExtension, FormattedExtensionVersion } from '../../../../../stores/extension';
import { InstallModalActionType } from '../../constants';
import { formatInstallModalActionType } from '../../utils/installation';
import {
  filterUpdatableSatisfiedFormattedExtensionVersions,
  satisfiesExtensionVersion,
} from '../../utils/version';

interface GetExtensionVersionSelectionConfigOptions {
  actionType: InstallModalActionType;
  formattedExtension: FormattedExtension;
}

function getExtensionVersionSelectionConfig({
  actionType,
  formattedExtension,
}: GetExtensionVersionSelectionConfigOptions) {
  const { isExtensionInstall, isExtensionUpdate } = formatInstallModalActionType(actionType);

  if (isExtensionInstall) {
    return {
      hasUpdateWarning: false,
      label: t('EXTENSION_VERSION'),
      disabledVersionSelector: !formattedExtension.isUninstalled,
    };
  }

  if (isExtensionUpdate) {
    return {
      hasUpdateWarning: true,
      label: t('AVAILABLE_UPDATE_VERSIONS'),
      disabledVersionSelector: false,
    };
  }

  return null;
}

interface GetSatisfiedFormattedExtensionVersionsOptions {
  actionType: InstallModalActionType;
  formattedExtension: FormattedExtension;
  formattedExtensionVersions: FormattedExtensionVersion[];
}

function getSatisfiedFormattedExtensionVersions({
  actionType,
  formattedExtension,
  formattedExtensionVersions,
}: GetSatisfiedFormattedExtensionVersionsOptions) {
  const { isExtensionInstall, isExtensionUpdate } = formatInstallModalActionType(actionType);

  if (isExtensionInstall) {
    return formattedExtensionVersions;
  }

  if (isExtensionUpdate) {
    return filterUpdatableSatisfiedFormattedExtensionVersions({
      formattedExtension,
      formattedExtensionVersions,
    });
  }

  return [];
}

type GetVersionOptionsOptions = GetSatisfiedFormattedExtensionVersionsOptions;

function getVersionOptions({
  actionType,
  formattedExtension,
  formattedExtensionVersions,
}: GetVersionOptionsOptions) {
  const extensionVersionSelectionConfig = getExtensionVersionSelectionConfig({
    actionType,
    formattedExtension,
  });
  const satisfiedFormattedExtensionVersions = getSatisfiedFormattedExtensionVersions({
    actionType,
    formattedExtension,
    formattedExtensionVersions,
  });
  const versionOptions = satisfiedFormattedExtensionVersions.map(
    ({ version, kubeVersion: k8sVersionRange, ksVersion: ksVersionRange }) => {
      const { isSatisfied, isK8sSatisfied, isKsSatisfied, k8sVersion, ksVersion } =
        satisfiesExtensionVersion({ k8sVersionRange, ksVersionRange });

      return {
        value: version,
        label: extensionVersionSelectionConfig?.label ?? '',
        k8sVersionRange,
        k8sVersion,
        isK8sSatisfied,
        ksVersionRange,
        ksVersion,
        isKsSatisfied,
        isRecommendedVersion: version === formattedExtension.recommendedVersion,
        isDisabled: !isSatisfied,
      };
    },
  );
  const enabledVersionOptions = versionOptions.filter(({ isDisabled }) => !isDisabled);

  return { versionOptions, enabledVersionOptions };
}

interface GetDefaultSelectedVersionOptions {
  enabledVersionOptions: ReturnType<typeof getVersionOptions>['enabledVersionOptions'];
  displayVersion: string;
}

function getDefaultSelectedVersion({
  enabledVersionOptions,
  displayVersion,
}: GetDefaultSelectedVersionOptions) {
  if (enabledVersionOptions.length === 0) {
    return undefined;
  }

  const hasDisplayVersion = enabledVersionOptions.find(({ value }) => value === displayVersion);

  if (hasDisplayVersion) {
    return displayVersion;
  }

  return enabledVersionOptions[0]?.value;
}

export { getExtensionVersionSelectionConfig, getVersionOptions, getDefaultSelectedVersion };
