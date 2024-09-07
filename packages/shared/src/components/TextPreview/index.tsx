/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useMemo, useState } from 'react';
import { isEmpty } from 'lodash';
import { Field, LabeledValue, Select } from '@kubed/components';
import { CodeEditor, CodeEditorProps } from '@kubed/code-editor';

import Icon from '../Icon';

import { EditorWrapper, TextPreviewWrapper, ToolbarWrapper } from './styles';

type Props = {
  files: Record<string, string>;
  type?: string;
  hideToolbar?: boolean;
  editorOptions?: Partial<CodeEditorProps>;
};

const DEFAULT_PREVIEW_FILE = 'values.yaml';

function getDefaultSelectFile(files: Record<string, string>, fileOptions: LabeledValue[]) {
  const hasDefaultPreview = files[DEFAULT_PREVIEW_FILE];
  const firstFile = !isEmpty(fileOptions) ? fileOptions[0].value : '';
  return hasDefaultPreview ? DEFAULT_PREVIEW_FILE : firstFile;
}

function TextPreview({
  files,
  type = 'selectFiles',
  editorOptions,
  hideToolbar = false,
}: Props): JSX.Element {
  const [mode] = useState<string>('yaml');
  const fileOptions = useMemo(
    () =>
      Object.keys(files).map(fileName => ({
        label: fileName,
        value: fileName,
      })),
    [files],
  );
  const [selectFile, setSelectFile] = useState<any>(getDefaultSelectFile(files, fileOptions));

  if (!selectFile) {
    return <p>{t('NO_APP_CHART_FILE_FOUND')}</p>;
  }

  return (
    <TextPreviewWrapper>
      {!hideToolbar && (
        <>
          {type === 'selectFiles' && (
            <ToolbarWrapper>
              <Field avatar={<Icon name="coding" size={20} />} value={t('CHART_FILES')} />
              <Select
                style={{ width: '376px' }}
                defaultValue={selectFile}
                onChange={setSelectFile}
                options={fileOptions}
              />
            </ToolbarWrapper>
          )}
          {type === 'values.yaml' && (
            <Field avatar={<img src="/assets/helm.svg" alt="" />} value="Values.yaml" />
          )}
        </>
      )}
      <EditorWrapper>
        <CodeEditor
          mode={mode}
          value={files[selectFile]}
          readOnly={true}
          hasDownload={true}
          {...editorOptions}
        />
      </EditorWrapper>
    </TextPreviewWrapper>
  );
}

export default TextPreview;
