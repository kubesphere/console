import React, { useState } from 'react';

import { Coding } from '@kubed/icons';
import { ActionConfirm } from '@kubed/components';
import { CodeEditor } from '@kubed/code-editor';

import {
  Root,
  Header,
  BackButton,
  Title,
  Content,
  SubHeader,
  SubTitle,
  ActionConfirmWrapper,
} from './ClusterConfigEditor.styles';

interface ClusterConfigEditorProps {
  value: string;
  onConfirm: (value: string) => void;
  onClose: () => void;
}

export function ClusterConfigEditor({ value, onConfirm, onClose }: ClusterConfigEditorProps) {
  const [valueState, setValueState] = useState(value);

  const height =
    document.querySelector('#extension-install-steps .steps-content')?.clientHeight ?? 0;

  return (
    <Root $height={height > 40 ? height - 40 : height}>
      <Header>
        <BackButton onClick={onClose} />
        <Title>{t('EDIT_CLUSTER_CONFIGURATION')}</Title>
      </Header>
      <Content>
        <SubHeader>
          <Coding size={20} />
          <SubTitle as="h6">{t('CLUSTER_CONFIGURATION')}</SubTitle>
        </SubHeader>
        <CodeEditor
          mode="yaml"
          acceptFileTypes={['.yaml', '.yml']}
          fileName="config.yaml"
          value={valueState}
          onChange={setValueState}
        />
      </Content>
      <ActionConfirmWrapper>
        <ActionConfirm visible onCancel={onClose} onOk={() => onConfirm(valueState)} />
      </ActionConfirmWrapper>
    </Root>
  );
}
