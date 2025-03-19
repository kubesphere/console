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
  const defaultLimit = Number(options?.defaultLimit) ?? 10;
  const defaultPage = Number(options?.defaultPage) ?? 1;
  const limit = Number(options?.limit) ?? defaultLimit;
  const page = Number(options?.page) ?? defaultPage;
  const isPagination = ![Infinity, -1].includes(limit);

  const getTotalPageCount = (totalItemCount: number) => {
    if (!isPagination) {
      return 1;
    }
    return Math.ceil(totalItemCount / limit);
  };

  if (options?.totalItems) {
    const totalItemCount = options.totalItems;
    const totalPageCount = getTotalPageCount(totalItemCount);
    return { totalItemCount, totalPageCount };
  }

  if (options?.totalCount) {
    const totalItemCount = options.totalCount;
    const totalPageCount = getTotalPageCount(totalItemCount);
    return { totalItemCount, totalPageCount };
  }

  if (options?.total_count) {
    const totalItemCount = options.total_count;
    const totalPageCount = getTotalPageCount(totalItemCount);
    return { totalItemCount, totalPageCount };
  }

  const currentPageData = options?.currentPageData ?? [];
  const currentPageCount = currentPageData.length ?? 0;

  const remainingItemCount = options?.remainingItemCount;
  if (isNumber(remainingItemCount)) {
    let totalItemCount = 0;
    if (isPagination) {
      totalItemCount = currentPageCount;
    } else {
      const currentSum = limit * (page > 0 ? page - 1 : 0) + currentPageCount;
      totalItemCount = currentSum + remainingItemCount;
    }
    const totalPageCount = getTotalPageCount(totalItemCount);

    return { totalItemCount, totalPageCount };
  }

  if (currentPageCount) {
    return { totalItemCount: currentPageCount, totalPageCount: 1 };
  }

  return { totalItemCount: 0, totalPageCount: 0 };
}

export { getIsLicenseError, getPaginationInfo };
