/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Loading } from '@kubed/components';
import { CodeEditor } from '@kubed/code-editor';

import { LoadingWrapper } from './ExtensionConfig.styles';

interface ExtensionConfigProps {
  value: string;
  isLoading?: boolean;
  readOnly?: boolean;
  onChange?: (value: string) => void;
}

function ExtensionConfig({ value, isLoading, readOnly, onChange }: ExtensionConfigProps) {
  if (isLoading) {
    return (
      <LoadingWrapper>
        <Loading />
      </LoadingWrapper>
    );
  }

  return (
    <CodeEditor
      mode="yaml"
      acceptFileTypes={['.yaml', '.yml']}
      fileName="config.yaml"
      value={value}
      readOnly={readOnly}
      onChange={onChange}
    />
  );
}

export { ExtensionConfig };
