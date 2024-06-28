import * as React from 'react';
import { Outlet } from 'react-router-dom';

export default function DevopsLayout() {
  return (
    <>
      <Outlet />
    </>
  );
}
