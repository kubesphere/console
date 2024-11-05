/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useState } from 'react';
import type { ReactNode, ChangeEvent } from 'react';
import { Close } from '@kubed/icons';

import mapper from './mapper';

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

type Resource = any[];

interface DeleteConfirmContentProps {
  type?: string;
  resource?: Resource;
  deleteCluster?: boolean;
  app?: any;
  title?: ReactNode;
  tip?: string;
  desc?: ReactNode;
  child?: ReactNode;
  onOk?: (data: any[] | undefined) => void;
  onCancel?: () => void;
}

const SEPARATOR = ', ';

export function parseResourceToString(resource: Resource | undefined) {
  if (Array.isArray(resource)) {
    return resource.join(SEPARATOR);
  }

  return '';
}

export function parseResourceToArray(resource: Resource | undefined) {
  const resourceString = parseResourceToString(resource);
  return resourceString.split(SEPARATOR);
}

export function isSingleResource(resource: Resource) {
  const resourceToArray = parseResourceToArray(resource);
  return resourceToArray.length === 1;
}

export type { DeleteConfirmContentProps };

export function DeleteConfirmContent({
  type,
  resource: resource,
  deleteCluster,
  app,
  title: titleProp,
  tip: tipProp,
  desc,
  onCancel = () => {},
  onOk = () => {},
  child,
}: // ...rest
DeleteConfirmContentProps) {
  // @ts-ignore
  const typeKey = type && mapper[type] ? mapper[type] : type;
  const typeKeyLow = type ? `${typeKey}_LOW` : '';
  const typeKeyPl = type ? `${typeKey}_PL` : '';

  const resourceNames = resource?.map((item: any) => item.delDisplayName ?? item.name);
  const resourceString = parseResourceToString(resourceNames);
  const resourceArray = parseResourceToArray(resourceNames);
  // const data = { resource, resourceString, resourceArray };
  const hasResourceAndType = resourceString && type;
  const isSingle = resourceArray.length === 1;

  const title = (() => {
    if (titleProp) {
      return titleProp;
    }

    if (hasResourceAndType) {
      if (isSingle) {
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
      if (isSingle) {
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

  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = async () => {
    setConfirmLoading(true);
    await onOk(resource);
    setConfirmLoading(false);
    onCancel();
  };

  return (
    <>
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
          {child ?? child}
        </Content>
      </Body>
      <Footer>
        <StyledButton onClick={onCancel}>{t('CANCEL')}</StyledButton>
        <StyledButton
          color="error"
          shadow
          loading={confirmLoading}
          disabled={confirmLoading || (resourceString ? resourceString !== confirmResource : false)}
          onClick={handleOk}
        >
          {t('OK')}
        </StyledButton>
      </Footer>
    </>
  );
}

DeleteConfirmContent.parseResourceToString = parseResourceToString;

DeleteConfirmContent.parseResourceToArray = parseResourceToArray;

DeleteConfirmContent.isSingleResource = isSingleResource;
