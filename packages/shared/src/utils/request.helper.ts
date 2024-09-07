/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

export function getIsLicenseError({ status, message = '' }: { status: number; message?: string }) {
  const targetStatus = 403;
  const targetMessage = 'forbidden: invalid license';
  return status === targetStatus && message.startsWith(targetMessage);
}
