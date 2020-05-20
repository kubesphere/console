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
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { isEmpty, get, set, uniqBy } from 'lodash'

import NotificationAddressStore from 'stores/notification/address'

import { Loading } from '@pitrix/lego-ui'
import { Button, Empty, Form } from 'components/Base'
import EmailInput from './EmailInput'

import styles from './index.scss'

@observer
export default class NotificationList extends React.Component {
  static propTypes = {
    formTemplate: PropTypes.object,
    notifyTypes: PropTypes.array,
  }

  static defaultProps = {
    formTemplate: {},
    notifyTypes: [],
  }

  constructor(props) {
    super(props)

    this.state = {
      addressList: this.getAddressList(props),
    }

    this.store = new NotificationAddressStore()
    this.store.notify_type = props.notifyTypes.join('|')
  }

  get workspace() {
    return get(
      this.props.formTemplate,
      'AlertingPolicy.resource_filter.workspace'
    )
  }

  getAddressList = (props = {}) =>
    get(props.formTemplate, 'Notification.addressList') || []

  setAddressList = (addressList = []) => {
    set(this.props.formTemplate, 'Notification.addressList', addressList)
    this.setState({ addressList })
  }

  setInitialData = async () => {
    const owner = globals.user || {}
    const data = {
      id: 0,
      name: owner.username,
      address: owner.email,
      avatar: owner.avatar_url,
      cluster: this.props.cluster,
    }

    data.id = await this.store.markSureMailInList(data)

    const addressList = [data]
    this.setAddressList(addressList)
  }

  componentDidMount() {
    if (isEmpty(this.getAddressList(this.props))) {
      this.setInitialData()
    }
  }

  handleDeleteItem = id => () => {
    const addressList = this.state.addressList.filter(item => item.id !== id)
    this.setAddressList(addressList)
  }

  handleAddItem = (newItem = {}) => {
    const { address } = newItem
    const isExist = this.state.addressList.find(
      item => item.address === address
    )

    if (!isExist) {
      this.store
        .markSureMailInList({ ...newItem, cluster: this.props.cluster })
        .then(id => {
          const addressList = uniqBy(
            [...this.state.addressList, { ...newItem, id }],
            'address'
          )
          this.setAddressList(addressList)
        })
    }
  }

  addressValidator = (rule, value, callback) => {
    set(
      this.props.formTemplate,
      'Notification.address_ids',
      this.state.addressList.map(item => item.id)
    )

    callback()
  }

  renderItem = ({ id, name, address, avatar }) => (
    <div key={id} className={styles.item}>
      <div className={styles.info}>
        <img
          className={styles.avatar}
          src={avatar || '/assets/default-user.svg'}
          alt="avatar"
        />
        <div className={styles.desc}>
          <strong>{name}</strong>
          <p>{address || '-'}</p>
        </div>
      </div>
      <div className={styles.actions}>
        <Button type="flat" icon="trash" onClick={this.handleDeleteItem(id)} />
      </div>
    </div>
  )

  render() {
    const { isLoading } = this.store.addressList
    const { addressList } = this.state

    return (
      <Form.Item rules={[{ validator: this.addressValidator }]}>
        <div className={styles.wrapper}>
          <div className={styles.title}>
            <h3>{t('Notification List')}</h3>
            <EmailInput
              workspace={this.workspace}
              onEnter={this.handleAddItem}
            />
          </div>
          <Loading spinning={isLoading}>
            <div className={styles.content}>
              {isEmpty(addressList) ? (
                <Empty desc="" />
              ) : (
                addressList.map(this.renderItem)
              )}
            </div>
          </Loading>
        </div>
      </Form.Item>
    )
  }
}
