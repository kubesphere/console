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
    text: t('Workspace'),
  },
  objectref_namespace_filter: {
    icon: 'project',
    text: t('Project'),
  },
  objectref_name_filter: {
    icon: 'strategy-group',
    text: t('Resource Name'),
  },
  objectref_resource_filter: {
    icon: 'resource',
    text: t('resources'),
  },
  verb_filter: {
    icon: 'wrench',
    text: t('verb'),
  },
  response_code_filter: {
    icon: 'logout',
    text: t('Status Code'),
  },
  user_filter: {
    icon: 'human',
    text: t('Operation Account'),
  },
  source_ip_search: {
    icon: 'ip',
    text: t('sourceIP'),
  },
}

export const queryModeOptions = [1, 0].map(mode => ({
  value: mode,
  label: mode ? t('Exact Query') : t('Fuzzy Query'),
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
    title: t('Search Auditing by', { field: t('Workspace') }),
    tips: t('Workspace Auditing Query Tip'),
    key: 'workspace_filter',
  },
  {
    icon: 'project',
    title: t('Search Auditing by', { field: t('Project') }),
    tips: t('Project Auditing Query Tip'),
    key: 'objectref_namespace_filter',
  },
  {
    icon: 'strategy-group',
    title: t('Search Auditing by', { field: t('Resource Name') }),
    tips: t('Resource Name Auditing Query Tip'),
    key: 'objectref_name_filter',
  },
  {
    icon: 'resource',
    title: t('Search Auditing by', { field: t('resources') }),
    tips: t('Resource Auditing Query Tip'),
    key: 'objectref_resource_filter',
  },
  {
    icon: 'wrench',
    title: t('Search Auditing by', { field: t('verb') }),
    tips: t('Verb Auditing Query Tip'),
    key: 'verb_filter',
  },
  {
    icon: 'logout',
    title: t('Search Auditing by', { field: t('Status Code') }),
    tips: t('Status Code Auditing Query Tip'),
    key: 'response_code_filter',
  },
  {
    icon: 'human',
    title: t('Search Auditing by', { field: t('Operation Account') }),
    tips: t('Operation Account Auditing Query Tip'),
    key: 'user_filter',
  },
  {
    icon: 'ip',
    title: t('Search Auditing by', { field: t('sourceIP') }),
    tips: t('sourceIP Auditing Query Tip'),
    key: 'source_ip_search',
  },
]
