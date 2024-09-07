/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { Notify, notify } from '@kubed/components';
import React from 'react';

const { WithTitle } = Notify;

// TODO: add more params
export default function v3Notify(msg: {
  message: string | { title: string; content: string; duration?: number };
  type: 'info' | 'success' | 'warning' | 'error';
}) {
  const { message, type } = msg;
  (notify as any).info = notify;
  (notify as any).warning = notify.error;

  if (typeof message === 'string') {
    notify[type as 'success'](message);
  } else {
    const { title, content, duration } = message;
    const opts = duration ? { duration } : {};
    notify[type as 'success'](
      title ? <WithTitle title={title} message={content} /> : content,
      opts,
    );
  }
}
