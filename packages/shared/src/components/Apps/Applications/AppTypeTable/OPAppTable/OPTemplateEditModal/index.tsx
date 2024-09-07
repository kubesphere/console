/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { CSSProperties, useMemo, useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import { CodeEditor } from '@kubed/code-editor';
import { Input, Loading, Modal, Row, Select, Tag } from '@kubed/components';

import { compareAppVersion, safeAtob, safeBtoa } from '../../../../../../utils';
import { openpitrixStore } from '../../../../../../stores';
import { Label, OptionWrapper, ReadOnlyCodeEditor, StyledCol } from '../styles';
import type { AppVersion } from '../../../../../../types';

const { fileStore } = openpitrixStore;
const codeStyle: CSSProperties = { height: 'none' };

type Props = {
  visible: boolean;
  detail: any;
  versions?: AppVersion[];
  onOk?: (data: Record<string, any>) => void;
  onCancel?: () => void;
};

function OPTemplateEditModal({
  visible,
  detail,
  versions = [],
  onOk,
  onCancel,
}: Props): JSX.Element {
  const { workspace } = useParams();
  const oldYaml = safeAtob(detail?.spec?.values || '');
  const [newYaml, setNewYaml] = useState({ version: '', value: '', id: '' });
  const sortedVersions = useMemo(() => {
    return versions
      .map((version: AppVersion) => ({
        label: version.metadata.name,
        value: version.metadata.name,
        version: version.spec.versionName,
      }))
      .sort((v1: any, v2: any) => compareAppVersion(v2.version, v1.version));
  }, [versions]);
  const latestVersion: { label: string; value: string; version: string } = sortedVersions[0];
  const [formData, setFormData] = useState<Record<string, any>>({
    kind: 'ApplicationRelease',
    metadata: {
      name: detail?.metadata.name,
      annotations: {
        ...detail?.metadata.annotations,
        'application.kubesphere.io/app-version': latestVersion?.version,
        'application.kubesphere.io/app-versionName': latestVersion?.version,
      },
      labels: detail?.metadata.labels,
    },
    spec: {
      ...detail.spec,
      appVersionID: latestVersion?.value,
    },
  });

  const { isLoading: filesLoading } = useQuery(
    ['apps', 'files', detail?.metadata.name, formData.spec.appVersionID],
    () =>
      fileStore.fetchAppFiles({
        workspace,
        appName: detail?.spec.appID,
        versionID: formData.spec.appVersionID,
      }),
    {
      enabled: !!detail?.metadata.name && !!formData.spec.appVersionID,
      onSuccess: data => {
        const version = sortedVersions?.find(item => item.value === formData.spec.appVersionID);
        setNewYaml({
          id: formData.spec.appVersionID,
          value: data['all.yaml'] || data['values.yaml'],
          version: version?.version as string,
        });
      },
    },
  );

  useEffect(() => {
    if (newYaml.value) {
      setFormData({
        ...formData,
        metadata: {
          ...formData.metadata,
          annotations: {
            ...detail?.metadata.annotations,
            'application.kubesphere.io/app-version': newYaml?.version,
            'application.kubesphere.io/app-versionName': newYaml?.id,
          },
          labels: {
            ...detail?.metadata.labels,
            'application.kubesphere.io/appversion-id': newYaml?.id,
          },
        },
        spec: {
          ...detail.spec,
          appVersionID: newYaml?.id,
          values: safeBtoa(newYaml.value),
        },
      });
    }
  }, [newYaml]);

  function handleVersionChange(versionID: string): void {
    const version = sortedVersions?.find(item => item.value === versionID);
    setNewYaml(prevData => ({
      ...prevData,
      id: versionID,
      version: version?.version as string,
    }));
  }

  function handleYamlChange(value: string): void {
    setNewYaml(prevData => ({ ...prevData, value: value }));
  }

  function handleOk(): void {
    onOk?.(formData);
  }

  return (
    <Modal
      width={1280}
      visible={visible}
      title={t('EDIT_APP_SETTINGS')}
      okText={t('OK')}
      onOk={handleOk}
      onCancel={onCancel}
    >
      <Row>
        <StyledCol span={6}>
          <Label>{t('CURRENT_APP_VERSION')}</Label>
          <Input className="mb12 input-item" value={detail?.spec.appVersionID} disabled />
          <Label>{t('CURRENT_APP_SETTINGS_READONLY')}</Label>
          <ReadOnlyCodeEditor
            readOnly
            mode="yaml"
            style={codeStyle}
            hasUpload={false}
            hasDownload={false}
            value={oldYaml}
          />
        </StyledCol>
        <StyledCol span={6}>
          <Label>{t('TARGET_APP_VERSION')}</Label>
          <Select
            name="versionID"
            className="mb12 input-item"
            value={newYaml.id}
            onChange={handleVersionChange}
            placeholder={t('VERSION_EMPTY_DESC')}
          >
            {sortedVersions.map(({ label, value }, index) => (
              <Select.Option key={`${value}_${index}`} value={value}>
                <OptionWrapper>
                  <span>{label}</span>
                  {value === latestVersion?.value && (
                    <Tag className="ml12" color="warning">
                      {t('LATEST_VERSION')}
                    </Tag>
                  )}
                </OptionWrapper>
              </Select.Option>
            ))}
          </Select>
          <Label>{t('TARGET_APP_SETTINGS')}</Label>
          {filesLoading ? (
            <Loading />
          ) : (
            <CodeEditor
              mode="yaml"
              value={newYaml.value}
              onChange={handleYamlChange}
              style={codeStyle}
              hasUpload={false}
              hasDownload={false}
            />
          )}
        </StyledCol>
      </Row>
    </Modal>
  );
}

export default OPTemplateEditModal;
