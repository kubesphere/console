/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { merge } from 'lodash';
import { useNavigate, useParams } from 'react-router-dom';
import { useCacheStore as useStore } from '../../../index';
import { Banner, Navs, BannerTip } from '@kubed/components';
import type { BannerProps, BannerTipProps } from '@kubed/components';

import { DataTable } from '../../DataTable';
import NamespaceSelector from '../../Selectors/NamespaceSelector';
import type { TableProps } from '../../DataTable';

interface BannerType extends BannerProps {
  tips?: BannerTipProps[];
}

interface Table extends Omit<TableProps, 'rowKey' | 'tableName'> {
  rowKey?: string;
  tableName?: string;
}

export interface ListTabProps {
  id: string;
  navLabel: string;
  banner?: BannerType;
  table?: Table;
  store?: any;
}

export interface ListPageProps {
  currentTab?: string;
  banner?: BannerType;
  table?: Table;
  tabs?: ListTabProps[];
  store?: any;
  hasNamespaceSelector?: boolean;
  onNamespaceChange?: (name: string) => void;
  getTableUrl?: (namespace: string) => string;
}

const DEFAULT_ROW_KEY = 'uid';

const ListPage = ({
  currentTab,
  banner,
  table = { columns: [], rowKey: DEFAULT_ROW_KEY, tableName: '' },
  tabs = [],
  onNamespaceChange = () => {},
  hasNamespaceSelector,
  getTableUrl,
  store,
}: ListPageProps) => {
  const params = useParams();
  const { cluster = '' } = params;
  const [selectedNamespace, setSelectedNamespace] = useStore(`${cluster}-selectedNamespace`);
  const activeTab = tabs.length < 1 ? null : tabs.find(tab => tab.id === currentTab);

  const bannerProps = merge(banner, activeTab?.banner);
  const bannerTipsProps = bannerProps?.tips || [];
  const tableProps = merge(table, activeTab?.table);
  const currentStore = activeTab?.store || store;

  const navs = tabs.map(item => ({ label: item.navLabel, value: item.id }));
  const navigate = useNavigate();
  const handleNavChange = (nav: string) => {
    navigate(`../${nav}`);
  };

  const handleNamespaceChange = (name: string) => {
    setSelectedNamespace(name || null);
    onNamespaceChange(name);
  };

  const toolbarLeft = hasNamespaceSelector ? (
    <NamespaceSelector
      cluster={cluster}
      onChange={handleNamespaceChange}
      style={{ marginRight: '12px', width: '240px' }}
      value={selectedNamespace}
    />
  ) : null;

  const defaultUrl = currentStore?.getResourceUrl({
    cluster,
    namespace: selectedNamespace,
  });
  const tableUrl = (getTableUrl ? getTableUrl(selectedNamespace) : tableProps.url) || defaultUrl;
  const tableName = tableProps.tableName || `${currentStore?.module}:table:list` || 'table:list';
  const defaultFormatter = (data: any) => currentStore?.mapper(data);
  const format = tableProps.format || defaultFormatter;

  return (
    <>
      <Banner
        icon={bannerProps?.icon}
        title={bannerProps?.title}
        description={bannerProps?.description}
        className="mb12"
      >
        {navs.length ? <Navs data={navs} value={currentTab} onChange={handleNavChange} /> : null}
        {bannerTipsProps.map((item: any) => (
          <BannerTip key={item.key || item.title} title={item.title}>
            {item.children}
          </BannerTip>
        ))}
      </Banner>
      <DataTable
        key={tableName}
        rowKey={tableProps.rowKey || DEFAULT_ROW_KEY}
        toolbarLeft={toolbarLeft}
        placeholder={t('SEARCH_BY_NAME')}
        {...tableProps}
        format={format}
        tableName={tableName}
        url={tableUrl}
      />
    </>
  );
};

export default ListPage;
