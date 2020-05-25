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

export default {
  _all: 'All Projects',
  NUM_UNIT: '',
  DETAILS: 'Details',
  NODES: 'Nodes',
  NAME_DESC:
    'It can only contain lowercase letters, numbers and hyphens("-"), and must begin with a lowercase letter, ending with a number or lowercase letter. The maximum length of characters is set to 63.',
  LONG_NAME_DESC:
    'It can only contain lowercase letters, numbers and hyphens("-"), and must begin with a lowercase letter, ending with a number or lowercase letter. The maximum length of characters is set to 253.',
  NAME_TOO_LONG: 'The maximum length of characters is set to 63.',
  LONG_NAME_TOO_LONG: 'The maximum length of characters is set to 253.',
  DESCRIPTION_DESC:
    'The description will be added to the item as a comment and displayed in the details of the application, with the description is limited to 1000 characters.',
  SHORT_DESCRIPTION_DESC: 'Description is limited to 1000 characters.',
  PROJECT_DESC:
    'It will be grouped by project resources, which you can view and manage by project.',

  DELETE_TITLE: 'Sure to delete {type}?',
  DELETE_TIP:
    'Are you sure about deleting the {type} <strong>{resource}</strong> ? {type} cannot be recovered after being deleted.',
  DELETE_CONFIRM_TIP:
    'Please enter the {type} name <strong>{resource}</strong> to make sure you understand the risks associated with the operation.',
  DELETE_APP_RESOURCE_TIP:
    'Resource is managed by <strong>{app}</strong>, which may affect the normal use of this app if the resource is deleted. Please enter the {type} name <strong>{resource}</strong> to make sure you understand the risks associated with the operation.',
  DELETE_CONFIRM_PLACEHOLDER: 'Please enter {resource}',

  DELETE_RESOURCE_TITLE: 'Warning',
  DELETE_RESOURCE_TIP:
    'Are you sure about deleting the resource <strong>{resource}</strong> ? Resources cannot be recovered after being deleted.',

  DESTROY_TITLE: 'Sure to destroy ?',
  DESTROY_TIP:
    'Are you sure about destroying the {type} <strong>{resource}</strong> ?',

  LABEL_FORMAT_DESC:
    'The tag has a maximum of 63 characters for key and value, key is limited to 253 characters if contains a domain name. It can only contain upper and lower case letters, numbers, hyphens ("-"), underscores (_), and dots (.), and must begin and end with a number or letters.',
  add_: 'Add ',

  REMOVE_MEMBER_TIP:
    'Are you sure about removing the member <strong>{resource}</strong> ?',

  ALIAS_DESC:
    'Alias can be composed of any character to help you better distinguish resources.',

  NOT_ENABLE: '{resource} is not enabled',
  NOT_AVAILABLE: 'No available {resource}',
  NO_RESOURCE: 'No {resource}',
  RESOURCE_NOT_FOUND: 'Sorry, the resource is not found.',

  CREATE_TIME: 'Created {diff}',
  UPDATE_TIME: 'Updated {diff}',
  MONTH_AGO: '{count, plural, =1 {1 month} other {# months}} ago',
  MONTH_TIME: '{count, plural, =1 {1 month} other {# months}}',
  WEEK_AGO: '{count, plural, =1 {1 week} other {# weeks}} ago',
  WEEK_TIME: '{count, plural, =1 {1 week} other {# weeks}}',
  DAY_AGO: '{count, plural, =1 {1 day} other {# days}} ago',
  DAY_TIME: '{count, plural, =1 {1 day} other {# days}}',
  HOUR_AGO: '{count, plural, =1 {1 hour} other {# hours}} ago',
  HOUR_TIME: '{count, plural, =1 {1 hour} other {# hours}}',
  MINUTE_AGO: '{count, plural, =1 {1 minute} other {# minutes}} ago',
  MINUTE_TIME: '{count, plural, =1 {1 minute} other {# minutes}}',

  TOTAL_ITEMS: 'Total {num} items',

  EVENT_NORMAL: 'Normal',
  EVENT_WARNING: 'Warning',

  ASCENDING_ORDER: 'Ascending Order',
  DESCENDING_ORDER: 'Descending order',
  OPERATE: 'Operate',
  PLEASE_SELECT: 'Please select',
  FILTER: 'Filter',
  CANCEL: 'Cancel',
  NO_RESULTS_FOUND: 'No result found',
  REACH_BOTTOM: 'Reach bottom',
  QUOTA_LIMIT_TIP:
    'The configuration here refers to Limits in Kubernetes resource management, which is mainly used to limit the maximum value of resources used by each container.',

  NOT_FOUND_DESC:
    '🙇 Sorry, no related resources were found, the system will return to <a href="{link}">Workbench</a> after {time}s',
  DETAIL_NOT_FOUND_DESC:
    '🙇 Sorry, no related resources were found, back to <a href="{link}">{title}</a>',
  TOOLBOX_DESC: "The toolbox provides log search and cli's operating tools",
  PATTERN_NAME_INVALID_TIP:
    'Invalid name (Support lowercase letters, numbers and -)',
  CONTENT_NOT_SAVED_TIPS: 'content has been modified but not saved',
  SAVE_EDIT_HINTS:
    'please confirm that the modified content is correct, you can save the settings or cancel the settings.',

  KS_DESCRIPTION:
    'KubeSphere is an open source project aiming to provide enterprise-grade multi-tenant container platform which is on top of Kubernetes, the current mainstream container orchestration platform. It provides easy-to-use interface and wizard-style operations, reducing the learning curve and operating cost of Kubernetes in terms of the daily work of development, test and maintenance.',

  REPS_ADDRESS: 'GitHub',
  ISSUE_FEEDBACK: 'Feedback',
  PART_IN_DISCUSSION: 'Discussion',
  CODE_CONTRIBUTE: 'Contribution',
  GITHUB_STAR: 'Star',

  CONDITION_STATUS_ANALYSE: 'Conditions',

  NAV_PROJECTS: 'Projects',
  NAV_ACCOUNTS: 'Accounts',
  ALERT_WARNING: 'Warning',

  CREATE_STATUS_SUCCESS: 'Create successfully',
  CREATE_STATUS_UPDATING: 'Creating',
  CREATE_STATUS_FAILED: 'Create failed',

  EMPTY_WRAPPER: 'No {resource} Found',

  'rules text': 'How to define operational audit collection rules?',
  'rules desc':
    'KubeSphere can collect operation audits according to the rules you set. Click to see how to define the rules.',

  EVENT_CREATE_DESC: 'You can change the search criteria and search again.',
}
