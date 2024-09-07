/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useState } from 'react';
import { Button } from '@kubed/components';

import { Image } from '@ks-console/shared';

import { ErrorTips } from '../styles';
import { AppIconUpload, StyledField } from './styles';

type Props = {
  initialValue: string;
  value?: string;
  onChange?: (iconStr: string) => void;
};

function IconUploadField({ value, initialValue, onChange }: Props): JSX.Element {
  const [errorInfo, setErrorInfo] = useState<string>('');
  // TODO: check the init value to set this state init state
  const [isBase64Str, setIsBase64Str] = useState<boolean>(false);

  function handleIconFileFinished(icon: string): void {
    if (!isBase64Str) {
      setIsBase64Str(true);
    }

    onChange?.(icon);
  }

  return (
    <>
      <StyledField
        avatar={
          <Image src={value} isBase64Str={isBase64Str} iconSize={96} iconLetter={initialValue} />
        }
        value={
          <>
            {t('APP_ICON_FORMAT')} <br /> {t('APP_ICON_SIZE')}
          </>
        }
        label={
          <AppIconUpload onError={setErrorInfo} onFinish={handleIconFileFinished}>
            <Button>{t('UPLOAD')}</Button>
          </AppIconUpload>
        }
      />
      {errorInfo && <ErrorTips>{t(errorInfo)}</ErrorTips>}
    </>
  );
}

export default IconUploadField;
