/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { forwardRef, Ref, useEffect, useImperativeHandle, useState } from 'react';
import { isEmpty, merge } from 'lodash';
import { CodeEditor } from '@kubed/code-editor';
import { Alert, Form, Loading, Switch, useForm } from '@kubed/components';

import SchemaForm from './SchemaForm';
import { yaml, parser } from '../../../../utils';
import { openpitrixStore } from '../../../../stores';
import type { AppConfigDetail } from '../../../../types';

import { CodeEditorWrapper, Title } from './styles';

export type AppConfigRefType = {
  conf: string;
};

type Props = {
  appName?: string;
  versionID?: string;
  className?: string;
  workspace?: string;
};

function AppConfigForm(
  { appName, versionID, className, workspace }: Props,
  ref?: Ref<AppConfigRefType>,
): JSX.Element {
  const [form] = useForm();
  const { fileStore } = openpitrixStore;
  const [isCodeMode, setIsCodeMode] = useState<boolean>(false);
  const { data: files, isLoading } = fileStore.useQueryFiles(
    { appName, versionID, workspace },
    { enabled: !!appName && !!versionID },
  );
  const [config, setConfig] = useState<AppConfigDetail>({
    valuesYaml: '',
    valuesJSON: {},
    valuesSchema: undefined,
  });

  function handleModeChange(): void {
    setIsCodeMode(!isCodeMode);
  }

  function handleYamlChange(value: any): void {
    setConfig((prevState: any) => ({ ...prevState, valuesYaml: value }));
  }

  function handleValuesJsonChange(patchJson: any): void {
    setConfig(prevState => {
      const finalValuesJson = merge(prevState, { valuesJSON: patchJson });
      return finalValuesJson;
    });
  }

  useEffect(() => {
    if (isLoading || isEmpty(files)) return;
    const file = files?.['all.yaml'] || files?.['values.yaml'];

    if (file) {
      setConfig({
        valuesYaml: file,
        valuesJSON: yaml.load(file),
        valuesSchema: parser.safeParseJSON(files['values.schema.json']),
      });
    }
  }, [files, isLoading]);

  useImperativeHandle(ref, () => {
    const { valuesYaml, valuesJSON, valuesSchema } = config;
    const finalConfig = yaml.getValue(
      isCodeMode || !valuesSchema ? yaml.load(valuesYaml) : valuesJSON,
    );

    return { conf: finalConfig };
  });

  if (isLoading) {
    return <Loading className="page-loading" />;
  }

  return (
    <div className={className}>
      <Title>
        <span>{t('APP_SETTINGS')}</span>
        {config.valuesSchema && (
          <Switch
            label={t('EDIT_YAML')}
            variant="button"
            onChange={handleModeChange}
            checked={isCodeMode}
          />
        )}
      </Title>
      {config.valuesSchema && (
        <Alert className="mb12" type="info">
          {t('HELM_APP_SCHEMA_FORM_TIP')}
        </Alert>
      )}
      {isCodeMode || !config.valuesSchema ? (
        <CodeEditorWrapper>
          <CodeEditor
            mode="yaml"
            value={config.valuesYaml}
            onChange={handleYamlChange}
            hasUpload={false}
            hasDownload={false}
          />
        </CodeEditorWrapper>
      ) : (
        <Form form={form} onValuesChange={handleValuesJsonChange}>
          <SchemaForm propObj={config.valuesSchema} />
        </Form>
      )}
    </div>
  );
}

export default forwardRef(AppConfigForm);
