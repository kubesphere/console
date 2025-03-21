/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
// import qs from 'qs';
import { set, merge, get, toString } from 'lodash';
import { getClusterUrl } from './urlHelper';
import { GlobalMessage } from '../types';
import { useEventEmitter } from '../hooks/useEventEmitter';

export function getRequestUrl(url: string = '') {
  const formatUrl = url.startsWith('http') ? url : `/${url.trimLeft()}`;
  return getClusterUrl(formatUrl);
}

function formatError(response: AxiosResponse): GlobalMessage {
  const { data, status } = response;

  if (typeof data === 'object') {
    return {
      status,
      reason: data.reason || '',
      message: data.message || '',
      response,
    };
  }

  return {
    status,
    reason: data.reason,
    message: toString(data.message ?? data?.ErrStatus?.message ?? data),
    response,
  };
}

axios.interceptors.request.use((config: AxiosRequestConfig) => {
  config.url = getRequestUrl(config.url);

  if (config.method?.toUpperCase() === 'POST' && config.data?.metadata) {
    set(config.data, 'metadata.annotations["kubesphere.io/creator"]', globals.user.username);
    if (get(config.data, 'spec.template')) {
      set(
        config.data,
        'spec.template.metadata.annotations["kubesphere.io/creator"]',
        globals.user.username,
      );
    }
  }

  if (config.headers) {
    config.headers = merge(
      {
        'content-type':
          config.method?.toUpperCase() === 'PATCH'
            ? 'application/merge-patch+json'
            : 'application/json',
      },
      config.headers,
    );
  }

  const isMonitoringUrl = config.url?.includes('monitoring.kubesphere.io');
  const hasMonitoring = globals?.ksConfig?.['whizard-monitoring'];

  if (isMonitoringUrl && !hasMonitoring) {
    config.headers = merge({ 'x-ignore-error-notify': 'true' }, config.headers);
  }

  return config;
}, Promise.reject);

axios.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    if (!error.response.config.headers['x-ignore-error-notify']) {
      const msg = formatError(error.response);
      const { $emit } = useEventEmitter();
      $emit('globalMsg', msg);
    }
    console.warn(error);
    return Promise.reject(error);
  },
);

export default axios;
