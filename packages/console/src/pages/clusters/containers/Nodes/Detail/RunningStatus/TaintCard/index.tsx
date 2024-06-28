import React from 'react';
import { Row, Col } from '@kubed/components';
import { Card } from './styles';

interface Props {
  key: string;
  data: Record<string, string>;
}

const TaintCard = ({ data }: Props) => (
  <Card>
    <Row>
      <Col span={4}>
        <p>
          <span>{t('KEY')}:</span> {data.key}
        </p>
      </Col>
      <Col span={4}>
        <p>
          <span>{t('VALUE')}:</span> {data.value}
        </p>
      </Col>
      <Col span={4}>
        <p>
          <span>{t('POLICY')}:</span> {data.effect}
        </p>
      </Col>
    </Row>
  </Card>
);

export default TaintCard;
