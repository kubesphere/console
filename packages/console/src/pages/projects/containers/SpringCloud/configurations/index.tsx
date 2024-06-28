import React from 'react';
import WujieReact from 'wujie-react';
import { useCacheStore as useStore } from '@ks-console/shared';

function Volumes(): JSX.Element {
  const [wujieUrlPrefix] = useStore<string>('wujieUrlPrefix');

  return (
    <WujieReact
      width="100%"
      height="100%"
      name="consolev3"
      url={`${wujieUrlPrefix}/configurations`}
      sync={false}
    />
  );
}

export default Volumes;
