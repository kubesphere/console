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
