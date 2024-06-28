import React from 'react';
import { Icon } from '@ks-console/shared';
import { Field, Switch } from '@kubed/components';

import { Horizon } from '../styles';

type Props = {
  label: string;
  title: string;
  iconName: string;
  className?: string;
  value?: boolean;
  onChange?: (checked: boolean) => void;
};

function EnableService({ label, title, iconName, className, value, onChange }: Props): JSX.Element {
  return (
    <Horizon className={className}>
      <Field avatar={<Icon name={iconName} size={40} />} label={label} value={title} />
      <Switch
        variant="button"
        label={t(value ? t('ENABLED') : t('DISABLED'))}
        checked={value}
        onChange={onChange}
      />
    </Horizon>
  );
}

export default EnableService;
