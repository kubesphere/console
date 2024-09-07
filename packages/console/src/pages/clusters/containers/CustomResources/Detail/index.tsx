/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Select } from '@kubed/icons';
import { isEmpty } from 'lodash';
import {
  crdStore,
  DetailPage,
  FormattedCRD,
  formatTime,
  ClusterAliasName,
} from '@ks-console/shared';

const Detail = () => {
  const { cluster, name } = useParams();
  const ref = useRef<any>(null);

  const attrs = (data: FormattedCRD) => {
    if (isEmpty(data)) {
      return [];
    }

    return [
      {
        label: t('CLUSTER'),
        value: <ClusterAliasName cluster={cluster} />,
      },
      {
        label: t('SCOPE_TCAP'),
        value: data?.scope || '',
      },
      {
        label: t('CREATION_TIME_TCAP'),
        value: data?.createTime ? formatTime(data?.createTime) : '',
      },
      {
        label: t('CREATOR'),
        value: data?.creator || '-',
      },
    ];
  };

  const tabs = [
    {
      title: t(`CRD_PL`),
      path: `/clusters/${cluster}/customresources/${name}`,
    },
  ];

  return (
    <DetailPage
      tabs={tabs}
      ref={ref}
      store={crdStore}
      sideProps={{
        title: (detail: FormattedCRD) => detail.kind,
        attrs,
        icon: <Select size={28} />,
        breadcrumbs: {
          label: t('CRD_PL'),
          url: `/clusters/${cluster}/customresources`,
        },
        description: (detail: FormattedCRD) => detail.name,
      }}
    />
  );
};

export default Detail;
