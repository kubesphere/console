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

import { observable, action } from 'mobx'

import Base from './index'

export default class AddressStore extends Base {
  @observable
  notify_type = 'email'

  @observable
  address_id = ''

  @observable
  addressList = {
    id: '',
    isLoading: false,
  }

  constructor(props) {
    super(props)

    this.module = 'address'
  }

  getListUrl = params => `${this.apiVersion}${this.getPath(params)}/addresses`

  @action
  async create({ cluster, address }) {
    this.addressList.isLoading = true

    const { address_id } = await request.post(this.getListUrl({ cluster }), {
      address,
      notify_type: this.notify_type,
    })

    this.address_id = address_id
    this.addressList.isLoading = false

    return address_id
  }

  async markSureMailInList({ cluster, address }) {
    const response =
      (await request.get(this.getListUrl({ cluster }), { address })) || {}
    const list = response[this.itemsKey] || []

    const addressMessage = list.find(({ address: mail }) => mail === address)

    if (addressMessage) {
      return addressMessage.address_id
    }
    return await this.create({ cluster, address })
  }

  @action
  async delete({ cluster, id }) {
    this.addressList.isLoading = true

    await this.submitting(
      request.delete(this.getListUrl({ cluster }), { address_id: [id] })
    )

    this.addressList.isLoading = false
  }

  @action
  createList({ cluster, address_id }) {
    return request.post(
      `${this.apiVersion}${this.getPath({ cluster })}/addresslists`,
      {
        address_id,
        extra: '{}',
      }
    )
  }
}
