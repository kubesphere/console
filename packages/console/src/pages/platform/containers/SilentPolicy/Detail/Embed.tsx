import React from 'react';
import WujieReact from 'wujie-react';
import { useParams } from 'react-router-dom';

export default function SilentPolicyDetail() {
  const { name } = useParams();
  const url = `//${window.location.host}/consolev3/settings/silent-policy/${name}`;

  return <WujieReact width="100%" height="100%" name="consolev3" url={url} sync={false} />;
}
