/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { isNumber } from 'lodash';

function getIsLicenseError({ status, message = '' }: { status: number; message?: string }) {
  const targetStatus = 403;
  const targetMessage = 'forbidden: invalid license';
  return status === targetStatus && message.startsWith(targetMessage);
}

function getPaginationInfo(options?: {
  totalItems?: number;
  totalCount?: number;
  total_count?: number;
  remainingItemCount?: number;
  limit?: number;
  page?: number;
  defaultLimit?: number;
  defaultPage?: number;
  currentPageData?: unknown[];
}) {
  if (options?.totalItems) {
    return { totalItemCount: options.totalItems };
  }

  if (options?.totalCount) {
    return { total: options.totalCount };
  }

  if (options?.total_count) {
    return { total: options.total_count };
  }

  const currentPageData = options?.currentPageData ?? [];
  const currentPageCount = currentPageData.length ?? 0;

  const remainingItemCount = options?.remainingItemCount;
  if (isNumber(remainingItemCount)) {
    const defaultLimit = Number(options?.defaultLimit) ?? 10;
    const defaultPage = Number(options?.defaultPage) ?? 1;
    const limit = Number(options?.limit) || defaultLimit;
    const page = Number(options?.page) || defaultPage;

    if ([Infinity, -1].includes(limit)) {
      return { total: currentPageCount };
    }

    const currentSum = limit * (page > 0 ? page - 1 : 0) + currentPageCount;
    return { total: currentSum + remainingItemCount };
  }

  if (currentPageCount) {
    return { total: currentPageCount };
  }

  return { total: 0 };
}

export { getIsLicenseError, getPaginationInfo };
