/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useEffect, useMemo } from 'react';
import { get, groupBy, keyBy, sortBy, uniqBy } from 'lodash';
import {
  Role,
  Templet,
  Cluster,
  Key,
  Openpitrix,
  Cogwheel,
  Project,
  Appcenter,
  Storage,
  Hammer,
} from '@kubed/icons';
import { useCacheStore as useStore } from '../../../index';
import Tabs from './tabs';
import Permissions, { RoleStore } from './permissions';
import type { FormattedRole, RoleModule } from '../../../types';
import { FullScreenModal, Wrapper } from './style';

const ROLE_MODULES_ICON: Record<string, any> = {
  'cluster-management': Cluster,
  'access-control': Key,
  'apps-management': Openpitrix,
  'platforms-settings': Cogwheel,
  'projects-management': Project,
  'workspace-settings': Cogwheel,
  'Application Workloads': Appcenter,
  'storage-management': Storage,
  'configuration-center': Hammer,
  'project-settings': Project,
};
interface Props {
  title?: string;
  visible: boolean;
  confirmLoading?: boolean;
  onOk: (value: string[]) => void;
  onCancel: () => void;
  module: string;
  roleTemplates: FormattedRole[];
  aggregationRoles?: string[];
  roleModules?: RoleModule[];
}

function RoleAuthorization({
  title,
  visible,
  confirmLoading,
  module,
  roleTemplates = [],
  aggregationRoles = [],
  roleModules = [],
  onOk,
  onCancel,
}: Props) {
  const [roleStore, setRoleStore] = useStore<RoleStore>(`${module}_store`, {
    currentModule: roleModules[0]?.name,
    aggregationRoles,
  });

  const roleTemplatesMap = keyBy(roleTemplates, 'name');
  const groupedTemplates = groupBy(roleTemplates, 'labels["iam.kubesphere.io/category"]');

  const roleModulesLists = useMemo(() => {
    const data = roleModules.map(item => {
      return {
        ...item,
        icon: ROLE_MODULES_ICON[item.name] || Templet,
        state: roleStore.aggregationRoles.some(name => {
          return get(roleTemplatesMap[name], 'labels["iam.kubesphere.io/category"]') === item.name;
        })
          ? 'ENABLED'
          : 'NOT_ENABLED',
      };
    });
    let list = uniqBy(data, 'name').filter(item => {
      const template = groupedTemplates[item.name];
      return template && template.length > 0;
    }) as RoleModule[];
    return list;
  }, [roleModules, roleStore.aggregationRoles]);

  const templates = sortBy(groupedTemplates[roleStore.currentModule] || [], 'name');

  useEffect(() => {
    setRoleStore({
      ...roleStore,
      currentModule: roleModulesLists[0]?.name,
      aggregationRoles,
    });
  }, [roleModules, aggregationRoles]);

  return (
    <FullScreenModal
      width="calc(100vw - 40px)"
      title={title || t('EDIT_PERMISSIONS')}
      titleIcon={<Role size={20} />}
      onOk={() => onOk?.(roleStore.aggregationRoles)}
      onCancel={onCancel}
      visible={visible}
      confirmLoading={confirmLoading}
    >
      <Wrapper>
        <Tabs roleModules={roleModulesLists} module={module} />
        <Permissions module={module} roleTemplatesMap={roleTemplatesMap} templates={templates} />
      </Wrapper>
    </FullScreenModal>
  );
}

export default RoleAuthorization;
