/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import type { RouteObject } from 'react-router-dom';

import platformRoutes from '../pages/platform/routes';
import accessRoutes from '../pages/access/routes';
import clusterRoutes from '../pages/clusters/routes';
import workspaceRoutes from '../pages/workspaces/routes';
import projectRoutes from '../pages/projects/routes';
// import fedProjectsRoutes from '../pages/fedprojects/routes';
// import devopsRoutes from '../pages/devops/routes';
// import whizardTelemetryRoutes from '../pages/whizard-telemetry/routes';

const routes: RouteObject[] = [
  ...platformRoutes,
  ...accessRoutes,
  ...clusterRoutes,
  ...workspaceRoutes,
  ...projectRoutes,
  // ...fedProjectsRoutes,
  // ...devopsRoutes,
  // ...whizardTelemetryRoutes,
];

export default routes;
