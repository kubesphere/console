/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import type { UseQueryOptions } from 'react-query';
import { useQuery, useMutation } from 'react-query';
import dayjs from 'dayjs';

import type {
  LicenseType,
  LicenseImportedBy,
  LicenseViolationType,
  OriginalLicenseClusterStatus,
  OriginalLicense,
  OriginalLicenseList,
  LicenseAuthorizationStatus,
  MaintenanceStatus,
  FormattedLicense,
  PostLicenseMutationVariables,
  DeleteLicenseMutationVariables,
} from '../types/license';
import {
  LICENSE_KEY_MAP,
  DEFAULT_KS_CORE_ORIGINAL_LICENSE,
  LICENSE_UNAUTHORIZED_VIOLATION_TYPES,
  LICENSE_EXPIRED_VIOLATION_TYPES,
  LICENSE_OVER_LIMIT_VIOLATION_TYPES,
  LICENSE_AUTHORIZED_VIOLATION_TYPES,
  ABOUT_TO_EXPIRE_DAYS,
  getLicenseAuthorizationStatusInfo,
  getLicenseMaintenanceStatusInfo,
  getLicenseResourceTypeInfo,
} from '../constants/licenses';
import { request, formatTime, getApiVersion } from '../utils';

const MODULE = 'licenses';
const API_VERSION = getApiVersion(MODULE);

function getApiPath({ path }: { path: string }): string {
  const basePath = API_VERSION ?? '';

  if (!path) {
    return basePath;
  }

  return `${basePath}/${path}`;
}

function createQueryKey(keys: any[]) {
  return [MODULE, ...keys];
}

function useLicenseClusterStatusQuery() {
  const url = getApiPath({ path: '/clusterstatus' });
  const queryKey = createQueryKey([url]);

  const result = useQuery({
    queryKey,
    queryFn: () => request.get<never, OriginalLicenseClusterStatus>(url),
  });
  const originalLicenseClusterStatus = result.data;

  return { ...result, originalLicenseClusterStatus };
}

function formatLicenseType({ licenseType }: { licenseType: LicenseType | undefined }) {
  const isSubscription = licenseType === 'subscription';
  const isPermanent = !isSubscription;

  return { isPermanent, isSubscription };
}

function formatPermanentMaintenanceStatus(
  maintenanceType: LicenseViolationType | undefined,
): MaintenanceStatus {
  if (LICENSE_EXPIRED_VIOLATION_TYPES.some(v => v === maintenanceType)) {
    return 'expired';
  }

  if (LICENSE_AUTHORIZED_VIOLATION_TYPES.some(v => v === maintenanceType)) {
    return 'maintenance';
  }

  return 'noMaintenance';
}

type FormatLicenseStatusOptions = FormatLicenseOptions;

interface FormatLicenseStatusReturns {
  authorizationStatus: LicenseAuthorizationStatus;
  maintenanceStatus: MaintenanceStatus;
}

function formatLicenseStatus({
  originalLicense,
  maintenanceType,
}: FormatLicenseStatusOptions): FormatLicenseStatusReturns {
  const { profile, violation } = originalLicense;
  const licenseType = profile?.licenseType;
  const { type } = violation;
  const { isSubscription, isPermanent } = formatLicenseType({ licenseType });

  const isUnauthorized = LICENSE_UNAUTHORIZED_VIOLATION_TYPES.some(v => v === type);
  const isExpired = LICENSE_EXPIRED_VIOLATION_TYPES.some(v => v === type);
  const isOverLimit = LICENSE_OVER_LIMIT_VIOLATION_TYPES.some(v => v === type);
  const isAuthorized = LICENSE_AUTHORIZED_VIOLATION_TYPES.some(v => v === type);

  const defaultResult: FormatLicenseStatusReturns = {
    authorizationStatus: 'unauthorized',
    maintenanceStatus: 'noMaintenance',
  };

  if (isUnauthorized) {
    return defaultResult;
  }

  if (isSubscription) {
    if (isExpired) {
      return {
        authorizationStatus: 'expired',
        maintenanceStatus: 'expired',
      };
    }

    if (isOverLimit) {
      return {
        authorizationStatus: 'overLimit',
        maintenanceStatus: 'noMaintenance',
      };
    }

    if (isAuthorized) {
      return {
        authorizationStatus: 'authorized',
        maintenanceStatus: 'maintenance',
      };
    }

    return defaultResult;
  }

  if (isPermanent) {
    if (isOverLimit) {
      return {
        authorizationStatus: 'overLimit',
        maintenanceStatus: 'noMaintenance',
      };
    }

    if (isAuthorized) {
      return {
        authorizationStatus: 'authorized',
        maintenanceStatus: formatPermanentMaintenanceStatus(maintenanceType),
      };
    }

    return defaultResult;
  }

  return defaultResult;
}

