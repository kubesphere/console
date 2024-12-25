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

import React, { useEffect, useMemo, useState } from 'react';
import ResourceCard from '../ResourceCard';
import VolumeItem from './Item';
import { EmptyTips } from './styles';

interface VolumesCardProps {
  prefix?: string;
  detail: any[];
}

const VolumesCard: React.FC<VolumesCardProps> = ({ detail, prefix }) => {
  const [volumeList, setVolumeList] = useState<any[]>([]);
  const list = useMemo(
    () =>
      detail.map(item => ({
        ...item,
        module: item.kind,
        ...item.metadata,
      })),
    [detail],
  );
  useEffect(() => {
    if (!list) return;
    const volumeItems = list.filter(item => item.kind === 'PersistentVolumeClaim');
    setVolumeList(volumeItems);
  }, [list]);
  return (
    <ResourceCard
      key="PersistentVolumeClaim"
      title={t('PERSISTENT_VOLUME_CLAIM')}
      data={volumeList}
      emptyPlaceholder={
        <EmptyTips>
          {t('NO_AVAILABLE_RESOURCE_VALUE', { resource: t('PERSISTENT_VOLUME_CLAIM') })}
        </EmptyTips>
      }
      itemRender={item => <VolumeItem key={item.name} volume={item} prefix={prefix} />}
    />
  );
};

export default VolumesCard;
