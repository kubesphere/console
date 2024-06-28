import React from 'react';
import { AutoComplete } from '@kubed/components';
import * as Constants from '../../../constants/common';
import PropertiesInput from '../PropertiesInput';

const { INGRESS_ANNOTATIONS } = Constants;

const AnnotationsInput = ({ options, ...rest }: Record<string, any>) => {
  const itemProps = {
    keyProps: {
      component: AutoComplete,
      options: options || INGRESS_ANNOTATIONS.map(item => ({ label: item, value: item })),
    },
  };

  return <PropertiesInput {...rest} itemProps={itemProps} />;
};

export default AnnotationsInput;
