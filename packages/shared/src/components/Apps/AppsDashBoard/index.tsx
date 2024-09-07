/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useEffect, useMemo, useState } from 'react';
import { useCacheStore as useStore } from '../../../index';
import { useNavigate } from 'react-router-dom';
import AppList from '../AppList';
import { openpitrixStore } from '../../../stores';
import { getDisplayName } from '../../../utils';
import type { CategoryDetail } from '../../../types';
import Toolbar from './Toolbar';
import Categories from './Categories';

import { PageMain } from './styles';

const { useCategoryList } = openpitrixStore;

export function AppsDashBoard(): JSX.Element {
  const navigate = useNavigate();
  const [, setCurrentStep] = useStore<number>('currentStep');
  const [, setAppCategories] = useStore<Record<string, string>>('appCategories');
  const [keyword, setKeyword] = useState<string>('');
  const [categoryId, setCategoryId] = useState<string>('');
  const [tabName, setTabName] = useState<string>(t('APP_CATE_ALL'));
  const ALL_CATEGORY_ITEM: CategoryDetail[] = [
    {
      // @ts-ignore
      categoryID: 'all',
      name: t('ALL'),
      description: 'templet',
    },
  ];
  const { data: categories } = useCategoryList({
    options: {
      format: item => ({
        categoryID: item?.metadata?.name,
        name: getDisplayName(item),
        aliasName: item.metadata?.annotations?.['kubesphere.io/alias-name'],
        description: item.spec?.icon,
      }),
    },
  });
  const sideTabs = useMemo(
    () => (categories ? ALL_CATEGORY_ITEM.concat(categories as CategoryDetail[]) : []),
    [categories],
  );
  const appCategories = useMemo(() => {
    const obj: Record<string, string> = {};
    categories?.forEach(item => {
      // @ts-ignore
      obj[item.categoryID] = item.name;
    });
    return obj;
  }, [categories]);
  useEffect(() => setAppCategories(appCategories), [appCategories]);

  function handleQuery(): void {
    let queries = [];

    if (categoryId) {
      queries.push(`category=${categoryId}`);
    }

    if (keyword) {
      queries.push(`keyword=${keyword}`);
    }

    navigate(`${location.pathname}?${queries.join('&')}`, { replace: true });
  }

  function handleClickCate(categoryKey: string, currentTabName: string): void {
    setCategoryId(categoryKey);
    setTabName(currentTabName);
  }

  useEffect(handleQuery, [keyword, categoryId]);

  useEffect(() => {
    setCurrentStep(-2);
    setCategoryId('all');
  }, []);

  return (
    <>
      <Toolbar onKeywordChange={setKeyword} />
      <PageMain>
        <Categories
          categoryId={categoryId}
          categories={sideTabs}
          handleCateClick={handleClickCate}
        />
        <AppList
          className="app-list"
          title={tabName}
          parameter={{
            // repo_id: 'repo-helm',
            categoryID: categoryId,
            keyword,
            otherQuery: { label: 'application.kubesphere.io/repo-name=upload' },
          }}
        />
      </PageMain>
    </>
  );
}

export default AppsDashBoard;
