/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { merge } from 'lodash';
import { themeUtils, useTheme, Loading } from '@kubed/components';
import type { LogViewerProps } from '@kubed/log-viewer';
import { LogViewer as BaseLogViewer } from '@kubed/log-viewer';

import { LoadingWrapper } from './LogViewer.styles';

const { getColor } = themeUtils;

function LogViewer(props: LogViewerProps) {
  const theme = useTheme();
  const backgroundColor = getColor('dark[3]', theme);
  const defaultProps: Partial<LogViewerProps> = {
    autoScroll: true,
    bodyStyle: {
      overflowY: 'auto',
      borderRadius: '4px',
      backgroundColor,
    },
  };
  const finalProps = merge({}, defaultProps, props);
  const { log, bodyStyle } = finalProps;

  if (!log) {
    return (
      <LoadingWrapper style={bodyStyle}>
        <Loading />
      </LoadingWrapper>
    );
  }

  return <BaseLogViewer {...finalProps} />;
}

export { LogViewer };
