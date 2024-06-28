import { Database, Documentation } from '@kubed/icons';
import Embed from './Embed';
import * as React from 'react';
import { Banner } from '@kubed/components';
import { storageClassStore } from '@ks-console/shared';

export default () => {
  const { getDocsUrl } = storageClassStore;
  const docUrl = getDocsUrl();
  const description = (
    <div className="banner-desc">
      {t('STORAGE_CLASS_DESC')}
      <Documentation />
      <a href={docUrl} target="_blank">
        {t('LEARN_MORE')}
      </a>
    </div>
  );

  const banner = {
    icon: <Database />,
    title: t('STORAGE_CLASS_PL'),
    description: docUrl ? description : t('STORAGE_CLASS_DESC'),
    tips: [],
  };

  return (
    <>
      <Banner {...banner} />
      <Embed />
    </>
  );
};
