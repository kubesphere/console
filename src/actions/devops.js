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

import { cloneDeep, get, set } from 'lodash'
import { Notify } from '@kube-design/components'
import { Modal } from 'components/Base'
import DevOpsCreateModal from 'components/Modals/DevOpsCreate'
import EditModal from 'components/Modals/DevOpsEdit'
import AllowListModal from 'components/Modals/DevOpsAllowList'
import DeleteModal from 'components/Modals/Delete'

const filterAllList = d => {
  if (d.length > 0) {
    const dMap = new Map()
    let dataList = []
    d.forEach(item => {
      const clusterName = item.name
      if (clusterName) {
        const isSameCluster = d.filter(_item => _item.name === clusterName)
        dMap.set(clusterName, isSameCluster)
      }
    })

    if (dMap.has('*')) {
      dataList = [...dMap.get('*')]
      return dataList
    }

    dMap.forEach(value => {
      const isAllList =
        value.length && value.filter(item => item.namespace === '*')
      if (isAllList.length > 0) {
        dataList.push(isAllList[0])
        return
      }
      dataList = dataList.concat(value)
    })
    return dataList
  }
  return d
}

export default {
  'devops.create': {
    on({ store, workspace, success, ...props }) {
      const modal = Modal.open({
        onOk: data => {
          const cluster = get(data, 'spec.placement.cluster')

          store.create(data, { cluster, workspace }).then(() => {
            Modal.close(modal)
            Notify.success({ content: t('CREATE_SUCCESSFUL') })
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
            Notify.success({ content: t('UPDATE_SUCCESSFUL') })
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
  'devops.edit.allowlist': {
    on({ store, detail, success, ...props }) {
      const modal = Modal.open({
        onOk: async newObject => {
          const data = cloneDeep(newObject)
          const sourceRepos = get(data, 'spec.argo.sourceRepos', [])
          const destinations = get(data, 'spec.argo.destinations', [])

          const allSourceRepos = sourceRepos.filter(item => item === '*')

          if (allSourceRepos.length > 0) {
            set(data, 'spec.argo.sourceRepos', allSourceRepos)
          }

          const _destinations = filterAllList(destinations)
          set(data, 'spec.argo.destinations', _destinations)

          await store.editAllowlist(detail, data)

          Modal.close(modal)
          Notify.success({ content: t('UPDATE_SUCCESSFUL') })
          success && success()
        },
        modal: AllowListModal,
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
          Notify.success({ content: t('DELETED_SUCCESSFULLY') })
          store.setSelectRowKeys([])
          success && success()
        },
        title:
          selectNames.length === 1
            ? t('DELETE_DEVOPS_PROJECT')
            : t('DELETE_MULTIPLE_DEVOPS_PROJECTS'),
        desc:
          selectNames.length === 1
            ? t.html('DELETE_DEVOPS_PROJECT_TIP', {
                resource: selectNames.join(', '),
              })
            : t.html('DELETE_DEVOPS_PROJECT_TIP_PL', {
                resource: selectNames.join(', '),
              }),
        resource: selectNames.join(', '),
        modal: DeleteModal,
        store,
        ...props,
      })
    },
  },
}
