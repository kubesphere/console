import React from 'react';
import { Button } from '@kubed/components';

import { FooterBtnWrapper } from './styles';

type Props = {
  isLoading: boolean;
  onCancel: () => void;
  handleSubmit: () => void;
};

function FooterBtn({ isLoading, onCancel, handleSubmit }: Props): JSX.Element {
  return (
    <FooterBtnWrapper>
      <Button className="mr12" onClick={onCancel}>
        {t('CANCEL')}
      </Button>
      <Button color="secondary" loading={isLoading} onClick={handleSubmit} shadow>
        {t('OK')}
      </Button>
    </FooterBtnWrapper>
  );
}

export default FooterBtn;
