/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import Icon from '../Icon';
import StatusIndicator from '../StatusIndicator';
import { Constants } from '../../constants';
import { FormattedPod } from '../../types';
import { Avatar, AvatarIcon, Desc, Indicator, Title } from './styles';
import { Link } from 'react-router-dom';

interface IProps {
  module: string;
  cluster: string;
  record: FormattedPod;
}
const { ICON_TYPES }: { ICON_TYPES: Record<string, string> } = Constants;

const PodIndicator = (props: IProps) => {
  const { module, record, cluster } = props;
  const { podStatus, name } = record;

  return (
    <Avatar>
      <AvatarIcon>
        <Icon name={ICON_TYPES[module]} size={40} />
        <Indicator>
          <StatusIndicator type={podStatus.type as any} motion />
        </Indicator>
      </AvatarIcon>
      <div>
        <Title>
          <Link to={`/clusters/${cluster}/projects/${record.namespace}/${module}/${name}`}>
            {name}
          </Link>
        </Title>
        {/* // TODO: reason */}
        <Desc>reason</Desc>
      </div>
    </Avatar>
  );
};

export default PodIndicator;
