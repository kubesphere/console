/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Banner
  CREDENTIAL_PL: 'Credentials',
  DEVOPS_CREDENTIALS_DESC:
    'Credentials are objects that contain some sensitive data, such as username and password, SSH key and Token. They are used to provide authentication for pulling code, pushing/pulling images, executing SSH scripts, etc. when a pipeline is running.',
  // List
  CREDENTIAL_EMPTY_DESC: 'Please create a credential.',
  // List > Create
  CREATE_CREDENTIAL: 'Create Credential',
  CREDENTIAL_NAME_EXIST_DESC: 'The credential name already exists. Please enter another name.',
  CREDENTIAL_TYPE_USERNAME_PASSWORD: 'Username and password',
  CREDENTIAL_TYPE_SSH: 'SSH key',
  PRIVATE_KEY: 'Private Key',
  PASSPHRASE: 'Passphrase',
  CREDENTIAL_TYPE_SECRET_TEXT: 'Access token',
  CREDENTIAL_TYPE_KUBECONFIG: 'kubeconfig',
  PASSWORD_TOKEN: 'Password/Token',
  KUBECONFIG_CONTENT_DESC: 'The default content is the kubeconfig settings of the current user.',
  CONTENT: 'Content',
};
