/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Card } from '@kubed/components';
import { isEmpty } from 'lodash';
import { Content, StyledTable } from './styles';

interface IProps {
  cardClassName?: string;
  title?: string;
  ports?: Record<string, any>[];
  loading?: boolean;
  isFederated?: boolean;
}

const ContainerPorts = ({
  cardClassName,
  title = t('PORT_PL'),
  ports = [],
  isFederated = false,
}: IProps) => {
  const renderContent = () => {
    if (isEmpty(ports)) {
      return null;
    }

    return (
      <Content>
        <StyledTable>
          <thead>
            <tr>
              {isFederated && <th>{t('CLUSTER')}</th>}
              <th>{t('NAME')}</th>
              <th>{t('PROTOCOL')}</th>
              <th>{t('PORT')}</th>
            </tr>
          </thead>
          <tbody>
            {ports.map((item, index) => {
              return (
                <tr key={index}>
                  {isFederated && <td>{item.cluster}</td>}
                  <td>{item.name}</td>
                  <td>{item.protocol}</td>
                  <td>{item.containerPort}</td>
                </tr>
              );
            })}
          </tbody>
        </StyledTable>
      </Content>
    );
  };

  return (
    <Card sectionTitle={title} className={cardClassName}>
      {renderContent()}
    </Card>
  );
};

export default ContainerPorts;
