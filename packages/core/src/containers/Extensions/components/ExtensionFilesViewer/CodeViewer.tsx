/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useState, useEffect } from 'react';
import { saveAs } from 'file-saver';
import { Tooltip } from '@kubed/components';
import { File, Copy, Download } from '@kubed/icons';

import { copyToClipboard } from '@ks-console/shared';
import { Prism } from './Prism';
import {
  Root,
  Header,
  TitleWrapper,
  Title,
  HeaderButton,
  HeaderButtons,
  Content,
} from './CodeViewer.styles';

interface CodeViewerProps {
  filePath: string;
  data: string;
  language: string;
}

const DELAY = 2000;

export function CodeViewer({ filePath, data, language }: CodeViewerProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [copyTimeoutId, setCopyTimeoutId] = useState<number | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimeoutId) {
        window.clearTimeout(copyTimeoutId);
      }
    };
  }, []);

  if (!data) {
    return <Root />;
  }

  const handleDownload = () => {
    const blob = new Blob([data], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, filePath);
  };

  return (
    <Root>
      <Header>
        <TitleWrapper>
          <File size={20} />
          <Title>{filePath}</Title>
        </TitleWrapper>
        <HeaderButtons>
          <Tooltip content={t(isCopied ? 'COPIED' : 'COPY')} hideOnClick={false}>
            <HeaderButton
              onClick={() => {
                copyToClipboard(data);
                setIsCopied(true);
                setCopyTimeoutId(window.setTimeout(() => setIsCopied(false), DELAY));
              }}
            >
              <Copy />
            </HeaderButton>
          </Tooltip>
          <Tooltip content={t('DOWNLOAD')}>
            <HeaderButton onClick={handleDownload}>
              <Download />
            </HeaderButton>
          </Tooltip>
        </HeaderButtons>
      </Header>
      <Content>
        <Prism language={language}>{data}</Prism>
      </Content>
    </Root>
  );
}
