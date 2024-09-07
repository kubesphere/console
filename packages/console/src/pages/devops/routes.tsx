/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import Devops from './embed';
import DevopsLayout from './layout';

const devops = {
  path: '/:workspace/clusters/:cluster/devops/:devops',
  element: <DevopsLayout />,
  children: [
    {
      index: true,
      element: <Devops />,
    },
    {
      path: '*',
      element: <Devops />,
    },
  ],
};

export default [devops];
