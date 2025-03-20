/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { useQuery, useMutation } from 'react-query';
import { merge, keyBy, mapValues, sortBy, omit } from 'lodash';
import * as semver from 'semver';
import cleanDeep from 'clean-deep';

import type { UseWebSocketOptions } from '@ks-console/shared';
import {
  formatTime,
  getBaseInfo,
  getOriginData,
  request,
  requestHelper,
  useWebSocket,
  podStore,
  safeAtob,
} from '@ks-console/shared';

import type {
  OriginalCategory,
  OriginalCategoryList,
  FetchExtensionsRequestParams,
  FetchKExtensionsRequestParams,
  ExtensionStatusState as ExtensionStatusStateType,
  ExtensionStatusCondition,
  OriginalExtension,
  OriginalExtensionList,
  OriginalExtensionVersion,
  OriginalExtensionVersionList,
  OriginalExtensionVersionFile,
  OriginalInstallPlan,
  PostInstallPlanRequestData,
  PatchInstallPlanRequestData,
  FormattedInstallPlanClusterSchedulingOverrides,
  CreateInstallPlanMutationVariables,
  UpdateInstallPlanMutationVariables,
  DeleteInstallPlanMutationVariables,
} from '../types/extension';
import { PodStatusPhase } from '../constants/pod';
import { ExtensionStatusState } from '../constants/extension';
import { getLocaleValue } from '../utils/extension';
import { useClustersQuery } from './cluster';

const { useWatchPods, usePodLogFollow, usePodLogQuery } = podStore;

const module = 'extensions';

function formatCategory(item: OriginalCategory) {
  const baseInfo = getBaseInfo<OriginalCategory>(item);
  const originData = getOriginData<OriginalCategory>(item);
  const spec = item?.spec;
  const displayName = spec?.displayName;
  const description = spec?.description;
  const localeDisplayName = getLocaleValue({
    data: displayName,
    defaultValue: item.metadata.name,
  });
  const localeDescription = getLocaleValue({
    data: description,
    defaultValue: '',
  });
  const count = item?.metadata?.annotations?.['kubesphere.io/count'];
  const displayCount = isNaN(Number(count)) ? 0 : Number(count);

  return {
    ...baseInfo,
    _originData: originData,
    localeDisplayName,
    localeDescription,
    displayCount,
  };
}

type FormattedCategory = ReturnType<typeof formatCategory>;

interface UseCategoriesQueryOptions {
  enabled?: boolean;
}

function useCategoriesQuery(options?: UseCategoriesQueryOptions) {
  const defaultOptions = { enabled: true };
  const finalOptions = { ...defaultOptions, ...options };
  const { enabled } = finalOptions;
  const url = 'apis/kubesphere.io/v1alpha1/categories';
  const queryKey = [module, url];
  const result = useQuery(queryKey, () => request.get<never, OriginalCategoryList>(url), {
    enabled,
  });
  const originalCategories = result.data?.items ?? [];
  const formattedCategories = originalCategories.map(formatCategory);

  return {
    ...result,
    originalCategories,
    formattedCategories,
  };
}

function formatStatusState({ statusState }: { statusState: ExtensionStatusStateType | undefined }) {
  const isPreparing = statusState === ExtensionStatusState.Preparing;
  const isInstalling = statusState === ExtensionStatusState.Installing;
  const isUpgrading = statusState === ExtensionStatusState.Upgrading;
  const isUninstalling = statusState === ExtensionStatusState.Uninstalling;
  const isInstalled = statusState === ExtensionStatusState.Installed;
  const isUninstalled = !statusState || statusState === ExtensionStatusState.Uninstalled;
  const isInstallFailed = statusState === ExtensionStatusState.InstallFailed;
  const isUpgradeFailed = statusState === ExtensionStatusState.UpgradeFailed;
  const isUninstallFailed = statusState === ExtensionStatusState.UninstallFailed;

  const isResetLocalExtensionStatusByInstallOrUpgrade =
    isPreparing || isInstalling || isUpgrading || isInstalled || isInstallFailed || isUpgradeFailed;
  const isResetLocalExtensionStatusByUninstall =
    isUninstalling || isUninstalled || isUninstallFailed;
  const isResetLocalExtensionStatusByForceUninstall = isUninstalling || isUninstalled;

  return {
    statusState,
    isPreparing,
    isInstalling,
    isUpgrading,
    isUninstalling,
    isInstalled,
    isUninstalled,
    isInstallFailed,
    isUpgradeFailed,
    isUninstallFailed,
    isResetLocalExtensionStatusByInstallOrUpgrade,
    isResetLocalExtensionStatusByUninstall,
    isResetLocalExtensionStatusByForceUninstall,
  };
}

