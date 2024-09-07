/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import WujieReact from 'wujie-react';
import { useCacheStore as useStore } from '@ks-console/shared';
import { useParams } from 'react-router-dom';

function PodDetail(): JSX.Element {
  const { podName } = useParams<'podName'>();
  const [wujieUrlPrefix] = useStore<string>('wujieUrlPrefix');

  return (
    <WujieReact
      width="100%"
      height="100%"
      name="consolev3"
      url={`${wujieUrlPrefix}/pods/${podName}`}
      sync={false}
    />
  );
}

export default PodDetail;
