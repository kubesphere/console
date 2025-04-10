/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { debounce } from 'lodash';
import type { ColumnDef } from '@tanstack/react-table';
import { Loading, DataTable } from '@kubed/components';

import { tableState2Query, useUrlSearchParamsStatus, StatusIndicator } from '@ks-console/shared';
import { EXTENSIONS_PAGE_PATHS } from '../../../../../constants/extension';
import type { FetchKExtensionsParams, FormattedExtension } from '../../../../../stores/extension';
import { useKExtensionsQuery, useWatchExtensions } from '../../../../../stores/extension';
import { useMarketplaceConfigQuery } from '../../../../../stores/marketplace';
import { getExtensionsEmptyProps as getExtensionsEmptyPropsWithFilters } from '../../../components/ExtensionsEmpty';
import { DEBOUNCE_WAIT, DEFAULT_PAGE_SIZE } from '../../constants';

import { MarketplaceUserEmpty } from './MarketplaceUserEmpty';
import { getExtensionsEmptyProps } from './ExtensionsEmpty';
import { MarketplaceAccount } from './MarketplaceAccount';
import { ExtensionStatus } from './ExtensionStatus';
import { LoadingWrapper, ExtensionField, Icon, StyledCard } from './Extensions.styles';

export function Extensions() {
  const {
    isLoading: isMarketplaceConfigQueryLoading,
    isOnline,
    isOffline,
    formattedMarketplaceConfig,
    refetch: refetchMarketplaceConfig,
  } = useMarketplaceConfigQuery({ isIgnoreErrorNotify: true });

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
  });

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
          return <ExtensionStatus formattedExtension={formattedExtension as FormattedExtension} />;
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
    ],
    [],
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
    <StyledCard padding={0}>
      <DataTable.DataTable table={table} />
    </StyledCard>
  );
}
