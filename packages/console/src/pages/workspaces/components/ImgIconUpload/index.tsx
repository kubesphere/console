import React, { ReactNode } from 'react';
import { last } from 'lodash';
import { Dropzone } from '@kubed/components';

import { Constants, openpitrixStore } from '@ks-console/shared';

const { fileStore } = openpitrixStore;

type Props = {
  children?: ReactNode;
  className?: string;
  onFinish?: (icon: string) => void;
  onError?: (errors: string) => void;
};

function ImgIconUpload({ className, children, onError, onFinish }: Props): JSX.Element {
  const { checkFile, handleFileByBase64Str, validateImageSize } = fileStore;

  function packageValidator(base64IconStr: string, type?: string): void {
    const newImgSrc = `data:image/${type};base64,${base64IconStr}`;

    validateImageSize(newImgSrc).then((imagesResult: unknown) => {
      if (!imagesResult) {
        return onError?.('FILE_MAX_SIZE_ICON');
      }

      onError?.('');
      onFinish?.(base64IconStr);
    });
  }

  function imgFileValidate(iconFile: File) {
    const errors = checkFile(iconFile, 'icon');

    if (errors) {
      return Promise.reject(onError?.(errors));
    }
  }

  function handleFileFinished(files: File[]): void {
    files.forEach((file: File) => {
      const fileType: string = last(file.name.toLocaleLowerCase().split('.')) || '';
      const type = fileType === 'svg' ? 'svg+xml' : fileType;

      handleFileByBase64Str(file, (iconStr: string) => packageValidator(iconStr, type));
    });
  }

  return (
    <Dropzone
      className={className}
      onDrop={handleFileFinished}
      validator={imgFileValidate as any}
      accept={Constants.UPLOAD_FILE_TYPES.icon}
    >
      {children}
    </Dropzone>
  );
}

export default ImgIconUpload;
