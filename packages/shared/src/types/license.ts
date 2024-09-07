/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

export interface LicenseClusterStatus {
  clusterNum?: number;
  cpuNum?: number;
  vcpuNum?: number;
}

export interface OriginalLicenseClusterStatus {
  clusterId: string;
  clusterNum: number;
  lastUpdatedAt: string;
  hostClusterStatus: LicenseClusterStatus;
  memberClusterStatus: LicenseClusterStatus;
  managedClusterStatus: LicenseClusterStatus;
}

type ExtensionNameKey = 'ks-core' | string;

export type LicenseType = 'subscription' | string;

export type LicenseImportedBy = 'online' | 'offline';

export type LicenseResourceType = 'Cluster' | 'CPU' | 'VCPU' | '';

export type LicenseViolationUnauthorizedType =
  | 'Format error'
  | 'Invalid signature'
  | 'Empty license'
  | 'Time not start'
  | 'Cluster not match'
  | 'Not support license'
  | 'Deprecated license';

export type LicenseViolationExpiredType = 'Time expired';

export type LicenseViolationOverLimitType =
  | 'Cluster count limit exceeded'
  | 'vCPU count limit exceeded';

export type LicenseViolationAuthorizedType = 'No violation';

export type LicenseViolationType =
  | LicenseViolationUnauthorizedType
  | LicenseViolationExpiredType
  | LicenseViolationOverLimitType
  | LicenseViolationAuthorizedType;

export interface OriginalLicense {
  extension: ExtensionNameKey;
  id: string;
  profile?: {
    corporation?: string;
    importedAt?: string;
    importedBy: LicenseImportedBy;
    issuedAt: string;
    licenseType: LicenseType;
    notAfter?: string;
    notBefore: string;
    resourceType: LicenseResourceType;
  };
  violation: {
    current?: number;
    expected?: number;
    reason?: string;
    type: LicenseViolationType;
    updatedAt?: string;
  };
}

export interface OriginalLicenseList {
  items: OriginalLicense[];
  total: number;
}

export type LicenseAuthorizationStatus = 'unauthorized' | 'expired' | 'overLimit' | 'authorized';

export type MaintenanceStatus = 'noMaintenance' | 'expired' | 'maintenance';

export interface FormattedLicense extends OriginalLicense {
  extensionName: string;
  isSubscription: boolean;
  isPermanent: boolean;
  authorizationStatus: LicenseAuthorizationStatus;
  isUnauthorized: boolean;
  isExpired: boolean;
  isOverLimit: boolean;
  isAuthorized: boolean;
  isError: boolean;
  authorizationRemainingDays: number;
  isAuthorizationAboutToExpire: boolean;
  maintenanceStatus: MaintenanceStatus;
  isWarningLicenseTip: boolean;
  isInfoLicenseTip: boolean;
  isLicenseTipShown: boolean;
  displayLicenseType: string;
  displayAuthorizationStatusText: string;
  displayAuthorizationStatusColor: string;
  displayMaintenanceStatusText: string;
  displayMaintenanceStatusColor: string;
  displayStartTime: string;
  displayEndTime: string;
  displayImportTime: string;
  displayResourceTypeText: string;
  displayUsage: string;
  displayUsagePercentage: string;
}

export interface PostLicenseMutationVariables {
  raw: string;
}

export interface DeleteLicenseMutationVariables {
  extensionName: string;
}
