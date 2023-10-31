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

import { get } from 'lodash'
import { observable } from 'mobx'
import BaseStore from 'stores/base'
import objectMapper from 'utils/object.mapper'

export default class ImageBuildRunStore extends BaseStore {
  module = 'imagebuildRuns'

  constructor(name) {
    super()
    this.imageBuilderName = name
  }

  @observable
  imageBuilderName = ''

  get apiVersion() {
    return 'kapis/builder.kubesphere.io/v1alpha1'
  }

  getListUrl = (params = {}) => {
    const path = `${this.apiVersion}${this.getPath(params)}/imagebuilds/${
      this.imageBuilderName
    }/${this.module}`
    return path
  }

  get mapper() {
    return item => {
      return {
        ...objectMapper.default(item),
        imageName: get(item, 'status.buildSpec.source.url'),
        status: get(item, 'status.conditions', []).every(
          i => i.status !== 'False'
        )
          ? 'Successful'
          : 'Failed',
      }
    }
  }
}
