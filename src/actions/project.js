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

import { get, omitBy, isEmpty, set } from 'lodash'
import { Modal, Notify } from 'components/Base'
import QuotaEditModal from 'components/Modals/QuotaEdit'
import ProjectCreateModal from 'components/Modals/ProjectCreate'
import AssignWorkspaceModal from 'components/Modals/AssignWorkspace'
import DefaultResourceEditModal from 'projects/components/Modals/DefaultResourceEdit'
import GatewaySettingModal from 'projects/components/Modals/GatewaySetting'
import FORM_TEMPLATES from 'utils/form.templates'

import QuotaStore from 'stores/quota'

export default {
  'project.create': {
    on({ store, success, cluster, workspace, ...props }) {
      const modal = Modal.open({
        onOk: data => {
          set(data, 'metadata.labels["kubesphere.io/workspace"]', workspace)
          store
            .create(data, {
              cluster,
              workspace,
            })
            .then(() => {
              Modal.close(modal)
              Notify.success({ content: `${t('Created Successfully')}!` })
              success && success()
            })
        },
        hideCluster: !globals.app.isMultiCluster || !!cluster,
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
    on({ store, detail, namespace, cluster, success, ...props }) {
      const modal = Modal.open({
        onOk: async data => {
          if (isEmpty(detail)) {
            await store.createLimitRange(
              { namespace, cluster },
              {
                ...FORM_TEMPLATES.limitRange(),
                spec: { limits: [{ ...data, type: 'Container' }] },
              }
            )
          } else {
            await store.updateLimitRange(
              { ...detail, namespace, cluster },
              {
                ...detail._originData,
                spec: { limits: [{ ...detail.limit, ...data }] },
              }
            )
          }

          Modal.close(modal)
          Notify.success({ content: `${t('Updated Successfully')}!` })
          success && success()
        },
        modal: DefaultResourceEditModal,
        store,
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
        ...props,
      })
    },
  },
}
