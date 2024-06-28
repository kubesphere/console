import React from 'react';
import Physical from './Physical';
import ProjectTrend from './Trend';
import VirtualResource from './Virtual';

export default function Usage() {
  return (
    <>
      <Physical />
      <VirtualResource />
      <ProjectTrend />
    </>
  );
}
