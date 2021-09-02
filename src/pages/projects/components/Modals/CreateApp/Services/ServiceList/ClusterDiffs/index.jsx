/*
 * This file is part of KubeSphere Console.
 * Copyright (C) 2019 The KubeSphere Console Authors.
 *
 * KubeSphere Console is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * KubeSphere Console is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with KubeSphere Console.  If not, see <https://www.gnu.org/licenses/>.
 */

import React from 'react'

import ClustersMapper from './ClustersMapper'
import ContainersMapper from './ContainersMapper'
import ContainerImages from './ContainerImages'
import ContainerPorts from './ContainerPorts'

import styles from './index.scss'

export default class AdvancedSettings extends React.Component {
  get showContainerSettings() {
    const { overrides } = this.props

    return overrides.some(ord =>
      ord.clusterOverrides.some(cod => cod.path.indexOf('image') !== -1)
    )
  }

  get showServiceSettings() {
    const { overrides } = this.props

    return overrides.some(ord =>
      ord.clusterOverrides.some(cod => cod.path.indexOf('ports') !== -1)
    )
  }

  render() {
    const { workload, clusters, overrides } = this.props

    return (
      <div>
        {this.showContainerSettings && (
          <>
            <div className={styles.title}>{t('CONTAINER_IMAGE')}</div>
            <ClustersMapper clusters={clusters} overrides={overrides}>
              {props => (
                <ContainersMapper formTemplate={workload} {...props}>
                  {containerProps => <ContainerImages {...containerProps} />}
                </ContainersMapper>
              )}
            </ClustersMapper>
          </>
        )}
        {this.showServiceSettings && (
          <>
            <div className={styles.title}>{t('SERVICE_SETTINGS')}</div>
            <ClustersMapper clusters={clusters} overrides={overrides}>
              {props => (
                <ContainersMapper formTemplate={workload} {...props}>
                  {containerProps => <ContainerPorts {...containerProps} />}
                </ContainersMapper>
              )}
            </ClustersMapper>
          </>
        )}
      </div>
    )
  }
}
