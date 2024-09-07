/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { notify } from '@kubed/components';
import { request, useUrl, safeBtoa } from '@ks-console/shared';
import { cloneDeep, get, isEmpty, set, unset } from 'lodash';

import { LIST_DEFAULT_ORDER } from '../constants';
import type {
  FormStatus,
  BaseTemplate,
  ConfigFormData,
  ConfigurationResponse,
  SubmitHandlerMapType,
} from './types';
import {
  dataMapper,
  getFilterParams,
  formatNameByFormId,
  getSlackFinalConfig,
  getWebHookFinalConfig,
  getGlobalSecretTemplate,
  getInitFormDataByFormId,
  getFinalSubmitDataByFormId,
} from './utils';

const apiVersion = 'kapis/notification.kubesphere.io/v2beta2';

// todo fix the any type
function getResourceUrl(module: string, params: any, version?: string): string {
  const { getPath } = useUrl({ module });
  return `${version ? version : apiVersion}${getPath(params)}/${module}`;
}

// todo replace fetchList of useList
export async function fetchList(module: string, { more, user, ...params }: any) {
  if (!params.sortBy && params.ascending === undefined) {
    params.sortBy = LIST_DEFAULT_ORDER[module] || 'createTime';
  }

  if (params.limit === Infinity || params.limit === -1) {
    params.limit = -1;
    params.page = 1;
  }

  params.limit = params.limit || 10;

  const filteredParams = getFilterParams(params);
  const result = await request.get(getResourceUrl(module, { user }), { params: filteredParams });
  const data = (get(result, 'items') || []).map(dataMapper(module));

  // todo update list
  // this.list.update({
  //   data: more ? [...this.list.data, ...data] : data,
  //   total:
  //     result.totalItems ||
  //     result.total_count ||
  //     result.total ||
  //     data.length ||
  //     0,
  //   ...params,
  //   limit: Number(params.limit) || 10,
  //   page: Number(params.page) || 1,
  //   isLoading: false,
  //   ...(this.list.silent ? {} : { selectedRowKeys: [] }),
  // })

  return data;
}

async function fetchConfigFieldFirst(formId: string): Promise<ConfigurationResponse> {
  let shouldUpdateFormStatus: FormStatus = 'create';
  const dummyFormData = cloneDeep(getInitFormDataByFormId(formId));
  const configs = await fetchList('configs', { type: formId });
  const { configName, receiverName, secretName } = formatNameByFormId(formId);
  const config = configs.find((item: any) => get(item, 'metadata.name') === configName);

  if (!isEmpty(config)) {
    const [receivers, secrets] = await Promise.all([
      fetchList('receivers', {
        name: receiverName,
      }),
      fetchList('secrets', { name: secretName }),
    ]);

    if (formId === 'slack') {
      set(dummyFormData, 'config', config);
    } else {
      set(dummyFormData, 'config.spec', config.spec);
    }

    if (formId === 'email') {
      set(dummyFormData, 'receiver', get(receivers, '[0]', {}));
    } else {
      set(dummyFormData, 'receiver.spec', get(receivers, '[0].spec', {}));
    }

    set(dummyFormData, 'secret.data', get(secrets, '[0].data', {}));

    shouldUpdateFormStatus = 'update';
  }

  return {
    status: shouldUpdateFormStatus,
    data: { ...dummyFormData },
  };
}

async function fetchAllFields(formId: string): Promise<ConfigurationResponse> {
  const dummyFormData = cloneDeep(getInitFormDataByFormId(formId));
  const { configName, receiverName, secretName } = formatNameByFormId(formId);

  const [configs, receivers, secrets] = await Promise.all([
    fetchList('configs', { type: formId }),
    fetchList('receivers', {
      name: receiverName,
    }),
    fetchList('secrets', { name: secretName }),
  ]);
  const config = configs.find((item: any) => get(item, 'metadata.name') === configName);

  if (config) set(dummyFormData, 'config', config);
  set(dummyFormData, 'receiver.spec', get(receivers, '[0].spec', {}));
  set(dummyFormData, 'secret.data', get(secrets, '[0].data', {}));

  return { data: { ...dummyFormData } };
}

