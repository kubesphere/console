/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { debounce } from 'lodash';
import { Success } from '@kubed/icons';
import type { DescriptionsProps } from '@kubed/components';
import { StatusDot } from '@kubed/components';

import { EXTENSIONS_PAGE_PATHS } from '../../../../constants/extension';
import type { FormattedInstallPlan } from '../../../../stores/extension';
import {
  useExtensionQuery,
  useExtensionVersionQuery,
  useInstallPlanQuery,
  useWatchInstallPlan,
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

export function ExtensionsManagementDetail() {
  const navigate = useNavigate();
  const { name: extensionName = '', version: pathVersion } = useParams();

  const formattedInstallPlanRef = useRef<FormattedInstallPlan>();
  const watchInstallPlanOnMessageCountRef = useRef(0);

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
  const { formattedInstallPlan, refetch: refetchInstallPlan } = useInstallPlanQuery({
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
  formattedInstallPlanRef.current = formattedInstallPlan;

  const debouncedRefetchExtension = debounce(refetchExtension, DEBOUNCE_WAIT);
  const debouncedRefetchInstallPlan = debounce(refetchInstallPlan, DEBOUNCE_WAIT);

  useWatchInstallPlan({
    extensionName,
    onMessage: data => {
      watchInstallPlanOnMessageCountRef.current += 1;

      debouncedRefetchExtension();
      debouncedRefetchInstallPlan();

      const { type, formattedItem } = data.message;

      // https://kubernetes.io/docs/reference/using-api/api-concepts/#semantics-for-watch
      // Start a watch at the most recent resource version, which must be consistent (in detail: served from etcd via a quorum read). To establish initial state, the watch begins with synthetic "Added" events of all resources instances that exist at the starting resource version. All following watch events are for all changes that occurred after the resource version the watch started at.
      if (watchInstallPlanOnMessageCountRef.current === 1 && type === 'ADDED') {
        return;
      }

      if (!formattedItem) {
        return;
      }

      const currentStatusState = formattedItem.statusState;
      if (currentStatusState !== formattedInstallPlanRef.current?.statusState) {
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
