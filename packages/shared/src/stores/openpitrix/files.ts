/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { isArray, isString, keys } from 'lodash';
import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';

import { Constants } from '../../constants';
import {
  downloadFileFromBase64,
  request,
  safeAtob,
  getCreateAppParams,
  getCreateAppParamsFormData,
} from '../../utils';

import { BaseUrlParams, getBaseUrl } from './base';

const resourceName = 'files';

export function fetchAppFiles({
  appName,
  versionID,
  workspace,
}: BaseUrlParams): Promise<Record<string, string>> {
  const url = getBaseUrl({ workspace, appName, versionID }, resourceName);

  return request.get(url).then((res: any) => {
    return Object.entries(res).reduce((acc: Record<string, string>, [key, value]) => {
      acc[key] = safeAtob(value);
      return acc;
    }, {});
  });
}

export function handleFileByBase64Str(file: File, callBack: (base64Str: string) => void) {
  const reader = new FileReader();
  // reader.readAsDataURL(file, 'UTF-8');
  reader.readAsDataURL(file);
  reader.addEventListener('load', async () => {
    const readerResult = reader.result;
    // const base64Str = readerResult.substring(readerResult.indexOf(',') + 1, readerResult.length);
    let base64Str = '';
    if (isString(readerResult)) {
      base64Str = readerResult.substring(readerResult.indexOf(',') + 1, readerResult.length);
    } else if (isArray(readerResult)) {
      base64Str = readerResult
        .join(',')
        .substring(readerResult.indexOf(',') + 1, readerResult.length);
    }

    return callBack(base64Str);
  });
}

export function handleFileFormData(file: File, callBack: (formData: FormData) => void) {
  const formData = new FormData();
  formData.append('file', file);
  callBack(formData);
}

type ValidateResponse = {
  appName: string;
  versionName: string;
  credential?: Record<string, unknown>;
  errorDetails?: unknown;
};

type ValidatePackageResponse = Partial<ValidateResponse> & {
  base64Str?: string;
  missFile?: string[];
  error?: string;
};

export async function validatePackage({
  base64Str,
  appName,
  versionName,
  workspace,
}: {
  base64Str: string;
  appName?: string;
  name?: string;
  versionName?: string;
  workspace?: string;
}): Promise<ValidatePackageResponse> {
  const data: Record<string, string | undefined> = getCreateAppParams({
    appType: 'helm',
    base64Str,
    appName,
    versionName,
    workspace,
  });
  const result: ValidateResponse | undefined = await request.post(
    `${getBaseUrl(
      { workspace, appName: appName, name: appName ? 'versions' : 'apps' },
      resourceName,
    )}?validate=true`,
    data,
  );
  const response: ValidatePackageResponse = result ? { ...result } : {};

  if (result?.versionName) {
    response.base64Str = base64Str;
  }

  if (result?.errorDetails) {
    response.error = 'MISS_FILE_NOTE';
    response.missFile = keys(result.errorDetails);
  }

  return response;
}

export async function validatePackageFormData({
  formData,
  appName,
  versionName,
  workspace,
}: {
  formData: FormData;
  appName?: string;
  name?: string;
  versionName?: string;
  workspace?: string;
}): Promise<Omit<ValidatePackageResponse, 'base64Str'>> {
  const data: Record<string, string | undefined> = getCreateAppParamsFormData({
    appType: 'helm',
    appName,
    versionName,
    workspace,
  });

  const jsonData = JSON.stringify(data);
  formData.append('jsonData', jsonData);

  const result: ValidateResponse | undefined = await request.post(
    `${getBaseUrl(
      { workspace, appName: appName, name: appName ? 'versions' : 'apps' },
      resourceName,
    )}?validate=true`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  const response: Omit<ValidatePackageResponse, 'base64Str'> = result ? { ...result } : {};

  // if (result?.versionName) {
  //   response.base64Str = base64Str;
  // }

  if (result?.errorDetails) {
    response.error = 'MISS_FILE_NOTE';
    response.missFile = keys(result.errorDetails);
  }

  return response;
}

export type UploadPackageParams = {
  base64Str?: string;
  version_type?: string;
  name?: string;
  icon?: string;
  type?: string;
  app_id?: string;
  workspace?: string;
  version_package?: string;
  package?: string;
};

export type UploadPackageParamsFormData = Omit<Omit<UploadPackageParams, 'base64Str'>, 'package'>;

/**
 *
 * @param type CREATE_APP, CREATE_VERSION, MODIFY_VERSION
 * @param callFun createApp, createVersion, modifyVersion
 */
export async function uploadPackage(
  type: string,
  params: UploadPackageParams,
  callFun?: (data: Omit<UploadPackageParams, 'base64Str'>) => any,
) {
  return callFun?.(params);
}

export async function uploadPackageFormData(
  type: string,
  params: UploadPackageParamsFormData,
  formData: FormData,
  callFun?: (data: UploadPackageParamsFormData, form: FormData) => any,
) {
  return callFun?.(params, formData);
}

export type FileError = string;

export function checkFile(uploadFile: File, type: string): FileError {
  const rule = Constants.UPLOAD_CHECK_RULES[type];

  if (!rule.format.test(uploadFile.name.toLocaleLowerCase())) {
    return `FILE_FORMAT_${type.toLocaleUpperCase()}`;
  }

  if (uploadFile.size > rule.size) {
    return `FILE_MAX_${type.toLocaleUpperCase()}`;
  }

  return '';
}

export function checkFileFormData(uploadFile: File, type: string): FileError {
  const rule = Constants.UPLOAD_CHECK_RULES[type];

  if (!rule.format.test(uploadFile.name.toLocaleLowerCase())) {
    return `FILE_FORMAT_${type.toLocaleUpperCase()}`;
  }

  return '';
}

export function validateImageSize(base64Str: string): Promise<any> {
  const image = new Image();
  image.src = base64Str;

  return new Promise(resolve => {
    image.addEventListener('load', async () => {
      let result = true;
      if (image.width > 512 || image.height > 512) {
        result = false;
      }
      resolve(result);
    });
  });
}

export async function downloadPackage(
  { appName, versionID, workspace }: BaseUrlParams,
  packageName: string,
): Promise<void> {
  const url = getBaseUrl({ appName, versionID, name: 'package', workspace }, 'versions');
  const result: any = await request.get(url);
  downloadFileFromBase64(result.package, packageName);
}

type FilesDetail = Record<string, string> | undefined;

type QueryFilesInput = Pick<BaseUrlParams, 'appName' | 'versionID' | 'workspace'>;

export function useQueryFiles(
  { appName, versionID, workspace }: QueryFilesInput,
  options?: UseQueryOptions<FilesDetail, Error>,
): UseQueryResult<FilesDetail, Error> {
  return useQuery<FilesDetail, Error>(
    ['files', appName, versionID],
    (): Promise<FilesDetail> => {
      if (options?.enabled === false) {
        return Promise.resolve(undefined);
      }
      return fetchAppFiles({ appName, versionID, workspace });
    },
    options,
  );
}