type FormattedStatusState = ReturnType<typeof formatStatusState>;

function formatIsInstalled({
  formattedStatusState,
  statusConditions,
}: {
  formattedStatusState: FormattedStatusState;
  statusConditions: ExtensionStatusCondition[] | undefined;
}): {
  isInstalledByInstall: boolean;
  isInstalledByUpgrade: boolean;
} {
  const { isInstalled } = formattedStatusState;

  if (isInstalled) {
    const isUpgraded =
      (statusConditions ?? []).findIndex(
        ({ type, status }) => type === 'Upgraded' && status === 'True',
      ) > -1;

    if (isUpgraded) {
      return {
        isInstalledByInstall: false,
        isInstalledByUpgrade: true,
      };
    }

    return {
      isInstalledByInstall: true,
      isInstalledByUpgrade: false,
    };
  }

  return {
    isInstalledByInstall: false,
    isInstalledByUpgrade: false,
  };
}

function formatExtensionInstallStatus({
  statusState,
  statusConditions,
}: {
  statusState: ExtensionStatusStateType | undefined;
  statusConditions: ExtensionStatusCondition[] | undefined;
}) {
  const formattedStatusState = formatStatusState({ statusState });
  const formattedIsInstalled = formatIsInstalled({ formattedStatusState, statusConditions });

  const { isPreparing, isInstalling, isUpgrading, isInstallFailed, isUpgradeFailed } =
    formattedStatusState;
  const { isInstalledByInstall, isInstalledByUpgrade } = formattedIsInstalled;
  const isResetLocalExtensionStatusByInstall =
    isPreparing || isInstalling || isInstalledByInstall || isInstallFailed;
  const isResetLocalExtensionStatusByUpgrade =
    isPreparing || isUpgrading || isInstalledByUpgrade || isUpgradeFailed;

  return {
    ...formattedStatusState,
    ...formattedIsInstalled,
    statusConditions,
    isResetLocalExtensionStatusByInstall,
    isResetLocalExtensionStatusByUpgrade,
  };
}

function formatStatusEnabled({
  statusState,
  statusEnabled,
}: {
  statusState: ExtensionStatusStateType | undefined;
  statusEnabled: boolean | undefined;
}) {
  const { isInstalled } = formatStatusState({ statusState });

  if (!isInstalled) {
    return { statusEnabled, isEnabled: undefined, isDisabled: undefined };
  }

  const isEnabled = statusEnabled === true;
  const isDisabled = !isEnabled;

  return { statusEnabled, isEnabled, isDisabled };
}

function formatExtension(item: OriginalExtension) {
  const baseInfo = getBaseInfo<OriginalExtension>(item);
  const originData = getOriginData<OriginalExtension>(item);

  const metadata = item?.metadata;
  const spec = item?.spec;
  const status = item?.status;

  const displayName = spec?.displayName;
  const description = spec?.description;

  const statusState = status?.state;
  const recommendedVersion = status?.recommendedVersion;
  const versions = (status?.versions ?? [])
    .sort((a, b) => semver.compare(b.version ?? '', a?.version ?? ''))
    .map(versionItem => ({
      isRecommendedVersion: versionItem.version === recommendedVersion,
      ...versionItem,
    }));
  const latestVersion = versions.length > 0 ? (versions[0]?.version ?? '') : '';
  const displayVersion = recommendedVersion ?? latestVersion ?? '';

  const statusConditions = status?.conditions;
  const formattedInstallStatus = formatExtensionInstallStatus({
    statusState,
    statusConditions,
  });
  const formattedStatusEnabled = formatStatusEnabled({
    statusState,
    statusEnabled: status?.enabled,
  });

  const displayInstallTime = (() => {
    if (!formattedInstallStatus.isInstalled) {
      return undefined;
    }

    const targetCondition = statusConditions?.find(
      condition => condition?.type === 'Installed' && condition?.status === 'True',
    );
    const lastTransitionTime = targetCondition?.lastTransitionTime;
    return lastTransitionTime ? formatTime(lastTransitionTime) : undefined;
  })();
  const localeDisplayName = getLocaleValue({
    data: displayName,
    defaultValue: metadata.name,
  });
  const localeDescription = getLocaleValue({
    data: description,
    defaultValue: '',
  });
  const localeProvider = getLocaleValue({
    data: spec?.provider,
    defaultValue: null,
  });

  const labels = metadata?.labels;
  const categoryName = labels?.['kubesphere.io/category'];
  const categoryNames = categoryName ? [categoryName] : [];
  const marketplace = {
    repoName: labels?.['kubesphere.io/repository-ref'],
    extensionId: labels?.['marketplace.kubesphere.io/extension-id'],
    isSubscribed: labels?.['marketplace.kubesphere.io/subscribed'] === 'true',
  };

  return {
    ...baseInfo,
    _originData: originData,
    versions,
    recommendedVersion,
    plannedInstallVersion: status?.plannedInstallVersion,
    installedVersion: status?.installedVersion,
    displayVersion,
    localeDisplayName,
    localeDescription,
    localeProvider,
    displayIcon: spec?.icon || '/assets/extension-icon-placeholder.svg',
    displayInstallTime,
    categoryNames,
    marketplace,
    ...formattedInstallStatus,
    ...formattedStatusEnabled,
  };
}

