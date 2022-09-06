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
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { isEmpty } from 'lodash'
import { Panel } from 'components/Base'

import { joinSelector } from 'utils'

import IngressStore from 'stores/ingress'
import GatewayStore from 'stores/gateway'

import Item from './Item'

@observer
export default class Routes extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    prefix: PropTypes.string,
    selector: PropTypes.object,
    title: PropTypes.string,
  }

  state = {
    gateway: {},
  }

  static defaultProps = {
    prefix: '',
  }

  store = new IngressStore()

  gatewayStore = new GatewayStore()

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const { cluster, namespace, selector } = this.props

    if (!isEmpty(selector)) {
      const params = {
        cluster,
        namespace,
        labelSelector: joinSelector(selector),
      }

      const data = await Promise.all([
        this.gatewayStore.getGateway({ cluster }),
        this.gatewayStore.getGateway({ cluster, namespace }),
      ])

      this.setState({ gateway: data[1] || data[0] })

      this.store.fetchListByK8s(params)
    }
  }

  renderContent() {
    const { prefix } = this.props
    const { data } = this.store.list
    const { gateway } = this.state

    if (isEmpty(data)) {
      return null
    }

    return data.map(item => (
      <Item key={item.name} prefix={prefix} detail={item} gateway={gateway} />
    ))
  }

  render() {
    const { className, title } = this.props

    const content = this.renderContent()

    if (!content) {
      return null
    }

    return (
      <Panel className={className} title={title || t('ROUTE_PL')}>
        {content}
      </Panel>
    )
  }
}
