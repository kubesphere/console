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

import { action, observable } from 'mobx'

export default class List {
  @observable
  data = []

  page = 1

  limit = 10

  @observable
  total = 0

  @observable
  filters = {}

  continues = { 1: '' }

  @observable
  isLoading = true

  @observable
  selectedRowKeys = []

  @action
  update(params) {
    this.filters = {}
    Object.keys(params).forEach(key => {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        this[key] = params[key]
      } else if (params[key]) {
        this.filters[key] = params[key]
      }
    })
  }

  @action
  updateItem(item) {
    if (item.uid) {
      const index = this.data.findIndex(_item => _item.uid === item.uid)
      if (index >= 0) {
        this.data[index] = { ...this.data[index], ...item }
        this.data = [...this.data]
      }
    }
  }

  @action
  setSelectRowKeys = rowKeys => {
    this.selectedRowKeys = rowKeys
  }
}
