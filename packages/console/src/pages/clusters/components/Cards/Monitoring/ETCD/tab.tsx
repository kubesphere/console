/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Icon } from '@ks-console/shared';
import { InfoTitle, Tab } from '../styles';
import { InfoNode } from './styles';

interface Props {
  active?: boolean;
  icon?: string;
  name?: string;
  title?: string;
}

export default function TabItem({ active, name = '', icon = '', title = '' }: Props) {
  const iconProps = { fill: '#fff', color: '#fff' };

  return (
    <Tab>
      <Icon name={icon} size={40} style={{ ...(active ? iconProps : null) }} />
      <InfoNode active={!!active}>
        <InfoTitle>{t(name)}</InfoTitle>
        <p dangerouslySetInnerHTML={{ __html: t(title) }} />
      </InfoNode>
    </Tab>
  );
}
