/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Card, Empty, Select, Tooltip } from '@kubed/components';
import { Clock, Cluster, Exclamation, Magnifier, Pod } from '@kubed/icons';
import { isArray, isEmpty, min, omit } from 'lodash';
import {
  Action,
  Body,
  EmptyText,
  EmptyTipIcon,
  Filter,
  FilterButton,
  IconWrapper,
  SearchInput,
  SearchWrapper,
  SelectWrapper,
  Suggestion,
  TimeWrapper,
  Title,
} from './styles';
import {
  BaseTable,
  Column,
  formatTime,
  gatewayStore,
  hasKSModule,
  Icon,
  TimeSelector,
} from '@ks-console/shared';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

interface SearchInputState {
  start: string | number;
  end: string | number;
  step?: string;
}

interface SearchFilter {
  log_query?: string;
  pod_query?: string;
  durationAlias?: string;
}

interface ValueType {
  times: number;
  step: string;
  start: string | number;
  end: string | number;
  lastTime: string;
}

const DEFAULT_DURATION = {
  start_time: 0,
  end_time: Date.now(),
};

const DEFAULT_REAL_TIME_CONFIG = {
  duration: 600,
};

const CurrentSelect = styled(Select)<{ iconWidth?: number }>`
  width: 200px;
  margin-right: 12px;
  .kubed-select-selector {
    background: #2a354b;
    padding-left: 30px;
    color: #fff;
    border: none;
  }
  .kubed-select-arrow {
    .kubed-icon {
      fill: #fff;
      color: #fff;
    }
  }
`;

const getTimeLabel = (timeStr: string) => {
  const unit = timeStr.slice(-1).toUpperCase();
  return t(`TIME_${unit}`, { count: parseInt(timeStr, 10) });
};

const getDateStr = (time: string | number) => {
  return formatTime(Number(time) * 1000);
};

const getSecond = (step: string) => {
  const result = step.match(/(\d+)(\w+)/);
  if (result) {
    const [, count = 0, unit = 's'] = result;
    const unitMap: Record<string, number> = {
      s: 1,
      m: 60,
      h: 60 * 60,
      d: 60 * 60 * 24,
    };
    return Number(count) * unitMap[unit];
  }
  return 0;
};

