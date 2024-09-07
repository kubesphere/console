/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { Appcenter, Cogwheel, Key, Project, StrategyGroup } from '@kubed/icons';
import { hasKSModule, RoleModule } from '@ks-console/shared';

const MODULE = 'workspaceroles';
const AUTH_KEY = 'roles';
const ROLE_KEY = 'workspacerole';
const ROLE_MODULES: RoleModule[] = [
  {
    name: 'Projects Management',
    icon: Project,
  },
  {
    name: 'DevOps Management',
    icon: StrategyGroup,
    hide: !hasKSModule('devops'),
  },
  {
    name: 'Apps Management',
    icon: Appcenter,
    hide: !hasKSModule('openpitrix'),
  },
  {
    name: 'Access Control',
    icon: Key,
  },
  {
    name: 'Workspace Settings',
    icon: Cogwheel,
  },
];
const ROLE_TEMPLATE = {
  apiVersion: 'iam.kubesphere.io/v1beta1',
  kind: 'WorkspaceRole',
  rules: [],
};

export { MODULE, AUTH_KEY, ROLE_KEY, ROLE_MODULES, ROLE_TEMPLATE };
