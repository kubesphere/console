/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { debounce, find } from 'lodash';
import type { ColumnDef } from '@tanstack/react-table';
import { useDisclosure } from '@kubed/hooks';
import { Loading, DataTable } from '@kubed/components';

import { tableState2Query, useUrlSearchParamsStatus, StatusIndicator } from '@ks-console/shared';
import { EXTENSIONS_PAGE_PATHS } from '../../../../../constants/extension';
import type { FetchKExtensionsParams, FormattedExtension } from '../../../../../stores/extension';
import {
  useKExtensionsQuery,
  useWatchExtensions,
  // useUpdateInstallPlanMutation,
} from '../../../../../stores/extension';
import { useMarketplaceConfigQuery } from '../../../../../stores/marketplace';
import { getExtensionsEmptyProps as getExtensionsEmptyPropsWithFilters } from '../../../components/ExtensionsEmpty';
import {
  DEBOUNCE_WAIT,
  DEFAULT_PAGE_SIZE,
  InstallModalActionType,
  EXTENSIONS_EVALUATION_PAGE_LINK,
} from '../../constants';
import { getIsResetLocalExtensionsStatus } from '../../utils/status';
// import { updateInstallPlanEnabled } from '../../actions';
import { useLocalExtensionStatusItems } from '../../hooks/useLocalExtensionStatusItems';

import { ExtensionUninstallConfirmModal } from '../ExtensionUninstallConfirmModal';
import { ExtensionForceUninstallConfirmModal } from '../ExtensionForceUninstallConfirmModal';
import { MarketplaceUserEmpty } from './MarketplaceUserEmpty';
import { getExtensionsEmptyProps } from './ExtensionsEmpty';
import { MarketplaceAccount } from './MarketplaceAccount';
import { ExtensionStatus } from './ExtensionStatus';
// import { ListActionButtons } from './ListActionButtons';
import { InstallModal } from '../InstallModal';
import { LoadingWrapper, ExtensionField, Icon, StyledCard } from './Extensions.styles';

