import React from 'react';
import WujieReact from 'wujie-react';
import { useCacheStore as useStore } from '@ks-console/shared';

function CronJobs(): JSX.Element {
  const [wujieUrlPrefix] = useStore<string>('wujieUrlPrefix');

  return (
    <WujieReact
      width="100%"
      height="100%"
      name="consolev3"
      url={`${wujieUrlPrefix}/cronjobs`}
      sync={false}
    />
  );
}

export default CronJobs;
