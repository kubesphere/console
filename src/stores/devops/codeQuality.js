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

import { isArray } from 'lodash'
import { action, observable } from 'mobx'
import ObjectMapper from 'utils/object.mapper'
import BaseStore from '../devops'

export default class CodeQualityStore extends BaseStore {
  @observable
  detail = {}

  @observable
  isLoading = true

  @action
  fetchDetail = async ({ devops, branch, name, cluster }) => {
    let url = ''
    if (branch) {
      url = `${this.getDevopsUrlV2({
        cluster,
        devops,
      })}pipelines/${name}/branches/${encodeURIComponent(branch)}/sonarstatus `
    } else {
      url = `${this.getDevopsUrlV2({
        cluster,
        devops,
      })}pipelines/${name}/sonarstatus`
    }
    this.isLoading = true
    const result = await request
      .get(url, null, null, () => 'no  sonarqube')
      .finally(() => {
        this.isLoading = false
      })
    const _result = isArray(result) ? result : []
    this.detail = _result.length ? _result.map(ObjectMapper.codequality)[0] : {}
  }
}
