/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { CSSProperties, useMemo, useState } from 'react';
import { pick } from 'lodash';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { CodeEditor } from '@kubed/code-editor';
import { Input, Loading, Modal, Row, Select, Tag } from '@kubed/components';

import type { AppVersion } from '@ks-console/shared';
import { compareAppVersion, openpitrixStore } from '@ks-console/shared';

import { Label, OptionWrapper, ReadOnlyCodeEditor, StyledCol } from '../styles';

const { fileStore } = openpitrixStore;

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
  const codeStyle: CSSProperties = { height: 'none' };
  const { cluster, namespace, workspace } = useParams();
  const sortedVersions = useMemo(() => {
    return versions
      .map((version: AppVersion) => ({
        label: version.metadata.name,
        value: version.metadata.name,
      }))
      .sort((v1: any, v2: any) => compareAppVersion(v2.name, v1.name));
  }, [versions]);
  const latestVersion: string = useMemo(() => sortedVersions[0]?.value, [sortedVersions]);
  const [formData, setFormData] = useState<Record<string, any>>({
    cluster,
    namespace,
    workspace,
    version_id: detail.version_id,
    ...pick(detail, ['app_id', 'cluster_id', 'description', 'name', 'owner', 'version_id']),
  });
  const { isLoading: filesLoading } = useQuery(
    ['apps', 'files', detail?.metadata.name, formData.version_id],
    () =>
      fileStore.fetchAppFiles({
        workspace,
        appName: detail?.metadata.name,
        versionID: formData.version_id,
      }),
    {
      enabled: !!detail?.metadata.name && !!formData.version_id,
      onSuccess: data => setFormData(prevData => ({ ...prevData, conf: data['values.yaml'] })),
    },
  );

  function handleVersionChange(versionId: string): void {
    setFormData(prevData => ({ ...prevData, version_id: versionId }));
  }

  function handleYamlChange(value: string): void {
    setFormData(prevData => ({ ...prevData, conf: value }));
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
          <Input className="mb12 input-item" value={versions[0]?.metadata.name} disabled />
          <Label>{t('CURRENT_APP_SETTINGS_READONLY')}</Label>
          <ReadOnlyCodeEditor
            readOnly
            mode="yaml"
            style={codeStyle}
            hasUpload={false}
            hasDownload={false}
            value={detail?.env}
          />
        </StyledCol>
        <StyledCol span={6}>
          <Label>{t('TARGET_APP_VERSION')}</Label>
          <Select
            name="version_id"
            className="mb12 input-item"
            value={formData.version_id}
            onChange={handleVersionChange}
            placeholder={t('VERSION_EMPTY_DESC')}
          >
            {sortedVersions.map(({ label, value }, index) => (
              <Select.Option key={`${value}_${index}`} value={value}>
                <OptionWrapper>
                  <span>{label}</span>
                  {value === latestVersion && (
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
              value={formData.conf}
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
