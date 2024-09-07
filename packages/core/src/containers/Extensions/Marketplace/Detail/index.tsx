/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { EXTENSIONS_PAGE_PATHS } from '../../../../constants/extension';
import { useMarketplaceConfigQuery } from '../../../../stores/marketplace';
import { useExtensionQuery, useExtensionVersionQuery } from '../../../../stores/extension';
import { getExtensionBasicInfo } from '../../utils/extension';
import { ExtensionDetail } from '../../components/ExtensionDetail';
import { ExtensionFilesViewerButton } from '../../components/ExtensionFilesViewerButton';
import { ActionButtons } from '../components/ActionButtons';

export default function ExtensionsMarketplaceDetail() {
  const navigate = useNavigate();
  const { name: extensionName = '', version: pathVersion } = useParams();

  const { isLoading: isMarketplaceConfigQueryLoading, formattedMarketplaceConfig } =
    useMarketplaceConfigQuery({ isIgnoreErrorNotify: true });

  const { isLoading: isExtensionQueryLoading, formattedExtension } = useExtensionQuery({
    extensionName,
  });
  const displayVersion = formattedExtension?.displayVersion ?? '';

  const currentVersion = pathVersion ?? displayVersion;
  const { isLoading: isExtensionDisplayVersionQueryLoading, formattedExtensionVersion } =
    useExtensionVersionQuery({
      extensionName,
      version: currentVersion,
      enabled: !!currentVersion,
    });

  const basicInfo = getExtensionBasicInfo(formattedExtensionVersion);

  const actionButtons = formattedExtension ? (
    <>
      <ActionButtons
        page="detail"
        formattedExtension={formattedExtension}
        formattedMarketplaceConfig={formattedMarketplaceConfig}
      />
      <ExtensionFilesViewerButton
        extensionName={extensionName}
        version={currentVersion}
        style={{ display: 'block', marginTop: 12 }}
      />
    </>
  ) : null;

  return (
    <ExtensionDetail
      isLoading={
        isExtensionQueryLoading ||
        isExtensionDisplayVersionQueryLoading ||
        isMarketplaceConfigQueryLoading
      }
      formattedExtension={formattedExtension}
      formattedExtensionVersion={formattedExtensionVersion}
      basicInfo={basicInfo}
      actionButtons={actionButtons}
      isShowInstalledClusters={false}
      onVersionChange={(selectedVersion: string) =>
        navigate(
          EXTENSIONS_PAGE_PATHS.marketplace.getDetail(extensionName, { version: selectedVersion }),
          { replace: true },
        )
      }
      onBackButtonClick={() => navigate(EXTENSIONS_PAGE_PATHS.marketplace.index)}
    />
  );
}
