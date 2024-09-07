/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import mitt from 'mitt';

interface CustomEvent {
  isHeaderLicenseTipHidden: boolean;
}

const IS_HEADER_LICENSE_TIP_HIDDEN_KEY = 'layouts.page.header.isLicenseTipHidden';

const { on, off, emit } = mitt<Record<string, CustomEvent>>();

function getIsHeaderLicenseTipHidden() {
  return window.localStorage.getItem(IS_HEADER_LICENSE_TIP_HIDDEN_KEY) === 'true';
}

function setIsHeaderLicenseTipHidden() {
  window.localStorage.setItem(IS_HEADER_LICENSE_TIP_HIDDEN_KEY, 'true');
  emit(IS_HEADER_LICENSE_TIP_HIDDEN_KEY, { isHeaderLicenseTipHidden: true });
}

function removeIsHeaderLicenseTipHidden() {
  window.localStorage.removeItem(IS_HEADER_LICENSE_TIP_HIDDEN_KEY);
  emit(IS_HEADER_LICENSE_TIP_HIDDEN_KEY, { isHeaderLicenseTipHidden: false });
}

interface OnHeaderLicenseTipChangeOptions {
  callback: (event: CustomEvent) => void;
}

function onIsHeaderLicenseTipHiddenChange({ callback }: OnHeaderLicenseTipChangeOptions) {
  on(IS_HEADER_LICENSE_TIP_HIDDEN_KEY, callback);
}

function offIsHeaderLicenseTipHiddenChange() {
  off(IS_HEADER_LICENSE_TIP_HIDDEN_KEY);
}

export const isHeaderLicenseTipHiddenStorage = {
  get: getIsHeaderLicenseTipHidden,
  set: setIsHeaderLicenseTipHidden,
  remove: removeIsHeaderLicenseTipHidden,
  onChange: onIsHeaderLicenseTipHiddenChange,
  offChange: offIsHeaderLicenseTipHiddenChange,
};