type FormattedExtension = ReturnType<typeof formatExtension>;

function formatInstallPlan(item: OriginalInstallPlan) {
  const baseInfo = getBaseInfo<OriginalInstallPlan>(item);
  const originData = getOriginData<OriginalInstallPlan>(item);

  const spec = item?.spec;
  const status = item?.status;

  const config = spec?.config ?? '';

  const jobName = status?.jobName;
  const releaseName = status?.releaseName;
  const statusState = status?.state;
  const statusConditions = status?.conditions;
  const installedVersion = status?.version;
  const targetNamespace = status?.targetNamespace ?? '';

  const originalClusterScheduling = spec?.clusterScheduling;
  const originalOverrides = originalClusterScheduling?.overrides;

  const isUninstall = Boolean(item.metadata.deletionTimestamp); // extension and clusters
  const formattedInstallStatus = formatExtensionInstallStatus({ statusState, statusConditions });
  const formattedStatusEnabled = formatStatusEnabled({
    statusState,
    statusEnabled: status?.enabled,
  });
  const overrides: FormattedInstallPlanClusterSchedulingOverrides[] = Object.entries(
    originalOverrides ?? {},
  ).map(([clusterName, configOverride]) => ({ clusterName, configOverride }));
  const clusterScheduling = { ...originalClusterScheduling, overrides };
  const originalClusterSchedulingStatuses = status?.clusterSchedulingStatuses;
  const clusterSchedulingStatuses = Object.entries(originalClusterSchedulingStatuses ?? {}).map(
    ([clusterName, clusterSchedulingStatus]) => ({
      clusterName,
      ...clusterSchedulingStatus,
      ...formatExtensionInstallStatus({
        statusState: clusterSchedulingStatus?.state,
        statusConditions: clusterSchedulingStatus?.conditions,
      }),
    }),
  );

  return {
    ...baseInfo,
    _originData: originData,
    config,
    jobName,
    releaseName,
    targetNamespace,
    isUninstall,
    installedVersion,
    clusterScheduling,
    clusterSchedulingStatuses,
    ...formattedInstallStatus,
    ...formattedStatusEnabled,
  };
}

type FormattedInstallPlan = ReturnType<typeof formatInstallPlan>;

type GetRequestParamsFn<TParams, TRequestParams> = (params?: TParams | undefined) => TRequestParams;

interface UseBaseExtensionsQueryOptions<TParams, TRequestParams> {
  url: string;
  params?: TParams;
  getRequestParams: GetRequestParamsFn<TParams, TRequestParams>;
  onSuccess?: (data: FormattedExtension[]) => void;
}

function useBaseExtensionsQuery<TParams, TRequestParams>({
  url,
  params,
  getRequestParams,
  onSuccess,
}: UseBaseExtensionsQueryOptions<TParams, TRequestParams>) {
  const requestParams = getRequestParams(params);
  const queryKey = [module, url, requestParams];
  const result = useQuery(
    queryKey,
    () => request.get<never, OriginalExtensionList>(url, { params: requestParams }),
    {
      onSuccess: data => onSuccess?.(data.items.map(formatExtension)),
    },
  );
  const originalExtensions = result.data?.items ?? [];
  const formattedExtensions = originalExtensions.map(formatExtension);

  return { ...result, originalExtensions, formattedExtensions };
}

interface FetchExtensionsParams {
  name?: string;
  categoryNames?: string[];
}

interface FetchKExtensionsParams
  extends Pick<
    FetchKExtensionsRequestParams,
    'limit' | 'page' | 'q' | 'status' | 'enabled' | 'sortBy' | 'ascending'
  > {
  categoryNames?: string[];
  isAvailable?: boolean;
}

