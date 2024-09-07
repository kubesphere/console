/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

export function getGlobalConsoleV3LoadCompleted() {
  // @ts-expect-error
  return window.globals?.consoleV3LoadCompleted;
}

export function setGlobalConsoleV3LoadCompleted({ value }: { value: boolean }) {
  // @ts-expect-error
  window.globals.consoleV3LoadCompleted = value;
}

export function removeGlobalConsoleV3LoadCompleted() {
  if (window?.globals) {
    // @ts-expect-error
    const { consoleV3LoadCompleted, ...rest } = window.globals;
    // @ts-expect-error
    window.globals = rest;
  }
}
