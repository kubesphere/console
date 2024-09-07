/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { forwardRef } from 'react';
import cx from 'classnames';

import { isUnCategorizedCtg, getCategoryDisplayName } from '../../../utils';
import { CategoriesWrapper, MenuItem, Name, StyledGroup, StyledIcon, Title } from './styles';

type Props = {
  categories: any[];
  handleCateClick: (category: string, tabName: string) => void;
  categoryId?: string;
};

// const CATELATEST = 'new';

function Categories(
  { categoryId, categories = [], handleCateClick }: Props,
  ref: any,
): JSX.Element {
  function handleItemClick(id: string, name: string): void {
    const displayName = getCategoryDisplayName(name);
    handleCateClick(id, displayName);
  }

  return (
    <CategoriesWrapper ref={ref}>
      <Title>{t('DISCOVER')}</Title>
      <StyledGroup direction="column" />
      <Title>{t('APP_CATEGORY_PL')}</Title>
      <StyledGroup direction="column">
        {/* @ts-ignore TODO */}
        {categories?.map(({ categoryID, aliasName, description }: any, index: number) => {
          return (
            <MenuItem
              key={categoryID || index}
              className={cx({ active: categoryId === categoryID })}
              onClick={() => handleItemClick(categoryID, aliasName || categoryID)}
            >
              <StyledIcon name={isUnCategorizedCtg(categoryID) ? 'tag' : (description ?? 'tag')} />
              <Name>{aliasName || getCategoryDisplayName(categoryID)}</Name>
            </MenuItem>
          );
        })}
      </StyledGroup>
    </CategoriesWrapper>
  );
}

export default forwardRef(Categories);
