import React from 'react';
import AlarmCenter from './embed';
import Layout from './layout';
const alarmCenter = {
  path: '/observability/alarm-center',
  element: <Layout />,
  children: [
    {
      path: '*',
      element: <AlarmCenter />,
    },
  ],
};

export default [alarmCenter];
