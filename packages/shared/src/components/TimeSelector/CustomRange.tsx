/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useRef } from 'react';
import classNames from 'classnames';
import dayjs, { Dayjs } from 'dayjs';
import {
  Button,
  DatePicker,
  Form,
  FormInstance,
  FormItem,
  notify,
  Select,
} from '@kubed/components';
import { getMinutes, getTimeOptions, ValueType } from './utils';
import { Actions, Title } from './styles';

interface Props {
  start?: Date;
  end?: Date;
  showStep?: boolean;
  step?: string;
  times?: number;
  timeOps?: string[];
  onSubmit?: (value: ValueType) => void;
  onCancel?: () => void;
  zIndex?: number;
}

interface FormValue {
  step: string;
  start: Date;
  end: Date;
}

const DEFAULT_TIME_OPTIONS = ['1m', '2m', '5m', '10m', '15m', '30m', '1h', '2h', '5h'];

function range(start: number, end: number) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}

function disabledDate(current: Dayjs) {
  return current && current > dayjs().endOf('day');
}

function disabledRangeTime(date: Dayjs | null) {
  const hour = dayjs().hour();
  const minute = dayjs().minute();
  const second = dayjs().second();
  if (date && dayjs(date).date() === dayjs().date()) {
    return {
      disabledHours: () => range(hour + 1, 24),
      disabledMinutes: (selectedHour: number) =>
        selectedHour >= hour ? range(minute + 1, 60) : [],
      disabledSeconds: (selectedHour: number, selectedMinute: number) =>
        selectedHour >= hour && selectedMinute >= minute ? range(second + 1, 60) : [],
    };
  }
  return {
    disabledHours: () => [],
    disabledMinutes: () => [],
    disabledSeconds: () => [],
  };
}

function CustomRange({
  showStep = true,
  step = '10m',
  start,
  end,
  timeOps = DEFAULT_TIME_OPTIONS,
  onSubmit,
  onCancel,
  zIndex = 100,
}: Props) {
  const formRef = useRef<FormInstance<FormValue>>(null);

  const now = dayjs(new Date());
  const currentStart = dayjs(new Date(now.valueOf() - 3600000));
  const initialValues = {
    step,
    start: start ? start : currentStart,
    end: end ? end : now,
  };

  const handleOk = (val: FormValue) => {
    if (!val.start || !val.end) {
      notify.error(t('TIMERANGE_SELECTOR_ERROR_MSG'));
      return;
    }
    const startTime = val.start.valueOf() / 1000;
    const endTime = val.end.valueOf() / 1000;
    const interval = endTime - startTime;
    if (interval > 0) {
      const currentTimes = Math.floor(interval / (getMinutes(val.step) * 60)) || 1;
      const data = {
        step: val.step,
        times: currentTimes,
        start: startTime,
        end: endTime,
        lastTime: '',
      };
      onSubmit?.(data);
    } else {
      notify.error(t('TIMERANGE_SELECTOR_MSG'));
    }
  };

  return (
    <div>
      <Title>{t('CUSTOM_TIME_RANGE')}</Title>
      <Form initialValues={initialValues} ref={formRef} onFinish={handleOk}>
        <FormItem label={t('START_TIME')} name="start">
          <DatePicker
            disabledDate={disabledDate}
            disabledTime={disabledRangeTime}
            showTime
            popupStyle={{ zIndex }}
            showNow={false}
            format="YYYY-MM-DD HH:mm:ss"
          ></DatePicker>
        </FormItem>
        <FormItem label={t('END_TIME')} name="end">
          <DatePicker
            disabledDate={disabledDate}
            disabledTime={disabledRangeTime}
            popupStyle={{ zIndex }}
            showTime
            showNow={false}
            format="YYYY-MM-DD HH:mm:ss"
          ></DatePicker>
        </FormItem>
        {showStep && (
          <FormItem label={t('SAMPLING_INTERVAL')} name="step">
            <Select options={getTimeOptions(timeOps)}></Select>
          </FormItem>
        )}
      </Form>
      <Actions
        className={classNames({
          bottom10: !showStep,
        })}
      >
        <Button onClick={onCancel}>{t('CANCEL')}</Button>
        <Button
          variant="filled"
          color="secondary"
          shadow
          onClick={() => {
            formRef?.current?.submit();
          }}
        >
          {t('OK')}
        </Button>
      </Actions>
    </div>
  );
}

export default CustomRange;
