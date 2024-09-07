/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { ReactNode } from 'react';

import { transferVersionStatus } from '../../../utils';
import { STATUS_TO_ICON } from '../../../constants/common';

import {
  DraftStatus,
  PassedStatus,
  ReviewStatus,
  DeletedStatus,
  StatusWrapper,
  SuspendedStatus,
  SuspendedStatusIcon,
} from './styles';

type Props = {
  name?: string;
  type?: string;
  hideName?: boolean;
  hideIcon?: boolean;
  className?: string;
};

export function VersionStatus({
  name = '',
  type = '',
  className,
  hideIcon,
  hideName,
}: Props): JSX.Element {
  const status = transferVersionStatus(name || type);
  const iconType = STATUS_TO_ICON[type] || type;
  const iconItem: Record<string, ReactNode> = {
    draft: <DraftStatus />,
    passed: <PassedStatus />,
    deleted: <DeletedStatus />,
    suspended: (
      <SuspendedStatus>
        <SuspendedStatusIcon size={13} />
      </SuspendedStatus>
    ),
  };

  return (
    <StatusWrapper className={className}>
      {!hideIcon && <>{iconItem[iconType] || <ReviewStatus />}</>}
      {!hideName && <label>{status}</label>}
    </StatusWrapper>
  );
}
