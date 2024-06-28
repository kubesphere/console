import React from 'react';
import WujieReact from 'wujie-react';
import { useCacheStore as useStore } from '@ks-console/shared';
import { useParams } from 'react-router-dom';

function ConfigMapDetail(): JSX.Element {
  const { name } = useParams<'name'>();
  const [wujieUrlPrefix] = useStore<string>('wujieUrlPrefix');

  return (
    <WujieReact
      width="100%"
      height="100%"
      name="consolev3"
      url={`${wujieUrlPrefix}/configmaps/${name}`}
      sync={false}
    />
  );
}

export default ConfigMapDetail;
