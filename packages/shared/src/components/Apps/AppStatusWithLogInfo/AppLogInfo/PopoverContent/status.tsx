import { Failure, Information, Success, Warning } from '@kubed/icons';
import { Loading } from '@kubed/components';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/naming-convention
export type typeProps = 'default' | 'error' | 'warning' | 'success' | 'blue';

function getIcons() {
  const size = 16;
  return {
    notInstalled: <Information size={size} fill="#f5a623" color="#fff" />,
    loading: <Loading size={size} variant="circle2" color="yellow" />,
    success: <Success size={size} fill="#55bc8a" color="#fff" />,
    failure: <Failure size={size} fill="#ca2621" color="#fff" />,
    exception: <Warning size={size} fill="#f5a623" color="#fff" />,
    default: <Information size={size} fill="#79879c" color="#fff" />,
  };
}

export function getAppStatusStateInfo(type: typeProps) {
  const icons = getIcons();
  let icon = icons.success;
  switch (type) {
    case 'blue':
      icon = icons.loading;
      break;
    case 'warning':
      icon = icons.exception;
      break;

    case 'error':
    case 'success':
      icon = icons.failure;
      break;

    case 'default':
    default:
      icon = icons.default;
  }

  return {
    icon: icon,
    hasViewLogButton: true,
  };
}
