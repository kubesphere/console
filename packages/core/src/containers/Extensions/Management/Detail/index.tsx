/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useRef, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { debounce } from 'lodash';
import { Success } from '@kubed/icons';
import type { DescriptionsProps } from '@kubed/components';
import { StatusDot } from '@kubed/components';

import { EXTENSIONS_PAGE_PATHS } from '../../../../constants/extension';
import type { UseWatchInstallPlanOptions } from '../../../../stores/extension';
import {
  useExtensionQuery,
  useExtensionVersionQuery,
  useInstallPlanQuery,
  useWatchInstallPlan,
  useWatchExtension,
} from '../../../../stores/extension';
import { getExtensionBasicInfo } from '../../utils/extension';
import { ExtensionDetail } from '../../components/ExtensionDetail';
import { ExtensionFilesViewerButton } from '../../components/ExtensionFilesViewerButton';
import { DEBOUNCE_WAIT, EXTENSIONS_EVALUATION_PAGE_LINK } from '../constants';
import type { GetIsResetLocalExtensionsStatusOptions } from '../utils/status';
import { formatLocalExtensionsStatus, getIsResetLocalExtensionsStatus } from '../utils/status';
import { handleInstalled, handleUninstalled } from '../actions';
import { useLocalExtensionStatusItems } from '../hooks/useLocalExtensionStatusItems';
import { DetailActionButtons } from '../components/DetailActionButtons';
import { InstalledVersionWrapper } from './styles';
import { useMarketplaceConfigQuery } from '../../../../stores/marketplace';

type PartialUseWatchInstallPlanOptions = Pick<UseWatchInstallPlanOptions, 'enabled' | 'params'>;