async function fetchWithoutConfigField(formId: string): Promise<ConfigurationResponse> {
  const dummyFormData: ConfigFormData = cloneDeep(getInitFormDataByFormId(formId));
  const { receiverName, secretName } = formatNameByFormId(formId);

  const receivers = await fetchList('receivers', { type: formId });
  const receiver = receivers.find((item: any) => get(item, 'metadata.name') === receiverName);

  if (!isEmpty(receiver)) {
    const secrets = await fetchList('secrets', { name: secretName });
    set(dummyFormData, 'receiver', receiver);
    set(dummyFormData, 'data.secret.data', get(secrets, '[0].data', {}));
    set(dummyFormData, 'status', 'update');
  }

  return { data: { ...dummyFormData } };
}

function deleteConfiguration(module: string, params: any): Promise<any> {
  const { getDetailUrl } = useUrl({ getPathFn: () => `${apiVersion}`, module });

  return request.delete(getDetailUrl(params));
}

async function updateConfiguration(module: string, newObject: BaseTemplate, params: any) {
  const { getDetailUrl } = useUrl({ getPathFn: () => `${apiVersion}`, module });
  const detailUrl = getDetailUrl(params);
  const detail = await request.get(detailUrl);
  const resourceVersion = get(detail, 'metadata.resourceVersion');

  if (resourceVersion) {
    set(newObject, 'metadata.resourceVersion', resourceVersion);
  }

  return request.put(detailUrl, newObject);
}

async function getResource(module: string, params: any): Promise<boolean> {
  const { getDetailUrl } = useUrl({ getPathFn: () => `${apiVersion}`, module });
  const result = await request.get(getDetailUrl(params), {});
  const resourceVersion = get(result, 'metadata.resourceVersion');

  return resourceVersion !== undefined;
}

export function createConfiguration(
  module: string,
  data: BaseTemplate,
  params?: any,
): Promise<any> {
  const { getListUrl } = useUrl({ getPathFn: () => `${apiVersion}`, module });
  const url = getListUrl(params ?? {});

  return request.post(url, data);
}

async function normalConfigSubmitHandler(
  type: string,
  data: ConfigFormData,
  formStatus: FormStatus,
): Promise<void> {
  const { configName, secretName, receiverName } = formatNameByFormId(type);

  if (formStatus === 'create') {
    if (type !== 'webhook') {
      await createConfiguration('configs', data.config);
    }
    await createConfiguration('secrets', data.secret);
    await createConfiguration('receivers', data.receiver);
    notify.success(t('ADDED_SUCCESS_DESC'), { duration: 1000 });
    return;
  }

  if (type !== 'slack') {
    await updateConfiguration('configs', data.config, { name: configName });
  }
  await updateConfiguration('secrets', data.secret, { name: secretName });
  await updateConfiguration('receivers', data.receiver, { name: receiverName });
  notify.success(t('UPDATE_SUCCESSFUL'), { duration: 1000 });
}

async function getResourceExitStatusByConfigId(id: string): Promise<Record<string, boolean>> {
  const { configName, receiverName, secretName } = formatNameByFormId(id);
  const [isExitConfig, isExitReceiver, isExitSecret] = await Promise.all([
    getResource('configs', { name: configName }),
    getResource('receivers', { name: receiverName }),
    getResource('secrets', { name: secretName }),
  ]);

  return {
    isExitConfig,
    isExitReceiver,
    isExitSecret,
  };
}

