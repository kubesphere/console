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

import { observable } from 'mobx'
import { to } from 'utils'
import Base from './base'

export default class VolumeStore extends Base {
  @observable
  mountedPods = {
    data: [],
    isLoading: true,
  }

  constructor() {
    super()
    this.module = 'persistentvolumeclaims'
  }

  async fetchVolumeMountStatus() {
    const { name, namespace } = this.detail

    const result = await to(
      request.get(this.getResourceUrl({ namespace }), {
        name,
      })
    )

    const volumes = result.items || []

    const volume = volumes.find(vol => this.mapper(vol).name === name) || {}

    this.detail.inUse = this.mapper(volume).inUse
  }

  get apiVersion() {
    return 'api/v1'
  }
}
