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
import DevOpsCreateModal from 'components/Modals/DevOpsCreate'
import EditModal from 'components/Modals/DevOpsEdit'
import DeleteModal from 'components/Modals/Delete'

export default {
  'devops.create': {
    on({ store, workspace, success, ...props }) {
      const modal = Modal.open({
        onOk: data => {
          const cluster = get(data, 'spec.placement.cluster')

          store.create(data, { cluster, workspace }).then(() => {
            Modal.close(modal)
            Notify.success({ content: `${t('Created Successfully')}` })
            success && success(cluster)
          })
        },
        formTemplate: {},
        modal: DevOpsCreateModal,
        store,
        workspace,
        hideCluster: !globals.app.isMultiCluster,
        ...props,
      })
    },
  },
  'devops.edit': {
    on({ store, detail, success, ...props }) {
      const modal = Modal.open({
        onOk: newObject => {
          store.update(detail, newObject).then(() => {
            Modal.close(modal)
            Notify.success({ content: `${t('Updated Successfully')}` })
            success && success()
          })
        },
        modal: EditModal,
        detail,
        store,
        ...props,
      })
    },
  },
  'devops.batch.delete': {
    on({ store, success, rowKey, ...props }) {
      const { data, selectedRowKeys } = store.list
      const selectNames = data
        .filter(item => selectedRowKeys.includes(item[rowKey]))
        .map(item => item.name)

      const modal = Modal.open({
        onOk: async () => {
          const reqs = []

          data.forEach(item => {
            if (selectedRowKeys.includes(item[rowKey])) {
              reqs.push(store.delete(item))
            }
          })

          await Promise.all(reqs)

          Modal.close(modal)
          Notify.success({ content: `${t('Deleted Successfully')}` })
          store.setSelectRowKeys([])
          success && success()
        },
        resource: selectNames.join(', '),
        modal: DeleteModal,
        store,
        ...props,
      })
    },
  },
}
