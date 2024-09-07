/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Banner
  USER_DESC: '管理用户及其角色。',
  USER_PL: '用户',
  // List
  NOT_LOGIN_YET: '尚未登录',
  USER_EMPTY_DESC: '请创建一个用户。',
  USER_ACTIVE: '活跃',
  USER_AUTHLIMITEXCEEDED: '限制登录',
  USER_PENDING: '等待中',
  USER_DISABLED: '已禁用',
  LAST_LOGIN: '最近登录',
  // List > Create
  USERNAME_DESC:
    '用户名只能包含小写字母、数字、连字符（-）和句点（.），必须以小写字母或数字开头及结尾，最长 32 个字符。',
  PASSWORD_DESC:
    '密码必须包含至少一个数字、一个小写字母、一个大写字母和一个特殊字符（~!@#$%^&*()-_=+\\|[{}];:\'",<.>/? 或空格），长度为 8 到 64 个字符。',
  PASSWORD_INVALID_DESC: '密码无效。密码必须包含数字、大写字母和小写字母，长度为 8 至 64 个字符。',
  PLATFORM_ROLE_DESC: '设置用户在 KubeSphere 平台的角色。',
  USER_SETTING_EMAIL_DESC: '邮箱地址可用于登录 KubeSphere Web 控制台。',
  USERNAME_EXISTS: '用户名已存在，请输入其他用户名。',
  USERNAME_EMPTY_DESC: '请输入一个用户名。',
  PLATFORM_ROLE: '平台角色',
  CREATE_USER: '创建用户',
  EMAIL: '邮箱',
  EMAIL_EXISTS: '邮箱地址已存在，请输入其他邮箱地址。',
  USERNAME_INVALID: '用户名无效。{message}',
  USERNAME: '用户名',
  PASSWORD: '密码',
  // List > Edit
  EDIT_USER: '编辑用户',
  // List > Delete
  USER_LOW: '用户',
  DELETING_CURRENT_USER_NOT_ALLOWED: '无法删除当前用户。',
  // ListLayout -> NavTitle
  USER_AND_ROLE: 'Users and Roles',
};
