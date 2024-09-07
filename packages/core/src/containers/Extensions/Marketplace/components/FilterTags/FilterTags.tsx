/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';

import type { FormattedCategory } from '../../../../../stores/extension';
import { Wrapper, StyledTag, LinkButton } from './FilterTags.styles';

interface FilterTagsProps {
  selectedFormattedCategories: (FormattedCategory | undefined)[];
  onClose: (value: string) => void;
  onClear: () => void;
}

function FilterTags({ selectedFormattedCategories, onClose, onClear }: FilterTagsProps) {
  if (selectedFormattedCategories.length === 0) {
    return null;
  }

  return (
    <Wrapper>
      {selectedFormattedCategories.map(formattedCategory => {
        if (!formattedCategory) {
          return null;
        }

        const { name, localeDisplayName } = formattedCategory;

        return (
          <StyledTag key={name} closable onClose={() => onClose(name)}>
            {localeDisplayName}
          </StyledTag>
        );
      })}

      <LinkButton onClick={() => onClear()}>{t('CLEAR_ALL_FILTERS')}</LinkButton>
    </Wrapper>
  );
}

export { FilterTags };
