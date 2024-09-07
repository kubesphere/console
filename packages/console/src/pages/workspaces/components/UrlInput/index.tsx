/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { ChangeEvent, useMemo, useState } from 'react';
import { isEmpty } from 'lodash';
import { useParams } from 'react-router-dom';
import Schema, { Rules } from 'async-validator';
import { Icon, openpitrixStore } from '@ks-console/shared';
import { Button, Input, Loading, Select, Tooltip } from '@kubed/components';

import { InputWrapper, UrlItem, Help, Label, Horizon, AccessItem } from './styles';

export function checkRepoInvalidReason(errCode: number): string {
  const errReason: Record<number, string> = {
    // 901: '', // ErrNotExpect
    // 101: '', // ErrVisibility
    102: 'UNRECOGNIZED_URL', // ErrNotUrl
    103: 'INVALID_CREDENTIAL_FORMAT', // ErrCredentialNotJson
    104: 'MISSING_ACCESS_KEY_ID', // ErrNoAccessKeyId
    105: 'MISSING_SECRET_ACCESS_KEY', // ErrNoSecretAccessKey
    106: 'S_THREE_ACCESS_DENIED', // ErrS3AccessDeny
    107: 'INVALID_URL_FORMAT', // ErrUrlFormat
    108: 'INVALID_HTTP_SCHEME', // ErrSchemeNotHttp
    109: 'HTTP_ACCESS_DENIED', // ErrHttpAccessDeny
    110: 'INVALID_HTTPS_SCHEME', // ErrSchemeNotHttps
    111: 'INVALID_TYPE', // ErrType
    112: 'INVALID_PROVIDERS', // ErrProviders
    113: 'INVALID_REPO_URL', // ErrNotRepoUrl
    114: 'INVALID_S_THREE_SCHEME', // ErrSchemeNotS3
    // 115: 'Bad Index YAML', // ErrBadIndexYaml
  };

  return t(errReason[errCode] || 'INVALID_URL_DESC');
}

const { validateRepoUrl } = openpitrixStore;

type Props = {
  formData: any;
  onChange?: (urlInput: Record<string, string>) => void;
  onValidate?: (isValid: boolean) => void;
  isSubmitting?: boolean;
};

