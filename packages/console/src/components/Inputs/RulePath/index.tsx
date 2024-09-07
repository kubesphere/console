/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useMemo, useState } from 'react';
import { get, set, isNumber } from 'lodash';
import { Input, AutoComplete, Select } from '@kubed/components';
import { ObjectInput } from '@ks-console/shared';

const RulePath = (props: Record<string, any>) => {
  const [state, setState] = useState({
    service: get(props, 'value.backend.service.name'),
    defaultService: get(props, 'value.backend.service.name'),
  });

  const handleChange = (value: Record<string, any>) => {
    const { onChange } = props;

    const servicePort = get(value, 'backend.service.port.number');
    if (isNumber(servicePort)) {
      set(value, 'backend.service.port.number', Number(servicePort));
    }

    set(value, 'pathType', 'ImplementationSpecific');

    if (onChange) {
      onChange(value);
    }
  };

  const handleServiceChange = (value: string) => {
    setState({ ...state, service: value });
  };

  const options = useMemo(() => {
    return props.services.map((item: { name: string }) => ({
      label: item.name,
      value: item.name,
    }));
  }, [props.services]);

  const ports = useMemo(() => {
    const service = props.services.find((item: { name: string }) => item.name === state.service);
    return service
      ? service.ports.map((port: { port: string }) => ({
          label: port.port,
          value: port.port,
        }))
      : [];
  }, [props.services]);

  return (
    <ObjectInput {...props} onChange={handleChange}>
      <Input name="path" placeholder={t('PATH')} defaultValue="/" />
      <AutoComplete
        name="backend.service.name"
        placeholder={t('PATH_SERVICE_TIP')}
        onChange={handleServiceChange}
        options={options}
      />
      <Select
        name="backend.service.port.number"
        defaultValue={get(props.value, 'backend.service.port.number')}
        placeholder={t('PORT')}
        options={ports}
        searchable
      />
    </ObjectInput>
  );
};

export default RulePath;
