/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { isEqual } from 'lodash';
import { useEffect, useState } from 'react';
import { DashBoardHistory, DashBoardHistoryItem } from '../../types/dashboard';

const getHistories = (key: string) => {
  const historyStr = localStorage.getItem(key);
  if (!historyStr) {
    return {} as DashBoardHistory;
  }
  try {
    return JSON.parse(historyStr) as DashBoardHistory;
  } catch (e) {
    return {} as DashBoardHistory;
  }
};

export const useDashboardHistory = (user: string, historyKey = 'history-cache-v4') => {
  const [histories, setHistories] = useState<DashBoardHistoryItem[]>(
    getHistories(historyKey)[user] ?? ([] as DashBoardHistoryItem[]),
  );

  useEffect(() => {
    const history = getHistories(historyKey)[user] ?? [];
    if (!isEqual(history, histories)) {
      setHistories(history);
    }
  }, [user, historyKey]);

  useEffect(() => {
    localStorage.setItem(
      historyKey,
      JSON.stringify({
        ...getHistories(historyKey),
        [user]: histories,
      }),
    );
  }, [histories]);

  return [histories, setHistories] as const;
};

export const addDashboardHistory = (
  user: string,
  item: DashBoardHistoryItem,
  toStorage = true,
  historyKey = 'history-cache-v4',
) => {
  const history = getHistories(historyKey)[user] ?? [];
  const newHistory = history.filter(h => h.id !== item.id);
  newHistory.push(item);
  if (toStorage) {
    localStorage.setItem(
      historyKey,
      JSON.stringify({
        ...getHistories(historyKey),
        [user]: newHistory,
      }),
    );
  }
  return newHistory;
};

export const removeDashboardHistory = (
  user: string,
  ids: string[] | string,
  toStorage = true,
  historyKey = 'history-cache-v4',
) => {
  const history = getHistories(historyKey)[user] ?? [];
  const newHistory = history.filter(item =>
    Array.isArray(ids) ? !ids.includes(item.id) : item.id !== ids,
  );
  if (newHistory.length === history.length) {
    return newHistory;
  }

  if (toStorage) {
    localStorage.setItem(
      historyKey,
      JSON.stringify({
        ...getHistories(historyKey),
        [user]: newHistory,
      }),
    );
  }
  return newHistory;
};
