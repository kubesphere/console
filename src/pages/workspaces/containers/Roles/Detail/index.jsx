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
import { computed } from 'mobx'
import { observer, inject } from 'mobx-react'
import RoleStore from 'stores/workspace/role'
import Base from 'core/containers/Base/Detail'

@inject('rootStore')
@observer
export default class RoleDetail extends Base {
  init() {
    this.store = new RoleStore()
  }

  get workspace() {
    return this.props.match.params.workspace
  }

  get listUrl() {
    return `/workspaces/${this.workspace}/roles`
  }

  @computed
  get detailName() {
    const { aliasName } = this.store.detail

    return aliasName
  }

  @computed
  get detailDesc() {
    const aliasName = this.store.detail.aliasName
    const desc = get(this.store.detail, 'description')

    if (globals.config.presetWorkspaceRoles.includes(aliasName)) {
      return t(desc)
    }

    return desc
  }

  getOperations = () => []

  getAttrs = () => [
    {
      name: t('Workspace'),
      value: this.workspace,
    },
    {
      name: t('Created Time'),
      value: this.createTime,
    },
    {
      name: t('Creator'),
      value: this.creator,
    },
  ]
}
