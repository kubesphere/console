/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import cx from 'classnames';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';

import type { MarkdownProps } from './types';
import { DEFAULT_THEME, THEMES } from './constants';
import { Root } from './Markdown.styles';

export function Markdown({
  isSupportGFM,
  themeName,
  classNames,
  styles,
  className,
  remarkPlugins,
  rehypePlugins,
  children,
  ...rest
}: MarkdownProps) {
  const theme = themeName ? THEMES[themeName] : DEFAULT_THEME;

  const finalRemarkPlugins = [...(isSupportGFM ? [remarkGfm] : []), ...(remarkPlugins ?? [])];

  const finalRehypePlugins = [rehypeSlug, ...(rehypePlugins ?? [])];

  return (
    <Root $styles={theme?.styles} className={classNames?.root} style={styles?.root}>
      <ReactMarkdown
        className={cx(theme.className, classNames?.markdown, className)}
        remarkPlugins={finalRemarkPlugins}
        rehypePlugins={finalRehypePlugins}
        {...rest}
      >
        {children}
      </ReactMarkdown>
    </Root>
  );
}
