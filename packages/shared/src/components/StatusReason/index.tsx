/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { Popover } from '@kubed/components';
import { Error, Information, Success } from '@kubed/icons';
import { get } from 'lodash';
import React from 'react';
import {
  ConditionItem,
  Conditions,
  Events,
  Line,
  LineBreak,
  ReasonDesc,
  Title,
  TitleText,
  Wrapper,
} from './styles';

type Condition = {
  type: string;
  status: 'True' | 'False';
  reason: string;
  message: string;
};

interface StatusReasonProps {
  data: any;
  reason?: string;
  status?: string;
  type?: string;
  hasTip?: boolean;
  onShowEvents?: () => void;
}

const isSuccess = (type: string, condition: Condition): boolean => {
  const conditionType = condition.type;
  const conditionStatus = condition.status;

  if (type === 'volume' || type === 'cluster') {
    return conditionStatus === 'True';
  }

  return conditionType === 'ReplicaFailure'
    ? conditionStatus === 'False'
    : conditionStatus === 'True';
};

function StatusReason({
  data,
  reason = '',
  status,
  type = 'workload',
  hasTip,
  onShowEvents,
}: StatusReasonProps) {
  const conditionsPath = type === 'cluster' ? 'conditions' : 'status.conditions';
  const reasonContent = type === 'cluster' ? t('UNREADY') : t(reason);
  const conditions = (
    <Conditions>
      {Object.values(get(data, conditionsPath, {})).map((cd: any) => (
        <ConditionItem key={cd.type}>
          <Title>
            {isSuccess(type, cd) ? (
              <Success variant="coloured" />
            ) : (
              <Error color="#fff" fill="#ea4641" />
            )}
            <TitleText>
              {t(`${type.toUpperCase()}_CONDITION_${cd.type.toUpperCase()}`, {
                defaultValue: cd.type,
              })}
            </TitleText>
          </Title>
          {cd.status && (
            <Line>
              {t('STATUS_VALUE', {
                value: cd.status === 'True' ? 'True' : 'False',
              })}
            </Line>
          )}
          {cd.reason && (
            <Line>
              {t('REASON_VALUE', {
                value: t(`${type.toUpperCase()}_REASON_${cd.reason.toUpperCase()}`, {
                  defaultValue: cd.reason,
                }),
              })}
            </Line>
          )}
          {cd.message && <LineBreak>{t('MESSAGE_VALUE', { value: cd.message })}</LineBreak>}
        </ConditionItem>
      ))}
      {onShowEvents && <Events onClick={onShowEvents}>{t('SHOW_EVENTS')}</Events>}
    </Conditions>
  );

  const icon = <Information color="#fff" fill={status === 'error' ? '#ab2f29' : '#f5a623'} />;
  return (
    <Wrapper>
      {hasTip ? (
        <Popover content={conditions} title={t('STATUS_INFORMATION')} placement="right">
          {icon}
        </Popover>
      ) : (
        icon
      )}
      {reasonContent && (
        <ReasonDesc color={status === 'error' ? 'error' : 'warning'}>{reasonContent}</ReasonDesc>
      )}
    </Wrapper>
  );
}

export type { StatusReasonProps };
export default StatusReason;
