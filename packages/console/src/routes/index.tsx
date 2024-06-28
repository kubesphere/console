import type { RouteObject } from 'react-router-dom';

import platformRoutes from '../pages/platform/routes';
import accessRoutes from '../pages/access/routes';
import clusterRoutes from '../pages/clusters/routes';
import workspaceRoutes from '../pages/workspaces/routes';
import projectRoutes from '../pages/projects/routes';
import fedProjectsRoutes from '../pages/fedprojects/routes';
import devopsRoutes from '../pages/devops/routes';
import alarmCenterRoutes from '../pages/alarm-center/routes';
import observabilityRoutes from '../pages/observability/routes';

const routes: RouteObject[] = [
  ...platformRoutes,
  ...accessRoutes,
  ...clusterRoutes,
  ...workspaceRoutes,
  ...projectRoutes,
  ...fedProjectsRoutes,
  ...devopsRoutes,
  ...alarmCenterRoutes,
  ...observabilityRoutes,
];

export default routes;
