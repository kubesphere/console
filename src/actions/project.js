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

import { get, set, unset, cloneDeep, omitBy, uniqBy, isEmpty } from 'lodash'
import { Modal, Notify } from 'components/Base'
import QuotaEditModal from 'components/Modals/QuotaEdit'
import ProjectCreateModal from 'components/Modals/ProjectCreate'
import AssignWorkspaceModal from 'components/Modals/AssignWorkspace'
import DefaultResourceEditModal from 'projects/components/Modals/DefaultResourceEdit'
import GatewaySettingModal from 'projects/components/Modals/GatewaySetting'
import DeleteModal from 'components/Modals/Delete'
import FORM_TEMPLATES from 'utils/form.templates'
import FED_TEMPLATES from 'utils/fed.templates'

import QuotaStore from 'stores/quota'
import FederatedStore from 'stores/federated'
import ProjectStore from 'stores/project'

export default {
  'project.create': {
    on({ store, success, cluster, workspace, ...props }) {
      const multiCluster =
        globals.app.isMultiCluster &&
        globals.app.hasPermission({
          workspace,
          module: 'federatedprojects',
          action: 'view',
        })
      const modal = Modal.open({
        onOk: async data => {
          let selectCluster = ''
          let projectType = 'projects'
          set(data, 'metadata.labels["kubesphere.io/workspace"]', workspace)
          const clusters = uniqBy(
            get(data, 'spec.placement.clusters', []),
            'name'
          )

          if (clusters.length > 1) {
            const federatedStore = new FederatedStore(store)
            set(data, 'spec.placement.clusters', clusters)

            const hostData = cloneDeep(data)
            set(
              hostData,
              'metadata.labels["kubesphere.io/kubefed-host-namespace"]',
              'true'
            )
            unset(hostData, 'spec.placement')
            await store.create(hostData, { workspace })
            await federatedStore.create(FED_TEMPLATES.namespaces(data), {
              namespace: get(data, 'metadata.name'),
            })
            projectType = 'federatedprojects'
          } else {
            const params = {
              cluster: cluster || get(clusters, '[0].name'),
              workspace,
            }
            await store.create(data, params)
            selectCluster = params.cluster
          }

          Modal.close(modal)
          Notify.success({ content: `${t('Created Successfully')}!` })
          success && success(projectType, selectCluster)
        },
        hideCluster: !globals.app.isMultiCluster || !!cluster,
        multiCluster,
        cluster,
        workspace,
        formTemplate: FORM_TEMPLATES.project(),
        modal: ProjectCreateModal,
        store,
        ...props,
      })
    },
  },
  'project.quota.edit': {
    on({ store, detail, success, ...props }) {
      const quotaStore = new QuotaStore()
      const modal = Modal.open({
        onOk: async data => {
          const params = {
            name: data.name,
            namespace: detail.name,
            cluster: detail.cluster,
          }

          const spec = get(data, 'spec.hard', {})
          data.spec = { hard: omitBy(spec, isEmpty) }
          const resp = await quotaStore.checkName(params)

          if (resp.exist) {
            await quotaStore.update(params, {
              apiVersion: 'v1',
              kind: 'ResourceQuota',
              metadata: { ...params, name: detail.name },
              spec: data.spec,
            })
          } else {
            await quotaStore.create(
              {
                apiVersion: 'v1',
                kind: 'ResourceQuota',
                metadata: { ...params, name: detail.name },
                spec: data.spec,
              },
              params
            )
          }

          Modal.close(modal)

          success && success()
        },
        detail,
        store: quotaStore,
        modal: QuotaEditModal,
        ...props,
      })
    },
  },
  'project.default.resource': {
    on({
      store,
      detail,
      namespace,
      cluster,
      success,
      isFederated,
      projectDetail,
      ...props
    }) {
      if (isFederated) {
        detail.limit = get(detail, 'resource.limit')
      }

      const modal = Modal.open({
        onOk: async data => {
          if (isEmpty(detail)) {
            let formTemplate = FORM_TEMPLATES.limitRange()

            if (isFederated) {
              formTemplate = FORM_TEMPLATES.federated({
                data: FORM_TEMPLATES.limitRange(),
                clusters: projectDetail.clusters.map(item => item.name),
                kind: 'LimitRange',
              })
              set(formTemplate, 'metadata.name', namespace)
              set(formTemplate, 'spec.template.spec', {
                limits: [{ ...data, type: 'Container' }],
              })
            } else {
              set(formTemplate, 'spec', {
                limits: [{ ...data, type: 'Container' }],
              })
            }

            await store.create(formTemplate, { namespace, cluster })
          } else {
            const formTemplate = {
              ...detail._originData,
            }

            if (isFederated) {
              set(formTemplate, 'spec.template.spec', {
                limits: [{ ...detail.limit, ...data }],
              })
            } else {
              set(formTemplate, 'spec', {
                limits: [{ ...detail.limit, ...data }],
              })
            }
            set(
              formTemplate,
              'metadata.resourceVersion',
              detail.resourceVersion
            )
            await store.update({ ...detail, namespace, cluster }, formTemplate)
          }

          Modal.close(modal)
          Notify.success({ content: `${t('Updated Successfully')}!` })
          success && success()
        },
        modal: DefaultResourceEditModal,
        store,
        detail,
        ...props,
      })
    },
  },
  'project.assignworkspace': {
    on({ store, detail, success, ...props }) {
      const modal = Modal.open({
        onOk: data => {
          store.patch(detail, data).then(() => {
            Modal.close(modal)
            Notify.success({ content: `${t('Updated Successfully')}!` })
            success && success()
          })
        },
        modal: AssignWorkspaceModal,
        store,
        ...props,
      })
    },
  },
  'project.gateway.edit': {
    on({ store, detail, cluster, namespace, success, ...props }) {
      const modal = Modal.open({
        onOk: data => {
          store.addGateway({ cluster, namespace }, data).then(() => {
            Modal.close(modal)
            Notify.success({ content: `${t('Updated Successfully')}!` })
            success && success()
          })
        },
        modal: GatewaySettingModal,
        store,
        detail,
        cluster,
        ...props,
      })
    },
  },
  'fedproject.delete': {
    on({ store, detail, success, ...props }) {
      const projectStore = new ProjectStore()
      const modal = Modal.open({
        onOk: () => {
          store.delete(detail).then(() => {
            projectStore.delete({ name: detail.name })
            Modal.close(modal)
            Notify.success({ content: `${t('Deleted Successfully')}!` })
            success && success()
          })
        },
        store,
        modal: DeleteModal,
        resource: detail.name,
        desc: t.html('MULTI_CLUSTER_PROJECT_DELETE_TIP', {
          type: t('Multi-cluster Project'),
          resource: detail.name,
        }),
        ...props,
      })
    },
  },
}
