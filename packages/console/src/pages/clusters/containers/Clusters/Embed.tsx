import React, { useEffect } from 'react';
import WujieReact from 'wujie-react';
import { isMultiCluster } from '@ks-console/shared';
import { useNavigate } from 'react-router-dom';

export default function Embed() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isMultiCluster()) {
      navigate('/clusters/default/overview');
    }
  }, []);

  if (!isMultiCluster()) {
    return null;
  }

  const url = `//${window.location.host}/consolev3/clusters`;
  return <WujieReact width="100%" height="100%" name="consolev3" url={url} sync={false} />;
}
