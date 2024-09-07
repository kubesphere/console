/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useState, CSSProperties, useEffect } from 'react';
import { LoadingOverlay } from '@kubed/components';

import { DefaultAvatar, ImageAvatar, Wrapper } from './styles';

function formatImageUrl(src: string, isBase64Str: boolean): string {
  let imgStr = src;

  if (String(src).startsWith('att-')) {
    imgStr = `/application.kubesphere.io/v2/attachments/${src}?filename=raw`;
  }

  if (isBase64Str && !imgStr.includes('/attachments/') && !imgStr.includes('http')) {
    imgStr = `data:image/png;data:image/svg;data:image/jpg;base64,${src}`;
  }

  return imgStr;
}

type Props = {
  iconSize: number;
  iconLetter?: string;
  src?: string;
  className?: string;
  isBase64Str?: boolean;
  canLoading?: boolean;
  [key: string]: unknown;
};

function Image({
  src,
  iconSize = 32,
  iconLetter = '',
  isBase64Str = false,
  canLoading = false,
  className,
  ...rest
}: Props): JSX.Element {
  const [srcFailed, setSrcFailed] = useState<boolean>(false);
  const imgSrc = src ? formatImageUrl(src, isBase64Str) : src;
  const [imgLoading, setImgLoading] = useState<boolean>(canLoading);
  const imgWrapperStyle: CSSProperties = {
    width: iconSize,
    height: iconSize,
    lineHeight: `${iconSize}px`,
  };

  useEffect(() => {
    setSrcFailed(false);
  }, [imgSrc]);
  if (srcFailed || !imgSrc) {
    const letter = iconLetter.substring(0, 1).toLocaleUpperCase();
    const style: CSSProperties = {
      width: `${iconSize}px`,
      height: `${iconSize}px`,
    };

    if (letter) {
      const fontSize = iconSize / 2;
      style.fontSize = `${fontSize}px`;
      style.padding = `${iconSize / 4}px`;
      style.lineHeight = `${fontSize > 12 ? fontSize : 12}px`;

      return (
        <DefaultAvatar style={style} {...rest}>
          {letter}
        </DefaultAvatar>
      );
    }

    return <></>;
  }

  return (
    <Wrapper>
      <LoadingOverlay visible={imgLoading} />
      <div style={imgWrapperStyle} className={className}>
        <ImageAvatar
          src={imgSrc}
          data-origin-url={imgSrc}
          onLoad={() => setImgLoading(false)}
          onError={() => setSrcFailed(true)}
          {...rest}
        />
      </div>
    </Wrapper>
  );
}

export default Image;
