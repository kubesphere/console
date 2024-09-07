/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';

import type { ExtensionDetailProps } from './ExtensionDetail';
import { Tabs } from './Tabs';
import { Wrapper, Name, Description, TabsWrapper } from './Detail.styles';

type DetailProps = Pick<
  ExtensionDetailProps,
  'formattedExtensionVersion' | 'isShowInstalledClusters'
>;

function Detail({ formattedExtensionVersion, isShowInstalledClusters }: DetailProps) {
  const { localeDisplayName, localeDescription } = formattedExtensionVersion ?? {};

  return (
    <Wrapper>
      <Name>{localeDisplayName}</Name>
      {localeDescription && <Description>{localeDescription}</Description>}
      <TabsWrapper>
        <Tabs
          formattedExtensionVersion={formattedExtensionVersion}
          isShowInstalledClusters={isShowInstalledClusters}
        />
      </TabsWrapper>
    </Wrapper>
  );
}

export { Detail };
