/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { Constants, Icon } from '@ks-console/shared';
import React from 'react';
import { Link } from 'react-router-dom';
import { Item as ItemNode, IconWrapper, IconStatus, Info, StyledTag } from './styles';

interface Props {
  prefix?: string;
  data: {
    node_name?: string;
    node_ip?: string;
    hasLeader: boolean;
    isLeader: boolean;
    leaderChanges: any;
    isOnline: boolean;
  };
}

function Item({ prefix = '', data }: Props) {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { node_name, node_ip, isOnline, hasLeader, isLeader, leaderChanges } = data;
  const isExternal = !node_name;
  const type = isOnline ? 'running' : 'error';

  return (
    <ItemNode>
      <IconWrapper>
        <Icon name={Constants.ICON_TYPES.etcd} size={40} />
        <IconStatus type={type} />
      </IconWrapper>
      <Info>
        <div>
          <strong>
            {isExternal ? (
              t('EXTERNAL_ETCD')
            ) : (
              <Link to={`${prefix}/${node_name}`}>{node_name}</Link>
            )}
            {isLeader && <StyledTag>leader</StyledTag>}
          </strong>
          <span>{t('NODE_IP_ADDRESS_VALUE', { value: node_ip || '-' })}</span>
        </div>
        <p>
          <strong>{hasLeader ? t('YES') : t('NO')}</strong>
          <span>{t('ETCD_LEADER_TITLE')}</span>
        </p>
        <p>
          <strong>{leaderChanges}</strong>
          <span>{t('ETCD_CHANGES_TITLE')}</span>
        </p>
      </Info>
    </ItemNode>
  );
}

export default Item;
