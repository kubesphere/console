/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useState, CSSProperties, ReactElement } from 'react';
import styled from 'styled-components';
import { Previous, Next } from '@kubed/icons';
import { ceil, noop } from 'lodash';
import { Button, Dropdown, Menu, MenuItem } from '@kubed/components';

const PaginationWrapper = styled.div`
  position: relative;
`;

const PaginationInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .pagination {
    display: inline-flex;
    align-items: center;

    .item-inner {
      justify-content: center;
    }

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

export interface PaginationProps {
  className?: string;
  style?: CSSProperties;
  totalCount: number;
  onNextPage?: (page: number) => void;
  onPreviousPage?: (page: number) => void;
  onGotoPage?: (page: number) => void;
  page?: number;
  pageSize?: number;
  showTotal?: boolean;
  pageCount?: number;
}

export function Pagination({
  totalCount,
  style,
  className,
  onNextPage = noop,
  onPreviousPage = noop,
  onGotoPage = noop,
  page = 0,
  pageSize = 10,
  showTotal = true,
  pageCount,
}: PaginationProps): ReactElement {
  const [crtPage, setCrtPage] = useState(page);
  let curPageCount = ceil(totalCount / pageSize);

  if ((pageCount !== undefined && isNaN(pageCount)) || pageCount === 0) {
    curPageCount = 1;
  }

  if (pageCount !== undefined && !isNaN(pageCount) && pageCount !== 0) {
    curPageCount = pageCount;
  }

  curPageCount = curPageCount === 0 ? 1 : curPageCount;

  const handlePrevious = () => {
    const newPage = crtPage === 0 ? 0 : crtPage - 1;
    setCrtPage(newPage);
    onPreviousPage(newPage);
  };

  const handleNext = () => {
    const newPage = crtPage === pageCount ? pageCount : crtPage + 1;
    setCrtPage(newPage);
    onNextPage(newPage);
  };

  const renderPageDropDown = () => {
    if (onGotoPage !== noop && curPageCount > 0) {
      const items = [];
      for (let i = 1; i <= curPageCount; i++) {
        items.push(
          <MenuItem
            style={{ alignItems: 'center' }}
            key={i}
            onClick={() => {
              onGotoPage(i - 1);
              setCrtPage(i - 1);
            }}
          >
            {i}
          </MenuItem>,
        );
      }
      return <Menu style={{ width: 96, maxHeight: '175px', overflow: 'auto' }}>{items}</Menu>;
    }
    return null;
  };

  return (
    <PaginationWrapper className={className} style={style}>
      <PaginationInner>
        {showTotal ? (
          <div className="total-count">{t('TOTAL_ITEMS', { num: totalCount })}</div>
        ) : (
          <div />
        )}
        <div className="pagination">
          <Button variant="text" radius="sm" onClick={handlePrevious} disabled={crtPage + 1 === 1}>
            <Previous size={20} />
          </Button>
          <Dropdown trigger="mouseenter click" content={renderPageDropDown()} interactive={true}>
            <span
              style={{
                margin: '0 12px',
                fontWeight: 600,
                color: '#36435c',
                fontSize: '12px',
                cursor: 'pointer',
              }}
            >
              {crtPage + 1} / {curPageCount}
            </span>
          </Dropdown>

          <Button
            variant="text"
            radius="sm"
            onClick={handleNext}
            disabled={crtPage + 1 === curPageCount}
          >
            <Next size={20} />
          </Button>
        </div>
      </PaginationInner>
    </PaginationWrapper>
  );
}

export default Pagination;
