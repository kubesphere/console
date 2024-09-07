/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { get } from 'lodash';
import { Card } from '@kubed/components';

import { useDetailPage } from '@ks-console/shared';
import type { FormattedServiceAccount } from '@ks-console/shared';

import Secret from './Secrets';

function ServiceAccountsData(): JSX.Element {
  const { detail = {} as FormattedServiceAccount } = useDetailPage<FormattedServiceAccount>();

  const secrets = get(detail, 'secrets');
  const serviceAccountName = get(detail, 'name', '');

  return (
    <>
      {secrets?.map(item => (
        <Card
          hoverable={true}
          sectionTitle={t('SECRET_VALUE', { value: item.name })}
          key={item.name}
        >
          <Secret
            secret={item.name}
            serviceAccountName={serviceAccountName}
            key={item.name}
            detail={detail}
          />
        </Card>
      ))}
    </>
  );
}

export default ServiceAccountsData;
