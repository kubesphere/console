/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { LabelsCard, AnnotationsCard } from '../../Base';

export default function Metadata({ detail }: { detail: Record<string, any> }) {
  const { labels, annotations } = detail;
  return (
    <>
      <LabelsCard labels={labels} />
      <AnnotationsCard annotations={annotations} />
    </>
  );
}
