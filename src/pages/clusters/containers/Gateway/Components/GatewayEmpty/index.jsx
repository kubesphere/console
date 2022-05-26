import React from 'react'
import { Button, Icon } from '@kube-design/components'
import { capitalize, get } from 'lodash'
import { Panel } from 'components/Base'
import { compareVersion } from 'utils'
import styles from './index.scss'

const GatewayEmpty = ({
  component,
  type,
  handleCreateGateway,
  cluster,
  canEdit,
}) => {
  const desc = component || type
  const clusterVersion = globals.app.isMultiCluster
    ? get(globals, `clusterConfig.${cluster}.ksVersion`)
    : get(globals, 'ksConfig.ksVersion')

  const isDisable = compareVersion(clusterVersion, 'v3.2.0') < 0

  return (
    <Panel className="margin-t12 margin-b12">
      <div className={styles.empty}>
        <div className={styles.icon}>
          <Icon name="loadbalancer" size={48} />
        </div>
        <div className={styles.text}>
          <div>
            {t(`${capitalize(desc).toUpperCase()}_GATEWAY_NOT_ENABLED`)}
          </div>
          {isDisable ? (
            <p>
              {t('CLUSTER_UPGRADE_REQUIRED', { version: '3.2' })}
              <Icon
                name="update"
                color={{
                  primary: '#f5a623 ',
                  secondary: '#ffe1be',
                }}
              />
            </p>
          ) : (
            <p>{t(`${desc.toUpperCase()}_ENABLE_GATEWAY_DESC`)}</p>
          )}
        </div>

        {(component === 'cluster' || type) && !canEdit && (
          <Button
            type="control"
            onClick={handleCreateGateway}
            disabled={isDisable}
          >
            {t('ENABLE_GATEWAY')}
          </Button>
        )}
      </div>
    </Panel>
  )
}

export default GatewayEmpty
