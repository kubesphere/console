/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import styled from 'styled-components';
import { Field, FormItem } from '@kubed/components';
import { Icon, useUrl } from '@ks-console/shared';
import { RuleObject } from 'rc-field-form/lib/interface';
import { isEmpty } from 'lodash';
import { CodeEditor } from '@kubed/code-editor';

const Wrapper = styled.div`
  padding: 8px;
  border-radius: 4px;
  border: solid 1px ${({ theme }) => theme.palette.accents_3};
  background-color: ${({ theme }) => theme.palette.background};

  .form-item-wrapper {
    margin-bottom: 0;
  }
`;

const EditorTitle = styled.div`
  margin: 4px 0 12px;
  display: flex;

  a {
    color: ${({ theme }) => theme.palette.colors.blue[3]};
    font-weight: 600;
  }
`;

interface KubeConfigFormProps {
  formName?: string | string[];
}

const KubeConfigForm = ({ formName = ['kubeconfig'] }: KubeConfigFormProps) => {
  const { getDocsUrl } = useUrl({ module: 'kube_config' });

  // todo callback deprecated
  function configValidator(rule: RuleObject, value: string, callback: (error?: any) => void) {
    if (!value) {
      return callback();
    }

    if (isEmpty(value)) {
      return callback(t('INPUT_KUBECONFIG'));
    }

    callback();
  }

  return (
    <Wrapper>
      <EditorTitle>
        <Field value={t('INPUT_KUBECONFIG')} avatar={<Icon name="kubernetes" size={20} />} />
        <a className="link" href={getDocsUrl()} target="_blank" rel="noreferrer noopener">
          {t('HOW_TO_GET_KUBECONFIG')}
        </a>
      </EditorTitle>
      <FormItem
        name={formName}
        initialValue=""
        rules={[{ required: true, message: t('INPUT_KUBECONFIG') }, { validator: configValidator }]}
      >
        <CodeEditor />
      </FormItem>
    </Wrapper>
  );
};

export default KubeConfigForm;
