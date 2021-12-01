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
  CRONJOBS: 'CronJobs',
  CRONJOB_DESC:
    'CronJobs manages Jobs on a time-based schedule and can be used to perform periodic or recurring tasks.',

  // List
  CRONJOB_PAUSED: 'Paused',
  CRONJOB_RUNNING: 'Running',
  CRONJOB_FAILED: 'Failed',

  // List > Create > Basic Information
  SCHEDULE: 'Schedule',
  ENTER_SCHEDULE_TIP: 'Please select a schedule.',
  CRONJOB_CRON_DESC:
    'Set a schedule for the CronJob. KubeSphere uses UTC by default and you need to adjust the schedule according to your time zone. <a href="//en.wikipedia.org/wiki/Cron" target="_blank">Learn More</a>',

  // List > Create > Advanced settings
  MAXIMUM_DELAY: 'Maximum Start Delay (s)',
  SUCCESSFUL_JOBS_RETAINED: 'Successful Jobs Retained',
  FAILED_JOBS_RETAINED: 'Failed Jobs Retained',
  CONCURRENCY_POLICY: 'Concurrency Policy',
  MAXIMUM_DELAY_DESC:
    'Maximum delay before starting a scheduled Job when the Job is missed for certain reasons.',
  CONCURRENCY_POLICY_DESC:
    'Policy adopted by the system when multiple Jobs of the CronJob overlap with each other.',
  FAILED_JOBS_RETAINED_DESC:
    'Number of failed Jobs allowed to be retained. The default value is 1.',
  SUCCESSFUL_JOBS_RETAINED_DESC:
    'Number of successful Jobs allowed to be retained. The default value is 3.',
  RUN_JOBS_CONCURRENTLY: 'Run Jobs concurrently',
  SKIP_NEW_JOB: 'Skip new Job',
  SKIP_OLD_JOB: 'Skip old Job',

  // List > Create > Strategy Settings
  STRATEGY_SETTINGS: 'Strategy Settings',
  MAXIMUM_RETRIES: 'Maximum Retries',
  MAXIMUM_RETRIES_DESC:
    'Maximum number of retries before the Job is marked as failed. The default value is 6.',
  PARALLEL_PODS_DESC: 'Number of Pods that run in parallel in the Job.',
  COMPLETE_PODS_DESC:
    'Number of complete Pods required for the Job to be marked as complete.',
  MAXIMUM_DURATION_DESC:
    'Maximum duration of the Job. The Job is terminated when it reaches the maximum duration.',
  PARALLEL_PODS: 'Parallel Pods',
  COMPLETE_PODS: 'Complete Pods',
  MAXIMUM_DURATION: 'Maximum Duration (s)',

  // List > Create > Pod Settings
  RESTART_POLICY: 'Restart Policy',
  RESTART_POLICY_DESC:
    'Select the policy adopted by the system when a container in the Pod exits abnormally.',

  // List > Create > Volume Settings
  // List > Create > Advanced Settings
  // List > Edit Information
  // List > Edit YAML
  // List > Pause
  // List > Delete
  CRONJOB_PL: 'Cronjobs',
  CRONJOB_LOW: 'cronjob',
}
