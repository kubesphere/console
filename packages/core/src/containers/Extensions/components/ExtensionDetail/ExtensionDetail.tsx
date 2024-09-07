/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import type { ReactNode } from 'react';
import { Loading } from '@kubed/components';

import type { FormattedExtension, FormattedExtensionVersion } from '../../../../stores/extension';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Detail } from './Detail';
import { Page, Wrapper, Container } from './ExtensionDetail.styles';

interface BasicInfo {
  label: ReactNode;
  value: ReactNode;
}

interface ExtensionDetailProps {
  isLoading: boolean;
  formattedExtension: FormattedExtension | undefined;
  formattedExtensionVersion: FormattedExtensionVersion | undefined;
  basicInfo: BasicInfo[];
  actionButtons?: ReactNode;
  isShowInstalledClusters: boolean;
  onBackButtonClick: () => void;
  onVersionChange?: (version: string) => void;
}

function ExtensionDetail({
  isLoading,
  formattedExtension,
  formattedExtensionVersion,
  basicInfo,
  actionButtons,
  isShowInstalledClusters,
  onBackButtonClick,
  onVersionChange,
}: ExtensionDetailProps) {
  if (isLoading) {
    return <Loading className="page-loading" />;
  }

  return (
    <Page>
      <Wrapper>
        <Header onBackButtonClick={onBackButtonClick} />
        <Container>
          <Sidebar
            formattedExtension={formattedExtension}
            formattedExtensionVersion={formattedExtensionVersion}
            basicInfo={basicInfo}
            actionButtons={actionButtons}
            onVersionChange={onVersionChange}
          />
          <Detail
            formattedExtensionVersion={formattedExtensionVersion}
            isShowInstalledClusters={isShowInstalledClusters}
          />
        </Container>
      </Wrapper>
    </Page>
  );
}

export type { ExtensionDetailProps };
export { ExtensionDetail };
