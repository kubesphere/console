/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { useCacheStore as useStore } from '@ks-console/shared';
import ReactMarkdown from 'react-markdown';
import { Loading, Tab, Tabs } from '@kubed/components';

import { TextPreview, openpitrixStore } from '@ks-console/shared';

import { StyledCard, TabsWrapper } from './styles';

const { fileStore } = openpitrixStore;

function AppTemplate(): JSX.Element {
  const [appDetail] = useStore<any>('appDetail');
  const [activeTab, setActiveTab] = useState<string>('readme');
  const { data: files = {}, isLoading: filesLoading } = useQuery(
    ['files', appDetail.metadata.name, appDetail.version_id],
    () =>
      fileStore.fetchAppFiles({
        workspace: appDetail?.metadata.labels?.['kubesphere.io/workspace'],
        appName: appDetail.metadata.name,
        versionID: appDetail.version_id,
      }),
    {
      enabled: !!appDetail.metadata.name && !!appDetail.version_id,
    },
  );
  const readme = useMemo(() => {
    return files?.['README.md'] || t('VERSION_INTRO_EMPTY_DESC');
  }, [filesLoading, files?.['README.md']]);

  return (
    <StyledCard sectionTitle={t('APP_TEMPLATE')} contentClassName="content-tab">
      <TabsWrapper>
        <Tabs activeKey={activeTab} onTabChange={setActiveTab}>
          <Tab label={t('APP_DESCRIPTION')} key="readme" />
          <Tab label={t('CHART_FILES')} key="settings" />
        </Tabs>
      </TabsWrapper>
      {activeTab === 'readme' && (
        <>
          {filesLoading ? (
            <Loading className="page-loading" />
          ) : (
            <ReactMarkdown className="content">{readme}</ReactMarkdown>
          )}
        </>
      )}
      {activeTab === 'settings' && (
        <TextPreview files={files} editorOptions={{ hasDownload: false }} />
      )}
    </StyledCard>
  );
}

export default AppTemplate;
