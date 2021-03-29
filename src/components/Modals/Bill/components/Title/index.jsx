import React from 'react'
import { Select } from '@kube-design/components'
import styles from './index.scss'

const Title = ({ type, cluster, clusters, setCluster }) => {
  const handleChangeCluster = value => {
    setCluster(value)
  }

  return (
    <div className={styles.title}>
      <h2>{t('Consumption Bill')}</h2>
      {type === 'workspaces' &&
      globals.app.isMultiCluster &&
      clusters.length > 0 ? (
        <Select
          className={styles.clusterSelect}
          options={clusters}
          value={cluster}
          onChange={handleChangeCluster}
        />
      ) : null}
    </div>
  )
}

export default Title
