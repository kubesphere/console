import React from 'react';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import styled from 'styled-components';
import { useTheme } from '@kubed/components';
import { dark, light } from './prismTheme';

interface CodeBoxProps {
  className?: string;

  withPre?: boolean;

  /** Display line numbers */
  language?: Language;

  /** Display line numbers */
  withLineNumbers?: boolean;

  /** Code which will be highlighted */
  children: string;
}

const LineContainer = styled.div`
  display: flex;
  width: 100%;
  line-height: 22px;
  position: relative;
  padding-left: 40px;
`;

const LineNumber = styled.div`
  width: 40px;
  text-align: right;
  padding-right: ${({ theme }) => theme.layout.spacing.md};
  color: ${({ theme }) => theme.palette.accents_4};
  user-select: none;
  position: absolute;
  left: 0;
`;

interface PreProps extends Omit<CodeBoxProps, 'children'> {
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const Pre = ({ withPre, className, style, children }: PreProps) => {
  if (withPre) {
    return (
      <pre className={className} style={{ padding: '20px', fontSize: '12px', ...style }}>
        {children}
      </pre>
    );
  }
  return <>{children}</>;
};

export default function Prism({
  children,
  language,
  withPre,
  withLineNumbers = true,
}: CodeBoxProps) {
  const theme = useTheme();
  const prismTheme = theme.type === 'dark' ? dark : light;

  return (
    <Highlight {...defaultProps} code={children} language={language!} theme={prismTheme}>
      {({ className: inheritedClassName, style, tokens, getLineProps, getTokenProps }) => (
        <Pre className={inheritedClassName} style={style} withPre={withPre}>
          {tokens
            .map((line, index) => {
              const lineNumber = index + 1;
              const lineProps = getLineProps({ line, key: index });
              return (
                <LineContainer {...lineProps}>
                  {withLineNumbers && <LineNumber>{lineNumber}</LineNumber>}
                  <div className="line-content">
                    {line.map((token, key) => (
                      <span {...getTokenProps({ token, key })} />
                    ))}
                  </div>
                </LineContainer>
              );
            })
            .filter(Boolean)}
        </Pre>
      )}
    </Highlight>
  );
}
