/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useMemo } from 'react';
import { Tooltip } from '@kubed/components';
import { Container, StatusIndicatorStyled } from './styles';
import { AppLogInfo } from './AppLogInfo';
import StatusIndicator, { StatusIndicatorProps } from '../../StatusIndicator';

export interface AppStatusWithLogInfoProps extends StatusIndicatorProps {
  status: 'failed' | 'active' | 'created';
  cluster: string | undefined;
  namespace: string | undefined;
  jobName: string;
  showLogInfo?: boolean;
  message?: string;
}

export function AppStatusWithLogInfo({
  cluster,
  namespace,
  jobName,
  status,
  showLogInfo,
  message,
  ...rest
}: AppStatusWithLogInfoProps) {
  const statusStr = t(status);

  const showLogBtn: boolean = useMemo(() => {
    if (!jobName) {
      return false;
    } else {
      return !!showLogInfo;
    }
  }, [jobName, showLogInfo]);

  return (
    <Container>
      {message ? (
        <Tooltip content={message || ''} interactive>
          <StatusIndicatorStyled {...rest} type={status}>
            {statusStr}
          </StatusIndicatorStyled>
        </Tooltip>
      ) : (
        <StatusIndicator {...rest} type={status}>
          {statusStr}
        </StatusIndicator>
      )}

      {showLogBtn && (
        <AppLogInfo
          cluster={cluster as string}
          namespace={namespace as string}
          jobName={jobName}
          type={status}
          statusStr={statusStr}
        />
      )}
    </Container>
  );
}
