/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { ReactNode, useMemo } from 'react';
import classNames from 'classnames';
import { Button } from '@kubed/components';
import { Information } from '@kubed/icons';
import { Card, CardFooter, CardMain, Content, Title, Wrapper } from './styles';

interface Props {
  visible?: boolean;
  width?: number | string;
  type?: string;
  title?: string;
  content?: ReactNode;
  btns?: ReactNode;
  confirmText?: string;
  cancelText?: string;
  isSubmitting?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
}

function NotifyConfirm({
  visible = false,
  isSubmitting = false,
  width = 'auto',
  type = 'info',
  title = 'title',
  content = 'content',
  btns,
  confirmText = 'OK',
  cancelText = 'CANCEL',
  onConfirm,
  onCancel,
}: Props) {
  const handleCancel = () => {
    const timer = setTimeout(() => {
      onCancel?.();
      clearTimeout(timer);
    }, 1000);
  };

  const iconColor = useMemo(() => {
    const colors: {
      primary?: string;
      secondary?: string;
    } = {
      primary: '#fff',
    };

    switch (type) {
      default:
      case 'info':
        colors.secondary = '#329dce';
        break;
    }
    return colors;
  }, [type]);

  const buttons = useMemo(() => {
    if (btns) return btns;

    return (
      <div>
        <Button onClick={handleCancel}>{t(cancelText)}</Button>
        <Button color="secondary" shadow onClick={onConfirm} loading={isSubmitting}>
          {t(confirmText)}
        </Button>
      </div>
    );
  }, [btns, confirmText, cancelText, onConfirm, isSubmitting]);

  const style = {
    width,
  };
  return (
    <Wrapper>
      {visible ? (
        <Card
          className={classNames({
            in: visible,
            out: !visible,
          })}
          style={style}
        >
          <CardMain>
            <Title>
              <Information size={20} {...iconColor} />
              <strong>{title}</strong>
            </Title>
            <Content>{content}</Content>
          </CardMain>
          <CardFooter>{buttons}</CardFooter>
        </Card>
      ) : null}
    </Wrapper>
  );
}

export default NotifyConfirm;
