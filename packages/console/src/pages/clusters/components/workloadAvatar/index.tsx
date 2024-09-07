/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Tooltip } from '@kubed/components';
import { FormattedWorkload, Icon } from '@ks-console/shared';
import { Avatar } from './styles';

const WorkLoadAvatar = (record: any, module: string) => {
  const asRecord = record as FormattedWorkload;

  const IconName: Record<string, string> = {
    DEPLOYMENT: 'backup',
    STATEFULSET: 'stateful-set',
    DAEMONSET: 'deamon-set',
    JOB: 'backup',
    CRONJOB: 'backup',
  };

  if (asRecord.isFedManaged) {
    return (
      <Avatar>
        <Icon name="backup" size={40} />
        <Tooltip
          placement="top"
          content={
            <div>
              <div className="tooltip-title">{t('MULTI_CLUSTER_PROJECT')}</div>
              <p>{t('MULTI_CLUSTER_PROJECT_TIP')}</p>
            </div>
          }
        >
          <div>
            <img src="/assets/multi-cluster.svg" alt="" />
          </div>
        </Tooltip>
      </Avatar>
    );
  }

  return <Icon name={IconName[module]} size={40} />;
};

export default WorkLoadAvatar;
