/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { CSSProperties, PropsWithChildren, ReactElement } from 'react';
import { TableInstance } from 'react-table';
import styled from 'styled-components';
import { Dropdown, Menu, MenuItem } from '@kubed/components';
import { CaretDown } from '@kubed/icons';
import { PageSize, PaginationLeft, Divider } from './styles';
import Pagination from '../../Pagination';

const FooterWrapper = styled.div`
  position: relative;
  padding: 10px 20px;
  background-color: #f9fbfd;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  color: #79879c;
`;

const FooterInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .pagination {
    display: inline-flex;
    align-items: center;

    button {
      padding: 5px 12px;
      &:disabled {
        opacity: 0.6;
        border-color: transparent;
        background-color: transparent;
      }
    }
  }
`;

interface TableFooterProps<T extends Record<string, unknown>> {
  instance: Pick<TableInstance<T>, 'nextPage' | 'previousPage' | 'pageCount'> & {
    state: Pick<TableInstance<T>['state'], 'pageIndex'> & { pageSize?: number };
    setPageSize?: (pageSize: number) => void;
    gotoPage?: (pageIndex: number) => void;
  };
  totalCount: number;
  isShowSetPageSize?: boolean;
  isShowDivider?: boolean;
  isShowTotalCount?: boolean;
  isShowPagination?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function TableFooter<T extends Record<string, unknown>>({
  instance,
  totalCount,
  isShowSetPageSize = true,
  isShowDivider = true,
  isShowTotalCount = true,
  isShowPagination = true,
  style,
  className,
}: PropsWithChildren<TableFooterProps<T>>): ReactElement {
  const {
    state: { pageIndex, pageSize },
    nextPage,
    previousPage,
    setPageSize,
    gotoPage,
    pageCount,
  } = instance;

  return (
    <FooterWrapper className={className} style={style}>
      <FooterInner>
        <PaginationLeft>
          {isShowSetPageSize && setPageSize && (
            <Dropdown
              trigger="mouseenter click"
              interactive={true}
              content={
                <Menu style={{ width: 96 }}>
                  {[10, 20, 50, 100].map(size => (
                    <MenuItem
                      onClick={() => {
                        setPageSize(size);
                      }}
                      key={size}
                      style={{ alignItems: 'center' }}
                    >
                      {size}
                    </MenuItem>
                  ))}
                </Menu>
              }
            >
              <PageSize>
                {t('SHOW_NUM', { num: pageSize })}
                <CaretDown size={16} />
              </PageSize>
            </Dropdown>
          )}
          {isShowDivider && <Divider />}
          {isShowTotalCount && (
            <div className="total-count">{t('TOTAL_ITEMS', { num: totalCount })}</div>
          )}
        </PaginationLeft>

        {isShowPagination && (
          <Pagination
            onPreviousPage={previousPage}
            onNextPage={nextPage}
            onGotoPage={gotoPage}
            totalCount={totalCount}
            page={pageIndex}
            pageSize={pageSize}
            showTotal={false}
            pageCount={pageCount}
          />
        )}
      </FooterInner>
    </FooterWrapper>
  );
}
