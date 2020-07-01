export const queryKeyMapping = {
  workspace_filter: 'workspace_search',
  involved_object_namespace_filter: 'involved_object_namespace_search',
  involved_object_kind_filter: 'involved_object_kind_filter',
  involved_object_name_filter: 'involved_object_name_search',
  reason_filter: 'reason_search',
  message_search: 'message_search',
  type_filter: 'type_filter',
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
  message_search: {
    icon: 'magnifier',
    text: t('Message'),
  },
  workspace_filter: {
    icon: 'appcenter',
    text: t('Workspace'),
  },
  involved_object_namespace_filter: {
    icon: 'project',
    text: t('Project'),
  },
  involved_object_kind_filter: {
    icon: 'vnc',
    text: t('Resource Type'),
  },
  involved_object_name_filter: {
    icon: 'strategy-group',
    text: t('Resource Name'),
  },
  reason_filter: {
    icon: 'resource',
    text: t('Reason'),
  },
  type_filter: {
    icon: 'cardview',
    text: t('Category'),
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
    icon: 'magnifier',
    title: t('Search Events by', { field: t('Message') }),
    tips: t('Message Event Query Tip'),
    key: 'message_search',
  },
  {
    icon: 'appcenter',
    title: t('Search Events by', { field: t('Workspace') }),
    tips: t('Workspace Event Query Tip'),
    key: 'workspace_filter',
  },
  {
    icon: 'project',
    title: t('Search Events by', { field: t('Project') }),
    tips: t('Project Event Query Tip'),
    key: 'involved_object_namespace_filter',
  },
  {
    icon: 'vnc',
    title: t('Search Events by', { field: t('Resource Type') }),
    tips: t('Resource Type Event Query Tip'),
    key: 'involved_object_kind_filter',
  },
  {
    icon: 'strategy-group',
    title: t('Search Events by', { field: t('Resource Name') }),
    tips: t('Resource Name Event Query Tip'),
    key: 'involved_object_name_filter',
  },
  {
    icon: 'resource',
    title: t('Search Events by', { field: t('Reason') }),
    tips: t('Reason Event Query Tip'),
    key: 'reason_filter',
  },
  {
    icon: 'cardview',
    title: t('Search Events by', { field: t('Category') }),
    tips: t('Category Event Query Tip'),
    key: 'type_filter',
  },
]
