/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Field } from '@kubed/components';
import { getDisplayName } from '../../../../../../utils';
import Icon from '../../../../../Icon';
import { ItemWrapper } from '../styles';
import { AccessButton, RulesWrapper } from './styles';

type Props = {
  detail: any;
  gateway: any;
  prefix?: string;
};

function IngressesItem({ prefix, detail, gateway }: Props): JSX.Element {
  const tls = detail.tls || [];
  const ports = useMemo(() => {
    const finalPorts: Record<string, any> = {};
    if (gateway && gateway.ports && gateway.type === 'NodePort') {
      gateway.ports.forEach((_port: any) => {
        if (_port.name === 'http' && _port.nodePort !== 80) {
          finalPorts.http = _port.nodePort;
        }
        if (_port.name === 'https' && _port.nodePort !== 443) {
          finalPorts.https = _port.nodePort;
        }
      });
    }

    return finalPorts;
  }, []);

  return (
    <ItemWrapper>
      <Field
        className="mb12"
        avatar={<Icon name="loadbalancer" size={40} />}
        label={t('DOMAIN_NAME_VALUE', {
          value: detail.rules.map((rule: any) => rule.host).join(', '),
        })}
        value={<Link to={`${prefix}/ingresses/${detail.name}`}>{getDisplayName(detail)}</Link>}
      />
      <RulesWrapper>
        {detail.rules.map((rule: any) => {
          const protocol = tls.hosts && tls.hosts.includes(rule.host) ? 'https' : 'http';
          let host = `${protocol}://${rule.host}`;
          if (ports[protocol]) {
            host = `${host}:${ports[protocol]}`;
          }

          return rule.http.paths.map((path: any) => (
            <li key={`${rule.host}${path.path}`}>
              <span>URL:&nbsp;&nbsp;</span>
              <span>
                <strong>
                  {host}
                  {path.path}
                </strong>
              </span>
              <a href={`${host}${path.path}`} target="_blank" rel="noreferrer noopener">
                <AccessButton>{t('ACCESS_SERVICE')}</AccessButton>
              </a>
            </li>
          ));
        })}
      </RulesWrapper>
    </ItemWrapper>
  );
}

export default IngressesItem;