function getLabelSelector(
  params: FetchExtensionsParams | FetchKExtensionsParams | undefined,
  options?: { categoryFilterType: 'or' | 'and' },
) {
  const categoryFilterType = options?.categoryFilterType ?? 'or';
  const categoryNames = params?.categoryNames ?? [];

  const labelSelectorList = [];

  if (categoryFilterType === 'or') {
    if (categoryNames.length > 0) {
      labelSelectorList.push(`kubesphere.io/category in (${categoryNames.join(',')})`);
    }
  }

  if (categoryFilterType === 'and') {
    categoryNames.forEach(categoryName =>
      labelSelectorList.push(`category.kubesphere.io/${categoryName.trim()}`),
    );
  }

  return labelSelectorList.join(',').trim();
}

type UseExtensionsQueryOptions = Pick<
  UseBaseExtensionsQueryOptions<FetchExtensionsParams, FetchExtensionsRequestParams>,
  'params' | 'onSuccess'
>;

function useExtensionsQuery(options?: UseExtensionsQueryOptions) {
  const url = 'apis/kubesphere.io/v1alpha1/extensions';
  const getRequestParams: GetRequestParamsFn<
    FetchExtensionsParams,
    FetchExtensionsRequestParams
  > = params => {
    const name = params?.name;

    const requestParams: FetchExtensionsRequestParams = {};

    const labelSelector = getLabelSelector(params);
    if (labelSelector) {
      requestParams.labelSelector = labelSelector;
    }

    const nameValue = name ? name.trim() : '';
    if (nameValue) {
      requestParams.fieldSelector = `metadata.name=${nameValue}`;
    }

    return requestParams;
  };

  return useBaseExtensionsQuery({ url, getRequestParams, ...options });
}

type UseKExtensionsQueryOptions = Pick<
  UseBaseExtensionsQueryOptions<FetchKExtensionsParams, FetchKExtensionsRequestParams>,
  'params' | 'onSuccess'
>;

function useKExtensionsQuery(options?: UseKExtensionsQueryOptions) {
  const url = 'kapis/kubesphere.io/v1alpha1/extensions';
  const getRequestParams: GetRequestParamsFn<
    FetchKExtensionsParams,
    FetchKExtensionsRequestParams
  > = params => {
    const q = params?.q;
    const isAvailable = params?.isAvailable;

    const requestParams: FetchKExtensionsRequestParams = omit(params, [
      'labelSelector',
      'q',
      'categoryNames',
      'isAvailable',
    ]);

    const labelSelector = getLabelSelector(params);
    const qValue = q ? q.trim() : '';
    const availableValue = isAvailable ? true : undefined;

    const result: FetchKExtensionsRequestParams = {
      ...requestParams,
      labelSelector,
      q: qValue,
      available: availableValue,
    };

    return cleanDeep(result);
  };

  const limit = options?.params?.limit;
  const page = options?.params?.page ?? 1;
  const result = useBaseExtensionsQuery({ url, getRequestParams, ...options });

  const { totalItemCount } = requestHelper.getPaginationInfo({
    limit,
    page,
    remainingItemCount: result.data?.metadata?.remainingItemCount,
    currentPageData: result.formattedExtensions,
  });

  return { totalItemCount, ...result };
}

interface UseExtensionQueryOptions {
  extensionName: string;
  onSuccess?: (data: FormattedExtension) => void;
}

function useExtensionQuery({ extensionName, onSuccess }: UseExtensionQueryOptions) {
  const url = `apis/kubesphere.io/v1alpha1/extensions/${extensionName}`;
  const queryKey = [module, url];
  const result = useQuery(queryKey, () => request.get<never, OriginalExtension>(url), {
    onSuccess: data => onSuccess?.(formatExtension(data)),
  });
  const originalExtension = result.data;
  const formattedExtension = originalExtension ? formatExtension(originalExtension) : undefined;

  return { ...result, originalExtension, formattedExtension };
}

function useWatchExtensions(
  options?: Omit<
    UseWebSocketOptions<OriginalExtension, FormattedExtension>,
    'url' | 'module' | 'format'
  >,
) {
  return useWebSocket<OriginalExtension, FormattedExtension>({
    url: 'apis/kubesphere.io/v1alpha1/watch/extensions',
    module,
    format: formatExtension,
    ...options,
  });
}

interface UseWatchExtensionOptions
  extends Omit<
    UseWebSocketOptions<OriginalExtension, FormattedExtension>,
    'url' | 'module' | 'format'
  > {
  extensionName: string;
}

function useWatchExtension({ extensionName, ...useWebSocketOptions }: UseWatchExtensionOptions) {
  return useWebSocket<OriginalExtension, FormattedExtension>({
    url: `apis/kubesphere.io/v1alpha1/watch/extensions/${extensionName}`,
    module,
    format: formatExtension,
    ...useWebSocketOptions,
  });
}

