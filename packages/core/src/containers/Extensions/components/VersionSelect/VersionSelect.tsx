import React from 'react';
import type { TypeSelectProps } from '@kubed/components';

import { RecommendedTag } from '../RecommendedTag';
import { StyledTypeSelect } from './VersionSelect.styles';

interface VersionSelectOption {
  value: React.ReactNode;
  label?: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
  isRecommendedVersion?: boolean;
}

interface VersionSelectProps extends Omit<TypeSelectProps, 'options'> {
  options: VersionSelectOption[];
}

function VersionSelect({ options, ...restProps }: VersionSelectProps) {
  const finalOptions = options.map(({ value, label, description, isRecommendedVersion }) => ({
    value,
    label: label ?? value,
    description: description,
    icon: isRecommendedVersion ? <RecommendedTag /> : undefined,
  }));

  return <StyledTypeSelect options={finalOptions} {...restProps} />;
}

export { VersionSelect };
