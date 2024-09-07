/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { capitalize, get } from 'lodash';
import { Button, Card } from '@kubed/components';
import { compareVersion, isMultiCluster } from '@ks-console/shared';
import { Loadbalancer, Update } from '@kubed/icons';
import { Empty, Icon, Text } from './styles';

interface Props {
  component?: string;
  type?: string;
  cluster?: string;
  canEdit?: boolean;
  handleCreateGateway?: () => void;
}

function GatewayEmpty({ component, type, cluster, canEdit, handleCreateGateway }: Props) {
  const desc = component || type || '';
  const clusterVersion = isMultiCluster()
    ? get(globals, `clusterConfig.${cluster}.ksVersion`)
    : get(globals, 'ksConfig.ksVersion');

  const isDisable = compareVersion(clusterVersion, 'v3.2.0') < 0;
  return (
    <Card>
      <Empty>
        <Icon>
          <Loadbalancer size={48} />
        </Icon>
        <Text>
          <div>{t(`${capitalize(desc).toUpperCase()}_GATEWAY_NOT_ENABLED`)}</div>
          {isDisable ? (
            <p>
              {t('CLUSTER_UPGRADE_REQUIRED', { version: '3.2' })}
              <Update color="#f5a623" fill="#ffe1be" />
            </p>
          ) : (
            <p>{t(`${desc.toUpperCase()}_ENABLE_GATEWAY_DESC`)}</p>
          )}
        </Text>

        {(component === 'cluster' || type) && !canEdit && (
          <Button
            color="secondary"
            shadow={true}
            onClick={handleCreateGateway}
            disabled={isDisable}
          >
            {t('ENABLE_GATEWAY')}
          </Button>
        )}
      </Empty>
    </Card>
  );
}

export default GatewayEmpty;
