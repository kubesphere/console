import React from 'react';
import WujieReact from 'wujie-react';

export default function BaseInfo() {
  const url = `//${window.location.host}/consolev3/settings/notification-history`;

  return <WujieReact width="100%" height="100%" name="consolev3" url={url} sync={false} />;
}
