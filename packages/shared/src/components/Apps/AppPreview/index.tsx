import React, { useMemo, useEffect } from 'react';
import { Loading } from '@kubed/components';

import { Markdown } from '@ks-console/shared';
import TextPreview from '../../TextPreview';
import { openpitrixStore } from '../../../stores';

const { fileStore } = openpitrixStore;

type Props = {
  appName: string;
  versionID: string;
  currentTab: string;
  updateTemplate?: (template: string) => void;
  workspace?: string;
};

export function AppPreview({
  appName,
  versionID,
  currentTab,
  updateTemplate,
  workspace,
}: Props): JSX.Element {
  const { data: files, isLoading } = fileStore.useQueryFiles(
    { appName, versionID: versionID, workspace },
    { enabled: !!appName && !!versionID },
  );
  const readme = useMemo(() => files?.['README.md'], [files?.['README.md']]);

  useEffect(() => {
    if (files && updateTemplate) {
      updateTemplate(files?.['all.yaml']);
    }
  }, [files]);

  if (isLoading) {
    return <Loading className="page-loading" />;
  }

  return (
    <>
      {currentTab === 'versionInfo' && (
        <>
          {readme ? (
            <Markdown isSupportGFM themeName="github-light">
              {readme}
            </Markdown>
          ) : (
            <p>{t('VERSION_INTRO_EMPTY_DESC')}</p>
          )}
        </>
      )}
      {currentTab === 'chartFiles' && files && <TextPreview files={files} />}
    </>
  );
}
