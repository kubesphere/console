/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { without } from 'lodash';
import { Checkbox, CheckboxGroup } from '@kubed/components';

import type { FormattedCategory } from '../../../../../stores/extension';
import {
  Wrapper,
  Title,
  FiltersWrapper,
  FilterTitle,
  FilterItems,
  FilterItem,
  FilterItemLabel,
  FilterItemName,
  FilterItemNameInner,
  FilterItemCount,
} from './Filters.styles';

interface FiltersProps {
  formattedCategories: FormattedCategory[];
  selectedCategoryNames: string[];
  onSelectedCategoryNamesChange: (values: string[]) => void;
}

function Filters({
  formattedCategories,
  selectedCategoryNames,
  onSelectedCategoryNamesChange,
}: FiltersProps) {
  if (formattedCategories.length === 0) {
    return null;
  }

  return (
    <Wrapper>
      <Title>{t('FILTERS')}</Title>
      <FiltersWrapper>
        <div>
          <FilterTitle>{t('CATEGORIES')}</FilterTitle>
          <CheckboxGroup
            unstyled
            defaultValue={selectedCategoryNames}
            value={selectedCategoryNames}
            onChange={onSelectedCategoryNamesChange}
          >
            <FilterItems>
              {formattedCategories.map(formattedCategory => (
                <FilterItem key={formattedCategory.uid}>
                  <FilterItemLabel htmlFor={formattedCategory.uid}>
                    <FilterItemName>
                      <FilterItemNameInner title={formattedCategory.localeDisplayName}>
                        {formattedCategory.localeDisplayName}
                      </FilterItemNameInner>
                    </FilterItemName>
                    <FilterItemCount>{formattedCategory.displayCount}</FilterItemCount>
                  </FilterItemLabel>
                  <Checkbox
                    id={formattedCategory.uid}
                    value={formattedCategory.name}
                    onChange={event => {
                      const { checked } = event.target;
                      if (checked) {
                        onSelectedCategoryNamesChange([
                          ...selectedCategoryNames,
                          formattedCategory.name,
                        ]);
                      } else {
                        const newFilterCategories = without(
                          selectedCategoryNames,
                          formattedCategory.name,
                        );
                        onSelectedCategoryNamesChange(newFilterCategories);
                      }
                    }}
                  />
                </FilterItem>
              ))}
            </FilterItems>
          </CheckboxGroup>
        </div>
      </FiltersWrapper>
    </Wrapper>
  );
}

export { Filters };
