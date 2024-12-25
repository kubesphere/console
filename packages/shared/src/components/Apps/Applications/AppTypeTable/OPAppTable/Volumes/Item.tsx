/*
 * This file is part of KubeSphere Console.
 * Copyright (C) 2019 The KubeSphere Console Authors.
 *
 * KubeSphere Console is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * KubeSphere Console is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with KubeSphere Console.  If not, see <https://www.gnu.org/licenses/>.
 */

import { get } from 'lodash';
import React from 'react';
import { Link } from 'react-router-dom';

import { Text } from '@ks-console/shared';

import { Item } from './styles';

type Props = {
  volume: any;
  prefix?: string;
};
const Card = ({ volume, prefix }: Props) => {
  const description = t('STORAGE_CLASS_VALUE', {
    value: get(volume, 'spec.storageClassName', '-'),
  });
  const details = [
    {
      title: get(volume, 'spec.resources.requests.storage', '-'),
      description: t('CAPACITY'),
    },
    {
      title: get(volume, 'spec.accessModes[0]', '-'),
      description: t('ACCESS_MODE_TCAP'),
    },
  ];
  return (
    <Item>
      <Text
        icon="storage"
        title={<Link to={`${prefix}/volumes/${volume.name}`}>{volume.name}</Link>}
        description={description}
      />
      {details.map((params, index) => (
        <Text key={index} {...params} />
      ))}
    </Item>
  );
};

export default Card;
