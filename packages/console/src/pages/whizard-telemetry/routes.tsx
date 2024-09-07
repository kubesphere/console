/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import WhizardTelemetry from './embed';
import Layout from './layout';
const whizardTelemetry = {
  path: '/whizard-telemetry',
  element: <Layout />,
  children: [
    {
      path: '*',
      element: <WhizardTelemetry />,
    },
  ],
};

export default [whizardTelemetry];