function formatAuthorizationStatus({
  isPermanent,
  authorizationStatus,
}: {
  isPermanent: boolean;
  authorizationStatus: LicenseAuthorizationStatus;
}) {
  let [isUnauthorized, isExpired, isOverLimit, isAuthorized] = [false, false, false, false];

  if (isPermanent) {
    if (authorizationStatus === 'unauthorized') {
      isUnauthorized = true;
    } else if (authorizationStatus === 'overLimit') {
      isOverLimit = true;
    } else {
      isAuthorized = true;
    }
  } else {
    if (authorizationStatus === 'authorized') {
      isAuthorized = true;
    } else if (authorizationStatus === 'overLimit') {
      isOverLimit = true;
    } else if (authorizationStatus === 'expired') {
      isExpired = true;
    } else {
      isUnauthorized = true;
    }
  }

  return { isUnauthorized, isExpired, isOverLimit, isAuthorized, isError: !isAuthorized };
}

function formatRemainingDays({
  isSubscription,
  isAuthorized,
  notAfter,
}: {
  isSubscription: boolean;
  isAuthorized: boolean;
  notAfter: string;
}) {
  let authorizationRemainingDays = 0;
  let isAuthorizationAboutToExpire = false;

  if (isSubscription && isAuthorized) {
    authorizationRemainingDays = dayjs(notAfter).diff(dayjs(), 'day');
    isAuthorizationAboutToExpire = authorizationRemainingDays <= ABOUT_TO_EXPIRE_DAYS;
  }

  return { authorizationRemainingDays, isAuthorizationAboutToExpire };
}

interface FormatLicenseOptions {
  originalLicense: OriginalLicense;
  maintenanceType?: LicenseViolationType;
}

function formatLicense({
  originalLicense,
  maintenanceType,
}: FormatLicenseOptions): FormattedLicense {
  const { extension: extensionName, profile, violation } = originalLicense;
  const {
    licenseType,
    notBefore = '',
    notAfter = '',
    importedAt = '',
    resourceType,
  } = profile ?? {};
  const { expected, current } = violation;

  const { isSubscription, isPermanent } = formatLicenseType({ licenseType });
  const statusValues = formatLicenseStatus({ originalLicense, maintenanceType });
  const { authorizationStatus, maintenanceStatus } = statusValues;

  const authorizationStatusValues = formatAuthorizationStatus({
    isPermanent,
    authorizationStatus,
  });
  /* const authorizationStatusValues = {
    isUnauthorized: true,
    isExpired: false,
    isOverLimit: false,
    isAuthorized: false,
  }; */

  const { isUnauthorized, isExpired, isOverLimit, isAuthorized } = authorizationStatusValues;

  const remainingDaysValues = formatRemainingDays({ isSubscription, isAuthorized, notAfter });
  /* const remainingDaysValues = {
    isAuthorizationAboutToExpire: true,
    authorizationRemainingDays: 26,
  }; */

  const { isAuthorizationAboutToExpire } = remainingDaysValues;

  const displayLicenseType = isSubscription ? t('SUBSCRIPTION') : t('PERMANENT_AUTHORIZATION');

  const authorizationStatusInfo = getLicenseAuthorizationStatusInfo(authorizationStatus);
  const displayAuthorizationStatusText = authorizationStatusInfo.text;
  const displayAuthorizationStatusColor = authorizationStatusInfo.color;

  const isWarningLicenseTip = isUnauthorized || isExpired || isOverLimit;
  const isInfoLicenseTip = isAuthorizationAboutToExpire;
  const isLicenseTipShown = isWarningLicenseTip || isInfoLicenseTip;

  const maintenanceStatusInfo = getLicenseMaintenanceStatusInfo(maintenanceStatus);
  const displayMaintenanceStatusText = maintenanceStatusInfo.text;
  const displayMaintenanceStatusColor = maintenanceStatusInfo.color;

  const displayStartTime = formatTime(notBefore, 'YYYY-MM-DD');
  const displayEndTime = formatTime(notAfter, 'YYYY-MM-DD');
  const displayImportTime = formatTime(importedAt, 'YYYY-MM-DD');

  const displayResourceTypeText = getLicenseResourceTypeInfo(resourceType ?? '').text;
  const { displayUsage, displayUsagePercentage } = (() => {
    if (!(typeof current === 'number' && typeof expected === 'number')) {
      return {
        displayUsage: '-',
        displayUsagePercentage: '-',
      };
    }

    const { unitText } = getLicenseResourceTypeInfo(resourceType ?? '');

    return {
      displayUsage: `${current}/${expected} ${unitText}`.trim(),
      displayUsagePercentage: `${((current / expected) * 100).toFixed(0)}%`,
    };
  })();

  return {
    ...originalLicense,
    extensionName,
    isSubscription,
    isPermanent,
    ...statusValues,
    ...authorizationStatusValues,
    ...remainingDaysValues,
    isWarningLicenseTip,
    isInfoLicenseTip,
    isLicenseTipShown,
    displayLicenseType,
    displayAuthorizationStatusText,
    displayAuthorizationStatusColor,
    displayMaintenanceStatusText,
    displayMaintenanceStatusColor,
    displayStartTime,
    displayEndTime,
    displayImportTime,
    displayResourceTypeText,
    displayUsage,
    displayUsagePercentage,
  };
}

