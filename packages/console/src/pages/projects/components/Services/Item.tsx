/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { get } from 'lodash';
import { Link } from 'react-router-dom';
import { Field, Tooltip } from '@kubed/components';
import { getDisplayName, Icon } from '@ks-console/shared';

import ServiceAccess from './ServiceAccess';

import { ItemWrapper } from '../styles';

type Props = {
  detail: any;
  prefix?: string;
};

function ServiceItem({ detail, prefix }: Props): JSX.Element {
  const serviceMonitor = get(detail, 'monitor.name');

  return (
    <ItemWrapper>
      <Field
        avatar={<Icon name="network-router" size={40} />}
        value={
          <>
            <Link to={`${prefix}/services/${detail.name}`}>{getDisplayName(detail)}</Link>
            {serviceMonitor && (
              <Tooltip
                content={t('MONITORING_EXPORTER_VALUE', {
                  value: serviceMonitor,
                })}
              >
                <Icon name="monitor" size={20} />
              </Tooltip>
            )}
          </>
        }
        label={t(detail.type)}
      />
      <ServiceAccess detail={detail} />
    </ItemWrapper>
  );
}

export default ServiceItem;
