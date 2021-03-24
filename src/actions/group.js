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
import { Notify } from '@kube-design/components'
import { Modal } from 'components/Base'

import DeleteModal from 'components/Modals/Delete'

export default {
  'group.user.remove': {
    on({ store, detail, workspace, success, ...props }) {
      const modal = Modal.open({
        onOk: async () => {
          const result = await store.getGroupBinding(
            { user: detail.name, group: detail.group },
            {
              workspace,
            }
          )
          const name = get(result.items[0], 'metadata.name')
          store.deleteGroupBinding(name, { workspace }).then(() => {
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
}
