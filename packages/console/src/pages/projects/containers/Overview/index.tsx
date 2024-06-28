import React from 'react';
import { useParams } from 'react-router-dom';
import WujieReact from 'wujie-react';

function Overview(): JSX.Element {
  const { cluster, namespace, workspace } = useParams<'workspace' | 'namespace' | 'cluster'>();
  const url = `//${window.location.host}/consolev3/${workspace}/clusters/${cluster}/projects/${namespace}/overview`;
  return <WujieReact width="100%" height="100%" name="consolev3" url={url} sync={false} />;
}

export default Overview;
