import React from 'react';
import WujieReact from 'wujie-react';

export default function NotificationLanguage() {
  const url = `//${window.location.host}/consolev3/settings/notification-language`;

  return <WujieReact width="100%" height="100%" name="consolev3" url={url} sync={false} />;
}
