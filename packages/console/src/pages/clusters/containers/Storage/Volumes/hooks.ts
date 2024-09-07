/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { useEffect } from 'react';
import { QueryKey, QueryObserver, useQueryClient } from 'react-query';

export const useWatchQueryByQueryKeys = <T>(queryKey: QueryKey, handle: (d?: T) => void) => {
  const queryClient = useQueryClient();
  useEffect(() => {
    const observer = new QueryObserver<T>(queryClient, {
      queryKey,
    });
    const unsubscribe = observer.subscribe(({ data }) => {
      handle(data);
    });
    return () => {
      unsubscribe();
    };
  }, []);
};
