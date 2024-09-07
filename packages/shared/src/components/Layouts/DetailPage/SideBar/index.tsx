/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { ReactNode } from 'react';
import { isEmpty } from 'lodash';
import { isFunction } from 'lodash';
import { ChevronLeft } from '@kubed/icons';
import { useLocalStorage } from '@kubed/hooks';
import { Card, Descriptions, Tag, Group } from '@kubed/components';

import Icon from '../../../Icon';
import { State } from '../../../DataTable/reducer';
import { useDetailPage } from '../DetailPageContext';
import { ICON_TYPES } from '../../../../constants/common';
import { getDisplayName } from '../../../../utils/getter';
import useActionMenu from '../../../../hooks/useActionMenu';
import type { Action } from '../../../../hooks/useActionMenu';

import {
  BaseInfo,
  BackLink,
  TitleText,
  LabelTitle,
  Description,
  LabelWrapper,
  BaseInfoTitle,
  AttributesTitle,
  DetailInfoWrapper,
} from './styles';

export interface SideBarProps<T> {
  breadcrumbs?: { label: string; url: string; listName?: string };
  icon?: ReactNode;
  attrs?: (data: T) => { label: string; value: string | ReactNode; show?: boolean }[];
  title?: string | ReactNode;
  description?: string | ReactNode;
  actions?: Action<T>[] | ReactNode;
  labels?: Record<string, string>;
  extra?: ReactNode;
}

const getListUrl = (url: string, listName?: string) => {
  const [storageState] = useLocalStorage({ key: `tableState:${listName}`, defaultValue: '{}' });
  if (listName) {
    const parsedStorageState: State = JSON.parse(storageState);
    if (isEmpty(parsedStorageState)) {
      return url;
    }
    const { pageIndex, pageSize, filters = [], sortBy } = parsedStorageState;

    if (
      pageIndex ||
      pageSize !== 10 ||
      Object.keys(filters).length > 0 ||
      sortBy[0]?.id !== 'createTime' ||
      !sortBy[0]?.desc
    ) {
      let queryString = `page=${pageIndex + 1}&pageSize=${pageSize}`;
      if (filters.length) {
        filters.forEach(filter => {
          queryString = `${queryString}&${filter.id}=${filter.value}`;
        });
      }
      if (sortBy.length) {
        sortBy.forEach(sort => {
          queryString = `${queryString}&sortBy=${sort.id}&desc=${sort.desc}`;
        });
      }

      return `${url}?${queryString}`;
    } else {
      return url;
    }
  }

  return url;
};

const SideBar = <T extends Record<string, any>>({
  breadcrumbs,
  icon,
  title,
  description,
  labels,
  attrs,
  extra,
  actions = [],
}: SideBarProps<T>) => {
  const { detail = {} as T, params, store, authKey } = useDetailPage<T>();
  const iconEl = icon || <Icon name={ICON_TYPES[store.module] || 'appcenter'} size={28} />;
  const titleEl = (isFunction(title) ? title(detail) : title) || getDisplayName(detail);
  const detailEl =
    (isFunction(description) ? description(detail) : description) || detail?.description;
  const actionEls = isFunction(actions) ? actions(detail) : actions || [];

  const renderBreadCrumbs = () => {
    if (breadcrumbs) {
      const listName = breadcrumbs.listName ?? `${store?.module}:table:list`;
      const listUrl = getListUrl(breadcrumbs.url, listName);
      return (
        <BackLink to={listUrl}>
          <ChevronLeft size={20} />
          {breadcrumbs.label}
        </BackLink>
      );
    }
    return null;
  };

  const firstAction = actionEls.length ? [actionEls[0]] : [];
  const firstMenu = useActionMenu({
    authKey,
    params,
    actions: firstAction,
    autoSingleButton: true,
  });

  const moreActions = actionEls?.slice(1);
  const moreMenu = useActionMenu({
    authKey,
    params,
    actions: moreActions,
    dropdownTheme: 'dark',
    dropdownType: 'text',
    dropdownProps: {
      placement: 'bottom-start',
    },
  });

  const attrData = isFunction(attrs) ? attrs(detail) : [];

  return (
    <Card padding={0}>
      <BaseInfo>
        {renderBreadCrumbs()}
        <BaseInfoTitle>
          {iconEl}
          <TitleText>{titleEl}</TitleText>
        </BaseInfoTitle>
        <Description>{detailEl}</Description>
        <Group>
          {firstMenu(detail)}
          {moreMenu(detail)}
        </Group>
      </BaseInfo>
      <DetailInfoWrapper>
        {labels && !isEmpty(labels) && (
          <LabelWrapper>
            <LabelTitle>{t('LABEL_PL')}</LabelTitle>
            <div className="label-list">
              {Object.entries(labels).map(([key, value]) => (
                <Tag title={key}>{value}</Tag>
              ))}
            </div>
          </LabelWrapper>
        )}
        <>
          <AttributesTitle>{t('ATTRIBUTES')}</AttributesTitle>
          <Descriptions variant="unstyled" data={attrData} />
          {extra}
        </>
      </DetailInfoWrapper>
    </Card>
  );
};

export default SideBar;
