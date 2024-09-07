/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useEffect, useMemo, useState } from 'react';
import { isEmpty } from 'lodash';
import { useParams } from 'react-router-dom';
import { Col, FormInstance, FormItem, Input, Row, Select, Tag, Textarea } from '@kubed/components';

import { Pattern } from '../../../../../constants';
import { openpitrixStore } from '../../../../../stores';
import { compareVersion, getRepoAppDisplayName, isRadonDB } from '../../../../../utils';
import { Title } from '../../styles';
import { BasicForm, OptionWrapper, AppTypeBox } from './styles';

const { fileStore, useAppVersionList, useAppDetail } = openpitrixStore;

export type AppBasicInfoFormData = {
  name: string;
  appType?: string;
  appName?: string;
  versionID: string;
  description?: string;
  annotations?: Record<string, string>;
  displayName?: string;
  versionName?: string;
  originalName: string;
};

type Props = {
  appName: string;
  versionID?: string;
  form: FormInstance<AppBasicInfoFormData>;
  versionStatus?: string;
  confirmedBasicData?: Partial<AppBasicInfoFormData>;
};

export function BasicInfoForm({
  appName,
  versionID: defaultVersionId,
  form,
  versionStatus,
  confirmedBasicData,
}: Props): JSX.Element {
  const { workspace } = useParams();
  const [initData, setInitData] = useState<Partial<AppBasicInfoFormData>>();
  const { data: versions } = useAppVersionList({ appName }, { status: versionStatus });
  const sortedVersions = useMemo(
    () =>
      (versions || [])
        .map(version => ({
          label: version.spec.versionName,
          value: isRadonDB(appName) ? version.metadata.name : version.metadata.name,
        }))
        .sort((v1, v2) => compareVersion(v2.value, v1.value)),
    [versions],
  );
  const latestVersion: string = useMemo(() => sortedVersions[0]?.value, [sortedVersions]);

  const { data: appData } = useAppDetail(
    { appName },
    {
      enabled: !!appName,
    },
  );

  function handleVersionChange(versionID: string): void {
    fileStore
      .fetchAppFiles({
        name: appName,
        versionID,
        workspace,
      })
      .then(fileDetails => console.log(fileDetails));
  }

  useEffect(() => {
    if (isEmpty(appData) || !isEmpty(initData)) return;
    const versionID = defaultVersionId || latestVersion;
    let defaultData: Record<string, any> = {
      ...confirmedBasicData,
      versionID,
    };
    const checkData = sortedVersions.find(item => item.value === defaultData.versionID);

    const annotations = {
      'application.kubesphere.io/app-version': checkData?.label || '',
      'application.kubesphere.io/app-name': appName,
    };
    const checkVersion = versions?.find(item =>
      [defaultVersionId, latestVersion].includes(item.metadata.name),
    );
    defaultData = {
      ...defaultData,
      appType: appData?.spec.appType,
      annotations,
      name: `${getRepoAppDisplayName(appData)}-${Math.random().toString(36).slice(2)}`,
      versionID: defaultVersionId || latestVersion,
      versionName: checkVersion?.spec.versionName,
    };
    setInitData(defaultData);
  }, [appData, latestVersion, confirmedBasicData, initData]);

  useEffect(() => form.setFieldsValue(initData ?? {}), [initData]);

  return (
    <BasicForm form={form}>
      <Title>{t('BASIC_INFORMATION')}</Title>
      <Row>
        <Col span={6}>
          <AppTypeBox>
            <FormItem name="appType">
              <Input />
            </FormItem>
            <FormItem name="versionName">
              <Input />
            </FormItem>
            <FormItem name="annotations">
              <Input />
            </FormItem>
          </AppTypeBox>
          <FormItem
            name="name"
            label={t('NAME')}
            help={t('CLUSTER_NAME_DESC')}
            rules={[
              { required: true, message: t('NAME_EMPTY_DESC') },
              {
                pattern: Pattern.PATTERN_SERVICE_NAME,
                message: t('INVALID_NAME_DESC', {
                  message: t('CLUSTER_NAME_DESC'),
                }),
              },
            ]}
          >
            <Input maxLength={53} />
          </FormItem>
        </Col>
        <Col span={6}>
          <FormItem
            label={t('VERSION')}
            name="versionID"
            rules={[{ required: true, message: t('VERSION_EMPTY_DESC') }]}
          >
            <Select style={{ width: '100%' }} onChange={handleVersionChange}>
              {sortedVersions.map(({ label, value }) => (
                <Select.Option key={value} value={value}>
                  <OptionWrapper>
                    <span>{label}</span>
                    {value === latestVersion && (
                      <Tag color="warning">{t('LATEST_VERSION_SCAP')}</Tag>
                    )}
                  </OptionWrapper>
                </Select.Option>
              ))}
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <FormItem label={t('DESCRIPTION')} name="description" help={t('DESCRIPTION_DESC')}>
            <Textarea maxLength={256} />
          </FormItem>
        </Col>
      </Row>
    </BasicForm>
  );
}
