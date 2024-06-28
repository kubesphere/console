import React, { useContext } from 'react';
import { LiveContext, LiveError, LivePreview as ReactLivePreview } from 'react-live';

export default function LivePreview() {
  const { error } = useContext(LiveContext);
  return (
    <>
      {!error && <ReactLivePreview className="live-preview" />}
      <LiveError className="live-error" />
    </>
  );
}
