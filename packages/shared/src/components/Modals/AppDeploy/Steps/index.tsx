import React from 'react';
import cx from 'classnames';

import { Indicator, StepWrapper } from './styles';

type Props = {
  steps: any[];
  current: any;
};

function Steps({ steps, current }: Props): JSX.Element {
  return (
    <StepWrapper>
      {steps.map((step, index) => (
        <div key={step.title}>
          <Indicator
            className={cx('indicator', {
              ['fullfill']: current > index,
              ['current']: current === index,
              ['pending']: current < index,
            })}
          />
          <span>{t(step.title)}</span>
        </div>
      ))}
    </StepWrapper>
  );
}

export default Steps;
