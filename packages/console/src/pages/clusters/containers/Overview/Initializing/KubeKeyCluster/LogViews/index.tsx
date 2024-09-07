/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useEffect, useRef, useState } from 'react';
import { get, isEmpty } from 'lodash';
import {
  ClusterDetail,
  containerStore,
  useWebSocket,
  workloadStore,
  Pattern,
} from '@ks-console/shared';
import { Field } from '@kubed/components';
import { Log } from '@kubed/icons';
import JobStatus from '../../../../../../../components/JobStatus';
import { CLUSTER_CREATING_STEPS } from '../constants';
import { Content, LogsContainer, Title, Wrapper } from './styles';

interface Props {
  detail: ClusterDetail;
}

const { useContainerLogFollow } = containerStore;
const { getWatchUrl, mapper } = workloadStore('jobs');

function Logs({ detail }: Props) {
  const [showContent, setShowContent] = useState<boolean>(false);
  const [workloadDetail, setWorkloadDetail] = useState<any>({});
  const logRef = useRef<HTMLDivElement>(null);

  const jobDetail = get(detail, 'status.jobInfo', {});
  const conditions = get(detail, 'status.Conditions', []);
  const lastStep = CLUSTER_CREATING_STEPS[Math.max(conditions.length - 1, 0)];

  const { data } = useContainerLogFollow({
    namespace: jobDetail?.namespace,
    podName: get(jobDetail, `pods[0].name`),
    params: {
      container: get(jobDetail, `pods[0].containers[0].name`),
      timestamps: true,
      follow: true,
    },
    enabled: jobDetail && !isEmpty(get(detail, 'status.jobInfo.pods[0].name')),
  });

  useWebSocket({
    module: 'jobs',
    url: getWatchUrl(jobDetail),
    enabled: jobDetail && !isEmpty(get(detail, 'status.jobInfo.name')),
    onMessage: ({ message }) => {
      if (message.type === 'MODIFIED' || message.type === 'ADDED') {
        setWorkloadDetail(mapper(message.object));
      }
    },
  });

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [logRef.current, data]);

  const handleToggle = () => {
    setShowContent(!showContent);
  };

  const status = workloadDetail?.startTime ? (
    <JobStatus record={workloadDetail} module="jobs" />
  ) : (
    '-'
  );
  const logs = isEmpty(data) ? t('FETCHING_LOGS') : data;
  const items = String(logs)
    .replace(/\\r\\n/g, '\n')
    .split('\n');

  return (
    <Wrapper>
      <Title isOpen={showContent} onClick={handleToggle}>
        <Field
          avatar={<Log />}
          value={t('LOGS')}
          label={t('CURRENT_STEP', {
            step: t(lastStep.toUpperCase().replace(/\s+/g, '_')),
          })}
        ></Field>
        <Field value={status} label={t('STATUS')} />
      </Title>
      <Content visible={showContent}>
        <LogsContainer ref={logRef}>
          {items.map((text, index) => {
            const match = text.match(Pattern.PATTERN_UTC_TIME);
            const key = match ? match[0] : index;
            const content = match ? text.replace(match[0], '') : text;
            return <p key={key} dangerouslySetInnerHTML={{ __html: content }} />;
          })}
        </LogsContainer>
      </Content>
    </Wrapper>
  );
}

export default Logs;
