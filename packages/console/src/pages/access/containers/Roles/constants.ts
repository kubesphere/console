import { Cluster, Cogwheel, Key, Openpitrix } from '@kubed/icons';
import type { RoleModule } from '@ks-console/shared';

const MODULE = 'globalroles';
const AUTH_KEY = 'roles';
const ROLE_KEY = 'globalrole';
const ROLE_MODULES: RoleModule[] = [
  {
    name: 'Clusters Management',
    icon: Cluster,
  },
  {
    name: 'Access Control',
    icon: Key,
  },
  {
    name: 'Apps Management',
    icon: Openpitrix,
    hide: globals.config.globalNavs.children?.find(({ name }: any) => name === 'apps-manage'),
  },
  {
    name: 'Platform Settings',
    icon: Cogwheel,
  },
];

const ROLE_TEMPLATE = {
  apiVersion: 'iam.kubesphere.io/v1beta1',
  kind: 'GlobalRole',
  rules: [],
};

export { MODULE, AUTH_KEY, ROLE_KEY, ROLE_MODULES, ROLE_TEMPLATE };
