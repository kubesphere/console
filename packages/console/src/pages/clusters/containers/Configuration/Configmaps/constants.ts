/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

const NAME = 'CONFIGMAP';

const SECRET_TYPES: Record<string, string> = {
  Opaque: 'DEFAULT',
  'kubernetes.io/tls': 'TLS_INFORMATION',
  'kubernetes.io/dockerconfigjson': 'IMAGE_REGISTRY_INFORMATION',
  'kubernetes.io/basic-auth': 'USERNAME_AND_PASSWORD',
};

export { NAME, SECRET_TYPES };
