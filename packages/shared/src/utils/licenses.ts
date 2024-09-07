/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import type { FormattedLicense } from '../types/license';
import { getGlobalLicenseInfo } from './globals';

function getLicenseErrorInfo({
  formattedLicense,
}: {
  formattedLicense: FormattedLicense | undefined;
}) {
  const isLicenseAuthorized = formattedLicense?.isAuthorized;
  const licenseAuthorizationStatus = formattedLicense?.authorizationStatus ?? 'unauthorized';
  const isLicenseError = formattedLicense?.isError ?? true;

  return { isLicenseAuthorized, licenseAuthorizationStatus, isLicenseError };
}

function getLicenseErrorInfoFromLicenses({ extensionName }: { extensionName: string }) {
  const licenseInfo = getGlobalLicenseInfo();
  const formattedLicense = licenseInfo?.formattedLicenses?.find(
    (license: FormattedLicense) => license.extensionName === extensionName,
  );

  return getLicenseErrorInfo({ formattedLicense });
}

export { getLicenseErrorInfoFromLicenses };
