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

import styles from './index.scss'

export default class ContainerPorts extends Component {
  render() {
    const { container } = this.props

    return (
      <div>
        <div>{t('IMAGE_VALUE', { value: container.image })}</div>
        {container.ports &&
          container.ports.map((port, index) => (
            <div key={index} className={styles.port}>
              <span>{t('PROTOCOL_VALUE', { value: port.protocol })}</span>
              <span>{t('NAME_VALUE', { value: port.name })}</span>
              <span>
                {t('CONTAINER_PORT_VALUE', { value: port.containerPort })}
              </span>
              <span>
                {t('SERVICE_PORT_VALUE', { value: port.servicePort })}
              </span>
            </div>
          ))}
      </div>
    )
  }
}
