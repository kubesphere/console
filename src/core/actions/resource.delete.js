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

export default {
  'resource.delete': {
    on({ store, detail, success, ...props }) {
      const modal = Modal.open({
        onOk: () => {
          store.delete(detail).then(() => {
            Modal.close(modal)
            Notify.success({ content: `${t('Deleted Successfully')}!` })
            success && success()
          })
        },
        store,
        modal: DeleteModal,
        ...props,
      })
    },
  },
  'resource.delete.batch': {
    on({ store, success, ...props }) {
      const modal = Modal.open({
        onOk: () => {
          const { selectedRowKeys } = store.list

          if (selectedRowKeys.length > 0) {
            store.batchDelete(selectedRowKeys).then(() => {
              Modal.close(modal)
              Notify.success({ content: `${t('Deleted Successfully')}!` })
              store.setSelectRowKeys([])
            })
          }
        },
        resource: store.list.selectedRowKeys.join(', '),
        modal: DeleteModal,
        store,
        ...props,
      })
    },
  },
}
