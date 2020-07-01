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

import { action } from 'mobx'

import MemberList from 'stores/member.list'

import Base from '../base'

export default class ProjectMemberStore extends Base {
  list = new MemberList()

  getResourceUrl = ({ namespace }) =>
    `kapis/iam.kubesphere.io/v1alpha2/namespaces/${namespace}/users`

  @action
  addMember(namespace, name, role) {
    return request.post(
      `apis/rbac.authorization.k8s.io/v1/namespaces/${namespace}/rolebindings`,
      {
        kind: 'RoleBinding',
        apiVersion: 'rbac.authorization.k8s.io/v1',
        metadata: {
          name: `${role}-${name}`,
        },
        subjects: [
          {
            kind: 'User',
            apiGroup: 'rbac.authorization.k8s.io',
            name,
          },
        ],
        roleRef: {
          apiGroup: 'rbac.authorization.k8s.io',
          kind: 'Role',
          name: role,
        },
      }
    )
  }

  @action
  deleteMember(namespace, member) {
    return this.submitting(
      request.delete(
        `apis/rbac.authorization.k8s.io/v1/namespaces/${namespace}/rolebindings/${
          member.role_binding
        }`
      )
    )
  }

  @action
  batchDeleteMembers(namespace, rowKeys) {
    return this.submitting(
      Promise.all(
        rowKeys.map(rowKey => {
          const member = this.members.data.find(
            user => user.username === rowKey
          )
          return request.delete(
            `apis/rbac.authorization.k8s.io/v1/namespaces/${namespace}/rolebindings/${
              member.role_binding
            }`
          )
        })
      )
    )
  }

  @action
  async changeMemberRole(namespace, member, newRole) {
    await this.deleteMember(namespace, member)
    await this.addMember(namespace, member.username, newRole)
  }
}
