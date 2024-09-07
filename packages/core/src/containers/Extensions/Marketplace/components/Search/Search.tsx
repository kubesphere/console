/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';

import { Wrapper, SearchInput } from './Search.styles';

interface SearchProps {
  initialKeyword?: string;
  onChange: (value: string) => void;
}

function Search({ initialKeyword, onChange }: SearchProps) {
  return (
    <Wrapper>
      <SearchInput
        initialKeyword={initialKeyword}
        placeholder={t('SEARCH')}
        simpleMode
        onChange={onChange}
      />
    </Wrapper>
  );
}

export { Search };