async function feishuConfigSubmitHandler(data: ConfigFormData): Promise<void> {
  const { config, receiver, secret } = cloneDeep(data);
  const { configName, receiverName, secretName } = formatNameByFormId('feishu');
  // todo use encodeSecretData
  const secretData = get(secret, 'data', {});

  Object.keys(secretData).forEach(key => {
    secretData[key] = safeBtoa(secretData[key]);
  });

  set(config, 'spec.feishu.appID.valueFrom.secretKeyRef.key', 'appkey');
  set(config, 'spec.feishu.appID.valueFrom.secretKeyRef.name', secretName);
  set(config, 'spec.feishu.appSecret.valueFrom.secretKeyRef.name', secretName);
  set(config, 'spec.feishu.appSecret.valueFrom.secretKeyRef.key', 'appsecret');

  set(receiver, 'spec.feishu.chatbot.webhook.valueFrom.secretKeyRef.key', 'webhook');
  set(receiver, 'spec.feishu.chatbot.webhook.valueFrom.secretKeyRef.name', secretName);
  set(receiver, 'spec.feishu.chatbot.secret.valueFrom.secretKeyRef.key', 'chatbotsecret');
  set(receiver, 'spec.feishu.chatbot.secret.valueFrom.secretKeyRef.name', secretName);

  if (!secretData.appkey) {
    unset(config, 'spec.feishu.appID');
  }

  if (!secretData.appsecret) {
    unset(config, 'spec.feishu.appSecret');
  }

  const conversation = get(config, 'spec.dingtalk');

  if (isEmpty(conversation)) {
    unset(config, 'spec.feishu');
  }

  if (!secretData.webhook) {
    unset(receiver, 'spec.feishu.chatbot.webhook');
  }
  if (!secretData.chatbotsecret) {
    unset(receiver, 'spec.feishu.chatbot.secret');
  }

  if (isEmpty(get(receiver, 'spec.feishu.chatbot.keywords'))) {
    unset(receiver, 'spec.feishu.chatbot.keywords');
  }

  if (isEmpty(get(receiver, 'spec.feishu.chatbot'))) {
    unset(receiver, 'spec.feishu.chatbot');
  }

  const { isExitConfig, isExitReceiver, isExitSecret } =
    await getResourceExitStatusByConfigId('feishu');

  if (isExitConfig) {
    if (isEmpty(get(config, 'spec.feishu'))) {
      await deleteConfiguration('configs', { name: configName });
    } else {
      await updateConfiguration('configs', config, { name: configName });
    }
  } else {
    unset(config, 'metadata.resourceVersion');
    await createConfiguration('configs', config);
  }

  if (isExitReceiver) {
    await updateConfiguration('receivers', receiver, { name: receiverName });
  } else {
    await createConfiguration('receivers', receiver);
  }

  const secretTemplate = getGlobalSecretTemplate({ name: secretName });
  set(secretTemplate, 'data', secretData);

  if (isExitSecret) {
    await updateConfiguration('secrets', secretTemplate, { name: secretName });
  } else {
    await createConfiguration('secrets', secretTemplate);
  }

  notify.success(t('UPDATE_SUCCESSFUL'), { duration: 1000 });
}

