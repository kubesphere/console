/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';

import { KubectlModal, ContainerTerminalModal, pages } from '@ks-console/shared';

const { closePage } = pages;

export default function TerminalApp() {
  const pathSplit = window.location.pathname.split('/');
  const isKubectl = pathSplit[2] === 'kubectl';
  const isNode = pathSplit[2] === 'nodename';
  const cluster = pathSplit[3];
  const params = {
    cluster,
    namespace: pathSplit[5],
    podName: pathSplit[7],
    containerName: pathSplit[9],
  };

  if (isKubectl) {
    return <KubectlModal visible title="kubectl" params={{ cluster }} onCancel={closePage} />;
  }

  if (isNode) {
    return (
      <KubectlModal visible title={cluster} params={{ nodename: cluster }} onCancel={closePage} />
    );
  }

  return <ContainerTerminalModal visible title="terminal" params={params} onCancel={closePage} />;
}
