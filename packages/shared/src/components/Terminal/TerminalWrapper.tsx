/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { lazy, forwardRef, Suspense } from 'react';

import { urlHelper } from '../../utils';
import type { TerminalProps, TerminalRef } from './types';
import { FALLBACK } from './constants';
import {
  Wrapper,
  TerminalWrapper as TerminalWrapper1,
  ActionsWrapper,
  Divider,
} from './TerminalWrapper.styles';
import styled, { css } from 'styled-components';
import { Download, Upload } from '@kubed/icons';
import { Tooltip } from '@kubed/components';
import UploadModal from '../Modals/UploadModal';
import DownloadModal from '../Modals/DownloadModal';

const Terminal = lazy(() => import('./Terminal'));

const { getWebSocketProtocol, getClusterUrl } = urlHelper;
const loadingCss = css`
  @keyframes ellipsis {
    0% {
      content: '';
    }
    33% {
      content: '.';
    }
    66% {
      content: '..';
    }
    100% {
      content: '...';
    }
  }
`;
const LoadingText = styled.div`
  ${loadingCss}
  &::after {
    content: '';
    display: inline-block;
    animation: ellipsis 1s infinite;
    letter-spacing: 4px;
  }
`;

export default forwardRef<TerminalRef, TerminalProps>(function TerminalWrapper(
  { isLoading, websocketUrl, uploadUrl, downloadUrl, ...restTerminalProps },
  ref,
) {
  const url = `${getWebSocketProtocol(window.location.protocol)}://${
    window.location.host
  }${getClusterUrl(`/${websocketUrl}`)}`;

  const [uploadVisible, setUploadVisible] = React.useState(false);
  const [downloadVisible, setDownloadVisible] = React.useState(false);
  // if (!websocketUrl) {
  // return null;
  // }

  const renderActions = () => {
    if (!uploadUrl && !downloadUrl) {
      return null;
    }
    let actions = [];

    if (downloadUrl)
      actions.push(
        <Tooltip content={t('DOWNLOAD')}>
          <Download
            size={20}
            variant="light"
            className="icon-clickable"
            onClick={() => {
              setDownloadVisible(true);
            }}
          />
        </Tooltip>,
      );
    if (uploadUrl)
      actions.push(
        <Tooltip content={t('UPLOAD')}>
          <Upload
            size={20}
            variant="light"
            className="icon-clickable"
            onClick={() => {
              setUploadVisible(true);
            }}
          />
        </Tooltip>,
      );
    return (
      <ActionsWrapper>
        {actions.map((action, index) => {
          return (
            <>
              {action}
              {index !== actions.length - 1 && <Divider>|</Divider>}
            </>
          );
        })}
      </ActionsWrapper>
    );
  };

  return (
    <Wrapper>
      <Suspense fallback={FALLBACK}>
        {isLoading || !websocketUrl ? (
          <LoadingText>{FALLBACK + ' '}</LoadingText>
        ) : (
          <TerminalWrapper1>
            <Terminal ref={ref} websocketUrl={url} {...restTerminalProps} />
            {renderActions()}
          </TerminalWrapper1>
        )}
        {uploadUrl && uploadVisible && (
          <UploadModal
            visible={true}
            uploadUrl={uploadUrl}
            onCancel={() => setUploadVisible(false)}
          />
        )}
        {downloadUrl && downloadVisible && (
          <DownloadModal
            visible={true}
            downloadUrl={downloadUrl}
            onCancel={() => {
              setDownloadVisible(false);
            }}
          />
        )}
      </Suspense>
    </Wrapper>
  );
});
