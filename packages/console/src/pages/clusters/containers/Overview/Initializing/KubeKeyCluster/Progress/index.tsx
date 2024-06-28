import React from 'react';
import { ClusterDetail } from '@ks-console/shared';
import { get } from 'lodash';
import { Tooltip } from '@kubed/components';
import { Check, Dot, Question } from '@kubed/icons';
import { CLUSTER_CREATING_STEPS } from '../constants';
import {
  Card,
  ProgressContent,
  ProgressBar,
  Wrapper,
  ColorBar,
  DotsWrapper,
  Dots,
  Circle,
} from './styles';
import { Title } from '../../style';

interface Props {
  detail: ClusterDetail;
}

const getBarLength = (conditions: ClusterDetail['conditions'][]) => {
  if (conditions.length === 0) {
    return '20px';
  }

  const len = conditions.length - 1;
  const lastStepComplete = conditions[len].status;
  return `calc(${len * 20}% - ${len * 24 - (lastStepComplete ? 80 : 60)}px)`;
};

function Progress({ detail }: Props) {
  const conditions = get(detail, 'status.Conditions', []);
  return (
    <Wrapper>
      <Card>
        <Title>
          {t('CLUSTER_CREATION_PROGRESS')}&nbsp;
          <Tooltip content={t('CLUSTER_CREATION_PROGRESS_TIP')}>
            <Question />
          </Tooltip>
        </Title>
        <ProgressContent>
          <ProgressBar>
            <ColorBar style={{ width: getBarLength(conditions) }}></ColorBar>
          </ProgressBar>
          <DotsWrapper>
            {CLUSTER_CREATING_STEPS.map((step, index) => (
              <Dots key={step} style={{ left: `${index * 20}%` }}>
                <Circle checked={index <= conditions.length - 1}>
                  {index <= conditions.length - 1 &&
                    (get(conditions, `[${index}].status`) ? (
                      <Check size={14} />
                    ) : (
                      <Dot size={14} />
                    ))}
                  {}
                </Circle>
                <div>{t(step.toUpperCase().replace(/\s+/g, '_'))}</div>
              </Dots>
            ))}
          </DotsWrapper>
        </ProgressContent>
      </Card>
    </Wrapper>
  );
}

export default Progress;
