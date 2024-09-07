/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useEffect, useState } from 'react';
import { first } from 'lodash';
import { useCacheStore as useStore } from '../../../index';
import { useNavigate, useParams } from 'react-router-dom';
import { Col, Loading, Navs, Tab } from '@kubed/components';
import { AppBase } from '../AppBase';
import { AppInfo } from '../AppInformation';
import { AppPreview } from '../AppPreview';
import { AppVersionSelector } from '../AppVersionSelector';
import AppsDeploySpaceModal from '../AppsDeploySpaceModal';
import { isRadonDB } from '../../../utils';
import { openpitrixStore } from '../../../stores';
import type { AppDetail } from '../../../types';

import { AppInfoWrapper, DeployButton, StyledRow, StyledTabs, TabsWrapper } from './styles';

const { useAppVersionList, fetchAppDetail, fetchDMPDetail } = openpitrixStore;

export function AppStoreDetails(): JSX.Element {
  const routeParams = useParams();
  const { appName } = routeParams;
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const [currentVersion, setCurrentVersion] = useState<string>('');
  const [, setCurrentStep] = useStore<number>('currentStep');
  const [appListIsLoading] = useStore<boolean>('appListIsLoading');
  const [appDetail, setAppDetail] = useStore<AppDetail>('appDetail');
  const [activeKey, setActiveKey] = useState<string>('appInfo');
  const [currentTab, setCurrentTab] = useState<string>('versionInfo');
  const { data: versionDetail } = useAppVersionList(
    { appName },
    { status: 'active' },
    { autoFetch: !!appName },
  );
  function handleLink(): void {
    const link = `${location.pathname}/deploy${location.search}`;

    if (globals.user) {
      return navigate(link);
    }

    location.href = `/login?referer=${link}`;
  }

  function handleDeploy(): void {
    // if (
    //   appDetail?.metadata?.labels['kubesphere.io/workspace'] !== 'system-workspace' ||
    //   localStorage.getItem(`${globals.user.username}-app-agreement`) === 'true'
    // ) {
    //   return handleLink();
    // }
    if (['helm', 'edge', 'yaml'].includes(appDetail.spec.appType)) {
      setVisible(true);
      return;
    }
  }

  useEffect(() => {
    setCurrentStep(-1);

    if (!appName) return;

    (isRadonDB(appName) ? fetchDMPDetail : fetchAppDetail)({ appName, app_id: appName }).then(
      setAppDetail,
    );
  }, []);

  if (appListIsLoading) {
    return <Loading className="page-loading" />;
  }

  return (
    <>
      <TabsWrapper>
        <div style={{ position: 'relative' }}>
          <DeployButton onClick={handleDeploy} color="dark">
            {t('DEPLOYMENT')}
          </DeployButton>
          <StyledTabs activeKey={activeKey} variant="outline" size="lg" onTabChange={setActiveKey}>
            <Tab label={t('APP_INFORMATION')} key="appInfo" />
            {!isRadonDB(appDetail?.metadata.name) && (
              <Tab label={t('APP_DETAILS')} key="appDetails" />
            )}
          </StyledTabs>
        </div>
      </TabsWrapper>
      <AppInfoWrapper>
        {activeKey === 'appInfo' && (
          <StyledRow>
            <Col span={8}>
              <AppInfo appDetail={appDetail} versionDetail={versionDetail || []} />
            </Col>
            <Col span={4}>
              <AppBase app={appDetail} />
            </Col>
          </StyledRow>
        )}
        {activeKey === 'appDetails' && (
          <StyledRow>
            <Col span={8}>
              <Navs
                style={{ marginBottom: '20px' }}
                data={[
                  { label: t('APP_INTRODUCTION'), value: 'versionInfo' },
                  { label: t('CHART_FILES'), value: 'chartFiles' },
                ]}
                value={currentTab}
                onChange={setCurrentTab}
              />
              {appListIsLoading ? (
                <Loading className="page-loading" />
              ) : (
                <AppPreview
                  appName={appName ?? ''}
                  currentTab={currentTab}
                  versionID={currentVersion}
                />
              )}
            </Col>
            <Col span={4}>
              <AppVersionSelector
                showKeywords
                appDetail={appDetail}
                selectedVersionChange={setCurrentVersion}
              />
            </Col>
          </StyledRow>
        )}
      </AppInfoWrapper>
      <AppsDeploySpaceModal
        {...routeParams}
        onCancel={() => setVisible(false)}
        success={() => {}}
        visible={visible}
        appName={appName as string}
        detail={first(versionDetail)}
      />
    </>
  );
}

export default AppStoreDetails;
