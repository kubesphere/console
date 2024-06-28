import React from 'react';
import { File } from '@kubed/icons';

import { Root, TitleBox, Title, Count } from './FilesHeader.styles';

interface FilesHeaderProps {
  filesCount: number;
}

export function FilesHeader({ filesCount }: FilesHeaderProps) {
  return (
    <Root>
      <TitleBox>
        <File size={20} />
        <Title>{t('ALL_EXTENSION_FILES')}</Title>
      </TitleBox>
      <Count>{filesCount}</Count>
    </Root>
  );
}
