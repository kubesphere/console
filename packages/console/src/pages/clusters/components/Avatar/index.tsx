/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Tooltip } from '@kubed/components';
import { Constants, Icon } from '@ks-console/shared';
import { NameWrapper } from './styles';
const { ICON_TYPES } = Constants;

interface Props {
  record: {
    [key: string]: any;
    isFedManaged?: boolean;
  };
  module: string;
}

const Avatar = (props: Props) => {
  const { module, record } = props;

  return (
    <NameWrapper>
      <Icon name={ICON_TYPES[module]} size={40} />
      {record?.isFedManaged && (
        <Tooltip
          content={
            <>
              <div className="tooltip-title">{t('MULTI_CLUSTER_PROJECT')}</div>
              <p>{t('MULTI_CLUSTER_PROJECT_TIP')}</p>
            </>
          }
        >
          <img src="/assets/cluster.svg" />
        </Tooltip>
      )}
    </NameWrapper>
  );
};

export default Avatar;
