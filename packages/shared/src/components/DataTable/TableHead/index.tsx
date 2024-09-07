/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { PropsWithChildren } from 'react';
import { HeaderGroup } from 'react-table';
import styled from 'styled-components';
import cx from 'classnames';
import { Popover, Menu, MenuItem, MenuLabel, Dropdown } from '@kubed/components';
import { Information, CaretDown, SortAscending, SortDescending } from '@kubed/icons';

const TWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  .sort-indicator {
    color: #79879c;
  }

  .kubed-icon {
    margin-left: 4px;
  }

  .filter-menu {
    .menu-label {
      color: #79879c;
    }
    button {
      color: #4a5974;
    }

    .kubed-icon {
      color: #79879c;
      fill: #b6c2cd;
    }
  }
`;

const DropdownWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export interface TableHeadProps<T extends Record<string, unknown>> {
  column: HeaderGroup<T>;
  selectType: 'checkbox' | 'radio' | boolean;
}

function TableHead<T extends Record<string, unknown>>({
  column,
  selectType,
}: PropsWithChildren<TableHeadProps<T>>) {
  const { description, sortable, filterOptions = [], toggleSortBy, setFilter } = column;

  const handleSort = (direction: 'ascending' | 'descending') => {
    toggleSortBy(direction === 'descending');
  };

  const handleFilter = (value: any) => {
    setFilter(value);
  };

  const renderDropdown = () => {
    // todo add sort state isSorted, isSortedDesc from column;
    if (sortable || filterOptions.length) {
      const content = (
        <Menu className="filter-menu">
          {sortable && (
            <>
              <MenuLabel>{t('KUBE_OPERATE')}</MenuLabel>
              <MenuItem
                icon={<SortAscending />}
                onClick={() => {
                  handleSort('ascending');
                }}
              >
                {t('KUBE_ASCENDING_ORDER')}
              </MenuItem>
              <MenuItem
                icon={<SortDescending />}
                onClick={() => {
                  handleSort('descending');
                }}
              >
                {t('KUBE_DESCENDING_ORDER')}
              </MenuItem>
            </>
          )}
          {filterOptions.length && (
            <>
              <MenuLabel>{t('KUBE_FILTER')}</MenuLabel>
              {filterOptions.map((option: any) => (
                <MenuItem
                  key={option.key}
                  onClick={() => {
                    handleFilter(option.key);
                  }}
                >
                  {option.label}
                </MenuItem>
              ))}
            </>
          )}
        </Menu>
      );

      return (
        <Dropdown content={content}>
          <DropdownWrapper>
            {column.render('Header')}
            <CaretDown className="sort-indicator" />
          </DropdownWrapper>
        </Dropdown>
      );
    }

    if (column.id === '_selector' && selectType === 'radio') return null;

    return <>{column.render('Header')}</>;
  };

  return (
    <th
      {...column.getHeaderProps()}
      className={cx({
        'table-selector': column.id === '_selector',
        'table-more': column.id === 'more',
        'table-name': column.id === 'name',
      })}
    >
      <TWrapper>
        {renderDropdown()}
        {description && (
          <Popover {...(description as Record<string, any>)}>
            <Information />
          </Popover>
        )}
      </TWrapper>
    </th>
  );
}

export default TableHead;
