/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { Cluster, Database, Earth, Human, Monitor, Nodes, Project } from '@kubed/icons';
import { RoleModule } from '@ks-console/shared';

const MODULE = 'clusterroles';
const AUTH_KEY = 'roles';
const ROLE_KEY = 'clusterrole';
const ROLE_MODULES: RoleModule[] = [
  {
    name: 'Cluster Resources Management',
    icon: Nodes,
  },
  {
    name: 'Project Resources Management',
    icon: Project,
  },
  {
    name: 'Network Management',
    icon: Earth,
  },
  {
    name: 'Storage Management',
    icon: Database,
  },
  {
    name: 'Monitoring & Alerting',
    icon: Monitor,
  },
  {
    name: 'Access Control',
    icon: Human,
  },
  {
    name: 'Cluster Settings',
    icon: Cluster,
  },
];
const ROLE_TEMPLATE = {
  apiVersion: 'rbac.authorization.k8s.io/v1',
  kind: 'ClusterRole',
  rules: [],
};

export { MODULE, AUTH_KEY, ROLE_KEY, ROLE_MODULES, ROLE_TEMPLATE };
