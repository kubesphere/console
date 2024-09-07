/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useMemo } from 'react';
import cx from 'classnames';

import {
  CategoryDetail,
  Icon,
  isUnCategorizedCtg,
  getAnnotationsDescription,
} from '@ks-console/shared';

import { Actions, Category, Others } from './styles';

type Props = {
  detail: CategoryDetail;
  isActive: boolean;
  onSelectCategory: (item: CategoryDetail) => void;
  onEditCategory?: (item: CategoryDetail) => void;
  onDeleteCategory?: (item: CategoryDetail) => void;
};

function CategoryItem({
  detail,
  isActive,
  onSelectCategory,
  onEditCategory,
  onDeleteCategory,
}: Props): JSX.Element {
  const iconName = useMemo(() => {
    if (['uncategorized', ''].includes(getAnnotationsDescription(detail) || '')) {
      return 'tag';
    }

    return getAnnotationsDescription(detail);
  }, [getAnnotationsDescription(detail)]);

  return (
    <Category onClick={() => onSelectCategory(detail)} className={cx({ active: isActive })}>
      {iconName && <Icon size={16} className="mr12" name={iconName} />}
      {t(`APP_CATE_${detail?.metadata.name?.toUpperCase().replace(/[^A-Z]+/g, '_')}`, {
        defaultValue: detail?.metadata.name,
      })}
      <Others>
        <span className="total_count">{detail?.status.total || 0}</span>
        {!isUnCategorizedCtg(detail?.metadata.name) && (
          <Actions className="actions">
            <Icon
              name="trash"
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                onDeleteCategory?.(detail);
              }}
            />
            <Icon
              name="pen"
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                onEditCategory?.(detail);
              }}
            />
          </Actions>
        )}
      </Others>
    </Category>
  );
}

export default CategoryItem;
