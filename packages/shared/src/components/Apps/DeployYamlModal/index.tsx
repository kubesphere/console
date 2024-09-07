/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useState, useEffect } from 'react';
import { last } from 'lodash';
import { Form, FormItem, Input, useForm, Select, Textarea } from '@kubed/components';
import { CodeEditor } from '@kubed/code-editor';
import { Firewall } from '@kubed/icons';
import { openpitrixStore } from '../../../stores';
import { safeBtoa, getRepoAppDisplayName } from '../../../utils';
import yaml, { objectToYaml } from '../../../utils/yaml';
import { FlexBox, HeaderWrapper, ModalBody, ModalStyle, TitleWrapper } from './styles';

interface Props {
  visible: boolean;
  detail: any;
  appName?: string;
  versionID?: string;
  onCancel: () => void;
  onOk?: (data: any) => void;
  namespace?: string;
  workspace?: string;
  cluster?: string;
  originalName?: string;
}
const { fileStore, useAppVersionList } = openpitrixStore;

export function DeployYamlModal(props: Props) {
  const {
    visible,
    onCancel,
    appName,
    onOk,
    detail,
    versionID: vid,
    namespace,
    originalName,
  } = props;
  const [form] = useForm();
  const [versionID, setVersionID] = useState(vid);
  const workspace = detail?.metadata?.labels?.['kubesphere.io/workspace'];
  const { data: versions = [] } = useAppVersionList({
    workspace,
    appName,
  });
  const versionList = versions.map(item => ({
    label: item.spec.versionName || item.metadata.name,
    value: item.metadata.name,
  }));
  const [defaultValue, setDefaultValue] = useState({
    appType: '',
    name: '',
    versionName: versionID,
    package: `# ${t('CREATE_YAML_TEMPLATE_TIP')}`,
  });

  const { data: files = {} } = fileStore.useQueryFiles(
    { appName, versionID, workspace },
    { enabled: !!appName && !!versionID && !detail?.['all.yaml'] },
  );
  useEffect(() => {
    if (!vid && !versionID && detail?.metadata.name) {
      setVersionID(detail?.metadata.name);
    }
  }, [detail?.metadata.name, vid]);

  useEffect(() => {
    let packages = detail['all.yaml'] || files['all.yaml'];
    if (packages && versionID && !defaultValue.appType) {
      if (namespace) {
        packages = objectToYaml(
          yaml.loadAll(packages).map(item => {
            try {
              item.metadata.namespace = namespace;
            } catch (e) {}
            return item;
          }),
        );
      }
      setDefaultValue({
        appType: 'yaml',
        name: `${originalName || detail.metadata.name}-${Math.random().toString(36).slice(2)}`,
        versionName: versionID,
        package: packages,
      } as any);
    }
  }, [detail, versionID, files, defaultValue]);

  useEffect(() => {
    form?.setFieldsValue(defaultValue);
  }, [defaultValue]);

  function handleChange(val: string) {
    console.log(val);
  }

  function handleOk() {
    form.validateFields().then(() => {
      const { ...data } = form.getFieldsValue(true);
      data.package = safeBtoa(data.package);
      data.appName = appName;
      data.appType = detail.spec.appType;
      data.versionID = versionID;
      data.displayName = data.aliasName;
      data.versionName = last(versionID?.split('-'));
      data.originalName = originalName || getRepoAppDisplayName(detail);
      onOk?.(data);
    });
  }

  return (
    <ModalStyle
      title={t('CREATE_YAML_APPS')}
      titleIcon={<Firewall />}
      width={660}
      visible={visible}
      onCancel={onCancel}
      onOk={handleOk}
      header={null}
      closable={false}
    >
      <HeaderWrapper>
        <img src="/assets/project-create.svg" alt="" />
        <TitleWrapper>
          <div>{t(workspace ? 'DEPLOY_YAML_APPS' : 'CREATE_YAML_APPS')}</div>
        </TitleWrapper>
      </HeaderWrapper>
      <ModalBody>
        <Form form={form} initialValues={defaultValue} onFieldsChange={([]) => {}}>
          <FlexBox>
            <FormItem
              label={t('NAME')}
              help={t('PROJECT_NAME_DESC')}
              name={['name']}
              rules={[
                { required: true, message: t('NAME_EMPTY_DESC') },
                // {
                //   pattern: Pattern.PATTERN_SERVICE_NAME,
                //   message: t('PROJECT_NAME_INVALID_DESC'),
                // },
                // { validator: nameValidator },
              ]}
            >
              <Input maxLength={63} />
            </FormItem>
            <FormItem
              label={t('VERSION_NUMBER')}
              name={['versionName']}
              rules={[
                { required: true, message: t('VERSION_NUMBER') },
                // {
                //   pattern: Pattern.PATTERN_SERVICE_NAME,
                //   message: t('PROJECT_NAME_INVALID_DESC'),
                // },
                // { validator: nameValidator },
              ]}
            >
              {detail ? (
                <Select options={versionList} disabled={!!vid} onSelect={setVersionID} />
              ) : (
                <Input disabled={!!vid} />
              )}
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
              value={defaultValue.package}
              onChange={handleChange}
            />
          </FormItem>
        </Form>
      </ModalBody>
    </ModalStyle>
  );
}

export default DeployYamlModal;
