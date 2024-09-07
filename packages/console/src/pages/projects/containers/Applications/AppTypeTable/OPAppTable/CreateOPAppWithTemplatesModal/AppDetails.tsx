/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useState } from 'react';
import { Return } from '@kubed/icons';
import { useCacheStore as useStore } from '@ks-console/shared';
import { NavItem, Navs } from '@kubed/components';

import {
  AppBase,
  AppPreview,
  AppVersionSelector,
  getAnnotationsDescription,
} from '@ks-console/shared';
import type { ApplicationsInstanceDetail } from '@ks-console/shared';
import { Back, LeftContent, MainDetail, StyledHeader, RightContent, DeployButton } from './styles';

type Props = {
  detail: ApplicationsInstanceDetail;
  workspace?: string;
  setViewType: (type: string) => void;
  onAppInstall: () => void;
};

function AppDetail({ detail, workspace, setViewType, onAppInstall }: Props): JSX.Element {
  const navs: NavItem[] = [
    {
      label: t('APP_INFORMATION'),
      value: 'versionInfo',
    },
    {
      label: t('CHART_FILES'),
      value: 'chartFiles',
    },
  ];
  const [tabKey, setTabKey] = useState<string>('versionInfo');
  const [currentVersion, setCurrentVersion] = useStore<string>('');

  const handleClickBack = (): void => {
    setViewType('appList');
  };

  return (
    <>
      <StyledHeader
        title={detail.metadata.name}
        description={getAnnotationsDescription(detail)}
        icon={
          <Back onClick={handleClickBack}>
            <Return size={20} />
            <span>{t('BACK')}</span>
          </Back>
        }
      >
        <Navs data={navs} value={tabKey} onChange={setTabKey} />
        <DeployButton color="secondary" onClick={onAppInstall}>
          {t('INSTALL')}
        </DeployButton>
      </StyledHeader>
      <MainDetail>
        <LeftContent>
          <AppPreview
            currentTab={tabKey}
            appName={detail.metadata.name ?? ''}
            versionID={currentVersion}
          />
        </LeftContent>
        <RightContent>
          <AppVersionSelector
            workspace={workspace}
            appDetail={detail}
            selectedVersionChange={setCurrentVersion}
          />
          <AppBase className="mt12" app={detail} />
        </RightContent>
      </MainDetail>
    </>
  );
}

export default AppDetail;
