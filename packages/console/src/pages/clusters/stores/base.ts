/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

export const getNextPageParam = (lastPage: Record<string, any>) => {
  const { data, total, limit, page, ...rest } = lastPage;
  const hasNextPage = limit * (page - 1) + data.length < total;
  if (hasNextPage) {
    const nextParams = {
      ...rest,
      page: lastPage.page + 1,
      limit,
    };
    return nextParams;
  }
  return undefined;
};

export const getNextApiParam =
  (params: Record<string, any>) => (lastPage: Record<string, any>, allPages: any[]) => {
    if (lastPage.has_more) {
      const nextOffset = allPages.reduce((acc, cur) => acc + cur.items.length, 0);

      if (nextOffset < lastPage.totalItems) {
        const nextParams = {
          ...params,
          page: lastPage.page + 1,
        };
        return nextParams;
      }
    }

    return undefined;
  };
