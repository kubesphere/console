/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useState, useMemo } from 'react';
import { Alert, Checkbox } from '@kubed/components';
import { isEmpty } from 'lodash';
import { clusterStore } from '../../../stores';
import { ClusterDetail } from '../../../types';
import { isMultiCluster } from '../../../utils';
import {
  ClusterItem,
  ClusterSelectItemWrapper,
  ClusterSelectWrapper,
  SelectWrapper,
} from './styles';
interface Props {
  value?: { name: string }[];
  onChange?: (val: { name: string }[]) => void;
}

const { fetchGrantedList } = clusterStore;

function ClusterSelect({ value = [], onChange }: Props): JSX.Element {
  const [showTip, setShowTip] = useState<boolean>(false);
  const [selectAll, setSelectAll] = useState<number>(0); // 0 Check out all,1  Partial selection, 2 select all.

  const { data = [], isLoading = false } = fetchGrantedList({ limit: -1 }) || {
    data: [],
    isLoading: false,
  };

  const hostCluster = useMemo(
    () => data.filter((item: ClusterDetail) => item.isHost).map((item: ClusterDetail) => item.name),
    [data],
  );

  const allCluster = useMemo(
    () =>
      data.map((item: ClusterDetail) => {
        return { name: item.name };
      }),
    [data],
  );

  const $isMultiCluster = isMultiCluster();

  const handleSelectAll = () => {
    if (selectAll === 0 || selectAll === 1) {
      onChange?.(allCluster);
      setSelectAll(2);
      setShowTip(true);
    }
    if (selectAll === 2) {
      onChange?.([]);
      setSelectAll(0);
      setShowTip(false);
    }
  };

  const handleClick = (name: string) => {
    if (!$isMultiCluster) {
      return;
    }

    let newValue: Array<{ name: string }> = [];
    if (value.some(item => item.name === name)) {
      newValue = value.filter(item => item.name !== name);
    } else {
      newValue = [...value, { name }];
    }

    setShowTip(newValue.some(item => hostCluster.includes(item.name)));
    onChange?.(newValue);
    if (newValue.length === 0) {
      setSelectAll(0);
    }
    if (newValue.length === allCluster.length) {
      setSelectAll(2);
    }
    if (newValue.length !== allCluster.length && newValue.length !== 0) {
      setSelectAll(1);
    }
  };

  if (isEmpty(data) && !isLoading) {
    return <Alert type="warning">{t('NO_CLUSTER_AVAILABLE_DESC')}</Alert>;
  }
  return (
    <ClusterSelectWrapper>
      {showTip && (
        <Alert className="mb12" type="warning">
          {t('SELECT_HOST_CLUSTER_WARNING')}
        </Alert>
      )}
      <SelectWrapper onClick={handleSelectAll}>
        <Checkbox
          indeterminate={selectAll === 1}
          checked={selectAll === 2 ? true : false}
          label={t('SELECT_ALL')}
        />
      </SelectWrapper>
      {data.map((cluster: ClusterDetail) => (
        <ClusterSelectItemWrapper
          className={$isMultiCluster ? '' : 'disabled'}
          key={cluster.name}
          onClick={() => handleClick(cluster.name)}
        >
          <Checkbox
            checked={value.some(item => item.name === cluster.name)}
            disabled={!$isMultiCluster}
          />
          <ClusterItem cluster={cluster} />
        </ClusterSelectItemWrapper>
      ))}
    </ClusterSelectWrapper>
  );
}

export default ClusterSelect;
