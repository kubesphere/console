/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useState } from 'react';
import { find } from 'lodash';

import { Lightbox, Markdown } from '@ks-console/shared';
import type {
  FormattedExtensionVersion,
  FormattedExtensionVersionFile,
} from '../../../../stores/extension';
import { markdownURITransformer } from '../../utils/extension';
import { Carousel } from '../Carousel';
import { /*Title,*/ Wrapper, Screenshots } from './Overview.styles';

const DEFAULT_LIGHTBOX_INDEX = -1;

function getImageScr(
  value: string,
  formattedExtensionVersionFiles: FormattedExtensionVersionFile[],
) {
  const isRemotePath = ['https://', 'http://'].some(searchString => value.startsWith(searchString));

  if (isRemotePath) {
    return value;
  }

  const relativePath = value.replace(/^\.\//, '');

  const base64Data = find(formattedExtensionVersionFiles, { name: relativePath })?.base64Data;

  if (!base64Data) {
    return '';
  }

  return `data:image/png;base64, ${base64Data}`;
}

interface OverviewProps {
  formattedExtensionVersion: FormattedExtensionVersion;
  formattedExtensionVersionFiles: FormattedExtensionVersionFile[];
  localeReadmeFile:
    | {
        name: string;
        base64Data: string;
        data: string;
      }
    | undefined;
}

function Overview({
  formattedExtensionVersion,
  formattedExtensionVersionFiles,
  localeReadmeFile,
}: OverviewProps) {
  const { extensionName, version, screenshots = [] } = formattedExtensionVersion;
  const { data = '' } = localeReadmeFile ?? {};

  const placeholder = t('No Data');

  const [lightboxIndex, setLightboxIndex] = useState(DEFAULT_LIGHTBOX_INDEX);

  const images = screenshots
    .map((value, index) => ({
      src: getImageScr(value, formattedExtensionVersionFiles),
      alt: `screenshot-${index + 1}`,
    }))
    .filter(({ src }) => src);
  const slides = images.map(({ src, alt }, index) => (
    <img
      key={index}
      className="screenshot"
      src={src}
      alt={alt}
      onClick={() => setLightboxIndex(index)}
    />
  ));

  return (
    <Wrapper>
      <div>
        {/*<Title>{t('INTRODUCTION')}</Title>*/}
        <Markdown
          skipHtml
          isSupportGFM
          themeName="github-light"
          transformImageUri={src =>
            markdownURITransformer({
              extensionName,
              version,
              uri: src,
            })
          }
        >
          {data ?? placeholder}
        </Markdown>
      </div>
      {[...screenshots].length > 0 && (
        <div>
          {/*<Title>{t('SCREENSHOTS')}</Title>*/}
          <Screenshots>
            <Carousel
              slides={slides}
              emblaOptions={{
                align: 'start',
                loop: true,
              }}
              classNames={{
                slideContainer: 'slide-container',
                slide: 'slide',
              }}
            />
          </Screenshots>
          <Lightbox
            open={lightboxIndex >= 0}
            slides={images}
            index={lightboxIndex}
            close={() => setLightboxIndex(DEFAULT_LIGHTBOX_INDEX)}
          />
        </div>
      )}
    </Wrapper>
  );
}

export { Overview };
