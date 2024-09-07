/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { Icon } from '@ks-console/shared';
import React, { ReactNode } from 'react';
import { LinkNode, Text, Wrapper } from './styles';

interface Props {
  icon?: string;
  iconProps?: any;
  image?: string;
  title?: ReactNode;
  desc?: ReactNode;
  extra?: ReactNode;
  size?: string;
  url?: string;
}

function Info({ icon, iconProps, image, title, desc, extra, size, url }: Props) {
  const content = (
    <>
      <div className="icon">
        {image ? (
          <img src={image} alt="" />
        ) : (
          <Icon name={icon} size={40} variant="dark" {...iconProps} />
        )}
      </div>
      <Text>
        <div>{title}</div>
        <p>{desc}</p>
      </Text>
      {extra}
    </>
  );

  if (url) {
    return (
      <LinkNode to={url} className={size}>
        {content}
      </LinkNode>
    );
  }

  return <Wrapper className={size}>{content}</Wrapper>;
}

export default Info;
