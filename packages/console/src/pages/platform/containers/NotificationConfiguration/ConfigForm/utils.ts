/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { ReactNode } from 'react';
import { notify } from '@kubed/components';
import { cloneDeep, get, isArray, isEmpty, isObject, set, unset } from 'lodash';
import { getBaseInfo, getOriginData, parser, safeAtob, safeBtoa } from '@ks-console/shared';

import type { Condition } from './components/ControlSetting/types';
import type {
  ItemType,
  VerifyFn,
  MapperFn,
  DefaultMapper,
  TemplateMapper,
  BaseTemplate,
  ConfigFormData,
  FormNameMapType,
  BaseTemplateParam,
  ReceiverTemplateParam,
  VerifyTemplateParam,
} from './types';

function verifyDingTalk({ receiver, secret }: ConfigFormData): boolean {
  const keywords = get(receiver, 'spec.dingtalk.chatbot.keywords');
  const chatids = get(receiver, 'spec.dingtalk.conversation.chatids');
  const { appkey, appsecret, webhook, chatbotsecret } = get(secret, 'data', {});

  if (
    [appkey, appsecret, chatids, webhook, chatbotsecret, keywords].every(item =>
      isArray(item) ? isEmpty(item) : !item,
    )
  ) {
    notify.error(t('DINGTALK_SETTING_TIP'));
    return false;
  }

  if (appkey || appsecret || !isEmpty(chatids)) {
    if (!appkey) {
      notify.error(t('PLEASE_ENTER_APP_KEY'));
      return false;
    }

    if (!appsecret) {
      notify.error(t('PLEASE_ENTER_APP_SECRET'));
      return false;
    }

    if (isEmpty(chatids)) {
      notify.error(t('PLEASE_ENTER_CHAT_ID'));
      return false;
    }
  }

  if (webhook || chatbotsecret || !isEmpty(keywords)) {
    if (!webhook) {
      notify.error(t('PLEASE_ENTER_WEBHOOK_URL'));
      return false;
    }

    if (!chatbotsecret && isEmpty(keywords)) {
      notify.error(t('DINGTALK_CHATBOT_SECURITY_TIP'));
      return false;
    }
  }

  return true;
}

function verifyFeiShu({ receiver, secret }: ConfigFormData): boolean {
  const keywords = get(receiver, 'spec.feishu.chatbot.keywords');
  const department = get(receiver, 'spec.feishu.department', []);
  const user = get(receiver, 'spec.feishu.user', []);

  const { appkey, appsecret, webhook, chatbotsecret } = get(secret, 'data', {});

  if (
    [appkey, appsecret, webhook, chatbotsecret, keywords].every(item =>
      isArray(item) ? isEmpty(item) : !item,
    )
  ) {
    notify.error(t('DINGTALK_SETTING_TIP'));
    return false;
  }

  if (department.length > 0 || user.length > 0) {
    if (!appkey) {
      notify.error(t('PLEASE_ENTER_APP_ID'));
      return false;
    }

    if (!appsecret) {
      notify.error(t('PLEASE_ENTER_APP_SECRET'));
      return false;
    }
  }

  if (webhook || chatbotsecret || !isEmpty(keywords)) {
    if (!webhook) {
      notify.error(t('PLEASE_ENTER_WEBHOOK_URL'));
      return false;
    }
    if (!chatbotsecret && isEmpty(keywords)) {
      notify.error(t('DINGTALK_CHATBOT_SECURITY_TIP'));
      return false;
    }
  }

  return true;
}

// todo fix any type
function secretDataParser(data: any) {
  if (data.type === 'kubernetes.io/basic-auth') {
    return Object.entries(get(data, 'data', {})).reduce(
      (prev, [key, value]) => ({
        ...prev,
        [key]: safeAtob(value) === 'undefined' ? '' : safeAtob(value),
      }),
      {},
    );
  }

  return Object.entries(get(data, 'data', {})).reduce(
    (prev, [key, value]) => ({
      ...prev,
      [key]:
        key === '.dockerconfigjson' ? parser.safeParseJSON(safeAtob(value), {}) : safeAtob(value),
    }),
    {},
  );
}

export const getNotificationConfigTemplate = ({ name }: BaseTemplateParam): BaseTemplate => ({
  apiVersion: 'notification.kubesphere.io/v2beta2',
  kind: 'Config',
  metadata: {
    name,
  },
  spec: {},
});

