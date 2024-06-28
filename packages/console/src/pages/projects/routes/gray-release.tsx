import React from 'react';
import { Navigate } from 'react-router-dom';

import GrayRelease from '../containers/GrayRelease';

const PATH = '/:workspace/clusters/:cluster/projects/:namespace/grayrelease';

export default [
  {
    path: PATH,
    element: <Navigate to={`../grayrelease/cates`} replace />,
  },
  {
    path: `${PATH}/cates`,
    element: <GrayRelease />,
    exact: true,
  },
  {
    path: `${PATH}/jobs`,
    element: <GrayRelease />,
    exact: true,
  },
];
