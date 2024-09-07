/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useState } from 'react';

import Image from '../../../../Image';
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
  const {
    appName: name,
    aliasName,
    versionName,
    home,
    description,
    base64Str: icon = createInfo.icon,
  } = createInfo;
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
          <StyledField value={aliasName || name || '-'} label={t('NAME')} />
          <StyledField value={versionName || '-'} label={t('VERSION')} />
          <StyledField value={home || '-'} label={t('HOMEPAGE')} />
          <StyledField value={description || '-'} label={t('DESCRIPTION')} />
        </div>
      </AppContentWrapper>
      {!!errorInfo && <ErrorTips>{t(`${errorInfo}_DESC`)}</ErrorTips>}
    </>
  );
}

export default CreateInfo;
