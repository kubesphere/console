/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { merge } from 'lodash';
import type { SyntaxHighlighterProps } from 'react-syntax-highlighter';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import { Root } from './Prism.styles';
import solarizedLight from './prism.style.solarizedLight';

interface PrismProps extends SyntaxHighlighterProps {}

const DEFAULT_PROPS: Partial<SyntaxHighlighterProps> = {
  // @ts-ignore
  style: solarizedLight,
  customStyle: {
    padding: '8px 0',
    margin: 0,
    border: 0,
    backgroundColor: 'transparent',
  },
  lineNumberStyle: {
    minWidth: 48,
    padding: '0 12px',
    marginRight: '8px',
  },
  showLineNumbers: true,
  wrapLongLines: true,
};

export function Prism(props: PrismProps) {
  const finalProps = merge({}, DEFAULT_PROPS, props);
  return (
    <Root>
      <SyntaxHighlighter {...finalProps} />
    </Root>
  );
}
