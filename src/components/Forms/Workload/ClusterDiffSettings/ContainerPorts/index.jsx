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

import { Icon, Dropdown } from '@pitrix/lego-ui'
import { Form } from 'components/Base'
import Confirm from 'components/Forms/Base/Confirm'

import Ports from '../../ContainerSettings/ContainerForm/Ports'

import styles from './index.scss'

export default class ContainerPorts extends Component {
  formRef = React.createRef()

  handleSubmit = () => {
    const { index, containerType, onEdit } = this.props
    const form = this.formRef.current

    form &&
      form.validate(() => {
        onEdit({ index, containerType, data: pick(form.getData(), ['ports']) })
      })
  }

  handleCancel = () => {
    const { showEdit } = this.props

    showEdit('')
  }

  handleClick = () => {
    const { container, showEdit } = this.props
    showEdit(container.name)
  }

  renderContent() {
    const { withService, container, containerType } = this.props
    return (
      <div className={styles.form}>
        <Form ref={this.formRef} type="inner" data={container}>
          <Ports
            className={styles.formContent}
            withService={containerType !== 'init' ? withService : false}
          />
        </Form>
        <Confirm
          className={styles.confirm}
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
        />
      </div>
    )
  }

  render() {
    const {
      container,
      selected,
      containerType,
      withService,
      isEdit,
    } = this.props

    const showServicePort = containerType !== 'init' ? withService : false

    return (
      <Dropdown
        visible={isEdit}
        placement="bottom"
        closeAfterClick={false}
        onOpen={this.handleClick}
        content={this.renderContent()}
        always={isEdit}
      >
        <div>
          <div>{`${t('Image')}: ${container.image}`}</div>
          {container.ports &&
            container.ports.map((port, index) => (
              <div key={index} className={styles.port}>
                <span>{`${t('Protocol')}: ${port.protocol}`}</span>
                <span>{`${t('Name')}: ${port.name}`}</span>
                <span>{`${t('Container Port')}: ${port.containerPort}`}</span>
                {showServicePort && (
                  <span>{`${t('Service Port')}: ${port.servicePort}`}</span>
                )}
              </div>
            ))}
          {selected && (
            <div className={styles.modify}>
              <span>{t('Edit')}</span>
              <Icon type="light" size={20} name="chevron-down" />
            </div>
          )}
        </div>
      </Dropdown>
    )
  }
}
