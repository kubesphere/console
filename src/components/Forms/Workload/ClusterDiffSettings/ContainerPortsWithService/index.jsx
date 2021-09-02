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

import React, { Component } from 'react'
import { pick } from 'lodash'

import EditForm from '../EditForm'
import Ports from '../../ContainerSettings/ContainerForm/Ports'

import styles from './index.scss'

export default class ContainerPorts extends Component {
  handleSubmit = data => {
    const { index, containerType, onEdit } = this.props
    onEdit({ index, containerType, data: pick(data, ['ports']) })
  }

  render() {
    const { formData, containerType, withService } = this.props

    const showServicePort = containerType !== 'init' ? withService : false

    const title = (
      <>
        {formData.ports &&
          formData.ports.map((port, index) => (
            <div key={index} className={styles.port}>
              <span>{`${t('PROTOCOL')}: ${port.protocol}`}</span>
              <span>{`${t('NAME')}: ${port.name}`}</span>
              <span>{`${t('CONTAINER_PORT')}: ${port.containerPort}`}</span>
              {showServicePort && (
                <span>{`${t('SERVICE_PORT')}: ${port.servicePort}`}</span>
              )}
            </div>
          ))}
      </>
    )

    return (
      <EditForm {...this.props} title={title} onOk={this.handleSubmit}>
        <Ports withService={containerType !== 'init' ? withService : false} />
      </EditForm>
    )
  }
}
