import * as React from 'react';
import { Navigate, useOutletContext } from 'react-router-dom';

const IndexChild = () => {
  const { indexPath } = useOutletContext<{ indexPath?: string }>();
  if (!indexPath) {
    return null;
  }
  return <Navigate to={indexPath} replace />;
};

export default IndexChild;