export const getNotificationReceiverTemplate = ({
  name,
  type,
}: ReceiverTemplateParam): BaseTemplate => ({
  apiVersion: 'notification.kubesphere.io/v2beta2',
  kind: 'Receiver',
  metadata: {
    name,
  },
  spec: {
    [type]: {
      enabled: false,
    },
  },
});

export const getGlobalSecretTemplate = ({ name }: BaseTemplateParam): BaseTemplate => ({
  apiVersion: 'v1',
  kind: 'Secret',
  metadata: {
    name,
  },
  type: 'Opaque',
});

export function formatNameByFormId(id: string): FormNameMapType {
  return {
    configName: `default-${id}-config`,
    receiverName: `global-${id}-receiver`,
    secretName: `global-${id}-config-${id === 'slack' ? 'token' : 'secret'}`,
  };
}

export function getInitFormDataByFormId(id: string): ConfigFormData {
  const { configName, receiverName, secretName } = formatNameByFormId(id);

  return {
    config: getNotificationConfigTemplate({
      name: configName,
    }),
    receiver: getNotificationReceiverTemplate({
      name: receiverName,
      type: id,
    }),
    secret: getGlobalSecretTemplate({
      name: secretName,
    }),
  };
}

export function transformFormId(str: string): string {
  switch (str) {
    case 'mail':
      return 'email';
    case 'wecom':
      return 'wechat';
    default:
      return str;
  }
}

// export function initConfigFormsData(tabs: NavItem[]): Record<string, ConfigFormData> {
//   return tabs.reduce((acc, { name }: NavItem) => {
//     const key = name === 'mail' ? 'email' : name;
//     acc[key] = getInitFormDataByFormId(transformWeComFormId(key));
//     return acc;
//   }, {} as Record<string, ConfigFormData>);
// }

export function customMerge(objValue: unknown, srcValue: unknown): unknown {
  if (isArray(objValue) && !isEmpty(objValue)) {
    return srcValue;
  }

  if (isObject(srcValue)) {
    if (!Object.values(srcValue).every(val => !!val)) {
      if (isObject(objValue)) {
        return Object.assign(objValue, srcValue);
      }
    }
  }
}

export const getNotificationVerifyTemplate = ({
  user,
}: VerifyTemplateParam): Partial<ConfigFormData> => {
  return {
    config: {
      apiVersion: 'notification.kubesphere.io/v2beta2',
      kind: 'Config',
      metadata: {
        name: 'test-user-config',
        labels: {
          app: 'notification-manager',
          type: user ? 'tenant' : 'default',
          user,
        },
      },
      spec: {},
    },
    receiver: {
      apiVersion: 'notification.kubesphere.io/v2beta2',
      kind: 'Receiver',
      metadata: {
        name: 'test-user-receiver',
        labels: {
          app: 'notification-manager',
          type: user ? 'tenant' : 'global',
          user,
        },
      },
      spec: {},
    },
  };
};

export function getMailVerifyFormTemplate(data: ConfigFormData): ConfigFormData {
  const { config, receiver, secret } = cloneDeep(data);
  set(config, 'spec.email.authPassword.value', get(secret, 'data.authPassword'));
  unset(receiver, 'spec.email.alertSelector');

  return { config, receiver, secret };
}

export function getSlackVerifyFormTemplate(data: ConfigFormData): ConfigFormData {
  const { config, receiver, secret } = cloneDeep(data);
  set(config, 'spec.slack.slackTokenSecret.value', get(secret, 'data.token'));
  unset(receiver, 'spec.slack.alertSelector');
  unset(config, 'spec.slack.slackTokenSecret.valueFrom');

  return { config, receiver, secret };
}

export function getWeComVerifyFormTemplate(data: ConfigFormData): ConfigFormData {
  const { config, receiver, secret } = cloneDeep(data);
  set(config, 'spec.wechat.wechatApiSecret.value', get(secret, 'data.appsecret'));
  unset(receiver, 'spec.wechat.alertSelector');
  unset(config, 'spec.wechat.wechatApiSecret.valueFrom');

  return { config, receiver, secret };
}

