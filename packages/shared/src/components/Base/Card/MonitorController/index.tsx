/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { ReactNode, useState, useEffect, useRef, useMemo, PropsWithChildren } from 'react';
import classNames from 'classnames';
import { isString, isEmpty, isArray, flatten } from 'lodash';
import { Select, LoadingOverlay } from '@kubed/components';
import Icon from '../../../Icon';
import TimeSelector from '../../../TimeSelector';
import { startAutoRefresh, stopAutoRefresh } from './utiles';
import { IconButton, OperationsWrapper, Title, CardWrapper, Content, EmptyWrapper } from './styles';
export interface Props {
  title?: ReactNode;
  step?: string;
  times?: number;
  createTime?: string;
  className?: string;
  loading: boolean;
  isEmpty?: boolean;
  empty?: string;
  enableAutoRefresh?: boolean;
  isFederated?: boolean;
  customAction?: ReactNode;
  closeBtn?: ReactNode;
  clusters?: Record<string, any>[];
  onFetch: (params: any) => void;
}

function MonitoringController({
  title = '',
  step = '10m',
  times = 50,
  createTime = '',
  className,
  loading = false,
  enableAutoRefresh = true,
  clusters = [],
  children,
  empty = t('NO_MONITORING_DATA'),
  onFetch = () => {},
  ...props
}: PropsWithChildren<Props>) {
  const { isFederated, closeBtn } = props;
  const monitorRef = useRef<Record<string, any>>({ params: {} });
  const [active, setActive] = useState<boolean>(false);
  const [initEnableAutoRefresh, setiInitEnableAutoRefresh] = useState<boolean>(enableAutoRefresh);
  const [autoRefresh, setAutoRefresh] = useState<boolean>(false);
  const [cluster, setCluster] = useState<string>(clusters[0]?.name || '');
  const [initializeParams, setInitializeParams] = useState<Record<string, any>>({});
  const clustersOptions = clusters.map((key: any) => ({
    label: key.name || key,
    value: key.name || key,
  }));
  const initParams = () => {
    const obj = {
      times,
      step,
    };
    if (createTime) {
      const create = new Date(createTime).valueOf() / 1000;
      const now = Date.now() / 1000;
      const interval = now - create;
      switch (true) {
        // half an hour
        case interval <= 1800:
          obj.times = 30;
          obj.step = '1m';
          break;
        // an hour
        case interval <= 3600:
          obj.times = 60;
          obj.step = '1m';
          break;
        // five hours
        case interval <= 3600 * 5:
          obj.times = 60;
          obj.step = '5m';
          break;
        default:
          break;
      }
    }
    setInitializeParams(obj);
  };
  const fetchData = (params = {}) => {
    const query: any = {
      ...initializeParams,
      ...params,
    };
    if (cluster) {
      query.cluster = cluster;
    }

    onFetch(query);
  };
  useEffect(() => {
    if (!monitorRef.current.mount) return;
    initParams();
  }, [step, times, createTime]);
  useEffect(() => {
    if (!monitorRef.current.mount) return;
    fetchData();
  }, [cluster, initializeParams]);
  useEffect(() => {
    if (!monitorRef.current.mount) return;
    if (autoRefresh) {
      startAutoRefresh(monitorRef.current, fetchData);
    } else {
      stopAutoRefresh(monitorRef.current);
    }
  }, [autoRefresh]);
  useEffect(() => {
    initParams();
    monitorRef.current.mount = true;
    return () => {
      stopAutoRefresh(monitorRef.current);
    };
  }, []);
  const handleChange = (data: any) => {
    const $enableAutoRefresh = !data.start && !data.end && enableAutoRefresh;
    setAutoRefresh(false);
    setiInitEnableAutoRefresh($enableAutoRefresh);
    setInitializeParams(data);
  };
  const handleClusterChange = (key: string) => {
    setCluster(key);
  };
  const handleRefresh = () => {
    fetchData();
  };
  const handleAutoRefresh = () => {
    setAutoRefresh(key => !key);
  };
  const handleToggle = (key: boolean) => {
    setActive(key);
  };
  const renderAutoRefresh = useMemo(() => {
    if (!initEnableAutoRefresh) return null;
    return (
      <IconButton onClick={handleAutoRefresh}>
        <Icon name={autoRefresh ? 'pause' : 'start'} variant="light" />
      </IconButton>
    );
  }, [initEnableAutoRefresh, autoRefresh]);
  const renderCustomActions = () => {
    const { customAction } = props;
    return customAction || null;
  };
  const renderOperations = (
    <OperationsWrapper>
      {isFederated && (
        <Select value={cluster} options={clustersOptions} onChange={handleClusterChange} />
      )}
      <TimeSelector
        renderCustom={true}
        step={initializeParams.step}
        times={initializeParams.times}
        onChange={handleChange}
        onToggle={handleToggle}
      />
      {renderAutoRefresh}
      <IconButton onClick={handleRefresh}>
        <Icon name="refresh" variant="light" />
      </IconButton>
      {renderCustomActions()}
      {closeBtn}
    </OperationsWrapper>
  );

  const renderContent = useMemo(() => {
    const emptyChildren =
      isEmpty(children) || (isArray(children) && isEmpty(flatten(children).filter(item => item)));
    if (props.isEmpty || emptyChildren) {
      return isString(empty) ? <EmptyWrapper>{empty}</EmptyWrapper> : empty;
    }
    return children;
  }, [children, props.isEmpty]);
  return (
    <CardWrapper hoverable padding={20} className={classNames({ showDropDown: active }, className)}>
      <Title>
        {typeof title === 'string' ? (
          <span>{title}</span>
        ) : title ? (
          title
        ) : (
          <span>{t('MONITORING')}</span>
        )}
        {renderOperations}
      </Title>
      <Content>
        <LoadingOverlay visible={loading} />
        {renderContent}
      </Content>
    </CardWrapper>
  );
}

export default MonitoringController;
