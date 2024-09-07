/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { ReactNode } from 'react';
import { Card } from '@kubed/components';

import { useDetailPage } from '@ks-console/shared';
import type { FormattedConfigMap } from '@ks-console/shared';

import { Wrapper, CardTitle } from './styles';

function ConfigMapData() {
  const { detail } = useDetailPage<FormattedConfigMap>();
  return (
    <Card hoverable padding={20}>
      <CardTitle>{t('DATA')}</CardTitle>
      {(!!detail?.data || !!detail?.binaryData) && (
        <Wrapper>
          <ul>
            {Object.entries(detail.data ?? {}).map(([key, value]) => (
              <li key={key}>
                <h6>{key}</h6>
                <pre>{value as ReactNode}</pre>
              </li>
            ))}
            {Object.entries(detail.binaryData ?? {}).map(([key, value]) => (
              <li key={key}>
                <h6>
                  <a href={`data:text/plain;base64,${value}`} download={key} target="_blank">
                    {key}
                  </a>
                </h6>
              </li>
            ))}
          </ul>
        </Wrapper>
      )}
    </Card>
  );
}

export default ConfigMapData;
