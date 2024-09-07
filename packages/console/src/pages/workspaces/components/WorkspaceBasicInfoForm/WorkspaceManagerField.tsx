/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useState } from 'react';
import type { UIEvent } from 'react';
import { debounce } from 'lodash';
import { FormItem, Input, Select } from '@kubed/components';

import { userStore } from '@ks-console/shared';

const { useInfiniteUserList } = userStore;

interface WorkspaceManagerFieldProps {
  manager: string;
  setManagerName?: (val: string) => void;
}

function WorkspaceManagerField({ manager, setManagerName }: WorkspaceManagerFieldProps) {
  const [requestParams, setRequestParams] = useState({
    name: '',
    annotation: 'kubesphere.io/creator',
  });

  const { data = [], fetchNextPage: nextPage, hasNextPage } = useInfiniteUserList(requestParams);

  const onSearch = debounce((val: string) => {
    setRequestParams({
      ...requestParams,
      name: val,
    });
  }, 500);
  const onScroll = (e: UIEvent<HTMLDivElement>) => {
    if (!hasNextPage) {
      return;
    }
    //@ts-ignore
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollTop + clientHeight - scrollHeight >= 0) {
      nextPage();
    }
  };
  const options = data.map(({ username, aliasName }) => {
    return {
      label: aliasName ? `${aliasName}（${username}）` : username,
      value: username,
      title: aliasName,
    };
  });
  if (options.every(user => user.value !== manager)) {
    options.unshift({
      value: manager,
      label: manager,
      title: manager,
    });
  }

  function handleSelect(value: string, option: any) {
    setManagerName?.(option?.aliasName);
  }

  return (
    <>
      <FormItem
        label={t('ADMINISTRATOR')}
        initialValue={globals.user.username}
        name={['spec', 'template', 'spec', 'manager']}
      >
        <Select
          showSearch
          options={options}
          onPopupScroll={debounce(onScroll, 500)}
          onSearch={onSearch}
          onSelect={handleSelect}
        />
      </FormItem>
      <div style={{ display: 'none' }}>
        <FormItem name={['metadata', 'annotations', 'kubesphere.io/manager-name']}>
          <Input />
        </FormItem>
      </div>
    </>
  );
}

export { WorkspaceManagerField };
