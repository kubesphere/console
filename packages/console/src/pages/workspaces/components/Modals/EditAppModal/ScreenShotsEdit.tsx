/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { forwardRef, useImperativeHandle, useMemo, useState } from 'react';

import { Icon, Constants, openpitrixStore, AppDetail, getAvatar } from '@ks-console/shared';

import {
  Wrapper,
  HelpDesc,
  ErrorTips,
  ImgUpload,
  ImgDelete,
  ImageMask,
  ImgWrapper,
  HelpWrapper,
  DeleteShots,
  ImagePlaceholder,
  ScreenShotsWrapper,
} from './styles';

const { fileStore } = openpitrixStore;
const { UPLOAD_FILE_TYPES, SCREENSHOTS_LIMIT } = Constants;

export type ScreenShotsRef = {
  getValues: () => string[];
};

type Props = {
  detail: AppDetail;
  handleChange?: (patchData: Record<string, any>) => void;
};

function ScreenShotsEdit({}: Props, ref?: React.Ref<ScreenShotsRef>): JSX.Element {
  const { checkFile, handleFileByBase64Str } = fileStore;
  const [errorInfo, setErrorInfo] = useState<string>('');
  // TODO: there is a problem with the field. unhandled detail.screenshots ? detail.screenshots.split(',') : []
  const initScreenshotsList: string[] = [];
  const [screenshots, setScreenShots] = useState<string[]>(initScreenshotsList);
  const screenshotsCount = useMemo(() => screenshots.length, [screenshots.length]);

  function validateScreenshot(file: File) {
    const result = checkFile(file, 'screenshots');

    if (result) {
      setErrorInfo(result);
      return Promise.reject(t(result));
    }
  }

  function handleUploadFiles(files: File[]): void {
    const initScreenshotsCount = initScreenshotsList.length;

    setErrorInfo('');

    files.forEach((file: File, index: number) => {
      if (initScreenshotsCount + index >= SCREENSHOTS_LIMIT) {
        return;
      }

      handleFileByBase64Str(file, (base64Str: string) => {
        setScreenShots(prev => [...prev, base64Str]);
      });
    });
  }

  function handleDelete(index: number): void {
    setScreenShots(prev => {
      prev.splice(index, 1);
      return [...prev];
    });
  }

  useImperativeHandle(ref, () => ({
    getValues: () => screenshots,
  }));

  return (
    <Wrapper>
      <ScreenShotsWrapper>
        {screenshots.map((item: string, index: number) => (
          <ImgWrapper key={index}>
            <ImagePlaceholder isBase64Str iconSize={160} src={getAvatar(item)} />
            <ImageMask className="img-mask">
              <ImgDelete onClick={() => handleDelete(index)}>
                <Icon name="trash" size={20} style={{ color: '#ffffff' }} className="icon" />
                <span>{t('DELETE')}</span>
              </ImgDelete>
            </ImageMask>
          </ImgWrapper>
        ))}
        {screenshotsCount < SCREENSHOTS_LIMIT && (
          <ImgUpload
            multiple
            onDrop={handleUploadFiles}
            accept={UPLOAD_FILE_TYPES.screenshot}
            validator={validateScreenshot as any}
          >
            <Icon name="add" size={48} style={{ opacity: 0.32 }} />
          </ImgUpload>
        )}
      </ScreenShotsWrapper>
      <HelpWrapper>
        {errorInfo ? (
          <ErrorTips>{t(errorInfo)}</ErrorTips>
        ) : (
          <>
            <HelpDesc>
              {t('SCREENSHOTS_COLON')}
              {screenshotsCount}/{SCREENSHOTS_LIMIT}
              {t('FILE_MAX_SCREENSHOTS')}
            </HelpDesc>
            <DeleteShots
              variant="text"
              onClick={() => setScreenShots([])}
              disabled={screenshots.length <= 0}
            >
              {t('DELETE_ALL')}
            </DeleteShots>
          </>
        )}
      </HelpWrapper>
    </Wrapper>
  );
}

export default forwardRef(ScreenShotsEdit);