function formatExtensionVersion(item: OriginalExtensionVersion) {
  const baseInfo = getBaseInfo<OriginalExtensionVersion>(item);
  const originData = getOriginData<OriginalExtensionVersion>(item);
  const metadata = item?.metadata;
  const spec = item?.spec;
  const extensionName = metadata?.labels?.['kubesphere.io/extension-ref'];
  const displayName = spec?.displayName;
  const description = spec?.description;
  const createdTime = spec?.created;
  const installationMode = spec?.installationMode;
  const externalDependencies = sortBy(spec?.externalDependencies ?? [], ['name']);
  const externalRequiredDependencies = externalDependencies.filter(({ required }) => required);
  const externalOptionalDependencies = externalDependencies.filter(({ required }) => !required);
  const localeDisplayName = getLocaleValue({
    data: displayName,
    defaultValue: extensionName,
  });
  const localeDescription = getLocaleValue({
    data: description,
    defaultValue: '',
  });
  const localeProvider = getLocaleValue({
    data: spec?.provider,
    defaultValue: null,
  });
  const displayCreatedDate = createdTime ? formatTime(createdTime, 'YYYY-MM-DD') : '';

  return {
    ...baseInfo,
    _originData: originData,
    extensionName,
    installationMode,
    isMultiClusterInstallation: installationMode === 'Multicluster',
    home: spec?.home ?? '',
    docs: spec?.docs ?? '',
    ksVersion: spec?.ksVersion ?? '',
    kubeVersion: spec?.kubeVersion ?? '',
    sources: spec?.sources ?? [],
    version: spec?.version ?? '',
    keywords: spec?.keywords ?? [],
    screenshots: spec?.screenshots ?? [],
    externalDependencies,
    externalRequiredDependencies,
    externalOptionalDependencies,
    localeDisplayName,
    localeDescription,
    localeProvider,
    displayIcon: spec?.icon || '/assets/extension-icon-placeholder.svg',
    displayCreatedDate,
  };
}

type FormattedExtensionVersion = ReturnType<typeof formatExtensionVersion>;

interface UseExtensionVersionsQueryOptions {
  extensionName: string;
  enabled?: boolean;
  onSuccess?: (data: FormattedExtensionVersion[]) => void;
}

function useExtensionVersionsQuery({
  extensionName,
  enabled = true,
  onSuccess,
}: UseExtensionVersionsQueryOptions) {
  const url = 'apis/kubesphere.io/v1alpha1/extensionversions';
  const params = {
    labelSelector: `kubesphere.io/extension-ref=${extensionName}`,
  };
  const queryKey = [module, url, params];
  const result = useQuery({
    queryKey,
    queryFn: async () => {
      const { items } = await request.get<never, OriginalExtensionVersionList>(url, { params });
      const originalExtensionVersions = items ?? [];
      const formattedExtensionVersions = originalExtensionVersions
        .map(formatExtensionVersion)
        .sort((a, b) => semver.compare(b.version ?? '', a?.version ?? ''));
      return { originalExtensionVersions, formattedExtensionVersions };
    },
    enabled,
    onSuccess: ({ formattedExtensionVersions }) => onSuccess?.(formattedExtensionVersions),
  });
  const originalExtensionVersions = result?.data?.originalExtensionVersions ?? [];
  const formattedExtensionVersions = result?.data?.formattedExtensionVersions ?? [];

  return { ...result, originalExtensionVersions, formattedExtensionVersions };
}

interface UseExtensionVersionQueryOptions {
  extensionName: string;
  version: string;
  enabled?: boolean;
  onSuccess?: (data: FormattedExtensionVersion) => void;
}

function useExtensionVersionQuery({
  extensionName,
  version,
  enabled = true,
  onSuccess,
}: UseExtensionVersionQueryOptions) {
  const url = `apis/kubesphere.io/v1alpha1/extensionversions/${extensionName}-${version}`;
  const queryKey = [module, url];
  const result = useQuery(queryKey, () => request.get<never, OriginalExtensionVersion>(url), {
    enabled,
    onSuccess: data => onSuccess?.(formatExtensionVersion(data)),
  });
  const originalExtensionVersion = result.data;
  const formattedExtensionVersion = originalExtensionVersion
    ? formatExtensionVersion(originalExtensionVersion)
    : undefined;

  return { ...result, originalExtensionVersion, formattedExtensionVersion };
}

function formatExtensionVersionFile(item: OriginalExtensionVersionFile) {
  const { Name, Data } = item;
  const data = safeAtob(Data);
  return { name: Name, base64Data: Data, data };
}

type FormattedExtensionVersionFile = ReturnType<typeof formatExtensionVersionFile>;