function UrlInput({ formData, onChange, onValidate, isSubmitting }: Props): JSX.Element {
  const { workspace = '' } = useParams();
  const protocolReg = /^(http|https|s3):\/\//;
  const protocols = [
    { label: 'http://', value: 'http' },
    { label: 'https://', value: 'https' },
    { label: 's3://', value: 's3' },
  ];
  const initUrlInputValue = useMemo(() => {
    if (formData.url) {
      const reg = new RegExp('^([\\s\\S]*?:\\/\\/)([\\s\\S]*)$', 'g');
      const res = reg.exec(formData.url);
      return res ? res[2] : '';
    }
    return '';
  }, [formData.url]);
  const credentialValue = useMemo(() => {
    const data = {
      accessKeyID: '',
      secretAccessKey: '',
    };

    if (formData.credential) {
      try {
        return {
          ...data,
          ...JSON.parse(formData.credential),
        };
      } catch (e) {}
    }
    return data;
  }, [formData.credential]);
  const [urlInput, setUrlInput] = useState<string>(initUrlInputValue);
  const [urlType, setUrlType] = useState<string>(formData.type || 'http');
  const [validateStatus, setValidateStatus] = useState<string>('');
  const [validateStatusCode, setValidateStatusCode] = useState<number>(0);
  const isS3Type = useMemo(() => urlType === 's3', [urlType]);
  const [urlIsValid, setUrlIsValid] = useState<boolean>(false);
  const descriptor: Rules = {
    url: {
      validator: (rule, value, callback) => {
        if (urlIsValid && validateStatus === 'success') {
          callback();
        } else {
          callback(new Error(t('INVALID_URL_DESC')));
        }
      },
    },
  };
  const validator = new Schema(descriptor);

  function resetValidateStatus(): void {
    setValidateStatus('');
    setValidateStatusCode(0);
  }

  function handleTypeChange(type: string): void {
    setUrlType(type);

    const patchData: Record<string, string> = {
      type,
      credential: isS3Type ? JSON.stringify(credentialValue) : '{}',
    };

    if (!protocolReg.test(urlInput)) {
      Object.assign(patchData, { url: `${type}://${urlInput}` });
    }

    onChange?.(patchData);
    resetValidateStatus();
  }

  function handleUrlChange({ target }: ChangeEvent<HTMLInputElement>): void {
    const formatUrl = target.value.trim();
    setUrlInput(formatUrl);
    onChange?.({ url: protocolReg.test(formatUrl) ? formatUrl : `${urlType}://${formatUrl}` });
    resetValidateStatus();
  }

  function handleAccessInputChange({ target }: ChangeEvent<HTMLInputElement>): void {
    const patchCredential = JSON.stringify({
      ...credentialValue,
      [`${target.name}`]: target.value,
    });

    onChange?.({
      credential: patchCredential,
    });
    resetValidateStatus();
  }

  function validate(): any {
    const opts = {
      first: true,
    };

    validator.validate(formData, opts, (_, errors) => {
      onValidate?.(isEmpty(errors));
    });
  }

  function handleVerifyResult(isOk: any, errorCode?: number) {
    setValidateStatus(isOk ? 'success' : 'error');
    setValidateStatusCode(isOk ? 0 : errorCode || 0);
    setUrlIsValid(!!isOk);
    validate();
  }

  function handleVerify(e: any) {
    e.stopPropagation();
    e.preventDefault();

    setValidateStatus('validating');
    const { url, credential } = formData;
    validateRepoUrl(workspace, {
      type: urlType,
      url,
      credential,
    })
      .then(({ ok, errorCode }: any) => {
        handleVerifyResult(ok, errorCode);
      })
      .catch(() => {
        handleVerifyResult(false);
      });
  }

  function disableVerify() {
    if (isSubmitting || validateStatus === 'validating') {
      return true;
    }

    if (isS3Type) {
      const { accessKeyID, secretAccessKey } = credentialValue;
      return isEmpty(urlInput) || isEmpty(accessKeyID) || isEmpty(secretAccessKey);
    }

    return isEmpty(urlInput);
  }

  function renderValidateStatus() {
    if (!validateStatus) {
      return;
    }

    if (validateStatus === 'validating') {
      return <Loading size={16} />;
    }

    return (
      <Tooltip
        placement="top"
        content={
          validateStatus === 'success'
            ? t('VALID_URL_DESC')
            : checkRepoInvalidReason(validateStatusCode || -1)
        }
      >
        <Icon
          name={validateStatus}
          style={{
            color: '#ffffff',
            fill: validateStatus === 'error' ? '#ea4641' : '#55bc8a',
          }}
        />
      </Tooltip>
    );
  }

  return (
    <>
      <UrlItem className="form-item">
        <Label>{t('URL')}</Label>
        <Horizon>
          <InputWrapper className="input-wrapper">
            <Select value={urlType} options={protocols} onChange={handleTypeChange} />
            <Input
              value={urlInput}
              autoComplete="off"
              placeholder="example.com"
              onChange={handleUrlChange}
              suffix={renderValidateStatus()}
            />
          </InputWrapper>
          {!isS3Type && (
            <Button onClick={handleVerify} disabled={disableVerify()}>
              {t('VALIDATE')}
            </Button>
          )}
        </Horizon>
        <Help>{t('APP_REPO_URL_DESC')}</Help>
      </UrlItem>
      {isS3Type && (
        <AccessItem className="form-item">
          <InputWrapper className="input-wrapper">
            <div>
              <Label>{t('ACCESS_KEY_ID')}</Label>
              <Input
                name="accessKeyID"
                autoComplete="off"
                value={credentialValue.accessKeyID}
                onChange={handleAccessInputChange}
              />
            </div>
            <div>
              <Label className="label">{t('SECRET_ACCESS_KEY')}</Label>
              <Input
                name="secretAccessKey"
                autoComplete="off"
                value={credentialValue.secretAccessKey}
                onChange={handleAccessInputChange}
              />
            </div>
          </InputWrapper>
          <Button onClick={handleVerify} disabled={disableVerify()}>
            {t('VALIDATE')}
          </Button>
        </AccessItem>
      )}
    </>
  );
}

export default UrlInput;
