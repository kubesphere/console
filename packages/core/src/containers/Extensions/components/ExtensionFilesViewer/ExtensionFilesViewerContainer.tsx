import React from 'react';

import { useExtensionVersionFilesQuery } from '../../../../stores/extension';
import { ExtensionFilesViewer } from './ExtensionFilesViewer';

interface ExtensionFilesViewerContainerProps {
  extensionName: string;
  version: string;
}

function ExtensionFilesViewerContainer({
  extensionName,
  version,
}: ExtensionFilesViewerContainerProps) {
  const { isLoading, formattedExtensionVersionFiles } = useExtensionVersionFilesQuery({
    extensionName,
    version,
  });

  return (
    <ExtensionFilesViewer
      isLoading={isLoading}
      version={version}
      formattedExtensionVersionFiles={formattedExtensionVersionFiles}
    />
  );
}

export type { ExtensionFilesViewerContainerProps };
export { ExtensionFilesViewerContainer };
