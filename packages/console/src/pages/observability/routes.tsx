import React from 'react';
import Observability from './embed';
import Layout from './layout';
const observability = {
  path: '/observability',
  element: <Layout />,
  children: [
    {
      index: true,
      element: <Observability />,
    },
    {
      path: '*',
      element: <Observability />,
    },
  ],
};

export default [observability];