function GatewayLogPage() {
  const { cluster, namespace, gatewayName } = useParams();
  const [searchInputState, setSearchInputState] = useState<SearchInputState>({
    start: '',
    end: '',
  });
  const scrollRef = useRef<HTMLDivElement>(null);
  const [filters, setFilters] = useState<SearchFilter>({});
  const [polling, setPolling] = useState<boolean>(false);
  const [pollingFrequency, setPollingFrequency] = useState<number>(5000);
  const pollingInterval = useRef<any>();
  const [from, setFrom] = useState<number>(0);

  const duration = useMemo(() => {
    const now = Date.now();
    const { start, end } = searchInputState;
    if (start) {
      return {
        start_time: min([Number(start) * 1000, now])!,
        end_time: min([Number(end) * 1000, now])!,
      };
    }
    return DEFAULT_DURATION;
  }, [searchInputState]);

  const scrollToBottom = () => {
    scrollRef.current?.scrollTo(0, scrollRef.current?.scrollHeight);
  };

  const requestParams = useMemo(() => {
    return {
      cluster,
      namespace,
      gatewayName,
      log_query: '',
      pod_query: '',
      ...omit(filters, 'durationAlias'),
      from,
      size: 50,
      ...duration,
    };
  }, [filters, duration, from]);

  const {
    data = [],
    reFetch,
    isLoading,
    isLast,
    refresh,
  } = gatewayStore.useGatewayLogs(requestParams);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { start_time, end_time } = requestParams;
    reFetch({
      ...requestParams,
      start_time: start_time ? Math.floor(start_time / 1000) : undefined,
      end_time: end_time ? Math.floor(end_time / 1000) : undefined,
    });
  }, [requestParams]);

  useLayoutEffect(() => {
    scrollToBottom();
  }, [data]);

  useEffect(() => {
    if (!filters.durationAlias) {
      setSearchInputState({
        start: '',
        end: '',
      });
      setPolling(false);
    }
  }, [filters.durationAlias]);

  const hasValue = useMemo(
    () =>
      Object.values(searchInputState).some(item =>
        isArray(item) ? item.some(_item => !isEmpty(_item)) : !isEmpty(item),
      ),
    [searchInputState],
  );

  const refreshQuery = () => {
    setFrom(0);
    refresh();
  };

  const pollingFunc = () => {
    const $end = Math.ceil(Date.now() / 1000);
    setSearchInputState({
      ...searchInputState,
      end: $end,
      start: $end - DEFAULT_REAL_TIME_CONFIG.duration,
    });
    setFilters({
      ...filters,
      durationAlias: `${DEFAULT_REAL_TIME_CONFIG.duration / 60}m`,
    });
    refreshQuery();
  };

  const loadMoreLogs = () => {
    const newFrom = from + 50;
    setFrom(newFrom);
  };

  const stopPolling = () => {
    clearTimeout(pollingInterval.current);
    pollingInterval.current = null;
    setPolling(false);
  };

  const startPolling = () => {
    setPolling(true);
    pollingFunc();
    if (pollingInterval.current) {
      clearInterval(pollingInterval.current);
    }
    pollingInterval.current = setInterval(pollingFunc, pollingFrequency);
  };

  const togglePolling = () => {
    if (polling) {
      stopPolling();
      return;
    }
    startPolling();
  };

  const changeFrequency = (value: number) => {
    setPollingFrequency(value);
    if (polling) {
      clearInterval(pollingInterval.current);
      startPolling();
    }
  };

  const initQuery = () => {
    setSearchInputState({
      start: '',
      end: '',
    });
    setFilters({});
  };

  useEffect(() => () => stopPolling(), []);

  const handleTimeChange = ({ step, start, end, lastTime }: ValueType) => {
    const params: Partial<SearchInputState> = {};
    params.step = step;
    if (lastTime) {
      params.end = Math.ceil(Date.now() / 1000);
      params.start = Math.ceil(Date.now() / 1000) - getSecond(lastTime);
    } else {
      params.end = end;
      params.start = start;
    }
    const durationAlias = lastTime
      ? t('LAST_TIME', { value: getTimeLabel(lastTime) })
      : `${getDateStr(start)} – ${getDateStr(end)}`;
    stopPolling();
    setFilters({
      ...filters,
      durationAlias,
    });
    setSearchInputState({
      ...searchInputState,
      ...params,
    });
    refreshQuery();
  };

  const handleRefresh = () => {
    refreshQuery();
  };

  const clearFilter = () => {
    initQuery();
    refreshQuery();
  };

  const onTableScrollTop = () => {
    const { scrollTop } = scrollRef.current!;
    if (!isLast && scrollTop === 0) {
      loadMoreLogs();
    }
  };

  const tableCols: Column[] = [
    {
      title: t('TIME'),
      field: 'time',
      width: '16%',
      render: (value: string) => `[${formatTime(value, 'YYYY-MM-DD HH:mm:ss')}]`,
    },
    {
      title: t('POD'),
      width: '16%',
      field: 'pod',
    },
    {
      title: t('MESSAGE'),
      field: 'log',
    },
  ];

  const suggestions = [
    {
      key: 'log_query',
      label: t('KEYWORD'),
      customLabel: (
        <Suggestion>
          <Magnifier />
          {t('KEYWORD')}
        </Suggestion>
      ),
    },
    {
      key: 'pod_query',
      label: t('POD'),
      customLabel: (
        <Suggestion>
          <Pod />
          {t('POD')}
        </Suggestion>
      ),
    },
    {
      key: 'durationAlias',
      label: t('TIME_RANGE_SCAP'),
      customLabel: (
        <Suggestion>
          <Clock />
          {t('TIME_RANGE_SCAP')}
        </Suggestion>
      ),
      customDropdown: (
        <TimeWrapper>
          <TimeSelector.DefaultRange onChange={handleTimeChange} />
          <TimeSelector.CustomRange showStep={false} onSubmit={handleTimeChange} />
        </TimeWrapper>
      ),
    },
  ];

  const renderOperation = () => {
    const intervalOpts = [5, 10, 20].map(second => ({
      label: t('REFRESH_INTERVAL_VALUE', { value: second }),
      value: second * 1000,
    }));

    const params = { ...duration, ...omit(filters, 'durationAlias') };

    return (
      <Filter>
        <FilterButton onClick={togglePolling}>
          <Icon name={polling ? 'stop' : 'start'} variant="light" />
        </FilterButton>
        <SelectWrapper>
          <IconWrapper>
            <Icon name="timed-task" size={20} />
          </IconWrapper>
          <CurrentSelect defaultValue={5000} options={intervalOpts} onChange={changeFrequency} />
        </SelectWrapper>
        <a href={gatewayStore.exportLinkFactory(params)} download>
          <FilterButton>
            <Tooltip content={t('EXPORT_LOGS')}>
              <Icon name="export" variant="light" />
            </Tooltip>
          </FilterButton>
        </a>
      </Filter>
    );
  };

  const renderEmpty = () => {
    return (
      <EmptyText>
        <EmptyTipIcon>
          <Exclamation size={48} />
        </EmptyTipIcon>
        <div>{t('NO_MATCHING_RESULT_FOUND')}</div>
        <p>
          {t('YOU_CAN_TRY_TO')}
          <Action onClick={handleRefresh}>{t('REFRESH_DATA')}</Action>
          {t('OR')}
          <Action onClick={clearFilter}>{t('CLEAR_SEARCH_CONDITIONS')}</Action>
        </p>
      </EmptyText>
    );
  };

  if (!hasKSModule('whizard-logging')) {
    return (
      <Card padding="xl">
        <Empty title={t('LOGGING_DISABLED')} image={<Cluster size={48} />}></Empty>
      </Card>
    );
  }

  return (
    <>
      <Title>
        <SearchWrapper focus={hasValue}>
          {/* todo: multiple same tag */}
          <SearchInput
            suggestions={suggestions}
            placeholder={t('SEARCH')}
            onChange={(value: SearchFilter) => {
              setFilters({
                ...value,
              });
              refreshQuery();
            }}
            filters={filters}
          />
        </SearchWrapper>
        {renderOperation()}
      </Title>
      <Body ref={scrollRef} onScroll={onTableScrollTop}>
        {isEmpty(data) ? (
          renderEmpty()
        ) : (
          <BaseTable columns={tableCols} dataSource={[...data].reverse()} loading={isLoading} />
        )}
      </Body>
    </>
  );
}

export default GatewayLogPage;
