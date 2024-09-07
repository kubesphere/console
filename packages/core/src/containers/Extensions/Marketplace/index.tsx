/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { find, without, uniq, isEmpty } from 'lodash';
import cleanDeep from 'clean-deep';
import { Loading } from '@kubed/components';

import { useMarketplaceConfigQuery } from '../../../stores/marketplace';
import { useKExtensionsQuery, useCategoriesQuery } from '../../../stores/extension';
import { Header } from './components/Header';
import { Search } from './components/Search';
import { Filters } from './components/Filters';
import { ExtensionsTitle } from './components/ExtensionsTitle';
import { FilterTags } from './components/FilterTags';
import { Extensions } from './components/Extensions';
import { Page, Wrapper, LoadingWrapper, Container, Content, Toolbar } from './styles';

const SEARCH_KEY = 'q';

export default function ExtensionsMarketplace() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchValue = searchParams.get(SEARCH_KEY) ?? '';
  const selectedCategoryNames = searchParams.getAll('categories');
  const params = cleanDeep({
    [SEARCH_KEY]: searchValue,
    categoryNames: uniq(selectedCategoryNames),
  });

  const { isLoading: isMarketplaceConfigQueryLoading, formattedMarketplaceConfig } =
    useMarketplaceConfigQuery({ isIgnoreErrorNotify: true });

  const { isLoading: isCategoriesQueryLoading, formattedCategories } = useCategoriesQuery();

  const { isLoading: isExtensionsQueryLoading, formattedExtensions } = useKExtensionsQuery({
    params: { limit: -1, ...params },
  });

  const selectedFormattedCategories = selectedCategoryNames
    .map(filterCategoryName =>
      find(formattedCategories, {
        name: filterCategoryName,
      }),
    )
    .filter(Boolean);

  const handleSearchValueChange = (value: string) => {
    let v: string | [] = value.trim();
    if (!value) {
      v = [];
    }
    setSearchParams(
      cleanDeep({
        [SEARCH_KEY]: v,
        categories: selectedCategoryNames,
      }),
    );
  };

  const handleSelectedCategoryNamesChange = (values: string[]) => {
    let categories = values;
    if (values.length === 0) {
      categories = [];
    }
    setSearchParams(cleanDeep({ [SEARCH_KEY]: searchValue, categories }));
  };

  const clearSelectedCategoryNames = () => handleSelectedCategoryNamesChange([]);
  const clearFilters = () => setSearchParams({});

  return (
    <Page>
      <Wrapper>
        <Header />
        <Search initialKeyword={searchValue} onChange={handleSearchValueChange} />
        {isCategoriesQueryLoading ? (
          <LoadingWrapper>
            <Loading />
          </LoadingWrapper>
        ) : (
          <Container>
            <Filters
              formattedCategories={formattedCategories}
              selectedCategoryNames={selectedCategoryNames}
              onSelectedCategoryNamesChange={handleSelectedCategoryNamesChange}
            />
            <Content>
              <Toolbar>
                <ExtensionsTitle count={formattedExtensions.length} />
                <FilterTags
                  selectedFormattedCategories={selectedFormattedCategories}
                  onClose={name => {
                    const newFilterCategoryNames = without(selectedCategoryNames, name);
                    handleSelectedCategoryNamesChange(newFilterCategoryNames);
                  }}
                  onClear={clearSelectedCategoryNames}
                />
              </Toolbar>
              <Extensions
                isLoading={isExtensionsQueryLoading || isMarketplaceConfigQueryLoading}
                formattedExtensions={formattedExtensions}
                formattedMarketplaceConfig={formattedMarketplaceConfig}
                hasFilters={!isEmpty(params)}
                onFiltersClear={clearFilters}
              />
            </Content>
          </Container>
        )}
      </Wrapper>
    </Page>
  );
}
