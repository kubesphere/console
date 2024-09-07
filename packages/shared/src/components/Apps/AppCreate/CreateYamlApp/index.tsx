/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useEffect } from 'react';
import { Form, FormItem, Input, Textarea, useForm } from '@kubed/components';
import { CodeEditor } from '@kubed/code-editor';
import { Firewall } from '@kubed/icons';
import { safeBtoa } from '../../../../utils';
import { Pattern } from '../../../../constants';

import { FlexBox, HeaderWrapper, ModalBody, ModalStyle, TitleWrapper } from './styles';

interface Props {
  visible: boolean;
  onCancel: () => void;
  onOk?: (data: any) => void;
  appName?: string;
  workspace?: string;
}
export function CreateYamlApp(props: Props) {
  const { visible, onCancel, onOk, appName, workspace } = props;
  const [form] = useForm();
  const initialValues = {
    appType: 'yaml',
    package: `# ${t('CREATE_YAML_TEMPLATE_TIP')}`,
    workspace,
  };

  useEffect(() => {
    form.setFieldsValue({
      appType: 'yaml',
      package: `# ${t('CREATE_YAML_TEMPLATE_TIP')}\n`,
      appName,
      workspace,
    });
  }, [appName]);
  function handleChange(val: string) {
    console.log(val);
  }

  function handleOk() {
    form.validateFields().then(() => {
      const data = form.getFieldsValue(true);
      data.package = safeBtoa(data.package);
      onOk?.(data);
    });
  }

  return (
    <ModalStyle
      title={t('CREATE_YAML_APPS')}
      titleIcon={<Firewall />}
      width={760}
      visible={visible}
      onCancel={onCancel}
      onOk={handleOk}
      header={null}
      closable={false}
    >
      <HeaderWrapper>
        <img src="/assets/project-create.svg" alt="" />
        <TitleWrapper>
          <div>{t('CREATE_YAML_APPS')}</div>
        </TitleWrapper>
      </HeaderWrapper>
      <ModalBody>
        <Form form={form} initialValues={initialValues} onFieldsChange={([]) => {}}>
          <FlexBox>
            <FormItem
              label={t('NAME')}
              help={t('PROJECT_NAME_DESC')}
              name={['appName']}
              rules={[
                { required: true, message: t('NAME_EMPTY_DESC') },
                // {
                //   pattern: Pattern.PATTERN_SERVICE_NAME,
                //   message: t('PROJECT_NAME_INVALID_DESC'),
                // },
                // { validator: nameValidator },
              ]}
            >
              <Input maxLength={63} defaultValue={appName} disabled={!!appName} />
            </FormItem>
            <FormItem
              label={t('VERSION_NUMBER')}
              name={['versionName']}
              placeholder={t('APP_TEMPLATE_VERSION_DESC')}
              rules={[
                { required: true, message: t('VERSION_NUMBER') },
                {
                  pattern: Pattern.PATTERN_APPTEMPLATE_VERSION,
                  message: t('INVALID_VERSION_TIP'),
                },
              ]}
            >
              <Input placeholder={t('APP_TEMPLATE_VERSION_DESC')} />
            </FormItem>
            <FormItem label={t('ALIAS')} help={t('ALIAS_DESC')} name={['aliasName']}>
              <Input autoComplete="off" maxLength={63} />
            </FormItem>
            <FormItem label={t('DESCRIPTION')} name={['description']} help={t('DESCRIPTION_DESC')}>
              <Textarea />
            </FormItem>
          </FlexBox>
          <FormItem
            label={t('YAML')}
            name={['package']}
            rules={[
              { required: true, message: t('YAML') },
              // {
              //   pattern: Pattern.PATTERN_SERVICE_NAME,
              //   message: t('PROJECT_NAME_INVALID_DESC'),
              // },
              // { validator: nameValidator },
            ]}
          >
            <CodeEditor
              mode="yaml"
              acceptFileTypes={['.yaml', '.yml']}
              fileName="config.yaml"
              readOnly={false}
              value={initialValues.package}
              onChange={handleChange}
            />
          </FormItem>
        </Form>
      </ModalBody>
    </ModalStyle>
  );
}

export default CreateYamlApp;