export function getWebHookVerifyFormTemplate(data: ConfigFormData): Partial<ConfigFormData> {
  const { receiver, secret } = cloneDeep(data);
  const type = get(receiver, 'metadata.annotations["kubesphere.io/verify-type"]');
  const username = get(receiver, 'spec.webhook.httpConfig.basicAuth.username');
  const { password, token } = get(secret, 'data', {});

  unset(receiver, 'spec.webhook.httpConfig.bearerToken');
  unset(receiver, 'spec.webhook.httpConfig.basicAuth');

  if (type === 'basic' && password) {
    set(receiver, 'spec.webhook.httpConfig.basicAuth.password.value', password);
    set(receiver, 'spec.webhook.httpConfig.basicAuth.username', username);
  }
  if (type === 'token' && token) {
    set(receiver, 'spec.webhook.httpConfig.bearerToken.value', token);
  }

  unset(receiver, 'spec.webhook.alertSelector');

  return { receiver };
}

export function getFeiShuVerifyFormTemplate(data: ConfigFormData): Partial<ConfigFormData> {
  const template = {};
  const { receiver, secret } = cloneDeep(data);
  const keywords = get(receiver, 'spec.feishu.chatbot.keywords');
  const department = get(receiver, 'spec.feishu.department');
  const user = get(receiver, 'spec.feishu.user');

  const { appkey, appsecret, webhook, chatbotsecret } = get(secret, 'data', {});
  if (appkey) {
    set(template, 'config.spec.feishu.appID.value', appkey);
  }

  if (appsecret) {
    set(template, 'config.spec.feishu.appSecret.value', appsecret);
  }

  if (webhook) {
    set(template, 'receiver.spec.feishu.chatbot.webhook.value', webhook);
  }

  if (chatbotsecret) {
    set(template, 'receiver.spec.feishu.chatbot.secret.value', chatbotsecret);
  }

  if (!isEmpty(keywords)) {
    set(template, 'receiver.spec.feishu.chatbot.keywords', keywords);
  }

  if (!isEmpty(department)) {
    set(template, 'receiver.spec.feishu.department', department);
  }

  if (!isEmpty(user)) {
    set(template, 'receiver.spec.feishu.user', user);
  }

  return template;
}

export function getDingTalkVerifyFormTemplate(data: ConfigFormData): Partial<ConfigFormData> {
  const template = {};
  const { receiver, secret } = cloneDeep(data);
  const chatids = get(receiver, 'spec.dingtalk.conversation.chatids');
  const keywords = get(receiver, 'spec.dingtalk.chatbot.keywords');
  const { appkey, appsecret, webhook, chatbotsecret } = get(secret, 'data', {});

  if (appkey) {
    set(template, 'config.spec.dingtalk.conversation.appkey.value', appkey);
  }
  if (appsecret) {
    set(template, 'config.spec.dingtalk.conversation.appsecret.value', appsecret);
  }
  if (!isEmpty(chatids)) {
    set(template, 'receiver.spec.dingtalk.conversation.chatids', chatids);
  }
  if (webhook) {
    set(template, 'receiver.spec.dingtalk.chatbot.webhook.value', webhook);
  }
  if (chatbotsecret) {
    set(template, 'receiver.spec.dingtalk.chatbot.secret.value', chatbotsecret);
  }
  if (!isEmpty(keywords)) {
    set(template, 'receiver.spec.dingtalk.chatbot.keywords', keywords);
  }

  return template;
}

export const verifyTemplatesMap: Record<string, TemplateMapper> = {
  email: getMailVerifyFormTemplate,
  dingtalk: getDingTalkVerifyFormTemplate,
  feishu: getFeiShuVerifyFormTemplate,
  wechat: getWeComVerifyFormTemplate,
  slack: getSlackVerifyFormTemplate,
  webhook: getWebHookVerifyFormTemplate,
};

export const specialVerifyMap: Record<string, VerifyFn> = {
  feishu: verifyFeiShu,
  dingtalk: verifyDingTalk,
};

export function isNotValid(formId: string, data: ConfigFormData): boolean {
  if (['feishu', 'dingtalk'].includes(formId) && !specialVerifyMap[formId](data)) {
    return true;
  }

  return false;
}

export function updateConfigField(type: string, config: BaseTemplate): BaseTemplate {
  const newConfig = cloneDeep(config);
  const { secretName } = formatNameByFormId(type);

  if (type === 'email') {
    set(newConfig, 'spec.email.authPassword.valueFrom.secretKeyRef.key', 'authPassword');
    set(newConfig, 'spec.email.authPassword.valueFrom.secretKeyRef.name', secretName);
  }

  if (type === 'wechat') {
    set(newConfig, 'spec.wechat.wechatApiSecret.valueFrom.secretKeyRef.key', 'appsecret');
    set(newConfig, 'spec.wechat.wechatApiSecret.valueFrom.secretKeyRef.name', secretName);
  }

  return newConfig;
}