function formatExtensionVersionFiles(
  originalExtensionVersionFiles: OriginalExtensionVersionFile[],
) {
  return Array.isArray(originalExtensionVersionFiles)
    ? originalExtensionVersionFiles.map(({ Name, Data }) => {
        const data = safeAtob(Data);
        return { name: Name, base64Data: Data, data };
      })
    : [];
}

type FormattedExtensionVersionFiles = ReturnType<typeof formatExtensionVersionFiles>;

interface UseExtensionVersionFilesQueryOptions
  extends Omit<UseExtensionVersionQueryOptions, 'onSuccess'> {
  onSuccess?: (data: {
    originalExtensionVersionFiles: OriginalExtensionVersionFile[];
    formattedExtensionVersionFiles: FormattedExtensionVersionFiles;
    extensionVersionConfig: string;
  }) => void;
}

function useExtensionVersionFilesQuery({
  extensionName,
  version,
  enabled = true,
  onSuccess,
}: UseExtensionVersionFilesQueryOptions) {
  // eslint-disable-next-line max-len
  const url = `kapis/package.kubesphere.io/v1alpha1/extensionversions/${extensionName}-${version}/files`;
  const queryKey = [module, url];
  const result = useQuery({
    queryKey,
    enabled,
    queryFn: async () => {
      const data = await request.get<never, OriginalExtensionVersionFile[]>(url);
      const originalExtensionVersionFiles = data ?? [];
      const formattedExtensionVersionFiles = formatExtensionVersionFiles(
        originalExtensionVersionFiles,
      );
      const configFile = formattedExtensionVersionFiles.find(
        ({ name }) => name.toLowerCase() === 'values.yaml',
      );
      const extensionVersionConfig = configFile?.data ?? '';
      return {
        originalExtensionVersionFiles,
        formattedExtensionVersionFiles,
        extensionVersionConfig,
      };
    },
    onSuccess,
  });

  const originalExtensionVersionFiles = result.data?.originalExtensionVersionFiles ?? [];
  const formattedExtensionVersionFiles = result.data?.formattedExtensionVersionFiles ?? [];
  const extensionVersionConfig = result.data?.extensionVersionConfig ?? '';

  return {
    ...result,
    originalExtensionVersionFiles,
    formattedExtensionVersionFiles,
    extensionVersionConfig,
  };
}

interface UseInstallPlanQueryOptions {
  extensionName: string;
  extraQueryKey?: readonly unknown[];
  enabled?: boolean;
  isIgnoreErrorNotify?: boolean;
  onSuccess?: (data: FormattedInstallPlan) => void;
}

function useInstallPlanQuery({
  extensionName,
  extraQueryKey = [],
  enabled = true,
  isIgnoreErrorNotify,
  onSuccess,
}: UseInstallPlanQueryOptions) {
  const url = `apis/kubesphere.io/v1alpha1/installplans/${extensionName}`;
  const queryKey = [module, url, ...extraQueryKey];
  const headers: { 'x-ignore-error-notify'?: string } = isIgnoreErrorNotify
    ? { 'x-ignore-error-notify': 'true' }
    : {};
  const result = useQuery(
    queryKey,
    () => request.get<never, OriginalInstallPlan>(url, { headers }),
    {
      enabled,
      onSuccess: data => onSuccess?.(formatInstallPlan(data)),
    },
  );
  const originalInstallPlan = result.data;
  const formattedInstallPlan = originalInstallPlan
    ? formatInstallPlan(originalInstallPlan)
    : undefined;

  return { ...result, originalInstallPlan, formattedInstallPlan };
}

interface UseWatchInstallPlanOptions
  extends Omit<
    UseWebSocketOptions<OriginalInstallPlan, FormattedInstallPlan>,
    'url' | 'module' | 'format'
  > {
  extensionName: string;
}

function useWatchInstallPlan({
  extensionName,
  ...useWebSocketOptions
}: UseWatchInstallPlanOptions) {
  return useWebSocket<OriginalInstallPlan, FormattedInstallPlan>({
    url: `apis/kubesphere.io/v1alpha1/watch/installplans/${extensionName}`,
    module: 'installplans',
    format: formatInstallPlan,
    ...useWebSocketOptions,
  });
}

interface UseExtensionInstalledClustersQueryOptions {
  extensionName: string;
  enabled?: boolean;
}

