/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import type {
  OriginalLicense,
  LicenseViolationUnauthorizedType,
  LicenseViolationExpiredType,
  LicenseViolationOverLimitType,
  LicenseViolationAuthorizedType,
  LicenseResourceType,
  LicenseAuthorizationStatus,
  MaintenanceStatus,
} from '../types/license';

export const PAGE_BASE_PATH = '/settings/licenses';

export const LICENSE_KEY_MAP = {
  ksCore: 'ks-core',
  ksCoreMaintenance: 'ks-core-maintenance',
};

export const DEFAULT_KS_CORE_ORIGINAL_LICENSE: OriginalLicense = {
  extension: LICENSE_KEY_MAP.ksCore,
  id: '',
  profile: {
    importedBy: 'offline',
    issuedAt: '',
    licenseType: '',
    notBefore: '',
    resourceType: '',
  },
  violation: {
    type: 'Empty license',
  },
};

export const LICENSE_UNAUTHORIZED_VIOLATION_TYPES: LicenseViolationUnauthorizedType[] = [
  'Format error',
  'Invalid signature',
  'Empty license',
  'Time not start',
  'Cluster not match',
  'Not support license',
  'Deprecated license',
];

export const LICENSE_EXPIRED_VIOLATION_TYPES: readonly LicenseViolationExpiredType[] = [
  'Time expired',
];

export const LICENSE_OVER_LIMIT_VIOLATION_TYPES: readonly LicenseViolationOverLimitType[] = [
  'Cluster count limit exceeded',
  'vCPU count limit exceeded',
];

export const LICENSE_AUTHORIZED_VIOLATION_TYPES: LicenseViolationAuthorizedType[] = [
  'No violation',
];

export const ABOUT_TO_EXPIRE_DAYS = 30;

export function getLicenseAuthorizationStatusInfo(key: LicenseAuthorizationStatus) {
  const AUTHORIZATION_STATUS_MAP = {
    unauthorized: {
      text: t('UNAUTHORIZED'),
      color: 'error',
    },
    expired: {
      text: t('AUTHORIZATION_EXPIRED'),
      color: 'warning',
    },
    overLimit: {
      text: t('INSUFFICIENT_NUMBER_OF_AUTHORIZATIONS'),
      color: 'warning',
    },
    authorized: {
      text: t('AUTHORIZED'),
      color: 'success',
    },
  };

  return AUTHORIZATION_STATUS_MAP[key];
}

export function getLicenseMaintenanceStatusInfo(key: MaintenanceStatus) {
  const MAINTENANCE_STATUS_MAP = {
    noMaintenance: {
      text: t('NO_MAINTENANCE'),
      color: 'error',
    },
    expired: {
      text: t('EXPIRED'),
      color: 'warning',
    },
    maintenance: {
      text: t('MAINTENANCE_AVAILABLE'),
      color: 'success',
    },
  };

  return MAINTENANCE_STATUS_MAP[key];
}

export function getLicenseResourceTypeInfo(key: LicenseResourceType) {
  const AUTHORIZATION_UNIT_MAP = {
    Cluster: {
      text: t('LICENSES_MODULE_CLUSTER'),
      unitText: '',
    },
    CPU: {
      text: 'CPU',
      unitText: t('LICENSES_MODULE_CORES'),
    },
    VCPU: {
      text: 'vCPU',
      unitText: t('LICENSES_MODULE_CORES'),
    },
    '': undefined,
  };

  const defaultInfo = {
    text: '',
    unitText: '',
  };

  return AUTHORIZATION_UNIT_MAP[key] ?? defaultInfo;
}
