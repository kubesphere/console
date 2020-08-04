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
import { get, omit } from 'lodash'

import { observer } from 'mobx-react'

import SecretStore from 'stores/secret'
import QuotaStore from 'stores/quota'
import LimitRangeStore from 'stores/limitrange'

import EditForm from '../EditForm'
import ContainerSetting from '../../ContainerSettings/ContainerForm/ContainerSetting'

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

  handleSubmit = data => {
    const { index, containerType, onEdit } = this.props
    onEdit({ index, containerType, data: omit(data, 'type') })
  }

  render() {
    const { cluster, namespace, container, containerType } = this.props
    const { quota, limitRanges, imageRegistries } = this.state

    return (
      <EditForm
        {...this.props}
        title={<span>{`${t('Image')}: ${container.image}`}</span>}
        onOk={this.handleSubmit}
      >
        <ContainerSetting
          data={container}
          cluster={cluster}
          namespace={namespace}
          quota={quota}
          limitRanges={limitRanges}
          imageRegistries={imageRegistries}
          defaultContainerType={containerType}
        />
      </EditForm>
    )
  }
}