function useExtensionInstalledClustersQuery({
  extensionName,
  enabled = true,
}: UseExtensionInstalledClustersQueryOptions) {
  const {
    isFetching: isClustersQueryFetching,
    isLoading: isClustersQueryLoading,
    isSuccess: isClustersQuerySuccess,
    formattedClusters: allFormattedClusters,
    refetch: refetchClusters,
  } = useClustersQuery({ enabled });
  const {
    isFetching: isInstallPlanQueryFetching,
    isLoading: isInstallPlanQueryLoading,
    isSuccess: isInstallPlanQuerySuccess,
    formattedInstallPlan,
    refetch: refetchInstallPlan,
  } = useInstallPlanQuery({
    extensionName,
    enabled,
  });
  const isFetching = isClustersQueryFetching || isInstallPlanQueryFetching;
  const isLoading = isClustersQueryLoading || isInstallPlanQueryLoading;
  const isSuccess = isClustersQuerySuccess && isInstallPlanQuerySuccess;
  const clusterNames = formattedInstallPlan?.clusterScheduling?.placement?.clusters ?? [];
  const installedFormattedClusters = allFormattedClusters.filter(({ name }) =>
    clusterNames.includes(name),
  );
  const refetch = () => {
    refetchInstallPlan();
    refetchInstallPlan();
  };

  return {
    isClustersQueryFetching,
    isInstallPlanQueryFetching,
    isFetching,
    isClustersQueryLoading,
    isInstallPlanQueryLoading,
    isLoading,
    isClustersQuerySuccess,
    isInstallPlanQuerySuccess,
    isSuccess,
    allFormattedClusters,
    formattedInstallPlan,
    installedFormattedClusters,
    refetchClusters,
    refetchInstallPlan,
    refetch,
  };
}

interface UseLogQueryOptions {
  targetNamespace: string | undefined;
  jobName: string | undefined;
  enabled?: boolean;
}

function useLogQuery({ targetNamespace, jobName, enabled = true }: UseLogQueryOptions) {
  const { message } = useWatchPods({
    namespace: targetNamespace ?? '',
    params: jobName ? { labelSelector: `job-name=${jobName}` } : undefined,
    enabled: enabled && !!targetNamespace && !!jobName,
  });
  const namespace = message?.formattedItem?.namespace;
  const podName = message?.formattedItem?.name;
  const podStatusPhase = message?.formattedItem?.statusPhase;

  const usePodLogOptions = {
    namespace: namespace ?? '',
    podName: podName ?? '',
    params: { timestamps: true },
  };
  const enableFollow = !!namespace && !!podName && podStatusPhase === PodStatusPhase.Running;
  const enableQuery =
    !!namespace &&
    !!podName &&
    [PodStatusPhase.Succeeded, PodStatusPhase.Failed, PodStatusPhase.Unknown].includes(
      // @ts-ignore
      podStatusPhase,
    );
  const followResult = usePodLogFollow({
    ...usePodLogOptions,
    enabled: enableFollow,
  });
  const queryResult = usePodLogQuery({
    ...usePodLogOptions,
    enabled: enableQuery,
  });

  const data = { podStatusPhase, log: queryResult?.data ?? followResult?.data };
  return { data };
}

interface UseExtensionLogQueryOptions {
  extensionName: string;
  enabled?: boolean;
}

function useExtensionLogQuery({ extensionName, enabled = true }: UseExtensionLogQueryOptions) {
  const { formattedInstallPlan } = useInstallPlanQuery({
    extensionName,
    enabled,
  });
  const targetNamespace = formattedInstallPlan?.targetNamespace;
  const jobName = formattedInstallPlan?.jobName;

  return useLogQuery({ targetNamespace, jobName, enabled });
}

interface UseCreateInstallPlanMutationOptions {
  onSuccess?: (
    data: OriginalInstallPlan,
    variables: CreateInstallPlanMutationVariables,
  ) => Promise<unknown> | void;
}

function useCreateInstallPlanMutation(options?: UseCreateInstallPlanMutationOptions) {
  const onSuccess = options?.onSuccess;
  const url = 'apis/kubesphere.io/v1alpha1/installplans';
  return useMutation<OriginalInstallPlan, unknown, CreateInstallPlanMutationVariables>(
    variables => {
      const { extensionName, version, config } = variables;
      const data: PostInstallPlanRequestData = {
        apiVersion: 'kubesphere.io/v1alpha1',
        kind: 'InstallPlan',
        metadata: {
          name: extensionName,
        },
        spec: {
          enabled: true,
          extension: {
            name: extensionName,
            version,
          },
        },
      };
      if (config) {
        data.spec.config = config;
      }
      return request.post<never, OriginalInstallPlan, PostInstallPlanRequestData>(url, data);
    },
    { onSuccess },
  );
}

function revertToOriginalInstallPlanClusterSchedulingOverrides(
  // eslint-disable-next-line max-len
  formattedInstallPlanClusterSchedulingOverrides: FormattedInstallPlanClusterSchedulingOverrides[],
) {
  const map = keyBy(formattedInstallPlanClusterSchedulingOverrides, 'clusterName');
  return mapValues(map, 'configOverride');
}

