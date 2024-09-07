/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { ChangeEvent, CSSProperties } from 'react';
import cx from 'classnames';
import { Row, Col, Input, InputNumber } from '@kubed/components';

import { UrlInputWrapper } from './styles';

export type UrlInputValue = {
  host: string;
  port: number;
};

type Props = {
  value?: UrlInputValue;
  onChange?: (val: UrlInputValue) => void;
  readonly?: boolean;
  style?: CSSProperties;
  className?: string;
};

function UrlInput({
  value = { host: '', port: 25 },
  onChange,
  readonly,
  className,
  style,
}: Props): JSX.Element {
  function handleHostChange({ target }: ChangeEvent<HTMLInputElement>): void {
    onChange?.({ ...value, host: target.value });
  }

  function handlePortChange(val: string | number): void {
    onChange?.({ ...value, port: val as number });
  }

  return (
    <UrlInputWrapper>
      <Row className={cx('url-input-wrapper', className)} style={style} columns={12}>
        <Col span={8} style={{ marginRight: '12px' }}>
          <Input
            className="mr12"
            value={value.host}
            readOnly={readonly}
            placeholder={`${t('EXAMPLE')}192.168.1.10`}
            onChange={handleHostChange}
          />
        </Col>
        <Col span={4}>
          <InputNumber
            className="port"
            value={value.port}
            readOnly={readonly}
            onChange={handlePortChange}
          />
        </Col>
      </Row>
    </UrlInputWrapper>
  );
}

export default UrlInput;
