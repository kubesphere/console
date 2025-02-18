/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Banner
  JOB_PL: 'Jobs',
  JOB_DESC:
    'Jobs are used to perform short-lived, one-off tasks. A Job creates one or more Pods and ensures that a specific number of Pods successfully terminate.',
  // List
  JOB_EMPTY_DESC: 'Please create a Job.',
  JOB_COMPLETED: '已完成',
  JOB_FAILED: '失敗',
  JOB_RUNNING: '運行中',
  LAST_RUN_TIME: 'Last Run Time',
  // List > Create > Basic Information
  // List > Create > Strategy Settings
  // List > Create > Pod Settings
  RESTART_POLICY_NEVER_DESC: 'Re-create pod',
  RESTART_POLICY_ONFAILURE_DESC: 'On failure（容器組出現故障時内部重啟容器）',
  // List > Create > Storage Settings
  // List > Create > Advanced Settings
  // List > Edit Information
  // List > Rerun
  RERUN: '重新執行',
  OPERATION_SUCCESS: '操作成功',
  OPERATION_FAILED: '操作失敗',
  // List > Delete
  JOB: '任務',
  JOB_LOW: 'Job',
};
