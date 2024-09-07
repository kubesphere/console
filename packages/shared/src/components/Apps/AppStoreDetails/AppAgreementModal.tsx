/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { ChangeEvent } from 'react';
import { Checkbox } from '@kubed/components';

import { AgreeMentWrapper, NoHeaderModal } from './styles';

type Props = {
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
};
function AppAgreementModal({ visible, onOk, onCancel }: Props): JSX.Element {
  function handleChangeCheck({ target: { checked } }: ChangeEvent<HTMLInputElement>): void {
    localStorage.setItem(`${globals.user.username}-app-agreement`, checked.toString());
  }

  return (
    <NoHeaderModal
      width={600}
      visible={visible}
      hideHeader
      onOk={onOk}
      okText={t('AGREE')}
      onCancel={onCancel}
    >
      <AgreeMentWrapper>
        <img src="/assets/app-safety.svg" alt="" />
        <div className="content">
          <div className="title"> {t('APP_DEPLOY_AGREEMENT')}</div>
          <ul>
            <li>{t('APP_DEPLOY_AGREEMENT_DESC_1')}</li>
            <li>{t('APP_DEPLOY_AGREEMENT_DESC_2')}</li>
          </ul>
          <Checkbox onChange={handleChangeCheck} label={t('DO_NOT_REMIND_AGAIN')} />
        </div>
      </AgreeMentWrapper>
    </NoHeaderModal>
  );
}

export default AppAgreementModal;
