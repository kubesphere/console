/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Banner
  USER_DESC: 'Manage users and their roles.',
  USER_PL: 'Users',
  // List
  NOT_LOGIN_YET: 'Not logged in yet',
  USER_EMPTY_DESC: 'Please create a user.',
  USER_ACTIVE: 'Active',
  USER_AUTHLIMITEXCEEDED: 'Login restricted',
  USER_PENDING: 'Pending',
  USER_DISABLED: 'Disabled',
  LAST_LOGIN: 'Last Login',
  // List > Create
  USERNAME_DESC:
    'The username can contain only lowercase letters, numbers, hyphens (-), and dots (.), and must start and end with a lowercase letter or number. The maximum length is 32 characters.',
  PASSWORD_DESC:
    'The password must contain at least one number, one lowercase letter, one uppercase letter, and one special character (~!@#$%^&*()-_=+\\|[{}];:\'",<.>/? or space). The length must be 8 to 64 characters.',
  PASSWORD_INVALID_DESC:
    'Invalid password. The password must contain at least one number, one lowercase letter, and one uppercase letter. The length must be 8 to 64 characters.',
  PLATFORM_ROLE_DESC: 'Set the role of the user on the KubeSphere platform.',
  USER_SETTING_EMAIL_DESC: 'The email address can be used to log in to the KubeSphere web console.',
  USERNAME_EXISTS: 'The username already exists. Please enter another username.',
  USERNAME_EMPTY_DESC: 'Please enter a username.',
  PLATFORM_ROLE: 'Platform Role',
  CREATE_USER: 'Create User',
  EMAIL: 'Email',
  EMAIL_EXISTS: 'The email address already exists. Please enter another email address.',
  USERNAME_INVALID: 'Invalid username. {message}',
  USERNAME: 'Username',
  PASSWORD: 'Password',
  // List > Edit
  EDIT_USER: 'Edit User',
  // List > Delete
  USER_LOW: 'User',
  DELETING_CURRENT_USER_NOT_ALLOWED: 'The current user cannot be deleted.',
  // ListLayout -> NavTitle
  USER_AND_ROLE: 'Users and Roles',
};