function revertToOriginalInstallPlanClusterScheduling(
  formattedInstallPlanClusterScheduling: UpdateInstallPlanMutationVariables['clusterScheduling'],
) {
  const formattedOverrides = formattedInstallPlanClusterScheduling?.overrides;

  const overrides = revertToOriginalInstallPlanClusterSchedulingOverrides(formattedOverrides ?? []);

  return { ...formattedInstallPlanClusterScheduling, overrides };
}

interface UseUpdateInstallPlanMutationOptions {
  onSuccess: (
    data: OriginalInstallPlan,
    variables: UpdateInstallPlanMutationVariables,
  ) => Promise<unknown> | void;
}

function useUpdateInstallPlanMutation(options?: UseUpdateInstallPlanMutationOptions) {
  const onSuccess = options?.onSuccess;
  return useMutation<OriginalInstallPlan, unknown, UpdateInstallPlanMutationVariables>(
    variables => {
      const { extensionName, version, enabled, config, forceDelete, clusterScheduling } = variables;
      const url = `apis/kubesphere.io/v1alpha1/installplans/${extensionName}`;
      const versionData = version
        ? {
            spec: {
              extension: {
                version: version,
              },
            },
          }
        : null;
      const enabledData =
        typeof enabled === 'boolean'
          ? {
              spec: {
                enabled,
              },
            }
          : null;
      const configData = config
        ? {
            spec: {
              config,
            },
          }
        : null;
      const forceDeleteData = forceDelete
        ? {
            metadata: {
              annotations: {
                'kubesphere.io/force-delete': '' as const,
              },
            },
          }
        : null;
      const clusterSchedulingData = clusterScheduling
        ? {
            spec: {
              clusterScheduling: revertToOriginalInstallPlanClusterScheduling(clusterScheduling),
            },
          }
        : null;

      const data: PatchInstallPlanRequestData = merge(
        {},
        versionData,
        enabledData,
        configData,
        forceDeleteData,
        clusterSchedulingData,
      );
      return request.patch<never, OriginalInstallPlan, PatchInstallPlanRequestData>(url, data);
    },
    { onSuccess },
  );
}

interface UseDeleteInstallPlanMutationOptions {
  onSuccess?: (
    data: OriginalInstallPlan,
    variables: DeleteInstallPlanMutationVariables,
  ) => Promise<unknown> | void;
}

function useDeleteInstallPlanMutation(options?: UseDeleteInstallPlanMutationOptions) {
  const onSuccess = options?.onSuccess;
  return useMutation<OriginalInstallPlan, unknown, DeleteInstallPlanMutationVariables>(
    variables => {
      const url = `apis/kubesphere.io/v1alpha1/installplans/${variables.extensionName}`;
      return request.delete<never, OriginalInstallPlan>(url);
    },
    { onSuccess },
  );
}

type UseForceDeleteInstallPlanMutationOptions = UseDeleteInstallPlanMutationOptions;

function useForceDeleteInstallPlanMutation(options?: UseForceDeleteInstallPlanMutationOptions) {
  const onSuccess = options?.onSuccess;
  return useMutation<OriginalInstallPlan, unknown, DeleteInstallPlanMutationVariables>(
    async variables => {
      const url = `apis/kubesphere.io/v1alpha1/installplans/${variables.extensionName}`;
      await request.patch<never, OriginalInstallPlan, PatchInstallPlanRequestData>(url, {
        metadata: {
          annotations: {
            'kubesphere.io/force-delete': '' as const,
          },
        },
      });
      return request.delete<never, OriginalInstallPlan>(url);
    },
    { onSuccess },
  );
}

export type {
  FormattedCategory,
  FormattedStatusState,
  FetchKExtensionsParams,
  FormattedExtension,
  FormattedExtensionVersion,
  FormattedExtensionVersionFile,
  FormattedInstallPlan,
  UseWatchInstallPlanOptions,
};
export {
  formatStatusState,
  formatExtensionInstallStatus,
  useCategoriesQuery,
  formatExtension,
  useExtensionsQuery,
  useKExtensionsQuery,
  useExtensionQuery,
  useWatchExtensions,
  useWatchExtension,
  useExtensionVersionsQuery,
  useExtensionVersionQuery,
  useExtensionVersionFilesQuery,
  useInstallPlanQuery,
  useWatchInstallPlan,
  useExtensionInstalledClustersQuery,
  useLogQuery,
  useExtensionLogQuery,
  useCreateInstallPlanMutation,
  useUpdateInstallPlanMutation,
  useDeleteInstallPlanMutation,
  useForceDeleteInstallPlanMutation,
};
