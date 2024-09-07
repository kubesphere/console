/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { isArray, get } from 'lodash';
import { Row, Col, Button } from '@kubed/components';
import { Text, ClusterWrapper, Icon } from '@ks-console/shared';
import { ItemWrapper, TextsWrapper, Description, Paths, Path } from './styles';

interface Props {
  index?: number | string;
  rule?: Record<string, any>;
  tls?: any[];
  projectDetail?: Record<string, any>;
  onDelete?: any;
  onEdit?: any;
}

const RuleItem = ({ index, rule, tls = [], projectDetail, onDelete, onEdit }: Props) => {
  const tlsItem = tls.find(item => item.hosts && item.hosts.includes(rule?.host));
  const protocol = tlsItem ? 'https' : 'http';

  const handleDelete = () => onDelete(index);

  const handleEdit = () => onEdit(index);

  const clusters =
    isArray(rule?.clusters) && rule?.clusters.map((item: Record<string, any>) => ({ name: item }));

  return (
    <ItemWrapper>
      <TextsWrapper>
        <Text
          icon={'earth'}
          title={rule?.host}
          description={
            <Description>
              <span>{t('PROTOCOL_VALUE', { value: protocol.toUpperCase() })}</span>
              {protocol === 'https' && (
                <span>{t('CERTIFICATE_VALUE', { value: tlsItem.secretName })}</span>
              )}
            </Description>
          }
        />
        {isArray(clusters) && (
          <Text
            title={<ClusterWrapper clusters={clusters} clustersDetail={projectDetail?.clusters} />}
            description={t('CLUSTER')}
          />
        )}
      </TextsWrapper>
      <Paths>
        {rule?.http?.paths?.map((path: any, i: number) => (
          <Path key={i}>
            <Row>
              <Col span={4}>
                <span
                  dangerouslySetInnerHTML={{ __html: t('PATH_VALUE', { value: path.path }) }}
                ></span>
              </Col>
              <Col span={4}>
                <span>
                  {t('SERVICE_VALUE', {
                    value: get(path, 'backend.service.name'),
                  })}
                </span>
              </Col>
              <Col span={4}>
                <span>
                  {t('PORT_VALUE', {
                    value: get(path, 'backend.service.port.number'),
                  })}
                </span>
              </Col>
            </Row>
          </Path>
        ))}
      </Paths>
      <div className="buttons">
        <Button variant="text" onClick={handleDelete}>
          <Icon name="trash" />
        </Button>
        <Button variant="text" onClick={handleEdit}>
          <Icon name="pen" />
        </Button>
      </div>
    </ItemWrapper>
  );
};

export default RuleItem;
