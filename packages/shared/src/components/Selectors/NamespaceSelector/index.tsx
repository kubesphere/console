/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useCallback, useState, CSSProperties } from 'react';
import { debounce } from 'lodash';
import { Select } from '@kubed/components';

import Icon from '../../Icon';
import { projectStore } from '../../../stores';

import { ItemIcon } from './styles';

interface Params {
  pageSize?: number;
  cluster: string;
  workspace?: string;
  value?: string;
  onChange?: (name: string) => void;
  style?: CSSProperties;
}

const NamespaceSelector = ({ pageSize, cluster, workspace, onChange, style, value }: Params) => {
  const [innerPageSize, setPageSize] = useState(pageSize || 10);
  const { useNamespaceList } = projectStore;
  const { data, isLoading, reFetch, ...rest } = useNamespaceList(
    {
      cluster,
      workspace,
    },
    { mode: 'infinity', pageSize: innerPageSize, staleTime: 15000 },
  );

  const handleProjectChange = useCallback((namespace: string) => {
    onChange?.(namespace);
  }, []);

  const handleScroll = debounce(() => {
    const { total } = rest;
    if (data!.length < total) {
      const newSize = innerPageSize + innerPageSize;
      reFetch({ limit: newSize });
      setPageSize(newSize);
    }
  }, 500);

  const Option = Select.Option;
  return (
    <Select
      allowClear
      placeholder={t('ALL_PROJECTS')}
      virtual={false}
      loading={isLoading}
      onChange={handleProjectChange}
      onPopupScroll={handleScroll}
      showSearch
      style={style}
      value={value}
    >
      {data?.map(item => (
        <Option value={item!.name} key={item!.uid}>
          <ItemIcon>
            {item.isFedManaged ? (
              <img src="/assets/cluster.svg" />
            ) : (
              <Icon name="project" size={16} />
            )}
            <span>{item!.name}</span>
          </ItemIcon>
        </Option>
      ))}
    </Select>
  );
};

export default NamespaceSelector;
