/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

function getIsApiForbiddenError({
  method,
  code,
  reason,
}: {
  method: string;
  code?: number;
  reason?: string;
}) {
  const targetMethod = 'GET';
  const targetCode = 403;
  const targetReason = 'Forbidden';

  return method.toUpperCase() === targetMethod && code === targetCode && reason === targetReason;
}

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
  const defaultLimit = Number(options?.defaultLimit ?? 10);
  const defaultPage = Number(options?.defaultPage ?? 1);
  const limit = Number(options?.limit ?? defaultLimit);
  const page = Number(options?.page ?? defaultPage);
  const isPaginated = ![Infinity, -1].includes(limit);

  const getTotalPageCount = (totalItemCount: number) => {
    if (!isPaginated) {
      return 1;
    }

    return Math.ceil(totalItemCount / limit);
  };

  const normalTotalItemCount = options?.totalItems ?? options?.totalCount ?? options?.total_count;
  if (normalTotalItemCount !== undefined) {
    const totalPageCount = getTotalPageCount(normalTotalItemCount);
    return { totalItemCount: normalTotalItemCount, totalPageCount };
  }

  const currentPageData = options?.currentPageData ?? [];
  const currentPageCount = currentPageData.length;

  const remainingItemCount = options?.remainingItemCount;
  if (remainingItemCount !== undefined) {
    let totalItemCount = 0;
    if (isPaginated) {
      const currentSum = limit * (page > 0 ? page - 1 : 0) + currentPageCount;
      totalItemCount = currentSum + remainingItemCount;
    } else {
      totalItemCount = currentPageCount;
    }
    const totalPageCount = getTotalPageCount(totalItemCount);

    return { totalItemCount, totalPageCount };
  }

  if (currentPageCount) {
    return { totalItemCount: currentPageCount, totalPageCount: 1 };
  }

  return { totalItemCount: 0, totalPageCount: 0 };
}

export { getIsApiForbiddenError, getIsLicenseError, getPaginationInfo };
