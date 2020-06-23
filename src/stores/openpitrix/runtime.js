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

import ProjectStore from 'stores/project'
import Base from './base'

export default class Runtime extends Base {
  constructor(props) {
    super(props)

    this.resourceName = 'runtimes'
    this.projectStore = new ProjectStore()
  }

  async fetchList(filters = {}) {
    this.list.isLoading = true

    const { limit, page } = this.list
    const params = {
      limit,
      page,
      ...filters,
    }

    const data = []
    await this.projectStore.fetchList(params)
    this.projectStore.list.data.forEach(project => {
      const runtime_id = get(project, 'annotations.openpitrix_runtime')

      if (runtime_id) {
        data.push({
          name: project.name,
          runtime_id,
        })
      }
    })

    this.list = {
      data,
      total: data.length,
      page: Number(params.page),
      limit: Number(params.limit),
      isLoading: false,
    }
  }
}
