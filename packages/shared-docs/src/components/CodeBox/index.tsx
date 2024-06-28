import React, { useContext } from 'react';
import { Language } from 'prism-react-renderer';
import { LiveProvider } from 'react-live';
import { mdx, MDXContext } from '@mdx-js/react';
import styled from 'styled-components';
import { useTheme } from '@kubed/components';
import { dark, light } from './prismTheme';

import CodeEditor from './CodeEditor';
import Prism from './Prism';
import LivePreview from './LivePreview';

interface CodeBoxProps {
  className?: string;

  /** Display both code and preview */
  live?: boolean;

  /** Only display preview */
  render?: boolean;

  /** Display line numbers */
  withLineNumbers?: boolean;

  /** Code which will be highlighted */
  children: string;
}

const CodeBoxWrapper = styled('div')<Omit<CodeBoxProps, 'children'>>`
  margin: 40px 0;

  .live-preview {
    padding: 20px;
    border: 1px solid ${({ theme }) => theme.palette.accents_2};
    border-radius: 4px;
    ${({ live }) =>
      live &&
      `
      border-bottom: none;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    `}
  }

  .live-error {
    margin: 0;
    border-bottom: 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    background: rgb(255, 85, 85);
    color: rgb(248, 248, 242);
    white-space: pre-wrap;
    text-align: left;
    font-size: 12px;
  }
`;

const TestWrapper = styled.div`
  display: flex;
  width: 100px;
  height: 30px;
`;

export default function CodeBox({
  children,
  className,
  live,
  render,
  withLineNumbers = true,
}: CodeBoxProps) {
  const language = className?.replace(/language-/, '') as Language;
  const theme = useTheme();
  const prismTheme = theme.type === 'dark' ? dark : light;

  const mdxContext = useContext(MDXContext) as object;
  const scope = { mdx, ...mdxContext, TestWrapper };

  if (live) {
    return (
      <CodeBoxWrapper live>
        <LiveProvider language={language} code={children.trim()} scope={scope} theme={prismTheme}>
          <LivePreview />
          <CodeEditor fontFamily={theme.font.mono} className="code-editor" />
        </LiveProvider>
      </CodeBoxWrapper>
    );
  }

  if (render) {
    return (
      <CodeBoxWrapper>
        <LiveProvider language={language} code={children.trim()} scope={scope} theme={prismTheme}>
          <LivePreview />
        </LiveProvider>
      </CodeBoxWrapper>
    );
  }

  return (
    <Prism language={language} withLineNumbers={withLineNumbers} withPre>
      {children.trim()}
    </Prism>
  );
}
