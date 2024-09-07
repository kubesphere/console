/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useState } from 'react';
import { Return } from '@kubed/icons';
import { NavItem, Navs } from '@kubed/components';

import { useCacheStore as useStore } from '../../../../../../hooks';
import { AppBase } from '../../../../AppBase';
import { AppPreview } from '../../../../AppPreview';
import { AppVersionSelector } from '../../../../AppVersionSelector';
import { getAnnotationsDescription, getDisplayName } from '../../../../../../utils';
import type { ApplicationsInstanceDetail } from '../../../../../../types';
import { Back, LeftContent, MainDetail, StyledHeader, RightContent, DeployButton } from './styles';

type Props = {
  detail: ApplicationsInstanceDetail;
  workspace?: string;
  setViewType: (type: string) => void;
  onAppInstall: (key: string, template?: string) => void;
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
  const [updateTemplate, setUpdateTemplate] = useState('');

  const handleClickBack = (): void => {
    setViewType('appList');
  };

  return (
    <>
      <StyledHeader
        title={getDisplayName(detail) || detail.metadata.name}
        description={getAnnotationsDescription(detail)}
        icon={
          <Back onClick={handleClickBack}>
            <Return size={20} />
            <span>{t('BACK')}</span>
          </Back>
        }
      >
        <Navs data={navs} value={tabKey} onChange={setTabKey} />
        <DeployButton
          color="secondary"
          onClick={() => onAppInstall(currentVersion, updateTemplate)}
        >
          {t('INSTALL')}
        </DeployButton>
      </StyledHeader>
      <MainDetail>
        <LeftContent>
          <AppPreview
            workspace={workspace}
            currentTab={tabKey}
            appName={detail.metadata.name ?? ''}
            versionID={currentVersion}
            updateTemplate={setUpdateTemplate}
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
