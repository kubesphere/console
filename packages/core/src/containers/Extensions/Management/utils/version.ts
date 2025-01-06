/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import * as semver from 'semver';

import type { FormattedExtension, FormattedExtensionVersion } from '../../../../stores/extension';

function satisfiesVersion(version: string, range: string) {
  if (!range) {
    return true;
  }

  return semver.satisfies(version, range, { includePrerelease: true });
}

function satisfiesK8sVersion(range: string) {
  const version: string = globals.ksConfig?.k8sVersion ?? '';
  const isSatisfied = satisfiesVersion(version, range);
  return { isSatisfied, version };
}

function satisfiesKsVersion(range: string) {
  const version: string = globals.ksConfig?.ksVersion ?? '';
  const isSatisfied = satisfiesVersion(version, range);
  return { isSatisfied, version };
}

function satisfiesExtensionVersion({
  k8sVersionRange,
  ksVersionRange,
}: {
  k8sVersionRange: string;
  ksVersionRange: string;
}) {
  const { isSatisfied: isK8sSatisfied, version: k8sVersion } = satisfiesK8sVersion(k8sVersionRange);
  const { isSatisfied: isKsSatisfied, version: ksVersion } = satisfiesKsVersion(ksVersionRange);
  const isSatisfied = isK8sSatisfied && isKsSatisfied;

  return { isSatisfied, isK8sSatisfied, isKsSatisfied, k8sVersion, ksVersion };
}

interface FilterUpdatableSatisfiedFormattedExtensionVersionsOptions {
  formattedExtension: FormattedExtension;
  formattedExtensionVersions: FormattedExtensionVersion[];
}

function filterUpdatableSatisfiedFormattedExtensionVersions({
  formattedExtension,
  formattedExtensionVersions,
}: FilterUpdatableSatisfiedFormattedExtensionVersionsOptions) {
  const { isInstalled, installedVersion } = formattedExtension;

  if (!(isInstalled && installedVersion)) {
    return [];
  }

  return formattedExtensionVersions.filter(
    ({ kubeVersion, ksVersion, version }) =>
      satisfiesExtensionVersion({ k8sVersionRange: kubeVersion, ksVersionRange: ksVersion })
        .isSatisfied && semver.gt(version, installedVersion),
  );
}

export {
  satisfiesVersion,
  satisfiesExtensionVersion,
  filterUpdatableSatisfiedFormattedExtensionVersions,
};
