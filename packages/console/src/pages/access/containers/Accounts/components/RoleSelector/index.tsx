/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { FormItem, Select } from '@kubed/components';
import { FormattedRole, isSystemRole, roleStore } from '@ks-console/shared';
import { useQuery } from 'react-query';
import { Option, OptionDescription, OptionName } from './styles';

const { fetchList } = roleStore('globalroles');

function RoleSelector() {
  const { data: formattedRoles = [] } = useQuery<FormattedRole[]>(['globalroles'], async () => {
    const res = await fetchList({
      limit: -1,
      sortBy: 'createTime',
      annotation: 'kubesphere.io/creator',
    } as any);
    return res.data;
  });

  function renderOption(item: any) {
    return (
      <Option key={item.name}>
        <OptionName>{item.aliasName ? `${item.aliasName}（${item.name}）` : item.name}</OptionName>
        <OptionDescription>{item.description || '-'}</OptionDescription>
      </Option>
    );
  }

  const roleOptions = formattedRoles
    .filter(item => !isSystemRole(item.name))
    .map(item => ({
      label: renderOption(item),
      value: item.name,
      title: item.aliasName ? `${item.aliasName}（${item.name}）` : item.name,
      item,
    }));

  return (
    <FormItem
      name={['metadata', 'annotations', 'iam.kubesphere.io/globalrole']}
      label={t('PLATFORM_ROLE')}
      help={t('PLATFORM_ROLE_DESC')}
    >
      <Select options={roleOptions} optionLabelProp="title" />
    </FormItem>
  );
}

export default RoleSelector;
