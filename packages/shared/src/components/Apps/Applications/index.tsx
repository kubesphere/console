/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { useCacheStore as useStore } from '../../../index';
import { Application } from '@kubed/icons';
import { Banner, BannerTip, Navs } from '@kubed/components';
import { useNavigate, useParams } from 'react-router-dom';

import { OPAppTable } from './AppTypeTable';
import type { OPAppTableProps } from './AppTypeTable';

export function Applications(props: OPAppTableProps): JSX.Element {
  return (
    <>
      <Banner
        className="mb12"
        icon={<Application />}
        title={t(`APP_PL`)}
        description={t('APPLICATIONS_DESC')}
      >
        <BannerTip title={t('APP_TYPES_Q')} key="app-type">
          {t('APP_TYPES_A')}
        </BannerTip>
      </Banner>
      <OPAppTable {...props} />
    </>
  );
}

export default Applications;
