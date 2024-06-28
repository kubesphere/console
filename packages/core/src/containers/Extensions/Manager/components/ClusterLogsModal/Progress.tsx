import React from 'react';
import type { CSSProperties } from 'react';

import { useTheme, themeUtils } from '@kubed/components';

import { Wrapper, Item } from './Progress.styles';

const { getColor } = themeUtils;

interface ProgressProps {
  total: number;
  completed: number;
}

function Progress({ total, completed }: ProgressProps) {
  const theme = useTheme();
  const completedColor = getColor('green', theme);

  const list: { style?: CSSProperties }[] = [];

  if (total > 0) {
    for (let i = 0; i < total; i++) {
      if (i < completed) {
        list.push({ style: { backgroundColor: completedColor } });
      } else {
        list.push({});
      }
    }
  }

  return (
    <Wrapper>
      {list.map((props, index) => (
        <Item key={index} {...props} />
      ))}
    </Wrapper>
  );
}

export { Progress };
