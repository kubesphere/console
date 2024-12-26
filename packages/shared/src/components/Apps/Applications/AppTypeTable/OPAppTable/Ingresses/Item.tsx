/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../../../Icon';
import { ItemWrapper } from '../styles';
import { AccessButton, Content, Path, Tip, Title } from './styles';
import { find, get, isEmpty } from 'lodash';
import { gatewayStore } from '../../../../../../stores';
import { Col, Row, Tooltip } from '@kubed/components';

const { useQueryNewGatewayByProject } = gatewayStore;
type Props = {
  ingress: any;
  prefix?: string;
  params: Record<string, string>;
};

type Tls = {
  hosts: string[];
  secretName: string;
}[];

function IngressesItem({ prefix, ingress, params }: Props): JSX.Element {
  const { data } = useQueryNewGatewayByProject(params, {
    enabled: !!params.cluster && !!params.workspace,
  });
  const rules = get(ingress, 'spec.rules', []);
  const ingressClassName = get(ingress, 'spec.ingressClassName', '');

  const gateway = useMemo(() => {
    return find(data, item => item.ingressClass === ingressClassName);
  }, [data, ingressClassName]);
  const tls: Tls = get(ingress, 'spec.tls', []);

  return (
    <ItemWrapper>
      {rules.map((rule: any) => {
        const tlsItem = tls.find(item => item.hosts && item.hosts.includes(rule.host));
        const protocol = tlsItem ? 'https' : 'http';
        let host = rule.host;
        const service = get(gateway, 'service', []);
        if (!isEmpty(service)) {
          const tempPort = find(service, item => item.name === protocol);
          if (
            tempPort &&
            ((protocol === 'http' && tempPort.nodePort !== 80) ||
              (protocol === 'https' && tempPort.nodePort !== 443))
          ) {
            host = `${host}:${tempPort.nodePort}`;
          }
        }
        return (
          <>
            <Content>
              <Icon name="earth" size={40} />
              <Title>
                {host}
                <div>
                  <span>
                    {t('PROTOCOL_VALUE')}
                    {protocol.toUpperCase()}
                  </span>
                  {protocol === 'https' && (
                    <span>
                      {t('CERTIFICATE_VALUE')}
                      {tlsItem?.secretName}
                    </span>
                  )}
                  <Tip>
                    {t('UNABLE_TO_ACCESS')}
                    &nbsp;&nbsp;
                    <Tooltip content={t('UNABLE_TO_ACCESS_TIP')}>
                      <Icon name="question" />
                    </Tooltip>
                  </Tip>
                </div>
              </Title>
            </Content>
            {rule.http.paths.map((path: any, i: number) => (
              <Path key={`${path.path}-${i}`}>
                <Row>
                  <Col span={3}>
                    <span>
                      {t('ROUTE_PATH')}：<strong>{path.path}</strong>
                    </span>
                  </Col>
                  <Col span={3}>
                    <span>
                      {t('SERVICE_COLON')}
                      <strong>
                        <Link replace to={`${prefix}/services/${path.backend.service.name}`}>
                          {path.backend.service.name}
                        </Link>
                      </strong>
                    </span>
                  </Col>
                  <Col span={3}>
                    <span>
                      {t('ROUTE_PORT')}：<strong>{path.backend.service.port.number}</strong>
                    </span>
                  </Col>
                  <Col span={3}>
                    <a
                      href={`${protocol}://${host}${path.path}`}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <AccessButton>{t('ACCESS_SERVICE')}</AccessButton>
                    </a>
                  </Col>
                </Row>
              </Path>
            ))}
          </>
        );
      })}
    </ItemWrapper>
  );
}

export default IngressesItem;