export function ExtensionsManagementDetail() {
  const navigate = useNavigate();
  const { name: extensionName = '', version: pathVersion } = useParams();

  const currentUseWatchInstallPlanOptionsRef = useRef<PartialUseWatchInstallPlanOptions | null>(
    null,
  );

  const {
    getLocalExtensionStatusItem,
    setLocalExtensionStatusItem,
    resetLocalExtensionStatusItem,
  } = useLocalExtensionStatusItems([
    {
      extensionName,
      status: undefined,
    },
  ]);
  const localExtensionsStatus = getLocalExtensionStatusItem({
    extensionName,
  })?.status;
  const { isLocalInstalling, isLocalUpgrading, isLocalAnyUninstalling } =
    formatLocalExtensionsStatus(localExtensionsStatus);

  const { isLoading: isMarketplaceConfigQueryLoading, isOnline } = useMarketplaceConfigQuery({
    isIgnoreErrorNotify: true,
  });

  const onFetchSuccess = (options: GetIsResetLocalExtensionsStatusOptions) => {
    const isResetLocalExtensionsStatus = getIsResetLocalExtensionsStatus(options);

    if (isResetLocalExtensionsStatus) {
      resetLocalExtensionStatusItem({ extensionName });
    }
  };

  const {
    isFetched: isExtensionQueryFetched,
    isLoading: isExtensionQueryLoading,
    formattedExtension,
    refetch: refetchExtension,
  } = useExtensionQuery({
    extensionName,
    onSuccess: ({ statusState, statusConditions }) => {
      if (isLocalAnyUninstalling) {
        onFetchSuccess({
          statusState,
          statusConditions,
          localExtensionsStatus,
        });
      }
    },
  });

  const displayVersion = formattedExtension?.displayVersion ?? '';
  const plannedInstallVersion = formattedExtension?.plannedInstallVersion;
  const installedVersion = formattedExtension?.installedVersion ?? '';
  const isInstalled = formattedExtension?.isInstalled;
  const isUpgrading = formattedExtension?.isUpgrading;
  const isUninstalling = formattedExtension?.isUninstalling;
  const isEnabled = formattedExtension?.isEnabled;
  const extensionResourceVersion = formattedExtension?.resourceVersion;

  const enabledInstalledExtensionVersionQuery = Boolean(
    extensionName && installedVersion && (isUpgrading || isUninstalling || isInstalled),
  );
  const { formattedExtensionVersion: formattedInstalledExtensionVersion } =
    useExtensionVersionQuery({
      enabled: enabledInstalledExtensionVersionQuery,
      extensionName,
      version: installedVersion,
    });
  const isMultiClusterInstallation =
    !!formattedInstalledExtensionVersion?.isMultiClusterInstallation;

  const enabledInstallPlanQuery = Boolean(extensionName && plannedInstallVersion);
  const {
    isFetched: isInstallPlanQueryFetched,
    formattedInstallPlan,
    refetch: refetchInstallPlan,
  } = useInstallPlanQuery({
    enabled: enabledInstallPlanQuery,
    extensionName,
    isIgnoreErrorNotify: true,
    onSuccess: ({ statusState, statusConditions }) => {
      if (isLocalInstalling || isLocalUpgrading) {
        onFetchSuccess({
          statusState,
          statusConditions,
          localExtensionsStatus,
        });
      }
    },
  });

  const debouncedRefetchExtension = debounce(refetchExtension, DEBOUNCE_WAIT);

  // delete later
  useWatchExtension({
    enabled: false,
    extensionName,
    params: {
      resourceVersion: extensionResourceVersion,
    },
    onMessage: data => {
      debouncedRefetchExtension();
      const { formattedItem } = data.message;
      if (formattedItem) {
        if (formattedItem.statusState !== formattedExtension?.statusState) {
          handleInstalled(formattedItem);
        }
        handleUninstalled(formattedItem);
      }
    },
  });

  const debouncedRefetchInstallPlan = debounce(refetchInstallPlan, DEBOUNCE_WAIT);
  const partialUseWatchInstallPlanOptions: PartialUseWatchInstallPlanOptions = useMemo(() => {
    if (currentUseWatchInstallPlanOptionsRef.current?.enabled) {
      return currentUseWatchInstallPlanOptionsRef.current;
    }

    if (!isExtensionQueryFetched) {
      return { enabled: false };
    }

    if (!enabledInstallPlanQuery) {
      return { enabled: true };
    }

    if (!isInstallPlanQueryFetched) {
      return { enabled: false };
    }

    return { enabled: true, params: { resourceVersion: formattedInstallPlan?.resourceVersion } };
  }, [
    isExtensionQueryFetched,
    enabledInstallPlanQuery,
    isInstallPlanQueryFetched,
    formattedInstallPlan?.resourceVersion,
  ]);

  console.log('out', formattedInstallPlan?.statusState);

  currentUseWatchInstallPlanOptionsRef.current = partialUseWatchInstallPlanOptions;
  useWatchInstallPlan({
    ...partialUseWatchInstallPlanOptions,
    extensionName,
    onMessage: data => {
      const { formattedItem } = data.message;

      console.log('in', formattedInstallPlan?.statusState);

      if (!formattedItem) {
        return;
      }

      debouncedRefetchExtension();
      debouncedRefetchInstallPlan();

      if (formattedItem.statusState !== formattedInstallPlan?.statusState) {
        const localeDisplayName = formattedExtension?.localeDisplayName ?? t('EXTENSION');
        const statusState = formattedItem.statusState;
        const options = { localeDisplayName, statusState };
        handleInstalled(options);
        handleUninstalled(options);
      }
    },
  });

  const currentVersion = pathVersion ?? displayVersion;
  const { isLoading: isExtensionDisplayVersionQueryLoading, formattedExtensionVersion } =
    useExtensionVersionQuery({
      extensionName,
      version: currentVersion,
      enabled: !!currentVersion,
    });

  const basicInfo: DescriptionsProps['data'] = getExtensionBasicInfo(formattedExtensionVersion);

  if (isInstalled) {
    basicInfo.unshift(
      {
        label: t('ENABLED_STATE'),
        value: isEnabled ? (
          <StatusDot color="success">{t('ENABLED')}</StatusDot>
        ) : (
          <StatusDot>{t('DISABLED')}</StatusDot>
        ),
      },
      {
        label: t('INSTALLED_VERSION'),
        value: (
          <InstalledVersionWrapper>
            <Success size={18} />
            {installedVersion}
          </InstalledVersionWrapper>
        ),
      },
    );
  }

  const handleCreateInstallPlanSuccess = () => {
    setLocalExtensionStatusItem({
      extensionName,
      status: 'localInstalling',
    });
    refetchExtension();
  };

  const handleUpdateInstallPlanVersionSuccess = () => {
    setLocalExtensionStatusItem({
      extensionName,
      status: 'localUpgrading',
    });
    refetchExtension();
    refetchInstallPlan();
  };

  const handleUpdateInstallPlanEnabledSuccess = () => refetchExtension();

  const handleDeleteInstallPlanSuccess = () => {
    setLocalExtensionStatusItem({
      extensionName,
      status: 'localUninstalling',
    });
    refetchExtension();
    refetchInstallPlan();
    if (isOnline) {
      window.open(EXTENSIONS_EVALUATION_PAGE_LINK, '_blank');
    }
  };

  const handleForceDeleteInstallPlanSuccess = () => {
    setLocalExtensionStatusItem({
      extensionName,
      status: 'localForceUninstalling',
    });
    refetchExtension();
    refetchInstallPlan();
  };

  const actionButtons = formattedExtension ? (
    <>
      <DetailActionButtons
        formattedExtension={formattedExtension}
        formattedInstallPlan={formattedInstallPlan}
        localExtensionsStatus={localExtensionsStatus}
        onCreateInstallPlanSuccess={handleCreateInstallPlanSuccess}
        onUpdateInstallPlanVersionSuccess={handleUpdateInstallPlanVersionSuccess}
        onUpdateInstallPlanEnabledSuccess={handleUpdateInstallPlanEnabledSuccess}
        onDeleteInstallPlanSuccess={handleDeleteInstallPlanSuccess}
        onForceDeleteInstallPlanSuccess={handleForceDeleteInstallPlanSuccess}
      />
      <ExtensionFilesViewerButton
        extensionName={extensionName}
        version={currentVersion}
        style={{ marginTop: 12 }}
      />
    </>
  ) : null;

  return (
    <ExtensionDetail
      isLoading={
        isMarketplaceConfigQueryLoading ||
        isExtensionQueryLoading ||
        isExtensionDisplayVersionQueryLoading
      }
      formattedExtension={formattedExtension}
      formattedExtensionVersion={formattedExtensionVersion}
      basicInfo={basicInfo}
      actionButtons={actionButtons}
      isShowInstalledClusters={Boolean(isInstalled && isMultiClusterInstallation)}
      onVersionChange={(selectedVersion: string) =>
        navigate(
          EXTENSIONS_PAGE_PATHS.management.getDetail(extensionName, { version: selectedVersion }),
          { replace: true },
        )
      }
      onBackButtonClick={() => navigate(EXTENSIONS_PAGE_PATHS.management.index)}
    />
  );
}
