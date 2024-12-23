/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { PropsWithChildren, ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { flatten, isArray, isEmpty, isString } from 'lodash';
import { LoadingOverlay, Select } from '@kubed/components';
import { Monitor } from '@kubed/icons';
import { Props as MonitorControllerProps } from '../index';
import { startAutoRefresh, stopAutoRefresh } from '../utiles';
import Icon from '../../../../Icon';
import TimeSelector from '../../../../TimeSelector';
import {
  Content,
  ControllerHeader,
  ControllerTitle,
  EmptyWrapper,
  IconButton,
  OperationsWrapper,
  StyledModal,
} from '../styles';

interface Props extends Omit<MonitorControllerProps, 'customAction'> {
  titleIcon?: ReactNode;
  visible?: boolean;
  updateMonitorOptions?: (data: any) => void;
  onCancel: () => void;
}

function MonitorControllerModal({
  title = '',
  titleIcon,
  visible,
  step = '10m',
  times = 50,
  createTime = '',
  loading = false,
  enableAutoRefresh = true,
  clusters = [],
  onFetch = () => {},
  children,
  empty = t('NO_MONITORING_DATA'),
  updateMonitorOptions,
  onCancel,
  ...props
}: PropsWithChildren<Props>) {
  const { isFederated, closeBtn } = props;
  const monitorRef = useRef<Record<string, any>>({ params: {} });
  const [initEnableAutoRefresh, setInitEnableAutoRefresh] = useState<boolean>(enableAutoRefresh);
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
  }, [initEnableAutoRefresh, cluster, initializeParams]);
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
    if (updateMonitorOptions) {
      updateMonitorOptions(data);
    }
    const $enableAutoRefresh = !data.start && !data.end && enableAutoRefresh;
    setAutoRefresh(false);
    setInitEnableAutoRefresh($enableAutoRefresh);
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
  const renderAutoRefresh = useMemo(() => {
    if (!initEnableAutoRefresh) return null;
    return (
      <IconButton onClick={handleAutoRefresh}>
        <Icon name={autoRefresh ? 'pause' : 'start'} variant="light" />
      </IconButton>
    );
  }, [initEnableAutoRefresh, autoRefresh]);
  const renderCustomActions = (
    <IconButton onClick={onCancel}>
      <Icon size={20} name="close" variant="light" />
    </IconButton>
  );
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
        zIndex={1000}
      />
      {renderAutoRefresh}
      <IconButton onClick={handleRefresh}>
        <Icon name="refresh" variant="light" />
      </IconButton>
      {renderCustomActions}
      {closeBtn}
    </OperationsWrapper>
  );

  const renderHeader = (
    <ControllerHeader>
      <ControllerTitle>
        {titleIcon || <Monitor size={16} />}
        {title || t('MONITORING')}
      </ControllerTitle>
      {renderOperations}
    </ControllerHeader>
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
    <StyledModal
      width="calc(100vw - 40px)"
      visible={visible}
      header={renderHeader}
      footer={null}
      closeIcon={<></>}
    >
      <Content>
        <LoadingOverlay visible={loading} />
        {renderContent}
      </Content>
    </StyledModal>
  );
}

export default MonitorControllerModal;
