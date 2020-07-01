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
import { omit, get } from 'lodash'

import { Icon, Dropdown } from '@pitrix/lego-ui'
import { observer } from 'mobx-react'

import { Form } from 'components/Base'
import Confirm from 'components/Forms/Base/Confirm'

import SecretStore from 'stores/secret'
import QuotaStore from 'stores/quota'
import LimitRangeStore from 'stores/limitrange'

import ContainerSetting from '../../ContainerSettings/ContainerForm/ContainerSetting'

import styles from './index.scss'

@observer
export default class ContainerImages extends Component {
  state = {
    quota: {},
    limitRange: {},
    imageRegistries: [],
  }

  quotaStore = new QuotaStore()

  limitRangeStore = new LimitRangeStore()

  imageRegistryStore = new SecretStore()

  formRef = React.createRef()

  componentDidMount() {
    this.fetchData()
  }

  fetchData() {
    const { cluster, namespace } = this.props

    Promise.all([
      this.quotaStore.fetch({ cluster, namespace }),
      this.limitRangeStore.fetchListByK8s({ cluster, namespace }),
      this.imageRegistryStore.fetchListByK8s({
        cluster,
        namespace,
        fieldSelector: `type=kubernetes.io/dockerconfigjson`,
      }),
    ]).then(([quota, limitRanges, imageRegistries]) => {
      this.setState({
        quota,
        limitRange: get(limitRanges, '[0].limit'),
        imageRegistries,
      })
    })
  }

  handleSubmit = () => {
    const { index, containerType, onEdit } = this.props
    const form = this.formRef.current

    form &&
      form.validate(() => {
        onEdit({ index, containerType, data: omit(form.getData(), 'type') })
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
    const { cluster, namespace, container, containerType } = this.props
    const { quota, limitRanges, imageRegistries } = this.state

    return (
      <div className={styles.form}>
        <Form ref={this.formRef} type="inner" data={container}>
          <ContainerSetting
            className={styles.formContent}
            data={container}
            cluster={cluster}
            namespace={namespace}
            quota={quota}
            limitRanges={limitRanges}
            imageRegistries={imageRegistries}
            defaultContainerType={containerType}
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
    const { container, selected, isEdit } = this.props

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
          <span>{`${t('Image')}: ${container.image}`}</span>
          {selected && (
            <span className={styles.modify}>
              <span>{t('Edit')}</span>
              <Icon type="light" size={20} name="chevron-down" />
            </span>
          )}
        </div>
      </Dropdown>
    )
  }
}
