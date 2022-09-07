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

import { get, set, unset, cloneDeep, uniqBy, isEmpty } from 'lodash'
import { Notify } from '@kube-design/components'
import { Modal } from 'components/Base'
import FedProjectCreateModal from 'components/Modals/FedProjectCreate'
import EditConfigTemplateModal from 'fedprojects/components/ConfigTemplate'
import { toJS } from 'mobx'
import FedProjectAddClusterModal from 'workspaces/components/Modals/FedProjectAddCluster'
import DeleteModal from 'components/Modals/Delete'
import FORM_TEMPLATES from 'utils/form.templates'
import FED_TEMPLATES from 'utils/fed.templates'
import { multiCluster_overrides_Dot } from 'utils'

import FederatedStore from 'stores/federated'
import ProjectStore from 'stores/project'

export default {
  'federated.project.create': {
    on({ store, success, cluster, workspace, clusters, ...props }) {
      const modal = Modal.open({
        onOk: async data => {
          set(
            data,
            'metadata.annotations["kubesphere.io/creator"]',
            globals.user.username
          )
          set(data, 'metadata.labels["kubesphere.io/workspace"]', workspace)
          const specClusters = uniqBy(
            get(data, 'spec.placement.clusters', []).filter(item => item.name),
            'name'
          )

          const federatedStore = new FederatedStore(store)
          set(data, 'spec.placement.clusters', specClusters)

          const hostData = cloneDeep(data)
          set(
            hostData,
            'metadata.labels["kubesphere.io/kubefed-host-namespace"]',
            'true'
          )
          set(hostData, 'metadata.labels["kubefed.io/managed"]', 'false')
          unset(hostData, 'spec.placement')
          unset(hostData, 'metadata.annotations')
          await store.create(hostData, { workspace })
          await federatedStore.create(FED_TEMPLATES.namespaces(data), {
            namespace: get(data, 'metadata.name'),
          })

          Modal.close(modal)
          Notify.success({ content: t('CREATE_SUCCESSFUL') })
          success && success()
        },
        cluster,
        workspace,
        clusters,
        formTemplate: FORM_TEMPLATES.project(),
        modal: FedProjectCreateModal,
        store,
        ...props,
      })
    },
  },
  'federated.project.delete': {
    on({ store, detail, success, ...props }) {
      const projectStore = new ProjectStore()
      const modal = Modal.open({
        onOk: () => {
          projectStore.delete({ name: detail.name }).then(() => {
            Modal.close(modal)
            Notify.success({ content: t('DELETED_SUCCESSFULLY') })
            success && success()
          })
        },
        store,
        modal: DeleteModal,
        resource: detail.name,
        type: 'MULTI_CLUSTER_PROJECT',
        isLoading: projectStore.isLoading,
        ...props,
      })
    },
  },
  'federated.project.delete.batch': {
    on({ store, success, rowKey, ...props }) {
      const projectStore = new ProjectStore()
      const { data, selectedRowKeys } = store.list
      const selectNames = data
        .filter(item => selectedRowKeys.includes(item[rowKey]))
        .map(item => item.name)

      const modal = Modal.open({
        onOk: async () => {
          const reqs = []

          data.forEach(item => {
            if (selectNames.includes(item.name)) {
              reqs.push(projectStore.delete({ name: item.name }))
            }
          })

          await Promise.all(reqs)

          Modal.close(modal)
          Notify.success({ content: t('DELETED_SUCCESSFULLY') })
          store.setSelectRowKeys([])
          success && success()
        },
        resource: selectNames.join(', '),
        modal: DeleteModal,
        store,
        isLoading: projectStore.isLoading,
        ...props,
      })
    },
  },
  'federated.workload.template.edit': {
    on({ store, detail, success, module, supportGpuSelect = false, ...props }) {
      const modal = Modal.open({
        onOk: data => {
          const overrides = get(data, 'spec.overrides', [])
          multiCluster_overrides_Dot(overrides)

          const customMode = get(data, 'spec.template.spec.customMode', {})
          if (!isEmpty(customMode)) {
            delete data.spec.template.spec.customMode
          }

          store.update(detail, data).then(() => {
            Notify.success({ content: t('UPDATE_SUCCESSFUL') })
            Modal.close(modal)
            success && success()
          })
        },
        store,
        module: module || store.module,
        detail: toJS(detail._originData),
        modal: EditConfigTemplateModal,
        type: detail.type,
        workloadStore: store,
        isEdit: true,
        supportGpuSelect,
        hideVolumeSetting: store.module === 'statefulsets',
        ...props,
      })
    },
  },
  'federated.project.add.cluster': {
    on({ store, detail, success, ...props }) {
      const modal = Modal.open({
        onOk: data => {
          store.patch(detail, data).then(() => {
            Notify.success({ content: t('UPDATE_SUCCESSFUL') })
            Modal.close(modal)
            success && success()
          })
        },
        store,
        formTemplate: toJS(detail._originData),
        modal: FedProjectAddClusterModal,
        ...props,
      })
    },
  },
}
