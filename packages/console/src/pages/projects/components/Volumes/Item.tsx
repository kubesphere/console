/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { get } from 'lodash';
import { Storage } from '@kubed/icons';
import { Link } from 'react-router-dom';
import { Field } from '@kubed/components';

import { ItemWrapper } from '../styles';

type Props = {
  detail: any;
  prefix?: string;
};

function VolumesItem({ detail, prefix }: Props): JSX.Element {
  const description = t('STORAGE_CLASS_VALUE', {
    value: get(detail, 'storageClassName', '-'),
  });
  const details = [
    {
      value: get(detail, 'capacity', '-'),
      label: t('CAPACITY'),
    },
    {
      value: get(detail, 'accessMode', '-'),
      label: t('ACCESS_MODE_TCAP'),
    },
  ];

  return (
    <ItemWrapper>
      <Field
        avatar={<Storage size={40} />}
        value={<Link to={`${prefix}/volumes/${detail.name}`}>{detail.name}</Link>}
        label={description}
      />
      {details.map((params, index) => (
        <Field key={index} {...params} />
      ))}
    </ItemWrapper>
  );
}

export default VolumesItem;
