/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useMemo, useState } from 'react';
import { isEmpty } from 'lodash';
import { saveAs } from 'file-saver';
import { useQuery } from 'react-query';
import { Loading, notify, Tooltip } from '@kubed/components';
import { Download, Refresh, Start, Stop } from '@kubed/icons';
import { LogViewer } from '@kubed/log-viewer';
import { checkName } from '../../../stores/pod';
import { useContainerLogFollow, useContainerLogQuery, getAllLogs } from '../../../stores/container';
import { ContentCard, EmptyWrapper, Operations, SplitLine } from './styles';

interface Props {
  isRealtime?: boolean;
  cluster?: string;
  namespace?: string;
  podName?: string;
  containerName?: string;
  gatewayName?: string;
  gatewayNamespace?: string;
  downloadFilename?: string;
}

function ContainerLog({
  isRealtime,
  cluster,
  namespace,
  podName,
  containerName,
  gatewayName,
  gatewayNamespace,
  downloadFilename,
}: Props) {
  const [isDownloading, setIsDownLoading] = useState<boolean>(false);
  const [isSelfRealtime, setIsSelfRealtime] = useState<boolean>(!!isRealtime);
  const [tailLines, setTailLines] = useState<number>(1000);

  const { data: hasContainer } = useQuery([], async () => {
    const res = await checkName({
      cluster,
      namespace,
      name: podName,
    });
    return res.exist;
  });

  const { data: followLogs, refetch: refetchFollowLog } = useContainerLogFollow({
    cluster,
    namespace: gatewayName ? gatewayNamespace : namespace,
    podName,
    gateways: gatewayName,
    params: {
      container: containerName,
      tailLines: tailLines,
      timestamps: true,
      follow: isSelfRealtime,
    },
    enabled: isSelfRealtime && hasContainer,
  });

  const {
    data: queryLogs,
    refetch: refetchQueryLog,
    isLoading,
    isRefetching,
  } = useContainerLogQuery({
    cluster,
    namespace: gatewayName ? gatewayNamespace : namespace,
    podName,
    gateways: gatewayName,
    params: {
      container: containerName,
      tailLines: tailLines,
      timestamps: true,
      follow: isSelfRealtime,
    },
    enabled: !isSelfRealtime && hasContainer,
  });

  const handleRefresh = () => {
    setTailLines(1000);
    if (isSelfRealtime) {
      refetchFollowLog();
    } else {
      refetchQueryLog();
    }
  };

  // TODO: load prev logs
  // const handlePrev = () => {
  //   setTailLines(tailLines + 1000);
  // };

  const handleDownload = async () => {
    setIsDownLoading(true);
    const result = await getAllLogs({
      cluster,
      namespace,
      podName,
      params: {
        container: containerName,
      },
    });

    setIsDownLoading(false);

    if (!result) {
      notify.custom(t('NO_LOG_DATA_FOUND_TIP'));
      return;
    }

    const blob = new Blob([result], { type: 'text/plain;charset=utf-8' });
    const filename = downloadFilename || containerName;
    saveAs(blob, `${filename}.log`);
  };

  const operations = useMemo(() => {
    const baseIconProps = {
      size: 20,
      style: {
        color: '#fff',
        fill: '#fff',
      },
    };

    return (
      <Operations>
        <Tooltip
          content={t(
            isSelfRealtime ? 'STOP_REAL_TIME_CONTAINER_LOG' : 'START_REAL_TIME_CONTAINER_LOG',
          )}
        >
          {isSelfRealtime ? (
            <Stop {...baseIconProps} onClick={() => setIsSelfRealtime(false)} />
          ) : (
            <Start {...baseIconProps} onClick={() => setIsSelfRealtime(true)} />
          )}
        </Tooltip>
        <SplitLine>|</SplitLine>
        <Tooltip content={t('REFRESH')}>
          <Refresh {...baseIconProps} onClick={handleRefresh} />
        </Tooltip>
        <SplitLine>|</SplitLine>
        <Tooltip content={t('DOWNLOAD')}>
          {isDownloading ? (
            <Loading size={16} />
          ) : (
            <Download {...baseIconProps} onClick={handleDownload} />
          )}
        </Tooltip>
      </Operations>
    );
  }, [isSelfRealtime, isDownloading]);

  const content = useMemo(() => {
    const logs = (isSelfRealtime ? (followLogs ?? queryLogs) : queryLogs) || '';

    const showLoading = isLoading || isRefetching;

    if (isEmpty(logs)) {
      return (
        <EmptyWrapper
          title={t('NO_DATA')}
          image={<img src="/assets/empty-card.svg" />}
          imageStyle={{ width: '100%', background: 'none' }}
        />
      );
    }

    return (
      <>
        <LogViewer
          bodyStyle={{ height: '100%', overflowY: 'auto' }}
          logStyle={{ height: 'calc(100vh - 160px)', paddingBottom: '20px' }}
          autoScroll
          log={logs}
        />
        {showLoading && <Loading className="page-loading" />}
        {/* <LoadingWrapper>
          <Loading spinning={loadingNext} size="xs" />
        </LoadingWrapper> */}
        {operations}
      </>
    );
  }, [tailLines, isSelfRealtime, isLoading, queryLogs, followLogs, isRefetching]);

  return <ContentCard>{content}</ContentCard>;
}

export default ContainerLog;