async function dingTalkConfigSubmitHandler(data: ConfigFormData): Promise<void> {
  const { config, receiver, secret } = cloneDeep(data);
  const { configName, receiverName, secretName } = formatNameByFormId('dingtalk');
  const secretTemplate = getGlobalSecretTemplate({ name: secretName });
  // todo use encodeSecretData
  const secretData = get(secret, 'data', {});

  Object.keys(secretData).forEach(key => {
    secretData[key] = safeBtoa(secretData[key]);
  });

  set(config, 'spec.dingtalk.conversation.appkey.valueFrom.secretKeyRef.key', 'appkey');
  set(config, 'spec.dingtalk.conversation.appkey.valueFrom.secretKeyRef.name', secretName);
  set(config, 'spec.dingtalk.conversation.appsecret.valueFrom.secretKeyRef.key', 'appsecret');
  set(config, 'spec.dingtalk.conversation.appsecret.valueFrom.secretKeyRef.name', secretName);

  set(receiver, 'spec.dingtalk.chatbot.webhook.valueFrom.secretKeyRef.key', 'webhook');
  set(receiver, 'spec.dingtalk.chatbot.webhook.valueFrom.secretKeyRef.name', secretName);
  set(receiver, 'spec.dingtalk.chatbot.secret.valueFrom.secretKeyRef.key', 'chatbotsecret');
  set(receiver, 'spec.dingtalk.chatbot.secret.valueFrom.secretKeyRef.name', secretName);

  set(secretTemplate, 'data', secretData);

  if (!secretData.appkey) {
    unset(config, 'spec.dingtalk.conversation.appkey');
  }

  if (!secretData.appsecret) {
    unset(config, 'spec.dingtalk.conversation.appsecret');
  }

  const conversation = get(config, 'spec.dingtalk.conversation');

  if (isEmpty(conversation)) {
    unset(config, 'spec.dingtalk.conversation');
  }

  if (!secretData.webhook) {
    unset(receiver, 'spec.dingtalk.chatbot.webhook');
  }

  if (!secretData.chatbotsecret) {
    unset(receiver, 'spec.dingtalk.chatbot.secret');
  }

  if (isEmpty(get(receiver, 'spec.dingtalk.conversation.chatids'))) {
    unset(receiver, 'spec.dingtalk.conversation');
  }

  if (isEmpty(get(receiver, 'spec.dingtalk.chatbot.keywords'))) {
    unset(receiver, 'spec.dingtalk.chatbot.keywords');
  }

  if (isEmpty(get(receiver, 'spec.dingtalk.chatbot'))) {
    unset(receiver, 'spec.dingtalk.chatbot');
  }

  const { isExitConfig, isExitReceiver, isExitSecret } =
    await getResourceExitStatusByConfigId('dingtalk');

  if (isExitConfig) {
    if (isEmpty(get(receiver, 'spec.dingtalk.conversation.chatids'))) {
      await deleteConfiguration('configs', { name: configName });
    } else {
      await updateConfiguration('configs', config, { name: configName });
    }
  } else {
    unset(config, 'metadata.resourceVersion');
    await createConfiguration('configs', config);
  }

  if (isExitReceiver) {
    await updateConfiguration('receivers', receiver, { name: receiverName });
  } else {
    await createConfiguration('receiver', receiver);
  }

  if (isExitSecret) {
    await updateConfiguration('secrets', secretTemplate, { name: secretName });
  } else {
    await createConfiguration('secrets', secretTemplate);
  }

  notify.success(t('UPDATE_SUCCESSFUL'), { duration: 1000 });
}

const specialSubmitHandlerMap: SubmitHandlerMapType = {
  feishu: feishuConfigSubmitHandler,
  dingtalk: dingTalkConfigSubmitHandler,
};

export async function fetchDataByFormId(formId: string): Promise<ConfigurationResponse> {
  let response: ConfigurationResponse = { data: getInitFormDataByFormId(formId), status: 'create' };

  if (['dingtalk', 'feishu'].includes(formId)) {
    response = await fetchAllFields(formId);
  }

  if (['email', 'wechat', 'slack'].includes(formId)) {
    response = await fetchConfigFieldFirst(formId);
  }

  if (formId === 'webhook') {
    response = await fetchWithoutConfigField(formId);
  }

  return {
    data: response.data,
    status: response.status,
  };
}

export function checkInfo(data: Partial<ConfigFormData>, params: any): Promise<any> {
  const url = getResourceUrl(
    'verification',
    params,
    'kapis/notification.kubesphere.io/v2beta2/configs/notification',
  );

  return request.post(url, data);
}

export function submitForm(
  formId: string,
  data: ConfigFormData,
  formStatus: FormStatus,
): Promise<void> {
  if (['feishu', 'dingtalk'].includes(formId)) {
    return specialSubmitHandlerMap[formId](data);
  }

  let finalData = {} as ConfigFormData;
  if (['email', 'wechat'].includes(formId)) {
    finalData = getFinalSubmitDataByFormId(formId, data);
  }

  if (formId === 'slack') {
    finalData = getSlackFinalConfig(data);
  }

  if (formId === 'webhook') {
    finalData = getWebHookFinalConfig(data);
  }

  return normalConfigSubmitHandler(formId, finalData, formStatus);
}
