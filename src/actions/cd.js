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
import DeleteModal from 'components/Modals/CDDelete'
import FORM_TEMPLATES from 'utils/form.templates'
import { set, isEmpty, cloneDeep } from 'lodash'
import { toJS } from 'mobx'
import EditCDAdvanceSetting from 'components/Modals/CDAdvanceEdit'

const handleFormData = ({ data, module }) => {
  const formTemplate = FORM_TEMPLATES[module]()
  const syncPolicyType = data.syncPolicy.type
  const syncPolicy =
    syncPolicyType === 'automated'
      ? {
          [syncPolicyType]: {
            prune: data.syncPolicy.prune,
            selfHeal: data.syncPolicy.selfHeal,
          },
        }
      : { [syncPolicyType]: {} }

  const parameterType = data.parameter_type
  const parameters =
    parameterType && parameterType !== 'auto'
      ? {
          [parameterType]: data[parameterType],
        }
      : {}

  const source = {
    repoURL: data.repoURL
      ? data.repoURL.match(/\(([\w\W]+)\)/)[1]
      : data.source.repoURL,
    ...data.source,
    ...parameters,
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
  return formTemplate
}

export default {
  'cd.create': {
    on({ store, cluster, workspace, module, success, ...props }) {
      const modal = Modal.open({
        onOk: async data => {
          const formTemplate = handleFormData({
            data,
            module,
          })
          await store.create({
            data: formTemplate,
            devops: props.devops,
            cluster,
          })

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
  'cd.edit': {
    on({ store, cluster, detail, module, success, ...props }) {
      const modal = Modal.open({
        onOk: async data => {
          const formTemplate = handleFormData({
            data,
            module,
          })
          await store.update(detail, formTemplate)
          Notify.success({ content: t('UPDATE_SUCCESSFUL') })
          success && success()
          Modal.close(modal)
        },
        store,
        module,
        cluster,
        formTemplate: cloneDeep(toJS(detail._originData)),
        modal: EditCDAdvanceSetting,
        ...props,
      })
    },
  },
  'cd.sync': {
    on({
      store,
      cluster,
      workspace,
      module,
      success,
      formTemplate,
      application,
      ...props
    }) {
      const modal = Modal.open({
        onOk: async data => {
          const postData = cloneDeep(data)
          const syncOptions = !isEmpty(postData.syncOptions)
            ? Object.entries(postData.syncOptions).reduce((pre, current) => {
                const item = `${current[0]}=${current[1]}`
                pre.push(item)
                return pre
              }, [])
            : undefined

          set(postData, 'syncOptions', syncOptions)
          set(postData, 'revision', data.repoSource.targetRevision)

          await store.updateSync({
            data: postData,
            devops: props.devops,
            cluster,
            application,
          })

          Notify.success({ content: t('SYNC_TRIGGERED') })
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
  'cd.batch.delete': {
    on({ store, success, rowKey = 'name', ...props }) {
      const { data, selectedRowKeys } = toJS(store.list)

      const resource = data.filter(item =>
        selectedRowKeys.includes(item[rowKey])
      )

      if (isEmpty(resource)) {
        return
      }

      const modal = Modal.open({
        onOk: () => {
          Modal.close(modal)
          Notify.success({ content: t('DELETE_SUCCESSFUL') })
          success && success()
        },
        modal: DeleteModal,
        resource,
        store,
        ...props,
      })
    },
  },
}
