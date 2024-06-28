import type { FormattedLicense } from '@ks-console/shared';
import { getGlobalLicenseInfo } from '@ks-console/shared';

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
