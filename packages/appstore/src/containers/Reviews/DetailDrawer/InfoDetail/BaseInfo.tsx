import React from 'react';
import { Field } from '@kubed/components';

import { showOutSiteLink } from '@ks-console/shared';

type Props = {
  name: string;
  isv?: string;
  home?: string;
  versionName?: string;
};

function BaseInfo({ name, home, versionName, isv }: Props): JSX.Element {
  return (
    <>
      <div style={{ marginRight: '40px', minWidth: '200px' }}>
        <Field className="mb8" value={name || '-'} label={t('NAME')} />
        <Field
          className="mb8"
          value={
            !home ? (
              <span>-</span>
            ) : (
              <>
                {showOutSiteLink() && (
                  <a href="" target="_blank" rel="noopener noreferrer">
                    {/* {hrefControl(url)} */}
                    {home}
                  </a>
                )}
              </>
            )
          }
          label={t('SERVICE_PROVIDER_WEBSITE')}
        />
      </div>
      <div>
        <Field className="mb8" value={versionName || '-'} label={t('VERSION')} />
        <Field className="mb8" value={isv || '-'} label={t('WORKSPACE')} />
      </div>
    </>
  );
}

export default BaseInfo;
