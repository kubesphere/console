/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useState } from 'react';
import { isEmpty } from 'lodash';
import { Icon } from '@ks-console/shared';
import { Checkbox, Field } from '@kubed/components';

import type { Condition } from './types';
import ConditionEditor from './ConditionEditor';

import { Desc, Annotation } from './styles';
import { ItemWrapper } from '../../styles';

export type AlertSelectorValue = {
  matchExpressions?: Condition[];
};

type Props = {
  desc?: any;
  value?: AlertSelectorValue;
  onChange?: (value?: AlertSelectorValue) => void;
};

function ControlSetting({ value, onChange }: Props): JSX.Element {
  const [checked, setChecked] = useState<boolean>(!isEmpty(value));

  function handleCheckedChange(): void {
    if (checked) {
      onChange?.(undefined);
    }

    setChecked(!checked);
  }

  function handleConditionChange(conditions: Condition[]): void {
    if (isEmpty(conditions)) {
      return;
    }

    onChange?.({ matchExpressions: conditions });
  }

  return (
    <ItemWrapper>
      <Field
        className="condition-setting"
        label={t('NOTIFICATION_CONDITION_SETTINGS_DESC')}
        value={t('FILTER_CONDITIONS')}
        onClick={handleCheckedChange}
        avatar={<Checkbox checked={checked} />}
      />
      {checked && (
        <ConditionEditor
          conditions={value?.matchExpressions ?? []}
          addText={t('ADD')}
          onChange={handleConditionChange}
          desc={
            <Annotation>
              <Icon name="question" />
              <Desc
                dangerouslySetInnerHTML={{ __html: t('NOTIFICATION_CONDITION_SETTING_TIP') }}
              ></Desc>
            </Annotation>
          }
        />
      )}
    </ItemWrapper>
  );
}

export default ControlSetting;
