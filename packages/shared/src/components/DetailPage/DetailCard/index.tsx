/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { ReactNode } from 'react';
import { isEmpty } from 'lodash';
import { Card, Descriptions, Tag } from '@kubed/components';
import { ChevronLeft } from '@kubed/icons';
import { useLocalStorage } from '@kubed/hooks';

import { ICON_TYPES } from '../../../constants/common';
import { DetailAction } from '../../../hooks/useActions/utils';
import { ActionOptions, useDetailActions } from '../../../hooks';
import Icon from '../../Icon';
import { State } from '../../DataTable/reducer';

import {
  BaseWrapper,
  BackLink,
  BaseTitle,
  Description,
  BtnGroupWrapper,
  ExtraWrapper,
  LabelWrapper,
  LabelTitle,
  AttributesTitle,
} from './styles';

export interface SideProps {
  module?: string;
  authKey?: string;
  name?: string;
  desc?: string;
  params?: Record<string, any>;
  actions?: DetailAction[];
  actionOptions?: ActionOptions;
  attrs?: { label: string; value: string | ReactNode; show?: boolean }[];
  breadcrumbs?: { label: string; url: string; listName?: string };
  icon?: ReactNode;
  labels?: Record<string, string>;
  customAttrs?: ReactNode;
}

const getListUrl = (url: string, listName?: string) => {
  if (listName) {
    const [storageState] = useLocalStorage({ key: `tableState:${listName}`, defaultValue: '{}' });
    const parsedStorageState: State = JSON.parse(storageState);
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

function DetailCard({
  module,
  authKey,
  actions,
  name,
  params,
  breadcrumbs,
  desc,
  labels,
  attrs,
  icon,
  actionOptions,
  customAttrs,
}: SideProps): JSX.Element {
  const renderIcon = () => {
    if (icon) {
      return icon;
    }

    if (module) {
      // @ts-ignore
      const defaultIconName = (ICON_TYPES[module] as string | undefined) ?? 'appcenter';
      if (defaultIconName) {
        return <Icon name={defaultIconName} size={28} />;
      }
      return null;
    }

    return null;
  };

  const renderDetailButton = useDetailActions({
    authKey: authKey || module,
    actions,
    params,
    actionOptions,
  });

  const renderBreadCrumbs = () => {
    if (breadcrumbs) {
      const listUrl = getListUrl(breadcrumbs.url, breadcrumbs.listName);
      return (
        <BackLink to={listUrl}>
          <ChevronLeft size={20} />
          {breadcrumbs.label}
        </BackLink>
      );
    }

    return null;
  };

  return (
    <Card padding={0}>
      <BaseWrapper>
        {renderBreadCrumbs()}
        <BaseTitle>
          {renderIcon()}
          <span>{name}</span>
        </BaseTitle>
        <Description>{desc}</Description>
        <BtnGroupWrapper>{renderDetailButton ? renderDetailButton() : null}</BtnGroupWrapper>
      </BaseWrapper>
      <ExtraWrapper>
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
        {attrs && !isEmpty(attrs) && (
          <>
            <AttributesTitle>{t('ATTRIBUTES')}</AttributesTitle>
            <Descriptions variant="unstyled" data={attrs} />
            {customAttrs}
          </>
        )}
      </ExtraWrapper>
    </Card>
  );
}

export default DetailCard;
