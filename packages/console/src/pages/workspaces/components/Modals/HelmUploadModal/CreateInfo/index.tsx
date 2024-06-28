import React, { useState } from 'react';

import { Image } from '@ks-console/shared';

import {
  Note,
  Label,
  Title,
  ErrorTips,
  StyledField,
  StyledDropzone,
  AppContentWrapper,
} from './styles';

type Props = {
  createInfo: any;
  onIconChange: (icon: any) => any;
};

function CreateInfo({ createInfo, onIconChange }: Props): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { name, version_name, home, description, icon } = createInfo;
  const [errorInfo, setErrorInfo] = useState<string>('');
  const [imgSrc, setImgSrc] = useState<string>(icon);

  function handleIconUploadFinished(iconStr: string): void {
    setImgSrc(iconStr);
    onIconChange(iconStr);
  }

  return (
    <>
      <Title>{t('APP_INFORMATION')}</Title>
      <AppContentWrapper>
        <StyledDropzone onError={setErrorInfo} onFinish={handleIconUploadFinished}>
          <Image isBase64Str={Boolean(imgSrc)} src={imgSrc} iconSize={100} iconLetter={name} />
          <Label className="mt12">{t('UPLOAD_ICON')}</Label>
          <Note>{t('APP_ICON_NOTE')}</Note>
        </StyledDropzone>
        <div>
          <StyledField value={name || '-'} label={t('NAME')} />
          <StyledField value={version_name || '-'} label={t('VERSION')} />
          <StyledField value={home || '-'} label={t('HOMEPAGE')} />
          <StyledField value={description || '-'} label={t('DESCRIPTION')} />
        </div>
      </AppContentWrapper>
      {!!errorInfo && <ErrorTips>{t(`${errorInfo}_DESC`)}</ErrorTips>}
    </>
  );
}

export default CreateInfo;
