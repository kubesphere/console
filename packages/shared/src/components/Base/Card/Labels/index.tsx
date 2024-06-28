import React, { memo } from 'react';
import Label from '../../Label';
import Panel from '../../Panel';
import { isEmpty } from 'lodash';

function Labels({ className, labels }: { className?: string; labels: Record<string, string> }) {
  if (isEmpty(labels)) {
    return null;
  }

  return (
    <Panel title={t('LABEL_PL')} className={className}>
      <div>
        {Object.entries(labels).map(([key, value]) => (
          <Label key={key} name={key} value={value} />
        ))}
      </div>
    </Panel>
  );
}
export default memo(Labels);
