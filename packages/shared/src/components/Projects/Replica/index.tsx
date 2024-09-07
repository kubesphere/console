/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { Card } from '@kubed/components';
import { get } from 'lodash';
import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import ReplicaStatus from './Status';

interface Props {
  module?: string;
  detail?: Record<string, any>;
  enableScale?: boolean;
  className?: string;
  onScale?: (replica: number) => void;
}

interface ReplicaStatusType {
  current?: number;
  desire?: number;
  onScale?: null | ((replica: number) => void);
}

export const ReplicaCount = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  min-width: 335px;
  margin-right: 12px;
`;

function Replica({
  module = 'deployments',
  detail = {},
  enableScale = true,
  className,
  onScale,
}: Props) {
  const handleReplicaChange = useCallback((newReplicas: number) => {
    if (newReplicas >= 0) {
      onScale?.(newReplicas);
    }
  }, []);

  const replicaStatus = useMemo(() => {
    let status: ReplicaStatusType = {};

    switch (module) {
      default:
      case 'deployments': {
        status = {
          current: detail.availablePodNums || 0,
          desire: detail.podNums || 0,
        };
        break;
      }
      case 'statefulsets': {
        status = {
          current: get(detail, 'status.currentReplicas', detail.readyPodNums),
          desire: detail.podNums || 0,
        };
        break;
      }
      case 'daemonsets': {
        status = {
          current: get(detail, 'status.numberReady', 0),
          desire: get(detail, 'status.desiredNumberScheduled', 0),
        };
        break;
      }
      case 'gateways': {
        status = {
          current: Array.isArray(detail.pods) ? detail.pods.length : 1,
          desire: get(detail, 'replicas', 0),
        };
      }
    }

    status.onScale = enableScale ? handleReplicaChange : null;

    return status;
  }, [module, detail, onScale]);

  return (
    <Card className={className}>
      <ReplicaCount>
        <ReplicaStatus {...replicaStatus}></ReplicaStatus>
      </ReplicaCount>
    </Card>
  );
}

export default Replica;
