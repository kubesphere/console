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

import { Modal } from 'components/Base'
import { Notify } from '@kube-design/components'
import CredentialCreateModal from 'components/Modals/CredentialCreate'

export default {
  'devops.credential.create': {
    on({ store, success, cluster, workspace, devops, formTemplate, ...props }) {
      const modal = Modal.open({
        onOk: async (data, cb) => {
          await store.handleCreate(data, { devops, cluster }).finally(() => {
            cb && cb()
          })
          Modal.close(modal)
          Notify.success({ content: t('CREATE_SUCCESSFUL') })
          success && success()
        },
        store,
        cluster,
        workspace,
        devops,
        formTemplate,
        modal: CredentialCreateModal,
        ...props,
      })
    },
  },
  'devops.credential.edit': {
    on({ store, success, cluster, workspace, devops, formTemplate, ...props }) {
      const modal = Modal.open({
        onOk: async (data, cb) => {
          await store
            .updateCredential(data, { devops, cluster })
            .finally(() => {
              cb && cb()
            })
          Modal.close(modal)
          Notify.success({ content: t('UPDATE_SUCCESSFUL') })
          success && success()
        },
        store,
        cluster,
        workspace,
        devops,
        formTemplate,
        modal: CredentialCreateModal,
        ...props,
      })
    },
  },
}
