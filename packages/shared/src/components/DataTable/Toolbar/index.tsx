/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { PropsWithChildren } from 'react';
import { Filters, TableInstance } from 'react-table';
import { Button, FilterInput, Menu, MenuItem, MenuLabel, Dropdown } from '@kubed/components';
import { Refresh, Cogwheel, Eye, EyeClosed } from '@kubed/icons';

import { ToolbarWrapper, ToolbarInner, BatchActions } from './styles';

export type Suggestions = {
  label: string | React.ReactNode;
  key: any;
  options?: Suggestions;
}[];

export interface ToolbarProps<T extends Record<string, unknown>> {
  hideFilters?: boolean;
  hideSettingMenu?: boolean;
  toolbarLeft?: React.ReactNode;
  toolbarRight?: React.ReactNode;
  batchActions?: React.ReactNode;
  simpleSearch?: boolean;
  instance: TableInstance<T>;
  placeholder?: string;
  suggestions?: Suggestions;
  onFilterInputChange?: (value: any) => void;
  refetch?: any;
}

function getFilters<T extends Record<string, unknown>>(filters: Filters<T>) {
  const formatFilters: Record<string, unknown> = {};
  filters.forEach(item => {
    formatFilters[item.id] = item.value;
  });
  return formatFilters;
}

export function Toolbar<T extends Record<string, unknown>>(
  props: PropsWithChildren<ToolbarProps<T>>,
) {
  const {
    instance,
    hideFilters,
    hideSettingMenu,
    toolbarLeft,
    toolbarRight,
    batchActions,
    simpleSearch,
    placeholder,
    suggestions = [],
    refetch,
    onFilterInputChange,
  } = props;
  const filters = getFilters<T>(instance.state.filters);
  const keyword = simpleSearch ? instance.state.filters[0]?.value || '' : '';

  const handleFilterChange = (value: any) => {
    onFilterInputChange?.(value);
    if (simpleSearch) {
      const searchKey = suggestions[0]?.key;
      if (searchKey) {
        instance.setAllFilters([{ id: searchKey, value }]);
      }
      return;
    }
    const newFilters = Object.keys(value).map(item => ({
      id: item,
      value: value[item],
    }));
    instance.setAllFilters(newFilters);
  };

  const settingMenu = hideSettingMenu ? null : (
    <Menu width={160} className="menu-setting">
      <MenuLabel>{t('CUSTOM_COLUMNS')}</MenuLabel>
      {instance.columns.map(column => {
        const { canHide, getHeaderProps, isVisible, toggleHidden } = column;
        if (canHide) {
          const { key: menuItemKey } = getHeaderProps();
          const icon = isVisible ? <Eye /> : <EyeClosed />;
          return (
            <MenuItem
              key={menuItemKey}
              icon={icon}
              onClick={() => {
                toggleHidden();
              }}
            >
              {column.render('Header')}
            </MenuItem>
          );
        }
        return null;
      })}
    </Menu>
  );

  return (
    <ToolbarWrapper>
      {instance.selectedFlatRows.length > 0 && (
        <BatchActions>
          <div className="toolbar-left">{batchActions}</div>
          <div className="toolbar-right">
            <Button
              variant="text"
              className="cancel-select"
              onClick={() => {
                instance.toggleAllRowsSelected(false);
              }}
            >
              {t('DESELECT')}
            </Button>
          </div>
        </BatchActions>
      )}
      <ToolbarInner>
        <div className="toolbar-left">{toolbarLeft}</div>
        <div className="toolbar-item">
          {!hideFilters && (
            <FilterInput
              filters={filters}
              suggestions={suggestions}
              placeholder={placeholder}
              simpleMode={simpleSearch}
              onChange={handleFilterChange}
              initialKeyword={keyword}
            />
          )}
        </div>
        <div className="toolbar-right">
          <Button variant="text" className="btn-refresh" onClick={refetch}>
            <Refresh />
          </Button>
          {!hideSettingMenu && (
            <Dropdown content={settingMenu} placement="bottom-end" maxWidth={160}>
              <Button variant="text" className="btn-setting">
                <Cogwheel />
              </Button>
            </Dropdown>
          )}
          {toolbarRight}
        </div>
      </ToolbarInner>
    </ToolbarWrapper>
  );
}
