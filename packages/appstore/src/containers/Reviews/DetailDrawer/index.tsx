/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { ReactNode, useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { SafeNotice } from '@kubed/icons';
import { Drawer, NavItem, Navs } from '@kubed/components';

import {
  Icon,
  TextPreview,
  PackageUpload,
  getPackageName,
  openpitrixStore,
  LabelText,
  getAnnotationsDescription,
} from '@ks-console/shared';

import InfoDetail from './InfoDetail';

import { CloseModal, Header, Content, Footer, StyledButton } from './styles';

const { fileStore, useAppDetail, useVersionDetail } = openpitrixStore;

type Props = {
  visible: boolean;
  detail: any;
  onOk: (action: string) => void;
  onCancel: () => void;
  onReject: (action: string) => void;
  showFooter?: boolean;
};

function DetailDrawer({
  visible,
  detail,
  onOk,
  onCancel,
  // onReject,
  showFooter,
}: Props): JSX.Element {
  const [tabKey, setTabKey] = useState<string>('appInfo');
  const appName = detail.metadata.labels['app.kubesphere.io/app-id'];
  const workspace = detail.metadata.labels['host-workspace'];
  const { data: appDetail } = useAppDetail({
    appName,
  });
  const { data: versionDetail } = useVersionDetail({
    appName: appName,
    versionID: detail.metadata.name,
  });
  const { data: files = {} } = fileStore.useQueryFiles(
    { appName, versionID: detail.metadata.name, workspace },
    { enabled: !!appName && !!detail.metadata.name },
  );
  const readme = useMemo(() => {
    return files['README.md'];
  }, [files]);
  const navs: NavItem[] = [
    {
      label: t('APP_INFORMATION'),
      value: 'appInfo',
    },
    {
      label: t('DOCUMENTATION'),
      value: 'readme',
    },
    {
      label: t('CHART_FILES'),
      value: 'configFiles',
    },
    {
      label: t('UPDATE_LOG'),
      value: 'updateLog',
    },
  ];
  const navContentMap: Record<string, ReactNode> = {
    appInfo: <InfoDetail detail={appDetail} versionName={versionDetail?.metadata.name} />,
    readme: readme ? (
      <ReactMarkdown>{readme}</ReactMarkdown>
    ) : (
      <p>{t('VERSION_INTRO_EMPTY_DESC')}</p>
    ),
    configFiles: (
      <>
        <PackageUpload
          hasPackage
          className="mb12"
          canEdit={false}
          fileStore={fileStore}
          appName={detail?.metadata.name}
          versionID={detail?.versionID}
          type={'MODIFY_VERSION'}
          packageName={getPackageName(versionDetail)}
          updateTime={detail?.update_time || detail?.status_time}
        />
        <TextPreview files={files} />
      </>
    ),
    updateLog: (
      <>
        <LabelText>{t('UPDATE_LOG')}</LabelText>
        <pre>{getAnnotationsDescription(versionDetail) || t('NO_UPDATE_LOG_DESC')}</pre>
      </>
    ),
  };

  return (
    <Drawer maskClosable width={1070} placement="right" visible={visible} onClose={onCancel}>
      <CloseModal color="dark" shadow onClick={onCancel}>
        <Icon name="close" size={24} color="white" />
      </CloseModal>
      <Header icon={<SafeNotice />} title={t('APP_DETAILS')} description={t('APP_DETAILS_DESC')}>
        <Navs data={navs} value={tabKey} onChange={setTabKey} />
      </Header>
      <Content>{tabKey && navContentMap[tabKey]}</Content>
      {showFooter && (
        <Footer>
          <StyledButton className="mr12" color="error" onClick={() => onOk('rejected')}>
            {t('REJECT')}
          </StyledButton>
          <StyledButton color="secondary" onClick={() => onOk('passed')}>
            {t('APPROVE')}
          </StyledButton>
        </Footer>
      )}
    </Drawer>
  );
}

export default DetailDrawer;
