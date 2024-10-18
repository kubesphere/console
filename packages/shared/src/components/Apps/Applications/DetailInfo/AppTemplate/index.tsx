/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import ReactMarkdown from 'react-markdown';
import { Loading, Tab, Tabs, Alert } from '@kubed/components';

import { useCacheStore as useStore } from '../../../../../hooks';
import TextPreview from '../../../../TextPreview';
import { openpitrixStore } from '../../../../../stores';
import { StyledCard, TabsWrapper } from './styles';
import { Markdown } from '../../../../Markdown';

const { fileStore, fetchAppDetail } = openpitrixStore;

function AppTemplate(): JSX.Element {
  const [appDetail] = useStore<any>('appDetail');
  const [activeTab, setActiveTab] = useState<string>('readme');
  const versionID = appDetail.spec.appVersionID;
  const [hasApp, setHasApp] = useState(false);

  useQuery([], () => {
    fetchAppDetail(
      {
        appName: appDetail?.spec.appID,
        workspace: appDetail?.metadata.labels?.['kubesphere.io/workspace'],
      },
      {
        headers: {
          'x-ignore-error-notify': 'true',
        },
      },
    ).catch(err => {
      if (!err.toString().includes('404')) return;
      setHasApp(true);
    });
  });

  const { data: files = {}, isLoading: filesLoading } = useQuery(
    ['files', appDetail.metadata.name, versionID],
    () =>
      fileStore.fetchAppFiles({
        workspace: appDetail?.metadata?.labels['kubesphere.io/workspace'],
        appName: appDetail.metadata.labels['application.kubesphere.io/app-id'],
        versionID,
      }),
    {
      enabled: !!appDetail.metadata.name && !!versionID,
    },
  );
  const readme = useMemo(() => {
    return files?.['README.md'] || t('VERSION_INTRO_EMPTY_DESC');
  }, [filesLoading, files?.['README.md']]);

  return (
    <StyledCard sectionTitle={t('APP_TEMPLATE')} contentClassName="content-tab">
      {hasApp && (
        <Alert showIcon={false} type="warning">
          {t('APP_DELETED_TIP')}
        </Alert>
      )}
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
            <Markdown isSupportGFM themeName="github-light">{readme}</Markdown>
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
