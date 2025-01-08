/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { debounce, find } from 'lodash';
import { useDeepCompareEffect } from 'react-use';
import type { ColumnDef } from '@tanstack/react-table';
import { useDisclosure } from '@kubed/hooks';
import { LoadingOverlay, Loading, Card, DataTable } from '@kubed/components';

import type { Column } from '@ks-console/shared';
import {
  transformRequestParams,
  useDataTable,
  useUrlSearchParamsStatus,
  TableWithoutHook,
  TableToolbar,
  TableFooter,
  TableSkeleton,
  StatusIndicator,
} from '@ks-console/shared';
import { EXTENSIONS_PAGE_PATHS } from '../../../../../constants/extension';
import type { FetchKExtensionsParams, FormattedExtension } from '../../../../../stores/extension';
import {
  useKExtensionsQuery,
  useWatchExtensions,
  // useUpdateInstallPlanMutation,
} from '../../../../../stores/extension';
import { useMarketplaceConfigQuery } from '../../../../../stores/marketplace';
import { ExtensionsEmpty as ExtensionsWithFiltersEmpty } from '../../../components/ExtensionsEmpty';
import {
  DEBOUNCE_WAIT,
  K_EXTENSIONS_QUERY_INITIAL_PARAMS,
  EXTENSIONS_TABLE_INITIAL_STATE,
  InstallModalActionType,
  EXTENSIONS_EVALUATION_PAGE_LINK,
} from '../../constants';
import { getIsResetLocalExtensionsStatus } from '../../utils/status';
// import { updateInstallPlanEnabled } from '../../actions';
import { useLocalExtensionStatusItems } from '../../hooks/useLocalExtensionStatusItems';

import { ExtensionUninstallConfirmModal } from '../ExtensionUninstallConfirmModal';
import { ExtensionForceUninstallConfirmModal } from '../ExtensionForceUninstallConfirmModal';
import { MarketplaceUserEmpty } from './MarketplaceUserEmpty';
import { ExtensionsEmpty } from './ExtensionsEmpty';
import { MarketplaceAccount } from './MarketplaceAccount';
import { ExtensionStatus } from './ExtensionStatus';
// import { ListActionButtons } from './ListActionButtons';
import { InstallModal } from '../InstallModal';
import {
  LoadingWrapper,
  TableWrapper,
  ExtensionField,
  Icon,
  StyledCard,
} from './Extensions.styles';

function Extensions() {
  const [kExtensionsQueryParams, setKExtensionsQueryParams] = useState<
    Pick<
      FetchKExtensionsParams,
      'limit' | 'page' | 'q' | 'status' | 'enabled' | 'sortBy' | 'ascending'
    >
  >(K_EXTENSIONS_QUERY_INITIAL_PARAMS);

  const { state, setState } = useUrlSearchParamsStatus(['']);

  const {
    isLoading: isMarketplaceConfigQueryLoading,
    isOnline,
    isOffline,
    formattedMarketplaceConfig,
    refetch: refetchMarketplaceConfig,
  } = useMarketplaceConfigQuery({ isIgnoreErrorNotify: true });

  const [currentExtensionName, setCurrentExtensionName] = useState<string>('');
  const resetCurrentExtensionName = () => setCurrentExtensionName('');

  const [isManualRefetch, setIsManualRefetch] = useState(false);

  const {
    localExtensionStatusItems,
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

  const hasFilters = Boolean(
    kExtensionsQueryParams.q ?? kExtensionsQueryParams.status ?? kExtensionsQueryParams.enabled,
  );
  const {
    isLoading: isExtensionsQueryLoading,
    isFetching: isExtensionsQueryFetching,
    isRefetching,
    totalCount,
    pageCount,
    formattedExtensions,
    refetch: refetchExtensions,
  } = useKExtensionsQuery({
    params: { isAvailable: true, ...kExtensionsQueryParams },
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

      setIsManualRefetch(false);
    },
  });
  const hasExtensions = totalCount > 0;
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

  const suggestions = [
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
  ];

  const columns: ColumnDef<FormattedExtension, any>[] = useMemo(
    () => [
      {
        accessorKey: 'q',
        header: t('NAME'),
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
        filterOptions: suggestions.find(({ key }) => key === 'status')?.options,
        canHide: true,
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
        canHide: true,
        cell: ({ getValue }) => {
          const value = getValue();
          return value ?? '-';
        },
      },
      {
        accessorKey: 'enabled',
        header: t('ENABLED_STATE'),
        filterOptions: suggestions.find(({ key }) => key === 'enabled')?.options,
        canHide: true,
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
    ],
    [getLocalExtensionStatusItem, suggestions],
  );

  const tableData = useMemo(() => formattedExtensions, [JSON.stringify(formattedExtensions)]);
  /* const { instance } = useDataTable({
    columns,
    data: tableData,
    manualFilters: true,
    manualSortBy: true,
    manualPagination: true,
    initialState: EXTENSIONS_TABLE_INITIAL_STATE,
    pageCount,
  }); */
  // const tableState = instance.state;
  // const { pageSize, pageIndex, filters, sortBy } = tableState;

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
    // rowCount: totalCount,
    state,
    autoResetPageIndex: true,
    meta: {
      ...baseConfig.meta,
      refetch: refetchExtensions,
      getProps: {
        filters: () => ({
          simpleMode: false,
          suggestions: suggestions,
        }),
      },
      registerHandlers: [
        {
          handlerName: 'onParamsChange',
          stateKeys: ['pagination', 'columnFilters', 'sorting'],
        },
      ],
    },
    onParamsChange: setState,
  });

  /* useDeepCompareEffect(() => {
    const params = transformRequestParams({
      pageSize,
      pageIndex,
      filters,
      // @ts-expect-error
      sortBy,
    });
    setKExtensionsQueryParams(params);
  }, [tableState.pageSize, tableState.pageIndex, tableState.filters, tableState.sortBy]); */

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

  if (isExtensionsQueryLoading) {
    return <TableSkeleton />;
  }

  return (
    <>
      <StyledCard padding={0}>
        <DataTable.DataTable table={table} />
      </StyledCard>
      {/* <TableWrapper>
        <TableToolbar
          instance={instance}
          suggestions={suggestions}
          toolbarRight={
            isOnline &&
            formattedMarketplaceConfig && (
              <MarketplaceAccount
                formattedMarketplaceConfig={formattedMarketplaceConfig}
                onSyncMarketplaceAccountSuccess={refetchExtensions}
                onUnbindSuccess={() => {
                  refetchMarketplaceConfig();
                  refetchExtensions();
                }}
              />
            )
          }
          refetch={() => {
            setIsManualRefetch(true);
            refetchExtensions();
          }}
        />
        {!hasExtensions &&
          (hasFilters ? (
            <ExtensionsWithFiltersEmpty
              hasFilters={hasFilters}
              onRefresh={refetchExtensions}
              onFiltersClear={() => instance.setAllFilters([])}
            />
          ) : (
            <ExtensionsEmpty />
          ))}
        <TableWithoutHook
          instance={instance}
          styles={{ root: { display: !hasExtensions ? 'none' : undefined } }}
        />
        <TableFooter instance={instance} totalCount={totalCount} />
        <LoadingOverlay visible={isRefetching && isManualRefetch} />
      </TableWrapper> */}
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

export { Extensions };
