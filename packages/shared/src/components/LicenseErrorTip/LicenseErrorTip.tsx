/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import type { ReactElement } from 'react';
import { Tooltip } from '@kubed/components';

import type { LicenseAuthorizationStatus } from '../../types/license';

import { TooltipContent, Icon } from './LicenseErrorTip.styles';

export interface LicenseErrorTipProps {
  className?: string;
  authorizationStatus: LicenseAuthorizationStatus | undefined;
  children?: ReactElement;
}

export function LicenseErrorTip({
  className,
  authorizationStatus,
  children,
}: LicenseErrorTipProps) {
  const MAP = {
    unauthorized: {
      isShow: true,
      title: t('LICENSE_ERROR_TIP_TITLE'),
      description: t('LICENSE_ERROR_TIP_DESCRIPTION', {
        reason: t('LICENSE_ERROR_TIP_UNAUTHORIZED'),
      }),
    },
    expired: {
      isShow: true,
      title: t('LICENSE_ERROR_TIP_TITLE'),
      description: t('LICENSE_ERROR_TIP_DESCRIPTION', {
        reason: t('LICENSE_ERROR_TIP_EXPIRED'),
      }),
    },
    overLimit: {
      isShow: true,
      title: t('LICENSE_ERROR_TIP_TITLE'),
      description: t('LICENSE_ERROR_TIP_DESCRIPTION', {
        reason: t('LICENSE_ERROR_TIP_OVER_LIMIT'),
      }),
    },
    authorized: {
      isShow: false,
      title: null,
      description: null,
    },
  };

  if (!authorizationStatus) {
    return null;
  }

  const { isShow, title, description } = MAP[authorizationStatus];

  if (!isShow) {
    return null;
  }

  return (
    <Tooltip
      content={
        <TooltipContent>
          <h6 className="title">{title}</h6>
          <p className="description">{description}</p>
        </TooltipContent>
      }
    >
      {children ? children : <Icon className={className} />}
    </Tooltip>
  );
}
