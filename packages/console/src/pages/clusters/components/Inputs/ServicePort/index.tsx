/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useEffect, useState } from 'react';
import { isUndefined, debounce } from 'lodash';
import { Icon } from '@ks-console/shared';
import { Tooltip } from '@kubed/components';
import AddonsInput from '../AddonsInput';
import { PROTOCOLS } from '../../../constants';
import { Wrapper, PrefixWrapper, StyledSelect, StyledInput, StyledNumberInput } from './styles';

interface IProps {
  value?: any;
  onChange?: any;
}

const DEFAULT_PROTOCOL = 'HTTP';

const getStateFromProps = (props: IProps) => {
  let protocol = DEFAULT_PROTOCOL;
  const { name, targetPort, port } = props.value;
  if (!isUndefined(name)) {
    const matchs = name.match(/^(\w+)-(.*)/);
    if (matchs) {
      protocol = (matchs[1] || DEFAULT_PROTOCOL).toUpperCase();
    }
  }

  return {
    name: !isUndefined(name) ? name : `${protocol.toLowerCase()}-`,
    protocol: PROTOCOLS.some(item => item.value === protocol) ? protocol : props.value.protocol,
    targetPort,
    port,
  };
};

const ServicePort = (props: IProps) => {
  const [state, setState] = useState(() => {
    return getStateFromProps(props);
  });

  const handleProtocolChange = (protocol: string) => {
    const { name: oldName } = state;
    let name;
    const prefix = `${state.protocol.toLowerCase()}-`;
    if (oldName.startsWith(prefix)) {
      name = `${protocol.toLowerCase()}-${oldName.replace(prefix, '')}`;
    } else {
      name = `${protocol.toLowerCase()}-`;
    }

    setState({
      ...state,
      name,
      protocol,
    });
  };

  const triggerChange = debounce(() => {
    const { name, protocol, targetPort, port } = state;
    props.onChange({
      name,
      protocol: protocol === 'UDP' ? 'UDP' : 'TCP',
      targetPort,
      port,
    });
  }, 300);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, name: e.target.value });
  };

  const handleTargetPortChange = (value: number) => {
    setState({ ...state, targetPort: value });
  };

  const handlePortChange = (value: number) => {
    setState({ ...state, port: value });
  };

  useEffect(() => {
    triggerChange();
  }, [state]);

  return (
    <Wrapper>
      <AddonsInput
        prefix={
          <PrefixWrapper>
            <span>{t('PROTOCOL')}</span>
            <Tooltip content={t('ISTIO_PROTOCOL_TIP')}>
              <Icon name="question" />
            </Tooltip>
          </PrefixWrapper>
        }
      >
        <StyledSelect
          value={state.protocol}
          options={PROTOCOLS}
          defaultValue={DEFAULT_PROTOCOL}
          onChange={handleProtocolChange}
        ></StyledSelect>
      </AddonsInput>
      <AddonsInput prefix={t('NAME')}>
        <StyledInput value={state.name} placeholder={t('REQUIRED')} onChange={handleNameChange} />
      </AddonsInput>
      <AddonsInput prefix={t('CONTAINER_PORT')}>
        <StyledNumberInput
          name="targetPort"
          min={1}
          max={65535}
          value={state.targetPort}
          integer
          onChange={handleTargetPortChange}
        />
      </AddonsInput>
      <AddonsInput prefix={t('SERVICE_PORT')}>
        <StyledNumberInput
          name="port"
          min={1}
          max={65535}
          value={state.port}
          integer
          placeholder={t('REQUIRED')}
          onChange={handlePortChange}
        />
      </AddonsInput>
    </Wrapper>
  );
};

export default ServicePort;