export function updateSecretField(type: string, secret: BaseTemplate): BaseTemplate {
  const { secretName } = formatNameByFormId(type);
  const secretTemplate = getGlobalSecretTemplate({ name: secretName });

  set(secretTemplate, 'data', secret);

  return secretTemplate;
}

export function encodeSecretData(secret: BaseTemplate): BaseTemplate {
  const secretData = get(secret, 'data');

  Object.keys(secretData).forEach(key => {
    secretData[key] = safeBtoa(secretData[key]);
  });

  return { ...secretData };
}

export function getFinalSubmitDataByFormId(type: string, data: ConfigFormData): ConfigFormData {
  const newConfig = updateConfigField(type, data.config);
  const newSecret = updateSecretField(type, encodeSecretData(data.secret));
  const newReceiver = cloneDeep(data.receiver);

  return { config: newConfig, secret: newSecret, receiver: newReceiver };
}

export function getSlackFinalConfig(data: ConfigFormData): ConfigFormData {
  const { config, secret, receiver } = cloneDeep(data);
  const { secretName } = formatNameByFormId('slack');
  const token = safeBtoa(get(secret, 'data.token'));

  set(config, 'spec.slack.slackTokenSecret.valueFrom.secretKeyRefkey.key', 'token');
  set(config, 'spec.slack.slackTokenSecret.valueFrom.secretKeyRefkey.name', secretName);

  set(secret, 'data.token', token);

  return {
    config,
    secret,
    receiver,
  };
}

export function getWebHookFinalConfig(data: ConfigFormData): ConfigFormData {
  const { config, receiver, secret } = cloneDeep(data);
  const { secretName } = formatNameByFormId('webhook');
  const type = get(receiver, 'metadata.annotations["kubesphere.io/verify-type"]');
  const username = get(receiver, 'spec.webhook.httpConfig.basicAuth.username');
  const password = safeBtoa(get(secret, 'data.password'));
  const token = safeBtoa(get(secret, 'data.token'));
  const secretTemplate = getGlobalSecretTemplate({ name: secretName });
  const secretData = {};

  unset(receiver, 'spec.webhook.httpConfig.bearerToken');
  unset(receiver, 'spec.webhook.httpConfig.basicAuth');

  if (type === 'basic') {
    set(secretData, 'password', password);
    set(receiver, 'spec.webhook.httpConfig.basicAuth.username', username);
    set(receiver, 'spec.webhook.httpConfig.basicAuth.password.key', 'password');
    set(receiver, 'spec.webhook.httpConfig.basicAuth.password.name', secretName);
  }

  if (type === 'token') {
    set(secretData, 'token', token);
    set(receiver, 'spec.webhook.httpConfig.bearerToken.key', 'token');
    set(receiver, 'spec.webhook.httpConfig.bearerToken.name', secretName);
  }

  set(secretTemplate, 'data', secretData);

  return {
    config,
    receiver,
    secret: secretTemplate,
  };
}

export function dataMapper(module: string): MapperFn | DefaultMapper {
  if (module === 'secrets') {
    return (item: ItemType) => ({
      ...getBaseInfo(item),
      namespace: get(item, 'metadata.namespace'),
      labels: get(item, 'metadata.labels', {}),
      annotations: get(item, 'metadata.annotations', {}),
      type: get(item, 'type', ''),
      data: secretDataParser(item),
      _originData: getOriginData(item),
    });
  }

  return (item: ItemType) => item;
}

export function getFilterParams(params: Record<string, unknown>): Record<string, unknown> {
  const result = { ...params };
  if (result.app) {
    result.labelSelector = result.labelSelector || '';
    result.labelSelector += `app.kubernetes.io/name=${result.app}`;
    delete result.app;
  }

  return result;
}

export function checkConditionValid(cond: Condition): boolean {
  return !!cond.key && !!cond.operator;
}

export function notifyError(message: ReactNode, noDuration?: boolean): void {
  if (noDuration) {
    notify.error(message as any);
    return;
  }

  notify.error(message as any, { duration: 1000 });
}
