import React from 'react';
import { Events } from '@ks-console/shared';
import { useCacheStore as useStore } from '@ks-console/shared';

export default function DetailMetaData() {
  const [props] = useStore('JobDetailProps');
  const { detail, module } = props;
  return <Events detail={detail} module={module} />;
}
