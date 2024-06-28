import { clusterStore, isMultiCluster } from '@ks-console/shared';
import { Loading } from '@kubed/components';
import { set } from 'lodash';
import * as React from 'react';
import { Outlet, useParams } from 'react-router-dom';

export default function DevopsLayout() {
  const { cluster } = useParams();
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    clusterStore.fetchDetail({ name: cluster }).then(data => {
      setLoading(false);
      set(globals, 'app.isMultiCluster', isMultiCluster());
    });
  }, []);
  if (loading) {
    return <Loading className="page-loading" />;
  }
  return (
    <>
      <Outlet />
    </>
  );
}