interface UseLicensesStatusQueryOptions
  extends UseQueryOptions<
    unknown,
    unknown,
    {
      totalCount: number;
      formattedLicenses: FormattedLicense[];
      formattedKsCoreLicense: FormattedLicense;
    }
  > {
  params?: {
    importedBy?: LicenseImportedBy;
  };
}

function useLicensesQuery(options?: UseLicensesStatusQueryOptions) {
  const url = getApiPath({ path: '/licenses' });

  const params = options?.params;
  const importedBy = params?.importedBy;

  const requestParams = importedBy
    ? { annotation: `config.kubesphere.io/license-imported-by=${importedBy}` }
    : undefined;

  const queryKey = createQueryKey([url, requestParams]);

  const result = useQuery({
    enabled: options?.enabled,
    queryKey,
    queryFn: async () => {
      const data = await request.get<never, OriginalLicenseList>(url, { params: requestParams });
      const totalCount = data?.total ?? 0;
      const originalLicenses = data?.items ?? [];

      const originalKsCoreMaintenanceLicense = originalLicenses.find(
        ({ extension }) => extension === LICENSE_KEY_MAP.ksCoreMaintenance,
      );
      const maintenanceType = originalKsCoreMaintenanceLicense?.violation.type;

      const formattedLicenses =
        originalLicenses?.map(originalLicense => {
          if (originalLicense.extension === LICENSE_KEY_MAP.ksCore) {
            return formatLicense({ originalLicense, maintenanceType });
          }
          return formatLicense({ originalLicense });
        }) ?? [];

      const formattedKsCoreLicense =
        formattedLicenses.find(({ extensionName }) => extensionName === LICENSE_KEY_MAP.ksCore) ??
        formatLicense({ originalLicense: DEFAULT_KS_CORE_ORIGINAL_LICENSE });

      return { ...data, totalCount, formattedLicenses, formattedKsCoreLicense };
    },
    onSuccess: options?.onSuccess,
    onError: options?.onError,
    onSettled: options?.onSettled,
  });

  const { data } = result;
  const totalCount = data?.totalCount ?? 0;
  const formattedLicenses = data?.formattedLicenses ?? [];
  const formattedKsCoreLicense = data?.formattedKsCoreLicense;

  return { ...result, totalCount, formattedLicenses, formattedKsCoreLicense };
}

interface UsePostLicenseMutationOptions {
  isValidate?: boolean;
  onSuccess?: () => void;
}

function usePostLicenseMutation(options?: UsePostLicenseMutationOptions) {
  const isValidate = options?.isValidate ?? true;
  const onSuccess = options?.onSuccess;

  return useMutation<unknown, unknown, PostLicenseMutationVariables>({
    mutationFn: async variables => {
      const url = getApiPath({ path: '/licenses' });

      if (isValidate) {
        await request.post(url, variables, {
          params: { validate: true },
        });
      }

      await request.post(url, variables);
    },
    onSuccess: onSuccess,
  });
}

interface UseDeleteLicenseMutationOptions {
  onSuccess?: () => void;
}

function useDeleteLicenseMutation(options?: UseDeleteLicenseMutationOptions) {
  const onSuccess = options?.onSuccess;

  return useMutation<unknown, unknown, DeleteLicenseMutationVariables>({
    mutationFn: async variables => {
      const { extensionName } = variables;
      const url = getApiPath({ path: `/licenses/${extensionName}` });

      await request.delete(url);
    },
    onSuccess: onSuccess,
  });
}

export default {
  useLicenseClusterStatusQuery,
  useLicensesQuery,
  usePostLicenseMutation,
  useDeleteLicenseMutation,
};
