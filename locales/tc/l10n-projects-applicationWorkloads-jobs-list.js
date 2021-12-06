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
module.exports = {
  // Banner
  JOB_PL: 'Jobs',
  JOB_DESC: 'Jobs are used to perform short-lived, one-off tasks. A Job creates one or more Pods and ensures that a specific number of Pods successfully terminate.',
  // List
  JOB_EMPTY_DESC: 'Please create a Job.',
  JOB_COMPLETED: 'Completed',
  JOB_FAILED: 'Failed',
  JOB_RUNNING: 'Running',
  // List > Create > Basic Information
  // List > Create > Strategy Settings
  // List > Create > Pod Settings
  RESTART_POLICY_NEVER_DESC: 'Never（容器組出現故障時創建新的容器組）',
  RESTART_POLICY_ONFAILURE_DESC: 'On failure（容器組出現故障時内部重啟容器）',
  // List > Create > Volume Settings
  // List > Create > Advanced Settings
  // List > Edit Information
  // List > Rerun
  RERUN: '重新執行',
  // List > Delete
  JOB: '任務',
  JOB_LOW: 'Job'
};