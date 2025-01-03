/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

export const PATTERN_NAME = /^[a-z0-9]([-a-z0-9]*[a-z0-9])?$/;
export const PATTERN_USER_NAME =
  /^[a-z0-9]([-a-z0-9]*[a-z0-9])?(\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*$/;
export const PATTERN_ALIAS_NAME =
  /^[a-zA-Z0-9\u4e00-\u9fa5]([a-zA-Z0-9\u4e00-\u9fa5-]*[a-zA-Z0-9\u4e00-\u9fa5])*$/;
export const PATTERN_IMAGE_NAME =
  /^[a-z0-9]([-a-z0-9]*[a-z0-9])?((\.|\/)[a-z0-9]([-a-z0-9]*[a-z0-9])?)*(:([a-z0-9])*)?$/;
export const PATTERN_SERVICE_NAME = /^[a-z]([-a-z0-9]*[a-z0-9])?$/;
export const PATTERN_SERVICE_VERSION = /^[a-z0-9]*$/;
export const PATTERN_LABEL = /(([A-Za-z0-9][-A-Za-z0-9_.]*)?[A-Za-z0-9])?/;
export const PATTERN_PASSWORD =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~!@#$%^&*()\-_=+\\|[{}\];:'",<.>/? ])[^]{8,64}$/;
export const PATTERN_CHARACTERS = /(?=.*?[~!@#$%^&*()\-_=+\\|\[\{\}\];:'",<.>/? ])/;
export const PATTERN_IMAGE = /^\S+$/;
export const PATTERN_PORT_NAME = /^[a-z]([-a-z0-9]*[a-z0-9])?$/;
export const PATTERN_COMPONENT_VERSION = /^[a-z0-9]+$/;
export const PATTERN_PIPELINE_NAME =
  /[a-z0-9]([-a-z0-9]*[a-z0-9])?(\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*/;
export const PATTERN_HOST =
  /^(?=^.{3,255}$)[*a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/;

export const PATTERN_URL = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)\/?$/;
export const PATTERN_EMAIL = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
export const PATTERN_IP =
  /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
export const PATTERN_IP_MASK = /^[1-9][0-9]*$/;
export const PATTERN_PORT =
  /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;
export const PATTERN_IMAGE_TAG = /^(.*?)([0-9a-zA-Z/]*)(:[-.\w]*[0-9a-zA-Z])*$/;
export const PATTERN_APPTEMPLATE_VERSION =
  /[a-zA-Z0-9](\.?-?[a-zA-Z0-9])+(\s?\[?[a-zA-Z0-9]+\.?-?\]?)*/;
export const PATTERN_UTC_TIME = /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]+Z/;
export const PATTERN_WORD = /(?=.*?[A-Z])(?=.*?[a-z])/;
export const PATTERN_NUMBER = /(?=.*?[0-9])/;
export const PATTERN_INTEGER_NUMBER = /^[+]{0,1}(\d+)$/;
export const PATTERN_APPTEMPLATE_CATEGORY_NAME =
  /^[a-z0-9]([-a-z0-9]*[a-z0-9])?(\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*$/;
