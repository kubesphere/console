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

import { toJS } from 'mobx'
import { Notify } from '@kube-design/components'
import { Modal } from 'components/Base'

import InviteMemberModal from 'components/Modals/InviteMember'
import ModifyMemberModal from 'components/Modals/ModifyMember'
import DeleteModal from 'components/Modals/Delete'

export default {
  'member.invite': {
    on({ store, cluster, workspace, namespace, success, devops, ...props }) {
      const modal = Modal.open({
        onOk: data => {
          store
            .create(data, { cluster, workspace, namespace, devops })
            .then(() => {
              Modal.close(modal)
              Notify.success({ content: `${t('Invited Successfully')}` })
              success && success()
            })
        },
        modal: InviteMemberModal,
        store,
        cluster,
        workspace,
        namespace,
        devops,
        ...props,
      })
    },
  },
  'member.edit': {
    on({
      store,
      module,
      detail,
      cluster,
      workspace,
      namespace,
      success,
      devops,
      ...props
    }) {
      const modal = Modal.open({
        onOk: role => {
          store
            .update(
              { ...detail, ...cluster, workspace, namespace, devops },
              {
                username: detail.name,
                roleRef: role,
              }
            )
            .then(() => {
              Modal.close(modal)
              Notify.success({ content: `${t('Updated Successfully')}` })
              success && success()
            })
        },
        modal: ModifyMemberModal,
        store,
        module,
        ...props,
      })
    },
  },
  'member.remove': {
    on({
      store,
      detail,
      cluster,
      workspace,
      namespace,
      success,
      devops,
      ...props
    }) {
      const modal = Modal.open({
        onOk: () => {
          store
            .delete({ ...detail, cluster, workspace, namespace, devops })
            .then(() => {
              Modal.close(modal)
              Notify.success({ content: `${t('Deleted Successfully')}` })
              success && success()
            })
        },
        modal: DeleteModal,
        title: t('Sure to remove'),
        desc: t.html('REMOVE_MEMBER_TIP', {
          resource: detail.name,
        }),
        resource: detail.name,
        store,
        ...props,
      })
    },
  },
  'member.remove.batch': {
    on({ store, cluster, workspace, namespace, success, devops, ...props }) {
      const rowKeys = toJS(store.list.selectedRowKeys)
      const usernames = rowKeys.join(', ')
      const modal = Modal.open({
        onOk: () => {
          store
            .batchDelete({ rowKeys, cluster, workspace, namespace, devops })
            .then(() => {
              Modal.close(modal)
              Notify.success({ content: `${t('Deleted Successfully')}` })
              success && success()
            })
        },
        modal: DeleteModal,
        title: t('Sure to remove'),
        desc: t.html('REMOVE_MEMBER_TIP', {
          resource: usernames,
        }),
        resource: usernames,
        store,
        ...props,
      })
    },
  },
}
