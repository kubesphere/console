/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Banner
  CREDENTIAL_PL: 'Autentificación',
  DEVOPS_CREDENTIALS_DESC:
    'Credentials are objects that contain some sensitive data, such as username and password, SSH key and Token. They are used to provide authentication for pulling code, pushing/pulling images, executing SSH scripts, etc. when a pipeline is running.',
  // List
  CREDENTIAL_EMPTY_DESC: 'Please create a credential.',
  // List > Create
  CREATE_CREDENTIAL: 'Crear credenciale',
  CREDENTIAL_NAME_EXIST_DESC: 'El ID de credencial ya existe',
  CREDENTIAL_TYPE_USERNAME_PASSWORD: 'Secreto de contraseña de cuenta',
  CREDENTIAL_TYPE_SSH: 'SSH key',
  PRIVATE_KEY: 'Llave privada',
  PASSPHRASE: 'Pasphrase',
  CREDENTIAL_TYPE_SECRET_TEXT: 'Access token',
  CREDENTIAL_TYPE_KUBECONFIG: 'kubeconfig',
  PASSWORD_TOKEN: 'Token/Contraseña',
  KUBECONFIG_CONTENT_DESC: 'El contenido predeterminado es el kubeconfig del usuario actual.',
  CONTENT: 'Content',
};
