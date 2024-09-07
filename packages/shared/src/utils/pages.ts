/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

export function closePage() {
  window.opener = null;
  window.open('', '_self', '');
  window.close();
}
