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

import { isEmpty, forEach } from 'lodash'
import { toJS } from 'mobx'
import { Modal, Notify } from 'components/Base'
import AddNodeModal from 'clusters/components/Modals/AddNode'
import AddNodeTypeModal from 'clusters/components/Modals/AddNodeType'
import ObjectEditModal from 'components/Modals/ObjectEdit'
import TaintManageModal from 'components/Modals/Node/TaintManagement'
import TaintManagementModal from 'components/Modals/Node/TaintManagement/Batch'

export default {
  'node.add': {
    on() {
      Modal.open({
        modal: AddNodeModal,
      })
    },
  },
  'node.type.add': {
    on() {
      Modal.open({
        modal: AddNodeTypeModal,
      })
    },
  },
  'node.labels': {
    on({ store, detail, success, ...props }) {
      const originLabels = toJS(detail.labels)
      const modal = Modal.open({
        onOk: newLabels => {
          forEach(originLabels, (value, key) => {
            if (isEmpty(newLabels[key])) {
              originLabels[key] = null
            }
          })

          const labels = {
            ...originLabels,
            ...newLabels,
          }

          store.patch(detail, { metadata: { labels } }).then(() => {
            Modal.close(modal)
            success && success()
          })
        },
        value: originLabels,
        modal: ObjectEditModal,
        store,
        ...props,
      })
    },
  },
  'node.taint': {
    on({ store, detail, success, ...props }) {
      const modal = Modal.open({
        onOk: data => {
          store.patch(detail, data).then(() => {
            Modal.close(modal)
            success && success()
          })
        },
        value: toJS(detail.taints),
        modal: TaintManageModal,
        store,
        ...props,
      })
    },
  },
  'node.taint.batch': {
    on({ store, success }) {
      const { data, selectedRowKeys } = toJS(store.list)
      const selectedNodes = data.filter(node =>
        selectedRowKeys.includes(node.name)
      )
      const modal = Modal.open({
        onOk: nodes => {
          store.batchPatchTaints(nodes).then(() => {
            Modal.close(modal)
            Notify.success({ content: `${t('Updated Successfully')}!` })
            success && success()
          })
        },
        nodes: selectedNodes,
        modal: TaintManagementModal,
        store,
      })
    },
  },
}
