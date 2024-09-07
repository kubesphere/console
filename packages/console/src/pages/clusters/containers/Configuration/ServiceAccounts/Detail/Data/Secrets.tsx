/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import { CodeEditor } from '@kubed/code-editor';
import { Button, notify } from '@kubed/components';

import type { FormattedServiceAccount, FormattedSecret } from '@ks-console/shared';
import { secretStore, safeBtoa, yaml, copyToClipboard, Icon } from '@ks-console/shared';

import {
  Title,
  TextDesc,
  DefaultWrapper,
  SecretCardHead,
  CodeEditorWrapper,
  CodeEditorOperations,
} from './styles';

export interface Props {
  secret: string;
  serviceAccountName: string;
  key: string;
  detail: FormattedServiceAccount;
}

function Secret({ secret, serviceAccountName, detail }: Props): JSX.Element {
  const { namespace, cluster } = detail;
  const [showSecret, setShowSecret] = useState<boolean>(false);

  const { useGetMutation } = secretStore;
  const { data: secretData = {} as FormattedSecret } = useGetMutation({
    name: secret,
    namespace,
    cluster,
  });
  const data = secretData.data;

  const kubeConfig = data && {
    apiVersion: 'v1',
    kind: 'Config',
    clusters: [
      {
        name: `${serviceAccountName}@local`,
        cluster: {
          server: 'https://kubernetes.default.svc:443',
          'certificate-authority-data': data['ca.crt'] && safeBtoa(data['ca.crt']),
        },
      },
    ],
    users: [
      {
        name: serviceAccountName,
        user: {
          token: data && data.token,
        },
      },
    ],
    contexts: [
      {
        name: `${serviceAccountName}@local`,
        context: {
          user: serviceAccountName,
          cluster: `${serviceAccountName}@local`,
          namespace,
        },
      },
    ],
    'current-context': `${serviceAccountName}@local`,
  };

  const renderSecretContent = () => {
    return (
      <>
        <SecretCardHead>
          <Title>{t('DATA_SETTINGS')}</Title>
          <Button
            variant="text"
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();

              setShowSecret(!showSecret);
            }}
          >
            {showSecret ? <Icon name="eye-closed" /> : <Icon name="eye" />}
          </Button>
        </SecretCardHead>
        <DefaultWrapper>
          <ul>
            {Object.entries(data).map(([key, value]) => (
              <li key={key}>
                <span>{key}:</span>
                <span>
                  <pre>{showSecret ? value : safeBtoa(value)}</pre>
                </span>
              </li>
            ))}
          </ul>
        </DefaultWrapper>
      </>
    );
  };

  const handleCopy = () => {
    copyToClipboard(yaml.getValue(kubeConfig));
    notify.success(t('COPY_SUCCESSFUL'));
  };

  const handleDownload = () => {
    const fileName = 'kubeconfig.yaml';
    const blob = new Blob([yaml.getValue(kubeConfig)], {
      type: 'text/plain;charset=utf-8',
    });

    saveAs(blob, fileName);
  };

  const renderConfigContent = () => {
    return (
      <>
        <Title>{t('KUBECONFIG_SETTINGS')}</Title>
        <TextDesc
          className="mb12"
          dangerouslySetInnerHTML={{ __html: t('SERVICEACCOUNT_KUBECONFIG_DESC') }}
        />
        <CodeEditorWrapper>
          <CodeEditorOperations>
            <Icon name="copy" size={20} onClick={handleCopy} />
            <span>|</span>
            <Icon name="download" size={20} onClick={handleDownload} />
          </CodeEditorOperations>
          <CodeEditor value={yaml.getValue(kubeConfig)} readOnly={true} hasDownload={false} />
        </CodeEditorWrapper>
      </>
    );
  };

  return (
    <>
      {data && renderSecretContent()}
      {renderConfigContent()}
    </>
  );
}

export default Secret;
