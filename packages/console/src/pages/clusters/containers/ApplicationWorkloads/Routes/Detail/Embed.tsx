import React from 'react';
import WujieReact from 'wujie-react';
import { useParams } from 'react-router-dom';

export default function Embed() {
  const params: Record<string, any> = useParams();
  const { cluster, namespace, name } = params;

  // eslint-disable-next-line max-len
  const url = `//${window.location.host}/consolev3/clusters/${cluster}/projects/${namespace}/ingresses/${name}`;
  return <WujieReact width="100%" height="100%" name="consolev3" url={url} sync={false} />;
}
