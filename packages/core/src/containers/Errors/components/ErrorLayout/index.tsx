/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import type { ReactNode } from 'react';

import { Root, Container, Illustration, Title, Description } from './styles';

interface ErrorLayoutProps {
  title: ReactNode;
  description: ReactNode;
  backgroundImagePath: string;
}

export function ErrorLayout({ title, description, backgroundImagePath }: ErrorLayoutProps) {
  return (
    <Root>
      <Container>
        <Illustration $backgroundImagePath={backgroundImagePath} />
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Container>
    </Root>
  );
}
