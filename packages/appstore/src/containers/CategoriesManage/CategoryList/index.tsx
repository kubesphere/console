/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useEffect, useMemo, useState } from 'react';

import { CategoryDetail, isUnCategorizedCtg } from '@ks-console/shared';

import CategoryItem from './CategoryItem';

import { CategoriesWrapper } from './styles';

type Props = {
  categories: CategoryDetail[];
  onSelectCategory: (data: CategoryDetail) => void;
  onManageCategory: (data: CategoryDetail, manageType: string) => void;
};

function CategoryList({ categories, onSelectCategory, onManageCategory }: Props): JSX.Element {
  const unCategorizedItem = useMemo(() => {
    return categories.find(({ metadata }) => isUnCategorizedCtg(metadata.name));
  }, [categories]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryDetail | undefined>(
    unCategorizedItem,
  );

  useEffect(() => setSelectedCategory(unCategorizedItem), [unCategorizedItem]);

  useEffect(() => {
    if (selectedCategory) {
      onSelectCategory(selectedCategory);
    }
  }, [selectedCategory]);

  return (
    <CategoriesWrapper>
      {categories?.map(item => (
        <CategoryItem
          key={item.metadata.name}
          detail={item}
          onSelectCategory={setSelectedCategory}
          isActive={item.metadata.name === selectedCategory?.metadata.name}
          onEditCategory={data => onManageCategory(data, 'manage')}
          onDeleteCategory={data => onManageCategory(data, 'delete')}
        />
      ))}
    </CategoriesWrapper>
  );
}

export default CategoryList;
