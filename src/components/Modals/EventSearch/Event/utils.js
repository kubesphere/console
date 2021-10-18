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
    text: t('MESSAGE'),
  },
  workspace_filter: {
    icon: 'appcenter',
    text: t('WORKSPACE'),
  },
  involved_object_namespace_filter: {
    icon: 'project',
    text: t('PROJECT'),
  },
  involved_object_kind_filter: {
    icon: 'vnc',
    text: t('RESOURCE_TYPE'),
  },
  involved_object_name_filter: {
    icon: 'strategy-group',
    text: t('RESOURCE_NAME'),
  },
  reason_filter: {
    icon: 'resource',
    text: t('REASON'),
  },
  type_filter: {
    icon: 'cardview',
    text: t('CATEGORY'),
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
    icon: 'magnifier',
    title: t('SEARCH_BY_MESSAGE'),
    tips: t('RESOURCE_EVENT_MESSAGE_TIP'),
    key: 'message_search',
  },
  {
    icon: 'appcenter',
    title: t('SEARCH_BY_WORKSPACE'),
    tips: t('RESOURCE_EVENT_WORKSPACE_TIP'),
    key: 'workspace_filter',
  },
  {
    icon: 'project',
    title: t('SEARCH_BY_PROJECT'),
    tips: t('RESOURCE_EVENT_PROJECT_TIP'),
    key: 'involved_object_namespace_filter',
  },
  {
    icon: 'vnc',
    title: t('SEARCH_BY_RESOURCE_TYPE'),
    tips: t('RESOURCE_EVENT_RESOURCE_TYPE_TIP'),
    key: 'involved_object_kind_filter',
  },
  {
    icon: 'strategy-group',
    title: t('SEARCH_BY_RESOURCE_NAME'),
    tips: t('RESOURCE_EVENT_RESOURCE_NAME_TIP'),
    key: 'involved_object_name_filter',
  },
  {
    icon: 'resource',
    title: t('SEARCH_BY_REASON'),
    tips: t('RESOURCE_EVENT_REASON_TIP'),
    key: 'reason_filter',
  },
  {
    icon: 'cardview',
    title: t('SEARCH_BY_CATEGORY'),
    tips: t('RESOURCE_EVENT_CATEGORY_TIP'),
    key: 'type_filter',
  },
]
