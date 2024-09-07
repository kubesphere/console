/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Button, Collapse, Modal } from '@kubed/components';

import { getWebsiteUrl, showOutSiteLink } from '@ks-console/shared';

import { Desc, Header, HeaderFieldItem, Logo, Note, StyledCollapse } from './styles';

type Props = {
  visible?: boolean;
  onUpload?: () => void;
  onCancel?: () => void;
};

function CreateAppTemplateModal({ visible, onUpload, onCancel }: Props): JSX.Element {
  const { url } = getWebsiteUrl();
  // TODO: htmlLinkControl
  const htmlDesc = t('APP_CREATE_GUIDE', { docUrl: url });

  return (
    <Modal
      width={600}
      onCancel={onCancel}
      visible={visible}
      header={null}
      closable={false}
      footer={<Button onClick={onCancel}>{t('CANCEL')}</Button>}
    >
      <Header>
        <Logo src="/assets/application.svg" alt="" />
        <HeaderFieldItem value={t('CREATE_APP')} label={t('CREATE_APP_DESC')} />
      </Header>
      <StyledCollapse accordion defaultActiveKey="helm">
        <Collapse.Panel key="helm" header={t('UPLOAD_HELM_TITLE')}>
          <Desc>{t('HELM_CHART_FORMAT_DESC')}</Desc>
          <Button onClick={onUpload} color="secondary" className="mt12">
            {t('UPLOAD')}
          </Button>
          {showOutSiteLink() && (
            <Note>
              💁‍♂️ <span dangerouslySetInnerHTML={{ __html: htmlDesc }} />
            </Note>
          )}
        </Collapse.Panel>
      </StyledCollapse>
    </Modal>
  );
}

export default CreateAppTemplateModal;