export function Extensions() {
  const {
    isLoading: isMarketplaceConfigQueryLoading,
    isOnline,
    isOffline,
    formattedMarketplaceConfig,
    refetch: refetchMarketplaceConfig,
  } = useMarketplaceConfigQuery({ isIgnoreErrorNotify: true });

  const [currentExtensionName, setCurrentExtensionName] = useState<string>('');
  const resetCurrentExtensionName = () => setCurrentExtensionName('');

  const {
    // localExtensionStatusItems,
    setLocalExtensionStatusItems,
    getLocalExtensionStatusItem,
    setLocalExtensionStatusItem,
  } = useLocalExtensionStatusItems();
  const currentLocalExtensionsStatus = getLocalExtensionStatusItem({
    extensionName: currentExtensionName,
  })?.status;

  const extensionInstallModal = useDisclosure();
  const extensionUninstallConfirmModal = useDisclosure();
  const extensionForceUninstallConfirmModal = useDisclosure();

  const { state, setState } = useUrlSearchParamsStatus(['']);
  const queryParams: Pick<FetchKExtensionsParams, 'limit' | 'page' | 'q' | 'status' | 'enabled'> =
    useMemo(() => tableState2Query(state), [state]);
  const hasFilters = Boolean(queryParams.q ?? queryParams.status ?? queryParams.enabled);
  const {
    isFetching: isExtensionsQueryFetching,
    totalItemCount,
    formattedExtensions,
    refetch: refetchExtensions,
  } = useKExtensionsQuery({
    params: { isAvailable: true, limit: DEFAULT_PAGE_SIZE, ...queryParams },
    onSuccess: data => {
      const innerLocalExtensionStatusItems = data.map(({ name, statusState, statusConditions }) => {
        const localExtensionsStatus = getLocalExtensionStatusItem({
          extensionName: name,
        })?.status;
        const isResetLocalExtensionsStatus = getIsResetLocalExtensionsStatus({
          statusState,
          statusConditions,
          localExtensionsStatus,
        });

        return {
          extensionName: name,
          status: isResetLocalExtensionsStatus ? undefined : localExtensionsStatus,
        };
      });
      setLocalExtensionStatusItems(innerLocalExtensionStatusItems);
    },
  });
  const currentFormattedExtension = find(formattedExtensions, { name: currentExtensionName });

  const enabledWatchExtensions = (() => {
    if (isOnline) {
      return Boolean(formattedMarketplaceConfig?.isBound);
    }

    if (isOffline) {
      return true;
    }

    return false;
  })();
  const debouncedRefetchExtensions = debounce(refetchExtensions, DEBOUNCE_WAIT);
  useWatchExtensions({
    enabled: enabledWatchExtensions,
    onMessage: () => {
      debouncedRefetchExtensions();
    },
  });

  const handleCreateInstallPlanSuccess = () => {
    setLocalExtensionStatusItem({
      extensionName: currentExtensionName,
      status: 'localInstalling',
    });
    refetchExtensions();
  };

  const handleDeleteInstallPlanSuccess = () => {
    setLocalExtensionStatusItem({
      extensionName: currentExtensionName,
      status: 'localUninstalling',
    });
    refetchExtensions();
    if (isOnline) {
      window.open(EXTENSIONS_EVALUATION_PAGE_LINK, '_blank');
    }
  };

  const handleForceDeleteInstallPlanSuccess = () => {
    setLocalExtensionStatusItem({
      extensionName: currentExtensionName,
      status: 'localForceUninstalling',
    });
    refetchExtensions();
  };

  /* const handleUpdateInstallPlanEnabledSuccess = () => {
    refetchExtensions();
  }; */

  /* const updateInstallPlanEnabledMutation = useUpdateInstallPlanMutation({
    onSuccess: () => handleUpdateInstallPlanEnabledSuccess(),
  }); */

  const columns: ColumnDef<FormattedExtension, any>[] = useMemo(
    () => [
      {
        accessorKey: 'q',
        header: t('NAME'),
        meta: {
          th: {
            width: '50%',
          },
        },
        cell: ({ row }) => {
          const formattedExtension = row.original;
          const { name, displayIcon, localeDisplayName, localeDescription } = formattedExtension;
          return (
            <ExtensionField
              value={
                <Link to={EXTENSIONS_PAGE_PATHS.management.getDetail(name)}>
                  {localeDisplayName}
                </Link>
              }
              label={localeDescription}
              avatar={<Icon src={displayIcon} alt={localeDisplayName} />}
            />
          );
        },
      },
      {
        accessorKey: 'status',
        header: t('INSTALLATION_STATUS'),
        meta: {
          th: {
            width: '10%',
          },
        },
        enableHiding: true,
        cell: ({ row }) => {
          const formattedExtension = row.original;
          const { name } = formattedExtension;
          const localExtensionsStatus = getLocalExtensionStatusItem({
            extensionName: name,
          })?.status;
          return (
            <ExtensionStatus
              formattedExtension={formattedExtension as FormattedExtension}
              localExtensionsStatus={localExtensionsStatus}
            />
          );
        },
      },
      {
        accessorKey: 'installedVersion',
        header: t('VERSION'),
        meta: {
          th: {
            width: '10%',
          },
        },
        enableHiding: true,
        cell: ({ getValue }) => {
          const value = getValue();
          return value ?? '-';
        },
      },
      {
        accessorKey: 'enabled',
        header: t('ENABLED_STATE'),
        meta: {
          th: {
            width: '10%',
          },
        },
        enableHiding: true,
        cell: ({ row }) => {
          const formattedExtension = row.original;
          const { isEnabled, isDisabled } = formattedExtension;
          if (isEnabled) {
            return <StatusIndicator type="success">{t('ENABLED')}</StatusIndicator>;
          }
          if (isDisabled) {
            return <StatusIndicator type="default">{t('DISABLED')}</StatusIndicator>;
          }
          return '-';
        },
      },
      {
        accessorKey: 'installTimestamp',
        header: t('INSTALLATION_TIME'),
        cell: ({ row }) => {
          const formattedExtension = row.original;
          const { displayInstallTime } = formattedExtension;
          return displayInstallTime ?? '-';
        },
      },
      /* {
        id: 'more',
        field: 'name',
        title: '',
        render: (value, row) => {
          const formattedExtension = row as FormattedExtension;

          return (
            <ListActionButtons
              formattedExtension={formattedExtension as FormattedExtension}
              onInstallButtonClick={() => {
                setCurrentExtensionName(value);
                extensionInstallModal.open();
              }}
              onUninstallButtonClick={() => {
                setCurrentExtensionName(value);
                extensionUninstallConfirmModal.open();
              }}
              onForceUninstallButtonClick={() => {
                setCurrentExtensionName(value);
                extensionForceUninstallConfirmModal.open();
              }}
              onEnabledButtonClick={() =>
                updateInstallPlanEnabled({
                  formattedExtension,
                  enabled: true,
                  mutate: updateInstallPlanEnabledMutation.mutate,
                })
              }
              onDisabledButtonClick={() =>
                updateInstallPlanEnabled({
                  formattedExtension,
                  enabled: false,
                  mutate: updateInstallPlanEnabledMutation.mutate,
                })
              }
            />
          );
        },
      }, */
    ],
    [getLocalExtensionStatusItem],
  );

  const tableData = useMemo(() => formattedExtensions, [JSON.stringify(formattedExtensions)]);

  const renderToolbarRight = () => {
    if (!(isOnline && formattedMarketplaceConfig)) {
      return null;
    }

    return (
      <MarketplaceAccount
        formattedMarketplaceConfig={formattedMarketplaceConfig}
        onSyncMarketplaceAccountSuccess={refetchExtensions}
        onUnbindSuccess={() => {
          refetchMarketplaceConfig();
          refetchExtensions();
        }}
      />
    );
  };

  const [baseConfig] = useState(() =>
    DataTable.getDefaultTableOptions<FormattedExtension>({
      tableName: 'extensions.management',
      manual: true,
    }),
  );
  const table = DataTable.useTable<FormattedExtension>({
    ...baseConfig,
    columns,
    loading: isExtensionsQueryFetching,
    data: tableData,
    rowCount: totalItemCount,
    state,
    // autoResetPageIndex: true,
    meta: {
      ...baseConfig.meta,
      refetch: refetchExtensions,
      getProps: {
        empty: () => {
          if (!hasFilters) {
            return getExtensionsEmptyProps();
          }
          return {
            style: { height: 252 },
            title: getExtensionsEmptyPropsWithFilters({ hasFilters }).title,
          };
        },
        toolbar: () => ({ toolbarRight: renderToolbarRight() }),
        filters: () => ({
          simpleMode: false,
          suggestions: [
            { key: 'q', label: t('NAME') },
            {
              key: 'status',
              label: t('INSTALLATION_STATUS'),
              options: [
                { key: 'notInstalled', label: t('NOT_INSTALLED') },
                { key: 'installed', label: t('INSTALLED') },
                { key: 'installFailed', label: t('INSTALL_FAILED') },
                { key: 'upgradeFailed', label: t('UPDATE_FAILED') },
                { key: 'uninstallFailed', label: t('UNINSTALL_FAILED') },
              ],
            },
            {
              key: 'enabled',
              label: t('ENABLED_STATE'),
              options: [
                { key: 'true', label: t('ENABLED') },
                { key: 'false', label: t('DISABLED') },
              ],
            },
          ],
        }),
      },
    },
    onParamsChange: setState,
  });

  if (isMarketplaceConfigQueryLoading) {
    return (
      <LoadingWrapper>
        <Loading />
      </LoadingWrapper>
    );
  }

  if (isOnline && !formattedMarketplaceConfig?.isBound) {
    return <MarketplaceUserEmpty formattedMarketplaceConfig={formattedMarketplaceConfig} />;
  }

  return (
    <>
      <StyledCard padding={0}>
        <DataTable.DataTable table={table} />
      </StyledCard>
      {extensionInstallModal.isOpen && currentFormattedExtension && (
        <InstallModal
          visible={extensionInstallModal.isOpen}
          actionType={InstallModalActionType.ExtensionInstall}
          formattedExtension={currentFormattedExtension}
          localExtensionsStatus={currentLocalExtensionsStatus}
          onClose={() => {
            extensionInstallModal.close();
            resetCurrentExtensionName();
          }}
          onCreateInstallPlanSuccess={handleCreateInstallPlanSuccess}
        />
      )}
      {extensionUninstallConfirmModal.isOpen && currentFormattedExtension && (
        <ExtensionUninstallConfirmModal
          visible={extensionUninstallConfirmModal.isOpen}
          formattedExtension={currentFormattedExtension}
          onDeleteInstallPlanSuccess={handleDeleteInstallPlanSuccess}
          onClose={() => {
            extensionUninstallConfirmModal.close();
            resetCurrentExtensionName();
          }}
        />
      )}
      {extensionForceUninstallConfirmModal.isOpen && currentFormattedExtension && (
        <ExtensionForceUninstallConfirmModal
          visible={extensionForceUninstallConfirmModal.isOpen}
          formattedExtension={currentFormattedExtension}
          onForceDeleteInstallPlanSuccess={handleForceDeleteInstallPlanSuccess}
          onClose={() => {
            extensionForceUninstallConfirmModal.close();
            resetCurrentExtensionName();
          }}
        />
      )}
    </>
  );
}
