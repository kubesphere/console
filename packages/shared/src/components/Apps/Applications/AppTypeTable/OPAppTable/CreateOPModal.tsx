/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import cx from 'classnames';
import { Button, Modal } from '@kubed/components';
import { useNavigate, useParams } from 'react-router-dom';

import Icon from '../../../../Icon';

import { FieldItem, Header, HeaderFieldItem, ItemsWrapper, Logo } from './styles';

type Props = {
  visible: boolean;
  onCancel: () => void;
  showTemplate?: boolean;
  openTemplateOPAppCreateModal: () => void;
};

function CreateOPAppModal({
  visible,
  showTemplate,
  onCancel,
  openTemplateOPAppCreateModal,
}: Props): JSX.Element {
  const navigate = useNavigate();
  const { workspace, namespace, cluster } = useParams();

  const handleAppTemplate = () => {
    onCancel();
    navigate(`/apps?workspace=${workspace}&cluster=${cluster}&namespace=${namespace}`);
  };

  return (
    <Modal
      width={744}
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
      <ItemsWrapper>
        <div className={cx('item')} onClick={handleAppTemplate}>
          <FieldItem
            value={t('FROM_APP_STORE')}
            label={t('FROM_APP_STORE_DESC')}
            avatar={<Icon name="templet" size={40} />}
          />
        </div>
        {!!showTemplate && (
          <div className={cx('item')} onClick={openTemplateOPAppCreateModal}>
            <FieldItem
              value={t('FROM_APP_TEMPLATE')}
              label={t('FROM_APP_TEMPLATE_DESC')}
              avatar={<Icon name="catalog" size={40} />}
            />
          </div>
        )}
      </ItemsWrapper>
    </Modal>
  );
}

export default CreateOPAppModal;
