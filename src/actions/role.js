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

import { get, set, cloneDeep } from 'lodash'
import { Modal, Notify } from 'components/Base'

import CreateModal from 'components/Modals/RoleCreate'
import DeleteModal from 'components/Modals/RoleDelete'
import FORM_TEMPLATES from 'utils/form.templates'

export default {
  'role.create': {
    on({ store, cluster, namespace, workspace, success, ...props }) {
      const module = store.module
      const modal = Modal.open({
        onOk: data => {
          if (!data) {
            Modal.close(modal)
            return
          }
          store.create(data, { cluster, namespace, workspace }).then(() => {
            Modal.close(modal)
            Notify.success({ content: `${t('Created Successfully')}!` })
            success && success()
          })
        },
        modal: CreateModal,
        store,
        module,
        cluster,
        namespace,
        workspace,
        formTemplate: FORM_TEMPLATES[module]({ namespace }),
        ...props,
      })
    },
  },
  'role.edit': {
    on({ store, detail, success, ...props }) {
      const module = store.module
      const formTemplate = Object.assign(
        FORM_TEMPLATES[module]({ namespace: props.namespace }),
        cloneDeep(detail._originData)
      )

      set(formTemplate, 'metadata.resourceVersion', detail.resourceVersion)

      formTemplate.roleTemplates = {}

      detail.roleTemplates.forEach(name => {
        const template = props.roleTemplates.find(rt => rt.name === name)

        if (template) {
          const group = get(
            template,
            'annotations["iam.kubesphere.io/category"]'
          )
          formTemplate.roleTemplates[group] =
            formTemplate.roleTemplates[group] || []
          formTemplate.roleTemplates[group].push(name)
        }
      })

      const modal = Modal.open({
        onOk: data => {
          if (!data) {
            Modal.close(modal)
            return
          }

          store.update(detail, data).then(() => {
            Modal.close(modal)
            Notify.success({ content: `${t('Updated Successfully')}!` })
            success && success()
          })
        },
        modal: CreateModal,
        store,
        module,
        edit: true,
        formTemplate,
        ...props,
      })
    },
  },
  'role.delete': {
    on({ store, detail, success, ...props }) {
      const modal = Modal.open({
        onOk: () => {
          store.delete(detail).then(() => {
            Modal.close(modal)
            Notify.success({ content: `${t('Delete Successfully')}!` })
            success && success()
          })
        },
        modal: DeleteModal,
        module: store.module,
        detail,
        store,
        ...props,
      })
    },
  },
}
