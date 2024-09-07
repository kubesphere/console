/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Title
  TOTAL_AUDITING_TODAY: '今日总共收录了 <span class={className}> {auditing} </span> 条审计日志',
  NO_AUDIT_LOG_TODAY: '今日没有收录的审计日志',
  AUDIT_LOG_TREND_LAST_TWELVE_HOURS: '最近 12 小时审计日志数量变化趋势',
  START_TIME_VALUE: '开始时间：{value}',
  // Search
  NO_DATA_AUTHORIZED: '没有数据授权',
  NO_DATA_AUTHORIZED_DESC: '请联系管理员获取数据授权。',
  TIME_RANGE_LAST: '时间范围：最近 {value}',
  TIME_RANGE_RANGE: '时间范围：{startTime} – {endTime}',
  // Querying Rules
  AUDIT_LOGS_12H: '最近 12 小时审计日志数量',
  AUDIT_LOG_WORKSPACE_TIP: '输入企业空间名称查找审计日志。',
  AUDIT_LOG_PROJECT_TIP: '输入项目名称查找审计日志。',
  AUDIT_LOG_RESOURCE_NAME_TIP: '输入资源名称查找审计日志。',
  AUDIT_LOG_RESOURCE_TYPE_TIP: '输入资源类型查找审计日志。',
  AUDIT_LOG_VERB_TIP: '输入操作行为查找审计日志。',
  AUDIT_LOG_STATUS_CODE_TIP: '输入状态码查找审计日志。',
  AUDIT_LOG_OPERATOR_TIP: '输入操作者查找审计日志。',
  AUDIT_LOG_SOURCE_IP_ADDRESS_TIP: '输入源 IP 地址查找审计日志。',
  SEARCH_BY_VERB: '按操作行为搜索',
  SEARCH_BY_STATUS_CODE: '按状态码搜索',
  SEARCH_BY_OPERATOR: '按操作者搜索',
  SEARCH_BY_SOURCE_IP_ADDRESS: '按源 IP 地址搜索',
  ENABLE_AUDIT_LOG_COLLECTION_DESC:
    '如果审计日志收集已禁用，您需要启用审计日志收集。 <a href="{link}" target="_blank">了解更多</a>',
};
