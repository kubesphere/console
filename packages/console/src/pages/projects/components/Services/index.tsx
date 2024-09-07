/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { isEmpty } from 'lodash';
import { joinSelector } from '@ks-console/shared';

import ServiceItem from './Item';
import ResourceCard from '../ResourceCard';
import { useBaseK8sList } from '../../store';

type Props = {
  cluster?: string;
  namespace?: string;
  prefix?: string;
  selector?: any;
  className?: string;
};

function Services({ cluster, namespace, className, selector, prefix }: Props): JSX.Element {
  const params = { cluster, namespace, labelSelector: joinSelector(selector) };
  const { data, isLoading } = useBaseK8sList({
    module: 'services',
    params,
    autoFetch: !isEmpty(selector),
  });

  return (
    <ResourceCard
      data={data}
      title={t('SERVICE_PL')}
      className={className}
      cardLoading={isLoading}
      emptyPlaceholder={<div>{t('EMPTY_WRAPPER', { resource: t('SERVICE') })}</div>}
      itemRender={item => <ServiceItem key={item.uid} prefix={prefix} detail={item} />}
    />
  );
}

export default Services;
