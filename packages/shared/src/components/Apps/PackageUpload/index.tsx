/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import cx from 'classnames';
import { pick } from 'lodash';
import { Loading, notify } from '@kubed/components';

import Icon from '../../Icon';
import { formatTime } from '../../../utils';
import { Constants } from '../../../constants';

import {
  ReUpload,
  EditLabel,
  UploadField,
  DownLoadBtn,
  StatusAvatar,
  StyledDropzone,
} from './styles';

type Props = {
  packageName?: string;
  versionID?: string;
  fileStore: any;
  appName?: string;
  type?: string;
  onOk?: (data: PackageInfo) => void;
  onOkFormData?: (data: any, formData: FormData) => void;
  onCheckStatusChange?: (status: any) => void;
  onCheckStatusChangeFormData?: (status: any) => void;
  initCheckedStatus?: () => void;
  initCheckedStatusFormData?: () => void;
  hasPackage?: boolean;
  canCreate?: boolean;
  canEdit?: boolean;
  updateTime?: string;
  className?: string;
  workspace?: string;
  appType?: string;
  disabledUpload?: boolean;
};

const { UPLOAD_FILE_TYPES, UPLOAD_STATUS_WORD } = Constants;

export type PackageInfo = {
  package: string;
  name: string;
};

export function PackageUpload({
  hasPackage,
  canCreate,
  canEdit,
  fileStore,
  appName,
  versionID,
  type = 'CREATE_APP',
  onOk,
  onOkFormData,
  onCheckStatusChange,
  onCheckStatusChangeFormData,
  initCheckedStatus,
  initCheckedStatusFormData,
  updateTime = '',
  packageName,
  className,
  workspace: ws,
  appType,
  disabledUpload,
}: Props): JSX.Element {
  const {
    checkFile,
    checkFileFormData,
    handleFileByBase64Str,
    handleFileFormData,
    validatePackage,
    validatePackageFormData,
    uploadPackage,
    uploadPackageFormData,
  } = fileStore;
  const state: Record<string, any> = {};
  const { workspace = ws } = useParams();
  const [errorInfo, setErrorInfo] = useState<any>('');
  const [missFile, setMissFile] = useState<any>();
  const [fileName, setFileName] = useState<string>('');
  const [uploadStatus, setUploadStatus] = useState<string>('init');
  const showPackage = useMemo(
    () => (hasPackage || canCreate || canEdit) && uploadStatus === 'init',
    [hasPackage, canCreate, canEdit],
  );
  const uploadStatusWord: Record<string, any> = useMemo(() => {
    return {
      ...UPLOAD_STATUS_WORD,
      error: state.errorInfo,
    };
  }, state.errorInfo);

  async function packageValidator(base64Str: string): Promise<any> {
    const result = await validatePackage({
      base64Str,
      appName,
      workspace,
    });
    const status = result.error ? 'error' : 'success';
    setMissFile(result.missFile);
    setErrorInfo(result.error);
    setUploadStatus(status);
    onCheckStatusChange?.({ status, base64Str, ...result });
    if (type === 'MODIFY_VERSION' && status === 'success') {
      const uploadData = {
        versionID: versionID || result.versionID,
        appName: appName,
        workspace,
        name: result.versionName,
        package: result.base64Str || base64Str,
      };
      uploadPackage(type, uploadData, (data: any) => {
        onOk?.(pick(data, ['package', 'name']));
      });
      setUploadStatus('init');
    }
  }

  async function packageValidatorFormData(formData: FormData): Promise<any> {
    const result = await validatePackageFormData({
      formData,
      appName,
      workspace,
    });
    const status = result.error ? 'error' : 'success';
    setMissFile(result.missFile);
    setErrorInfo(result.error);
    setUploadStatus(status);
    onCheckStatusChangeFormData?.({ status, formData, ...result });

    // todo 当使用 formdata
    // todo type === MODIFY_VERSION 且需要外部传递函数，使用 onOkFormData
    if (type === 'MODIFY_VERSION' && status === 'success') {
      const uploadData = {
        versionID: versionID || result.versionID,
        appName: appName,
        workspace,
        name: result.versionName,
        // package: result.base64Str || base64Str,
      };
      uploadPackageFormData(type, uploadData, formData, (data: any, form: FormData) => {
        onOkFormData?.(data, form);
      });
      setUploadStatus('init');
    }
  }

  async function checkPackage(file: File): Promise<void> {
    initCheckedStatusFormData?.();
    initCheckedStatus?.();

    setUploadStatus('uploading');
    setFileName(file.name);

    if (onCheckStatusChangeFormData || onOkFormData) {
      const result = checkFileFormData?.(file, 'package');
      if (!result) {
        return handleFileFormData?.(file, packageValidatorFormData);
      }

      setErrorInfo(result);
    } else {
      const result = checkFile?.(file, 'package');
      if (!result) {
        return handleFileByBase64Str?.(file, packageValidator);
      }

      setErrorInfo(result);
    }

    setUploadStatus('error');
    return Promise.reject();
  }

  async function downloadPackage(e: MouseEvent): Promise<void> {
    e.stopPropagation();
    e.preventDefault();

    await fileStore.downloadPackage(
      { versionID: versionID, appName: appName, workspace },
      packageName,
    );
    notify.success(t('DOWNLOAD_SUCCESSFUL'));
  }

  return (
    <>
      <StyledDropzone
        onDrop={console.log}
        className={className}
        accept={UPLOAD_FILE_TYPES.package}
        validator={checkPackage as any}
        disabled={!['helm', undefined].includes(appType) || disabledUpload}

        // disabled={!(appType === 'helm' && canCreate)}
      >
        <UploadField
          avatar={
            <StatusAvatar>
              {uploadStatus === 'uploading' ? <Loading /> : <>📦</>}
              {!['init', 'uploading'].includes(uploadStatus) && (
                <Icon size={16} name={uploadStatus} className={cx('icon', `${uploadStatus}`)} />
              )}
            </StatusAvatar>
          }
          value={
            showPackage ? (
              <>
                {packageName}
                {canEdit && <EditLabel>{t('UPLOAD')}</EditLabel>}
              </>
            ) : (
              <>{uploadStatus !== 'init' ? fileName : t('UPLOAD_HELM_TITLE')}</>
            )
          }
          label={
            showPackage ? (
              <>
                {t('UPDATE_TIME_COLON')}
                {formatTime(updateTime, 'YYYY-MM-DD HH:mm:ss')}
              </>
            ) : (
              <>
                {t(uploadStatusWord[uploadStatus], { file: missFile })}
                {uploadStatus === 'error' && <label>. {t(errorInfo || 'UPLOAD_AGAIN_TIP')}</label>}
              </>
            )
          }
        />
        {showPackage && appType === 'helm' && (
          <DownLoadBtn onClick={downloadPackage}>{t('DOWNLOAD')}</DownLoadBtn>
        )}
        {canCreate && (
          <ReUpload>
            👉 {t('INCORRECT_FILE')}
            <label>{t('TRY_AGAIN')}</label>
          </ReUpload>
        )}
      </StyledDropzone>
    </>
  );
}
