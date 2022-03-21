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

import CreateModal from 'components/Modals/Create'
import { CD_FORM } from 'configs/steps/cd'
import { Modal } from 'components/Base'
import SyncModal from 'components/Modals/SyncModal'
import { Notify } from '@kube-design/components'
import DeleteModal from 'components/Modals/Delete'
import FORM_TEMPLATES from 'utils/form.templates'
import { set, isEmpty } from 'lodash'

export default {
  'cd.create': {
    on({ store, cluster, workspace, module, success, ...props }) {
      const formTemplate = FORM_TEMPLATES[module]()

      const modal = Modal.open({
        onOk: async data => {
          const syncPolicyType = data.syncPolicy.type
          const syncPolicy =
            syncPolicyType === 'automated'
              ? {
                  [data.syncPolicy.type]: {
                    prune: data.syncPolicy.prune,
                    selfHeal: data.syncPolicy.selfHeal,
                  },
                }
              : undefined

          const source = {
            repoURL: 'https://github.com/kubesphere/devops-python-sample.git',
            // data.sourceRepo[`${data.sourceRepo.source_type}_source`].repo,
            ...data.source,
          }

          const syncOptions = !isEmpty(data.syncOptions)
            ? Object.entries(data.syncOptions).reduce((pre, current) => {
                const item = `${current[0]}=${current[1]}`
                pre.push(item)
                return pre
              }, [])
            : undefined

          syncPolicy.syncOptions = syncOptions

          const argoApp = {
            destination: data.destination,
            source,
            syncPolicy,
          }

          set(formTemplate, 'metadata', data.metadata)
          set(formTemplate, 'spec.argoApp.spec', argoApp)

          await store.create({ data: formTemplate, devops: props.devops })

          Notify.success({ content: t('CREATE_SUCCESSFUL') })
          success && success()
          Modal.close(modal)
        },
        store,
        module,
        cluster,
        formTemplate: {},
        modal: CreateModal,
        steps: CD_FORM,
        ...props,
      })
    },
  },

  'cd.sync': {
    on({ store, cluster, workspace, module, success, formTemplate, ...props }) {
      const modal = Modal.open({
        onOk: async data => {
          const _data = formTemplate._originData

          const syncOptions = !isEmpty(data.syncOptions)
            ? Object.entries(data.syncOptions).reduce((pre, current) => {
                const item = `${current[0]}=${current[1]}`
                pre.push(item)
                return pre
              }, [])
            : undefined

          syncOptions.syncOptions = syncOptions

          set(_data, 'spec.argoApp.spec.syncPolicy', syncOptions)
          set(_data, 'spec.argoApp.operation', data.operation)

          await store.update({ data: formTemplate, devops: props.devops })

          Notify.success({ content: t('CREATE_SUCCESSFUL') })
          success && success()
          Modal.close(modal)
        },
        store,
        ...props,
        module,
        cluster,
        formTemplate,
        modal: SyncModal,
        ...props,
      })
    },
  },
  'cd.delete': {
    on({ store, detail, success, ...props }) {
      const modal = Modal.open({
        onOk: () => {
          Modal.close(modal)
          Notify.success({ content: t('DELETE_SUCCESSFUL') })
          success && success()
        },
        store,
        modal: DeleteModal,
        resource: detail,
        ...props,
      })
    },
  },
}
