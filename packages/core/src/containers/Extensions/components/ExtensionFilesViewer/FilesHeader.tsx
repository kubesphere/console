/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

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
