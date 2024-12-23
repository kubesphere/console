/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import { omit } from 'lodash';
import classNames from 'classnames';
import { CaretDown, TimedTask } from '@kubed/icons';
import { getDateStr, getIconTheme, getLastTimeStr, getTimeLabel, ValueType } from './utils';
import DefaultRange from './DefaultRange';
import CustomRange from './CustomRange';
import { Content, Mask, Selector, StyledButton } from './styles';

interface Props {
  arrowIcon?: ReactNode;
  dark?: boolean;
  step?: string;
  times?: number;
  renderCustom?: boolean;
  showStep?: boolean;
  onChange?: (val: Omit<ValueType, 'lastTime'>) => void;
  onToggle?: (toggled: boolean) => void;
  timeOps?: string[];
  zIndex?: number;
}

function TimeSelector({
  arrowIcon,
  dark,
  step = '10m',
  times = 30,
  showStep = true,
  renderCustom,
  timeOps,
  onChange,
  onToggle,
  zIndex,
}: Props) {
  const [visible, setVisible] = useState<boolean>(false);
  const [selfValue, setSelfValue] = useState<ValueType>({
    step,
    times,
    start: '',
    end: '',
    lastTime: '',
  });

  useEffect(() => {
    setSelfValue({
      ...selfValue,
      times,
      step,
    });
  }, [step, times]);

  useEffect(() => {
    onToggle?.(visible);
  }, [visible]);

  const handleToggle = () => {
    setVisible(!visible);
  };

  const hideSelector = () => {
    setVisible(false);
  };

  const handleTimeChange = (data: ValueType) => {
    setVisible(false);
    setSelfValue({
      ...selfValue,
      ...data,
    });
    const newData = omit(data, 'lastTime');
    onChange?.(newData);
  };

  const buttonText = useMemo(() => {
    const { step: selfStep, times: selfTimes, start, end, lastTime } = selfValue;
    if (start && end && !lastTime) {
      const intervalText = `(${t('INTERVAL')} ${getTimeLabel(selfStep)})`;
      return `${getDateStr(start)} ~ ${getDateStr(end)} ${showStep ? intervalText : ''}`;
    }

    const lastTimeText = getTimeLabel(lastTime || getLastTimeStr(selfStep, selfTimes));
    return t('LAST_TIME', { value: lastTimeText });
  }, [showStep, selfValue]);

  const content = useMemo(
    () => (
      <Content className={renderCustom ? 'custom' : ''}>
        <DefaultRange
          timeOps={timeOps}
          step={selfValue.step}
          times={selfValue.times}
          onChange={handleTimeChange}
        />
        {renderCustom && (
          <CustomRange
            step={selfValue.step}
            times={selfValue.times}
            showStep={showStep}
            onSubmit={handleTimeChange}
            onCancel={hideSelector}
            zIndex={zIndex}
          />
        )}
      </Content>
    ),
    [selfValue, showStep, renderCustom],
  );

  return (
    <Selector
      className={classNames({
        active: visible,
      })}
    >
      <Mask
        className={classNames({
          active: visible,
        })}
        onClick={hideSelector}
      />
      <StyledButton onClick={handleToggle}>
        <TimedTask size={20} {...getIconTheme(dark ? 'dark' : 'light')} />
        <p>{buttonText}</p>
        {arrowIcon || <CaretDown className="arrow" {...getIconTheme(dark ? 'dark' : 'light')} />}
      </StyledButton>
      <div className="dropdown">{content}</div>
    </Selector>
  );
}

TimeSelector.DefaultRange = DefaultRange;
TimeSelector.CustomRange = CustomRange;

export default TimeSelector;
