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

import { Modal, Notify } from 'components/Base'
import DeleteModal from 'components/Modals/Delete'

import FederatedStore from 'stores/federated'

export default {
  'resource.delete': {
    on({ store, detail, success, ...props }) {
      const fedStore = new FederatedStore(store.module)
      const _store = detail.isFedManaged ? fedStore : store

      const modal = Modal.open({
        onOk: () => {
          _store.delete(detail).then(() => {
            Modal.close(modal)
            Notify.success({ content: `${t('Deleted Successfully')}!` })
            success && success()
          })
        },
        _store,
        modal: DeleteModal,
        resource: detail.name,
        ...props,
      })
    },
  },
  'resource.batch.delete': {
    on({ store, success, ...props }) {
      const fedStore = new FederatedStore(store.module)
      const modal = Modal.open({
        onOk: async () => {
          const { data, selectedRowKeys } = store.list

          const fedRowkKeys = []
          const rowKeys = []

          data.forEach(item => {
            if (selectedRowKeys.includes(item.name)) {
              if (item.isFedManaged) {
                fedRowkKeys.push(item.name)
              } else {
                rowKeys.push(item.name)
              }
            }
          })

          if (rowKeys.length > 0) {
            await store.batchDelete(rowKeys)
          }
          if (fedRowkKeys.length > 0) {
            await fedStore.batchDelete(fedRowkKeys)
          }

          Modal.close(modal)
          Notify.success({ content: `${t('Deleted Successfully')}!` })
          store.setSelectRowKeys([])
        },
        resource: store.list.selectedRowKeys.join(', '),
        modal: DeleteModal,
        store,
        ...props,
      })
    },
  },
}
