/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useEffect, useRef, useState } from 'react';
import { isEmpty, get, isUndefined, throttle } from 'lodash';
import classNames from 'classnames';
import { LoadingOverlay, Loading } from '@kubed/components';
import { Wrapper, Main, LoadMore, StyledEmpty } from './styles';

interface IProps {
  wrapperClassName?: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  minHeight?: number | string;
  empty?: string | React.ReactElement | React.ReactNode;
  loading: boolean;
  data: Record<string, any>[];
  total: number;
  page: number;
  noMount?: boolean;
  onFetch: any;
  children?: React.ReactElement[];
}

const isRemainingData = ({
  data,
  total,
  isEnd,
}: {
  data: Record<string, any>;
  total: number;
  isEnd?: boolean;
}) => {
  return !isUndefined(isEnd) ? !isEnd : !isEmpty(data) && data.length < total;
};

const ScrollLoad = ({
  wrapperClassName = '',
  className = '',
  height = '100%',
  width = '100%',
  minHeight,
  empty,
  loading = true,
  data = [],
  total = 10,
  page = 1,
  onFetch = () => {},
  children,
}: IProps) => {
  const [state, setState] = useState(() => {
    return { loading: loading, loadMore: false };
  });
  const [finish, setFinish] = useState(true);
  const containerRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    if (loading !== state.loading) {
      setState({
        ...state,
        loading: loading,
      });
    }
  }, [loading]);

  useEffect(() => {
    if (state.loadMore) {
      setState({
        loading: false,
        loadMore: isRemainingData({ data, total }),
      });
    }
  }, [data, total]);

  const isElementAtBottom = () => {
    const element = get(containerRef, 'current', {}) as HTMLDivElement;

    return Math.abs(element.scrollTop + element.clientHeight - element.scrollHeight) < 1;
  };

  const handleScroll = throttle(async () => {
    if (isElementAtBottom() && isRemainingData({ data, total }) && finish) {
      setFinish(false);
      setState({ ...state, loadMore: true });
      await onFetch({ more: true, page: page + 1 });
      setFinish(true);
    }
  }, 300);

  const renderContent = () => {
    if (state.loadMore && !state.loadMore) {
      return null;
    }

    if (isEmpty(data) || !children) {
      return (
        empty || (
          <StyledEmpty
            image={<img src="/assets/empty-card.svg" />}
            imageStyle={{ width: '100%', background: 'none' }}
          />
        )
      );
    }

    return children;
  };

  return (
    <Wrapper className={wrapperClassName}>
      <Main style={{ height, width }} ref={containerRef} onScrollCapture={handleScroll}>
        <LoadingOverlay visible={loading} />
        <div
          className={classNames('content', className)}
          style={{ minHeight: minHeight || height }}
          onScrollCapture={handleScroll}
        >
          {renderContent()}
        </div>
        {state.loadMore && (
          <LoadMore>
            <Loading />
          </LoadMore>
        )}
      </Main>
    </Wrapper>
  );
};

export default ScrollLoad;
