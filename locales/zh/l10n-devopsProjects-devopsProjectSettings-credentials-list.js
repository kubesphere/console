/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Banner
  CREDENTIAL_PL: '凭证',
  DEVOPS_CREDENTIALS_DESC:
    '凭证是包含了一些敏感数据的对象，如用户名密码，SSH 密钥和 Token 等, 用于在 Pipeline 运行时, 为拉取代码、push/pull 镜像、SSH 执行脚本等过程提供认证',
  // List
  CREDENTIAL_EMPTY_DESC: '请创建一个凭证。',
  // List > Create
  CREATE_CREDENTIAL: '创建凭证',
  CREDENTIAL_NAME_EXIST_DESC: '凭证名称已存在，请输入其他名称。',
  CREDENTIAL_TYPE_USERNAME_PASSWORD: '用户名和密码',
  CREDENTIAL_TYPE_SSH: 'SSH 密钥',
  PRIVATE_KEY: '私钥',
  PASSPHRASE: '密码短语',
  CREDENTIAL_TYPE_SECRET_TEXT: '访问令牌',
  CREDENTIAL_TYPE_KUBECONFIG: 'kubeconfig',
  PASSWORD_TOKEN: '密码/令牌',
  KUBECONFIG_CONTENT_DESC: '默认内容为当前用户的 kubeconfig 配置。',
  CONTENT: '内容',
};
