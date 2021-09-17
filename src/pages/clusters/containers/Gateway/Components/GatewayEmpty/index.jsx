import React from 'react'
import { Button, Icon } from '@kube-design/components'
import { capitalize } from 'lodash'
import { Panel } from 'components/Base'
import styles from './index.scss'

const GatewayEmpty = ({ component, type, handleCreateGateway }) => {
  const desc = component || type
  return (
    <Panel className="margin-t12 margin-b12">
      <div className={styles.empty}>
        <div className={styles.icon}>
          <Icon name="loadbalancer" size={48} />
        </div>
        <div className={styles.text}>
          <div>{t(`${capitalize(desc)} Gateway Not Set`)}</div>
          <p>{t(`${desc.toUpperCase()}_GATEWAYS_SETTING_DESC`)}</p>
        </div>
        {(component === 'cluster' || type) && (
          <Button type="control" onClick={handleCreateGateway}>
            {t('Set Gateway')}
          </Button>
        )}
      </div>
    </Panel>
  )
}

export default GatewayEmpty
