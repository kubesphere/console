export const queryKeyMapping = {
  workspace_filter: 'workspace_search',
  involved_object_namespace_filter: 'involved_object_namespace_search',
  involved_object_name_filter: 'involved_object_name_search',
  // involved_object_kind_filter: 'involved_object_kind_search',
  reason_filter: 'reason_search',
  message_search: 'message_search',
  type_filter: 'type_search',
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
    icon: 'listview',
    text: t('message'),
  },
  workspace_filter: {
    icon: 'magnifier',
    text: t('Workspace'),
  },
  involved_object_namespace_filter: {
    icon: 'project',
    text: t('Project'),
  },
  involved_object_name_filter: {
    icon: 'log',
    text: t('Resource Name'),
  },
  // involved_object_kind_filter: {
  //   icon: 'pod',
  //   text: t('Pod'),
  // },
  reason_filter: {
    icon: 'resource',
    text: t('reason'),
  },
  type_filter: {
    icon: 'table-chart',
    text: t('category'),
  },
}

export const queryModeOptions = [1, 0].map(mode => ({
  value: mode,
  label: mode ? t('Exact Query') : t('Fuzzy Query'),
}))
