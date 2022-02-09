/*
 * This file is part of KubeSphere Console.
 * Copyright (C) 2019 The KubeSphere Console Authors.
 *
 * KubeSphere Console is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * KubeSphere Console is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with KubeSphere Console.  If not, see <https://www.gnu.org/licenses/>.
 */

export const httpcodes = {
  100: 'Continue',
  101: 'Switching Protocols',
  200: 'OK',
  201: 'Created',
  202: 'Accepted',
  203: 'Non-Authoritative Information',
  204: 'No Content',
  205: 'Reset Content',
  206: 'Partial Content',
  300: 'Multiple Choices',
  301: 'Moved Permanently',
  302: 'Found',
  303: 'See Other',
  304: 'Not Modified',
  305: 'Use Proxy',
  307: 'Temporary Redirect',
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  406: 'Not Acceptable',
  407: 'Proxy Authentication Required',
  408: 'Request Time-out',
  409: 'Conflict',
  410: 'Gone',
  411: 'Length Required',
  412: 'Precondition Failed',
  413: 'Request Entity Too Large',
  414: 'Request-URI Too Large',
  415: 'Unsupported Media Type',
  416: 'Requested range not satisfiable',
  417: 'Expectation Failed',
  500: 'Internal Server Error',
  501: 'Not Implemented',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Time-out',
  505: 'HTTP Version not supported',
}

export const queryKeyMapping = {
  workspace_filter: 'workspace_search',
  objectref_namespace_filter: 'objectref_namespace_search',
  objectref_name_filter: 'objectref_name_search',
  objectref_resource_filter: 'objectref_resource_filter',
  verb_filter: 'verb_filter',
  response_code_filter: 'response_code_filter',
  user_filter: 'user_search',
  source_ip_search: 'source_ip_search',
}

export function toArray(data = {}, level = 0) {
  const newdata = []
  const keys = Object.keys(data)
  const newLevel = level + 1
  for (let i = 0, len = keys.length; i < len; i++) {
    const key = keys[i]
    if (typeof data[key] === 'object' && data[key] != null) {
      const value = data[key]
      const newValue = toArray(value, newLevel)
      newdata.push({ [key]: newValue, collapsed: false, level })
    } else {
      newdata.push({ [key]: data[key], level })
    }
  }
  return newdata
}

export const dropDownItems = {
  workspace_filter: {
    icon: 'appcenter',
    text: t('WORKSPACE'),
  },
  objectref_namespace_filter: {
    icon: 'project',
    text: t('PROJECT'),
  },
  objectref_resource_filter: {
    icon: 'resource',
    text: t('RESOURCE_TYPE'),
  },
  objectref_name_filter: {
    icon: 'strategy-group',
    text: t('RESOURCE_NAME'),
  },
  verb_filter: {
    icon: 'wrench',
    text: t('VERB'),
  },
  response_code_filter: {
    icon: 'logout',
    text: t('STATUS_CODE'),
  },
  user_filter: {
    icon: 'human',
    text: t('OPERATOR'),
  },
  source_ip_search: {
    icon: 'ip',
    text: t('SOURCE_IP_ADDRESS'),
  },
}

export const queryModeOptions = [1, 0].map(mode => ({
  value: mode,
  label: mode ? t('EXACT_QUERY') : t('FUZZY_QUERY'),
}))

export const getSecond = step => {
  const [, count = 0, unit = 's'] = step.match(/(\d+)(\w+)/)
  const unitMap = {
    s: 1,
    m: 60,
    h: 60 * 60,
    d: 60 * 60 * 24,
  }
  return count * unitMap[unit]
}

export const supportQueryParams = [
  {
    icon: 'appcenter',
    title: t('SEARCH_BY_WORKSPACE'),
    tips: t('AUDIT_LOG_WORKSPACE_TIP'),
    key: 'workspace_filter',
  },
  {
    icon: 'project',
    title: t('SEARCH_BY_PROJECT'),
    tips: t('AUDIT_LOG_PROJECT_TIP'),
    key: 'objectref_namespace_filter',
  },
  {
    icon: 'resource',
    title: t('SEARCH_BY_RESOURCE_TYPE'),
    tips: t('AUDIT_LOG_RESOURCE_TYPE_TIP'),
    key: 'objectref_resource_filter',
  },
  {
    icon: 'strategy-group',
    title: t('SEARCH_BY_RESOURCE_NAME'),
    tips: t('AUDIT_LOG_RESOURCE_NAME_TIP'),
    key: 'objectref_name_filter',
  },
  {
    icon: 'wrench',
    title: t('SEARCH_BY_VERB'),
    tips: t('AUDIT_LOG_VERB_TIP'),
    key: 'verb_filter',
  },
  {
    icon: 'logout',
    title: t('SEARCH_BY_STATUS_CODE'),
    tips: t('AUDIT_LOG_STATUS_CODE_TIP'),
    key: 'response_code_filter',
  },
  {
    icon: 'human',
    title: t('SEARCH_BY_OPERATOR'),
    tips: t('AUDIT_LOG_OPERATOR_TIP'),
    key: 'user_filter',
  },
  {
    icon: 'ip',
    title: t('SEARCH_BY_SOURCE_IP_ADDRESS'),
    tips: t('AUDIT_LOG_SOURCE_IP_ADDRESS_TIP'),
    key: 'source_ip_search',
  },
]
