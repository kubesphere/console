export function getIsLicenseError({ status, message = '' }: { status: number; message?: string }) {
  const targetStatus = 403;
  const targetMessage = 'forbidden: invalid license';
  return status === targetStatus && message.startsWith(targetMessage);
}
