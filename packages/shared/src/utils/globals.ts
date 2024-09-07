/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { merge } from 'lodash';

import type { FormattedLicense } from '../types/license';

interface GlobalLicenseInfo {
  formattedLicenses: FormattedLicense[];
}

export function getGlobalLicenseInfo(): GlobalLicenseInfo | undefined {
  // @ts-expect-error no errors
  return window.globals?.licenseInfo;
}

export function setGlobalLicenseInfo(value: GlobalLicenseInfo) {
  window.globals.licenseInfo = value;
  return value;
}

export function updateGlobalLicenseInfo(value: GlobalLicenseInfo): GlobalLicenseInfo {
  const result = merge({}, window.globals?.licenseInfo, value);
  setGlobalLicenseInfo(result);
  return result;
}
