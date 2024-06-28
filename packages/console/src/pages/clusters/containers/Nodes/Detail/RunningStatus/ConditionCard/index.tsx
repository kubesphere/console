import React from 'react';
import { getLocalTime } from '@ks-console/shared';
import { Check, Substract } from '@kubed/icons';
import { Tooltip, Field } from '@kubed/components';
import { Constants, getConditionsStatus, Icon } from '@ks-console/shared';
import { CardWapper, IconWapper } from './styles';

interface ConditionProps {
  key: string | number;
  data: any;
}
const { NODE_CONDITION_ICONS } = Constants;
function ConditionCard({ data }: ConditionProps) {
  if (!NODE_CONDITION_ICONS[data.type]) {
    return null;
  }
  const statusType = getConditionsStatus(data);
  const content = (
    <div>
      <div className="tooltip-title">{data.reason}</div>
      <p className="tooltip-desc">{data.message}</p>
      <p className="tooltip-desc">
        {t('LAST_HEARTBEAT_VALUE', {
          value: getLocalTime(data.lastHeartbeatTime).format('YYYY-MM-DD HH:mm:ss'),
        })}
      </p>
    </div>
  );

  return (
    <CardWapper>
      <div>
        <Icon name={NODE_CONDITION_ICONS[data.type]} size={40} />
        <Tooltip content={content}>
          {statusType === 'Running' ? (
            <IconWapper type="primary">
              <Check variant="light" size={12} />
            </IconWapper>
          ) : (
            <IconWapper type="yellow">
              <Substract variant="light" size={12} />
            </IconWapper>
          )}
        </Tooltip>
      </div>
      <Field
        value={t(`NODE_${data.type.toUpperCase()}`)}
        label={t(`NODE_${data.type.toUpperCase()}_DESC`)}
      />
    </CardWapper>
  );
}
export default ConditionCard;
