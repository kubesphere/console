/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import type { Dictionary } from 'lodash';

import { useCacheStore as useStore } from '../../../index';
import CheckItem from './checkItem';
import type { FormattedRole } from '../../../types';

import { ContentWrapper, TitleWrapper } from './style';

export interface RoleStore {
  currentModule: string;
  aggregationRoles: string[];
}

interface Props {
  templates: FormattedRole[];
  module: string;
  roleTemplatesMap: Dictionary<FormattedRole>;
}

function Permissions({ templates, module, roleTemplatesMap }: Props) {
  const [roleStore, setRoleStore] = useStore<RoleStore>(`${module}_store`);

  return (
    <ContentWrapper>
      <TitleWrapper>{t('PERMISSION_PL')}</TitleWrapper>
      <div className="content">
        {templates.map(role => (
          <CheckItem
            key={role.name}
            role={role}
            aggregationRoles={roleStore.aggregationRoles}
            roleTemplatesMap={roleTemplatesMap}
            onChange={value => {
              setRoleStore({
                ...roleStore,
                aggregationRoles: value,
              });
            }}
          />
        ))}
      </div>
    </ContentWrapper>
  );
}

export default Permissions;
