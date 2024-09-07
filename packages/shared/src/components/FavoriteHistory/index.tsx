/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { Tooltip } from '@kubed/components';
import React, { useEffect } from 'react';
import {
  addDashboardHistory,
  removeDashboardHistory,
  useDashboardHistory,
  useEventEmitter,
} from '../../hooks';
import { DashBoardHistoryItem } from '../../types';
import { StarDuotone, StarHalfDuotone } from '../Icons';
import * as styles from './index.styles';
export interface FavoriteProps {
  item: DashBoardHistoryItem;
  user: string;
  iconTheme?: 'light' | 'dark';
}

export const FavoriteHistory = (props: FavoriteProps) => {
  const { user, item, iconTheme = 'dark' } = props;
  const [history, setHistory] = useDashboardHistory(user);
  const isActive = history.some(h => h.id === item.id);
  const emitter = useEventEmitter();

  const handleClick = (active: boolean) => {
    if (active) {
      setHistory(removeDashboardHistory(user, item.id, false));
    } else {
      setHistory(addDashboardHistory(user, item, false));
    }
  };

  useEffect(() => {
    emitter.$emit('FavoriteHistory-' + item.id, history);
  }, [history]);

  useEffect(() => {
    const fn = (his: DashBoardHistoryItem[]) => {
      if (history !== his) {
        setHistory(his);
      }
    };
    emitter.$on('FavoriteHistory-' + item.id, fn);
    return () => {
      emitter.$off('FavoriteHistory-' + item.id, fn);
    };
  }, []);
  return (
    <styles.Wrapper
      hasPadding={iconTheme !== 'light'}
      className={isActive ? 'favorite-active-action' : 'favorite-action'}
    >
      <Tooltip content={isActive ? t('CANCEL_QUICK_ACCESS') : t('ADD_TO_QUICK_ACCESS')}>
        <styles.IconWrapper
          onClick={e => {
            e.stopPropagation();
            e.preventDefault();
            handleClick(isActive);
          }}
        >
          {isActive ? (
            <StarDuotone color="#F5A623" size={16} />
          ) : (
            <StarHalfDuotone size={16} color={iconTheme === 'dark' ? '#36435C' : '#FFFFFF66'} />
          )}
        </styles.IconWrapper>
      </Tooltip>
    </styles.Wrapper>
  );
};
