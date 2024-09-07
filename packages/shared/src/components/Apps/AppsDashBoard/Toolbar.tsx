/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { ChangeEvent, useState } from 'react';
import { useCacheStore as useStore } from '../../../index';
import { Magnifier } from '@kubed/icons';

import { CountDesc, SearchInput, ToolBarContent, ToolBarWrapper } from './styles';

type Props = {
  onKeywordChange: (keyword: string) => void;
};

function Toolbar({ onKeywordChange }: Props): JSX.Element {
  const [total] = useStore<number>('currentCategoryAppsTotal');
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  function handleInputChange({ target }: ChangeEvent<HTMLInputElement>): void {
    if (!target.value) {
      onKeywordChange(target.value);
    }

    setSearchKeyword(target.value);
  }

  function handleSearch(e: KeyboardEvent): void {
    if (e.key === 'Enter') {
      e.stopPropagation();
      e.preventDefault();

      if (searchKeyword) {
        onKeywordChange(searchKeyword);
      }
    }
  }

  return (
    <ToolBarWrapper>
      <ToolBarContent>
        <CountDesc>{t(`TOTAL_CATE_COUNT`, { total })}</CountDesc>
        <SearchInput
          prefix={<Magnifier />}
          placeholder={t('SEARCH_BY_NAME')}
          onKeyDown={handleSearch}
          onChange={handleInputChange}
        />
      </ToolBarContent>
    </ToolBarWrapper>
  );
}

export default Toolbar;
