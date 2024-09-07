/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useState } from 'react';
import type { ReactNode, ChangeEvent, MouseEvent } from 'react';
import { Modal } from '@kubed/components';
import type { ModalProps } from '@kubed/components';
import { Close } from '@kubed/icons';

import {
  Body,
  Header,
  Title,
  CloseIconWrapper,
  Content,
  Tip,
  StyledInput,
  Footer,
  StyledButton,
} from './styles';

type OmitProps =
  | 'confirmLoading'
  | 'title'
  | 'description'
  | 'titleIcon'
  | 'closable'
  | 'onOk'
  | 'onCancel'
  | 'header'
  | 'footer'
  | 'okText'
  | 'cancelText'
  | 'okButtonProps'
  | 'cancelButtonProps'
  | 'closeIcon';

type Resource = string | number | string[] | number[];

interface DeleteConfirmModalProps extends Omit<ModalProps, OmitProps> {
  type?: string;
  resource?: Resource;
  deleteCluster?: boolean;
  app?: any;
  title?: ReactNode;
  tip?: string;
  desc?: ReactNode;
  confirmLoading?: boolean;
  onOk: (
    event: MouseEvent<HTMLButtonElement>,
    data: {
      resource: Resource | undefined;
      resourceString: string;
      resourceArray: string[];
    },
  ) => void;
  onCancel: () => void;
}

const SEPARATOR = ', ';

function parseResourceToString(resource: Resource | undefined) {
  if (typeof resource === 'string' || typeof resource === 'number') {
    return resource.toString().trim();
  }

  if (Array.isArray(resource)) {
    return resource.join(SEPARATOR);
  }

  return '';
}

function parseResourceToArray(resource: Resource | undefined) {
  const resourceString = parseResourceToString(resource);
  return resourceString.split(SEPARATOR);
}

export type { DeleteConfirmModalProps };

export function DeleteConfirmModal({
  type,
  resource,
  deleteCluster,
  app,
  title: titleProp,
  tip: tipProp,
  desc,
  confirmLoading,
  onCancel,
  onOk,
  ...rest
}: DeleteConfirmModalProps) {
  const typeKey = type || '';
  const typeKeyLow = type ? `${type}_LOW` : '';
  const typeKeyPl = type ? `${type}_PL` : '';
  const resourceString = parseResourceToString(resource);
  const resourceArray = parseResourceToArray(resource);
  const data = { resource, resourceString, resourceArray };
  const hasResourceAndType = resourceString && type;
  const isSingleResource = resourceArray.length === 1;
  const title = (() => {
    if (titleProp) {
      return titleProp;
    }

    if (hasResourceAndType) {
      if (isSingleResource) {
        return t('DELETE_TITLE_SI', { type: t(typeKey) });
      }

      return t('DELETE_TITLE_PL', { type: t(typeKeyPl) });
    }

    return t('DELETE');
  })();
  const tip = (() => {
    if (tipProp) {
      return tipProp;
    }

    if (deleteCluster) {
      return t('UNBIND_CLUSTER_DESC', { name: resourceString });
    }

    if (app) {
      t('DELETE_APP_RESOURCE_TIP', { type, resource: resourceString, app });
    }

    if (hasResourceAndType) {
      if (isSingleResource) {
        return t('DELETE_RESOURCE_TYPE_DESC_SI', {
          type: t(typeKeyLow),
          resource: resourceString,
        });
      }

      return t('DELETE_RESOURCE_TYPE_DESC_PL', {
        type: t(typeKeyLow),
        resource: resourceString,
      });
    }

    return t('DELETE_DESC', { resource: resourceString, type: '' });
  })();

  const [confirmResource, setConfirmResource] = useState('');
  const handleConfirmResourceChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setConfirmResource(value);
  };

  return (
    <Modal width={504} header={null} footer={null} closable={false} {...rest}>
      <Body>
        <Header>
          <CloseIconWrapper>
            <Close variant="light" size={16} />
          </CloseIconWrapper>
          <Title as="h5">{title}</Title>
        </Header>
        <Content>
          <Tip as="p" dangerouslySetInnerHTML={{ __html: tip }} />
          {resourceString && (
            <StyledInput
              name="confirmResource"
              placeholder={resourceString}
              autoFocus={true}
              value={confirmResource}
              onChange={handleConfirmResourceChange}
            />
          )}
          {desc}
        </Content>
      </Body>
      <Footer>
        <StyledButton onClick={onCancel}>{t('CANCEL')}</StyledButton>
        <StyledButton
          color="error"
          shadow
          loading={confirmLoading}
          disabled={confirmLoading || (resourceString ? resourceString !== confirmResource : false)}
          onClick={(event: MouseEvent<HTMLButtonElement>) => onOk(event, data)}
        >
          {t('OK')}
        </StyledButton>
      </Footer>
    </Modal>
  );
}

DeleteConfirmModal.parseResourceToString = parseResourceToString;

DeleteConfirmModal.parseResourceToArray = parseResourceToArray;

DeleteConfirmModal.isSingleResource = function isSingleResource(resource: Resource) {
  const resourceToArray = parseResourceToArray(resource);
  return resourceToArray.length === 1;
};
