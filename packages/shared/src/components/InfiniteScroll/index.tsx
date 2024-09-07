/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import type { ReactNode, CSSProperties } from 'react';
import type { UseInfiniteScrollHookArgs } from 'react-infinite-scroll-hook';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { Loading } from '@kubed/components';

import Empty from './Empty';
import { Container, Content, LoadingWrapper, RefreshingWrapper } from './styles';

export interface InfiniteScrollProps extends Omit<UseInfiniteScrollHookArgs, 'loading'> {
  children: ReactNode;
  isLoading: boolean;
  loading?: ReactNode;
  isRefreshing?: boolean;
  isEmpty?: boolean;
  empty?: ReactNode;
  classNames?: {
    container?: string;
    content?: string;
    loadingWrapper?: string;
    refreshingWrapper?: string;
  };
  styles?: {
    container?: CSSProperties;
    content?: CSSProperties;
    loadingWrapper?: CSSProperties;
    refreshingWrapper?: CSSProperties;
  };
}

export function InfiniteScroll({
  children,
  isLoading,
  loading = <Loading />,
  isRefreshing,
  isEmpty = false,
  empty = <Empty />,
  classNames,
  styles,
  ...restProps
}: InfiniteScrollProps) {
  const { hasNextPage } = restProps;
  const useInfiniteScrollOptions = { loading: isLoading, ...restProps };
  const [sentryRef, { rootRef }] = useInfiniteScroll(useInfiniteScrollOptions);

  if (isRefreshing) {
    return (
      <RefreshingWrapper
        className={classNames?.refreshingWrapper}
        style={styles?.refreshingWrapper}
      >
        {loading}
      </RefreshingWrapper>
    );
  }

  if (isEmpty) {
    return <>{empty}</>;
  }

  return (
    <Container ref={rootRef} className={classNames?.container} style={styles?.container}>
      <Content className={classNames?.content} style={styles?.content}>
        {children}
        {(isLoading || hasNextPage) && (
          <LoadingWrapper
            ref={sentryRef}
            className={classNames?.loadingWrapper}
            style={styles?.loadingWrapper}
          >
            {loading}
          </LoadingWrapper>
        )}
      </Content>
    </Container>
  );
}
