/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useCallback, useState } from 'react';
import { Modal, Input, Button } from '@kubed/components';
import Icon from '../Icon';
import { Content, ContentBody, Footer } from './styles';

interface StopParams {
  visible?: boolean;
  type?: string;
  /* module type */
  resource?: string;
  /* selected item names */
  title?: string;
  /* custom title */
  desc?: string;
  app?: string;
  isSubmitting?: boolean;
  onCancel: () => void;
  onOk: () => void;
}

const StopModal = (props: StopParams) => {
  const { type: module, desc, resource, app, title, visible, isSubmitting, onCancel, onOk } = props;

  const typeKey = module || '';
  const typeKeyLow = module ? `${module}_LOW` : '';
  const typeKeyPl = module ? `${module}_PL` : '';

  let tip =
    desc ||
    (resource && module
      ? resource.split(', ').length === 1
        ? t('DELETE_RESOURCE_TYPE_DESC_SI', {
            type: t(typeKeyLow),
            resource,
          })
        : t('DELETE_RESOURCE_TYPE_DESC_PL', {
            type: t(typeKeyLow),
            resource,
          })
      : t('STOP_DESC', { resource, type: '' }));

  if (app) {
    tip = t('STOP_APP_RESOURCE_TIP', { type: module, resource, app });
  }

  const [confirm, setConfirm] = useState('');

  const handleInputChange = useCallback(e => {
    setConfirm(e.target.value);
  }, []);

  return (
    <Modal width={504} closable={false} header={null} footer={null} visible={visible}>
      <ContentBody>
        <div className="h5">
          <Icon name="close" variant="light" size={16} />
          {title ||
            (resource && module
              ? resource.split(', ').length === 1
                ? t('STOP_TITLE_SI', { type: t(typeKey) })
                : t('STOP_TITLE_PL', { type: t(typeKeyPl) })
              : t('STOP'))}
        </div>
        <Content>
          <p dangerouslySetInnerHTML={{ __html: tip }}></p>
          {resource && (
            <Input
              name="confirm"
              value={confirm}
              placeholder={resource}
              autoFocus={true}
              onChange={handleInputChange}
            />
          )}
        </Content>
      </ContentBody>
      <Footer>
        <Button onClick={() => onCancel()}>{t('CANCEL')}</Button>
        <Button
          color="error"
          disabled={isSubmitting || (resource ? confirm !== resource : false)}
          onClick={() => onOk()}
        >
          {t('OK')}
        </Button>
      </Footer>
    </Modal>
  );
};

export default StopModal;
