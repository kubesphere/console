/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { useEffect, useRef } from 'react';

export const useInterval = ({
  fn,
  interval = 5000,
  leading = true,
  params,
}: {
  fn: (params?: any) => void;
  interval?: number;
  leading?: boolean;
  params?: any;
}) => {
  const timeRef = useRef<any>(null);

  const startInterval = () => {
    if (leading) {
      fn(params);
    }
    timeRef.current = setInterval(() => {
      fn(params);
    }, interval);
  };

  const stopInterval = () => {
    if (timeRef.current) {
      clearInterval(timeRef.current);
      timeRef.current = null;
    }
  };

  useEffect(() => () => stopInterval(), []);

  return [startInterval, stopInterval];
};
