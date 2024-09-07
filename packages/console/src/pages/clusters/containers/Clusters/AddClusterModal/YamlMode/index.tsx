/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { CodeEditor } from '@kubed/code-editor';
import { Field } from '@kubed/components';
import { Coding } from '@kubed/icons';
import styled from 'styled-components';
import { useCacheStore as useStore } from '@ks-console/shared';
import { yaml } from '@ks-console/shared';

const YamlWrapper = styled.div`
  width: 900px;
  margin: 0 auto;
  overflow: hidden;

  .field-title {
    margin-top: 100px;
    margin-bottom: 20px;
    .field-value {
      font-size: 18px;
    }
  }
`;

const EditorWrapper = styled.div`
  padding: 12px;
  background-color: #f9fbfd;
  border-radius: 4px;
`;

const EditorInner = styled.div`
  padding: 12px;
  padding-bottom: 32px;
  border-radius: 4px;
  border: 1px solid #ccd3db;
  background-color: #fff;
  height: calc(100vh - 280px);

  .ace_editor {
    min-height: auto;
  }
`;

const EditorTitle = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
  margin-bottom: 12px;

  .kubed-icon {
    margin-right: 8px;
  }
`;

const YamlMode = () => {
  const [formValue, setFormValue] = useStore('cluster:clusterForm');

  const handleChange = (val: string) => {
    setFormValue(yaml.load(val));
  };

  return (
    <YamlWrapper>
      <Field value={t('EDIT_YAML')} label={t('CREATE_BY_YAML_DESC')} className="field-title" />
      <EditorWrapper>
        <EditorInner>
          <EditorTitle>
            <Coding size={20} />
            {t('EDIT_YAML')}
          </EditorTitle>
          <CodeEditor
            height="100%"
            style={{ height: 'calc(100% - 12px)' }}
            onChange={handleChange}
            value={yaml.getValue(formValue)}
          />
        </EditorInner>
      </EditorWrapper>
    </YamlWrapper>
  );
};

export default YamlMode;
