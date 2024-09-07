/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { merge } from 'lodash';
import type { LightboxExternalProps } from 'yet-another-react-lightbox';

import YARLightbox from 'yet-another-react-lightbox';
import Counter from 'yet-another-react-lightbox/plugins/counter';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

function Lightbox(props: LightboxExternalProps) {
  const defaultProps: LightboxExternalProps = {
    styles: { root: { '--yarl__color_backdrop': 'rgba(0, 0, 0, .8)' } },
  };
  const finalProps: Record<string, any> = merge(null, defaultProps, props);

  return <YARLightbox plugins={[Counter, Zoom]} {...finalProps} />;
}

export default Lightbox;
