/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import dayjs from 'dayjs';
import { isString } from 'lodash';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export const getLocalTime = (time?: string) => {
  let formatTime = time;

  if (time && isString(time) && time.indexOf(' +0000 UTC') !== -1) {
    formatTime = time.replace(' +0000 UTC', 'Z').replace(' ', 'T');
  }

  return dayjs(formatTime).local();
};

export const getCurrentDateTimeRFC3339 = () => {
  const now = dayjs(new Date());
  return now.format();
};
