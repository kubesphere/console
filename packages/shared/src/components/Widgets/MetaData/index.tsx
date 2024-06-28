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
